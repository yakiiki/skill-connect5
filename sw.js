// Service Worker for 语言大师
const CACHE_NAME = 'language-master-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/game.js',
    '/courses.js'
];

// 安装时缓存静态资源
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                return self.skipWaiting();
            })
    );
});

// 激活时清理旧缓存
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
});

// 拦截网络请求
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // 如果在缓存中找到，直接返回
                if (response) {
                    return response;
                }
                
                // 否则发起网络请求
                return fetch(event.request)
                    .then((networkResponse) => {
                        // 检查响应是否有效
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }
                        
                        // 克隆响应（因为响应流只能读取一次）
                        const responseToCache = networkResponse.clone();
                        
                        // 将新资源添加到缓存
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return networkResponse;
                    })
                    .catch(() => {
                        // 网络请求失败时，尝试返回离线页面
                        if (event.request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// 后台同步（用于离线数据同步）
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-user-data') {
        event.waitUntil(syncUserData());
    }
});

// 推送通知
self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"%3E%3Crect fill="%2358CC02" width="192" height="192" rx="24"/%3E%3Ctext x="96" y="120" font-size="80" text-anchor="middle" fill="white"%3E��%3C/text%3E%3C/svg%3E',
        badge: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"%3E%3Crect fill="%2358CC02" width="96" height="96" rx="12"/%3E%3Ctext x="48" y="60" font-size="40" text-anchor="middle" fill="white"%3E��%3C/text%3E%3C/svg%3E',
        vibrate: [100, 50, 100],
        data: {
            url: '/'
        },
        actions: [
            {
                action: 'study',
                title: '开始学习',
                icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"%3E%3Ctext x="48" y="60" font-size="40" text-anchor="middle"%3E��%3C/text%3E%3C/svg%3E'
            },
            {
                action: 'close',
                title: '关闭',
                icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"%3E%3Ctext x="48" y="60" font-size="40" text-anchor="middle"%3E✕%3C/text%3E%3C/svg%3E'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('语言大师', options)
    );
});

// 点击通知
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'study') {
        event.waitUntil(
            clients.openWindow('/?action=study')
        );
    } else if (event.action === 'close') {
        // 什么都不做，只关闭通知
    } else {
        event.waitUntil(
            clients.openWindow(event.notification.data.url)
        );
    }
});

// 同步用户数据的函数
async function syncUserData() {
    // 这里可以添加与服务器同步数据的逻辑
    console