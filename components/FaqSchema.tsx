// FAQPage structured data — the highest-leverage AEO/GEO asset on the site.
// Answer engines (Google "People also ask", voice assistants) and generative
// engines (AI Overviews, ChatGPT, Perplexity) read this to quote the camp's
// answers directly. The text mirrors the visible FAQ accordions verbatim, which
// is what Google requires for FAQ rich results. Rendered into the page <head>/body
// as JSON-LD so crawlers see it without executing JS.

const FAQS: { q: string; a: string }[] = [
  {
    q: "How is Soul Surfer Camp different from The Surfer Beach Camp and TS2 Camp?",
    a: "Soul Surfer Camp is a more independent, boutique-style surf camp with its own setup, a rooftop restaurant with sea view, and a rooftop pool. It is only about 20 seconds' walk from the beach and around 5–10 minutes' walk to Weligama town. It also brings The Surfer's original social vibe, with daily social activities, shared moments, and a friendly camp atmosphere where guests can easily connect. The Beach Camp and TS2 Camp are connected under the main Surfer experience, sharing daily surf lessons, yoga, dinners, and events at the Beach Camp, while Soul Surfer keeps its own atmosphere and facilities.",
  },
  {
    q: "Which surf level is Soul Surfer Camp best for?",
    a: "Soul Surfer Camp is built for intermediate and advanced surfers — the dedicated surfer who wants guiding to the right peaks, theory sessions and video analysis. Motivated beginners are welcome too and take daily lessons in Weligama's forgiving bay; complete first-timers are usually best matched to our Beach Camp.",
  },
  {
    q: "Is the rooftop infinity pool open to all guests?",
    a: "Yes. The rooftop infinity pool and the sea-view rooftop restaurant are open to every Soul Surfer Camp guest and are included in your stay — they're where the camp gathers to relax after a session.",
  },
  {
    q: "Can Soul Surfer Camp guests join Beach Camp activities?",
    a: "Absolutely. Soul Surfer runs independently with its own location, but guests are always welcome to join the wider The Surfer community's beach days, boat parties and social events — the calm of a boutique camp with the buzz of the bigger crew.",
  },
];

const data = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
