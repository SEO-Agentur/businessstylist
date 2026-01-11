'use client';

import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { useRouter } from 'next/navigation';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Farbberatung & Farbtyp-Analyse',
  description: 'Professionelle Farbberatung für Farben, die Dir stehen. Finde Deinen Farbtyp mit der Vier-Jahreszeiten-Methode und entdecke Deine perfekte Farbpalette.',
  provider: {
    '@type': 'Organization',
    name: 'Businessstylist',
    url: 'https://businessstylist.de'
  },
  offers: {
    '@type': 'Offer',
    price: '179.00',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock'
  }
};

export default function FarbtypBeratungPage() {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart({
      id: 'farbberatung',
      name: 'Farbberatung & Farbtyp-Analyse',
      price: 179,
      type: 'service',
    });
    router.push('/checkout');
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen">
        <section className="relative bg-gradient-to-br from-business-cream via-white to-brand-light py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-brand-accent rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-business-gold rounded-full blur-3xl"></div>
          </div>

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-6 px-4 py-2 bg-white rounded-full shadow-sm border border-brand-accent/20">
                <span className="text-brand-accent font-semibold text-sm tracking-wide uppercase">
                  Professionelle Farbberatung
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-primary mb-6 leading-tight">
                Farbberatung & Farbtyp
              </h1>

              <p className="text-xl md:text-2xl text-brand-secondary mb-8 leading-relaxed max-w-3xl mx-auto">
                Dein Weg zu Klarheit, Ausstrahlung und stilsicherer Farbwahl
              </p>

              <p className="text-lg text-brand-secondary/90 mb-10 leading-relaxed max-w-2xl mx-auto">
                Eine fundierte Farbberatung verändert, wie Du Dich siehst – und wie andere Dich wahrnehmen.
                Entdecke die Farben, die Deine natürliche Ausstrahlung unterstreichen.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={handleAddToCart}
                  className="btn-accent text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                  Jetzt buchen – 179 EUR
                </button>
                <Link
                  href="#details"
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Mehr erfahren
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white" id="details">
          <div className="container-custom max-w-5xl">
            <div className="prose prose-lg max-w-none">
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">
                  Warum Farben Wirkung haben
                </h2>
                <p className="text-lg text-brand-secondary leading-relaxed">
                  Eine professionelle Farbberatung geht weit über Modeempfehlungen hinaus. Farben beeinflussen,
                  ob Dein Gesicht strahlen bringen oder Dich blass und müde aussehen lassen. Mit der richtigen
                  Farbwahl wirken Haut und Augen lebendiger, Konturen klarer und Dein Auftritt harmonisch.
                </p>
                <p className="text-lg text-brand-secondary leading-relaxed">
                  Die Farbberatung zeigt Dir, wie Farben harmonieren, welche Nuance Deine natürliche Ausstrahlung
                  unterstützt und welche Töne Du besser meidest. So entstehen Sicherheit und Klarheit – statt
                  täglicher Unsicherheit vor dem Kleiderschrank.
                </p>
              </div>

              <div className="mb-16 p-8 bg-gradient-to-r from-business-cream to-brand-light rounded-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">
                  Farbtyp & Farbanalyse – die Grundlage
                </h2>
                <p className="text-lg text-brand-secondary leading-relaxed">
                  Im Zentrum jeder Farbanalyse steht Dein individueller Farbtyp. Er ergibt sich aus Teint,
                  Augen- und Haarfarbe, Unterton und Kontrast. Manche Menschen wirken kühl, andere warm;
                  einige hell, andere tief und intensiv.
                </p>
                <p className="text-lg text-brand-secondary leading-relaxed">
                  Die professionelle Farbberatung analysiert diese Faktoren systematisch. Ziel ist es,
                  Deine passenden Farben zu definieren – nicht Trends zu folgen, sondern Deinen natürlichen
                  Ausdruck zu stärken.
                </p>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-8 text-center">
                  Die Vier-Jahreszeiten-Methode
                </h2>
                <p className="text-lg text-brand-secondary leading-relaxed text-center mb-12">
                  In der klassischen Vier-Jahreszeiten-Methode werden die Farbtypen unterschieden und nach
                  den Jahreszeiten benannt. Diese Einteilung hilft, Farbwelten verständlich zu machen.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="card hover:shadow-2xl transition-shadow border-l-4 border-blue-400">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-brand-primary">Wintertyp</h3>
                    </div>
                    <p className="text-brand-secondary font-semibold mb-3">Klar, kontrastreich, kühl</p>
                    <p className="text-brand-secondary leading-relaxed mb-4">
                      Der Wintertyp wirkt klar, intensiv und kontrastreich. Typisch sind bläuliche Untertöne,
                      ein kühler Teint und oft dunkle oder sehr helle Haarfarben.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-900 text-white text-sm rounded-full">Royalblau</span>
                      <span className="px-3 py-1 bg-emerald-600 text-white text-sm rounded-full">Smaragdgrün</span>
                      <span className="px-3 py-1 bg-rose-600 text-white text-sm rounded-full">Kirschrot</span>
                      <span className="px-3 py-1 bg-fuchsia-600 text-white text-sm rounded-full">Magenta</span>
                    </div>
                  </div>

                  <div className="card hover:shadow-2xl transition-shadow border-l-4 border-orange-400">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-brand-primary">Herbsttyp</h3>
                    </div>
                    <p className="text-brand-secondary font-semibold mb-3">Warm, gedeckt, erdig</p>
                    <p className="text-brand-secondary leading-relaxed mb-4">
                      Der Herbsttyp zeichnet sich durch Wärme und Tiefe aus. Häufig sind ein goldener Schimmer
                      im Teint, Sommersprossen, goldbraune Augen oder ein olivfarbener Unterton.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-green-700 text-white text-sm rounded-full">Olivgrün</span>
                      <span className="px-3 py-1 bg-amber-700 text-white text-sm rounded-full">Camel</span>
                      <span className="px-3 py-1 bg-orange-700 text-white text-sm rounded-full">Rostrot</span>
                      <span className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-full">Senfgelb</span>
                    </div>
                  </div>

                  <div className="card hover:shadow-2xl transition-shadow border-l-4 border-purple-400">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.5 2a3.5 3.5 0 101.665 6.58L8.585 10l-1.42 1.42a3.5 3.5 0 101.414 1.414l8.128-8.127a1 1 0 00-1.414-1.414L10 8.586l-1.42-1.42A3.5 3.5 0 005.5 2zM4 5.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 9a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-brand-primary">Sommertyp</h3>
                    </div>
                    <p className="text-brand-secondary font-semibold mb-3">Sanft, hell, bläulich</p>
                    <p className="text-brand-secondary leading-relaxed mb-4">
                      Der Sommertyp wirkt ruhig, fein und eher hell. Typisch sind ein rosiger Teint,
                      oft blonde oder aschige Haarfarbe, bläuliche Untertöne und eine geringe Kontraststärke.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-purple-300 text-purple-900 text-sm rounded-full">Flieder</span>
                      <span className="px-3 py-1 bg-gray-400 text-white text-sm rounded-full">Taupe</span>
                      <span className="px-3 py-1 bg-sky-300 text-sky-900 text-sm rounded-full">Himmelblau</span>
                      <span className="px-3 py-1 bg-pink-300 text-pink-900 text-sm rounded-full">Zartes Pink</span>
                    </div>
                  </div>

                  <div className="card hover:shadow-2xl transition-shadow border-l-4 border-yellow-400">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-brand-primary">Frühlingstyp</h3>
                    </div>
                    <p className="text-brand-secondary font-semibold mb-3">Leuchtend, warm, frisch</p>
                    <p className="text-brand-secondary leading-relaxed mb-4">
                      Der Frühlingstyp steht für Frische und Leuchtkraft. Ein warmer, oft heller Teint,
                      apricot- oder rosige Nuancen und ein natürlicher Glow sind typisch.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-yellow-300 text-yellow-900 text-sm rounded-full">Zitronengelb</span>
                      <span className="px-3 py-1 bg-cyan-400 text-cyan-900 text-sm rounded-full">Türkis</span>
                      <span className="px-3 py-1 bg-lime-400 text-lime-900 text-sm rounded-full">Lindgrün</span>
                      <span className="px-3 py-1 bg-red-500 text-white text-sm rounded-full">Tomatenrot</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-brand-accent/10 to-business-gold/10 rounded-2xl p-10 mb-16 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-brand-primary mb-4">
                  Bereit für Deine persönliche Farbberatung?
                </h2>
                <p className="text-lg text-brand-secondary mb-6 max-w-2xl mx-auto">
                  Entdecke Deine perfekte Farbpalette und lerne, welche Farbtöne miteinander harmonieren
                  und wie Du sichere Farbkombinationen zusammenstellst.
                </p>
                <button
                  onClick={handleAddToCart}
                  className="btn-accent text-lg px-10 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                  Farbberatung buchen – 179 EUR
                </button>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">
                  Passende Farben, Farbpalette & Kombinationen
                </h2>
                <p className="text-lg text-brand-secondary leading-relaxed">
                  Aus der Analyse entsteht Deine persönliche Farbpalette. Sie zeigt Dir, welche Farbtöne
                  miteinander harmonieren und wie Du sichere Farbkombinationen zusammenstellst.
                </p>
                <p className="text-lg text-brand-secondary leading-relaxed">
                  Mit diesem Wissen kannst Du Fehlkäufe vermeiden, gezielt einkaufen und Farben bewusst
                  einsetzen – von Basics bis Statement-Piece.
                </p>
              </div>

              <div className="mb-16 p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">
                  Farbberatung im Alltag
                </h2>
                <p className="text-lg text-brand-secondary leading-relaxed mb-6">
                  Die Farbberatung wirkt im Alltag dort, wo Entscheidungen fallen: beim Make-up,
                  beim Zusammenstellen eines Outfits oder bei Accessoires. Farben im Gesicht beeinflussen
                  sofort die Wirkung.
                </p>
                <p className="text-lg text-brand-secondary leading-relaxed">
                  Ob augennah, im Schal oder bei Lippenstift – die richtigen Töne unterstützen Deine
                  natürliche Ausstrahlung und sorgen für Balance.
                </p>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">
                  Stilberatung & Farbwahl – typgerecht & souverän
                </h2>
                <p className="text-lg text-brand-secondary leading-relaxed">
                  Eine Stilberatung ergänzt die Farbwelt ideal. Farben und Schnitte greifen ineinander:
                  Ein typgerechtes Farbkonzept verstärkt Linien, Proportionen und Stil.
                </p>
                <p className="text-lg text-brand-secondary leading-relaxed">
                  Die Zusammenarbeit mit einer erfahrenen Farbberaterin gibt Dir Sicherheit – nicht nur heute,
                  sondern langfristig. Du weißt, was Dir besonders gut stehen und wie Du Farben gezielt einsetzt.
                </p>
              </div>

              <div className="bg-business-navy text-white rounded-2xl p-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">
                  Das Wichtigste zur Farbberatung
                </h2>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-business-gold flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Farbberatung schafft Klarheit und Sicherheit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-business-gold flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Dein Farbtyp basiert auf Teint, Augen- und Haarfarbe</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-business-gold flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Die Vier-Jahreszeiten-Methode bietet Orientierung</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-business-gold flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Jede Jahreszeit hat ihre optimalen Farben</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-business-gold flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Eine persönliche Farbpalette verhindert Fehlkäufe</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-business-gold flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Farben wirken im Alltag, im Business und privat</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-business-gold flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>In Kombination mit Stilberatung entsteht ein stimmiges Gesamtbild</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-gradient-to-br from-brand-accent/5 via-business-cream to-brand-light">
          <div className="container-custom max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">
              Die richtigen Farben sind kein Zufall
            </h2>
            <p className="text-xl text-brand-secondary mb-10 leading-relaxed max-w-2xl mx-auto">
              Mit einer professionellen Farbberatung findest Du Deinen Stil, Deine Wirkung –
              und Farben, die Dir wirklich stehen.
            </p>

            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-left">
                  <p className="text-sm text-brand-secondary uppercase tracking-wide mb-1">Investition</p>
                  <p className="text-4xl md:text-5xl font-bold text-brand-primary">179 EUR</p>
                </div>
              </div>

              <ul className="text-left space-y-3 mb-8 max-w-md mx-auto">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-secondary">Professionelle Farbtyp-Analyse</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-secondary">Persönliche Farbpalette</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-secondary">Styling-Empfehlungen für Alltag & Business</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-secondary">Tipps für Make-up & Accessoires</span>
                </li>
              </ul>

              <button
                onClick={handleAddToCart}
                className="btn-accent text-lg px-12 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all w-full md:w-auto"
              >
                Jetzt Farbberatung buchen
              </button>
            </div>

            <p className="text-sm text-brand-secondary">
              Du hast Fragen? <Link href="/kontakt" className="text-brand-accent hover:text-brand-primary font-semibold">Kontaktiere uns</Link>
            </p>
          </div>
        </section>
      </article>
    </>
  );
}
