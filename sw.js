const CACHE_NAME = 'portfolio-v3';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/script.js',
    '/icons-regular.css',
    '/icons-fill.css',
    '/assets/fonts/Phosphor.woff2',
    '/assets/fonts/Phosphor-Fill.woff2',
    '/404.html'
];

// Combine all logging into a single debug flag
const DEBUG = false;

// Install event: Cache assets
self.addEventListener('install', event => {
    if (DEBUG) console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                if (DEBUG) console.log('[Service Worker] Caching all: app shell and content');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
    if (DEBUG) console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key !== CACHE_NAME) {
                    if (DEBUG) console.log('[Service Worker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

// Fetch event: Serve from cache, fall back to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
