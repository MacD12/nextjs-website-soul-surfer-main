// soul-surfer-booking/page.tsx — Soul Surfer booking entry.
//
// Soul Surfer is a single camp, so its booking flow skips the Country ("book-now")
// and Camp selection screens entirely and drops the guest straight into the Date
// step. We pre-set the exact localStorage value the /camp step would have written
// (`selectedCamp`) so every downstream step (date, room, package, …) behaves as if
// the camp were chosen normally, and flag the flow so the stepper hides those two
// steps. `router.replace` (not push) means the browser Back button returns to the
// Soul Surfer site rather than to a camp screen.
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BookingStepSkeleton from '@/components/booking/BookingStepSkeleton';

const SOUL_SURFER_CAMP = 'Soul Surfer Camp';

export default function SoulSurferBookingEntry() {
  const router = useRouter();

  useEffect(() => {
    try {
      localStorage.setItem('selectedCamp', SOUL_SURFER_CAMP);
      localStorage.setItem('soulSurferFlow', 'true');
    } catch {
      /* localStorage unavailable — the date step will still work */
    }
    router.replace('/date');
  }, [router]);

  return <BookingStepSkeleton />;
}
