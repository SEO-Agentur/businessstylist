'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';

const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-business-gold flex-shrink-0 mt-0.5"
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 text-business-gold" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const tileData = [
  {
    title: 'Stilberatung: Dein Fundament',
    text: 'Eine gute Stilberatung schafft Überblick: Welche Kleidung passt, welche Schnitte Deine Silhouette optimal zeigen und wie Du neue Looks auszuprobieren lernst. Wir beraten Dich strukturiert, damit Du Deinen Kleidungsstil sicher tragen kannst – ohne tägliche Unsicherheit beim Anziehen.',
  },
  {
    title: 'Farb- und Stilberatung',
    text: 'Die Farb- und Stilberatung zeigt, welche Farben und Formen Deine Ausstrahlung stärken. Eine präzise Farbanalyse hilft Dir, Farbe gezielt einzusetzen – im Business wie privat. Wir bestimmen, welche Muster, welcher Stoff und welche Formen Deine Wirkung unterstreichen und Dich optisch in Szene setzen.',
  },
  {
    title: 'Persönliche Beratung',
    text: 'In der Beratung geht es um Deine Persönlichkeit. Wir beraten individuell und entwickeln einen Style, in dem Du Dich wohlfühlst und der Eindruck hinterlässt. Ein Vorgespräch klärt Deine Ziele, danach folgt die Anprobe, bei der wir Kleidungsstücke ausprobieren und neu kombinieren.',
  },
  {
    title: 'Personal Shopping',
    text: 'Personal Shopping spart Zeit. Wir begleiten Dich beim Shoppen, wählen passende Teile und vermeiden Fehlkäufe. So entsteht eine Garderobe, die nachhaltig ist und sich leicht erweitern lässt. Im Jahresabo erhältst Du zusätzlich einen persönlichen Shop mit monatlich kuratierten Kleidungsstücken.',
  },
  {
    title: 'Styling & Stylingtipps',
    text: 'Gutes Styling ist planbar. Mit gezielten Stylingtipps lernst Du, wie Accessoires, Schmuck und Make-up Deine Wirkung unterstreichen. Wir berücksichtigen Frisur, Schnitte und Details, damit jedes Kleidungsstück seinen Platz hat – für verschiedene Anlässe vom Meeting bis zum Empfang.',
  },
  {
    title: 'Outfit & Passform',
    text: 'Ein Outfit wirkt, wenn es passend geschnitten ist. Wir analysieren Figurtyp und Schnitte, damit Kleidung optimal sitzt. Ob schmale Linien oder strukturierte Formen – Du lernst, wie sich Problemzonen zu kaschieren und Deine Stärken hervorheben lassen, ohne Dich verstecken zu müssen.',
  },
  {
    title: 'Online-Stilberatung',
    text: 'Die Online-Stilberatung verbindet Nähe mit Effizienz. Per Online-Session erhältst Du klare Empfehlungen, Lookbooks und Feedback – ideal für volle Kalender. So bleibt Deine Beratung flexibel und individuell, ohne dass Du für einen Termin reisen musst.',
  },
  {
    title: 'Kleiderschrank & Garderobe',
    text: 'Ein strukturierter Kleiderschrank gibt Überblick. Beim Kleiderschrank-Check prüfen wir Deinen Schrank, sortieren und bauen eine funktionale Garderobe auf. Du weißt danach genau, welche Kleidungsstücke Du behalten willst und was fehlt – für einen Modestil, der zu Dir passt.',
  },
  {
    title: 'Business-Stil',
    text: 'Im Business zählt Wirkung. Die Imageberatung schärft Deinen Look, damit Du souverän auftreten kannst und gut angezogen bist – ob vor Kundinnen, im Pitch oder auf der Bühne. Dein Auftritt wird stimmig, modern und glaubwürdig, ohne Verkleidung.',
  },
];

const faqItems = [
  {
    q: 'Was kostet eine Farb- und Stilberatung?',
    a: 'Die Einzel-Stilberatung kostet 390 € inklusive zweier 90-minütiger Termine, Farbanalyse, Figurtyp-Bestimmung und einem individuellen Lookbook. Das Jahresabo liegt bei 1.290 € und umfasst zusätzlich einen Kleiderschrank-Check, monatliche Lookbooks und Personal Shopping. Alle Preise verstehen sich inkl. MwSt.',
  },
  {
    q: 'Wie lange dauert eine Stilberatung?',
    a: 'Die Einzelberatung besteht aus zwei Terminen à 90 Minuten – einem Vorgespräch mit Analyse und einer anschließenden Anprobe mit Lookbook-Erstellung. Beim Jahresabo verteilen sich die Termine über zwölf Monate, sodass Deine Stilberatung mit Dir wächst.',
  },
  {
    q: 'Findet die Beratung online oder vor Ort statt?',
    a: 'Beides ist möglich. Die Online-Stilberatung nutzt Video-Sessions und digitale Lookbooks – ideal für volle Kalender. Vor-Ort-Termine bieten mehr Raum für Anprobe und Kleiderschrank-Check. Viele Kundinnen kombinieren beide Formate.',
  },
  {
    q: 'Was ist ein Kleiderschrank-Check und wie läuft er ab?',
    a: 'Beim Kleiderschrank-Check gehen wir Deine Garderobe systematisch durch. Wir prüfen, welche Kleidungsstücke zu Deinem Farb- und Figurtyp passen, welche Looks sich kombinieren lassen und wo Lücken bestehen. Das Ergebnis ist eine funktionale Garderobe ohne Fehlkäufe.',
  },
  {
    q: 'Welche Qualifikation hat die Stylistin?',
    a: 'Als Personal Stylistin habe ich fundierte Weiterbildung in Mode, Styling und Imageberatung aus der Beauty-Branche. Jede Stilberatung basiert auf Kompetenz und Gespür, nicht auf Trends – damit Dein Stil langfristig trägt.',
  },
  {
    q: 'Gibt es eine Zufriedenheitsgarantie?',
    a: 'Wenn Du nach dem ersten Termin das Gefühl hast, dass die Beratung nicht zu Dir passt, sprechen wir darüber und finden eine Lösung. Mir ist wichtig, dass Du langfristig profitierst – nicht nur einmal gut angezogen bist.',
  },
];

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
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 right-20 w-96 h-96 bg-business-gold rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-accent rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white mb-14">
            <h1 className="font-serif text-display-2 mb-6 leading-tight">
              Stilberatung &amp; Personal Styling –<br />
              <span className="text-business-gold">Farb- und Stilberatung für Business-Frauen</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
              Professionelle Farb- und Stilberatung von einer erfahrenen Personal Stylistin – online oder vor Ort. Dein Überblick zu Stil, Figurtyp und persönlicher Ausstrahlung, weil der erste Eindruck zählt.
            </p>

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

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
              {/* Einzelberatung Card */}
              <div
                className={`bg-white rounded-2xl p-8 text-left transition-all duration-300 cursor-pointer ${
                  selectedPlan === 'single' ? 'ring-4 ring-business-gold shadow-2xl scale-[1.02]' : 'opacity-70 hover:opacity-95 hover:shadow-xl'
                }`}
                onClick={() => setSelectedPlan('single')}
              >
                <span className="inline-block bg-business-gold text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
                  Beliebteste Wahl
                </span>
                <h3 className="font-heading font-bold text-business-navy text-2xl mb-1">1:1 Stilberatung</h3>
                <p className="text-brand-secondary text-sm mb-5">2 × 90 Minuten — persönlich &amp; effektiv</p>
                <div className="mb-1">
                  <span
                    className="text-5xl font-bold text-business-navy font-heading"
                    itemProp="price"
                    content="390"
                  >390 €</span>
                </div>
                <p className="text-brand-secondary text-xs mb-6">inkl. 19 % MwSt. · einmalig, inkl. Lookbook</p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Farbtyp- & Stiltyp-Analyse',
                    'Figurtyp & Schnitt-Beratung',
                    'Outfit-Strategie für Alltag & Business',
                    'Individuelles Lookbook (inklusive)',
                    'Kleiderschrank-Empfehlung',
                    'Shopping-Liste mit konkreten Teilen',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-brand-secondary text-sm">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={(e) => { e.stopPropagation(); handleBooking('single'); }}
                  className="w-full py-3.5 bg-business-navy text-white font-semibold rounded-xl hover:bg-business-darkNavy transition-colors duration-200 text-sm"
                >
                  Einzelberatung buchen
                </button>
              </div>

              {/* Jahresabo Card */}
              <div
                className={`bg-white rounded-2xl p-8 text-left transition-all duration-300 cursor-pointer relative ${
                  selectedPlan === 'yearly' ? 'ring-4 ring-business-gold shadow-2xl scale-[1.02]' : 'opacity-70 hover:opacity-95 hover:shadow-xl'
                }`}
                onClick={() => setSelectedPlan('yearly')}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-business-gold text-white px-4 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-md">
                    Ganzjährige Begleitung
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="font-heading font-bold text-business-navy text-2xl mb-1">Jahresabo Stilberatung</h3>
                  <p className="text-brand-secondary text-sm mb-5">Dein Stil-System für 12 Monate</p>
                  <div className="mb-1">
                    <span
                      className="text-5xl font-bold text-business-navy font-heading"
                      itemProp="price"
                      content="1290"
                    >1.290 €</span>
                  </div>
                  <p className="text-brand-secondary text-xs mb-6">inkl. 19 % MwSt. · pro Jahr (107,50 €/Monat)</p>
                  <ul className="space-y-2 mb-6">
                    {[
                      'Alle Leistungen der Einzelberatung',
                      'Kleiderschrank-Check (vollständig)',
                      'Monatliches Lookbook mit aktuellen Empfehlungen',
                      'Persönlicher Online-Shop mit kuratierten Teilen',
                      'Saisonale Outfit-Updates',
                      '12 Monate persönliche Stilbegleitung',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-brand-secondary text-sm">
                        <CheckIcon />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleBooking('yearly'); }}
                    className="w-full py-3.5 bg-business-gold text-white font-semibold rounded-xl hover:bg-opacity-90 transition-all duration-200 text-sm"
                  >
                    Jahresabo starten
                  </button>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm">
              Zertifizierte Imageberatung · Online oder vor Ort · Sichere Bezahlung
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. INTRO-TEXTBLOCK ── */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <p className="text-lg text-brand-secondary leading-relaxed">
            Ein klarer Stil ist kein Zufall. Diese Stilberatung zeigt Dir, wie Kleidung, Farben und Formen perfekt zusammenwirken – passend zu Deinem Figurtyp, Deiner Persönlichkeit und Deinen beruflichen Zielen. Als Personal Stylistin mit fundierter Weiterbildung aus der Beauty-Branche bringe ich das Know-how mit, um Mode und Styling als Werkzeug für Dich nutzbar zu machen – nicht als Daueraufgabe. Du erfährst, wie Du Outfits zusammenstellst, die stimmig wirken, Fehlkäufe vermeidest und Deine Ausstrahlung mit Gespür und Kompetenz gezielt unterstreichst.
          </p>
        </div>
      </section>

      {/* ── 3. SEO-SEKTION: Was ist Farb- und Stilberatung ── */}
      <section className="section-padding bg-brand-light">
        <div className="container-custom max-w-5xl">
          <h2 className="font-serif text-h2 text-business-navy mb-8">
            Was ist Farb- und Stilberatung und für wen lohnt sie sich?
          </h2>
          <p className="text-brand-secondary leading-relaxed mb-12 text-lg">
            Farb- und Stilberatung ist mehr als eine Modeberatung. Sie verbindet Farbanalyse, Figurtyp und persönliche Ausstrahlung zu einem System, das Dir im Alltag Entscheidungen abnimmt. Besonders für Frauen in Führungspositionen, Gründerinnen und Selbstständige lohnt sich eine professionelle Beratung, weil Kleidung hier direkt zur Kompetenz-Wahrnehmung beiträgt. Der erste Eindruck zählt – aber er ist nur der Anfang. Was bleibt, ist die Wirkung über Monate und Jahre.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-heading font-semibold text-business-navy text-xl mb-4 pb-3 border-b-2 border-business-gold">
                Wie bestimmen wir Deinen Farbtyp und Figurtyp?
              </h3>
              <p className="text-brand-secondary leading-relaxed text-sm">
                In der Anprobe testen wir Farben direkt am Gesicht und bestimmen Deinen Farbtyp. Parallel analysieren wir Deinen Figurtyp – welche Schnitte Deine Silhouette unterstreichen, wo wir Problemzonen zu kaschieren und Stärken hervorheben. Aus beiden Ergebnissen entsteht ein individuelles Lookbook, das Dir zeigt, welche Kleidung, Farben und Formen wirklich zu Dir passen.
              </p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-business-navy text-xl mb-4 pb-3 border-b-2 border-business-gold">
                Kleiderschrank-Check: Was bleibt, was geht, was fehlt?
              </h3>
              <p className="text-brand-secondary leading-relaxed text-sm">
                Der <Link href="/kleiderschrank-check" className="text-business-navy underline decoration-business-gold decoration-2 underline-offset-2 hover:text-business-gold transition-colors">Kleiderschrank-Check</Link> ist oft der Wendepunkt. Wir gehen gemeinsam Deinen Schrank durch, sortieren Kleidungsstücke und identifizieren Lücken. Das Ergebnis: weniger Fehlkäufe, nachhaltiger Konsum und eine Garderobe, in der alles funktioniert. Viele Kundinnen berichten, dass dieser Schritt mehr verändert hat als jede neue Shopping-Tour.
              </p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-business-navy text-xl mb-4 pb-3 border-b-2 border-business-gold">
                Warum eine Personal Stylistin mit Know-how und Weiterbildung?
              </h3>
              <p className="text-brand-secondary leading-relaxed text-sm">
                Eine <Link href="/ueber-mich" className="text-business-navy underline decoration-business-gold decoration-2 underline-offset-2 hover:text-business-gold transition-colors">Personal Stylistin</Link> unterscheidet sich vom reinen Stylist durch fundierte Weiterbildung in der Beauty-Branche, Mode und Styling. Dieses Know-how sorgt dafür, dass Empfehlungen nicht auf Trends basieren, sondern auf Dir. Trend, Fashion und aktuelle Kollektionen sind Werkzeuge – nicht das Ziel. Das Ziel ist, Deinen persönlichen Stil zu finden, der unabhängig von der nächsten Saison bleibt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. WAS DU BEKOMMST (3×3) ── */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="font-serif text-h2 text-business-navy mb-4">Was Du bekommst</h2>
            <p className="text-brand-secondary text-lg max-w-3xl mx-auto">
              In unserer Stilberatung verbinden wir persönliche Beratung mit strukturierter Methode. Neun Bausteine helfen Dir, Deinen Stil zu finden – von der Farb- und Stilberatung über den Kleiderschrank-Check bis hin zu Personal Shopping und Stylingtipps für verschiedene Anlässe. Jeder Baustein steht für sich, aber alle greifen ineinander.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tileData.map((tile) => (
              <article
                key={tile.title}
                className="bg-white rounded-xl border border-gray-100 shadow-card p-6 hover:shadow-lifted hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-8 h-0.5 bg-business-gold mb-4" />
                <h3 className="font-heading font-semibold text-business-navy mb-3 text-lg">{tile.title}</h3>
                <p className="text-brand-secondary text-sm leading-relaxed">{tile.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TESTIMONIALS ── */}
      <section className="section-padding bg-business-cream">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-h2 text-business-navy mb-3">Was Kundinnen sagen</h2>
            <p className="text-brand-secondary text-lg">Echte Ergebnisse – von echten Frauen.</p>
          </div>
          {/* TODO: Echte Testimonials einfügen */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: 'Ich war skeptisch, ob eine Stilberatung wirklich etwas verändert. Heute weiß ich: Ich greife morgens nicht mehr ins Leere. Meine Garderobe funktioniert, und ich fühle mich gut angezogen – auch an stressigen Tagen.',
                name: 'Anna K.',
                role: 'Senior Consultant',
              },
              {
                quote: 'Die Farb- und Stilberatung hat mir gezeigt, warum manche Outfits mir immer "komisch" vorkamen. Mit dem richtigen Gespür für Farben und Schnitte habe ich endlich einen Look, der zu mir passt.',
                name: 'Julia M.',
                role: 'Gründerin',
              },
              {
                quote: 'Das Jahresabo war die beste Investition in meine Außenwirkung. Der Kleiderschrank-Check allein hat mich vor zig Fehlkäufen bewahrt. Und das monatliche Lookbook macht Shopping zu einem geplanten Vergnügen statt zu Stress.',
                name: 'Sarah B.',
                role: 'Führungskraft',
              },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-8 shadow-card flex flex-col">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
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
            <Link
              href="/lookbook"
              className="inline-flex items-center gap-2 text-business-navy font-semibold hover:text-business-gold transition-colors underline decoration-business-gold decoration-2 underline-offset-4"
            >
              Lookbooks ansehen
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. DAS WICHTIGSTE AUF EINEN BLICK ── */}
      <section className="section-padding bg-gradient-to-br from-business-navy via-business-darkNavy to-business-charcoal text-white">
        <div className="container-custom max-w-4xl">
          <h2 className="font-serif text-h2 text-center mb-10">Das Wichtigste auf einen Blick</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-14">
            {[
              'Stilberatung schafft Überblick, Sicherheit und ein dauerhaftes Gespür für Kleidung',
              'Farb- und Stilberatung stärkt Deine Ausstrahlung und Dein Selbstbewusstsein',
              'Personal Shopping vermeidet Fehlkäufe und macht Deine Garderobe nachhaltig',
              'Styling-Know-how sorgt für stimmige Looks bei verschiedenen Anlässen',
              'Online oder vor Ort: flexibel, professionell und wirksam',
              'Klare Preise: 390 € Einzelberatung oder 1.290 € im Jahresabo',
            ].map((item) => (
              <div key={item} className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <svg className="w-6 h-6 text-business-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-200 leading-snug">{item}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="font-serif text-h3 mb-5">Bereit für Deinen nächsten Schritt?</h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
              Starte mit Deiner Stilberatung auf businessstylist.de – als einmalige Einzelberatung oder als ganzjährige Begleitung im Stil-System. Unsicher, was zu Dir passt? Buche ein kostenloses 15-Minuten-Vorgespräch und wir klären gemeinsam, welcher Einstieg für Dich sinnvoll ist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <button
                onClick={() => handleBooking('single')}
                className="inline-flex items-center justify-center px-8 py-4 bg-business-gold text-white font-semibold rounded-xl hover:bg-opacity-90 transition-all duration-200 text-base shadow-lg"
              >
                Einzelberatung buchen
              </button>
              <button
                onClick={() => handleBooking('yearly')}
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 text-base backdrop-blur-sm"
              >
                Jahresabo starten
              </button>
            </div>
            <Link
              href="/kontakt"
              className="inline-block text-gray-400 hover:text-business-gold transition-colors text-sm underline underline-offset-4"
            >
              Kostenloses Vorgespräch anfragen
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="section-padding bg-brand-light">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-h2 text-business-navy mb-4">Häufige Fragen zur Stilberatung</h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <FaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
          <p className="text-center text-sm text-brand-secondary mt-8">
            Weitere Fragen?{' '}
            <Link href="/faq" className="text-business-navy underline decoration-business-gold decoration-2 underline-offset-2 hover:text-business-gold transition-colors">
              Alle FAQs ansehen
            </Link>{' '}
            oder{' '}
            <Link href="/kontakt" className="text-business-navy underline decoration-business-gold decoration-2 underline-offset-2 hover:text-business-gold transition-colors">
              Kontakt aufnehmen
            </Link>.
          </p>
        </div>
      </section>

      {/* ── 8. PREISE & BUCHUNG (bewusste Wiederholung am Seitenende) ── */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="font-serif text-h2 text-business-navy mb-3">Preise &amp; Buchung</h2>
            <p className="text-brand-secondary text-lg">Beide Angebote enthalten die volle Beratungstiefe.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-light rounded-2xl p-8 flex flex-col">
              <h3 className="font-heading font-bold text-business-navy text-xl mb-1">Einzel-Stilberatung</h3>
              <p className="text-brand-secondary text-sm mb-5">2 × 90 Minuten, inklusive Analyse &amp; Lookbook</p>
              <div className="mb-1">
                <span className="text-4xl font-bold text-business-navy font-heading" itemProp="price" content="390">
                  390 €
                </span>
              </div>
              <p className="text-brand-secondary text-xs mb-6">inkl. 19 % MwSt.</p>
              <button
                onClick={() => handleBooking('single')}
                className="mt-auto w-full py-3.5 bg-business-navy text-white font-semibold rounded-xl hover:bg-business-darkNavy transition-colors duration-200"
              >
                Einzelberatung buchen
              </button>
            </div>
            <div className="bg-business-navy rounded-2xl p-8 flex flex-col text-white">
              <h3 className="font-heading font-bold text-white text-xl mb-1">Jahresabo</h3>
              <p className="text-gray-300 text-sm mb-5">Initialanalyse + Check + monatliches Lookbook</p>
              <div className="mb-1">
                <span className="text-4xl font-bold font-heading" itemProp="price" content="1290">
                  1.290 €
                </span>
              </div>
              <p className="text-gray-400 text-xs mb-6">inkl. 19 % MwSt. · pro Jahr</p>
              <button
                onClick={() => handleBooking('yearly')}
                className="mt-auto w-full py-3.5 bg-business-gold text-white font-semibold rounded-xl hover:bg-opacity-90 transition-all duration-200"
              >
                Jahresabo starten
              </button>
            </div>
          </div>
          <p className="text-center text-brand-secondary text-sm mt-6">
            Alle Preise inkl. 19 % MwSt. Sichere Bezahlung per Überweisung, PayPal oder Kreditkarte.
          </p>

          <div className="mt-12 pt-10 border-t border-gray-100 flex flex-wrap gap-x-8 gap-y-3 justify-center text-sm text-brand-secondary">
            <Link href="/kibbe-body-type-test" className="hover:text-business-navy transition-colors underline decoration-business-gold underline-offset-2">
              Typberatung (Kibbe-Test)
            </Link>
            <Link href="/kleiderschrank-check" className="hover:text-business-navy transition-colors underline decoration-business-gold underline-offset-2">
              Kleiderschrank-Check
            </Link>
            <Link href="/downloads" className="hover:text-business-navy transition-colors underline decoration-business-gold underline-offset-2">
              Downloads &amp; Checklisten
            </Link>
            <Link href="/ueber-mich" className="hover:text-business-navy transition-colors underline decoration-business-gold underline-offset-2">
              Über die Stylistin
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-6 py-5 text-left font-heading font-semibold text-business-navy hover:bg-gray-50 transition-colors"
      >
        <span className="pr-4">{question}</span>
        <svg
          className={`w-5 h-5 flex-shrink-0 text-business-gold transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-5 pt-4 text-brand-secondary text-sm leading-relaxed border-t border-gray-100">
          {answer}
        </div>
      )}
    </div>
  );
}
