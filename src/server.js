// src/server.js
import express from "express";
import axios from "axios";
import crypto from "crypto";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ====== STATIC: guide & assets ======
app.use(express.static("public", { maxAge: "12h", immutable: true }));

// ====== ENV ======
const SHELLY_API_KEY = process.env.SHELLY_API_KEY;
const SHELLY_BASE_URL = process.env.SHELLY_BASE_URL || "https://shelly-api-eu.shelly.cloud";
const TOKEN_SECRET = process.env.TOKEN_SECRET || "changeme";
const TIMEZONE = process.env.TIMEZONE || "Europe/Rome";

// ====== MAPPATURA TUTTI I DEVICE ======
const TARGETS = {
  "leonina-door":                   { id: "3494547a9395", name: "Leonina — Apartment Door" },
  "leonina-building-door":          { id: "34945479fbbe", name: "Leonina — Building Door" },
  "scala-door":                     { id: "3494547a1075", name: "Scala — Apartment Door" },
  "scala-building-door":            { id: "3494547745ee", name: "Scala — Building Door" },
  "ottavia-door":                   { id: "3494547a887d", name: "Ottavia — Apartment Door" },
  "ottavia-building-door":          { id: "3494547ab62b", name: "Ottavia — Building Door" },
  "viale-trastevere-door":          { id: "34945479fa35", name: "Viale Trastevere — Apartment Door" },
  "viale-trastevere-building-door": { id: "34945479fd73", name: "Viale Trastevere — Building Door" },
  "arenula-building-door":          { id: "3494547ab05e", name: "Arenula — Building Door" }
};

// Shelly 1 => relay channel 0
const RELAY_CHANNEL = 0;

// ====== STORAGE TEMPORANEO per token monouso ======
const usedTokens = new Map(); // key = sig, value = expireTime

// ====== HELPER: Shelly Cloud ======
async function cloudOpenRelay(deviceId) {
  const url = `${SHELLY_BASE_URL}/device/relay/control`;
  const form = new URLSearchParams({
    id: deviceId,
    auth_key: SHELLY_API_KEY,
    channel: String(RELAY_CHANNEL),
    turn: "on"
  });

  try {
    const { data } = await axios.post(url, form.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 5000
    });
    if (data && data.isok) return { ok: true, data };
    return { ok: false, error: data || { message: "cloud_isok_false" } };
  } catch (err) {
    return {
      ok: false,
      error: "cloud_error",
      details: err.response ? { status: err.response.status, data: err.response.data } : String(err)
    };
  }
}

// ====== TOKEN MONOUSO 5 MIN ======
function makeToken(target) {
  const ts = Date.now();
  const sig = crypto.createHmac("sha256", TOKEN_SECRET)
    .update(`${target}:${ts}`)
    .digest("base64url");
  return { ts, sig };
}

function verifyToken(target, ts, sig) {
  const expected = crypto.createHmac("sha256", TOKEN_SECRET)
    .update(`${target}:${ts}`)
    .digest("base64url");

  if (sig !== expected) return { ok: false, error: "invalid_signature" };

  const ageMs = Date.now() - parseInt(ts, 10);
  if (ageMs > 5 * 60 * 1000) return { ok: false, error: "expired" }; // oltre 5 minuti

  if (usedTokens.has(sig)) return { ok: false, error: "already_used" };

  // segna come usato per sicurezza
  usedTokens.set(sig, Date.now() + 5 * 60 * 1000);
  return { ok: true };
}

// pulizia periodica dei token scaduti
setInterval(() => {
  const now = Date.now();
  for (const [sig, exp] of usedTokens.entries()) {
    if (exp < now) usedTokens.delete(sig);
  }
}, 60 * 1000);

// ====== ROUTES ======

// Home (lista target + link utili)
app.get("/", (req, res) => {
  const rows = Object.entries(TARGETS)
    .map(([key, v]) => {
      return `<li>
        <b>${key}</b> — ${v.name}
        &nbsp; <a href="/t/${key}">smart link (redirect)</a>
        &nbsp; <a href="/open?target=${key}">test open (senza token)</a>
      </li>`;
    })
    .join("\n");

  res.type("html").send(
    `<h1>Guest Assistant — Unified Opener & Guides</h1>
    <p>${Object.keys(TARGETS).length} targets configured. TZ=${TIMEZONE}</p>
    <p>Guides folder: <code>/guides/...</code> (vedi file in <code>/public/guides</code>)</p>
    <ul>${rows}</ul>
    <p><a href="/health">/health</a></p>`
  );
});

// Health
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    targets: Object.keys(TARGETS).length,
    node: process.version,
    uptime: process.uptime()
  });
});

// Smart redirect: genera token e manda al link firmato
app.get("/t/:target", (req, res) => {
  const target = req.params.target;
  if (!TARGETS[target]) return res.status(404).send("unknown_target");
  const { ts, sig } = makeToken(target);
  res.redirect(302, `/open/${target}/${ts}/${sig}`);
});

// Apertura con token monouso
app.get("/open/:target/:ts/:sig", async (req, res) => {
  const { target, ts, sig } = req.params;
  if (!TARGETS[target]) return res.json({ ok: false, error: "unknown_target" });

  const check = verifyToken(target, ts, sig);
  if (!check.ok) return res.json(check);

  const deviceId = TARGETS[target].id;
  const out = await cloudOpenRelay(deviceId);
  res.json(out);
});

// (Facoltativo) Mini-pagina "assistant" per bottoni
app.get("/assistant/:apt", (req, res) => {
  const apt = req.params.apt; // es: "leonina", "scala", "ottavia", "viale-trastevere", "arenula"

  const cfgs = {
    leonina: {
      name: "Via Leonina Apartment",
      building: "/t/leonina-building-door",
      door: "/t/leonina-door"
    },
    scala: {
      name: "Via della Scala Apartment",
      building: "/t/scala-building-door",
      door: "/t/scala-door"
    },
    ottavia: {
      name: "Via del Portico d’Ottavia Apartment",
      building: "/t/ottavia-building-door",
      door: "/t/ottavia-door"
    },
    "viale-trastevere": {
      name: "Viale Trastevere Apartment",
      building: "/t/viale-trastevere-building-door",
      door: "/t/viale-trastevere-door"
    },
    arenula: {
      name: "Via Arenula Apartment",
      building: "/t/arenula-building-door",
      door: null // solo portone
    }
  };

  const c = cfgs[apt];
  if (!c) return res.status(404).send("Unknown apartment");

  const btn = (href, label) =>
    `<a href="${href}" style="display:inline-block;padding:12px 20px;background:#7B3F00;color:#fff;
      text-decoration:none;border-radius:6px;font-weight:bold;margin-right:10px">${label} (Valid 5 Minutes)</a>`;

  res.type("html").send(`
    <h2>${c.name}</h2>
    <p>Use these buttons only when you are in front of the door.</p>
    <p>
      ${btn(c.building, "👉 OPEN BUILDING DOOR")}
      ${c.door ? btn(c.door, "👉 OPEN APARTMENT DOOR") : ""}
    </p>
  `);
});

// ====== START ======
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server listening on", PORT, "TZ:", TIMEZONE);
});
