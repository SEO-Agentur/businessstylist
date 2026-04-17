'use client';

import { useState } from 'react';
import Link from 'next/link';

interface LeadMagnetFormProps {
  kibbeType: string;
  kibbeTypeDisplay: string;
}

type FormState = 'idle' | 'loading' | 'success' | 'already_subscribed' | 'error';

export default function LeadMagnetForm({ kibbeType, kibbeTypeDisplay }: LeadMagnetFormProps) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isValid =
    firstName.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    consent;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setState('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/kibbe/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.toLowerCase().trim(),
          kibbeType,
          consentAccepted: true,
        }),
      });

      const data = await response.json() as { status: string; message?: string };

      if (!response.ok) {
        setErrorMessage(data.message || 'Etwas ist schiefgelaufen. Bitte versuche es in wenigen Minuten erneut.');
        setState('error');
        return;
      }

      if (data.status === 'already_subscribed') {
        setState('already_subscribed');
        return;
      }

      setState('success');
    } catch {
      setErrorMessage('Keine Verbindung. Prüfe Dein Internet und versuche es erneut.');
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="bg-[#0D1B2E] border border-[#C9A96E]/30 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#C9A96E]/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-[#C9A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-white font-semibold text-lg">Fast geschafft</h3>
        </div>
        <p className="text-[#8A9AB5] text-sm leading-relaxed mb-3">
          Wir haben Dir gerade eine Bestätigungs-Mail geschickt.
        </p>
        <p className="text-[#8A9AB5] text-sm leading-relaxed mb-4">
          Bitte prüfe Dein Postfach und klicke auf den Bestätigungs-Link. Erst dann starten wir den Versand Deines Profils.
        </p>
        <p className="text-xs text-[#8A9AB5]/70">
          Keine Mail erhalten? Schau im Spam-Ordner nach. Oder schreib uns an{' '}
          <a href="mailto:kontakt@businessstylist.de" className="text-[#C9A96E] hover:underline">
            kontakt@businessstylist.de
          </a>
          .
        </p>
      </div>
    );
  }

  if (state === 'already_subscribed') {
    return (
      <div className="bg-[#0D1B2E] border border-[#C9A96E]/30 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#C9A96E]/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-[#C9A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-white font-semibold text-lg">Du bist bereits eingetragen</h3>
        </div>
        <p className="text-[#8A9AB5] text-sm leading-relaxed">
          Schau in Dein Postfach – Deine Mails sind bereits unterwegs.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0D1B2E] border border-[#C9A96E]/20 rounded-2xl p-6 md:p-8">
      <div className="mb-6">
        <p className="text-xs font-semibold text-[#C9A96E] uppercase tracking-wider mb-2">
          Kostenloses Stil-Profil
        </p>
        <h3 className="text-white font-semibold text-xl mb-2">
          Dein vollständiges {kibbeTypeDisplay}-Profil
        </h3>
        <p className="text-[#8A9AB5] text-sm leading-relaxed">
          6 Seiten mit allen Stil-Empfehlungen, abgestimmt auf Deinen {kibbeTypeDisplay}-Typ.
          Plus: 7-teilige E-Mail-Serie mit konkreten Beispielen und Outfits.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-[#8A9AB5] mb-1.5">
            Vorname
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Dein Vorname"
            minLength={2}
            maxLength={100}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A96E] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#8A9AB5] mb-1.5">
            E-Mail-Adresse
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="deine@email.de"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A96E] transition-colors"
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 accent-[#C9A96E] flex-shrink-0"
            required
          />
          <span className="text-xs text-[#8A9AB5] leading-relaxed">
            Ich akzeptiere die{' '}
            <Link href="/datenschutz" className="text-[#C9A96E] hover:underline" target="_blank">
              Datenschutzerklärung
            </Link>{' '}
            und stimme zu, dass ich das kostenlose Stil-Profil sowie die 7-teilige E-Mail-Serie
            (über 14 Tage, danach monatlich) erhalte. Abmeldung jederzeit möglich.
          </span>
        </label>

        {state === 'error' && errorMessage && (
          <p className="text-red-400 text-xs bg-red-400/10 rounded-lg px-4 py-3">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={!isValid || state === 'loading'}
          className="w-full bg-[#C9A96E] hover:bg-[#D4B87A] disabled:opacity-40 disabled:cursor-not-allowed text-[#0D1B2E] font-bold py-4 rounded-xl transition-colors text-sm"
        >
          {state === 'loading' ? 'Wird gesendet...' : 'Profil kostenlos anfordern'}
        </button>

        <p className="text-center text-xs text-[#8A9AB5]/60">
          Kein Spam. Jederzeit abmelden.
        </p>
      </form>
    </div>
  );
}
