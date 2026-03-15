import Link from 'next/link';
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import NewsletterSignup from '@/components/forms/NewsletterSignup';

export const metadata: Metadata = {
  title: 'Businessstylist - Business-Outfit, das sitzt | Zieh Erfolg an!',
  description: 'Perfekt gekleidet im Business: Stilberatung, Kibbe-Typanalyse & Capsule Wardrobe von Diplom-Kostümbildnerin Anika. Von formell bis business casual - dein stilsicherer Auftritt.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-business-navy via-business-darkNavy to-business-charcoal opacity-95 z-0"></div>

        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-display-1 md:text-display-2 font-serif mb-6">
                Business-Outfit, das sitzt.<br />
                <span className="text-business-gold">Perfekt gekleidet, perfekt gekrönt!</span>
              </h1>
              <p className="text-lg mb-8 leading-relaxed text-gray-200">
                Die Businesswelt tickt schnell: Ein Blick entscheidet, ob du Partnerin oder Fußnote bist.
                Dein Business-Look ist eine visuelle Kurzbiografie – verfasst in Blazer, Rock oder Anzug.
                Mit System zum stilsicheren Auftritt.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/typenanalyse">
                  <Button size="lg" variant="accent">Kostenlose Typanalyse starten</Button>
                </Link>
                <Link href="/stilberatung">
                  <Button size="lg" variant="secondary">Stilberatung buchen</Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lifted">
                <img
                  src="https://businessstylist.de/wp-content/uploads/2025/05/business-outfit-damen-sommer-768x1020.avif"
                  alt="Business Outfit Damen Sommer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-business-gold rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-h2 mb-4">Dein Weg zum sicheren Business Outfit</h2>
            <p className="text-body-lg text-brand-secondary max-w-2xl mx-auto">
              Vom Stil-Test bis zur laufenden Stilpflege - dein professioneller Auftritt in vier Schritten
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card hover>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-h3 mb-3">Kurze Typanalyse</h3>
              <p className="text-brand-secondary">
                Mach online einen kurzen Stil-Test – abgestimmt auf Figur, Farbwirkung und beruflichen Kontext. So findest du heraus, welcher Business-Stil zu dir passt.
              </p>
            </Card>

            <Card hover>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-h3 mb-3">Digitales Lookbook</h3>
              <p className="text-brand-secondary">
                Erhalte ein fertiges Lookbook mit Outfit-Vorschlägen, perfekt auf deinen Stiltyp abgestimmt – inklusive Shop-Links für sofort bestellbare Business Outfits.
              </p>
            </Card>

            <Card hover>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-h3 mb-3">Stilberatung</h3>
              <p className="text-brand-secondary">
                In der 1:1-Beratung mit Anika bekommst du deine Farb-, Stil- und Garderobenstrategie – auf Wunsch online oder vor Ort, diskret und individuell.
              </p>
            </Card>

            <Card hover>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                4
              </div>
              <h3 className="text-h3 mb-3">Laufende Stilpflege</h3>
              <p className="text-brand-secondary">
                Mit dem Style-Abo bleibst du saisonal aktuell. Du bekommst neue Looks, Updates für deine Capsule Wardrobe und persönliche Unterstützung bei Fragen.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-h2 mb-4">Warum Du einen Stylisten buchen solltest</h2>
            <p className="text-body-lg text-brand-secondary max-w-2xl mx-auto">
              Dein Business-Outfit ist keine Verkleidung, sondern deine visuelle Visitenkarte
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-h3 mb-3">Perfekt gekleidet</h3>
              <p className="text-brand-secondary">
                Dein Business-Outfit ist keine Verkleidung, sondern deine visuelle Visitenkarte.
                Statt Uniform bekommst du maßgeschneiderte Looks, die sofort professionell und stilsicher wirken.
              </p>
            </Card>

            <Card>
              <h3 className="text-h3 mb-3">Layering-Looks</h3>
              <p className="text-brand-secondary">
                Für die kalte Jahreszeit kombinieren wir Cashmere, Wolle und leichte Schichten so,
                dass dein Outfit luftig wirkt und trotzdem warm hält. Stilsicher und perfekt temperiert.
              </p>
            </Card>

            <Card>
              <h3 className="text-h3 mb-3">Business-Casual-Check</h3>
              <p className="text-brand-secondary">
                Zwischen formell und casual finden wir dein optimales Gleichgewicht. Egal ob Blazer mit Chino
                oder Bluse mit Loafern - du bleibst modisch, gepflegt und selbstbewusst.
              </p>
            </Card>

            <Card>
              <h3 className="text-h3 mb-3">Dresscode-Kompass</h3>
              <p className="text-brand-secondary">
                Ob streng Business Attire oder lockerer Business Casual - wir knacken jeden Dresscode
                und definieren deinen persönlichen Rahmen. Du weißt, wann Blazer und wann legerer Chic genügt.
              </p>
            </Card>

            <Card>
              <h3 className="text-h3 mb-3">Capsule Wardrobe</h3>
              <p className="text-brand-secondary">
                Eine zeitlose Auswahl an Essentials sorgt für Komfort und minimalen Entscheidungsstress im Berufsalltag.
                Jeder Look entsteht aus perfekt aufeinander abgestimmten Teilen.
              </p>
            </Card>

            <Card>
              <h3 className="text-h3 mb-3">Maßgeschneiderter Look</h3>
              <p className="text-brand-secondary">
                Mit individueller Stilberatung und Typanalyse (z. B. Kibbe) findest du deine perfekte Passform.
                Dein Look wirkt persönlich, ohne sich an vorgefertigte Schablonen zu halten.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-h2 mb-4">Meine Leistungen für Dich</h2>
            <p className="text-body-lg text-brand-secondary max-w-2xl mx-auto">
              Von der ersten Orientierung bis zur persönlichen 1:1-Beratung
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card hover>
              <h3 className="text-h3 mb-3">Starter Lookbook</h3>
              <p className="text-brand-secondary mb-4">
                Erhalte ein fertiges Lookbook mit Business-Outfits, abgestimmt auf deinen Typ - inklusive Shoppinglinks.
              </p>
              <div className="my-6">
                <div className="inline-block bg-brand-secondary text-white px-8 py-4 rounded-lg">
                  <span className="text-4xl font-bold">€29</span>
                </div>
              </div>
              <ul className="space-y-2 mb-6 text-sm text-brand-secondary">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Typgerechtes Lookbook
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Outfits mit Shop-Links
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Farb- & Schnittempfehlungen
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Stilvolle Basics & Accessoires
                </li>
              </ul>
              <Link href="/lookbook">
                <Button className="w-full">Lookbook sichern</Button>
              </Link>
            </Card>

            <Card hover>
              <h3 className="text-h3 mb-3">Kleiderschrank Check</h3>
              <p className="text-brand-secondary mb-4">
                Dein Einstieg ins Business-Styling: Wir analysieren deine Garderobe und entwickeln direkt erste Outfit-Ideen.
              </p>
              <div className="my-6">
                <div className="inline-block bg-brand-secondary text-white px-8 py-4 rounded-lg">
                  <span className="text-4xl font-bold">€179</span>
                </div>
              </div>
              <ul className="space-y-2 mb-6 text-sm text-brand-secondary">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  90 Min Online-Call
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Bestehende Teile neu stylen
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Kein Kaufdruck
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Passform-Tipps
                </li>
              </ul>
              <Link href="/kleiderschrank-check">
                <Button className="w-full">Jetzt Termin buchen</Button>
              </Link>
            </Card>

            <Card hover>
              <h3 className="text-h3 mb-3">Farbberatung</h3>
              <p className="text-brand-secondary mb-4">
                Entdecke deine perfekte Farbpalette mit professioneller Farbtyp-Analyse nach der Vier-Jahreszeiten-Methode.
              </p>
              <div className="my-6">
                <div className="inline-block bg-brand-secondary text-white px-8 py-4 rounded-lg">
                  <span className="text-4xl font-bold">€179</span>
                </div>
              </div>
              <ul className="space-y-2 mb-6 text-sm text-brand-secondary">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Farbtyp-Analyse
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Persönliche Farbpalette
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Styling-Empfehlungen
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Make-up & Accessoires-Tipps
                </li>
              </ul>
              <Link href="/farbtyp-beratung">
                <Button className="w-full">Farbberatung buchen</Button>
              </Link>
            </Card>

            <Card hover>
              <h3 className="text-h3 mb-3">Stilberatung</h3>
              <p className="text-brand-secondary mb-4">
                In 1:1-Sessions entwickle ich mit Dir deinen Business-Look: klar, typgerecht und zukunftsfähig. 2 × 90 Minuten.
              </p>
              <div className="my-6">
                <div className="inline-block bg-brand-secondary text-white px-8 py-4 rounded-lg">
                  <span className="text-4xl font-bold">€390</span>
                </div>
              </div>
              <ul className="space-y-2 mb-6 text-sm text-brand-secondary">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Farb- & Stiltyp Analyse
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  komplette Outfit-Strategie
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Figur & Passform
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Lookbook inkl.
                </li>
              </ul>
              <Link href="/stilberatung">
                <Button className="w-full">Stilberatung buchen</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-xl overflow-hidden shadow-card">
                  <a href="/lookbook" title="Lookbook">
                    <img
                      src="/lookbook.webp"
                      alt="Lookbook"
                      className="w-full h-full object-cover"
                    />
                  </a>
                </div>
                <div className="aspect-square rounded-xl overflow-hidden shadow-card">
                  <a href="/stilberatung" title="Stilberatung">
                    <img
                      src="/stilberatung copy.webp"
                      alt="Stilberatung"
                      className="w-full h-full object-cover"
                    />
                  </a>
                </div>
                <div className="aspect-square rounded-xl overflow-hidden shadow-card">
                  <img
                    src="/kibbe-body-type-analyse.webp"
                    alt="Kibbe Body Type Analyse"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-xl overflow-hidden shadow-card">
                  <img
                    src="/streetstyle-blazer.webp"
                    alt="Streetstyle Blazer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-h2 mb-6">Über mich - Anika Schmitz</h2>
              <p className="text-body-lg text-brand-secondary mb-6">
                Mit der Ausbildung als Schneiderin und dem anschließenden Studium zur <strong>Diplom-Kostümbildnerin (FH)</strong>
                habe ich meine Grundsteine für meine Karriere gelegt. Neben Etappen bei Film, Fernsehen und Theater
                habe ich über <strong>10 Jahre Erfahrung als Stylistin</strong> sammeln können.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start bg-business-cream p-4 rounded-lg">
                  <svg className="w-6 h-6 text-brand-accent mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold">7 Jahre bei Zalon by Zalando</p>
                    <p className="text-brand-secondary text-sm">als Freelance Stylistin mit tausenden betreuten Kunden</p>
                  </div>
                </div>
                <div className="flex items-start bg-business-cream p-4 rounded-lg">
                  <svg className="w-6 h-6 text-brand-accent mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold">Freelance Stylistin bei Outfittery</p>
                    <p className="text-brand-secondary text-sm">Hunderte Kunden bis Juni 2025 betreut</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-business-navy to-business-darkNavy p-6 rounded-xl text-white">
                <p className="text-lg mb-2">
                  Ich unterstütze dich mit Stilberatung, Farbberatung, Capsule-Wardrobe-Konzepten und Kibbe-Typanalyse dabei,
                  eine klare, moderne Business-Garderobe aufzubauen.
                </p>
                <p className="text-2xl text-business-gold font-semibold">
                  Zieh Erfolg an!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-business-cream to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lifted overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <div className="inline-block bg-business-gold text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                    Kostenloser Download
                  </div>
                  <h2 className="text-h2 mb-4">Smart Casual Checkliste</h2>
                  <p className="text-brand-secondary mb-6">
                    Hol dir jetzt die <strong>kostenlose Smart Casual Checkliste</strong> mit Do&apos;s & Don&apos;ts,
                    Outfit-Vorschlägen für Damen und Herren sowie Profi-Tipps!
                  </p>
                  <ul className="space-y-3 mb-6 text-sm">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-business-gold mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      4-seitiges PDF mit allen Essentials
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-business-gold mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Sofort umsetzbare Tipps
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-business-gold mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Für Damen & Herren
                    </li>
                  </ul>
                  <Link href="/downloads" className="text-brand-accent font-semibold hover:underline">
                    Alle Downloads ansehen →
                  </Link>
                </div>
                <div className="relative bg-gradient-to-br from-business-navy to-business-darkNavy p-8 md:p-12 flex items-center justify-center">
                  <img
                    src="/smart-casual-checkliste.webp"
                    alt="Smart Casual Checkliste"
                    className="w-full max-w-xs drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-h2 mb-6">Deine Zukunftsversion, dein Wettbewerbsvorteil</h2>
          <p className="text-body-lg mb-8 max-w-2xl mx-auto">
            Stell dir vor, du betrittst den Raum, alle spüren deine Eleganz, deinen Fokus – bevor du sprichst.
            Das ist Kleidung als strategische Ressource. Ich begleite dich vom ersten Mood-Board bis zum großen Pitch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/typenanalyse">
              <Button variant="accent" size="lg">
                Kostenlose Typanalyse starten
              </Button>
            </Link>
            <Link href="/stilberatung">
              <Button variant="secondary" size="lg">
                Beratung buchen
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
