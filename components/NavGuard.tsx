"use client";

import { useEffect } from "react";

// Guarantees the header nav navigates to its page. Four of the menu items still
// carry an Elementor "nested-menu" dropdown (hidden/unused), and Elementor's JS
// can intercept the title click to toggle that dropdown instead of following the
// link. This capture-phase listener runs BEFORE Elementor's handlers and forces
// navigation for any header menu link pointing at an internal route.
export default function NavGuard() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Respect modifier clicks (new tab, etc.).
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;

      const target = event.target as Element | null;
      const link = target?.closest(
        'header .e-n-menu-title-container[href^="/"]'
      ) as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      event.preventDefault();
      event.stopPropagation();
      window.location.assign(href);
    };

    document.addEventListener("click", onClick, true); // capture phase
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
