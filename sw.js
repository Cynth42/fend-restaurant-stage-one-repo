const cacheName = 'v1';

const urlsToCache = [
'restaurant.html',
'index.html',
'css/styles.css',
'js/dbhelper.js',
'js/main.js',
'js/restaurant_info.js',
'data/restaurants.json',
'manifest.json',
'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
'img/1.jpg',
'img/2.jpg',
'img/3.jpg',
'img/4.jpg',
'img/5.jpg',
'img/6.jpg',
'img/7.jpg',
'img/8.jpg',
'img/9.jpg',
'img/10.jpg',
];

//Call activate event
self.addEventListener('install', (event) => {
  console.log('Service worker: install!');
})

//Call activate event
self.addEventListener('activate', (event) => {
  console.log('Service worker: activated!');
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== cacheName) {
              console.log('Service worker clearing old cache');
              return caches.delete(cache);
            }
        })
      );
    })
  );
})

//Call Fetch event
self.addEventListener('fetch', (event) => {
  console.log('Service worker: Fetching!');
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const responseClone = response.clone();
        caches
           .open(cacheName)
           .then(cache => {
             cache.put(event.request, responseClone);
           });
        return response;
      }).catch(error => caches.match(event.request).then(response => response))
   );
});
