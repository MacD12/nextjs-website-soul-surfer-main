import PageHero from "../../components/PageHero";
import Breadcrumbs from "../../components/Breadcrumbs";
import BookingCTA from "../../components/BookingCTA";
import ContactForm from "../../components/ContactForm";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  path: "/contact",
  title: "Contact Soul Surfer Camp — Weligama, Sri Lanka | Plan Your Surf Week",
  description:
    "Get in touch with the Soul Surfer Camp team in Weligama, Sri Lanka. Ask about rooms, surf levels and availability — we'll help you plan the perfect surf week.",
});

const CONTACT_EMAIL = "info@thesurferweligama.com";
const CONTACT_PHONE_DISPLAY = "+94 76 000 0000";
const CONTACT_PHONE_HREF = "+94760000000";
const CONTACT_ADDRESS = [
  "No 140/13, 3rd Lane, Paranakade",
  "Weligama 81700",
  "Sri Lanka",
];

// Social links reuse the site's espresso "coin" treatment (dark circle, white
// glyph) so they sit in the palette rather than the reference's flat black.
const SOCIALS: { label: string; href: string; path: string }[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    path: "M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.86.07s-3.6 0-4.86-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.52.01-4.76.07-.9.04-1.38.19-1.7.32-.43.16-.74.36-1.06.68-.32.32-.52.63-.68 1.06-.13.32-.28.8-.32 1.7C3.42 8.48 3.4 8.85 3.4 12s.02 3.52.08 4.76c.04.9.19 1.38.32 1.7.16.43.36.74.68 1.06.32.32.63.52 1.06.68.32.13.8.28 1.7.32 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.9-.04 1.38-.19 1.7-.32.43-.16.74-.36 1.06-.68.32-.32.52-.63.68-1.06.13-.32.28-.8.32-1.7.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.9-.19-1.38-.32-1.7a2.85 2.85 0 0 0-.68-1.06 2.85 2.85 0 0 0-1.06-.68c-.32-.13-.8-.28-1.7-.32C15.52 4.01 15.15 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 16.94 4.94 4.94 0 0 1 12 7.06Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-.9a1.15 1.15 0 1 1 0-2.3 1.15 1.15 0 0 1 0 2.3Z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    path: "M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.53-1.5H17V3.6c-.28-.04-1.24-.12-2.36-.12-2.34 0-3.94 1.43-3.94 4.05v2.26H8v3.1h2.7V21h2.8Z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    path: "M21.6 8.02a2.5 2.5 0 0 0-1.76-1.77C18.28 5.83 12 5.83 12 5.83s-6.28 0-7.84.42A2.5 2.5 0 0 0 2.4 8.02 26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .4 3.98 2.5 2.5 0 0 0 1.76 1.77c1.56.42 7.84.42 7.84.42s6.28 0 7.84-.42a2.5 2.5 0 0 0 1.76-1.77A26.2 26.2 0 0 0 22 12a26.2 26.2 0 0 0-.4-3.98ZM10 15V9l5.2 3-5.2 3Z",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact"
        subtitle="Questions about rooms, surf levels or availability? Send us a message and the Weligama team will help you plan the perfect surf week."
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <section className="bg-ss-cream">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
          {/* Left — intro, details and socials */}
          <div>
            <p className="m-0 mb-4 font-onest text-xs font-semibold uppercase tracking-[2px] text-ss-sage">
              We're here to help
            </p>
            <h2 className="m-0 max-w-md font-onest text-[clamp(26px,3.4vw,38px)] font-semibold leading-[1.12] text-ss-espresso">
              If you have questions, don't hesitate to reach out.
            </h2>

            <div className="mt-10 space-y-5 font-onest text-[15px] text-ss-espresso">
              <a
                href={`tel:${CONTACT_PHONE_HREF}`}
                className="flex items-center gap-4 no-underline transition-colors hover:text-ss-sage"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ss-white text-ss-sage shadow-sm">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.1 2.2Z" />
                  </svg>
                </span>
                {CONTACT_PHONE_DISPLAY}
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-4 no-underline transition-colors hover:text-ss-sage"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ss-white text-ss-sage shadow-sm">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Zm0 4v10h16V8l-8 5-8-5Zm0-2 8 5 8-5H4Z" />
                  </svg>
                </span>
                {CONTACT_EMAIL}
              </a>

              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ss-white text-ss-sage shadow-sm">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M12 2c3.9 0 7 3.1 7 7 0 5-7 13-7 13S5 14 5 9c0-3.9 3.1-7 7-7Zm0 4.5A2.5 2.5 0 1 0 12 11.5 2.5 2.5 0 0 0 12 6.5Z" />
                  </svg>
                </span>
                <address className="not-italic leading-relaxed text-ss-body">
                  {CONTACT_ADDRESS.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </div>

            <div className="mt-8 h-px w-full max-w-sm bg-black/10" />

            <div className="mt-6">
              <p className="m-0 mb-3 font-onest text-[13px] font-semibold uppercase tracking-[1.5px] text-ss-body">
                Follow the camp
              </p>
              <div className="flex items-center gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full bg-ss-espresso text-white no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-ss-sage"
                  >
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form card */}
          <div className="rounded-[20px] bg-ss-white p-6 shadow-sm sm:p-9">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map — full-bleed band, framed to match the site's rounded surfaces */}
      <section className="bg-ss-taupe">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="overflow-hidden rounded-[20px] shadow-sm">
            {/* Click-to-load facade — the real map iframe is injected by
                EmbedFacade only on click, keeping the page light and the console
                free of Google's in-frame font/ad noise. */}
            <div
              className="ss-embed-facade ss-embed-facade--map"
              style={{ height: 420 }}
              data-embed-type="map"
              data-embed-title="Soul Surfer Camp location in Weligama"
              data-embed-src="https://www.google.com/maps?q=Weligama%2081700%20Sri%20Lanka&output=embed"
            />
          </div>
        </div>
      </section>

      <BookingCTA
        title="Ready to plan your surf week?"
        text="Tell us your dates and surf level and we'll match you to the right room and package — minutes from the bay and the surf."
        ctaLabel="See the rates"
        ctaHref="/rates"
        secondaryLabel="View the rooms"
        secondaryHref="/rooms"
      />
    </>
  );
}
