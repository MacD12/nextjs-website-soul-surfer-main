import PageHero from "../../components/PageHero";
import Breadcrumbs from "../../components/Breadcrumbs";
import BookingCTA from "../../components/BookingCTA";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  path: "/rates",
  title: "Surf Packages & Weekly Rates — Soul Surfer Camp, Weligama, Sri Lanka",
  description:
    "Full pricing for Soul Surfer Camp in Weligama — three surf packages, per-room weekly and nightly rates, what's included, add-ons and booking terms. The single source of truth for prices.",
});

const PACKAGE_NAMES = [
  "Moderate Surf / Guiding",
  "Surf & Yoga Package",
  "Full Surf Package",
];

// Feature comparison — true renders a check; a string renders the value.
const FEATURES: { label: string; values: (string | true)[] }[] = [
  { label: "Surf lessons", values: ["6 lessons / week", "6 lessons / week", "11 lessons / week"] },
  { label: "Yoga", values: ["2 sessions / week", "Sunrise or sunset, every day", "2 sessions / week"] },
  { label: "7 nights' accommodation", values: [true, true, true] },
  { label: "Breakfast every day", values: [true, true, true] },
  { label: "Dinner (every day except Sunday)", values: [true, true, true] },
  { label: "Surf theory classes", values: [true, true, true] },
  { label: "Video analysis", values: [true, true, true] },
  { label: "Daily social activities", values: [true, true, true] },
];

// Pricing matrix — [week, night] per package, per room type.
const PRICING: { room: string; sub: string; cells: [string, string][] }[] = [
  { room: "Mixed Dormitory Bed", sub: "Max 5 people", cells: [["390", "55.71"], ["450", "64.29"], ["490", "70.00"]] },
  { room: "Private Single Room", sub: "Per week", cells: [["690", "98.57"], ["750", "107.14"], ["790", "112.86"]] },
  { room: "Private Double / Twin Room", sub: "Per person / week", cells: [["490", "70.00"], ["550", "78.57"], ["590", "84.29"]] },
  { room: "Private Triple Room", sub: "Per person / week", cells: [["450", "64.29"], ["500", "71.43"], ["550", "78.57"]] },
];

const NOT_INCLUDED = [
  "International flights",
  "Airport transfers (available as an add-on)",
  "Travel & surf insurance",
  "Private 1-on-1 coaching (available as an add-on)",
  "Sri Lanka visa / ETA",
];

const ADDONS = [
  { name: "Extra nights", note: "Arrive early or stay on after your week — same room, same rhythm." },
  { name: "Private surf coaching", note: "One-on-one sessions to fast-track a specific part of your surfing." },
  { name: "Airport transfers", note: "Private pickup from Colombo (CMB) so you arrive without the hassle." },
  { name: "Extra surf sessions", note: "Add sessions to any package when the swell is firing." },
];

const TERMS = [
  { title: "Deposit", text: "A 25% deposit secures your booking, with the balance due before or on arrival. We'll confirm availability with you first." },
  { title: "Cancellation", text: "Plans change — we keep it flexible. Let the team know as early as you can and we'll work with you." },
  { title: "Best time to book", text: "Weligama's south-coast season runs roughly October to April. Book 4–8 weeks ahead for the peak months, when rooms fill fast." },
];

const PRICING_FAQ = [
  { q: "Are the prices per person?", a: "Yes — every weekly rate is per person. The mixed dormitory is priced per bed and private rooms per person, so two people sharing a double each pay the per-person rate." },
  { q: "Do I need to pay a deposit to book?", a: "Yes — a 25% deposit secures your booking, with the balance due before or on arrival. We confirm availability with you first, then send simple payment details." },
  { q: "What's included in the price — and what isn't?", a: "Your room, daily guided surf, theory, video analysis, yoga, breakfast, dinner (except Sunday) and the full social calendar are included. Flights, transfers, insurance and personal extras are not." },
  { q: "When is the best time to surf in Weligama?", a: "The south-coast season runs roughly October to April, which is also the busiest — book a few weeks ahead for peak months to lock in the room you want." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRICING_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// Light tint used to highlight the "most popular" middle column (arbitrary value
// so it renders reliably — the ss-* colours don't support /opacity modifiers).
const HI = "bg-[#f3f5f1]";

function PackageHeader() {
  return (
    <thead>
      <tr className="border-b border-black/10">
        <th className="p-5" />
        {PACKAGE_NAMES.map((name, ci) => (
          <th
            key={name}
            className={`p-5 text-center align-bottom ${ci === 1 ? HI : ""}`}
          >
            {ci === 1 ? (
              <span className="mb-2 inline-block rounded-full bg-ss-sage px-3 py-1 font-onest text-[10px] font-semibold uppercase tracking-[1px] text-white">
                Most popular
              </span>
            ) : null}
            <span className="block font-onest text-[13px] font-semibold uppercase tracking-[1px] text-ss-espresso">
              {name}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default function RatesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        eyebrow="Plan your week"
        title="Surf Packages & Weekly Rates"
        subtitle="Clear, all-in pricing for a 7-night week in Weligama. Every package includes the same great extras — the only difference is how much surf and yoga you want."
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Rates" }]} />

      {/* Comparison + pricing tables */}
      <section className="bg-ss-cream">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          {/* Feature comparison */}
          <h2 className="mb-2 font-onest text-2xl font-semibold text-ss-espresso sm:text-[30px]">
            Compare the packages
          </h2>
          <p className="mb-8 font-onest text-[15px] text-ss-body">
            Everything below comes with every package — the difference is the surf and yoga.
          </p>
          <div className="overflow-hidden rounded-[16px] bg-ss-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <PackageHeader />
                <tbody>
                  {FEATURES.map((row) => (
                    <tr key={row.label} className="border-b border-black/5 last:border-b-0">
                      <td className="p-5 font-onest text-[15px] font-semibold text-ss-espresso">
                        {row.label}
                      </td>
                      {row.values.map((v, ci) => (
                        <td
                          key={ci}
                          className={`p-5 text-center font-onest text-[14px] text-ss-body ${ci === 1 ? HI : ""}`}
                        >
                          {v === true ? (
                            <span className="text-lg font-bold text-ss-sage">✓</span>
                          ) : (
                            v
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pricing matrix */}
          <h2 className="mb-2 mt-16 font-onest text-2xl font-semibold text-ss-espresso sm:text-[30px]">
            Weekly prices per room
          </h2>
          <p className="mb-8 font-onest text-[15px] text-ss-body">
            Total per week / per night, in EUR. All rates are per person.
          </p>
          <div className="overflow-hidden rounded-[16px] bg-ss-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <PackageHeader />
                <tbody>
                  {PRICING.map((row) => (
                    <tr key={row.room} className="border-b border-black/5 last:border-b-0">
                      <td className="p-5">
                        <span className="block font-onest text-[15px] font-semibold text-ss-espresso">
                          {row.room}
                        </span>
                        <span className="block font-onest text-[12px] text-ss-body">
                          {row.sub}
                        </span>
                      </td>
                      {row.cells.map(([week, night], ci) => (
                        <td
                          key={ci}
                          className={`p-5 text-center ${ci === 1 ? HI : ""}`}
                        >
                          <span className="block font-onest text-[18px] font-semibold text-ss-espresso">
                            €{week}
                          </span>
                          <span className="block font-onest text-[12px] text-ss-body">
                            €{night} / night
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="/rooms"
              className="inline-flex items-center rounded-full bg-ss-espresso px-8 py-3.5 font-onest text-sm font-semibold !text-white no-underline transition-transform hover:-translate-y-0.5"
            >
              Choose your room
            </a>
          </div>
        </div>
      </section>

      {/* Not included */}
      <section className="bg-ss-taupe">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="rounded-[16px] bg-ss-white p-8 shadow-sm">
            <h2 className="font-onest text-xl font-semibold text-ss-espresso">
              Not included in the price
            </h2>
            <p className="mt-2 font-onest text-[14px] text-ss-body">
              Everything in the tables above is covered. A few things to budget for separately:
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {NOT_INCLUDED.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-onest text-[15px] leading-snug text-ss-body"
                >
                  <span aria-hidden="true" className="mt-0.5 font-semibold text-ss-body/60">
                    ✕
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="bg-ss-cream">
        <div className="mx-auto max-w-[1100px] px-6 py-20">
          <div className="mb-12 text-center">
            <h2 className="font-onest text-3xl font-semibold text-ss-espresso sm:text-[36px]">
              Add-ons
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-onest text-[16px] leading-relaxed text-ss-body">
              Tailor your week — just tell us when you book and we'll confirm the details.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ADDONS.map((addon) => (
              <div key={addon.name} className="rounded-[15px] bg-ss-white p-6 shadow-sm">
                <h3 className="font-onest text-base font-semibold text-ss-espresso">
                  {addon.name}
                </h3>
                <p className="mt-2 font-onest text-[14px] leading-relaxed text-ss-body">
                  {addon.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking terms */}
      <section className="bg-ss-taupe">
        <div className="mx-auto max-w-[1100px] px-6 py-20">
          <h2 className="mb-12 text-center font-onest text-3xl font-semibold text-ss-espresso sm:text-[36px]">
            Booking terms
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TERMS.map((term) => (
              <div key={term.title} className="rounded-[16px] bg-ss-white p-7 shadow-sm">
                <h3 className="font-onest text-lg font-semibold text-ss-espresso">
                  {term.title}
                </h3>
                <p className="mt-3 font-onest text-[15px] leading-relaxed text-ss-body">
                  {term.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / booking FAQ */}
      <section className="bg-ss-cream">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="mb-8 text-center font-onest text-3xl font-semibold text-ss-espresso sm:text-[34px]">
            Pricing & booking questions
          </h2>
          <div className="rounded-[16px] bg-ss-white px-6 shadow-sm sm:px-8">
            {PRICING_FAQ.map((item, i) => (
              <details key={item.q} open={i === 0} className="group border-b border-black/10 last:border-b-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-onest text-[16px] font-semibold leading-snug text-ss-espresso [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="grid h-6 w-6 shrink-0 place-items-center text-2xl font-normal leading-none text-ss-sage transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="m-0 pb-6 pr-8 font-onest text-[15px] leading-relaxed text-ss-body">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-center font-onest text-[14px] text-ss-body">
            More questions?{" "}
            <a
              href="/faq"
              className="font-semibold text-ss-espresso underline decoration-ss-sage/50 underline-offset-2 hover:decoration-ss-espresso"
            >
              See the full FAQ
            </a>
            .
          </p>
        </div>
      </section>

      <BookingCTA
        title="Ready to lock in your week?"
        text="Tell us your dates and group, and our Weligama team will confirm availability and secure your spot with a 25% deposit."
        ctaLabel="Book now"
        ctaHref="/rooms"
        secondaryLabel="Got questions?"
        secondaryHref="/faq"
      />
    </>
  );
}
