import fs from "node:fs";
import path from "node:path";

// The site header (logo, Soul Surfer nav, Book Now). Rendered as a Server
// Component: the Elementor markup is preserved verbatim so the design stays
// pixel-identical, but the menu links now point to on-page section anchors
// (#about, #activities, #packages, #rates, #faq, #reviews) instead of the
// original external site.
export default function SiteHeader() {
  const html = fs.readFileSync(
    path.join(process.cwd(), "data", "sections", "header.html"),
    "utf8"
  );
  // display:contents makes this wrapper generate no box, so <header> behaves as
  // a direct child of <body> exactly as in the original document.
  return (
    <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
