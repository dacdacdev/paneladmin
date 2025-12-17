// sw.js - Service Worker Básico
const CACHE_NAME = 'admin-chat-v1';
const urlsToCache = [
'./admin.html',
'./manifest.json',
'./icon.png'
];

// Instalación: Guardamos los archivos en caché
self.addEventListener('install', event => {
event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
        console.log('Archivos cacheados para PWA');
        return cache.addAll(urlsToCache);
    })
);
});

// Activación: Limpiamos cachés viejas
self.addEventListener('activate', event => {
event.waitUntil(
    caches.keys().then(cacheNames => {
    return Promise.all(
        cacheNames.map(cacheName => {
        if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
        }
        })
    );
    })
);
});

// Interceptamos peticiones: Servimos desde caché si no hay internet
self.addEventListener('fetch', event => {
event.respondWith(
    caches.match(event.request)
    .then(response => {
        if (response) {
        return response;
        }
        return fetch(event.request);
})
);
});