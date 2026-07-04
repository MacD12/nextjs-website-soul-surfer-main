"use client";

// Contact form — mirrors the reference layout (two name fields side by side,
// email + phone, a message box, a consent checkbox and a pill submit) but is
// styled entirely in the Soul Surfer palette: white input surfaces with hairline
// borders on the cream section, sage focus rings, and the site's espresso pill
// button. No backend is wired here, so on submit we show an inline confirmation
// and fall back to a mailto: draft so the message is never lost.
import { useState } from "react";

const CONTACT_EMAIL = "info@thesurferweligama.com";

const inputClass =
  "w-full rounded-[12px] border border-black/10 bg-ss-white px-4 py-3.5 font-onest text-[15px] text-ss-espresso placeholder:text-ss-body/70 outline-none transition-colors focus:border-ss-sage focus:ring-2 focus:ring-ss-sage/30";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get("firstName") || "");
    const lastName = String(data.get("lastName") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const message = String(data.get("message") || "");

    // Compose a mailto: draft as a dependable fallback (no server needed).
    const subject = encodeURIComponent(
      `Website enquiry — ${firstName} ${lastName}`.trim()
    );
    const body = encodeURIComponent(
      [
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        "",
        message,
      ].join("\n")
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <input
          className={inputClass}
          type="text"
          name="firstName"
          aria-label="First name"
          placeholder="First name*"
          required
        />
        <input
          className={inputClass}
          type="text"
          name="lastName"
          aria-label="Last name"
          placeholder="Last name*"
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <input
          className={inputClass}
          type="email"
          name="email"
          aria-label="Email address"
          placeholder="Email address*"
          required
        />
        <input
          className={inputClass}
          type="tel"
          name="phone"
          aria-label="Phone number"
          placeholder="Phone number*"
          required
        />
      </div>

      <textarea
        className={`${inputClass} min-h-[150px] resize-y`}
        name="message"
        aria-label="Message"
        placeholder="Message"
        rows={6}
      />

      <label className="flex items-start gap-3 font-onest text-[14px] leading-relaxed text-ss-body">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-ss-sage"
        />
        <span>
          I have read the{" "}
          <a
            href="/privacy"
            className="font-semibold text-ss-espresso underline decoration-ss-sage underline-offset-2 hover:text-ss-sage"
          >
            privacy policy
          </a>{" "}
          and agree to it.
        </span>
      </label>

      <div className="mt-1 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="group inline-flex items-center gap-2 rounded-full bg-ss-espresso px-8 py-4 font-onest text-sm font-semibold uppercase tracking-wide text-white no-underline shadow-lg shadow-black/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-ss-cocoa"
        >
          Send message
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </button>
        {sent ? (
          <p className="m-0 font-onest text-[14px] text-ss-sage">
            Thanks — your message is ready to send in your mail app.
          </p>
        ) : null}
      </div>
    </form>
  );
}
