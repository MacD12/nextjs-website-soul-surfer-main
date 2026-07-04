# Soul Surfer Camp — Next.js build

A **Next.js (App Router)** version of the Soul Surfer Camp site that is a
**pixel-identical** port of the static site — same design, same CSS, same assets,
same interactive behaviour — running on Next.js.

## Run it

You need **Node.js 18+** (tested on Node 24).

```bash
cd nextjs-website
npm install        # first time only
npm run dev        # http://localhost:3000   (development)
```

Production:

```bash
npm run build
npm start          # http://localhost:3000
```

## How it stays pixel-identical

This is a faithful port, not a redesign. The original look is preserved exactly:

| Piece | How it's handled |
|---|---|
| **Styles** | All 49 original stylesheets concatenated **in document order** into `public/css/app.css` and linked once in `app/layout.js`. Served as a static file, so the cascade and every `url(../assets/…)` resolve exactly as before. |
| **Markup** | The original page's `<body>` HTML lives in `data/body.html` and is injected by the server component `app/page.js` (`dangerouslySetInnerHTML`). A `display:contents` wrapper means no extra layout box is added. |
| **Body classes** | The original `elementor-kit-6 … elementor-page-2` classes are applied to `<body>` in the layout — Elementor's CSS depends on them. |
| **Scripts** | The original jQuery / Elementor / SmartMenus / perfmatters / Trustindex scripts are loaded **in exact order** by `app/Scripts.js` (`async = false` guarantees ordering), after the markup is in the DOM. |
| **Assets** | All images + the Onest font live in `public/assets/…` and are served at the same paths. |

Removed (non-visual, carried over from the cleaned static build): Google Tag
Manager, CookieYes consent scripts, hCaptcha, and SEO/speculation-rules bloat.

## Project structure

```
nextjs-website/
├── app/
│   ├── layout.js     # <html>/<body>, body classes, stylesheet link, metadata
│   ├── page.js       # server component → injects data/body.html
│   └── Scripts.js    # client component → loads original JS in order
├── data/
│   └── body.html     # original <body> markup (scripts stripped, /assets paths)
├── public/
│   ├── css/app.css   # 49 stylesheets concatenated in order
│   ├── js/           # original scripts (+ zz-reveal.js)
│   └── assets/       # images + Onest font
├── next.config.mjs   # reactStrictMode off (so DOM scripts don't double-run in dev)
└── package.json
```

## Notes

- A few parts still call external services at runtime (Trustindex reviews widget,
  Google Maps embed) — same as the original site.
- This folder is self-contained and does **not** affect the static site in the
  repository root or the `coded-website/` build.
