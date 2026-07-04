"use client";

import { useEffect } from "react";

// Per-room image galleries on the home "Featured Rooms" carousel.
//
// Each card's single image becomes a click-through gallery (arrows + dots). The
// tricky part: the section is a swiper carousel that CLONES slides for looping,
// and cloneNode copies markup but not event listeners or JS state. So instead of
// per-element listeners we use ONE delegated listener on the document, and we
// store each gallery's photos + current index in data attributes — which clone
// fine. That makes the controls work on original and cloned slides alike.

const GALLERIES: Record<string, string[]> = {
  "mixed dormitory": [
    "/assets/rooms/dorm-1.jpg",
    "/assets/rooms/dorm-2.jpg",
    "/assets/rooms/dorm-3.jpg",
    "/assets/rooms/dorm-4.jpg",
    "/assets/rooms/dorm-5.jpg",
  ],
  "private single room ensuite": [
    "/assets/rooms/single-1.jpg",
    "/assets/rooms/single-2.jpg",
    "/assets/rooms/single-3.jpg",
    "/assets/rooms/single-4.jpg",
    "/assets/rooms/single-5.jpg",
  ],
  "private double / twin room ensuite": [
    "/assets/rooms/double-1.jpg",
    "/assets/rooms/double-2.jpg",
    "/assets/rooms/double-3.jpg",
    "/assets/rooms/double-4.jpg",
    "/assets/rooms/double-5.jpg",
  ],
};

function galleryForCard(widget: Element): string[] | null {
  const card =
    widget.closest(".elementor-element-3b62ef7") ||
    widget.closest(".swiper-slide") ||
    widget.parentElement;
  const title = (card?.textContent || "").toLowerCase();
  for (const key of Object.keys(GALLERIES)) {
    if (title.includes(key)) return GALLERIES[key];
  }
  return null;
}

export default function RoomGallery() {
  useEffect(() => {
    function build(widget: Element): void {
      // Skip if this widget already has a gallery — covers processed originals
      // AND swiper's cloned slides (the clone carries a copied .ss-gal).
      if (widget.querySelector(".ss-gal")) return;
      const images = galleryForCard(widget);
      if (!images || images.length === 0) return;

      const alt =
        widget.querySelector("img")?.getAttribute("alt") ||
        "Soul Surfer room in Weligama, Sri Lanka";

      const gal = document.createElement("div");
      // `swiper-no-swiping` = Swiper's official opt-out: it ignores pointer/drag
      // events that start inside this element, so clicks on the gallery arrows/dots
      // are never swallowed by Swiper's touch handling even when it is active.
      gal.className = "ss-gal swiper-no-swiping";
      gal.setAttribute("data-ss-images", images.join("|")); // state survives cloning
      gal.setAttribute("data-ss-index", "0");
      gal.innerHTML =
        `<img class="ss-gal-img" alt="${alt}" src="${images[0]}">` +
        `<button type="button" class="ss-gal-nav ss-gal-prev" aria-label="Previous photo">&#8249;</button>` +
        `<button type="button" class="ss-gal-nav ss-gal-next" aria-label="Next photo">&#8250;</button>` +
        `<div class="ss-gal-dots">` +
        images
          .map(
            (_, i) =>
              `<button type="button" class="ss-gal-dot${
                i === 0 ? " is-active" : ""
              }" data-ss-dot="${i}" aria-label="Photo ${i + 1} of ${images.length}"></button>`
          )
          .join("") +
        `</div>`;

      images.forEach((src) => {
        const im = new window.Image();
        im.src = src;
      });

      const original =
        widget.querySelector("picture") || widget.querySelector("img");
      if (original) original.replaceWith(gal);
      else widget.appendChild(gal);
    }

    function mountAll(): void {
      document
        .querySelectorAll(".elementor-element-2e3cd55 .elementor-element-e77e946")
        .forEach(build);
    }

    mountAll();

    // ONE delegated handler (capture phase, so it runs before swiper's own
    // pointer handling). Reads/writes state from the clicked gallery's data attrs.
    function onClick(event: Event): void {
      const target = event.target as Element;
      const btn = target.closest<HTMLElement>(
        ".ss-gal-next, .ss-gal-prev, .ss-gal-dot"
      );
      if (!btn) return;
      const gal = btn.closest<HTMLElement>(".ss-gal");
      if (!gal) return;
      event.preventDefault();
      event.stopPropagation();

      const images = (gal.getAttribute("data-ss-images") || "")
        .split("|")
        .filter(Boolean);
      if (images.length === 0) return;
      let index = parseInt(gal.getAttribute("data-ss-index") || "0", 10);

      if (btn.classList.contains("ss-gal-next")) {
        index = (index + 1) % images.length;
      } else if (btn.classList.contains("ss-gal-prev")) {
        index = (index - 1 + images.length) % images.length;
      } else {
        index = parseInt(btn.getAttribute("data-ss-dot") || "0", 10);
      }

      gal.setAttribute("data-ss-index", String(index));
      const img = gal.querySelector<HTMLImageElement>(".ss-gal-img");
      if (img) img.src = images[index];
      gal
        .querySelectorAll(".ss-gal-dot")
        .forEach((d, i) => d.classList.toggle("is-active", i === index));
    }
    document.addEventListener("click", onClick, true);

    // Swiper injects cloned slides after init; give each a gallery.
    const observer = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.addedNodes.length > 0)) mountAll();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("click", onClick, true);
      observer.disconnect();
    };
  }, []);

  return null;
}
