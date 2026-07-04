// English → German translation catalog for the Soul Surfer experience.
//
// Keys are the exact, whitespace-collapsed visible strings as they appear in the
// rendered DOM (copied verbatim from the page, including curly apostrophes), so
// the runtime can match a text node by `node.textContent.replace(/\s+/g," ").trim()`.
//
// Proper nouns (Soul Surfer, Weligama, resort/place/person names), social network
// names, and strings already in German are intentionally omitted — they stay as-is.

const de: Record<string, string> = {
  // ---- Header / navigation ----
  Explore: "Entdecken",
  Activities: "Aktivitäten",
  Rooms: "Zimmer",
  Rates: "Preise",
  Blogs: "Blog",
  "Book Now": "Jetzt buchen",
  Contact: "Kontakt",
  contact: "Kontakt",
  "Our team": "Unser Team",
  "Our philosophy": "Unsere Philosophie",
  "Our top resorts": "Unsere Top-Resorts",
  "View all": "Alle ansehen",
  "By destination": "Nach Reiseziel",
  "Round trips": "Rundreisen",
  "Experiences & National Parks": "Erlebnisse & Nationalparks",

  // ---- Hero ----
  "Let us plan your perfect surf holiday":
    "Planen wir deinen perfekten Surfurlaub",
  "Your independent surf camp retreat for the dedicated surfer in Weligama":
    "Dein unabhängiges Surfcamp-Retreat für den passionierten Surfer in Weligama",

  // ---- Featured packages ----
  "Featured Surf Packages": "Ausgewählte Surf-Pakete",
  "Moderate Surf / Guiding": "Moderates Surfen / Guiding",
  "Six surf lessons a week with guiding, two yoga sessions, theory classes, video analysis, and daily social activities. 7 nights · 6 lessons · from €390 per person":
    "Sechs Surfstunden pro Woche mit Guiding, zwei Yoga-Einheiten, Theoriekurse, Videoanalyse und tägliche Gemeinschaftsaktivitäten. 7 Nächte · 6 Stunden · ab €390 pro Person",
  "Surf & Yoga Package": "Surf- & Yoga-Paket",
  "Six surf lessons a week paired with sunrise or sunset yoga every day — balance, breath, and waves. 7 nights · 6 lessons + daily yoga · from €450 per person":
    "Sechs Surfstunden pro Woche, kombiniert mit täglichem Yoga bei Sonnenauf- oder -untergang — Balance, Atem und Wellen. 7 Nächte · 6 Stunden + tägliches Yoga · ab €450 pro Person",
  "Full Surf Package": "Komplettes Surf-Paket",
  "Eleven surf lessons, two yoga sessions, theory, video analysis, and daily social activities for the dedicated surfer. 7 nights · 11 lessons · from €490 per person":
    "Elf Surfstunden, zwei Yoga-Einheiten, Theorie, Videoanalyse und tägliche Gemeinschaftsaktivitäten für den passionierten Surfer. 7 Nächte · 11 Stunden · ab €490 pro Person",
  "Mixed Dormitory": "Gemischter Schlafsaal",
  "Great for solo travelers who love meeting fellow surfers. Up to 6 guests. Boutique-style dorm":
    "Ideal für Alleinreisende, die gerne andere Surfer kennenlernen. Bis zu 6 Gäste. Schlafsaal im Boutique-Stil",
  "Private Single Room Ensuite": "Privates Einzelzimmer (en suite)",
  "Your personal surf haven; privacy and comfort for a peaceful night's rest. 1 guest. Boutique private room":
    "Dein persönliches Surf-Refugium; Privatsphäre und Komfort für eine erholsame Nacht. 1 Gast. Privates Boutique-Zimmer",
  "Private Double / Twin Room Ensuite":
    "Privates Doppel-/Zweibettzimmer (en suite)",
  "For solo, couple, or friends who want privacy with style. 2 guests. Boutique private room":
    "Für Alleinreisende, Paare oder Freunde, die Privatsphäre mit Stil möchten. 2 Gäste. Privates Boutique-Zimmer",
  "21 nights": "21 Nächte",
  "12 nights": "12 Nächte",
  "14 nights": "14 Nächte",
  "22 days": "22 Tage",
  "13 days": "13 Tage",
  "15 days": "15 Tage",
  "Price from": "Preis ab",
  "€390 per person": "€390 pro Person",
  "€450 per person": "€450 pro Person",
  "€490 per person": "€490 pro Person",
  New: "Neu",

  // ---- About the camp ----
  "Soul Surfer Camp: your specialist for an independent boutique surf retreat":
    "Soul Surfer Camp: dein Spezialist für ein unabhängiges Boutique-Surf-Retreat",
  "Soul Surfer is an independent retreat in Weligama, designed for the dedicated surfer. With its own dedicated location, a rooftop infinity pool overlooking the ocean, and a rooftop restaurant with sea view, the camp runs on its own schedule of surf sessions and daily rhythm — separate from our Beach Camp and TS2.":
    "Soul Surfer ist ein unabhängiges Retreat in Weligama, gemacht für den passionierten Surfer. Mit einem eigenen Standort, einem Rooftop-Infinity-Pool mit Blick auf den Ozean und einem Rooftop-Restaurant mit Meerblick folgt das Camp seinem eigenen Rhythmus aus Surf-Sessions und Tagesablauf — getrennt von unserem Beach Camp und TS2.",
  "It's a brand-new camp drawing on a decade of surf hospitality from our flagship Beach Camp and TS2 — brand-new rooms, a rooftop infinity pool, and its own quiet rhythm, just 20 seconds from the beach and 5–10 minutes from town.":
    "Es ist ein brandneues Camp, das auf einem Jahrzehnt Surf-Gastfreundschaft unseres Flaggschiffs Beach Camp und TS2 aufbaut — brandneue Zimmer, ein Rooftop-Infinity-Pool und ein eigener, ruhiger Rhythmus, nur 20 Sekunden vom Strand und 5–10 Minuten von der Stadt entfernt.",
  "About the camp": "Über das Camp",
  "Meet the team": "Lerne das Team kennen",

  // ---- What's included ----
  "What's included in your week": "Was in deiner Woche enthalten ist",
  "Surf & theory": "Surfen & Theorie",
  "Surf lessons (6–11 per week), surf theory classes, and video analysis to level up fast.":
    "Surfstunden (6–11 pro Woche), Surftheorie-Kurse und Videoanalyse, um schnell besser zu werden.",
  "Stay & dine": "Übernachten & Essen",
  "Seven nights' accommodation, breakfast every day, and dinner every day except Sunday.":
    "Sieben Nächte Unterkunft, täglich Frühstück und täglich Abendessen außer sonntags.",
  "Yoga & social": "Yoga & Gemeinschaft",
  "Yoga sessions (or sunrise/sunset daily on the Yoga package) and daily social activities.":
    "Yoga-Einheiten (oder täglich bei Sonnenauf-/-untergang im Yoga-Paket) und tägliche Gemeinschaftsaktivitäten.",

  // ---- More than just surf ----
  "More than just surf": "Mehr als nur Surfen",
  "Boat parties, beach days, new friendships, and stories you'll tell for years. Daily social activities make it easy to connect — have an unforgettable surf holiday, meet people from all around the world, and make friends for life.":
    "Bootspartys, Strandtage, neue Freundschaften und Geschichten, die du noch jahrelang erzählst. Tägliche Gemeinschaftsaktivitäten machen es leicht, in Kontakt zu kommen — erlebe einen unvergesslichen Surfurlaub, triff Menschen aus aller Welt und schließe Freundschaften fürs Leben.",
  "Discover activities": "Aktivitäten entdecken",
  "Rooftop pool & sea-view dining": "Rooftop-Pool & Dinner mit Meerblick",
  "Float in the rooftop infinity pool overlooking the ocean, then eat with a view at the sea-view rooftop restaurant. The camp has its own dedicated location, just a 20-second walk from the beach and 5–10 minutes from town.":
    "Treibe im Rooftop-Infinity-Pool mit Blick auf den Ozean und genieße anschließend ein Essen mit Aussicht im Rooftop-Restaurant mit Meerblick. Das Camp hat seinen eigenen Standort, nur 20 Sekunden Fußweg vom Strand und 5–10 Minuten von der Stadt entfernt.",
  "Discover more": "Mehr entdecken",
  "Built on 10+ years of The Surfer":
    "Aufgebaut auf über 10 Jahren The Surfer",
  "A brand-new camp, drawing on a decade of surf hospitality. Soul Surfer is The Surfer's newest opening in Weligama — designed from the ground up with everything we've learned across our flagship Beach Camp and TS2: brand-new rooms, a rooftop infinity pool, and its own quiet rhythm.":
    "Ein brandneues Camp, das auf einem Jahrzehnt Surf-Gastfreundschaft aufbaut. Soul Surfer ist die neueste Eröffnung von The Surfer in Weligama — von Grund auf gestaltet mit allem, was wir in unserem Flaggschiff Beach Camp und TS2 gelernt haben: brandneue Zimmer, ein Rooftop-Infinity-Pool und ein eigener, ruhiger Rhythmus.",

  // ---- Why surf with us ----
  "Why surf with Soul Surfer?": "Warum mit Soul Surfer surfen?",
  "Own location": "Eigener Standort",
  "Weligama, its own dedicated location, 20 seconds from the beach.":
    "Weligama, ein eigener Standort, 20 Sekunden vom Strand entfernt.",
  "Rooftop infinity pool": "Rooftop-Infinity-Pool",
  "Panoramic sea view to float in between sessions.":
    "Panorama-Meerblick zum Treiben zwischen den Sessions.",
  "Rooftop restaurant": "Rooftop-Restaurant",
  "Sea-view dining above the south coast.":
    "Essen mit Meerblick über der Südküste.",
  "Runs independently": "Läuft unabhängig",
  "Its own schedule, sessions, and daily rhythm.":
    "Eigener Zeitplan, eigene Sessions und eigener Tagesrhythmus.",

  // ---- Reviews ----
  "Here's what our guests say": "Das sagen unsere Gäste",
  "Boat parties, beach days, new friendships, and stories you'll tell for years. The rooftop pool and sea-view dinners made every evening special.":
    "Bootspartys, Strandtage, neue Freundschaften und Geschichten, die du noch jahrelang erzählst. Der Rooftop-Pool und die Dinner mit Meerblick machten jeden Abend besonders.",
  "— A Soul Surfer guest": "— Ein Soul-Surfer-Gast",
  "168 Google reviews": "168 Google-Bewertungen",
  "Write a review": "Bewertung schreiben",
  "Posted on": "Gepostet am",
  "2 months ago": "vor 2 Monaten",
  "Trustindex verifies whether the original source of the rating is Google.":
    "Trustindex überprüft, ob die Originalquelle der Bewertung Google ist.",
  "Brand-new rooms and the rooftop pool are unreal. 20 seconds to the beach.":
    "Die brandneuen Zimmer und der Rooftop-Pool sind der Wahnsinn. 20 Sekunden zum Strand.",
  "Great vibes, friendly crew, and the surf guiding leveled me up fast.":
    "Tolle Stimmung, freundliches Team, und das Surf-Guiding hat mich schnell besser gemacht.",
  "The sea-view rooftop dinners were a highlight every evening, thanks to the whole Soul Surfer team.":
    "Die Rooftop-Dinner mit Meerblick waren jeden Abend ein Highlight — danke an das ganze Soul-Surfer-Team.",

  // ---- Plan your week ----
  "Plan your surf week today!": "Plane jetzt deine Surfwoche!",
  "Are you ready for a surf holiday? Our team is here to help you pick the right package and room and get you booked with confidence — minutes from the bay and the surf.":
    "Bereit für einen Surfurlaub? Unser Team hilft dir, das passende Paket und Zimmer zu wählen und sicher zu buchen — nur Minuten von der Bucht und den Wellen entfernt.",
  "Plan your trip": "Reise planen",

  // ---- Location ----
  "Soul Surfer’s own corner of Weligama":
    "Soul Surfers eigene Ecke von Weligama",
  "An independent retreat in Weligama with its own dedicated location, a quiet street address, and a rhythm of its own — minutes from the bay and the surf.":
    "Ein unabhängiges Retreat in Weligama mit eigenem Standort, einer ruhigen Adresse und einem ganz eigenen Rhythmus — nur Minuten von der Bucht und den Wellen entfernt.",
  "Soul Surfer Camp — Weligama · South Coast, Sri Lanka":
    "Soul Surfer Camp — Weligama · Südküste, Sri Lanka",
  "Get directions →": "Route anzeigen →",

  // ---- Rates table ----
  "Surf Packages & Weekly Rates": "Surf-Pakete & Wochenpreise",
  "Surf Lessons": "Surfstunden",
  "6 lessons per week": "6 Stunden pro Woche",
  "11 lessons per week": "11 Stunden pro Woche",
  "11 lessons": "11 Stunden",
  Yoga: "Yoga",
  "2 sessions per week": "2 Einheiten pro Woche",
  "Sunrise or sunset every day": "Täglich bei Sonnenauf- oder -untergang",
  "7 nights accommodation": "7 Nächte Unterkunft",
  "Breakfast every day": "Frühstück täglich",
  "Dinner (every day except Sunday)": "Abendessen (täglich außer sonntags)",
  "Surf Theory Classes": "Surftheorie-Kurse",
  "Video Analysis": "Videoanalyse",
  "Daily Social Activities": "Tägliche Gemeinschaftsaktivitäten",
  "Pricing — total per week / per night (EUR)":
    "Preise — gesamt pro Woche / pro Nacht (EUR)",
  "Mixed Dormitory Bed (max 5)": "Bett im gemischten Schlafsaal (max. 5)",
  "/ €55.71 night": "/ €55,71 Nacht",
  "/ €64.29 night": "/ €64,29 Nacht",
  "/ €70.00 night": "/ €70,00 Nacht",
  "Private Single Room (per week)": "Privates Einzelzimmer (pro Woche)",
  "/ €98.57 night": "/ €98,57 Nacht",
  "/ €107.14 night": "/ €107,14 Nacht",
  "/ €112.86 night": "/ €112,86 Nacht",
  "Private Double / Twin Room (per person)":
    "Privates Doppel-/Zweibettzimmer (pro Person)",
  "/ €78.57 night": "/ €78,57 Nacht",
  "/ €84.29 night": "/ €84,29 Nacht",

  // ---- FAQ ----
  "Frequently Asked Questions": "Häufig gestellte Fragen",
  "How is Soul Surfer Camp different from The Surfer Beach Camp and TS2 Camp?":
    "Wie unterscheidet sich das Soul Surfer Camp vom The Surfer Beach Camp und TS2 Camp?",
  "Soul Surfer Camp is a more independent, boutique-style surf camp with its own setup, a rooftop restaurant with sea view, and a rooftop pool. It is only about 20 seconds' walk from the beach and around 5–10 minutes' walk to Weligama town. It also brings The Surfer's original social vibe, with daily social activities, shared moments, and a friendly camp atmosphere where guests can easily connect. The Beach Camp and TS2 Camp are connected under the main Surfer experience, sharing daily surf lessons, yoga, dinners, and events at the Beach Camp, while Soul Surfer keeps its own atmosphere and facilities.":
    "Das Soul Surfer Camp ist ein unabhängigeres Surfcamp im Boutique-Stil mit eigenem Setup, einem Rooftop-Restaurant mit Meerblick und einem Rooftop-Pool. Es ist nur etwa 20 Sekunden Fußweg vom Strand und rund 5–10 Minuten zu Fuß ins Zentrum von Weligama entfernt. Es bringt zudem die ursprüngliche gesellige Atmosphäre von The Surfer mit — mit täglichen Gemeinschaftsaktivitäten, gemeinsamen Momenten und einer freundlichen Camp-Atmosphäre, in der Gäste leicht in Kontakt kommen. Das Beach Camp und das TS2 Camp sind unter dem Haupt-Surfer-Erlebnis verbunden und teilen sich tägliche Surfstunden, Yoga, Abendessen und Events im Beach Camp, während Soul Surfer seine eigene Atmosphäre und Ausstattung behält.",
  "Which surf level is Soul Surfer Camp best for?":
    "Für welches Surf-Level eignet sich das Soul Surfer Camp am besten?",
  "Answer coming soon.": "Antwort folgt in Kürze.",
  "Is the rooftop infinity pool open to all guests?":
    "Ist der Rooftop-Infinity-Pool für alle Gäste zugänglich?",
  "Can Soul Surfer Camp guests join Beach Camp activities?":
    "Können Gäste des Soul Surfer Camps an Aktivitäten des Beach Camps teilnehmen?",

  // ---- Footer ----
  "The Surfer Surf Camps in Sri Lanka, fully owned by a local surfer born and raised in Weligama. Located in the heart of the surfing area, with nine to ten surf spots within a five to ten minute tuk-tuk ride.":
    "The Surfer Surfcamps in Sri Lanka, vollständig im Besitz eines einheimischen Surfers, der in Weligama geboren und aufgewachsen ist. Mitten im Surfgebiet gelegen, mit neun bis zehn Surfspots innerhalb einer fünf- bis zehnminütigen Tuk-Tuk-Fahrt.",
  "Independent boutique surf retreat in Weligama, Sri Lanka.":
    "Unabhängiges Boutique-Surf-Retreat in Weligama, Sri Lanka.",
  Location: "Standort",
  "Opening hours:": "Öffnungszeiten:",
  "Open daily.": "Täglich geöffnet.",
  "Open daily": "Täglich geöffnet",
  "by appointment": "nach Vereinbarung",
  "Monday - Friday 10:00 a.m. - 6:00 p.m":
    "Montag – Freitag 10:00 – 18:00 Uhr",
  "About Us": "Über uns",
  Homepage: "Startseite",
  "Soul Surfer Diary": "Soul Surfer Tagebuch",
  "Terms and Conditions": "AGB",
  Sitemap: "Sitemap",
  "Read more": "Weiterlesen",
  "7 nights": "7 Nächte",
  "8 days": "8 Tage",
  "© 2026 The Surfer. All rights reserved.":
    "© 2026 The Surfer. Alle Rechte vorbehalten.",
  "Experience crafted by StudioColart · Platform powered by BeddleHub":
    "Experience gestaltet von StudioColart · Plattform betrieben von BeddleHub",
};

export default de;
