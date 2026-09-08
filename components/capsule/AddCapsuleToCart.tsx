'use client';

import { useState } from 'react';
import { useCart } from '@/lib/context/CartContext';

export default function AddCapsuleToCart() {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart({
      id: 'capsule-wardrobe',
      name: 'Business Capsule Wardrobe',
      price: 299,
      type: 'Signature Service',
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div id="bestellen" className="scroll-mt-24">
      <div className="bg-white rounded-2xl shadow-xl border border-business-cream/80 p-8 md:p-10">
        <h2 className="text-h2 font-serif mb-2">Business Capsule Wardrobe bestellen</h2>
        <p className="text-brand-secondary mb-6">
          Lege die Business Capsule Wardrobe in den Warenkorb und schließe die Bestellung ab.
          Nach der Zahlung füllst du einen ausführlichen Fragebogen aus, damit Anika deine
          komplette Garderobenstrategie erstellen kann.
        </p>

        <div className="bg-brand-light/50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-brand-primary">Business Capsule Wardrobe</span>
            <span className="text-xl font-bold text-brand-accent">299,- EUR</span>
          </div>
        </div>

        <button
          onClick={handleClick}
          disabled={added}
          className="w-full inline-flex items-center justify-center px-8 py-4 bg-brand-accent text-white font-semibold rounded-xl hover:bg-brand-accent/90 transition-all duration-200 text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none"
        >
          {added ? (
            <>
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              In den Warenkorb gelegt
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              In den Warenkorb – 299,- EUR
            </>
          )}
        </button>

        <p className="text-xs text-brand-secondary text-center leading-relaxed mt-4">
          Sichere Zahlung via Stripe. Nach der Bezahlung füllst du einen kurzen Fragebogen aus.
          Anika erstellt deinen individuellen Plan und sendet ihn dir per E-Mail zu.
        </p>
      </div>
    </div>
  );
}
