# Лаб 8 — Bootstrap ба Tailwind CSS: нэг хуудас, хоёр арга

Лаб 6-ийн «Зургийн цомог портал» хуудсыг Bootstrap 5.3 ба Tailwind CSS 4-өөр тус тусад нь бүтээсэн.
Хоёр хуудасны агуулга ижил: navbar, 3 баганатай 6 зургийн card grid, зураг нэмэх form (validation-тэй), dark mode товч.

```
components/lab8/
├── images/                 ← хоёр хуудас хамтдаа ашиглах 6 зураг (.webp)
├── bootstrap/
│   ├── index.html          ← Bootstrap-ийг CDN-ээс (SRI integrity-тэй) холбоно
│   ├── style.css           ← .btn-brand (CSS variable)
│   └── app.js              ← data-bs-theme солих, .was-validated validation
└── tailwind/
    ├── package.json        ← tailwindcss + @tailwindcss/cli
    ├── src/input.css       ← @import "tailwindcss", @custom-variant dark, @theme --color-brand
    ├── dist/output.css     ← build-ийн үр дүн (minify)
    ├── index.html
    └── app.js              ← data-theme солих, мобайл цэс, data-submitted validation
```

## Tailwind build

```bash
cd components/lab8/tailwind
npm install
npm run build      # tailwindcss -i ./src/input.css -o ./dist/output.css --minify
npm run dev        # --watch горим
```

## Даалгаврын биелэлт

| # | Bootstrap | Tailwind |
|---|---|---|
| 1. Navbar, 3 баганатай grid, form | `navbar-expand-md` + collapse, `row-cols-1 row-cols-sm-2 row-cols-lg-3`, `.needs-validation` → `.was-validated`, `.invalid-feedback` | `md:flex` + `data-open:flex`, `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, `user-invalid:` ба `group-data-submitted:invalid:` variant |
| 2. Холболт / build | jsDelivr CDN (`integrity` + `crossorigin`) | `@tailwindcss/cli`, `npm run build` |
| 3. Dark mode | `<html data-bs-theme="dark">` | `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *))` |
| 4. Брэнд өнгө | `.btn-brand { --bs-btn-bg: var(--brand); … }` | `@theme { --color-brand: #2563eb; }` → `bg-brand`, `outline-brand`, `accent-brand` |

## Хэмжилт

Хэмжилтийг 2026-11-12-нд хийсэн. Lighthouse 13, Chromium, gzip шахалттай локал сервер ашигласан. Мобайл ба desktop горимд тус бүр 3 удаа ажиллуулахад онооны ялгаа гараагүй.
Тэмдэглэл: хэмжилт хийсэн орчинд CDN хаалттай байсан. Тиймээс Bootstrap хуудсыг CDN-ийнхтэй **яг ижил** файлаар (npm-ээс авсан `bootstrap@5.3.8`, SRI hash таарсан) локал серверээс ачаалж хэмжсэн.

| Үзүүлэлт | Bootstrap 5.3.8 | Tailwind 4.3.5 |
|---|---|---|
| Framework CSS (raw / gzip) | 226.7 KB / 30.1 KB | 16.7 KB / 4.0 KB *(зөвхөн хэрэглэсэн класс)* |
| Framework JS (raw / gzip) | 78.6 KB / 23.2 KB *(navbar collapse-д)* | 0 KB |
| Өөрийн CSS + JS (raw) | 1.1 KB + 1.0 KB | — + 1.5 KB |
| HTML (raw / gzip) | 11.5 KB / 3.2 KB | 17.0 KB / 3.4 KB |
| **Нийт CSS+JS+HTML (gzip)** | **≈ 57.5 KB** | **≈ 8.1 KB** |
| Lighthouse нийт дамжуулсан хэмжээ (зурагтай) | 93.8 KB, 14 хүсэлт | 43.9 KB, 10 хүсэлт |
| Нэг card-ын class тоо (7 элемент) | **18** | **39** |
| Lighthouse — мобайл (Perf / A11y / BP / SEO) | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Lighthouse — desktop (Perf / A11y / BP / SEO) | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Мобайл FCP / LCP | 1.1 s / 1.5 s | 0.8 s / 1.0 s |
| Desktop FCP / LCP | 0.3 s / 0.4 s | 0.2 s / 0.3 s |
| TBT / CLS | 0 ms / 0 | 0 ms / 0 |

## Дүгнэлт

Хоёр хуудас хоёулаа Lighthouse-ийн 4 ангилалд 100 оноо авсан тул жижиг хуудсанд аль аргыг сонгох нь хэрэглэгчийн туршлагад мэдэгдэхүйц ялгаа гаргахгүй. Харин ачаалах хэмжээгээр Tailwind давуу: build хийхдээ зөвхөн хэрэглэсэн классыг үлдээдэг тул CSS нь 4 KB (gzip) болсон. Bootstrap ашиглаагүй компонентуудаа ч хамт ачаалдаг тул 30 KB CSS, 23 KB JS ирж, мобайл дээрх LCP 0.5 секундээр удаан гарсан. Эсрэгээрээ Bootstrap-ийн HTML илүү цэвэр байна: нэг card-д 18 класс хэрэглэсэн бол Tailwind-д 39 класс хэрэглэсэн. Мөн Bootstrap-д form validation, collapse цэс шууд бэлэн ирдэг бөгөөд build хийх шаардлагагүй. Иймд хурдан prototype хийх, бэлэн компонент хэрэгтэй үед Bootstrap тохиромжтой. Өөрийн дизайнтай, гүйцэтгэлд чухал ач холбогдол өгдөг төсөлд Tailwind илүү тохиромжтой. Tailwind-ийн давтагдах урт классуудыг компонент эсвэл template болгон багцалж зохицуулна.
