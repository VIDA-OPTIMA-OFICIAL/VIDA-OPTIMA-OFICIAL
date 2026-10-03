// ─── firebase-config.js — Vida Óptima ──────────────────────────────────────
//
// ⚠️  SEGURIDAD CRÍTICA — API KEY EXPUESTA EN CLIENTE
// ─────────────────────────────────────────────────────────────────────────────
// Las API Keys de Firebase son públicas por diseño (se envían al navegador),
// pero DEBEN estar restringidas para evitar abuso de cuotas y cargos falsos.
//
// PASOS OBLIGATORIOS EN GOOGLE CLOUD CONSOLE:
//   1. Ir a: console.cloud.google.com → "APIs & Services" → "Credentials"
//   2. Seleccionar la API Key listada abajo.
//   3. En "Application restrictions" elegir "HTTP referrers (websites)".
//   4. Agregar SOLO tus dominios autorizados, por ejemplo:
//        https://tu-dominio.com/*
//        https://www.tu-dominio.com/*
//        http://localhost/*   ← solo para desarrollo local
//   5. En "API restrictions" → "Restrict key" → seleccionar únicamente:
//        Identity Toolkit API, Cloud Firestore API, Firebase Management API.
//   6. Guardar. La key queda inutilizable desde dominios no autorizados.
//
// GUARD DE ENTORNO (primera línea de defensa en cliente):
// Bloquea la inicialización si el host actual no está en la lista autorizada.
// ─────────────────────────────────────────────────────────────────────────────

const AUTHORIZED_HOSTS = [
  'localhost',
  '127.0.0.1',
  // ↓ Reemplaza con tu dominio de producción real ↓
  'vida-optima.web.app',
  'vida-optima.firebaseapp.com'
];

const currentHost = window.location.hostname;
if (!AUTHORIZED_HOSTS.includes(currentHost)) {
  console.error(
    `[VidaOptima] Host no autorizado: "${currentHost}". Firebase no se inicializará.`
  );
  // Lanza un error visible en consola para detectar accesos ilegítimos,
  // pero no ejecuta código que consuma cuota de Firebase.
  throw new Error(`Unauthorized host: ${currentHost}`);
}

// ── Configuración Firebase (restringir en Google Cloud Console — ver arriba) ──
const firebaseConfig = {
  apiKey:            "AIzaSyC6AuM_Uy8iu-Ex-JOhyLU7kw-ERwmDlxY",
  authDomain:        "vida-optima.firebaseapp.com",
  projectId:         "vida-optima",
  storageBucket:     "vida-optima.firebasestorage.app",
  messagingSenderId: "968452042731",
  appId:             "1:968452042731:web:094319c5559e471f9473ae",
  measurementId:     "G-34HZ4VC4L3"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.firestore();

console.log("🔥 Firebase conectado correctamente");
