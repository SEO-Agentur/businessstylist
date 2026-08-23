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
      <section className="relative overflow-hidden" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="page-eyebrow" style={{ color: 'var(--taupe)' }}>BusinessStylist® Methode</p>
              <h1 className="page-title" style={{ color: 'var(--paper)', fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', marginBottom: '24px' }}>
                Zieh Erfolg an.
              </h1>
              <p className="page-lede" style={{ color: 'rgba(255,255,255,.7)', marginBottom: '32px' }}>
                Die Businesswelt tickt schnell: Ein Blick entscheidet, ob du Partnerin oder Fußnote bist.
                Dein Business-Look ist eine visuelle Kurzbiografie – verfasst in Blazer, Rock oder Anzug.
                Mit System zum stilsicheren Auftritt.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/erster-eindruck">
                  <Button size="lg" variant="accent">Erster Eindruck – kostenlos starten</Button>
                </Link>
                <Link href="/stilberatung">
                  <Button size="lg" variant="secondary">Stilberatung buchen</Button>
                </Link>
              </div>
              <p className="text-sm mt-4 max-w-lg" style={{ color: 'rgba(255,255,255,.5)' }}>
                Ein Blick entscheidet. Finde in 12 Minuten heraus, wie dein Business-Auftritt wirkt.
              </p>
            </div>

            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="/business_stylist.webp"
                  alt="Business-Stylist"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" style={{ background: 'var(--paper)' }}>
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3">
                <span className="page-eyebrow">Signature Service</span>
                <h2 className="page-h2">Business Capsule Wardrobe</h2>
                <p className="page-body mb-4">
                  Die komplette Garderobenstrategie: Anika entwickelt deine individuelle Business-Garderobe
                  mit 25–35 Teilen und 80–100 Outfitkombinationen. Saisonplanung, priorisierte Einkaufsliste
                  und ein 90-Tage-Fahrplan – damit du nie wieder Fehlkäufe machst.
                </p>
                <ul className="grid grid-cols-2 gap-2 mb-6 text-sm page-body">
                  {['Komplette Business-Garderobe', '80–100 Outfitkombinationen', 'Saisonplanung', 'Einkauf nach Plan statt Gefühl', 'Keine Fehlkäufe mehr', 'Persönlich von Anika erstellt'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[var(--taupe)] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/capsule-wardrobe#bestellen">
                  <Button variant="accent" size="lg">
                    Business Capsule Wardrobe für 299,- EUR starten
                  </Button>
                </Link>
              </div>
              <div className="md:col-span-2">
                <div className="page-card text-center">
                  <div className="mb-4">
                    <span className="text-4xl font-light text-[var(--ink)]">299,-</span>
                    <span className="page-body ml-1">EUR</span>
                  </div>
                  <p className="text-sm page-body mb-4">
                    Einmalig. Kein Abo.
                  </p>
                  <div className="space-y-2 text-left text-sm">
                    {['25–35 Teile, 80–100 Kombinationen', 'Saisonplanung & 90-Tage-Fahrplan', 'Priorisierte Einkaufsliste', 'Persönlich von Anika erstellt'].map((step) => (
                      <div key={step} className="flex items-start gap-2 page-body">
                        <span className="w-1 h-1 mt-2 bg-[var(--taupe)] flex-shrink-0" />
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="page-h2">Dein Weg zum sicheren Business Outfit</h2>
            <p className="page-lede mx-auto" style={{ marginBottom: 0 }}>
              Vom Stil-Test bis zur laufenden Stilpflege – dein professioneller Auftritt in vier Schritten
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '1', title: 'Erster Eindruck', text: 'Finde in 12 Minuten heraus, wie dein Business-Auftritt wirkt – mit deinem persönlichen Business First Impression Score™.' },
              { num: '2', title: 'Digitales Lookbook', text: 'Erhalte ein fertiges Lookbook mit Outfit-Vorschlägen, perfekt auf deinen Stiltyp abgestimmt – inklusive Shop-Links für sofort bestellbare Business Outfits.' },
              { num: '3', title: 'Stilberatung', text: 'In der 1:1-Beratung mit Anika bekommst du deine Farb-, Stil- und Garderobenstrategie – auf Wunsch online oder vor Ort, diskret und individuell.' },
              { num: '4', title: 'Laufende Stilpflege', text: 'Mit dem Style-Abo bleibst du saisonal aktuell. Du bekommst neue Looks, Updates für deine Capsule Wardrobe und persönliche Unterstützung bei Fragen.' },
            ].map((item) => (
              <Card key={item.num} hover>
                <div className="w-10 h-10 border border-[var(--stone)] flex items-center justify-center text-[var(--taupe)] text-sm mb-4">
                  {item.num}
                </div>
                <h3 className="page-h3">{item.title}</h3>
                <p className="page-body">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section" style={{ background: 'var(--paper)' }}>
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="page-h2">Warum Du einen Stylisten buchen solltest</h2>
            <p className="page-lede mx-auto" style={{ marginBottom: 0 }}>
              Dein Business-Outfit ist keine Verkleidung, sondern deine visuelle Visitenkarte
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Perfekt gekleidet', text: 'Dein Business-Outfit ist keine Verkleidung, sondern deine visuelle Visitenkarte. Statt Uniform bekommst du maßgeschneiderte Looks, die sofort professionell und stilsicher wirken.' },
              { title: 'Layering-Looks', text: 'Für die kalte Jahreszeit kombinieren wir Cashmere, Wolle und leichte Schichten so, dass dein Outfit luftig wirkt und trotzdem warm hält. Stilsicher und perfekt temperiert.' },
              { title: 'Business-Casual-Check', text: 'Zwischen formell und casual finden wir dein optimales Gleichgewicht. Egal ob Blazer mit Chino oder Bluse mit Loafern – du bleibst modisch, gepflegt und selbstbewusst.' },
              { title: 'Dresscode-Kompass', text: 'Ob streng Business Attire oder lockerer Business Casual – wir knacken jeden Dresscode und definieren deinen persönlichen Rahmen. Du weißt, wann Blazer und wann legerer Chic genügt.' },
              { title: 'Capsule Wardrobe', text: 'Eine zeitlose Auswahl an Essentials sorgt für Komfort und minimalen Entscheidungsstress im Berufsalltag. Jeder Look entsteht aus perfekt aufeinander abgestimmten Teilen.' },
              { title: 'Maßgeschneiderter Look', text: 'Mit individueller Stilberatung und Typanalyse (z. B. Kibbe) findest du deine perfekte Passform. Dein Look wirkt persönlich, ohne sich an vorgefertigte Schablonen zu halten.' },
            ].map((item) => (
              <Card key={item.title}>
                <h3 className="page-h3">{item.title}</h3>
                <p className="page-body">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="page-h2">Meine Leistungen für Dich</h2>
            <p className="page-lede mx-auto" style={{ marginBottom: 0 }}>
              Von der ersten Orientierung bis zur persönlichen 1:1-Beratung
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Kleiderschrank Check', price: '€179', desc: 'Dein Einstieg ins Business-Styling: Wir analysieren deine Garderobe und entwickeln direkt erste Outfit-Ideen.', features: ['Bestehende Teile neu stylen', 'Kein Kaufdruck', 'Passform-Tipps'], link: '/kleiderschrank-check', cta: 'Jetzt Termin buchen' },
              { title: 'Farbberatung', price: '€179', desc: 'Entdecke deine perfekte Farbpalette mit professioneller Farbtyp-Analyse nach der Vier-Jahreszeiten-Methode.', features: ['Farbtyp-Analyse', 'Persönliche Farbpalette', 'Styling-Empfehlungen', 'Make-up & Accessoires-Tipps'], link: '/farbtyp-beratung', cta: 'Farbberatung buchen' },
              { title: 'Stilberatung', price: '€390', desc: 'In 1:1-Sessions entwickle ich mit Dir deinen Business-Look: klar, typgerecht und zukunftsfähig.', features: ['Farb- & Stiltyp Analyse', 'Komplette Outfit-Strategie', 'Figur & Passform', 'Lookbook inkl.'], link: '/stilberatung', cta: 'Stilberatung buchen' },
            ].map((item) => (
              <Card key={item.title} hover>
                <h3 className="page-h3">{item.title}</h3>
                <p className="page-body mb-4">{item.desc}</p>
                <div className="my-6">
                  <span className="text-3xl font-light text-[var(--ink)]">{item.price}</span>
                </div>
                <ul className="space-y-2 mb-6 text-sm page-body">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="w-1 h-1 mt-2 bg-[var(--taupe)] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={item.link}>
                  <Button className="w-full">{item.cta}</Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section" style={{ background: 'var(--paper)' }}>
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square overflow-hidden">
                  <img src="/lookbook.webp" alt="Business Styling" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square overflow-hidden">
                  <a href="/stilberatung" title="Stilberatung">
                    <img src="/stilberatung copy.webp" alt="Stilberatung" className="w-full h-full object-cover" />
                  </a>
                </div>
                <div className="aspect-square overflow-hidden">
                  <img src="/kibbe-body-type-analyse.webp" alt="Kibbe Body Type Analyse" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img src="/streetstyle-blazer.webp" alt="Streetstyle Blazer" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <p className="page-eyebrow">Über mich</p>
              <h2 className="page-h2">Anika Schmitz</h2>
              <p className="page-body mb-6">
                Mit der Ausbildung als Schneiderin und dem anschließenden Studium zur <strong>Diplom-Kostümbildnerin (FH)</strong>
                habe ich meine Grundsteine für meine Karriere gelegt. Neben Etappen bei Film, Fernsehen und Theater
                habe ich über <strong>10 Jahre Erfahrung als Stylistin</strong> sammeln können.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 p-4 border border-[var(--stone-light)]">
                  <span className="w-1 h-1 mt-2 bg-[var(--taupe)] flex-shrink-0" />
                  <div>
                    <p className="text-[var(--ink)] text-sm">7 Jahre bei Zalon by Zalando</p>
                    <p className="page-body text-sm">als Freelance Stylistin mit tausenden betreuten Kunden</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 border border-[var(--stone-light)]">
                  <span className="w-1 h-1 mt-2 bg-[var(--taupe)] flex-shrink-0" />
                  <div>
                    <p className="text-[var(--ink)] text-sm">Freelance Stylistin bei Outfittery</p>
                    <p className="page-body text-sm">Hunderte Kunden bis Juni 2025 betreut</p>
                  </div>
                </div>
              </div>
              <div className="p-6" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
                <p className="text-base mb-2" style={{ color: 'rgba(255,255,255,.8)' }}>
                  Ich unterstütze dich mit Stilberatung, Farbberatung, Capsule-Wardrobe-Konzepten und Kibbe-Typanalyse dabei,
                  eine klare, moderne Business-Garderobe aufzubauen.
                </p>
                <p className="text-xl" style={{ color: 'var(--taupe)' }}>
                  Zieh Erfolg an!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" style={{ background: 'var(--bone)' }}>
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="page-card overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <p className="page-eyebrow">Kostenloser Download</p>
                  <h2 className="page-h2">Smart Casual Checkliste</h2>
                  <p className="page-body mb-6">
                    Hol dir jetzt die <strong>kostenlose Smart Casual Checkliste</strong> mit Do&apos;s & Don&apos;ts,
                    Outfit-Vorschlägen für Damen und Herren sowie Profi-Tipps!
                  </p>
                  <ul className="space-y-3 mb-6 text-sm">
                    {['4-seitiges PDF mit allen Essentials', 'Sofort umsetzbare Tipps', 'Für Damen & Herren'].map((item) => (
                      <li key={item} className="flex items-start gap-2 page-body">
                        <span className="w-1 h-1 mt-2 bg-[var(--taupe)] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href="/downloads" className="page-link">
                    Alle Downloads ansehen →
                  </Link>
                </div>
                <div className="relative p-8 md:p-12 flex items-center justify-center" style={{ background: 'var(--ink)' }}>
                  <img
                    src="/smart-casual-checkliste.webp"
                    alt="Smart Casual Checkliste"
                    className="w-full max-w-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
        <div className="container-custom text-center">
          <h2 className="page-h2" style={{ color: 'var(--paper)' }}>Deine Zukunftsversion, dein Wettbewerbsvorteil</h2>
          <p className="page-lede mx-auto" style={{ color: 'rgba(255,255,255,.7)', marginBottom: '32px' }}>
            Stell dir vor, du betrittst den Raum, alle spüren deine Eleganz, deinen Fokus – bevor du sprichst.
            Das ist Kleidung als strategische Ressource. Ich begleite dich vom ersten Mood-Board bis zum großen Pitch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kibbe-body-type-test">
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
