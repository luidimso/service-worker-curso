const CACHE_NAME = 'my-app-static-files';
var urlsToCache = ["/", "/app.js"];

self.addEventListener('install', function(event){
  console.log(event);

  event.waitUntil(self.caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(urlsToCache);
  }));
});

self.addEventListener('activate', function(event){
  console.log(event);

  var cacheWhiteList = [CACHE_NAME];

  return event.waitUntil(self.caches.keys().then(function(cacheNames){
    return Promise.all(cacheNames.map(function(cacheName){
      if(cacheWhiteList.indexOf(cacheName) == -1){
        return self.caches.delete(cacheName);
      }
    }))
  }))
});

self.addEventListener('fetch', function(event){
  console.log(event);

  if(event.request.url == "http://lorempixel.com/400/200/cats/6/"){
    event.respondWith(self.fetch("http://lorempixel.com/400/200/cats/1/", {mode: "no-cors"}));
  }
});
