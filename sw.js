/* Generated at build time. Offline-first app shell. */
const CACHE = 'ukw-be5a7c83d1';
const ASSETS = ["./","index.html","manifest.webmanifest","favicon.svg","share.html","share.js","icons/icon-192.png","icons/icon-512.png","icons/maskable-512.png","icons/apple-touch-icon.png","assets/index-DQjDSrK1.js","assets/GraphEditor-CiF1lScN.js","assets/GraphEditor-DLioOiRN.css","assets/index-Bn8gV4_w.css"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});
self.addEventListener('message', (e) => { if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('ukw-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // never intercept cross-origin (sync) traffic
  if (req.mode === 'navigate') {
    e.respondWith(caches.match(url.pathname.endsWith('share.html') ? 'share.html' : 'index.html').then((r) => r || fetch(req)));
    return;
  }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
    return res;
  })));
});
