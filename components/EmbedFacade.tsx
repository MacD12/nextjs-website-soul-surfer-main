"use client";

import { useEffect } from "react";

// Click-to-load facades for the heavy third-party embeds (the YouTube background
// video and the Google Maps). The real <iframe> is NOT in the page markup — each
// facade carries the embed URL in data-* attributes and injects the iframe only
// when the visitor clicks. This removes the embeds' console noise (Google's
// in-frame font/ad scripts, the "slow network" font interventions) and their
// weight from the initial load, while keeping the content one click away. The
// surrounding section markup/design is untouched.

const PLAY_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
const MAP_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c3.9 0 7 3.1 7 7 0 5-7 13-7 13S5 14 5 9c0-3.9 3.1-7 7-7Zm0 4.5A2.5 2.5 0 1 0 12 11.5 2.5 2.5 0 0 0 12 6.5Z"/></svg>';

export default function EmbedFacade() {
  useEffect(() => {
    const facades = document.querySelectorAll<HTMLElement>(
      ".ss-embed-facade:not([data-ss-ready])"
    );

    facades.forEach((el) => {
      el.setAttribute("data-ss-ready", "");
      const src = el.getAttribute("data-embed-src") || "";
      const type = el.getAttribute("data-embed-type") || "map";
      const title = el.getAttribute("data-embed-title") || "";
      const poster = el.getAttribute("data-embed-poster");
      const iframeClass =
        el.getAttribute("data-embed-iframe-class") || "ss-embed-iframe";
      if (!src) return;

      if (poster) el.style.backgroundImage = `url("${poster}")`;

      // Visible affordance: a play triangle for video, a "Load map" pill for maps.
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ss-embed-play";
      btn.setAttribute(
        "aria-label",
        type === "video" ? `Play ${title || "video"}` : "Load map"
      );
      btn.innerHTML =
        type === "video" ? PLAY_ICON : `${MAP_ICON}<span>Load map</span>`;
      el.appendChild(btn);

      const load = () => {
        const iframe = document.createElement("iframe");
        iframe.src = src;
        iframe.title = title;
        iframe.className = iframeClass;
        iframe.setAttribute(
          "allow",
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        );
        iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
        iframe.setAttribute("allowfullscreen", "");
        el.classList.add("ss-embed-loaded");
        el.replaceChildren(iframe); // swap poster + button for the live embed
      };

      // Whole facade is clickable; load once, then let the embed take over.
      el.addEventListener("click", load, { once: true });
    });
  }, []);

  return null;
}
