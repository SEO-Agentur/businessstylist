'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import CapsuleQuestionnaire, { CapsuleAnswers } from '@/components/capsule/CapsuleQuestionnaire';

type Phase = 'info' | 'questionnaire' | 'checkout' | 'submitting' | 'error';

export default function CapsuleWardrobePage() {
  const [phase, setPhase] = useState<Phase>('info');
  const [answers, setAnswers] = useState<CapsuleAnswers | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleQuestionnaireComplete = (data: CapsuleAnswers) => {
    setAnswers(data);
    setPhase('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answers || !email.trim() || !name.trim()) return;
    setPhase('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/capsule-wardrobe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim(), answers }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ein Fehler ist aufgetreten.');
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Ein Fehler ist aufgetreten.');
      setPhase('error');
    }
  };

  return (
    <>
      <section className="section-padding bg-business-cream">
        <div className="container-custom text-center max-w-3xl">
          <span className="inline-block px-4 py-1.5 bg-brand-accent/10 text-brand-accent text-sm font-semibold rounded-full mb-4">
            Individuell von Anika erstellt
          </span>
          <h1 className="text-display-1 font-serif mb-4">
            Deine persoenliche Capsule Wardrobe
          </h1>
          <p className="text-body-lg text-brand-secondary max-w-2xl mx-auto">
            Weniger Teile, mehr Stil. Anika erstellt dir auf Basis deiner Angaben
            einen individuellen Capsule-Wardrobe-Plan – abgestimmt auf deinen Alltag,
            deinen Stil und deine Figur.
          </p>
        </div>
      </section>

      {phase === 'info' && (
        <>
          <section className="section-padding">
            <div className="container-custom max-w-4xl">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <h2 className="text-h2 font-serif mb-4">Was ist eine Capsule Wardrobe?</h2>
                  <p className="text-brand-secondary leading-relaxed mb-4">
                    Eine Capsule Wardrobe ist eine bewusst zusammengestellte Garderobe aus wenigen,
                    perfekt aufeinander abgestimmten Teilen, die sich vielfaeltig kombinieren lassen.
                    Das Ergebnis: Du bist morgens schneller angezogen und siehst trotzdem jeden Tag
                    stilsicher aus.
                  </p>
                  <p className="text-brand-secondary leading-relaxed">
                    Anika erstellt dir auf Basis weniger Fragen deinen persoenlichen Plan –
                    abgestimmt auf deinen Alltag, deine Lieblingsfarben, dein Budget und deine Groesse.
                  </p>
                </div>
                <Card className="bg-brand-light/50 border border-business-cream">
                  <h3 className="text-lg font-semibold text-brand-primary mb-4">Das bekommst du:</h3>
                  <ul className="space-y-3">
                    {[
                      'Individuelle Teile-Liste fuer deine Capsule',
                      'Abgestimmte Farbpalette',
                      'Kombinationsvorschlaege fuer vielfaeltige Outfits',
                      'Konkrete Marken- & Produktempfehlungen',
                      'Persoenlich von Stylistin Anika erstellt',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-brand-secondary">
                        <svg className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </section>

          <section className="section-padding bg-white">
            <div className="container-custom max-w-3xl">
              <div className="text-center mb-8">
                <h2 className="text-h2 font-serif mb-3">So funktioniert es</h2>
                <p className="text-brand-secondary">In drei einfachen Schritten zu deiner persoenlichen Capsule.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { num: '1', title: 'Fragebogen', desc: 'Beantworte 8 kurze Fragen zu deinem Stil, deinen Vorlieben und deinem Alltag.' },
                  { num: '2', title: 'Bezahlung', desc: 'Schliesse die Bestellung ab. Anika beginnt sofort mit deinem Plan.' },
                  { num: '3', title: 'Dein Plan', desc: 'Du erhaeltst deinen individuellen Capsule-Wardrobe-Plan per E-Mail.' },
                ].map((s) => (
                  <div key={s.num} className="text-center">
                    <div className="w-12 h-12 bg-brand-accent text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                      {s.num}
                    </div>
                    <h3 className="font-semibold text-brand-primary mb-2">{s.title}</h3>
                    <p className="text-sm text-brand-secondary">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-padding bg-business-cream">
            <div className="container-custom max-w-xl text-center">
              <div className="mb-6">
                <span className="text-4xl font-bold text-brand-primary">79,- EUR</span>
                <span className="text-brand-secondary ml-2">einmalig</span>
              </div>
              <Button size="lg" onClick={() => { setPhase('questionnaire'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                Jetzt Fragebogen starten
              </Button>
              <p className="text-xs text-brand-secondary mt-4">
                Du zahlst erst nach dem Fragebogen. Keine versteckten Kosten.
              </p>
            </div>
          </section>
        </>
      )}

      {phase === 'questionnaire' && (
        <section className="section-padding">
          <div className="container-custom max-w-3xl">
            <CapsuleQuestionnaire onComplete={handleQuestionnaireComplete} />
          </div>
        </section>
      )}

      {(phase === 'checkout' || phase === 'submitting' || phase === 'error') && (
        <section className="section-padding">
          <div className="container-custom max-w-xl">
            <Card>
              <h2 className="text-h2 font-serif mb-2">Fast geschafft!</h2>
              <p className="text-brand-secondary mb-6">
                Deine Angaben sind gespeichert. Gib jetzt deine Daten ein, um die Bestellung abzuschliessen.
              </p>

              <div className="bg-brand-light/50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-brand-primary">Capsule Wardrobe Plan</span>
                  <span className="text-xl font-bold text-brand-accent">79,- EUR</span>
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
                  disabled={phase === 'submitting' || !email.trim() || !name.trim()}
                >
                  {phase === 'submitting' ? 'Wird verarbeitet...' : 'Jetzt kostenpflichtig bestellen – 79,- EUR'}
                </Button>

                <p className="text-xs text-brand-secondary text-center leading-relaxed">
                  Sichere Zahlung via Stripe. Nach der Bezahlung erstellt Anika deinen individuellen Plan
                  und sendet ihn dir per E-Mail zu. Es gelten unsere{' '}
                  <Link href="/agb" className="underline hover:text-brand-primary">AGB</Link>.
                </p>
              </form>
            </Card>

            <button
              type="button"
              onClick={() => setPhase('questionnaire')}
              className="mt-4 text-sm text-brand-secondary hover:text-brand-primary underline block mx-auto"
            >
              Zurueck zum Fragebogen
            </button>
          </div>
        </section>
      )}
    </>
  );
}
