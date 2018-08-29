const cacheName = 'v1';

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
