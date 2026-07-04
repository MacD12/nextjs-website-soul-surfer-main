"use client";

import { useEffect } from "react";

// The Elementor sections only carry random hash IDs, so the header nav links
// (#about, #activities, …) have nothing to target. This component runs once on
// the client and assigns those semantic IDs to the matching section headings by
// text, and adds scroll-margin so the sticky header doesn't overlap the target.
const ANCHORS: ReadonlyArray<[string, string]> = [
  ["about", "Soul Surfer Camp"],
  ["packages", "Featured Surf Packages"],
  ["activities", "More than just surf"],
  ["reviews", "guests say"],
  ["location", "own corner of Weligama"],
  ["rates", "Surf Packages & Weekly Rates"],
  ["faq", "Frequently Asked Questions"],
];

export default function SectionAnchors() {
  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>("h1, h2, h3")
    );
    for (const [id, text] of ANCHORS) {
      if (document.getElementById(id)) continue;
      const match = headings.find((h) =>
        (h.textContent || "").trim().includes(text)
      );
      if (match) {
        match.id = id;
        match.style.scrollMarginTop = "110px";
      }
    }
  }, []);

  return null;
}
