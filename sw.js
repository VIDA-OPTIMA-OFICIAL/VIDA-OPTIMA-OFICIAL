// ─── sw.js — Vida Óptima Service Worker ────────────────────────────────────
// Estrategia: Stale-While-Revalidate
// Respuesta instantánea desde caché + revalidación en segundo plano.
// ───────────────────────────────────────────────────────────────────────────

const CACHE_NAME = 'vida-optima-v3';

// Recursos críticos que se precargan en install
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/engine.js',
  '/modules.js',
  '/app_v3.js',
  '/manifest.json',
  '/firebase-config.js'
];

// ── INSTALL: precarga de recursos críticos ──────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CRITICAL_ASSETS))
  );
  self.skipWaiting(); // activa inmediatamente sin esperar pestañas abiertas
});

// ── ACTIVATE: elimina cachés de versiones anteriores ────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // toma control de todas las pestañas abiertas
});

// ── FETCH: Stale-While-Revalidate ───────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  // Solo intercepta GETs de mismo origen o los assets críticos listados
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request);

      // Lanza la petición de red en paralelo (revalidación en segundo plano)
      const networkFetch = fetch(event.request)
        .then((networkResponse) => {
          // Actualiza caché solo con respuestas válidas del mismo origen
          if (
            networkResponse.ok &&
            networkResponse.type !== 'opaque' &&
            event.request.url.startsWith(self.location.origin)
          ) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(() => cached); // sin red → devuelve caché aunque sea stale

      // Responde con caché si existe (velocidad inmediata), si no espera red
      return cached || networkFetch;
    })
  );
});
