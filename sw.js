/* Service worker: guarda la app en el teléfono para que funcione sin conexión.
   Al publicar una versión nueva, sube VERSION para que el teléfono la descargue. */
const VERSION = 'phul-v4';
const FILES = ['./', './index.html', './manifest.json', './icon-180.png', './icon-192.png', './icon-512.png', './icon-maskable-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // Página: red primero (para recibir actualizaciones) y, sin conexión, la copia guardada.
  // Si la red tarda más de 3 s (wifi del gimnasio), se usa la copia guardada.
  if (req.mode === 'navigate') {
    const cached = () => caches.match('./index.html', { ignoreSearch: true });
    const net = fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); }
      return res;
    });
    const slow = new Promise(r => setTimeout(r, 3000)).then(cached);
    e.respondWith(Promise.race([net.catch(cached), slow.then(hit => hit || net)]));
    return;
  }
  // Resto (iconos, manifest): caché primero.
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  })));
});
