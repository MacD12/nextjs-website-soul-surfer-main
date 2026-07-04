import fs from "node:fs";
import path from "node:path";

// Renders one or more homepage section blocks (carved at safe top-level
// boundaries) inside the Elementor page wrapper. The ported CSS targets
// `.elementor-2 .elementor-element-…`, so the wrapper is required for the
// sections to look identical to the homepage. This lets sub-pages reuse the
// exact existing sections with zero visual drift.
export default function PageSections({ blocks }: { blocks: string[] }) {
  const inner = blocks
    .map((name) =>
      fs.readFileSync(
        path.join(process.cwd(), "data", "sections", "blocks", `${name}.html`),
        "utf8"
      )
    )
    .join("\n");

  const html =
    '<div class="elementor elementor-2" data-elementor-type="wp-page" data-elementor-id="2" data-elementor-post-type="page">' +
    inner +
    "</div>";

  return (
    <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
