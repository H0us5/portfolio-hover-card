const staticCache = "bd-portfolio-v1";
const assets = [
  "./",
  "./index.html",
  "./css/script.css",
  "./js/script.js",
  "./img/image1.webp",
];

// наразі все працює, але на релізі, треба прибрати /dist залишивши чистий шлях

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticCache).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((response) => {
      return response || fetch(fetchEvent.request);
    })
  );
});
