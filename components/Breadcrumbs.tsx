// Lightweight breadcrumb strip for orientation — sits between the title band and
// the page content. Taupe band, sage separators (reference palette).
//
// Also emits BreadcrumbList JSON-LD: this tells search/answer/generative engines
// the page's place in the site hierarchy, which yields breadcrumb rich results
// and helps AI engines describe where a page sits.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://soulsurfer.example";

export default function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="border-b border-black/5 bg-ss-taupe">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol className="mx-auto flex max-w-[1400px] items-center gap-2.5 px-6 py-3.5 font-onest text-[11px] font-semibold uppercase tracking-[1.5px] text-ss-body">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2.5">
            {item.href ? (
              <a
                href={item.href}
                className="no-underline transition-colors hover:text-ss-espresso"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-ss-espresso">{item.label}</span>
            )}
            {i < items.length - 1 ? (
              <span className="text-ss-sage" aria-hidden="true">
                /
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
