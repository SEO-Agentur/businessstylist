'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useCart } from '@/lib/context/CartContext';

export default function DresscodePlaybookPage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const handlePurchase = () => {
    addToCart({
      id: 'dresscode-playbook',
      name: 'Dresscode Playbook',
      price: 33.95,
      type: 'ebook'
    });
    router.push('/checkout');
  };

  return (
    <>
      <section className="relative section-padding overflow-hidden bg-gradient-to-br from-business-navy via-business-darkNavy to-business-charcoal">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-business-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-accent rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left text-white">
              <h1 className="text-display-2 font-serif mb-6">
                Dresscode Playbook
              </h1>
              <p className="text-xl leading-relaxed mb-4">
                Der ultimative Guide für jeden Business-Dresscode
              </p>
              <p className="text-lg text-gray-300 max-w-xl mb-8">
                Von Smart Casual bis Black Tie – verstehe und beherrsche jeden Dresscode mit Sicherheit
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8">
                <div className="text-5xl font-bold">€ 33,95</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center flex-wrap mb-4">
                <Button
                  size="lg"
                  variant="accent"
                  onClick={handlePurchase}
                >
                  Jetzt kaufen
                </Button>
                <a
                  href="https://amzn.to/482guRg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-brand-primary border-2 border-white hover:bg-gray-100 px-6 py-4 text-base whitespace-nowrap"
                >
                  Taschenbuch auf Amazon.de kaufen
                </a>
              </div>
              <a
                href="https://read.amazon.com/sample/B0GGDN15HK?clientId=share"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 underline underline-offset-2 hover:text-white transition-colors mb-2 inline-block"
              >
                Leseprobe lesen
              </a>
              <p className="text-sm text-gray-300">Sofortiger digitaler Download nach Zahlung</p>
            </div>

            <div className="flex-shrink-0 lg:w-[420px] flex justify-center">
              <img
                src="/dresscode-playbook.png"
                alt="Dresscode Playbook – auf Tablet, Smartphone und als Buch"
                className="w-full max-w-sm lg:max-w-none drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-h2 mb-6">Was ist drin?</h2>
            <p className="text-xl text-brand-secondary leading-relaxed max-w-3xl mx-auto">
              Ein praxisnaher Leitfaden, der Dir zeigt, wie Du Dich bei jedem Anlass perfekt kleidest –
              von der ersten Business-Veranstaltung bis zur Gala.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-h3 mb-3">Business Casual</h3>
              <p className="text-brand-secondary">
                Der entspannte Business-Look für den Alltag. Was funktioniert, was geht zu weit – mit konkreten Beispielen und Kombinationen.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-h3 mb-3">Smart Casual</h3>
              <p className="text-brand-secondary">
                Die Balance zwischen professionell und leger. Perfekt für After-Work-Events, Networking und moderne Büros.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-h3 mb-3">Business Professional</h3>
              <p className="text-brand-secondary">
                Der klassische Business-Look für wichtige Meetings, Präsentationen und formelle Anlässe im beruflichen Kontext.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                4
              </div>
              <h3 className="text-h3 mb-3">Cocktail Attire</h3>
              <p className="text-brand-secondary">
                Elegant und festlich, aber nicht zu formell. Der perfekte Look für Firmenevents, Empfänge und festliche Dinner.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                5
              </div>
              <h3 className="text-h3 mb-3">Black Tie</h3>
              <p className="text-brand-secondary">
                Der formellste Dresscode für Galas und besondere Anlässe. Was Du wissen musst, um stilvoll aufzutreten.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                6
              </div>
              <h3 className="text-h3 mb-3">Do&apos;s & Don&apos;ts</h3>
              <p className="text-brand-secondary">
                Konkrete Styling-Tipps, häufige Fehler und wie Du sie vermeidest – für jeden Dresscode.
              </p>
            </Card>
          </div>

          <div className="bg-brand-light rounded-2xl p-8 md:p-12">
            <h3 className="text-h2 text-center mb-8">Das bekommst Du</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                <svg className="w-6 h-6 text-brand-accent flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold mb-1">50+ Seiten Dresscode-Wissen</h4>
                  <p className="text-brand-secondary text-sm">Kompakt und praxisnah aufbereitet</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <svg className="w-6 h-6 text-brand-accent flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold mb-1">Outfit-Beispiele</h4>
                  <p className="text-brand-secondary text-sm">Fertige Looks für jeden Anlass</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <svg className="w-6 h-6 text-brand-accent flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold mb-1">Checklisten</h4>
                  <p className="text-brand-secondary text-sm">Zum Ausdrucken und Abhaken</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <svg className="w-6 h-6 text-brand-accent flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold mb-1">Shopping-Empfehlungen</h4>
                  <p className="text-brand-secondary text-sm">Was Du wirklich brauchst</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <svg className="w-6 h-6 text-brand-accent flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold mb-1">Sofort-Download</h4>
                  <p className="text-brand-secondary text-sm">PDF, optimiert für alle Geräte</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <svg className="w-6 h-6 text-brand-accent flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold mb-1">Updates inklusive</h4>
                  <p className="text-brand-secondary text-sm">Kostenlose Updates bei neuen Versionen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-business-navy to-business-darkNavy text-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-h2 mb-6">Nie wieder unsicher beim Dresscode</h2>
          <p className="text-xl mb-8 text-gray-300">
            Investiere einmalig € 49,- und habe lebenslang Klarheit über jeden Dresscode.
          </p>
          <Button
            size="lg"
            variant="accent"
            onClick={handlePurchase}
          >
            Jetzt Dresscode Playbook kaufen
          </Button>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="text-h2 text-center mb-12">Häufige Fragen</h2>
          <div className="space-y-6">
            <Card>
              <h3 className="text-h4 mb-2">Für wen ist das Playbook geeignet?</h3>
              <p className="text-brand-secondary">
                Für alle, die beruflich oder privat mit verschiedenen Dresscodes konfrontiert werden und sich sicher und angemessen kleiden möchten.
              </p>
            </Card>

            <Card>
              <h3 className="text-h4 mb-2">In welchem Format erhalte ich das Playbook?</h3>
              <p className="text-brand-secondary">
                Als PDF-Datei, optimiert für alle Geräte. Du kannst es auf Computer, Tablet oder Smartphone lesen oder ausdrucken.
              </p>
            </Card>

            <Card>
              <h3 className="text-h4 mb-2">Wie erhalte ich das Playbook?</h3>
              <p className="text-brand-secondary">
                Nach dem Kauf erhältst Du sofort einen Download-Link per E-Mail. Du kannst das Playbook auch jederzeit in Deinem Kundenbereich herunterladen.
              </p>
            </Card>

            <Card>
              <h3 className="text-h4 mb-2">Gibt es Updates?</h3>
              <p className="text-brand-secondary">
                Ja! Bei neuen Versionen oder Erweiterungen erhältst Du kostenlose Updates und wirst per E-Mail benachrichtigt.
              </p>
            </Card>
          </div>
        </div>
      </section>


    </>
  );
}
