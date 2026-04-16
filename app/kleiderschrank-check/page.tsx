'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { formatPrice } from '@/lib/utils/format';
import { useCart } from '@/lib/context/CartContext';

export default function KleiderschrankCheckPage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  const handleBookNow = () => {
    setIsAdding(true);
    addToCart({
      id: 'kleiderschrank-check',
      name: 'Kleiderschrank Check',
      price: 179,
      type: 'Service',
    });
    setTimeout(() => {
      router.push('/checkout');
    }, 300);
  };

  const sections = [
    {
      title: 'Was ist ein Kleiderschrank-Check?',
      content: 'Ein professioneller Kleiderschrank-Check ist weit mehr als Aufräumen. Gemeinsam analysieren wir Deinen Kleiderschrank systematisch: Welche Teile sind vorhanden, welche werden getragen, welche sind ungeliebt? Ziel ist es, Deine Garderobe bewusst wahrzunehmen und neu zu bewerten. Der Kleiderschrank-Check schafft eine klare Grundlage für Deinen Stil. Statt Chaos entsteht Klarheit – Du erkennst sofort, welche Kleidungsstücke bleiben dürfen und welche Dich eher ausbremsen.',
    },
    {
      title: 'Dein Kleiderschrank als Spiegel Deiner Persönlichkeit',
      content: 'Dein Kleiderschrank erzählt viel über Deine Persönlichkeit, Deinen Alltag und Deine Bedürfnisse. Oft hängen dort Teile für einen Lebensstil, den es so nicht mehr gibt. Der Check hilft, diese Diskrepanz aufzulösen. Wir schauen wertfrei und strukturiert: Was passt noch zu Dir, was unterstreicht Dich authentisch? So wird aus einem zufälligen Sammelsurium wieder eine stimmige Garderobe.',
    },
    {
      title: 'Ordnung im Schrank – systematisch & nachhaltig',
      content: 'Ordnung entsteht nicht durch radikales Wegwerfen, sondern durch sortieren mit System. Beim Kleiderschrank-Check strukturieren wir Deinen Schrank nach Funktion, Anlass und Kombinierbarkeit. Das Ergebnis: mehr Überblick, schnellere Entscheidungen beim Anziehen und eine Grundgarderobe, die wirklich funktioniert – statt täglicher Überforderung.',
    },
    {
      title: 'Stilberatung & Typberatung direkt am Kleiderschrank',
      content: 'Der große Vorteil: Die Stilberatung findet direkt mit Deiner vorhandenen Garderobe statt. Wir verbinden den Kleiderschrank-Check mit einer kompakten Typberatung, abgestimmt auf Figur-Typ, Alltag und Wirkung. Du lernst, warum bestimmte Schnitte Dich unterstützen – und andere nicht. So wird Dein Stil stilsicher und nachvollziehbar.',
    },
    {
      title: 'Farbberatung, Farbtyp & Proportion',
      content: 'Farben entscheiden über Ausstrahlung. Eine gezielte Farbberatung im Rahmen des Kleiderschrank-Checks zeigt, welche Teile farblich harmonieren und Deinen Farbtyp unterstützen. Auch Proportion spielt eine Rolle: Eine Jacke, eine bestimmte Länge oder Linienführung können viel verändern. Ziel ist eine typgerechte Wirkung – ohne neu einkaufen zu müssen.',
    },
    {
      title: 'Neue Looks aus vorhandenen Kleidungsstücken',
      content: 'Einer der größten Aha-Momente: neue Looks entstehen fast immer aus dem, was schon da ist. Wir kombinieren Teile neu und zeigen Dir neue Kombinationsmöglichkeiten. So entstehen neue Outfits, kreative Outfitkombinationen und echte Inspiration – ganz ohne Shopping-Stress.',
    },
    {
      title: 'Fehlkäufe vermeiden & gezielt ergänzen',
      content: 'Nach dem Kleiderschrank-Check weißt Du genau, was fehlt – und was nicht. Das schützt vor Fehlkäufen und unnötigen Spontankäufen. Du erhältst eine klare Empfehlung für eine sinnvolle Ergänzung Deiner Garderobe sowie eine konkrete Einkaufsliste. Auf Wunsch kann später auch Personal Shopping anschließen.',
    },
    {
      title: 'Outfits für jeden Anlass zusammenstellen',
      content: 'Ob Business, Freizeit oder besonderer Anlass: Wir stellen zusammen, was Du brauchst. Du lernst, Outfits zusammenstellen, die funktionieren und sich gut fühlen. Das steigert nicht nur Deine Sicherheit, sondern auch die Freude beim Anziehen – jeden Tag.',
    },
    {
      title: 'Online möglich – flexibel & effizient',
      content: 'Der Kleiderschrank-Check ist auch online möglich. Per Video-Session begleiten wir Dich Schritt für Schritt durch Deine Kleiderschränke. Du wählst aus, wir geben Feedback, zeigen Kombinationen und dokumentieren Ergebnisse digital – ideal, wenn Du wenig Zeit hast.',
    },
    {
      title: 'Mehr Freude, Klarheit & Leichtigkeit',
      content: 'Am Ende steht nicht nur ein aufgeräumter Kleiderschrank, sondern ein neues Gefühl: mehr Freude, mehr Sicherheit und ein Stil, der Dich im Alltag unterstützt. Du weißt, was Du tragen möchtest, wie Du Dich stylen kannst und welche Accessoires, Make-up-Akzente oder Details Deinen Look unterstreichen.',
    },
  ];

  return (
    <>
      <section className="relative section-padding overflow-hidden bg-gradient-to-br from-business-navy via-business-darkNavy to-business-charcoal min-h-[80vh] flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-business-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-accent rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-block px-4 py-2 bg-brand-accent rounded-full text-sm font-semibold mb-6">
              1:1 Kleiderschrank-Check & Typberatung
            </div>

            <h1 className="text-display-2 font-serif mb-6">
              Dein Kleiderschrank,<br />Dein Stil, Deine Klarheit
            </h1>

            <p className="text-xl md:text-2xl mb-4 leading-relaxed opacity-90">
              Strukturiert · wertschätzend · systematisch
            </p>

            <p className="text-lg mb-8 leading-relaxed max-w-3xl mx-auto">
              Ein überfüllter Kleiderschrank und trotzdem nichts zum Anziehen? Der professionelle Kleiderschrank-Check bringt Ordnung, System und neue Freude in Deine tägliche Outfit-Wahl.
            </p>

            <div className="mb-8">
              <div className="inline-flex items-baseline gap-2">
                <span className="text-6xl font-bold text-business-gold">{formatPrice(179)}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-4xl mx-auto mb-10 text-left">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-business-gold flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Analyse Deiner Garderobe</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-business-gold flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Aussortieren von Ballast</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-business-gold flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Neue Outfit-Ideen</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-business-gold flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Typ- & Farbberatung</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-business-gold flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Konkrete Empfehlung</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleBookNow}
                size="lg"
                variant="accent"
                className="text-lg px-8 py-4"
                disabled={isAdding}
              >
                {isAdding ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Wird hinzugefügt...
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Kleiderschrank-Check jetzt buchen
                  </>
                )}
              </Button>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                <a href="#details">Mehr erfahren</a>
              </Button>
            </div>

            <p className="text-sm mt-8 opacity-75">
              90 Min Online-Call · Bestehende Teile neu stylen · Kein Kaufdruck · Passform-Tipps
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white" id="details">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-h1 mb-4">Typberatung & Struktur für Deine Garderobe</h2>
            <p className="text-body-lg text-brand-secondary max-w-3xl mx-auto">
              Diese Seite lohnt sich für Dich, wenn Du Deinen Kleiderschrank strategisch angehen möchtest – nachhaltig, typgerecht und ohne Fehlkäufe.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                ),
                title: 'Strukturiert',
                description: 'Systematische Analyse nach Funktion, Anlass und Kombinierbarkeit',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: 'Wertschätzend',
                description: 'Wertfreie Betrachtung – was passt authentisch zu Dir',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Nachhaltig',
                description: 'Mehr aus Vorhandenem herausholen statt unnötig neu kaufen',
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center">
                <div className="flex justify-center mb-4 text-brand-accent">
                  {feature.icon}
                </div>
                <h3 className="text-h3 mb-3">{feature.title}</h3>
                <p className="text-brand-secondary">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-light">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-h1 mb-4">Inhaltsübersicht</h2>
            <p className="text-body-lg text-brand-secondary">
              Was Dich beim Kleiderschrank-Check erwartet
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <Card key={index} hover>
                <h3 className="text-h3 mb-3">{section.title}</h3>
                <p className="text-brand-secondary leading-relaxed">{section.content}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <Card className="bg-gradient-to-br from-brand-accent to-business-gold text-white p-12">
            <div className="text-center">
              <h2 className="text-h1 mb-6">Dein Ergebnis auf einen Blick</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-10 text-left">
                {[
                  'Strukturierter Kleiderschrank statt Chaos',
                  'Klarer Überblick über Deine Garderobe',
                  'Neue Outfit-Ideen ohne Neukauf',
                  'Weniger Ballast, mehr Funktion',
                  'Stilsicher & authentisch auftreten',
                  'Spürbar mehr Freude beim Anziehen',
                ].map((result, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{result}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleBookNow}
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-4"
                disabled={isAdding}
              >
                Jetzt Kleiderschrank-Check für {formatPrice(179)} buchen
              </Button>

              <p className="text-sm mt-6 opacity-90">
                Dein Stil beginnt nicht im Laden – sondern in Deinem Kleiderschrank
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section className="section-padding bg-business-cream">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-h2 mb-4">Noch Fragen?</h2>
          <p className="text-body-lg text-brand-secondary mb-8">
            Wir helfen Dir gerne weiter und beraten Dich zu Deinem persönlichen Stil-Weg
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/kontakt">
              <Button size="lg" variant="secondary">Kontakt aufnehmen</Button>
            </a>
            <a href="/shop">
              <Button size="lg" variant="primary">Alle Services ansehen</Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
