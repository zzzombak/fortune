self.addEventListener('install', e => {
    e.waitUntil(
      caches.open('my-pwa-cache').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/main.js'
        ]);
      })
    );
   });