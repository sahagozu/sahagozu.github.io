/* Patika Pro - Service Worker
   Uygulama kabuğu: önce önbellek, arka planda güncelle (stale-while-revalidate).
   Harita karoları burada ÖNBELLEKLENMEZ: uygulama kendi IndexedDB önbelleğini kullanır
   (lisans kısıtlı kaynaklar için karo saklanmaz). */
const V = "patika-v3";
const SHELL = ["./", "./index.html", "./manifest.json", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== V).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET") return;
  const u = new URL(r.url);
  if (u.origin !== location.origin) return;          // harita karoları ve API'ler ağdan
  if (r.mode === "navigate") {
    const net = fetch(r).then((res) => {
      if (res.ok) caches.open(V).then((c) => c.put("./index.html", res.clone()));
      return res;
    }).catch(() => null);
    e.respondWith(caches.match("./index.html").then((c) => c || net || caches.match("./")));
    e.waitUntil(net);
    return;
  }
  e.respondWith(
    caches.match(r).then((c) => {
      const net = fetch(r).then((res) => {
        if (res.ok) caches.open(V).then((x) => x.put(r, res.clone()));
        return res;
      }).catch(() => c);
      return c || net;
    })
  );
});
