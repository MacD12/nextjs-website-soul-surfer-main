import fs from "node:fs";
import path from "node:path";

// The main page content (hero, packages, about, reviews, FAQ, location, rates).
// Server-rendered from the preserved Elementor markup so the layout and styling
// are unchanged; all links have been rewritten to internal anchors.
export default function SiteMain() {
  const html = fs.readFileSync(
    path.join(process.cwd(), "data", "sections", "main.html"),
    "utf8"
  );
  return (
    <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
