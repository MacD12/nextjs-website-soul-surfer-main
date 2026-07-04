import type { Metadata } from "next";
import PageHero from "../../components/PageHero";
import Breadcrumbs from "../../components/Breadcrumbs";
import BookingCTA from "../../components/BookingCTA";

export const metadata: Metadata = {
  alternates: { canonical: "/faq" },
  title: "FAQ — Soul Surfer Camp Weligama | Booking, Rooms, Surf Levels",
  description:
    "Answers to the real questions before you book Soul Surfer Camp in Weligama, Sri Lanka — pricing, rooms and the rooftop pool, surf levels for beginners and beyond, and how to get there.",
};

type QA = { q: string; a: string; link?: { href: string; label: string } };
type Group = { theme: string; items: QA[] };

const GROUPS: Group[] = [
  {
    theme: "Booking & pricing",
    items: [
      {
        q: "What's included in the weekly price?",
        a: "Every stay includes your room, daily guided surf sessions, theory and video analysis, yoga, and the full social calendar — no hidden extras. The only thing that changes between packages is how much surf and coaching you want each week.",
        link: { href: "/rates", label: "See full rates" },
      },
      {
        q: "How much does a week at Soul Surfer cost?",
        a: "Weekly packages run from €390 to €490 per person, depending on how many lessons and how much coaching you want. Full pricing per package and per night is on the rates page.",
        link: { href: "/rates", label: "View pricing" },
      },
      {
        q: "Do I need to pay a deposit to book?",
        a: "A 25% deposit secures your booking, with the balance due before or on arrival. We confirm availability with you first, then send simple payment details.",
        link: { href: "/rooms", label: "View packages" },
      },
    ],
  },
  {
    theme: "Rooms & facilities",
    items: [
      {
        q: "What room types do you offer?",
        a: "From social mixed dormitories to private single and private double / twin ensuite rooms — all brand-new and boutique-style, built for a proper rest between surfs.",
        link: { href: "/rooms", label: "See the rooms" },
      },
      {
        q: "Is the rooftop infinity pool open to all guests?",
        a: "Yes. The rooftop infinity pool and the sea-view rooftop restaurant are open to every Soul Surfer Camp guest and are included in your stay — they're where the camp gathers to relax after a session.",
      },
      {
        q: "Is there Wi-Fi and air conditioning?",
        a: "Yes — reliable Wi-Fi throughout the camp and air-conditioned private rooms, so you can recover properly between sessions and stay in touch with the crew you'll meet.",
        link: { href: "/rooms", label: "Explore the rooms" },
      },
      {
        q: "Are meals included, and what's the food like?",
        a: "Breakfast and sea-view dining are part of camp life on the rooftop restaurant, with fresh Sri Lankan and international dishes — fuel that actually helps you surf.",
        link: { href: "/explore", label: "Explore the camp" },
      },
    ],
  },
  {
    theme: "Surf level & lessons",
    items: [
      {
        q: "Which surf level is Soul Surfer Camp best for?",
        a: "Soul Surfer is built for intermediate and advanced surfers — the dedicated surfer who wants guiding to the right peaks, theory and video analysis. Motivated beginners are welcome and take daily lessons in Weligama's forgiving bay; complete first-timers are usually best matched to our Beach Camp.",
      },
      {
        q: "Is Soul Surfer good for complete beginners?",
        a: "Motivated beginners are welcome and learn fast in Weligama's gentle beach break with daily lessons. If you've genuinely never stood on a board, our Beach Camp is set up specifically for first-timers — Soul Surfer really shines once you're ready to level up.",
        link: { href: "/activities", label: "See how a week works" },
      },
      {
        q: "How many surf lessons or sessions do I get each week?",
        a: "It depends on your package — from six guided sessions a week up to eleven for the dedicated surfer, plus theory and video analysis on top.",
        link: { href: "/rates", label: "Compare packages" },
      },
      {
        q: "Do you provide surfboards and equipment?",
        a: "Yes — boards for every level and every condition are available, and our guides help you pick the right kit each day, so you're never stuck on the wrong board.",
      },
    ],
  },
  {
    theme: "Location & getting there",
    items: [
      {
        q: "Where exactly is Soul Surfer located?",
        a: "In Weligama on Sri Lanka's south coast — its own dedicated location, about 20 seconds' walk from the beach and 5–10 minutes from Weligama town.",
        link: { href: "/explore", label: "See the location" },
      },
      {
        q: "How do I get to the camp from the airport?",
        a: "Colombo (CMB) airport is roughly a 2.5–3 hour drive to Weligama, and the southern expressway makes it straightforward. Our team can help arrange a private transfer so you arrive without the hassle.",
        link: { href: "/explore", label: "Explore the camp" },
      },
      {
        q: "How is Soul Surfer Camp different from The Surfer Beach Camp and TS2 Camp?",
        a: "Soul Surfer Camp is a more independent, boutique-style surf camp with its own setup, a rooftop restaurant with sea view, and a rooftop pool, about 20 seconds from the beach and 5–10 minutes from Weligama town. It keeps The Surfer's original social vibe while the Beach Camp and TS2 share daily lessons, yoga, dinners and events at the Beach Camp — Soul Surfer keeps its own atmosphere and facilities.",
      },
      {
        q: "Can Soul Surfer Camp guests join Beach Camp activities?",
        a: "Absolutely. Soul Surfer runs independently with its own location, but guests are always welcome to join the wider The Surfer community's beach days, boat parties and social events — the calm of a boutique camp with the buzz of the bigger crew.",
      },
    ],
  },
];

// FAQPage structured data, generated from the same source as the visible page so
// the two never drift. This is what lets Google surface the answers directly.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: GROUPS.flatMap((g) =>
    g.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    }))
  ),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        eyebrow="Good to know"
        title="Frequently Asked Questions"
        subtitle="Everything worth knowing before you book your surf week — pricing, rooms, surf levels and getting to Weligama. Can't find it here? Just ask the team."
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />

      <section className="bg-ss-cream">
        <div className="mx-auto max-w-3xl px-6 py-20">
          {GROUPS.map((group, gi) => (
            <div key={group.theme} className="mb-14 last:mb-0">
              <h2 className="mb-5 font-onest text-[13px] font-semibold uppercase tracking-[2px] text-ss-sage">
                {group.theme}
              </h2>
              <div className="rounded-[16px] bg-ss-white px-6 shadow-sm sm:px-8">
                {group.items.map((item, ii) => (
                  <details
                    key={item.q}
                    open={gi === 0 && ii === 0}
                    className="group border-b border-black/10 last:border-b-0"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-onest text-[16px] font-semibold leading-snug text-ss-espresso [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <span
                        aria-hidden="true"
                        className="grid h-6 w-6 shrink-0 place-items-center text-2xl font-normal leading-none text-ss-sage transition-transform duration-300 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <div className="pb-6 pr-8 font-onest text-[15px] leading-relaxed text-ss-body">
                      <p className="m-0">{item.a}</p>
                      {item.link ? (
                        <a
                          href={item.link.href}
                          className="mt-3 inline-flex items-center gap-1.5 font-onest text-[12px] font-semibold uppercase tracking-[1.2px] text-ss-sage no-underline transition-colors hover:text-ss-espresso"
                        >
                          {item.link.label}
                          <span aria-hidden="true">→</span>
                        </a>
                      ) : null}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <BookingCTA
        title="Still have a question?"
        text="Can't find what you're looking for? Our Weligama team is happy to help you plan the perfect surf week."
        ctaLabel="Plan your trip"
        ctaHref="/rates"
        secondaryLabel="See the rooms"
        secondaryHref="/rooms"
      />
    </>
  );
}
