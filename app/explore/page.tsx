import PageHero from "../../components/PageHero";
import Breadcrumbs from "../../components/Breadcrumbs";
import TrustStrip from "../../components/TrustStrip";
import BookingCTA from "../../components/BookingCTA";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  path: "/explore",
  title: "Explore the Camp — Soul Surfer, Weligama, Sri Lanka",
  description:
    "An independent boutique surf retreat in Weligama — its own location, a rooftop infinity pool, sea-view dining and a rhythm all of its own, built on a decade of surf hospitality from The Surfer.",
});

const HIGHLIGHTS = [
  { title: "Its own location", text: "A dedicated address just 20 seconds from the beach and 5–10 minutes from Weligama town." },
  { title: "Rooftop infinity pool", text: "A pool overlooking the ocean to float in and reset between surf sessions." },
  { title: "Sea-view rooftop restaurant", text: "Breakfast and dinner with a view right over the south coast." },
  { title: "Runs independently", text: "Its own schedule of surf, yoga and social life — separate from the Beach Camp and TS2." },
];

const INCLUDED = [
  { title: "Surf & theory", text: "Surf lessons (6–11 per week), theory classes and video analysis to level up fast." },
  { title: "Stay & dine", text: "Seven nights' accommodation, breakfast every day, and dinner every day except Sunday." },
  { title: "Yoga & social", text: "Yoga sessions — sunrise or sunset daily on the Yoga package — and daily social activities." },
];

const MAP_SRC =
  "https://maps.google.com/maps?q=" +
  encodeURIComponent("Weligama, Southern Province, Sri Lanka") +
  "&z=13&output=embed";

export default function ExplorePage() {
  return (
    <>
      <PageHero
        eyebrow="The Soul Surfer story"
        title="Explore the Camp"
        subtitle="An independent retreat in Weligama with its own location, a rooftop infinity pool and a rhythm all of its own — just seconds from the beach."
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Explore" }]} />

      {/* Story — text + image */}
      <section className="bg-ss-cream">
        <div className="mx-auto max-w-[1400px] px-6 py-24">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-onest text-[11px] font-semibold uppercase tracking-[2px] text-ss-sage">
                A brand-new camp, a decade of know-how
              </p>
              <h2 className="mt-3 font-onest text-3xl font-semibold leading-tight text-ss-espresso sm:text-[38px]">
                An independent boutique surf retreat
              </h2>
              <p className="mt-6 font-onest text-[17px] leading-relaxed text-ss-body">
                Soul Surfer is a brand-new camp in Weligama, built for the dedicated surfer and
                drawing on more than a decade of surf hospitality from The Surfer's flagship Beach
                Camp and TS2.
              </p>
              <p className="mt-4 font-onest text-[17px] leading-relaxed text-ss-body">
                It runs on its own location, its own rhythm and its own quiet corner of the coast —
                seconds from the sand, minutes from town. This is where you come to surf hard, rest
                well, and fly home a better surfer than you arrived.
              </p>
            </div>
            <div className="overflow-hidden rounded-[15px] shadow-sm">
              <img
                src="/assets/activities/act-beach.jpg"
                alt="Golden-hour beach on the south coast at Soul Surfer, Weligama, Sri Lanka"
                loading="lazy"
                width={1000}
                height={700}
                className="h-[320px] w-full object-cover sm:h-[420px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What makes it different — 4 highlights */}
      <section className="bg-ss-taupe">
        <div className="mx-auto max-w-[1400px] px-6 py-24">
          <div className="mb-12 max-w-2xl">
            <h2 className="font-onest text-3xl font-semibold leading-tight text-ss-espresso sm:text-[36px]">
              What makes Soul Surfer different
            </h2>
            <p className="mt-3 font-onest text-[16px] leading-relaxed text-ss-body">
              Everything the flagship camps are loved for — with its own address, its own pool and
              its own pace.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className="rounded-[15px] bg-ss-white p-7 shadow-sm">
                <h3 className="font-onest text-lg font-semibold leading-snug text-ss-espresso">
                  {h.title}
                </h3>
                <p className="mt-3 font-onest text-[15px] leading-relaxed text-ss-body">
                  {h.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-ss-cream">
        <div className="mx-auto max-w-[1400px] px-6 py-24">
          <div className="mb-12 max-w-2xl">
            <h2 className="font-onest text-3xl font-semibold leading-tight text-ss-espresso sm:text-[36px]">
              What's included in your week
            </h2>
            <p className="mt-3 font-onest text-[16px] leading-relaxed text-ss-body">
              One price, everything handled — surf, stay and the social life that surrounds it.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {INCLUDED.map((item) => (
              <div key={item.title} className="rounded-[15px] bg-ss-white p-8 shadow-sm">
                <h3 className="font-onest text-xl font-semibold text-ss-espresso">
                  {item.title}
                </h3>
                <p className="mt-3 font-onest text-[15px] leading-relaxed text-ss-body">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <a
              href="/rates"
              className="inline-flex items-center gap-1.5 font-onest text-[12px] font-semibold uppercase tracking-[1.2px] text-ss-sage no-underline transition-colors hover:text-ss-espresso"
            >
              See what each package includes
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Location — details + live map */}
      <section className="bg-ss-taupe">
        <div className="mx-auto max-w-[1400px] px-6 py-24">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <p className="font-onest text-[11px] font-semibold uppercase tracking-[2px] text-ss-sage">
                Its own corner of Weligama
              </p>
              <h2 className="mt-3 font-onest text-3xl font-semibold leading-tight text-ss-espresso sm:text-[36px]">
                Where you'll be
              </h2>
              <p className="mt-5 font-onest text-[16px] leading-relaxed text-ss-body">
                A quiet, dedicated address on Sri Lanka's south coast — 20 seconds from the beach,
                5–10 minutes from town, with nine to ten surf spots within a short tuk-tuk ride.
              </p>
              <div className="mt-7 rounded-[15px] bg-ss-white p-7 shadow-sm">
                <p className="font-onest text-[15px] font-semibold text-ss-espresso">
                  Soul Surfer Camp
                </p>
                <p className="mt-1 font-onest text-[15px] leading-relaxed text-ss-body">
                  No 140/13, 3rd Lane, Paranakade,
                  <br />
                  Weligama 81700, Sri Lanka
                </p>
                <p className="mt-3 font-onest text-[14px] text-ss-body">
                  Open daily · office visits by appointment
                </p>
                <a
                  href="https://maps.google.com/?q=Weligama,+Sri+Lanka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 font-onest text-[12px] font-semibold uppercase tracking-[1.2px] text-ss-sage no-underline transition-colors hover:text-ss-espresso"
                >
                  Get directions
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="min-h-[340px] overflow-hidden rounded-[15px] shadow-sm">
              <iframe
                src={MAP_SRC}
                title="Soul Surfer Camp location in Weligama, Sri Lanka"
                loading="lazy"
                className="h-full min-h-[340px] w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <BookingCTA
        title="Your surf week starts here"
        text="Brand-new rooms, a rooftop pool and a camp that runs on its own rhythm. Let's get you booked."
        ctaLabel="See packages"
        ctaHref="/rooms"
        secondaryLabel="View rates"
        secondaryHref="/rates"
      />
    </>
  );
}
