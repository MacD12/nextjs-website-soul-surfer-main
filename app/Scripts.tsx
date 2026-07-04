"use client";

import { useEffect } from "react";

// The original page's scripts, in exact document order. jQuery → Elementor →
// Elementor Pro, with each *-before/-after config kept adjacent to its script.
// `async = false` on dynamically-created scripts guarantees in-order execution.
const SCRIPTS: string[] = [
  "/js/j006-ear-licensing-helper-js-after.js",
  "/js/j007-jquery-core-js.js",
  // j008-inline.js intentionally omitted — it was a leftover Google Tag Manager
  // loader (GTM-TGRD8TJ) from the original site. It pulled in Google Ads /
  // DoubleClick trackers that get blocked by ad-blockers (ERR_BLOCKED_BY_CLIENT)
  // and threw a removeChild error in GTM's frame_start.js. Not ours — removed.
  "/js/j009-pmcs-1-video-play-fallback-js.js",
  "/js/j011-inline.js",
  "/js/j012-elementor-webpack-runtime-js.js",
  "/js/j013-elementor-frontend-modules-js.js",
  "/js/j014-jquery-ui-core-js.js",
  "/js/j015-elementor-frontend-js-before.js",
  "/js/j016-elementor-frontend-js.js",
  "/js/j017-smartmenus-js.js",
  "/js/j018-e-sticky-js.js",
  "/js/j019-imagesloaded-js.js",
  "/js/j020-perfmatters-lazy-load-js-before.js",
  "/js/j021-perfmatters-lazy-load-js.js",
  "/js/j022-trustindex-loader-js-js.js",
  "/js/j023-elementor-pro-webpack-runtime-js.js",
  "/js/j024-wp-hooks-js.js",
  "/js/j025-wp-i18n-js.js",
  "/js/j026-wp-i18n-js-after.js",
  "/js/j027-elementor-pro-frontend-js-before.js",
  "/js/j028-elementor-pro-frontend-js.js",
  "/js/j029-pro-elements-handlers-js.js",
  "/js/j032-inline.js",
  "/js/j033-inline.js",
  "/js/j034-perfmatters-delayed-scripts-js.js",
  "/js/j035-inline.js",
  "/js/j036-inline.js",
  "/js/zz-reveal.js",
];

export default function Scripts() {
  useEffect(() => {
    // Guard against double-injection (e.g. fast refresh / strict mode).
    if (window.__soulSurferScriptsLoaded) return;
    window.__soulSurferScriptsLoaded = true;

    const inject = () => {
      for (const src of SCRIPTS) {
        const s = document.createElement("script");
        s.src = src;
        s.async = false; // preserve execution order
        document.body.appendChild(s);
      }
    };

    // Defer the ~685 KB jQuery + Elementor bundle until the main thread is idle,
    // so it no longer competes with first paint / LCP. requestIdleCallback fires
    // as soon as the browser is free (typically well under a second), so the
    // carousels, sticky header and menu still initialise promptly. A `timeout`
    // guarantees it runs even on a busy thread; a one-time interaction listener
    // forces it immediately if the user engages before idle.
    const ric: (cb: () => void, opts?: IdleRequestOptions) => number =
      typeof window.requestIdleCallback === "function"
        ? (cb, opts) => window.requestIdleCallback(cb, opts)
        : (cb) => window.setTimeout(cb, 200);

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      inject();
    };

    ric(() => start(), { timeout: 2500 });

    const onFirstInteraction = () => start();
    const events: string[] = ["pointerdown", "keydown", "touchstart", "scroll"];
    for (const evt of events) {
      window.addEventListener(evt, onFirstInteraction, {
        once: true,
        passive: true,
      });
    }
  }, []);

  return null;
}
