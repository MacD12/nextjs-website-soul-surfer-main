import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./overrides.css";
import "./palette.css";
import "./booking.css";
import Scripts from "./Scripts";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import SectionAnchors from "../components/SectionAnchors";
import LanguageSwitcher from "../components/LanguageSwitcher";
import NavGuard from "../components/NavGuard";
import MobileNav from "../components/MobileNav";
import RoomGallery from "../components/RoomGallery";
import RoomCarousel from "../components/RoomCarousel";
import EmbedFacade from "../components/EmbedFacade";
import MarketingChrome from "../components/MarketingChrome";
import StructuredData from "../components/StructuredData";
import {
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE,
} from "../lib/seo";

const FAVICON =
  "/assets/www.beyondsenses.de/wp-content/uploads/2025/10/favicon-icon.png";

// Site-wide metadata baseline. Individual routes override title/description and
// their canonical + Open Graph/Twitter cards via buildMetadata() (lib/seo.ts);
// anything a route does not set falls back to these values.
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://soulsurfer.example"
  ),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "The Surfer Surf Camps" }],
  creator: "The Surfer Surf Camps",
  publisher: "Soul Surfer",
  category: "travel",
  keywords: [
    "Soul Surfer",
    "Soul Surfer Camp",
    "surf camp Weligama",
    "surf camp Sri Lanka",
    "Sri Lanka surf retreat",
    "boutique surf camp",
    "surf and yoga Sri Lanka",
    "Weligama surf lessons",
    "surf holiday Sri Lanka",
  ],
  // Stop iOS Safari auto-linking plain-text phone numbers, which would recolour
  // copy and clash with the design; the contact page still uses explicit tel:/
  // mailto: links, which are unaffected.
  formatDetection: { telephone: false },
  icons: { icon: FAVICON, apple: FAVICON },
  openGraph: {
    type: "website",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    url: "/",
    locale: "en_GB",
    alternateLocale: ["de_DE"],
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1920,
        height: 1080,
        alt: "Soul Surfer — boutique surf camp with a rooftop infinity pool in Weligama, Sri Lanka",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// The exact <body> classes from the original page — Elementor's CSS targets these
// (elementor-kit-6, elementor-page-2, etc.), so they must be preserved verbatim.
const BODY_CLASS =
  "home wp-singular page-template page-template-elementor_header_footer page page-id-2 wp-custom-logo wp-embed-responsive wp-theme-hello-elementor hello-elementor-default elementor-default elementor-template-full-width elementor-kit-6 elementor-page elementor-page-2 e--ua-blink e--ua-chrome e--ua-webkit";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Runs before Next's dev error overlay registers its listeners, so it
            can swallow the (non-fatal) ChunkLoadError thrown when Elementor tries
            to lazy-load widget-handler chunks from the original site's URL — those
            hashed chunks no longer exist (404). Scoped to Elementor/beyondsenses
            chunk failures only, so genuine Next.js chunk errors still surface. */}
        <Script id="elementor-chunk-error-guard" strategy="beforeInteractive">
          {`(function(){function isElChunkErr(x){if(!x)return false;var m=String(x.message||x);return /Loading chunk/.test(m)&&/(beyondsenses\\.de|elementor)/i.test(m);}window.addEventListener("error",function(e){if(isElChunkErr(e.error)||(/Loading chunk/.test(String(e.message||""))&&/(beyondsenses\\.de|elementor)/i.test(String(e.message||"")))){e.preventDefault();e.stopImmediatePropagation();}},true);window.addEventListener("unhandledrejection",function(e){if(isElChunkErr(e.reason)){e.preventDefault();e.stopImmediatePropagation();}},true);})();`}
        </Script>
        {/* NOTE: the LCP hero preload lives in app/page.tsx, not here. The hero
            <img> only exists on the home page, so preloading it globally made
            every sub-page (/rooms, /contact, …) download an image it never
            renders — the browser's "preloaded but not used" warning. */}
        {/* All 49 original stylesheets, concatenated in document order. Served as a
            static file so the cascade and every url(../assets/…) resolve exactly
            as on the original page. */}
        <link rel="stylesheet" href="/css/app.css" />
        <StructuredData />
      </head>
      <body className={BODY_CLASS} data-elementor-device-mode="tablet">
        {/* Marketing chrome (header + footer + client islands + Elementor scripts)
            wraps every marketing page. MarketingChrome skips all of it on booking
            routes, which render inside a `.ss-booking` scope with their own
            BookingNavbar/Footer. */}
        <MarketingChrome
          header={<SiteHeader />}
          footer={
            <>
              <SiteFooter />
              <SectionAnchors />
              <LanguageSwitcher />
              <NavGuard />
              <MobileNav />
              <RoomGallery />
              <RoomCarousel />
              <EmbedFacade />
              <Scripts />
            </>
          }
        >
          {children}
        </MarketingChrome>
      </body>
    </html>
  );
}
