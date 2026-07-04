import PageHero from "../../components/PageHero";
import Breadcrumbs from "../../components/Breadcrumbs";
import BookingCTA from "../../components/BookingCTA";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  path: "/blog",
  title: "Soul Surfer Diary — Surf Reports & Camp Life in Weligama, Sri Lanka",
  description:
    "Surf reports, camp stories and travel notes from Soul Surfer, the independent boutique surf camp in Weligama, Sri Lanka — swell, rooftop yoga, and life on the south coast.",
});

// Placeholder diary entries — there is no blog content in the original site yet,
// so these are on-brand stubs built entirely with Tailwind + the palette tokens.
const POSTS = [
  {
    tag: "Surf report",
    title: "First light at the point",
    excerpt:
      "Clean lines, an offshore breeze and an empty line-up — why the dawn session is still the best part of camp life.",
    read: "4 min read",
  },
  {
    tag: "Camp life",
    title: "Sunset yoga on the rooftop",
    excerpt:
      "Balance, breath and a sea view above the south coast — how the rooftop became everyone's favourite corner.",
    read: "3 min read",
  },
  {
    tag: "Guide",
    title: "Your first week in Weligama",
    excerpt:
      "From tuk-tuks to surf spots and the best rice & curry in town — a simple guide to settling into the bay.",
    read: "6 min read",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="From the camp"
        title="Soul Surfer Diary"
        subtitle="Stories, surf reports and slices of camp life from Weligama. Fresh entries are on the way."
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      <section className="bg-ss-cream">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post) => (
              <article
                key={post.title}
                className="flex flex-col overflow-hidden rounded-[15px] bg-ss-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="aspect-[4/3] w-full bg-ss-cocoa" aria-hidden="true" />
                <div className="flex flex-1 flex-col p-7">
                  <span className="font-onest text-[11px] font-semibold uppercase tracking-[1.5px] text-ss-sage">
                    {post.tag}
                  </span>
                  <h2 className="mt-3 font-onest text-2xl font-semibold leading-snug text-ss-espresso">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 font-onest text-[15px] leading-relaxed text-ss-body">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4">
                    <span className="font-onest text-xs uppercase tracking-wider text-ss-body">
                      {post.read}
                    </span>
                    <span className="font-onest text-sm font-semibold text-ss-espresso">
                      Coming soon →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BookingCTA
        title="Less reading, more surfing?"
        text="Skip ahead and plan your week in Weligama — rooms, packages and rates are ready when you are."
        ctaLabel="See packages"
        ctaHref="/rooms"
        secondaryLabel="View rates"
        secondaryHref="/rates"
      />
    </>
  );
}
