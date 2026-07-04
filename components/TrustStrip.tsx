// Social-proof / trust strip — quick credibility stats pulled from the real
// camp facts. Cream band, espresso figures, sage labels (reference palette).
const STATS: { num: string; label: string }[] = [
  { num: "10+", label: "Years of The Surfer" },
  { num: "168", label: "Google reviews" },
  { num: "9–10", label: "Surf spots nearby" },
  { num: "20s", label: "Walk to the beach" },
];

export default function TrustStrip() {
  return (
    <section className="bg-ss-cream">
      <div className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-onest text-[clamp(30px,4vw,46px)] font-semibold leading-none text-ss-espresso">
                {s.num}
              </div>
              <div className="mt-3 font-onest text-[11px] font-semibold uppercase tracking-[1.5px] text-ss-sage">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
