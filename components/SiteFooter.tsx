import fs from "node:fs";
import path from "node:path";

// The site footer. Server-rendered from the preserved Elementor markup with all
// links rewritten to stay on-site.
export default function SiteFooter() {
  const html = fs.readFileSync(
    path.join(process.cwd(), "data", "sections", "footer.html"),
    "utf8"
  );
  return (
    <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
