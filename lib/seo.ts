import type { Metadata } from "next";

// Central SEO helper. Every page builds its metadata through buildMetadata() so
// each route gets its OWN canonical URL, Open Graph card and Twitter card — with
// the page's real title/description/URL — instead of silently inheriting the
// homepage's social card (Next.js does not derive per-page og:title/og:description
// from the page <title>; the parent openGraph object is used verbatim unless a
// page defines its own). Design and page copy are untouched — this only shapes
// the <head> metadata crawlers and social/AI scrapers read.

export const SITE_NAME = "Soul Surfer";

export const SITE_TITLE =
  "Soul Surfer — Independent Boutique Surf Camp in Weligama, Sri Lanka";

export const SITE_DESCRIPTION =
  "Soul Surfer is an independent boutique surf retreat in Weligama, Sri Lanka — brand-new rooms, a rooftop infinity pool, sea-view dining, and surf weeks for the dedicated surfer.";

// Shared social-share image (the LCP hero). Resolved against metadataBase, which
// is set once in the root layout, so a relative path is correct here.
export const DEFAULT_OG_IMAGE =
  "/assets/Soul%20Surfer%20Images/Hero-Sectio_.jpg";

const DEFAULT_OG_ALT =
  "Soul Surfer — boutique surf camp with a rooftop infinity pool in Weligama, Sri Lanka";

export function buildMetadata({
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_ALT,
}: {
  /** Route path, e.g. "/rooms" or "/" — used for canonical + og:url. */
  path: string;
  /** Full <title> for the page (already brand/location qualified). */
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: path,
      title,
      description,
      locale: "en_GB",
      alternateLocale: ["de_DE"],
      images: [
        {
          url: image,
          width: 1920,
          height: 1080,
          alt: imageAlt,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
