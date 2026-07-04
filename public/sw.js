// Kill-switch service worker.
//
// This site does NOT use a service worker. This file exists only to clean up a
// stale service worker that a *previous* app on this localhost origin (e.g. a
// Vite/CRA PWA or another Next project on the same port) registered for scope "/".
//
// The browser keeps that registration tied to the origin and keeps re-fetching
// /sw.js, which produced "GET /sw.js 404" noise. Serving this file lets the
// browser update to a worker that immediately unregisters itself and clears any
// caches it left behind. After it runs once, the registration is gone and the
// requests stop.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Remove every cache this origin's old worker may have created.
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      // Unregister so the browser stops requesting /sw.js.
      await self.registration.unregister();
      // Reload open clients so they detach from the dead worker.
      const clients = await self.clients.matchAll({ type: "window" });
      for (const client of clients) {
        client.navigate(client.url);
      }
    })()
  );
});
