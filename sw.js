const cacheName = 'v1';

//Call activate event
self.addEventListener('install', (event) => {
  console.log('Service worker: install!');
})

//Call activate event
self.addEventListener('activate', (event) => {
  console.log('Service worker: activated!');
  //Remove unwanted caches
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
        //make copy/clone of response
        const responseClone = response.clone();
        //Open cache
        caches
           .open(cacheName)
           .then(cache => {
             //Add response to caches
             cache.put(event.request, responseClone);
           });
        return response;
      }).catch(error => caches.match(event.request).then(response => response))
   );
});
