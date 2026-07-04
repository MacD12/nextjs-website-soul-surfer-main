"use client";

import { useEffect } from "react";

// Self-contained carousel controller for the home page's Elementor "loop-carousel"
// widgets (Featured Rooms + Featured Surf Packages).
//
// WHY THIS EXISTS (the permanent fix):
// Those widgets are Elementor loop-carousels whose arrows only work when Elementor
// creates a Swiper instance for them. But this is a static export of the WordPress
// site — Elementor's frontend tries to lazy-load Swiper from `…/lib/swiper/v8/
// swiper.js`, a path that only exists inside a real WP install, so the instance is
// NEVER created and the arrows do nothing. The markup we ship is a frozen snapshot
// of an already-initialised Swiper (baked-in `swiper-initialized` class, an inline
// `transform`, hard-coded 437.5px slide widths, `inert`/`aria-hidden` slides). That
// is why every past attempt to "re-init" the native carousel fought a ghost.
//
// So we DON'T use Swiper at all. This controller:
//   1. Neutralises each widget so Elementor's (broken) handler can never touch it
//      — we change its `data-widget_type` before Elementor's deferred bundle loads,
//      so no Elementor element-handler is ever attached to it.
//   2. Rebuilds the slide belt as a true infinite loop (clones on both ends), so
//      the arrows / autoplay / swipe always produce visible motion even when the
//      number of slides equals the number shown.
//   3. Runs entirely inside a React effect (fires on mount, every time) — zero
//      dependency on any external script or its load timing. That is what makes it
//      reliable where the native carousel was flaky.
//
// It cooperates with RoomGallery (which turns each room card's image into a photo
// gallery): RoomGallery runs first, so by the time we clone slides they already
// carry `.ss-gal`, and the clones inherit working galleries via RoomGallery's
// delegated, data-attribute-driven click handler.

type Settings = {
  perDesktop: number;
  perTablet: number;
  perMobile: number;
  autoplay: boolean;
  delay: number; // autoplay interval (ms)
  speed: number; // slide transition (ms)
};

function readSettings(widget: HTMLElement): Settings {
  const fallback: Settings = {
    perDesktop: 3,
    perTablet: 2,
    perMobile: 1,
    autoplay: true,
    delay: 5000,
    speed: 500,
  };
  try {
    const raw = widget.getAttribute("data-settings");
    if (!raw) return fallback;
    const s = JSON.parse(raw) as Record<string, unknown>;
    const num = (v: unknown, d: number) => {
      const n = parseInt(String(v ?? ""), 10);
      return Number.isFinite(n) && n > 0 ? n : d;
    };
    return {
      perDesktop: num(s.slides_to_show, fallback.perDesktop),
      perTablet: num(s.slides_to_show_tablet, fallback.perTablet),
      perMobile: num(s.slides_to_show_mobile, fallback.perMobile),
      autoplay: s.autoplay ? s.autoplay === "yes" : fallback.autoplay,
      delay: num(s.autoplay_speed, fallback.delay),
      speed: num(s.speed, fallback.speed),
    };
  } catch {
    return fallback;
  }
}

// Package slide images ship lazy (real URL in data-src, an SVG placeholder in src).
// Cloned nodes are never seen by the lazy-loader, so promote data-src → src on any
// clone up front, otherwise the cloned slides would show blank placeholders.
function eagerLoadImages(root: HTMLElement): void {
  root.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
    const real =
      img.getAttribute("data-src") ||
      img.getAttribute("data-lazy-src") ||
      img.getAttribute("data-lazysrc");
    if (real && (!img.getAttribute("src") || img.src.startsWith("data:"))) {
      img.src = real;
    }
    const srcset =
      img.getAttribute("data-srcset") || img.getAttribute("data-lazy-srcset");
    if (srcset) img.setAttribute("srcset", srcset);
    img.classList.remove("perfmatters-lazy");
    img.removeAttribute("loading");
  });
}

function initCarousel(widget: HTMLElement): (() => void) | null {
  if (widget.dataset.ssCarousel === "1") return null;

  const container = widget.querySelector<HTMLElement>(
    ".swiper, .elementor-loop-container"
  );
  const wrapper = widget.querySelector<HTMLElement>(".swiper-wrapper");
  if (!container || !wrapper) return null;

  const real = Array.from(wrapper.children).filter((el) =>
    el.classList.contains("swiper-slide")
  ) as HTMLElement[];
  const N = real.length;
  const prevBtn = widget.querySelector<HTMLElement>(
    ".elementor-swiper-button-prev"
  );
  const nextBtn = widget.querySelector<HTMLElement>(
    ".elementor-swiper-button-next"
  );

  // Nothing to loop through — leave the single slide as-is.
  if (N < 2 || !prevBtn || !nextBtn) {
    widget.dataset.ssCarousel = "1";
    return null;
  }

  const settings = readSettings(widget);
  widget.dataset.ssCarousel = "1";

  // (1) Neutralise the widget so Elementor's deferred bundle never attaches its
  // (non-functional) Swiper handler to it and can't stomp on our transforms.
  widget.setAttribute("data-widget_type", "ss-loop-carousel");
  container.classList.remove("swiper", "swiper-initialized");
  container.style.overflow = "hidden";
  container.style.width = "100%";

  // (2) Clean the frozen-snapshot inline styles off the real slides.
  for (const slide of real) {
    slide.style.removeProperty("width");
    slide.style.removeProperty("margin-right");
    slide.removeAttribute("aria-hidden");
    slide.removeAttribute("inert");
  }

  // (3) Build the infinite belt: a full clone-set of the real slides on each side.
  // Clone counts equal N, which always covers perView (perView <= N), so the belt
  // never runs out of neighbours mid-transition.
  const leading: HTMLElement[] = [];
  const trailing: HTMLElement[] = [];
  const frag = document.createDocumentFragment();
  for (const slide of real) {
    const c = slide.cloneNode(true) as HTMLElement;
    c.dataset.ssClone = "1";
    c.removeAttribute("aria-hidden");
    c.removeAttribute("inert");
    eagerLoadImages(c);
    leading.push(c);
  }
  for (const slide of real) {
    const c = slide.cloneNode(true) as HTMLElement;
    c.dataset.ssClone = "1";
    c.removeAttribute("aria-hidden");
    c.removeAttribute("inert");
    eagerLoadImages(c);
    trailing.push(c);
  }
  eagerLoadImages(wrapper); // real package slides too
  // Order: [leading clones] [real] [trailing clones]
  leading.forEach((c) => frag.appendChild(c));
  wrapper.insertBefore(frag, real[0]);
  const frag2 = document.createDocumentFragment();
  trailing.forEach((c) => frag2.appendChild(c));
  wrapper.appendChild(frag2);

  const belt = [...leading, ...real, ...trailing];
  const realStart = N;

  // Wrapper becomes a flex track we translate ourselves.
  wrapper.style.display = "flex";
  wrapper.style.flexWrap = "nowrap";
  wrapper.style.willChange = "transform";
  wrapper.style.transform = "translate3d(0,0,0)";

  let perView = settings.perDesktop;
  let gap = 30;
  let step = 0; // slide width + gap
  let pos = realStart;
  let animating = false;

  function computePerView(): number {
    const w = window.innerWidth;
    if (w <= 767) return Math.min(settings.perMobile, N);
    if (w <= 1024) return Math.min(settings.perTablet, N);
    return Math.min(settings.perDesktop, N);
  }

  function layout(): void {
    perView = computePerView();
    gap = window.innerWidth <= 767 ? 16 : 30;
    const containerW = container!.clientWidth || widget.clientWidth || 0;
    const slideW = (containerW - gap * (perView - 1)) / perView;
    step = slideW + gap;
    for (const cell of belt) {
      cell.style.flex = "0 0 auto";
      cell.style.width = `${slideW}px`;
      cell.style.marginRight = `${gap}px`;
      cell.style.boxSizing = "border-box";
      cell.style.height = "auto";
    }
    render(false);
  }

  function render(animate: boolean): void {
    wrapper!.style.transition = animate
      ? `transform ${settings.speed}ms cubic-bezier(.25,.8,.25,1)`
      : "none";
    if (animate) void wrapper!.offsetWidth; // reflow so the transition runs from current position
    wrapper!.style.transform = `translate3d(${-(pos * step)}px,0,0)`;
  }

  function normalize(): void {
    if (pos >= realStart + N) {
      pos -= N;
      render(false);
    } else if (pos < realStart) {
      pos += N;
      render(false);
    }
  }

  function go(dir: number): void {
    if (animating) return;
    animating = true;
    pos += dir;
    render(true);
  }

  function onTransitionEnd(e: TransitionEvent): void {
    if (e.target !== wrapper || e.propertyName !== "transform") return;
    normalize();
    animating = false;
  }

  // ---- Wire the arrows ----
  function onPrev(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    stopAuto();
    go(-1);
  }
  function onNext(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    stopAuto();
    go(1);
  }
  prevBtn.addEventListener("click", onPrev);
  nextBtn.addEventListener("click", onNext);

  // ---- Autoplay ----
  let auto: number | null = null;
  let autoStopped = false;
  function startAuto(): void {
    if (!settings.autoplay || autoStopped || auto !== null) return;
    auto = window.setInterval(() => go(1), settings.delay);
  }
  function pauseAuto(): void {
    if (auto !== null) {
      window.clearInterval(auto);
      auto = null;
    }
  }
  function stopAuto(): void {
    // Permanent stop after a real user interaction (matches the original
    // pause_on_interaction:yes behaviour).
    autoStopped = true;
    pauseAuto();
  }
  widget.addEventListener("mouseenter", pauseAuto);
  widget.addEventListener("mouseleave", startAuto);

  // ---- Touch / pointer swipe ----
  let dragging = false;
  let startX = 0;
  let dragDX = 0;
  let didMove = false;

  function onPointerDown(e: PointerEvent): void {
    if (animating) return;
    const t = e.target as Element;
    // Never hijack drags that begin on the arrows or inside a room photo gallery.
    if (
      t.closest(".elementor-swiper-button") ||
      t.closest(".ss-gal") ||
      t.closest(".swiper-no-swiping")
    )
      return;
    dragging = true;
    didMove = false;
    startX = e.clientX;
    dragDX = 0;
    pauseAuto();
    wrapper!.style.transition = "none";
  }
  function onPointerMove(e: PointerEvent): void {
    if (!dragging) return;
    dragDX = e.clientX - startX;
    if (Math.abs(dragDX) > 6) didMove = true;
    if (didMove) {
      wrapper!.style.transform = `translate3d(${-(pos * step) + dragDX}px,0,0)`;
    }
  }
  function endDrag(): void {
    if (!dragging) return;
    dragging = false;
    if (!didMove) {
      startAuto();
      return;
    }
    stopAuto();
    const threshold = Math.min(80, step * 0.25);
    if (dragDX <= -threshold) go(1);
    else if (dragDX >= threshold) go(-1);
    else {
      animating = true;
      render(true); // snap back
    }
  }
  // Suppress the click that a swipe would otherwise fire on the card link.
  function onClickCapture(e: MouseEvent): void {
    if (didMove) {
      e.preventDefault();
      e.stopPropagation();
      didMove = false;
    }
  }

  wrapper.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag);
  wrapper.addEventListener("click", onClickCapture, true);
  wrapper.addEventListener("transitionend", onTransitionEnd);

  // ---- Resize (debounced) ----
  let rAF = 0;
  function onResize(): void {
    if (rAF) window.cancelAnimationFrame(rAF);
    rAF = window.requestAnimationFrame(layout);
  }
  window.addEventListener("resize", onResize);

  // Make the arrows show as usable and reveal the track.
  prevBtn.style.cursor = "pointer";
  nextBtn.style.cursor = "pointer";
  widget.style.setProperty("--ss-carousel-ready", "1");

  layout();
  startAuto();

  return () => {
    pauseAuto();
    prevBtn.removeEventListener("click", onPrev);
    nextBtn.removeEventListener("click", onNext);
    widget.removeEventListener("mouseenter", pauseAuto);
    widget.removeEventListener("mouseleave", startAuto);
    wrapper.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", endDrag);
    window.removeEventListener("pointercancel", endDrag);
    wrapper.removeEventListener("click", onClickCapture, true);
    wrapper.removeEventListener("transitionend", onTransitionEnd);
    window.removeEventListener("resize", onResize);
    if (rAF) window.cancelAnimationFrame(rAF);
  };
}

export default function RoomCarousel() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const widgets = Array.from(
      document.querySelectorAll<HTMLElement>(".elementor-widget-loop-carousel")
    );
    for (const w of widgets) {
      const c = initCarousel(w);
      if (c) cleanups.push(c);
    }
    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
