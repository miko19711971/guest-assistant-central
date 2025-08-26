// Check-in — Via Arenula 16 (multilingual static guide)
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // serve le immagini dalla root del repo

// -------- TRANSLATIONS --------
const T = {
  en: {
    langName: 'English',
    title: 'Check-in Guide — Via Arenula 16',
    addressLine: 'Address: Via Arenula 16, Rome • Intercom: C8 • Elevator: private, do not use',
    navHelp: 'Need help?',
    call: 'Call or WhatsApp',
    phone: '+39 335 524 5756',

    s1_t: 'Arriving at the Building',
    s1_p: 'When you reach Via Arenula 16, look for the large wooden entrance door with the number 16 engraved on the stone frame.',
    s1_cap: 'Façade and main entrance — Via Arenula 16.',

    s2_t: 'Using the Intercom',
    s2_p1: 'Press C8 on the intercom panel, then call me at',
    s2_p2: 'Wait for the door to unlock — you will hear a click.',
    s2_cap: 'Intercom panel — press C8.',

    s3_t: 'Entering the Main Door',
    s3_p: 'Push the door once it is unlocked.',

    s4_t: 'Inside the Building',
    s4_p: 'Walk straight across the corridor into the courtyard, then take the stairs on your right after the elevator.',
    s4_note: 'The elevator is strictly private — please do not use it.',
    s4_cap: 'Go straight to the courtyard, then stairs on the right (after the elevator).',

    s5_t: 'Reaching the Apartment',
    s5_p: 'Go to the 3rd floor. At the end of the stairs, you’ll find the apartment door in front of you.',
    s5_cap: 'Apartment door — 3rd floor, end of the stairs.',

    s6_t: 'Unlocking the Apartment Door',
    s6_p1: 'Use the key from the lockbox. After taking the key, close the lockbox and mix the numbers.',
    s6_p2: 'Use the square key and turn clockwise until it clicks. You’re in!',
    s6_cap: 'Lockbox for the key — close it and scramble the code after use.',

    footer: 'niceflatinrome.com • Quick visual guide for arrivals at Via Arenula 16',
    langLabel: 'Language'
  },

  es: {
    langName: 'Español',
    title: 'Guía de Check-in — Via Arenula 16',
    addressLine: 'Dirección: Via Arenula 16, Roma • Portero: C8 • Ascensor: privado, no usar',
    navHelp: '¿Necesitas ayuda?',
    call: 'Llamar o WhatsApp',
    phone: '+39 335 524 5756',

    s1_t: 'Llegada al edificio',
    s1_p: 'Al llegar a Via Arenula 16, busca la gran puerta de madera con el número 16 grabado en el marco de piedra.',
    s1_cap: 'Fachada y entrada principal — Via Arenula 16.',

    s2_t: 'Uso del portero',
    s2_p1: 'Pulsa C8 en el portero y luego llámame al',
    s2_p2: 'Espera el “clic” de apertura de la puerta.',
    s2_cap: 'Portero — pulsa C8.',

    s3_t: 'Entrada por la puerta principal',
    s3_p: 'Empuja la puerta cuando esté desbloqueada.',

    s4_t: 'Dentro del edificio',
    s4_p: 'Camina recto por el pasillo hasta el patio y toma las escaleras a la derecha después del ascensor.',
    s4_note: 'El ascensor es estrictamente privado — por favor no lo uses.',
    s4_cap: 'Directo al patio; escaleras a la derecha (después del ascensor).',

    s5_t: 'Llegar al apartamento',
    s5_p: 'Sube al 3er piso. Al final de las escaleras encontrarás la puerta del apartamento frente a ti.',
    s5_cap: 'Puerta del apartamento — 3er piso.',

    s6_t: 'Abrir la puerta del apartamento',
    s6_p1: 'Usa la llave de la caja. Después, cierra la caja y mezcla los números.',
    s6_p2: 'Usa la llave cuadrada y gira en sentido horario hasta el clic.',
    s6_cap: 'Caja de llaves — ciérrala y mezcla el código tras usarla.',

    footer: 'niceflatinrome.com • Guía visual para llegadas a Via Arenula 16',
    langLabel: 'Idioma'
  },

  fr: {
    langName: 'Français',
    title: 'Guide d’arrivée — Via Arenula 16',
    addressLine: 'Adresse : Via Arenula 16, Rome • Interphone : C8 • Ascenseur : privé, ne pas utiliser',
    navHelp: 'Besoin d’aide ?',
    call: 'Appeler ou WhatsApp',
    phone: '+39 335 524 5756',

    s1_t: 'Arriver à l’immeuble',
    s1_p: 'À Via Arenula 16, repérez la grande porte en bois avec le numéro 16 gravé dans la pierre.',
    s1_cap: 'Façade et entrée principale — Via Arenula 16.',

    s2_t: 'Utiliser l’interphone',
    s2_p1: 'Appuyez sur C8, puis appelez-moi au',
    s2_p2: 'Attendez le déclic d’ouverture.',
    s2_cap: 'Interphone — bouton C8.',

    s3_t: 'Entrer par la porte principale',
    s3_p: 'Poussez la porte une fois déverrouillée.',

    s4_t: 'À l’intérieur',
    s4_p: 'Allez tout droit jusqu’à la cour, puis prenez l’escalier à droite après l’ascenseur.',
    s4_note: 'L’ascenseur est strictement privé — ne pas l’utiliser.',
    s4_cap: 'Tout droit vers la cour, escalier à droite (après l’ascenseur).',

    s5_t: 'Accéder à l’appartement',
    s5_p: 'Montez au 3e étage. En haut des marches, la porte de l’appartement est en face.',
    s5_cap: 'Porte de l’appartement — 3e étage.',

    s6_t: 'Ouvrir la porte de l’appartement',
    s6_p1: 'Utilisez la clé de la boîte. Après usage, refermez et mélangez les chiffres.',
    s6_p2: 'Insérez la clé carrée et tournez dans le sens horaire jusqu’au clic.',
    s6_cap: 'Boîte à clés — refermez et brouillez le code après usage.',

    footer: 'niceflatinrome.com • Guide visuel d’arrivée à Via Arenula 16',
    langLabel: 'Langue'
  },

  de: {
    langName: 'Deutsch',
    title: 'Check-in-Anleitung — Via Arenula 16',
    addressLine: 'Adresse: Via Arenula 16, Rom • Gegensprechanlage: C8 • Aufzug: privat, bitte nicht benutzen',
    navHelp: 'Brauchen Sie Hilfe?',
    call: 'Anrufen oder WhatsApp',
    phone: '+39 335 524 5756',

    s1_t: 'Ankunft am Gebäude',
    s1_p: 'Suchen Sie die große Holztür mit der Zahl 16 im Steinrahmen.',
    s1_cap: 'Fassade und Haupteingang — Via Arenula 16.',

    s2_t: 'Sprechanlage benutzen',
    s2_p1: 'Drücken Sie C8 und rufen Sie mich anschließend an unter',
    s2_p2: 'Warten Sie auf das Klick-Geräusch zum Öffnen.',
    s2_cap: 'Sprechanlage — Taste C8.',

    s3_t: 'Durch die Eingangstür',
    s3_p: 'Drücken Sie die Tür auf, sobald sie entriegelt ist.',

    s4_t: 'Im Gebäude',
    s4_p: 'Gehen Sie geradeaus in den Hof und nehmen Sie die Treppe rechts nach dem Aufzug.',
    s4_note: 'Der Aufzug ist privat — bitte nicht benutzen.',
    s4_cap: 'Geradeaus in den Hof, dann rechts die Treppe (nach dem Aufzug).',

    s5_t: 'Zur Wohnung',
    s5_p: 'Bis in den 3. Stock. Oben am Treppenende ist die Wohnungstür gegenüber.',
    s5_cap: 'Wohnungstür — 3. Stock.',

    s6_t: 'Wohnungstür öffnen',
    s6_p1: 'Benutzen Sie den Schlüssel aus der Schlüsselkassette. Danach schließen und die Zahlen mischen.',
    s6_p2: 'Mit dem Vierkantschlüssel im Uhrzeigersinn drehen, bis es klickt.',
    s6_cap: 'Schlüsselkassette — schließen und Code mischen.',

    footer: 'niceflatinrome.com • Visuelle Anleitung für Via Arenula 16',
    langLabel: 'Sprache'
  },

  it: {
    langName: 'Italiano',
    title: 'Guida Check-in — Via Arenula 16',
    addressLine: 'Indirizzo: Via Arenula 16, Roma • Citofono: C8 • Ascensore: privato, non usare',
    navHelp: 'Serve aiuto?',
    call: 'Chiama o WhatsApp',
    phone: '+39 335 524 5756',

    s1_t: "Arrivo all'edificio",
    s1_p: 'Cerca il grande portone in legno con il numero 16 inciso sulla cornice in pietra.',
    s1_cap: 'Facciata e ingresso principale — Via Arenula 16.',

    s2_t: 'Uso del citofono',
    s2_p1: 'Premi C8 sul citofono e poi chiamami al',
    s2_p2: 'Attendi lo “scatto” di apertura.',
    s2_cap: 'Pannello citofono — premi C8.',

    s3_t: "Entrata dal portone",
    s3_p: 'Spingi la porta quando è sbloccata.',

    s4_t: "Dentro l'edificio",
    s4_p: "Prosegui dritto nel cortile e prendi le scale a destra dopo l'ascensore.",
    s4_note: "L'ascensore è strettamente privato — per favore non usarlo.",
    s4_cap: 'Vai dritto nel cortile; scale a destra (dopo l’ascensore).',

    s5_t: "Raggiungere l'appartamento",
    s5_p: 'Sal i al 3° piano. In cima alle scale la porta è davanti a te.',
    s5_cap: 'Porta dell’appartamento — 3° piano.',

    s6_t: 'Aprire la porta',
    s6_p1: 'Usa la chiave dalla key box. Poi richiudi la box e mescola i numeri.',
    s6_p2: 'Usa la chiave quadra e gira in senso orario finché scatta.',
    s6_cap: 'Key box — richiudere e mescolare il codice dopo l’uso.',

    footer: 'niceflatinrome.com • Guida rapida di arrivo a Via Arenula 16',
    langLabel: 'Lingua'
  }
};

const fallback = 'en';

// -------- PAGE ROUTE --------
app.get('/', (req, res) => {
  const lang = (req.query.lang || '').toLowerCase();
  const L = T[lang] || T[fallback];

  const buttons = Object.entries(T)
    .map(([code, v]) => {
      const isActive = (L === T[code]);
      return `<a href="?lang=${code}"${isActive ? ' class="active"' : ''}>${v.langName}</a>`;
    }).join(' · ');

  const html = `<!doctype html>
<html lang="${lang || fallback}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${L.title}</title>
<link rel="icon" href="building-facade.jpg?v=2">
<style>
  :root { --brand:#2b2118; --ink:#1f2937; --muted:#6b7280; --bg:#f7f7f7; --card:#ffffff; --line:#e5e7eb; }
  *{box-sizing:border-box}
  body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:var(--bg);color:var(--ink)}
  .wrap{max-width:860px;margin:0 auto;padding:16px}
  header{position:sticky;top:0;background:var(--card);border-bottom:1px solid var(--line);padding:12px 14px;z-index:5}
  h1{font-size:20px;margin:0}
  .addr{font-size:14px;color:var(--muted)}
  .lang{font-size:15px;font-weight:800;margin-top:8px}
  .lang a{color:var(--ink);text-decoration:none}
  .lang a.active{text-decoration:underline}
  .card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px;margin:14px 0}
  .step{display:flex;gap:12px;align-items:flex-start}
  .num{flex:0 0 36px;height:36px;border-radius:50%;background:var(--brand);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700}
  h2{margin:6px 0 8px 0;font-size:18px}
  p{margin:6px 0;line-height:1.45}
  figure{margin:10px 0}
  img{max-width:100%;height:auto;border-radius:10px;border:1px solid var(--line);display:block}
  figure img{width:90%;margin:0 auto}
  figcaption{font-size:12px;color:var(--muted);margin-top:6px;text-align:center}
  .note{background:#fff7ed;border:1px solid #fed7aa;color:#7c2d12;padding:10px;border-radius:8px;margin-top:8px}
  .cta{display:inline-block;margin-top:6px;padding:10px 12px;border-radius:10px;background:var(--brand);color:#fff;text-decoration:none}
  footer{color:var(--muted);text-align:center;font-size:12px;margin:18px 0}
</style>
</head>
<body>
<header class="wrap">
  <h1>${L.title}</h1>
  <div class="addr">${L.addressLine}</div>
  <div class="lang">${L.langLabel}: ${buttons}</div>
</header>

<main class="wrap">
  <!-- 1 -->
  <section class="card">
    <div class="step">
      <div class="num">1</div>
      <div>
        <h2>${L.s1_t}</h2>
        <p>${L.s1_p}</p>
        <figure>
          <img src="building-facade.jpg?v=2" alt="Building entrance — Via Arenula 16">
          <figcaption>${L.s1_cap}</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <!-- 2 -->
  <section class="card">
    <div class="step">
      <div class="num">2</div>
      <div>
        <h2>${L.s2_t}</h2>
        <p>${L.s2_p1} <a class="cta" href="tel:+393355245756">${L.phone}</a>.</p>
        <p>${L.s2_p2}</p>
        <figure>
          <img src="intercom.jpg?v=2" alt="Intercom panel with C8 highlighted">
          <figcaption>${L.s2_cap}</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <!-- 3 -->
  <section class="card">
    <div class="step">
      <div class="num">3</div>
      <div>
        <h2>${L.s3_t}</h2>
        <p><b>${L.s3_p}</b></p>
      </div>
    </div>
  </section>

  <!-- 4 -->
  <section class="card">
    <div class="step">
      <div class="num">4</div>
      <div>
        <h2>${L.s4_t}</h2>
        <p>${L.s4_p}</p>
        <div class="note">${L.s4_note}</div>
        <figure>
          <img src="hallway.jpg?v=2" alt="Hallway leading to the courtyard and stairs">
          <figcaption>${L.s4_cap}</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <!-- 5 -->
  <section class="card">
    <div class="step">
      <div class="num">5</div>
      <div>
        <h2>${L.s5_t}</h2>
        <p>${L.s5_p}</p>
        <figure>
          <img src="apartment-door.jpg?v=2" alt="Apartment door at the top of the stairs">
          <figcaption>${L.s5_cap}</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <!-- 6 -->
  <section class="card">
    <div class="step">
      <div class="num">6</div>
      <div>
        <h2>${L.s6_t}</h2>
        <p>${L.s6_p1}</p>
        <p>${L.s6_p2}</p>
        <figure>
          <img src="key-safe.jpg?v=2" alt="Lockbox with combination wheels">
          <figcaption>${L.s6_cap}</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section class="card">
    <h2>${L.navHelp}</h2>
    <p>${L.call}: <a class="cta" href="tel:+393355245756">${L.phone}</a></p>
  </section>

  <footer>${L.footer}</footer>
</main>
</body>
</html>`;
  res.setHeader('content-type', 'text/html; charset=utf-8');
  res.end(html);
});

const port = process.env.PORT || 8787;
app.listen(port, () =>
  console.log('Check-in guide running on http://localhost:' + port)
);
