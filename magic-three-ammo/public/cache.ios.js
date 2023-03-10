
/**
 * @description iOS platform worker cache fixer.
 */
var version = 1;
const cacheFlag = 'magic-three';
var cacheName = cacheFlag + version;
const offlineUrl = 'offline.html';

var old = cacheFlag + (version -1);
caches.delete(old);

for (var j = 1;j < version;j++) {
  try {
    var veryOld =  cacheFlag + j;
    caches.delete(veryOld);
  } catch(e) {}
}

self.addEventListener('install', function(event) {
  console.info();
  event.waitUntil(
    caches.open(iOSversion).then(function(cache) {
      return cache.addAll([
        // './assets/objects/zombies-walk.fbx',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        let responseClone = response.clone();
        caches.open(iOSversion).then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return false;
      });
    }
  }));
});
