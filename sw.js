/* Service worker portofolio Lingga: cache agar bisa dibuka offline */
const VERSI = 'lingga-v1';
const INTI = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/maskable-512.png',
  'icons/apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSI).then((c) => c.addAll(INTI)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== VERSI).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Halaman: coba jaringan dulu (selalu terbaru), jika offline pakai cache
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const salinan = res.clone();
          caches.open(VERSI).then((c) => c.put('index.html', salinan));
          return res;
        })
        .catch(() => caches.match('index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  // Font Google: simpan setelah pertama kali dimuat
  const fontHost = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (fontHost || url.origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then((cache) => {
        const ambil = fetch(req)
          .then((res) => {
            if (res && (res.ok || res.type === 'opaque')) {
              const salinan = res.clone();
              caches.open(VERSI).then((c) => c.put(req, salinan));
            }
            return res;
          })
          .catch(() => cache);
        return cache || ambil;
      })
    );
  }
});
