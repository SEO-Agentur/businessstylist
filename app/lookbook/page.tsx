'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import KibbeAssessment from '@/components/quiz/KibbeAssessment';

const KIBBE_TYPES = [
  'Dramatic',
  'Soft Dramatic',
  'Flamboyant Natural',
  'Natural',
  'Soft Natural',
  'Flamboyant Gamine',
  'Gamine',
  'Soft Gamine',
  'Dramatic Classic',
  'Classic',
  'Soft Classic',
  'Theatrical Romantic',
  'Romantic',
];

const INCLUDED_ITEMS = [
  '2 komplett zusammengestellte Outfits passend zu Deinem Kibbe-Typ',
  'Visueller Guide mit hochwertigen Bildern und Styling-Details',
  'Shopping-Liste mit allen Teilen und Preisspannen',
  'Alternativ-Vorschläge für verschiedene Budgets',
  'Tipps zu Schnitten, Stoffen und Mustern für Deinen Typ',
  'Saisonale Farben und Muster für Winter 2026',
  'Empfehlungen für Accessoires und Kleid-Alternativen',
  'Sofort als PDF auf allen Geräten verfügbar',
];

const FAQS = [
  {
    q: 'Was ist ein Kibbe-Typ und warum ist er wichtig?',
    a: 'Der Kibbe-Typ ist ein System, das Deine natürlichen Linien und Proportionen beschreibt. Er bestimmt, welche Schnitte, Stoffe und Muster zu Dir passen. Je nach Typ unterscheiden sich die empfohlenen Looks erheblich – ein Dramatic-Typ trägt andere Stoffe als ein Romantic. Dein Lookbook ist auf Deinen Typ abgestimmt.',
  },
  {
    q: 'Wie schnell bekomme ich mein Lookbook?',
    a: 'Nach erfolgreicher Zahlung erhältst Du das PDF automatisch per E-Mail – in der Regel innerhalb weniger Minuten. Du kannst es auf allen Geräten öffnen und jederzeit wieder aufrufen.',
  },
  {
    q: 'Was kostet das Lookbook 2026?',
    a: 'Das Lookbook kostet 29 € als einmalige Zahlung. Keine versteckten Kosten, kein Abo. Du erhältst Dein personalisiertes Lookbook mit zwei Outfits, abgestimmt auf Deinen Kibbe-Typ.',
  },
  {
    q: 'Wie lange dauert der Kibbe-Typ-Test auf dieser Seite?',
    a: 'Der Test besteht aus 19 Fragen und dauert etwa 4–5 Minuten. Du beantwortest Fragen zu Deiner Silhouette, Deinen Schultern, Deiner Taille und Deinen Gesichtszügen. Am Ende kennst Du Deinen Typ und kannst Dein passendes Lookbook direkt bestellen.',
  },
  {
    q: 'Ist das Lookbook für jede Saison geeignet?',
    a: 'Das Lookbook 2026 ist auf die aktuelle Saison zugeschnitten – mit Farben, Stoffen und Schnitten für Winter und Frühjahr 2026. Zeitlose Basics bleiben auch darüber hinaus nutzbar.',
  },
  {
    q: 'Kann ich das Lookbook auch als Geschenk kaufen?',
    a: 'Ja. Beim Checkout kannst Du angeben, dass es ein Geschenk ist. In dem Fall senden wir Dir einen Gutschein-Code per E-Mail, den die Beschenkte einlösen kann – inklusive Kibbe-Test, falls ihr Typ noch nicht bekannt ist.',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'Endlich ein Lookbook, das nicht generisch ist. Meine zwei Outfits sind genau mein Typ – ich trage sie seit Monaten, immer wieder neu kombiniert.',
    name: 'Sandra T.',
    type: 'Classic',
  },
  {
    quote:
      'Ich war skeptisch, ob 29 € für zwei Outfits reicht. Tatsächlich war es der beste Einstieg. Ich weiß jetzt, welche Schnitte mir stehen und kaufe gezielter.',
    name: 'Meike R.',
    type: 'Dramatic',
  },
  {
    quote:
      'Das Lookbook hat meine Garderobe verändert. Ich sehe jetzt auf einen Blick, welche Farben und Stoffe meine Ausstrahlung unterstreichen.',
    name: 'Julia K.',
    type: 'Soft Natural',
  },
];

function JsonLd() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Lookbook 2026 – Personalisiert nach Kibbe-Typ',
    description:
      'Digitales Lookbook mit zwei Business-Outfits, abgestimmt auf den individuellen Kibbe-Körpertyp. Sofortiger PDF-Download.',
    image: 'https://businessstylist.de/lookbook-cover-2026.jpg',
    brand: { '@type': 'Brand', name: 'Businessstylist' },
    offers: {
      '@type': 'Offer',
      url: 'https://businessstylist.de/lookbook',
      priceCurrency: 'EUR',
      price: '29.00',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      priceValidUntil: '2026-12-31',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://businessstylist.de/' },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://businessstylist.de/shop' },
      { '@type': 'ListItem', position: 3, name: 'Lookbook', item: 'https://businessstylist.de/lookbook' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

function CheckoutCard() {
  const [activeTab, setActiveTab] = useState<'known' | 'unknown'>('known');
  const [selectedType, setSelectedType] = useState('');
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const utm: Record<string, string> = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((key) => {
        const val = params.get(key);
        if (val) utm[key] = val;
      });
      setUtmParams(utm);
    }
  }, []);

  const handleDirectCheckout = async () => {
    if (!selectedType) {
      setError('Bitte wähle Deinen Kibbe-Typ aus.');
      return;
    }
    if (!consent) {
      setError('Bitte stimme den AGB und der Datenschutzerklärung zu.');
      return;
    }
    setError('');
    await initiateCheckout(selectedType);
  };

  const handleQuickTestComplete = async (_type: string, displayName: string) => {
    await initiateCheckout(displayName);
  };

  const initiateCheckout = async (kibbeType: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/lookbook/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kibbeType, utmParams }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Fehler beim Checkout');
      if (data.url) window.location.href = data.url;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.';
      setError(message);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0D1B2E] rounded-2xl border border-[#C9A96E]/20 overflow-hidden shadow-2xl">
      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveTab('known')}
          className={`flex-1 py-4 px-6 text-sm font-semibold transition-colors ${
            activeTab === 'known'
              ? 'bg-[#C9A96E]/10 text-[#C9A96E] border-b-2 border-[#C9A96E]'
              : 'text-[#8A9AB5] hover:text-white'
          }`}
        >
          Ich kenne meinen Typ
        </button>
        <button
          onClick={() => setActiveTab('unknown')}
          className={`flex-1 py-4 px-6 text-sm font-semibold transition-colors ${
            activeTab === 'unknown'
              ? 'bg-[#C9A96E]/10 text-[#C9A96E] border-b-2 border-[#C9A96E]'
              : 'text-[#8A9AB5] hover:text-white'
          }`}
        >
          Typ noch unbekannt
        </button>
      </div>

      <div className="p-6 md:p-8">
        {activeTab === 'known' ? (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#8A9AB5] mb-2">
                Wähle Deinen Kibbe-Typ
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C9A96E] transition-colors appearance-none cursor-pointer"
              >
                <option value="" disabled className="bg-[#0D1B2E]">— Bitte wählen —</option>
                {KIBBE_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-[#0D1B2E]">{t}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3">
              <span className="text-[#8A9AB5] text-sm">Preis</span>
              <span className="text-white font-bold text-lg">29 €</span>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 accent-[#C9A96E]"
              />
              <span className="text-xs text-[#8A9AB5] leading-relaxed">
                Ich stimme den{' '}
                <Link href="/agb" className="text-[#C9A96E] hover:underline">AGB</Link>{' '}
                und der{' '}
                <Link href="/datenschutz" className="text-[#C9A96E] hover:underline">Datenschutzerklärung</Link>{' '}
                zu.
              </span>
            </label>

            {error && (
              <p className="text-red-400 text-xs bg-red-400/10 rounded-lg px-4 py-3">{error}</p>
            )}

            <button
              onClick={handleDirectCheckout}
              disabled={isLoading}
              className="w-full bg-[#C9A96E] hover:bg-[#D4B87A] disabled:opacity-50 text-[#0D1B2E] font-bold py-4 rounded-xl transition-colors text-sm"
            >
              {isLoading ? 'Wird geladen…' : 'Jetzt bestellen – 29 €'}
            </button>

            <p className="text-center text-xs text-[#8A9AB5]">
              Sofortiger PDF-Download · Einmalzahlung · Keine Abo-Falle
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-[#8A9AB5] text-sm leading-relaxed">
              Dein persönliches Stil-Profil – 19 Fragen, etwa 4–5 Minuten. Am Ende weißt Du Deinen Kibbe-Typ und bekommst direkt Dein passendes Lookbook.
            </p>
            <KibbeAssessment onTypeSelected={handleQuickTestComplete} />
          </div>
        )}
      </div>
    </div>
  );
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {FAQS.map((faq, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#E8E0D5]">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full text-left px-6 py-5 flex justify-between items-center gap-4"
          >
            <span className="font-semibold text-[#0D1B2E] text-sm md:text-base">{faq.q}</span>
            <span
              className={`text-[#C9A96E] flex-shrink-0 transition-transform duration-200 ${
                openIndex === i ? 'rotate-180' : ''
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          {openIndex === i && (
            <div className="px-6 pb-5 text-[#4A5568] text-sm leading-relaxed border-t border-gray-100">
              <p className="pt-4">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function LookbookPage() {
  const scrollToCheckout = () => {
    document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <JsonLd />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0D1B2E] to-[#162033] text-white py-20 md:py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#C9A96E]/10 border border-[#C9A96E]/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#C9A96E] inline-block"></span>
                <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-wider">
                  Lookbook 2026
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold leading-tight mb-6">
                Dein persönliches Lookbook 2026 – 2 Outfits, perfekt auf Deinen Kibbe-Typ abgestimmt
              </h1>

              <p className="text-[#8A9AB5] text-lg leading-relaxed mb-8">
                Entdecke die neuesten Trends der Fashion-Saison 2026 in einem Lookbook, das zu Dir gemacht ist. Zwei elegante Business-Outfits, zusammengestellt für Deinen Figurtyp – zeitlos, modern und sofort einsatzbereit.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={scrollToCheckout}
                  className="inline-flex items-center justify-center bg-[#C9A96E] hover:bg-[#D4B87A] text-[#0D1B2E] font-bold px-8 py-4 rounded-xl transition-colors text-sm"
                >
                  Lookbook sichern – 29 €
                </button>
                <Link
                  href="/kibbe-body-type-test"
                  className="inline-flex items-center justify-center text-[#C9A96E] hover:text-[#D4B87A] font-medium text-sm transition-colors"
                >
                  Noch unsicher? Zum kostenlosen Kibbe-Typ-Test →
                </Link>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#8A9AB5]">
                {['Sofortiger PDF-Download', 'Typgerecht', 'Einmalzahlung, keine Abo-Falle'].map((trust) => (
                  <span key={trust} className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-[#C9A96E]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {trust}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              {/* TODO: Lookbook-Mockup erstellen */}
              <div className="relative w-full max-w-sm">
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden aspect-[3/4] flex items-center justify-center">
                  <Image
                    src="/lookbook.webp"
                    alt="Lookbook 2026 – Personalisiertes Business-Lookbook nach Kibbe-Typ"
                    width={400}
                    height={533}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-[#C9A96E] text-[#0D1B2E] font-bold text-lg px-5 py-3 rounded-xl shadow-lg">
                  29 €
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trends Section */}
      <section className="bg-[#F9F6F1] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#0D1B2E] mb-6">
            Entdecke die neuesten Trends – Dein Lookbook 2026
          </h2>
          <p className="text-[#4A5568] leading-relaxed text-lg">
            Lass Dich inspirieren und finde die Essenz Deines persönlichen Stils. Das Lookbook 2026 präsentiert aktuelle Schnitte, Farben und Stoffe der neuen Kollektion – zugeschnitten auf Deinen Kibbe-Figurtyp. Jedes Ensemble wurde mit Gespür für Eleganz, Raffinesse und zeitlose Styles zusammengestellt. Keine generische Inspiration, sondern ein Lookbook, das zu Dir passt.
          </p>
        </div>
      </section>

      {/* What is a Lookbook */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#0D1B2E] mb-6 text-center">
            Was ist ein Lookbook und warum brauchst Du eins?
          </h2>
          <div className="space-y-4 text-[#4A5568] text-lg leading-relaxed">
            <p>
              Ein Lookbook ist mehr als eine Sammlung von Bildern. Es ist Dein visueller Leitfaden für Mode, Stil und moderne Looks – mit fertigen Outfits, die Du direkt nachkaufen oder aus Deiner Garderobe zusammenstellen kannst. Während klassische Fashion-Kollektionen allgemeine Trends zeigen, liefert Dein persönliches Lookbook 2026 konkrete Anleitung für Deinen Anlass, Dein Business, Dein Leben.
            </p>
            <p>
              Ein neues Lookbook einmal im Jahr reicht aus, um die Highlights der Saison zu entdecken und Dich von aktueller Eleganz inspirieren zu lassen. Besonders für Winter- und Frühjahr-Outfits lohnt sich der Blick ins Lookbook: Du siehst auf einen Blick, welche Muster, Stoffe und Farben zu Deinem Typ passen – und welche Fehlkäufe Du vermeiden kannst.
            </p>
          </div>
        </div>
      </section>

      {/* How outfits are made */}
      <section className="bg-[#0D1B2E] text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-6">
            Wie entstehen Deine 2 personalisierten Outfits?
          </h2>
          <p className="text-[#8A9AB5] leading-relaxed text-lg">
            Jedes Lookbook wird auf Grundlage Deines Kibbe-Typs entworfen. Das bedeutet: Die Schnitte, Stoffe und Styles sind nicht zufällig gewählt, sondern folgen der Logik Deiner natürlichen Linien. Wir kombinieren zwei vollständige Business-Outfits – vom Kleid über Accessoires bis zu passenden Details – und zeigen Dir, wie Du sie trägst. Jedes Outfit wirkt wie ein fertiges Statement.
          </p>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-[#F9F6F1] py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#0D1B2E] mb-10 text-center">
            Was ist in Deinem Lookbook enthalten?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {INCLUDED_ITEMS.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl px-5 py-4 shadow-sm">
                <svg className="w-5 h-5 text-[#C9A96E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-[#0D1B2E] text-sm leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target audience */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#0D1B2E] mb-4 text-center">
            Für wen ist das Lookbook 2026 geeignet?
          </h2>
          <p className="text-[#4A5568] text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            Das Lookbook richtet sich an Frauen, die bewusst shoppen wollen, ohne stundenlang nach Inspiration zu suchen. Wenn Du Deinen Typ verstehen und Deine Garderobe gezielt aufbauen willst – ohne komplette Stilberatung – ist das Lookbook Dein Einstieg.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Berufseinsteigerinnen',
                text: 'Du stehst am Anfang und willst eine erste Business-Garderobe, die modern, elegant und passend für Deinen Anlass ist.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: 'Führungskräfte',
                text: 'Du willst mit Raffinesse und Glamour auftreten, ohne Dich in jeder Saison neu orientieren zu müssen.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
              },
              {
                title: 'Stil-Suchende',
                text: 'Du suchst frische Inspiration für Deinen Kleidungsstil und willst Deine Essenz in Farben, Stoffen und Schnitten wiederfinden.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
              },
            ].map((card, i) => (
              <div key={i} className="bg-[#F9F6F1] rounded-2xl p-6 border border-[#E8E0D5]">
                <div className="w-12 h-12 bg-[#C9A96E]/10 rounded-xl flex items-center justify-center text-[#C9A96E] mb-4">
                  {card.icon}
                </div>
                <h3 className="font-semibold text-[#0D1B2E] mb-2">{card.title}</h3>
                <p className="text-[#4A5568] text-sm leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kibbe types explainer */}
      <section className="bg-[#F9F6F1] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#0D1B2E] mb-6">
            Welcher Kibbe-Typ bist Du?
          </h2>
          <p className="text-[#4A5568] leading-relaxed text-lg mb-10">
            Der Kibbe-Typ beschreibt, welche Linien, Schnitte und Proportionen zu Deinem Körperbau passen. Es gibt 13 Typen – von Dramatic über Classic bis Romantic. Dein Typ bestimmt, welche Muster, welcher Stoff und welche Looks Deine natürliche Ausstrahlung unterstreichen. Ohne Kibbe-Wissen bleibt Mode Zufall. Mit Kibbe wird sie präzise.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {KIBBE_TYPES.map((type) => (
              <span
                key={type}
                className="bg-white border border-[#C9A96E]/30 text-[#0D1B2E] text-xs font-medium px-3 py-1.5 rounded-full"
              >
                {type}
              </span>
            ))}
          </div>
          <Link
            href="/kibbe-body-type-test"
            className="text-[#C9A96E] hover:text-[#B8924A] font-medium text-sm transition-colors"
          >
            Ausführlichen Kibbe-Test machen →
          </Link>
        </div>
      </section>

      {/* Checkout Section */}
      <section id="checkout-section" className="bg-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#0D1B2E] mb-3">
              Wie bekommst Du Dein Lookbook?
            </h2>
            <p className="text-[#4A5568]">
              Wähle Deinen Weg – beide führen zu Deinem personalisierten Lookbook für 29 €.
            </p>
          </div>
          <div className="max-w-lg mx-auto">
            <CheckoutCard />
          </div>
        </div>
      </section>

      {/* Why lookbook */}
      <section className="bg-[#0D1B2E] text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-6">
            Warum ein Lookbook statt eigenes Zusammenstellen?
          </h2>
          <p className="text-[#8A9AB5] leading-relaxed text-lg">
            Mode ohne System führt zu Fehlkäufen und Frust. Ein Lookbook schafft Klarheit: Du siehst sofort, was funktioniert, welche Farbe zu Deiner Saison passt und welches Design Deinen Typ unterstreicht. Statt stundenlang Inspiration auf Instagram zu sammeln, hast Du in Minuten zwei durchdachte Outfits – zusammengestellt mit dem Wissen um Eleganz, Schnitte und Stoffe, das sonst nur die Stilberatung liefert.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#F9F6F1] py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#0D1B2E] mb-10 text-center">
            Was Kundinnen über ihr Lookbook sagen
          </h2>
          {/* TODO: Echte Testimonials einfügen */}
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E0D5]">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-[#C9A96E]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-[#4A5568] text-sm leading-relaxed mb-4 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-semibold text-[#0D1B2E] text-sm">{t.name}</p>
                  <p className="text-[#C9A96E] text-xs">{t.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#0D1B2E] mb-10 text-center">
            Häufige Fragen zum Lookbook
          </h2>
          <FaqAccordion />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#0D1B2E] py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4">
            Bereit für Dein Lookbook 2026?
          </h2>
          <p className="text-[#8A9AB5] text-lg mb-10 leading-relaxed">
            Lass Dich inspirieren und finde Deinen Ausdruck in zwei Outfits, die zu Dir passen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center bg-[#C9A96E] hover:bg-[#D4B87A] text-[#0D1B2E] font-bold px-8 py-4 rounded-xl transition-colors text-sm"
            >
              Lookbook sichern – 29 €
            </button>
            <Link
              href="/kibbe-body-type-test"
              className="inline-flex items-center justify-center border border-white/20 hover:border-white/40 text-white font-medium px-8 py-4 rounded-xl transition-colors text-sm"
            >
              Erst Kibbe-Typ testen
            </Link>
          </div>
          <div className="mt-12 pt-12 border-t border-white/10">
            <p className="text-[#8A9AB5] text-sm">
              Mehr als ein Lookbook?{' '}
              <Link href="/stilberatung" className="text-[#C9A96E] hover:underline">
                Zur persönlichen Stilberatung ab 390 € →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
