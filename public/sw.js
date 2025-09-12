const CACHE_NAME = "seocontrol-v1"
const STATIC_CACHE = "seocontrol-static-v1"
const DYNAMIC_CACHE = "seocontrol-dynamic-v1"

const STATIC_ASSETS = ["/", "/manifest.json", "/favicon.ico", "/favicon.svg", "/apple-touch-icon.png"]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    }),
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== "GET") return

  // Skip external requests
  if (url.origin !== self.location.origin) return

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }

      return fetch(request).then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response
        }

        // Clone the response
        const responseToCache = response.clone()

        // Determine cache strategy based on request type
        const cacheName = url.pathname.startsWith("/api/") ? DYNAMIC_CACHE : STATIC_CACHE

        caches.open(cacheName).then((cache) => {
          cache.put(request, responseToCache)
        })

        return response
      })
    }),
  )
})
