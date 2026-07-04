import PageHero from "../../components/PageHero";
import Breadcrumbs from "../../components/Breadcrumbs";
import BookingCTA from "../../components/BookingCTA";
import RoomPhotos from "../../components/RoomPhotos";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  path: "/rooms",
  title: "Rooms at Soul Surfer Camp — Surf Accommodation in Weligama, Sri Lanka",
  description:
    "Compare the three room types at Soul Surfer Camp in Weligama — a social mixed dormitory, a private single ensuite, and a private double / twin ensuite. Capacity, what's included and pricing.",
});

// Three room types — enough to compare and choose. Pricing links to /rates rather
// than repeating the full weekly table here.
const ROOMS = [
  {
    key: "dorm",
    name: "Mixed Dormitory",
    suits: "For solo travellers who want the social side of camp life.",
    capacity: "Up to 5 guests",
    // Lead with the bed shots (bunks), then amenities — matches the home gallery.
    images: ["dorm-1", "dorm-bunk", "dorm-2", "dorm-4", "dorm-5"],
    included: [
      "Boutique-style shared dorm with fresh linen made up for you",
      "Clean, hotel-style shared bathrooms",
      "Secure luggage storage and board racks for your kit",
      "Full access to the rooftop infinity pool and sea-view restaurant",
    ],
  },
  {
    key: "single",
    name: "Private Single Room Ensuite",
    suits: "Your own private surf haven — for the solo surfer who wants to rest properly.",
    capacity: "1 guest",
    images: ["single-bed", "single-1", "single-2", "single-3", "single-4"],
    included: [
      "Private boutique room with its own ensuite bathroom",
      "Air-conditioning and reliable Wi-Fi throughout the camp",
      "Fresh linen, towels and secure board / luggage storage",
      "Full access to the rooftop infinity pool and sea-view restaurant",
    ],
  },
  {
    key: "double",
    name: "Private Double / Twin Room Ensuite",
    suits: "For couples, or friends travelling together who want privacy with style.",
    capacity: "2 guests",
    images: ["double-bed", "double-1", "double-2", "double-3", "double-4"],
    included: [
      "Private ensuite room set up as a double or a twin",
      "Air-conditioning and reliable Wi-Fi throughout the camp",
      "Fresh linen, towels and secure board / luggage storage",
      "Full access to the rooftop infinity pool and sea-view restaurant",
    ],
  },
];

// Room-specific questions only — the general FAQ lives on /faq.
const ROOM_FAQ = [
  {
    q: "Do the private rooms have their own bathroom?",
    a: "Yes — both the private single and the private double / twin are ensuite, with their own bathroom. The mixed dormitory uses clean, hotel-style shared bathrooms.",
  },
  {
    q: "Is bedding and linen provided?",
    a: "Every room comes with fresh linen, towels and a bed made up for you. Just bring yourself and your board.",
  },
  {
    q: "Can I store my luggage and surfboard?",
    a: "Yes — there's secure luggage storage for every guest, plus board racks to keep your equipment safe between sessions.",
  },
  {
    q: "Are the rooms air-conditioned, with Wi-Fi?",
    a: "The private rooms are air-conditioned, and reliable Wi-Fi runs throughout the camp so you can rest and stay in touch between surfs.",
  },
];

export default function RoomsPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay with us"
        title="Rooms at Soul Surfer Camp"
        subtitle="Boutique-style comfort for every kind of surfer — from a social mixed dorm to your own private ensuite, all seconds from the beach in Weligama."
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Rooms" }]} />

      {/* Framing + trust line */}
      <section className="bg-ss-cream">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="font-onest text-[17px] leading-relaxed text-ss-body">
            Three brand-new room types — pick the social buzz of a shared dorm, or retreat to a
            private ensuite. Whichever you choose, you're seconds from the sand and share the
            rooftop pool and sea-view restaurant.
          </p>
          <p className="mt-5 font-onest text-[14px] leading-relaxed text-ss-body">
            Part of{" "}
            <a
              href="/explore"
              className="font-semibold text-ss-espresso underline decoration-ss-sage/50 underline-offset-2 hover:decoration-ss-espresso"
            >
              The Surfer
            </a>{" "}
            — a decade of surf hospitality in Weligama.
          </p>
        </div>
      </section>

      {/* Three room blocks — alternating photo grid + details */}
      <section className="bg-ss-taupe">
        <div className="mx-auto max-w-[1400px] px-6 py-24">
          <div className="flex flex-col gap-16">
            {ROOMS.map((room, i) => (
              <article
                key={room.key}
                className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14"
              >
                {/* Photo gallery: one large + two thumbnails — now interactive
                    (arrows/dots + clickable thumbnails), same frame as before. */}
                <RoomPhotos
                  images={room.images}
                  name={room.name}
                  className={i % 2 === 1 ? "lg:order-2" : ""}
                />

                {/* Details */}
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="inline-flex items-center rounded-full bg-ss-sage/15 px-3 py-1 font-onest text-[11px] font-semibold uppercase tracking-[1.5px] text-ss-sage">
                    {room.capacity}
                  </span>
                  <h2 className="mt-4 font-onest text-2xl font-semibold text-ss-espresso sm:text-[30px]">
                    {room.name}
                  </h2>
                  <p className="mt-3 font-onest text-[16px] leading-relaxed text-ss-body">
                    {room.suits}
                  </p>
                  <ul className="mt-6 flex flex-col gap-3">
                    {room.included.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 font-onest text-[15px] leading-snug text-ss-espresso"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-ss-sage"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <a
                      href="/rates"
                      className="inline-flex items-center rounded-full bg-ss-espresso px-6 py-3 font-onest text-sm font-semibold !text-white no-underline transition-transform hover:-translate-y-0.5"
                    >
                      See rates
                    </a>
                    <a
                      href="/rates"
                      className="inline-flex items-center gap-1.5 font-onest text-[12px] font-semibold uppercase tracking-[1.2px] text-ss-sage no-underline transition-colors hover:text-ss-espresso"
                    >
                      Weekly pricing
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Room-specific FAQ mini-block */}
      <section className="bg-ss-cream">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="mb-8 text-center font-onest text-3xl font-semibold text-ss-espresso sm:text-[34px]">
            Room questions
          </h2>
          <div className="rounded-[15px] bg-ss-white px-6 shadow-sm sm:px-8">
            {ROOM_FAQ.map((item, i) => (
              <details
                key={item.q}
                open={i === 0}
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
        title="Found your room?"
        text="Tell us your dates and group and our Weligama team will confirm availability and secure your spot with a 25% deposit."
        ctaLabel="Check availability"
        ctaHref="/rates"
        secondaryLabel="Room FAQ"
        secondaryHref="/faq"
      />
    </>
  );
}
