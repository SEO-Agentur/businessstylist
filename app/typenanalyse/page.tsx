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

      <section className="section-padding bg-business-cream">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none bg-white p-8 md:p-12 rounded-xl shadow-card">
            <h2>Was ist das Kibbe-System? Eine kurze Einführung</h2>
            <p>
              David Kibbe entwickelte in den 1980er Jahren ein revolutionäres System zur Stilberatung,
              das nicht nur den Körperbau, sondern auch Energie, Bewegung und Gesichtszüge einbezieht.
              Das Kibbe-System unterscheidet sich klar von herkömmlicher Typberatung: Statt nur Proportionen
              zu messen, geht es um das Zusammenspiel von <strong>Yin und Yang</strong> in deinem Erscheinungsbild.
            </p>
            <p>
              Mit <strong>13 Kibbe Types</strong>, darunter &quot;Dramatic&quot;, &quot;Romantic&quot; oder
              &quot;Soft Natural&quot;, bietet das System eine ganzheitliche Sichtweise auf deinen Stil.
              Dieses Kibbe System wird von modernen Stylisten und Fashion-Coaches weltweit angewendet.
            </p>

            <h2>Warum ist eine Kibbe Typberatung so wertvoll?</h2>
            <p>
              Wer seinen <strong>Kibbe Body Type</strong> kennt, kann Kleidung gezielt auswählen. Du vermeidest
              Fehlkäufe, kaschierst nicht, sondern betonst deine natürlichen Linien und entwickelst deinen ganz
              eigenen Look. Diese <strong>Stilberatung</strong> verhilft dir zu mehr Selbstbewusstsein und Klarheit
              über deinen Stiltypen.
            </p>

            <h2>Die 13 Kibbe Body Types im Überblick</h2>
            <p>
              Das Kibbe-System basiert auf fünf Grundtypen: Dramatic, Natural, Classic, Gamin und Romantic.
              Diese werden durch Yin- und Yang-Anteile sowie weiche oder harte Linien weiter unterteilt:
            </p>
            <ul>
              <li>Dramatic</li>
              <li>Soft Dramatic</li>
              <li>Flamboyant Natural</li>
              <li>Soft Natural</li>
              <li>Dramatic Classic</li>
              <li>Soft Classic</li>
              <li>Classic</li>
              <li>Flamboyant Gamine</li>
              <li>Soft Gamine</li>
              <li>Gamine</li>
              <li>Theatrical Romantic</li>
              <li>Romantic</li>
            </ul>
            <p>
              Jeder Typ hat spezifische <strong>Schnitte</strong>, <strong>Silhouetten</strong> und bevorzugte
              <strong>Materialien</strong> wie Seide oder Kaschmir.
            </p>

            <h2>Körpertyp erkennen: Warum Struktur wichtiger ist als Größe</h2>
            <p>
              Im Kibbe-System steht &quot;Yin&quot; für das Feminin-weiche, &quot;Yang&quot; für das Markant-harte.
              Dein <strong>Körperbau</strong>, deine <strong>Knochenstruktur</strong> und <strong>Gesichtszüge</strong>
              verraten, wie diese Energien bei dir wirken. Bist du eher zierlich, rundlich, eckig oder ausgewogen?
              Besonders kleine Frauen profitieren oft von einer gezielten Typberatung, die ihre Proportionen optimal betont.
            </p>

            <h2>Body Type verstehen: Knochenstruktur und Silhouette analysieren</h2>
            <p>
              Entscheidend für deinen Kibbe-Typ ist nicht dein Gewicht, sondern deine Struktur: Schulterbreite,
              Taille, Körperform, vertikale Linien. Ist deine Silhouette kurvig, schlank, geometrisch oder eine
              Mischform? Diese Faktoren bestimmen deinen idealen Kleidungsstil.
            </p>

            <h2>Kibbe Body Types und passendes Styling</h2>
            <p>
              Jeder Kibbe-Typ hat typische Styles: Ein <strong>Soft Dramatic</strong> verträgt theatralisch-extravagante
              Schnitte, während ein <strong>Classic Kibbe</strong> mit ausgewogenem, klarem Stil brilliert. Ein
              <strong>Flamboyant Natural</strong> lebt von natürlichen Linien und lässigen Looks, ein
              <strong>Theatrical Romantic</strong> von verspielten Details und betonter Weiblichkeit.
            </p>

            <h2>Outfitplanung nach Kibbe: So sieht deine Capsule Wardrobe aus</h2>
            <p>
              Basierend auf deinem Kibbe Bodytype erstellen wir eine auf dich abgestimmte <strong>Capsule Wardrobe</strong>:
              Kombinierbare Outfits für Business, Freizeit und Events. Vom Blazer über feminine Kleiderwahl bis zu passenden
              Accessoires. Immer stimmig, nie beliebig – und auf deinen Körpertypen abgestimmt.
            </p>

            <h2>Stilberatung trifft Farbberatung: Das perfekte Zusammenspiel</h2>
            <p>
              Ergänze deine Kibbe Stilberatung mit einer <strong>Farbberatung</strong>. So kannst du nicht nur die perfekten
              Kleidungsstücke, sondern auch die besten Farbkombinationen für deinen Farbtyp entdecken. Der Effekt?
              Dein Stil wirkt wie aus einem Guss – stilvoll, harmonisch und persönlich.
            </p>

            <div className="bg-business-cream p-6 rounded-xl my-8">
              <h3 className="text-h3 mb-4">Häufig gestellte Fragen</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Was unterscheidet das Kibbe-System von anderen Stilrichtungen?</h4>
                  <p className="text-sm text-brand-secondary">
                    Es berücksichtigt nicht nur Körperform, sondern auch Energie und Gesichtszüge.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Wie finde ich meinen Kibbe Bodytype?</h4>
                  <p className="text-sm text-brand-secondary">
                    Nutze unser Online-Formular und erhalte deinen Typ als PDF.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Ist mein Gewicht wichtig für meinen Kibbe Typ?</h4>
                  <p className="text-sm text-brand-secondary">
                    Nein, entscheidend ist deine Knochenstruktur und Silhouette.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Wie viele Kibbe-Typen gibt es?</h4>
                  <p className="text-sm text-brand-secondary">
                    Insgesamt 13, basierend auf 5 Grundtypen.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Was ist eine Capsule Wardrobe?</h4>
                  <p className="text-sm text-brand-secondary">
                    Eine kombinierbare Garderobe aus wenigen, perfekt passenden Kleidungsstücken.
                  </p>
                </div>
              </div>
            </div>

            <h2>Zusammenfassung – Das Wichtigste auf einen Blick</h2>
            <ul>
              <li>Kibbe ist mehr als eine Körpertypberatung: Es ist eine ganzheitliche Stilfindung</li>
              <li>13 Kibbe Types bieten für jede Frau einen individuellen Weg zur perfekten Garderobe</li>
              <li>Dein Typ basiert auf Yin/Yang-Balance, Knochenstruktur und Silhouette</li>
              <li>Die Typberatung erfolgt über ein einfaches Online-Formular</li>
              <li>Kombinierbar mit Farbberatung für einen runden Auftritt</li>
              <li>Ideal für alle, die ihren persönlichen Stil leben wollen</li>
              <li>Besonders hilfreich bei der Planung einer Capsule Wardrobe</li>
            </ul>
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
