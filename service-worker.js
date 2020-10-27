const cacheName = 'portfolioCache-v1';
const precacheResources = [
  '/',
  'index.html',
  'style.css',
  'images/foto3.jpg',
  './main.html',
  'images/foto1l.png',
  'assets/fleetSpyl.png',
  'assets/karal.png',
  'assets/queueAndAl.png',
  'assets/walll.png',
];

self.addEventListener('install', (event) => {
  console.log('Service worker installing ...');
  skipWaiting();
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => cache.addAll(precacheResources)),
  );
});

self.addEventListener('activate', (event) => {
  console.log('activating service worker... 🛠');
});

self.addEventListener('fetch', (event) => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    }));
});
