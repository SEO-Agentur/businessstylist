'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import { useCart } from '@/lib/context/CartContext';

const CheckIcon = () => (
  <svg className="w-5 h-5 text-business-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

export default function StilberatungPage() {
  const [selectedPlan, setSelectedPlan] = useState<'single' | 'yearly'>('single');
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBooking = (type: 'single' | 'yearly') => {
    const product = type === 'single'
      ? { id: 'stilberatung-single', name: '1:1 Stilberatung', price: 390, type: 'service' }
      : { id: 'stilberatung-yearly', name: 'Jahresabo Stilberatung', price: 1290, type: 'subscription' };
    addToCart(product);
    router.push('/checkout');
  };

  return (
    <>
      {/* ── 1. HERO ── */}
      <section className="relative section-padding overflow-hidden bg-gradient-to-br from-business-navy via-business-darkNavy to-business-charcoal">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-business-gold rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-accent rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white mb-14">
            <p className="text-business-gold font-heading font-semibold uppercase tracking-widest text-sm mb-4">
              Stilberatung &amp; Personal Styling
            </p>
            <h1 className="font-serif text-display-2 mb-6 leading-tight">
              Dein persönlicher Stil —<br />
              <span className="text-business-gold">von Grund auf neu gedacht</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-6 leading-relaxed">
              Professionelle Stilberatung online: Farbtyp, Figurtyp, Outfit-Strategie und individuelles Lookbook —
              damit Du jeden Morgen weißt, was Du anziehst.
            </p>
            <p className="text-gray-400 text-sm mb-10">
              Einmalberatung ab <strong className="text-white">390 €</strong> &middot; Jahresbegleitung ab <strong className="text-white">1.290 €</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleBooking('single')}
                className="inline-flex items-center justify-center px-8 py-4 bg-business-gold text-white font-semibold rounded-xl hover:bg-opacity-90 transition-all duration-200 text-lg shadow-lg"
              >
                Einzelberatung buchen — 390 €
              </button>
              <button
                onClick={() => handleBooking('yearly')}
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 text-lg backdrop-blur-sm"
              >
                Jahresabo starten — 1.290 €
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { number: '500+', label: 'Kundinnen beraten' },
              { number: '2×90', label: 'Min. Einzelberatung' },
              { number: '12×', label: 'monatl. Lookbooks im Abo' },
              { number: '100%', label: 'online & flexibel' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-business-gold font-heading">{stat.number}</p>
                <p className="text-gray-300 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. TRUST BAR ── */}
      <section className="bg-business-cream border-y border-gray-200 py-8">
        <div className="container-custom max-w-4xl">
          <p className="text-center text-brand-secondary text-sm font-medium uppercase tracking-widest mb-6">
            Was Dich erwartet
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              'Farbtyp-Analyse',
              'Figurtyp & Schnitte',
              'Outfit-Strategie',
              'Kleiderschrank-Check',
              'Persönliches Lookbook',
              'Personal Shopping',
            ].map((item) => (
              <span key={item} className="flex items-center gap-2 text-brand-secondary font-medium">
                <span className="w-2 h-2 rounded-full bg-business-gold" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. INTRO / SEO TEXT ── */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-h2 text-business-navy mb-6">
                Was ist eine professionelle Stilberatung?
              </h2>
              <p className="text-brand-secondary leading-relaxed mb-4">
                Eine professionelle Stilberatung ist weit mehr als Mode-Tipps. Sie analysiert Deinen Farbtyp, Figurtyp und persönlichen Stil und bringt alles in eine kohärente Strategie. Du erfährst, welche Schnitte, Farben und Outfits Deine Stärken betonen — und was Du nie wieder kaufen musst.
              </p>
              <p className="text-brand-secondary leading-relaxed mb-4">
                Als Business Stylistin begleite ich Frauen im beruflichen Umfeld: von der Führungskraft bis zur Selbstständigen. Mein Ansatz verbindet Farb- und Stilberatung mit konkreter Outfit-Planung — damit Dein Look zur Person und zur Position passt.
              </p>
              <p className="text-brand-secondary leading-relaxed">
                Das Ergebnis: ein klares Stilsystem, weniger Fehlkäufe und morgens in fünf Minuten angezogen — mit Stil.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lifted">
              <img
                src="/stilberatung.webp"
                alt="Professionelle Stilberatung online"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FÜR WEN / PROBLEME ── */}
      <section className="section-padding bg-brand-light">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-h2 text-business-navy mb-4">
              Kennst Du das?
            </h2>
            <p className="text-brand-secondary text-lg max-w-2xl mx-auto">
              Diese Stilberatung ist für Dich, wenn Du eines davon kennst:
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '👗',
                title: 'Voller Kleiderschrank, nichts anzuziehen',
                text: 'Du hast viel Kleidung, aber keine Outfits. Vieles passt nicht zusammen oder sitzt nicht richtig — obwohl Du gutes Geld ausgegeben hast.',
              },
              {
                icon: '🎯',
                title: 'Unsicher bei Business-Looks',
                text: 'Du weißt nicht, was im beruflichen Kontext angemessen, modern und trotzdem authentisch wirkt. Dresscodes fühlen sich wie Rätsel an.',
              },
              {
                icon: '🔁',
                title: 'Fehlkäufe ohne Ende',
                text: 'Immer wieder kaufst Du Teile, die Du kaum trägst. Shopping macht keinen Spaß mehr, weil das Ergebnis oft enttäuscht.',
              },
            ].map((item) => (
              <Card key={item.title} className="text-center p-8">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-heading font-semibold text-business-navy mb-3 text-lg">{item.title}</h3>
                <p className="text-brand-secondary text-sm leading-relaxed">{item.text}</p>
              </Card>
            ))}
          </div>
          <p className="text-center text-business-navy font-semibold text-lg mt-10">
            Dann ist eine professionelle Stilberatung genau das Richtige.
          </p>
        </div>
      </section>

      {/* ── 5. WAS DU BEKOMMST (3×3) ── */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-h2 text-business-navy mb-4">Was Du in der Stilberatung bekommst</h2>
            <p className="text-brand-secondary text-lg max-w-2xl mx-auto">
              Jede Beratung deckt diese neun Kernbereiche ab — strukturiert, individuell und mit konkreten Ergebnissen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: '1',
                title: 'Stiltyp & Stilfindung',
                text: 'Wir ermitteln Deinen persönlichen Stiltyp: klassisch, modern, kreativ oder eine Mischung. Daraus entsteht Dein roter Faden für alle künftigen Entscheidungen.',
              },
              {
                num: '2',
                title: 'Farb- & Stilberatung',
                text: 'Die Farbberatung zeigt Dir, welche Farben und Farbpaletten Deine Ausstrahlung stärken und welche Dich optisch schwächen — im Business wie im Alltag.',
              },
              {
                num: '3',
                title: 'Figurtyp & Passform',
                text: 'Wir analysieren Deinen Figurtyp und klären, welche Schnitte, Proportionen und Silhouetten Deine Stärken betonen und ausgleichen.',
              },
              {
                num: '4',
                title: 'Outfit-Strategie',
                text: 'Aus Deinen Teilen entstehen konkrete Outfit-Kombinationen. Du siehst, wie wenige Basics viele Looks ergeben — und was Dir fehlt.',
              },
              {
                num: '5',
                title: 'Personal Shopping',
                text: 'Personal Shopping spart Zeit und Geld. Ich curatiere passende Teile für Dich — im Abo monatlich in Deinem persönlichen Shop.',
              },
              {
                num: '6',
                title: 'Kleiderschrank-Check',
                text: 'Wir prüfen Deinen Kleiderschrank, trennen uns von dem, was nicht funktioniert, und bauen eine funktionierende Garderobe auf.',
              },
              {
                num: '7',
                title: 'Business-Styling',
                text: 'Im beruflichen Kontext zählt Wirkung. Wir entwickeln Looks, die Deine Position unterstreichen — souverän, modern, authentisch.',
              },
              {
                num: '8',
                title: 'Online-Stilberatung',
                text: 'Die Beratung findet per Online-Session statt — ortsunabhängig, effizient und genauso wirkungsvoll wie vor Ort. Ideal für volle Kalender.',
              },
              {
                num: '9',
                title: 'Persönliches Lookbook',
                text: 'Du erhältst ein individuelles Lookbook mit Deinen Outfits, Shopping-Empfehlungen und Styling-Notizen — Dein Stil-Handbuch für den Alltag.',
              },
            ].map((item) => (
              <Card key={item.num} className="relative group hover:shadow-lifted transition-shadow duration-300">
                <div className="w-10 h-10 bg-business-navy rounded-lg flex items-center justify-center text-business-gold font-bold font-heading mb-4 group-hover:bg-business-gold group-hover:text-white transition-colors duration-300">
                  {item.num}
                </div>
                <h3 className="font-heading font-semibold text-business-navy mb-3 text-lg">{item.title}</h3>
                <p className="text-brand-secondary text-sm leading-relaxed">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. PREISE / ANGEBOTE ── */}
      <section id="preise" className="section-padding bg-gradient-to-br from-business-navy via-business-darkNavy to-business-charcoal">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12 text-white">
            <h2 className="font-serif text-h2 mb-4">Stilberatung buchen</h2>
            <p className="text-gray-300 text-lg max-w-xl mx-auto">
              Wähle das Angebot, das zu Dir passt — beide beinhalten die volle Beratungstiefe.
            </p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-1.5 inline-flex">
              <button
                onClick={() => setSelectedPlan('single')}
                className={`px-7 py-3 rounded-xl font-semibold transition-all text-sm ${
                  selectedPlan === 'single'
                    ? 'bg-white text-business-navy shadow-lg'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Einzelberatung
              </button>
              <button
                onClick={() => setSelectedPlan('yearly')}
                className={`px-7 py-3 rounded-xl font-semibold transition-all text-sm ${
                  selectedPlan === 'yearly'
                    ? 'bg-white text-business-navy shadow-lg'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Jahresabo
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Einzelberatung */}
            <div className={`bg-white rounded-2xl p-8 transition-all duration-300 ${
              selectedPlan === 'single' ? 'ring-4 ring-business-gold shadow-2xl scale-[1.02]' : 'opacity-70 hover:opacity-90'
            }`}>
              {selectedPlan === 'single' && (
                <span className="inline-block bg-business-gold text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
                  Ausgewählt
                </span>
              )}
              <h3 className="font-heading font-bold text-business-navy text-2xl mb-1">1:1 Stilberatung</h3>
              <p className="text-brand-secondary mb-6">2 × 90 Minuten — persönlich &amp; effektiv</p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-business-navy font-heading">390 €</span>
                <span className="text-brand-secondary text-sm block mt-1">einmalig, inkl. Lookbook</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Farbtyp- & Stiltyp-Analyse',
                  'Figurtyp & Schnitt-Beratung',
                  'Outfit-Strategie für Alltag & Business',
                  'Individuelles Lookbook (inklusive)',
                  'Kleiderschrank-Empfehlung',
                  'Shopping-Liste mit konkreten Teilen',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-brand-secondary text-sm">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleBooking('single')}
                className="w-full py-4 bg-business-navy text-white font-semibold rounded-xl hover:bg-business-darkNavy transition-colors duration-200 text-base"
              >
                Einzelberatung buchen — 390 €
              </button>
            </div>

            {/* Jahresabo */}
            <div className={`bg-white rounded-2xl p-8 transition-all duration-300 relative ${
              selectedPlan === 'yearly' ? 'ring-4 ring-business-gold shadow-2xl scale-[1.02]' : 'opacity-70 hover:opacity-90'
            }`}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-business-gold text-white px-4 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-md">
                  Bestes Preis-Leistungs-Verhältnis
                </span>
              </div>
              {selectedPlan === 'yearly' && (
                <span className="inline-block bg-business-gold text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
                  Ausgewählt
                </span>
              )}
              {selectedPlan !== 'yearly' && <div className="mb-7" />}
              <h3 className="font-heading font-bold text-business-navy text-2xl mb-1">Jahresabo Stilberatung</h3>
              <p className="text-brand-secondary mb-6">Dein Stil-System für 12 Monate</p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-business-navy font-heading">1.290 €</span>
                <span className="text-brand-secondary text-sm block mt-1">pro Jahr — entspricht 107,50 €/Monat</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Alle Leistungen der Einzelberatung',
                  'Kleiderschrank-Check (vollständig)',
                  'Monatliches Lookbook mit aktuellen Empfehlungen',
                  'Persönlicher Online-Shop mit kuratierten Teilen',
                  'Saisonale Outfit-Updates',
                  '12 Monate persönliche Stilbegleitung',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-brand-secondary text-sm">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleBooking('yearly')}
                className="w-full py-4 bg-business-gold text-white font-semibold rounded-xl hover:bg-opacity-90 transition-all duration-200 text-base"
              >
                Jahresabo starten — 1.290 €
              </button>
            </div>
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            Alle Beratungen finden online statt. Bezahlung per Rechnung oder Kreditkarte.
          </p>
        </div>
      </section>

      {/* ── 7. TESTIMONIALS ── */}
      <section className="section-padding bg-business-cream">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-h2 text-business-navy mb-4">Was Kundinnen sagen</h2>
            <p className="text-brand-secondary text-lg">Echte Ergebnisse — von echten Frauen.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: 'Nach der Stilberatung war mein Kleiderschrank endlich klar. Ich weiss, was ich kaufen muss und was nicht. Das spart so viel Zeit und Geld.',
                name: 'Sandra M.',
                role: 'Unternehmensberaterin',
              },
              {
                quote: 'Das Lookbook hat mir gezeigt, wie viele Outfits ich eigentlich schon habe. Die Farbberatung war ein echter Augenöffner — ich trage jetzt andere Farben als vorher.',
                name: 'Julia K.',
                role: 'Marketing-Managerin',
              },
              {
                quote: 'Das Jahresabo ist jeden Cent wert. Monatliche Updates, persönliche Shopping-Empfehlungen und ich fühle mich endlich sicher bei Business-Terminen.',
                name: 'Christine B.',
                role: 'Rechtsanwältin',
              },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-8 shadow-card flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-business-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-brand-secondary text-sm leading-relaxed italic flex-grow mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-business-navy text-sm">{t.name}</p>
                  <p className="text-brand-secondary text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/lookbook" className="inline-flex items-center gap-2 text-business-navy font-semibold hover:text-business-gold transition-colors underline decoration-business-gold decoration-2 underline-offset-4">
              Lookbooks ansehen
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. PROZESS ── */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-h2 text-business-navy mb-4">So läuft Deine Stilberatung ab</h2>
            <p className="text-brand-secondary text-lg">Von der Buchung bis zum fertigen Lookbook in vier Schritten.</p>
          </div>
          <div className="space-y-6">
            {[
              {
                step: '01',
                title: 'Buchung & Vorgespräch',
                text: 'Du buchst online, wir vereinbaren einen Termin. Im kurzen Vorgespräch klären wir Deine Ziele, Anlässe und was Du Dir wünschst.',
              },
              {
                step: '02',
                title: 'Analyse-Session (90 Min.)',
                text: 'Per Video-Call analysieren wir Deinen Farbtyp und Figurtyp, schauen in Deinen Kleiderschrank und entwickeln Deine Outfit-Strategie.',
              },
              {
                step: '03',
                title: 'Feedback & Lookbook',
                text: 'Du erhältst Dein individuelles Lookbook mit konkreten Outfits, Shopping-Empfehlungen und Styling-Tipps — als PDF zum Behalten.',
              },
              {
                step: '04',
                title: 'Follow-up-Session (90 Min.)',
                text: 'In der zweiten Session vertiefen wir, schauen auf offene Fragen und du bekommst weitere Empfehlungen — für nachhaltigen Stil.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-business-navy flex items-center justify-center text-business-gold font-bold font-heading text-sm">
                  {item.step}
                </div>
                <div className="flex-grow pt-2 pb-6 border-b border-gray-100 last:border-0">
                  <h3 className="font-heading font-semibold text-business-navy text-lg mb-2">{item.title}</h3>
                  <p className="text-brand-secondary text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ── */}
      <section className="section-padding bg-brand-light">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-h2 text-business-navy mb-4">Häufige Fragen zur Stilberatung</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: 'Ist die Stilberatung online genauso gut wie vor Ort?',
                a: 'Ja. Die Online-Stilberatung per Video-Call ist mindestens so effektiv wie eine Beratung vor Ort — oft sogar besser, weil Du Deinen echten Kleiderschrank live zeigen kannst. Alle Analysen und das Lookbook werden digital übergeben.',
              },
              {
                q: 'Was ist der Unterschied zwischen Einzelberatung und Jahresabo?',
                a: 'Die Einzelberatung (390 €) umfasst zwei 90-Minuten-Sessions inkl. Lookbook. Das Jahresabo (1.290 €) enthält zusätzlich den vollständigen Kleiderschrank-Check, monatliche Lookbooks, einen persönlichen Online-Shop und 12 Monate Begleitung.',
              },
              {
                q: 'Für wen ist die Stilberatung geeignet?',
                a: 'Für Frauen, die ihren Stil professionalisieren möchten — besonders im Business-Kontext. Du brauchst kein Vorwissen, nur die Bereitschaft, Deinen Stil weiterzuentwickeln.',
              },
              {
                q: 'Wie lange dauert es bis zum Lookbook?',
                a: 'Das Lookbook erhältst Du in der Regel innerhalb von 3-5 Werktagen nach der zweiten Session als PDF.',
              },
              {
                q: 'Kann ich die Stilberatung als Betriebsausgabe absetzen?',
                a: 'Wenn die Beratung beruflich motiviert ist, ist eine steuerliche Absetzung oft möglich. Wir stellen eine ordentliche Rechnung aus. Bitte kläre dies mit Deinem Steuerberater.',
              },
            ].map((item) => (
              <FaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FINAL CTA ── */}
      <section className="section-padding bg-gradient-to-br from-business-navy to-business-darkNavy text-white">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="font-serif text-h2 mb-4">Bereit für Deinen nächsten Schritt?</h2>
          <p className="text-gray-300 text-lg max-w-xl mx-auto mb-10">
            Starte mit der Einzelberatung oder wähle das Jahresabo für eine ganzjährige Stilbegleitung.
            Beide Angebote beinhalten die volle Beratungstiefe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button
              onClick={() => handleBooking('single')}
              className="inline-flex items-center justify-center px-8 py-4 bg-business-gold text-white font-semibold rounded-xl hover:bg-opacity-90 transition-all duration-200 text-lg shadow-lg"
            >
              Einzelberatung — 390 €
            </button>
            <button
              onClick={() => handleBooking('yearly')}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 text-lg backdrop-blur-sm"
            >
              Jahresabo — 1.290 €
            </button>
          </div>
          <p className="text-gray-500 text-sm">
            Fragen? <Link href="/kontakt" className="text-business-gold hover:underline">Kontakt aufnehmen</Link>
          </p>
        </div>
      </section>
    </>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left font-heading font-semibold text-business-navy hover:bg-gray-50 transition-colors"
      >
        <span className="pr-4">{question}</span>
        <svg
          className={`w-5 h-5 flex-shrink-0 text-business-gold transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-5 text-brand-secondary text-sm leading-relaxed border-t border-gray-100 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}
