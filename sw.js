let staticCacheName = 'restaurant-static-v1';

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll([
				'/',
				'/img',
				'/js',
				'/css'
				
			]);
		})
	);
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cachName => {
                    if (cachName != staticCacheName) {
                        return caches.delete(cachName);
                    }
                })
            )
        })
    );
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) { return response ;}
			return fetch(event.request);
		})
		
	);
});