const CACHE_NAME = 'my-app-static-files';
const CACHE_DATA_NAME = 'my-app-data';
var urlsToCache = ["/", "/app.js"];

self.addEventListener('install', function(event){
  console.log(event);

  event.waitUntil(self.caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(urlsToCache);
  }));
});

self.addEventListener('activate', function(event){
  console.log(event);

  var cacheWhiteList = [CACHE_NAME, CACHE_DATA_NAME];

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

  // if(event.request.url == "http://lorempixel.com/400/200/cats/6/"){
  //   event.respondWith(self.fetch("http://lorempixel.com/400/200/cats/1/", {mode: "no-cors"}));
  // }

  var dataUrl = "https://api.github.com";

  if(event.request.url.indexOf(dataUrl) == -1){
    event.respondWith(self.caches.match(event.request).then(function(response){
      return response || self.fetch(event.request);
    }));
  } else {
     event.respondWith(self.fetch(event.request).then(function(response){
       return self.caches.open(CACHE_DATA_NAME).then(function(cache){
         cache.put(event.request.url, response.clone());
         return response;
       })
     }).catch(function(error){
       return self.caches.match(event.request);
     }))
  }
});
