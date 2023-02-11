
var version = 1;

var cacheName = 'magic-three' + version;
const offlineUrl = 'offline.html';

var old =  'magic-three' + (version -1);
caches.delete(old);

for (var j = 1;j < version;j++) {
  try {
    var veryOld =  'magic-three' + j;
    caches.delete(veryOld);
  } catch(e) {}
}

self.addEventListener('install', function (event) {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return (
        resp ||
        fetch(event.request).then((response) => {
          return caches.open(cacheName).then((cache) => {
            if (response.status == 206) {
              // Partial Content
              return response;
            } else {
              if (event.request.method == "POST") {
                return response;
              }
              cache.put(event.request, response.clone());
            }
            return response;
          });
        })
      );
    })
  );

});

self.addEventListener('activate', function(event) {

  caches.delete(old);
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheNameFile) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheNameFile) {
          return caches.delete(cacheNameFile);
        })
      );
    })
  );
});
