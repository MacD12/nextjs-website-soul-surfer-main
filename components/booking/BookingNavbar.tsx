'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronLeft, HelpCircle, Euro, Shield } from 'lucide-react';

/**
 * Booking-flow header. Shows: back button, logo, current step context,
 * currency indicator, and a help shortcut. Hides extras on small screens
 * so the bar stays tidy at every viewport.
 */

type StepMeta = { num: number; name: string };

// Total in-booking steps the footer stepper shows (Camp → Information)
const TOTAL_STEPS = 7;

const STEP_LOOKUP: Record<string, StepMeta> = {
  '/book-now': { num: 0, name: 'Destination' },
  '/camp': { num: 1, name: 'Camp' },
  '/': { num: 1, name: 'Camp' },
  '/date': { num: 2, name: 'Date' },
  '/room': { num: 3, name: 'Room' },
  '/package': { num: 4, name: 'Package' },
  '/selection': { num: 5, name: 'Selection' },
  '/air-port': { num: 6, name: 'Airport' },
  '/information': { num: 7, name: 'Information' },
};

const BookingNavbar = () => {
  const router = useRouter();
  const rawPathname = usePathname() ?? '/';
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Soul Surfer bookings skip Country + Camp, so their steps start one earlier.
  const [soulSurfer, setSoulSurfer] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('isSubmitted');
    if (stored) setIsSubmitted(JSON.parse(stored));
    let isSoul = false;
    try {
      isSoul = localStorage.getItem('soulSurferFlow') === 'true';
    } catch {
      /* ignore */
    }
    setSoulSurfer(isSoul);
    // Scope the Soul Surfer palette to this flow: the class on <html> activates
    // the cyan/sky + --ss-c* overrides in globals.css. Removed when leaving the
    // booking flow so the rest of the site keeps its original colours.
    if (isSoul) {
      document.documentElement.classList.add('ss-booking-theme');
    }
    return () => {
      document.documentElement.classList.remove('ss-booking-theme');
    };
  }, []);

  // This app has no locale prefix — use the pathname directly.
  const pathname = rawPathname.replace(/\/$/, '') || '/';
  const baseStep: StepMeta =
    STEP_LOOKUP[pathname] ?? { num: 0, name: 'Booking' };
  // Shift the number down one and shrink the total when the Camp step is skipped.
  const currentStep: StepMeta =
    soulSurfer && baseStep.num > 1
      ? { ...baseStep, num: baseStep.num - 1 }
      : baseStep;
  const totalSteps = soulSurfer ? TOTAL_STEPS - 1 : TOTAL_STEPS;

  const isDestination = currentStep.num === 0;
  const progressPct = isDestination
    ? 4
    : Math.max(8, (currentStep.num / totalSteps) * 100);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-[11] bg-white/95 backdrop-blur-md ring-1 ring-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.08)] rounded-2xl sm:rounded-full overflow-hidden"
    >
      {/* Top progress bar (thin animated cyan strip) */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gray-100">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-700 via-cyan-500 to-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-5 py-2.5 sm:py-3">
        {/* LEFT - Back button */}
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitted}
          aria-label="Go back to previous step"
          title="Back"
          className={`group shrink-0 inline-flex items-center gap-1.5 sm:gap-2 pl-2.5 pr-3 sm:pl-3 sm:pr-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
            isSubmitted
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed ring-1 ring-gray-200'
              : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:ring-cyan-300 hover:bg-cyan-50/40 hover:text-cyan-700 active:scale-95'
          }`}
        >
          <ChevronLeft
            className={`w-4 h-4 ${
              isSubmitted
                ? ''
                : 'transition-transform duration-300 group-hover:-translate-x-0.5'
            }`}
            strokeWidth={2.5}
          />
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* CENTER - Logo + step context */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 min-w-0">
          <a
            href="/"
            aria-label="Soul Surfer homepage"
            className="shrink-0 font-onest text-lg sm:text-xl font-semibold tracking-tight text-ss-espresso transition-opacity duration-200 hover:opacity-80"
          >
            Soul Surfer
          </a>

          {/* Step context pill - md+ */}
          <div className="hidden md:inline-flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full bg-cyan-50/70 ring-1 ring-cyan-100">
            <span className="text-[10px] font-bold tabular-nums tracking-[0.18em] uppercase text-cyan-700">
              {isDestination ? 'Start' : `Step ${currentStep.num} / ${totalSteps}`}
            </span>
            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-cyan-400" />
            <span className="text-xs font-bold text-gray-800 tracking-tight whitespace-nowrap">
              {currentStep.name}
            </span>
          </div>
        </div>

        {/* RIGHT - Secure / Currency / Help */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Trust indicator (lg+) */}
          <span className="hidden lg:inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.14em] uppercase text-gray-500 pr-1">
            <Shield className="w-3.5 h-3.5 text-emerald-500" strokeWidth={2.25} />
            Secure
          </span>

          {/* Currency */}
          <button
            type="button"
            aria-label="Currency: Euro"
            title="Currency: EUR"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-full bg-white text-gray-700 ring-1 ring-gray-200 hover:ring-cyan-300 hover:bg-cyan-50/40 hover:text-cyan-700 text-xs sm:text-sm font-semibold transition-all duration-300"
          >
            <Euro className="w-4 h-4" strokeWidth={2.5} />
            <span className="hidden sm:inline">EUR</span>
          </button>

          {/* Help CTA → the Soul Surfer contact page. */}
          <a
            href="/contact"
            target="_blank"
            rel="noreferrer"
            aria-label="Need help? Contact us"
            title="Need help?"
            className="group inline-flex items-center gap-1.5 px-2.5 sm:px-4 py-2 rounded-full bg-gradient-to-br from-cyan-700 to-cyan-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-cyan-700/25 hover:shadow-lg hover:shadow-cyan-700/40 hover:scale-105 transition-all duration-300"
          >
            <HelpCircle className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" strokeWidth={2.25} />
            <span className="hidden sm:inline">Help</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
};

export default BookingNavbar;
