import SiteMain from "../components/SiteMain";
import FaqSchema from "../components/FaqSchema";
import { buildMetadata, SITE_TITLE, SITE_DESCRIPTION } from "../lib/seo";

// Home page metadata — canonical "/" plus a full Open Graph/Twitter card so the
// homepage shares with its own title, description and URL.
export const metadata = buildMetadata({
  path: "/",
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
});

// The LCP hero source, mirroring the hero <img> in main.html. Preloading it here
// (not in the root layout) means only the home page fetches it — preloading it
// globally made every sub-page fetch an unused image ("preloaded but not used"
// console warning). A single JPEG (no responsive srcset variants exist for this
// file), so the preload is a plain image preload.
const HERO_IMAGE =
  "/assets/Soul%20Surfer%20Images/Hero-Sectio_.jpg";

// Home page — the full original homepage content, unchanged. The header, footer
// and client islands are provided by the shared layout, so this renders only the
// page body (hero → packages → about → … → FAQ) exactly as before. FaqSchema adds
// the FAQPage structured data for the FAQ section near the bottom of the page.
export default function Page() {
  return (
    <>
      {/* Preload the LCP hero so it downloads before the CSS/JS, shaving the
          largest-contentful-paint time. React 18 hoists this <link> into <head>. */}
      <link
        rel="preload"
        as="image"
        href={HERO_IMAGE}
        fetchPriority="high"
      />
      <FaqSchema />
      <SiteMain />
    </>
  );
}
