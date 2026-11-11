# Лаб 7 — Sass/SCSS refactor

Лаб 6-ийн «Зургийн цомог портал»-ын харагдацыг өөрчлөхгүйгээр CSS-ийг SCSS болгон дахин зохион байгуулсан.

## Ажиллуулах

```bash
cd lab7
npm install        # sass суулгана
npm run dev        # scss/ өөрчлөгдөх бүрт css/style.css-ийг дахин үүсгэнэ
npm run build      # compressed build → css/style.min.css (index.html үүнийг ашиглана)
```

## Бүтэц

```
lab7/
├── index.html
├── package.json
├── captions.vtt
├── js/main.js
├── css/style.min.css          ← build-ийн үр дүн (compressed)
└── scss/
    ├── main.scss              ← бүх partial-ыг дарааллаар нь @use хийнэ
    ├── abstracts/             ← CSS гаргадаггүй: токен, функц, mixin
    │   ├── _index.scss        (@forward)
    │   ├── _tokens.scss       өнгө, радиус, хугацаа, зай, breakpoint map
    │   ├── _functions.scss    rem(), contrast()
    │   └── _mixins.scss       respond(), flex-center(), hover-only(), custom-props()
    ├── base/                  _root (custom property + dark mode), _reset, _base
    ├── layout/                _header, _navbar, _layout, _sidebar, _footer
    ├── components/            _skip-link, _button, _loader, _gallery, _card, _media
    └── utilities/             _utilities (@each), _motion (prefers-reduced-motion)
```

## Даалгаврын биелэлт

| # | Шаардлага | Хаана |
|---|---|---|
| 1 | npm Sass, scripts, folder бүтэц | `package.json`, `scss/` |
| 2 | Токен map → `:root` custom property | `abstracts/_tokens.scss` → `base/_root.scss` |
| 3 | `respond`, `flex-center` mixin | `abstracts/_mixins.scss`; header, navbar, card, loader, layout, sidebar |
| 4 | `rem()`, `contrast()` функц | `abstracts/_functions.scss`; `--space-*`, `--color-on-accent`, `--color-on-header` |
| 5 | Partial, BEM, `@each` utility, compressed build | `scss/*`, `.card__face--back` г.м., `utilities/_utilities.scss`, `npm run build` |

## Харьцуулалт

Лаб 6 ба Лаб 7-г Playwright-аар 11 төлөвт (цайвар, бараан, таблет, мобайл, мобайл цэс,
flip, hover, гарын focus, сэдэв солих, reduced-motion, skip link, loader) screenshot авч
pixel-ээр харьцуулахад **0 пиксел** ялгаатай гарсан.
