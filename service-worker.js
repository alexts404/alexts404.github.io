const cacheName = 'portfolioCache-v1';
const precacheResources = [
  '/',
  'index.html',
  'style.css',
  'images/foto3.jpg'
]

self.addEventListener('install', event => {
  console.log('Service worker installing ...');
  skipWaiting();
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
})

self.addEventListener('activate', event => {
  console.log('activating service worker... 🛠');
})

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
