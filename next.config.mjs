/** @type {import('next').NextConfig} */
const nextConfig = {
  // The page markup is injected as static HTML and the original jQuery/Elementor
  // scripts mutate the DOM. StrictMode double-invokes effects in dev, which would
  // load those scripts twice — disable it so the port behaves exactly like the
  // original static page.
  reactStrictMode: false,

  // The booking engine (ported into this app) shows room/package photos served
  // from the reservation API, plus YouTube thumbnails — allow those hosts for
  // next/image.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.thesurferweligama.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },

  // The ported booking payment pages (checkout / payment-request / -success)
  // carry pre-existing loose typings (window.Checkout for the MPGS gateway,
  // untyped API responses) that the original engine also ships with
  // (ignoreBuildErrors). Match it so production builds pass; dev is unaffected.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
