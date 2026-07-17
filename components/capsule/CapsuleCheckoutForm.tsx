'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function CapsuleCheckoutForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/capsule-wardrobe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ein Fehler ist aufgetreten.');
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Ein Fehler ist aufgetreten.');
      setSubmitting(false);
    }
  };

  return (
    <div id="bestellen" className="scroll-mt-24">
      <div className="bg-white rounded-2xl shadow-xl border border-business-cream/80 p-8 md:p-10">
        <h2 className="text-h2 font-serif mb-2">Business Capsule Wardrobe bestellen</h2>
        <p className="text-brand-secondary mb-6">
          Gib deine Daten ein und schliesse die Bestellung ab. Nach der Zahlung fuellst du einen ausfuehrlichen Fragebogen aus, damit Anika deine komplette Garderobenstrategie erstellen kann.
        </p>

        <div className="bg-brand-light/50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-brand-primary">Business Capsule Wardrobe</span>
            <span className="text-xl font-bold text-brand-accent">299,- EUR</span>
          </div>
        </div>

        <form onSubmit={handleCheckout} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-brand-primary mb-1.5">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dein vollstaendiger Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-primary mb-1.5">E-Mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="deine@email.de"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
            />
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {errorMsg}
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            size="lg"
            disabled={submitting || !email.trim() || !name.trim()}
          >
            {submitting ? 'Wird verarbeitet...' : 'Jetzt kostenpflichtig bestellen – 299,- EUR'}
          </Button>

          <p className="text-xs text-brand-secondary text-center leading-relaxed">
            Sichere Zahlung via Stripe. Nach der Bezahlung fuellst du einen kurzen Fragebogen aus.
            Anika erstellt deinen individuellen Plan und sendet ihn dir per E-Mail zu. Es gelten unsere{' '}
            <Link href="/agb" className="underline hover:text-brand-primary">AGB</Link>.
          </p>
        </form>
      </div>
    </div>
  );
}
