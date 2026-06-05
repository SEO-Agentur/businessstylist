import Link from 'next/link';
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Bestellung erfolgreich – Capsule Wardrobe | Businessstylist',
  robots: { index: false, follow: false },
};

export default function CapsuleWardrobeSuccessPage() {
  return (
    <section className="section-padding">
      <div className="container-custom max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl border border-business-cream/80 p-8 md:p-12 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <h1 className="text-h1 font-serif mb-4">Vielen Dank!</h1>

          <p className="text-brand-secondary text-lg leading-relaxed mb-6">
            Deine Bestellung ist eingegangen. Anika erstellt jetzt deinen individuellen
            Capsule-Wardrobe-Plan auf Basis deiner Angaben. Du erhaeltst ihn innerhalb
            von 3-5 Werktagen per E-Mail.
          </p>

          <div className="bg-brand-light/60 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-brand-primary mb-3">Was passiert als naechstes?</h3>
            <ul className="space-y-2 text-sm text-brand-secondary">
              <li className="flex items-start gap-2">
                <span className="text-brand-accent font-bold mt-0.5">1.</span>
                Anika sichtet deine Angaben und erstellt deinen persoenlichen Plan.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-accent font-bold mt-0.5">2.</span>
                Du erhaeltst eine E-Mail mit deiner Capsule Wardrobe (Teile-Liste, Farbpalette, Kombinationen).
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-accent font-bold mt-0.5">3.</span>
                Bei Fragen kannst du dich jederzeit an Anika wenden.
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button variant="primary">Zurueck zum Shop</Button>
            </Link>
            <Link href="/">
              <Button variant="secondary">Zur Startseite</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
