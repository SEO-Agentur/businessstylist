import Link from 'next/link';
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Kostenlose Typberatung nach Kibbe - Finde deinen Stiltyp | Businessstylist',
  description: 'Entdecke deinen individuellen Kibbe Body Type mit unserer kostenlosen Typberatung. Erhalte personalisierte Empfehlungen für deinen perfekten Business-Look.',
  alternates: {
    canonical: '/typenanalyse',
  },
};

export default function TypenanalysePage() {
  return (
    <>
      <section className="section-padding bg-business-cream">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-display-1 font-serif mb-6">
              Finde deinen Kibbe Body Type
            </h1>
            <p className="text-body-lg text-brand-secondary mb-8">
              Deine individuelle Stilberatung beginnt hier. Finde in wenigen Minuten heraus,
              welcher Kibbe-Typ du bist und erhalte personalisierte Empfehlungen für deinen
              perfekten Business-Look.
            </p>
            <Link href="/typenanalyse/start">
              <Button size="lg">Jetzt starten</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-h2 mb-4">So funktioniert deine Typberatung nach Kibbe</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-h3 mb-3">12 Fragen</h3>
              <p className="text-brand-secondary">
                Beantworte kurze Fragen zu deinem Stil, deinen Vorlieben und deinem Alltag
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-h3 mb-3">Sofort Ergebnis</h3>
              <p className="text-brand-secondary">
                Erfahre direkt, welcher Stiltyp zu dir passt und was das bedeutet
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-h3 mb-3">Persönliche Tipps</h3>
              <p className="text-brand-secondary">
                Bekomme konkrete Styling-Tipps und Outfit-Empfehlungen für deinen Typ
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-business-navy to-business-darkNavy text-white">
        <div className="container-custom text-center">
          <h2 className="text-h2 mb-6">Bereit, deinen Stiltyp zu entdecken?</h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
            Die Analyse dauert nur 5 Minuten und ist völlig kostenlos
          </p>
          <Link href="/typenanalyse/start">
            <Button size="lg" variant="accent">Analyse starten</Button>
          </Link>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-h1 font-serif mb-4">Was ist das Kibbe-System?</h2>
            <p className="text-body-lg text-brand-secondary max-w-3xl mx-auto">
              Eine revolutionäre Methode zur Stilfindung, die seit den 1980er Jahren weltweit angewendet wird
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-white">
              <div className="mb-6">
                <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-h3 mb-4">Ganzheitliche Stilberatung</h3>
                <p className="text-brand-secondary leading-relaxed">
                  David Kibbe entwickelte ein System, das nicht nur den Körperbau betrachtet, sondern auch
                  <strong className="text-brand-primary"> Energie, Bewegung und Gesichtszüge</strong> einbezieht.
                  Es geht um das Zusammenspiel von <strong>Yin und Yang</strong> in deinem Erscheinungsbild.
                </p>
              </div>
            </Card>

            <Card className="bg-white">
              <div className="mb-6">
                <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-h3 mb-4">Warum ist es so wertvoll?</h3>
                <p className="text-brand-secondary leading-relaxed">
                  Du <strong className="text-brand-primary">vermeidest Fehlkäufe</strong>, kaschierst nicht,
                  sondern betonst deine natürlichen Linien. Diese Stilberatung verhilft dir zu mehr
                  <strong> Selbstbewusstsein und Klarheit</strong> über deinen individuellen Stil.
                </p>
              </div>
            </Card>
          </div>

          <div className="bg-gradient-to-br from-business-cream to-white rounded-2xl p-8 md:p-12 mb-16">
            <div className="text-center mb-10">
              <h3 className="text-h2 font-serif mb-4">Die 13 Kibbe Body Types</h3>
              <p className="text-brand-secondary max-w-2xl mx-auto">
                Basierend auf 5 Grundtypen, die durch Yin- und Yang-Anteile sowie weiche oder harte Linien unterteilt werden
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-brand-primary mb-3 text-center">Dramatic</h4>
                <ul className="space-y-2 text-sm text-brand-secondary">
                  <li className="flex items-start">
                    <span className="text-brand-accent mr-2">•</span>
                    <span>Dramatic</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-accent mr-2">•</span>
                    <span>Soft Dramatic</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-brand-primary mb-3 text-center">Natural</h4>
                <ul className="space-y-2 text-sm text-brand-secondary">
                  <li className="flex items-start">
                    <span className="text-brand-accent mr-2">•</span>
                    <span>Flamboyant Natural</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-accent mr-2">•</span>
                    <span>Soft Natural</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-brand-primary mb-3 text-center">Classic</h4>
                <ul className="space-y-2 text-sm text-brand-secondary">
                  <li className="flex items-start">
                    <span className="text-brand-accent mr-2">•</span>
                    <span>Dramatic Classic</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-accent mr-2">•</span>
                    <span>Soft Classic</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-accent mr-2">•</span>
                    <span>Classic</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-brand-primary mb-3 text-center">Gamine</h4>
                <ul className="space-y-2 text-sm text-brand-secondary">
                  <li className="flex items-start">
                    <span className="text-brand-accent mr-2">•</span>
                    <span>Flamboyant Gamine</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-accent mr-2">•</span>
                    <span>Soft Gamine</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-accent mr-2">•</span>
                    <span>Gamine</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-brand-primary mb-3 text-center">Romantic</h4>
                <ul className="space-y-2 text-sm text-brand-secondary">
                  <li className="flex items-start">
                    <span className="text-brand-accent mr-2">•</span>
                    <span>Theatrical Romantic</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-accent mr-2">•</span>
                    <span>Romantic</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-center text-brand-secondary mt-8">
              Jeder Typ hat spezifische <strong>Schnitte, Silhouetten</strong> und bevorzugte <strong>Materialien</strong> wie Seide oder Kaschmir
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-business-cream">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-serif mb-4">Verstehe deinen Körpertyp</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-sm">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-business-cream rounded-lg flex items-center justify-center text-2xl mr-4 flex-shrink-0">
                  ☯️
                </div>
                <div>
                  <h3 className="text-h4 mb-2">Yin & Yang Energien</h3>
                  <p className="text-brand-secondary text-sm leading-relaxed">
                    <strong className="text-brand-primary">Yin</strong> steht für das Feminin-weiche,
                    <strong className="text-brand-primary"> Yang</strong> für das Markant-harte.
                    Dein Körperbau, deine Knochenstruktur und Gesichtszüge verraten, wie diese Energien bei dir wirken.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-sm">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-business-cream rounded-lg flex items-center justify-center text-2xl mr-4 flex-shrink-0">
                  📏
                </div>
                <div>
                  <h3 className="text-h4 mb-2">Struktur statt Größe</h3>
                  <p className="text-brand-secondary text-sm leading-relaxed">
                    Entscheidend ist nicht dein Gewicht, sondern deine <strong className="text-brand-primary">Struktur</strong>:
                    Schulterbreite, Taille, Körperform, vertikale Linien. Diese Faktoren bestimmen deinen idealen Kleidungsstil.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <div className="text-4xl mb-4">👗</div>
              <h4 className="text-h4 mb-2">Passende Styles</h4>
              <p className="text-sm text-brand-secondary">
                Jeder Kibbe-Typ hat typische Styles: von theatralisch-extravagant bis zu natürlich-lässig
              </p>
            </Card>

            <Card className="text-center">
              <div className="text-4xl mb-4">👜</div>
              <h4 className="text-h4 mb-2">Capsule Wardrobe</h4>
              <p className="text-sm text-brand-secondary">
                Kombinierbare Outfits für Business, Freizeit und Events – auf deinen Typ abgestimmt
              </p>
            </Card>

            <Card className="text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h4 className="text-h4 mb-2">Mit Farbberatung</h4>
              <p className="text-sm text-brand-secondary">
                Ergänze deine Stilberatung mit Farbberatung für einen harmonischen Gesamtlook
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-serif mb-4">Häufig gestellte Fragen</h2>
            <p className="text-brand-secondary">Alles, was du über das Kibbe-System wissen musst</p>
          </div>

          <div className="space-y-4">
            <details className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
              <summary className="cursor-pointer p-6 font-semibold text-brand-primary flex justify-between items-center">
                <span>Was unterscheidet das Kibbe-System von anderen Stilrichtungen?</span>
                <span className="text-brand-accent group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-brand-secondary">
                Es berücksichtigt nicht nur Körperform, sondern auch Energie und Gesichtszüge. Das Kibbe-System bietet
                eine ganzheitliche Sichtweise auf deinen persönlichen Stil.
              </div>
            </details>

            <details className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
              <summary className="cursor-pointer p-6 font-semibold text-brand-primary flex justify-between items-center">
                <span>Wie finde ich meinen Kibbe Bodytype?</span>
                <span className="text-brand-accent group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-brand-secondary">
                Nutze unser Online-Formular oben auf dieser Seite. Nach dem Ausfüllen erhältst du deinen individuellen
                Kibbe-Typ mit detaillierten Empfehlungen.
              </div>
            </details>

            <details className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
              <summary className="cursor-pointer p-6 font-semibold text-brand-primary flex justify-between items-center">
                <span>Ist mein Gewicht wichtig für meinen Kibbe Typ?</span>
                <span className="text-brand-accent group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-brand-secondary">
                Nein, entscheidend ist deine Knochenstruktur und Silhouette. Das Kibbe-System fokussiert sich auf
                deine natürliche Struktur, nicht auf dein aktuelles Gewicht.
              </div>
            </details>

            <details className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
              <summary className="cursor-pointer p-6 font-semibold text-brand-primary flex justify-between items-center">
                <span>Wie viele Kibbe-Typen gibt es?</span>
                <span className="text-brand-accent group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-brand-secondary">
                Insgesamt 13 verschiedene Typen, basierend auf 5 Grundtypen: Dramatic, Natural, Classic, Gamine und Romantic.
              </div>
            </details>

            <details className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
              <summary className="cursor-pointer p-6 font-semibold text-brand-primary flex justify-between items-center">
                <span>Was ist eine Capsule Wardrobe?</span>
                <span className="text-brand-accent group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-brand-secondary">
                Eine kombinierbare Garderobe aus wenigen, perfekt passenden Kleidungsstücken. Alle Teile harmonieren
                miteinander und passen zu deinem individuellen Stiltyp.
              </div>
            </details>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-business-cream to-white">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <h2 className="text-h2 font-serif mb-6 text-center">Zusammenfassung</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <span className="text-brand-accent text-xl mr-3 mt-1">✓</span>
                <p className="text-brand-secondary">Kibbe ist eine ganzheitliche Stilfindung</p>
              </div>
              <div className="flex items-start">
                <span className="text-brand-accent text-xl mr-3 mt-1">✓</span>
                <p className="text-brand-secondary">13 individuelle Typen für perfekte Garderobe</p>
              </div>
              <div className="flex items-start">
                <span className="text-brand-accent text-xl mr-3 mt-1">✓</span>
                <p className="text-brand-secondary">Basiert auf Yin/Yang-Balance und Struktur</p>
              </div>
              <div className="flex items-start">
                <span className="text-brand-accent text-xl mr-3 mt-1">✓</span>
                <p className="text-brand-secondary">Einfaches Online-Formular zur Typbestimmung</p>
              </div>
              <div className="flex items-start">
                <span className="text-brand-accent text-xl mr-3 mt-1">✓</span>
                <p className="text-brand-secondary">Kombinierbar mit Farbberatung</p>
              </div>
              <div className="flex items-start">
                <span className="text-brand-accent text-xl mr-3 mt-1">✓</span>
                <p className="text-brand-secondary">Perfekt für Capsule Wardrobe Planung</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-h2 mb-6">Jetzt starten – Entdecke deinen Kibbe Typ!</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Trage dich jetzt ein und finde deinen Kibbe Bodytype heraus! Unser interaktives Formular
            analysiert deine Gesichtszüge, deine Knochenstruktur und deinen Körperbau – kostenlos und
            ohne Verpflichtung.
          </p>
          <Link href="/typenanalyse/start">
            <Button size="lg" variant="accent">Kostenlose Analyse starten</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
