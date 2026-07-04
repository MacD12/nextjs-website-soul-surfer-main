// A compact dark title band for sub-pages. The site header is a transparent
// overlay with white text, so each sub-page needs a dark band beneath it for the
// nav to stay readable. Styling lives in overrides.css under `.ss-hero` with
// explicit values + !important, because this band sits inside
// `body.elementor-kit-6` and the ported app.css heading rules would otherwise
// recolour/space the <h1> (making it espresso-on-espresso and adding big gaps).
export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="ss-hero">
      <div className="ss-hero__inner">
        {eyebrow ? <p className="ss-hero__eyebrow">{eyebrow}</p> : null}
        <h1 className="ss-hero__title">{title}</h1>
        {subtitle ? <p className="ss-hero__subtitle">{subtitle}</p> : null}
      </div>
    </section>
  );
}
