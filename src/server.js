// src/server.js
import express from "express"
import cors from "cors"
import crypto from "crypto"

// ====== ENV ======
const API_KEY = process.env.SHELLY_API_KEY || ""
const BASE_URL = process.env.SHELLY_BASE_URL || "https://shelly-api-eu.shelly.cloud"
const TOKEN_SECRET = process.env.TOKEN_SECRET || "dev-secret"

// ====== APP ======
const app = express();
app.use(cors());
app.use(express.json());

// Serviamo le asset pubbliche (guide + immagini)
app.use("/public", express.static("public", { maxAge: "12h", immutable: true }));

// ====== TARGETS ======
// Metti qui gli ID reali dei device (Shelly Cloud -> Devices).
// Se un target usa un altro canale, aggiungi channel: 1, ecc.
const TARGETS = {
"leonina-door": { label: "Leonina — Apartment Door", device_id: "CHANGE_ME", channel: 0 },
"leonina-building-door": { label: "Leonina — Building Door", device_id: "CHANGE_ME", channel: 0 },
"scala-door": { label: "Scala — Apartment Door", device_id: "CHANGE_ME", channel: 0 },
"scala-building-door": { label: "Scala — Building Door", device_id: "CHANGE_ME", channel: 0 },
"ottavia-door": { label: "Ottavia — Apartment Door", device_id: "CHANGE_ME", channel: 0 },
"ottavia-building-door": { label: "Ottavia — Building Door", device_id: "CHANGE_ME", channel: 0 },
"viale-trastevere-door": { label: "Viale Trastevere — APT Door",device_id: "CHANGE_ME", channel: 0 },
"viale-trastevere-building-door": { label: "Viale Trastevere — Building Door", device_id: "CHANGE_ME", channel: 0 },
"arenula-building-door": { label: "Arenula — Building Door", device_id: "CHANGE_ME", channel: 0 },
};

// ====== UTILS ======
function sign(data, ttlSec = 180) {
// token semplice HMAC: target|exp|signature
const exp = Math.floor(Date.now() / 1000) + ttlSec;
const msg = `${data}|${exp}`;
const sig = crypto.createHmac("sha256", TOKEN_SECRET).update(msg).digest("hex");
return Buffer.from(`${data}|${exp}|${sig}`).toString("base64url");
}

function verify(token, data) {
try {
const raw = Buffer.from(token, "base64url").toString("utf8");
const [d, expStr, sig] = raw.split("|");
if (d !== data) return false;
const exp = parseInt(expStr, 10);
if (isNaN(exp) || exp < Math.floor(Date.now() / 1000)) return false;
const check = crypto.createHmac("sha256", TOKEN_SECRET).update(`${d}|${exp}`).digest("hex");
return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(check));
} catch {
return false;
}
}

async function controlShelly(target) {
if (!API_KEY) throw new Error("missing_api_key");
if (!target?.device_id) throw new Error("missing_device_id");

const url = `${BASE_URL}/device/relay/control`;
const payload = {
id: target.device_id,
auth_key: API_KEY,
channel: target.channel ?? 0,
turn: "on",
timer: 1, // 1 secondo
};

const res = await fetch(url, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(payload),
});

// Shelly Cloud in genere risponde { isok: true/false, data/error... }
const data = await res.json().catch(() => ({}));
if (!res.ok || data?.isok === false) {
const details = { status: res.status, data };
const err = new Error("cloud_error");
err.details = details;
throw err;
}
return data;
}

// ====== ROUTES ======

// Health
app.get("/health", (req, res) => {
res.send({ ok: true, targets: Object.keys(TARGETS).length, node: process.version, uptime: process.uptime() });
});

// Index HTML con elenco link
app.get("/", (req, res) => {
const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Rome"
const items = Object.entries(TARGETS)
.map(([key, t]) => {
const smart = `/smart/${key}`;
const test = `/test/${key}`;
return `<li><b>${key}</b> — ${t.label} &nbsp; <a href="${smart}">smart link (redirect)</a> &nbsp; <a href="${test}">test open (senza token)</a></li>`;
})
.join("\n");

res.type("html").send(`
<h2>Guest Assistant — Unified Opener & Guides</h2>
<p>${Object.keys(TARGETS).length} targets configured. TZ=${tz}</p>
<p>Guides folder: <code>/guides/...</code> (vedi file in <code>/public/guides</code>)</p>
<ul>${items}</ul>
<p><a href="/health">/health</a></p>
`);
});

// Smart link: crea token e redirige su /open/:target?t=...
app.get("/smart/:target", (req, res) => {
const key = req.params.target;
const target = TARGETS[key];
if (!target) return res.status(404).send("Unknown target");
const t = sign(key, 180); // 3 minuti
res.redirect(302, `/open/${encodeURIComponent(key)}?t=${encodeURIComponent(t)}`);
});

// Apertura con token (se c'è lo verifichiamo; se manca, opzionalmente puoi rifiutare)
app.get("/open/:target", async (req, res) => {
const key = req.params.target;
const target = TARGETS[key];
if (!target) return res.status(404).send({ ok: false, error: "unknown_target" });

// Se vuoi forzare il token, scommenta il blocco seguente:
// const tok = req.query.t;
// if (!tok || !verify(tok, key)) {
// return res.status(401).send({ ok: false, error: "expired" });
// }

try {
const result = await controlShelly(target);
res.send({ ok: true, data: result });
} catch (err) {
res.status(400).send({ ok: false, error: err.message, details: err.details });
}
});

// Test (sempre senza token)
app.get("/test/:target", async (req, res) => {
const key = req.params.target;
const target = TARGETS[key];
if (!target) return res.status(404).send({ ok: false, error: "unknown_target" });

try {
const result = await controlShelly(target);
res.send({ ok: true, data: result });
} catch (err) {
res.status(400).send({ ok: false, error: err.message, details: err.details });
}
});

// ====== START ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Guest Assistant Central listening on :${PORT}`);
});
