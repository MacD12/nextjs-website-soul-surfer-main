"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type { ReactNode } from "react";

// The ported booking engine lives under its own routes and brings its own
// BookingNavbar/Footer, so those pages must NOT render the marketing site's
// header/footer or the heavy Elementor scripts. This client wrapper reads the
// path and, on a booking route, renders only the page inside a `.ss-booking`
// scope (themed by booking.css); on every other route it renders the full
// marketing chrome exactly as before.
//
// It also toggles the Elementor `kit` class on <body>: the ported Elementor
// app.css is loaded globally and its `body.elementor-kit-6 button { … }` /
// generic `button { border: 1px solid #c36 }` rules bleed into the booking's
// Tailwind-styled buttons. Removing the class on booking routes stops that
// bleed; it's restored on every marketing route.
const BOOKING_RE =
  /^\/(soul-surfer-booking|date|room|package|selection|air-port|information|checkout|payment-request|payment-success)(\/|$)/;

const ELEMENTOR_BODY_CLASSES = [
  "elementor-kit-6",
  "elementor-page",
  "elementor-page-2",
];

export default function MarketingChrome({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const path = usePathname() || "/";
  const isBooking = BOOKING_RE.test(path);

  useEffect(() => {
    const cls = document.body.classList;
    // Disable the Elementor stylesheet entirely on booking routes so none of its
    // global button/element rules bleed into the booking's Tailwind styling.
    const appCss = document.querySelector<HTMLLinkElement>(
      'link[href="/css/app.css"]'
    );
    if (appCss) appCss.disabled = isBooking;
    if (isBooking) {
      cls.remove(...ELEMENTOR_BODY_CLASSES);
    } else {
      cls.add(...ELEMENTOR_BODY_CLASSES);
    }
  }, [isBooking]);

  if (isBooking) {
    return <div className="ss-booking">{children}</div>;
  }

  return (
    <>
      {header}
      {children}
      {footer}
    </>
  );
}
