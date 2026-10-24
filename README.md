# Patika Pro — PWA paketi

## Klasör yapısı
```
patika-pwa/
├─ index.html        Uygulamanın tamamı (Leaflet, JSZip, sql.js gömülü; dışarıdan hiçbir şey yüklemez)
├─ manifest.json     Uygulama adı, simgeler, tam ekran (standalone) ayarı
├─ sw.js             Service Worker: uygulama kabuğunu önbelleğe alır, çevrimdışı açar
└─ icons/            192, 512 ve maskable 512 simgeler
```

## Kod mimarisi (index.html içindeki bölümler)
| Bölüm | Görev |
|---|---|
| Harita çekirdeği | Leaflet, karo önbelleği (IndexedDB), `LAYERS` kayıt defteri, `L.control.layers` |
| GPS ve iz | `onPos`, filtreler, istatistik, kayıtlı izler |
| Düzenlenebilir çizgiler | Rota planı, hedef çizgisi, ölçüm: nokta sürükleme, araya ekleme, silme |
| Bölgeler | Kare, daire, üçgen, çokgen; renk ve saydamlık |
| Arayüz | Cam efektli paneller, karanlık/gece modu, safe-area boşlukları |
| PWA | Service Worker kaydı, yükleme düğmesi |

## Yayınlama (HTTPS gerekir; localhost hariç)
**Bilgisayarda deneme (internet gerekmez):**
```
cd patika-pwa
python3 -m http.server 8080
```
Tarayıcıda `http://localhost:8080` aç. Telefondan denemek için aynı Wi-Fi'de `http://BİLGİSAYAR-IP:8080` yalnızca GPS dışındaki özellikleri açar; GPS ve yükleme için HTTPS gerekir.

**Ücretsiz HTTPS:** klasörü GitHub Pages, Netlify veya Cloudflare Pages'e yükle.

**Android'de (Termux):** `pkg install python`, klasöre gir, `python3 -m http.server 8080`, Chrome'da `http://localhost:8080` aç; menüden "Uygulamayı yükle".

## Güncelleme
`sw.js` içindeki `V` sürüm adını (`patika-v3`) değiştirip dosyaları yeniden yükle; eski önbellek otomatik silinir.

## Sınırlar
- Harita karoları Service Worker'da değil, uygulamanın kendi önbelleğinde saklanır (Menü > Haritalar > Çevrimdışı).
- Google, Yandex, Bing ve anahtarlı haritalar önbelleğe alınmaz; internet gerekir.
- Service Worker yalnızca HTTPS veya localhost'ta çalışır; `file://` ile açılan tek dosya sürümde yoktur.
