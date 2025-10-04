// Service Worker for Pool Control Dashboard PWA
const CACHE_NAME = 'pool-control-v1';
const STATIC_CACHE_NAME = 'pool-control-static-v1';
const DYNAMIC_CACHE_NAME = 'pool-control-dynamic-v1';

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/index.html',
  '/scripts/widgets.js',
  '/scripts/controller.js',
  '/scripts/dashboard.js',
  '/scripts/bodies.js',
  '/scripts/circuits.js',
  '/scripts/pumps.js',
  '/scripts/chemistry.js',
  '/scripts/lightGroups.js',
  '/scripts/schedules.js',
  '/scripts/configPage.js',
  '/scripts/uploader.js',
  '/jquery-ui/jquery-ui.css',
  '/jquery-ui/jquery-ui.theme.css',
  '/font-awesome/css/all.css',
  '/themes/intellibrite.css',
  '/themes/widgets.css',
  '/themes/configPage.css',
  '/themes/dashboard.css',
  '/themes/default/theme.css',
  '/socket.io-client/socket.io.js',
  '/jquery/dist/jquery.js',
  '/jquery-ui/jquery-ui.js',
  '/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Static files cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Error caching static files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip socket.io requests (they need real-time connection)
  if (url.pathname.startsWith('/socket.io/')) {
    return;
  }

  // Skip API requests that need real-time data
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/config/')) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('Serving from cache:', request.url);
          return cachedResponse;
        }

        console.log('Fetching from network:', request.url);
        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();

            // Cache dynamic content
            caches.open(DYNAMIC_CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              });

            return response;
          })
          .catch((error) => {
            console.error('Fetch failed:', error);
            
            // Return offline page for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            
            throw error;
          });
      })
  );
});

// Handle background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'pool-control-sync') {
    event.waitUntil(
      // Sync offline data when connection is restored
      syncOfflineData()
    );
  }
});

// Handle push notifications (for future use)
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'Pool Control Update',
    icon: '/icons/apple-icon-180x180.png',
    badge: '/icons/apple-icon-60x60.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open Dashboard',
        icon: '/icons/apple-icon-60x60.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/apple-icon-60x60.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Pool Control Dashboard', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Function to sync offline data
async function syncOfflineData() {
  try {
    // Get offline data from IndexedDB
    const offlineData = await getOfflineData();
    
    if (offlineData && offlineData.length > 0) {
      console.log('Syncing offline data:', offlineData.length, 'items');
      
      // Send offline data to server
      for (const data of offlineData) {
        try {
          await fetch('/api/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });
          
          // Remove synced data from offline storage
          await removeOfflineData(data.id);
        } catch (error) {
          console.error('Failed to sync data:', error);
        }
      }
    }
  } catch (error) {
    console.error('Error syncing offline data:', error);
  }
}

// Helper functions for offline data management
async function getOfflineData() {
  // This would typically use IndexedDB
  // For now, return empty array
  return [];
}

async function removeOfflineData(id) {
  // This would typically remove from IndexedDB
  console.log('Removing offline data:', id);
}

// Handle app updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
