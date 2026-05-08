'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/forms/Input';

type ChecklistSlug = 'smart-casual' | 'business-attire' | 'wardrobe-declutter';

interface ChecklistOption {
  slug: ChecklistSlug;
  title: string;
  description: string;
  bullets: string[];
}

const OPTIONS: ChecklistOption[] = [
  {
    slug: 'smart-casual',
    title: 'Smart Casual Checkliste',
    description:
      "Dein kompletter Guide für den perfekten Smart-Casual-Look. Mit Do's & Don'ts, Outfit-Vorschlägen für Damen und Herren sowie Profi-Tipps von Anika.",
    bullets: [
      'Alle Essentials auf einen Blick',
      'Checklisten für Damen & Herren',
      'Sofort umsetzbare Profi-Tipps',
    ],
  },
  {
    slug: 'business-attire',
    title: 'Business Attire Checkliste',
    description:
      'Von Business Formal bis Business Casual – die klare Orientierung für den sicheren Auftritt im Berufsalltag, bei Meetings und Kundenterminen.',
    bullets: [
      'Alle Dresscode-Stufen erklärt',
      'Must-Haves für Damen & Herren',
      'Typische Stolpersteine vermeiden',
    ],
  },
  {
    slug: 'wardrobe-declutter',
    title: 'Wardrobe-Decluttering Checkliste',
    description:
      'Schluss mit dem überfüllten Kleiderschrank. Die strukturierte Anleitung, um deine Garderobe auszumisten und auf eine stimmige Capsule Wardrobe zu reduzieren.',
    bullets: [
      'Schritt-für-Schritt-Anleitung',
      'Entscheidungsraster für jedes Teil',
      'Tipps für eine stimmige Capsule',
    ],
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ChecklistSignup() {
  const [email, setEmail] = useState('');
  const [selected, setSelected] = useState<Record<ChecklistSlug, boolean>>({
    'smart-casual': false,
    'business-attire': false,
    'wardrobe-declutter': false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const selectedSlugs = useMemo(
    () => (Object.keys(selected) as ChecklistSlug[]).filter((k) => selected[k]),
    [selected]
  );

  const isEmailValid = EMAIL_RE.test(email.trim());
  const canSubmit = isEmailValid && selectedSlugs.length > 0 && !loading;

  const toggle = (slug: ChecklistSlug) => {
    setSelected((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/checklist/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), checklists: selectedSlugs }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.error || 'Ein Fehler ist aufgetreten.');
      }
    } catch {
      setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-business-cream/80 p-8 md:p-12 text-center">
        <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-h2 font-serif mb-3">Fast geschafft!</h3>
        <p className="text-brand-secondary leading-relaxed">
          Wir haben dir eine Bestätigungs-E-Mail gesendet. Bitte bestätige deine Anmeldung (Double-Opt-in),
          damit wir dir die ausgewählten Checklisten zusenden können. Schau auch im Spam-Ordner nach.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-business-cream/80 p-6 md:p-10"
    >
      <div className="mb-8">
        <h2 className="text-h2 font-serif mb-3">Hol dir deine kostenlosen Checklisten</h2>
        <p className="text-brand-secondary">
          Wähle eine oder mehrere Checklisten aus und trage deine E-Mail ein. Nach Bestätigung deiner
          Anmeldung schicken wir dir die ausgewählten Guides direkt in dein Postfach.
        </p>
      </div>

      <fieldset className="space-y-4 mb-8">
        <legend className="sr-only">Wähle deine Checklisten</legend>
        {OPTIONS.map((opt) => {
          const isChecked = selected[opt.slug];
          return (
            <label
              key={opt.slug}
              className={`block cursor-pointer rounded-xl border-2 p-5 transition-all ${
                isChecked
                  ? 'border-brand-accent bg-brand-accent/5 shadow-sm'
                  : 'border-business-cream hover:border-brand-accent/50 hover:bg-business-cream/40'
              }`}
            >
              <div className="flex items-start gap-4">
                <span
                  className={`relative flex-shrink-0 mt-1 w-6 h-6 rounded-md border-2 transition-colors ${
                    isChecked ? 'bg-brand-accent border-brand-accent' : 'bg-white border-brand-secondary/40'
                  }`}
                  aria-hidden="true"
                >
                  {isChecked && (
                    <svg
                      className="absolute inset-0 w-full h-full text-white p-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>

                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isChecked}
                  onChange={() => toggle(opt.slug)}
                  aria-label={opt.title}
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-brand-primary mb-2">{opt.title}</h3>
                  <p className="text-brand-secondary text-sm mb-3 leading-relaxed">{opt.description}</p>
                  <ul className="space-y-1.5">
                    {opt.bullets.map((b) => (
                      <li key={b} className="flex items-start text-sm text-brand-secondary">
                        <svg
                          className="w-4 h-4 text-brand-accent mr-2 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </label>
          );
        })}
      </fieldset>

      <div className="space-y-4">
        <Input
          type="email"
          name="email"
          label="E-Mail-Adresse"
          placeholder="deine@email.de"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Button type="submit" fullWidth disabled={!canSubmit}>
          {loading ? 'Wird gesendet...' : 'Checklisten kostenlos anfordern'}
        </Button>

        <p className="text-xs text-brand-secondary leading-relaxed">
          Ich möchte die ausgewählten Checklisten herunterladen und regelmäßig E-Mails zu
          Stilberatung, Outfits, Capsule Wardrobe und verwandten Themen erhalten. Meine Einwilligung
          kann ich jederzeit widerrufen. Hinweise zum Datenschutz finde ich in der{' '}
          <Link href="/datenschutz" className="underline hover:text-brand-primary">
            Datenschutzerklärung
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
