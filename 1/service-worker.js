const CACHE_NAME = 'my-app-static-files';
var urlsToCache = ["/", "/app.js"];

self.addEventListener('install', function(event){
  console.log(event);

  event.waitUntil(self.caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(urlsToCache);
  }));
});
