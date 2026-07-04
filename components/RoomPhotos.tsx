"use client";

import { useState } from "react";

// Interactive room gallery for the /rooms page. It reuses the EXACT same CSS
// classes as the home page room gallery (.ss-gal-nav / .ss-gal-dot / .ss-gal-dots
// in overrides.css) so the carousel buttons look identical to the home — only the
// behaviour is wired here with React state. Frame/placement is unchanged: one
// large image (col-span-2) + two thumbnails.
export default function RoomPhotos({
  images,
  name,
  className = "",
}: {
  images: string[];
  name: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const count = images.length;
  const go = (delta: number) => setActive((a) => (a + delta + count) % count);
  // Show at most two thumbnails so the "1 large + 2 thumbnails" layout stays
  // consistent across rooms regardless of how many photos a room has; every
  // photo remains reachable via the arrows and dots.
  const thumbs = images.map((_, i) => i).filter((i) => i !== active);
  const src = (img: string) => `/assets/rooms/${img}.jpg`;

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* Main image — same box; arrows/dots use the home gallery classes */}
      <div className="relative overflow-hidden rounded-[15px] shadow-sm">
        <img
          src={src(images[active])}
          alt={`${name} at Soul Surfer Camp, Weligama — photo ${active + 1} of ${count}`}
          loading="lazy"
          width={800}
          height={600}
          className="aspect-[4/3] w-full object-cover object-center"
        />
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="ss-gal-nav ss-gal-prev"
        >
          {"‹"}
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="ss-gal-nav ss-gal-next"
        >
          {"›"}
        </button>
        <div className="ss-gal-dots">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}`}
              className={`ss-gal-dot${i === active ? " is-active" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail row — every other photo, clickable. Columns scale to the
          number of thumbnails so 2-photo and 5-photo rooms both read as a tidy
          single row (wraps on very narrow screens). */}
      {thumbs.length > 0 ? (
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: `repeat(${thumbs.length}, minmax(0, 1fr))`,
          }}
        >
          {thumbs.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1}`}
              className="group block appearance-none overflow-hidden !rounded-[12px] !border-0 !bg-transparent !p-0 shadow-sm"
            >
              <img
                src={src(images[i])}
                alt={`${name} at Soul Surfer Camp, Weligama`}
                loading="lazy"
                width={400}
                height={300}
                className="h-[110px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[120px]"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
