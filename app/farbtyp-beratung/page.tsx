import Link from 'next/link';
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Farbtyp-Beratung - Finde deine perfekten Farben | Businessstylist',
  description: 'Entdecke deinen Farbtyp und erfahre, welche Farben dich strahlen lassen. Professionelle Farbberatung für Business-Frauen.',
  keywords: ['Farbtyp-Beratung', 'Farbberatung', 'Farbtyp bestimmen', 'Welcher Farbtyp bin ich'],
  alternates: {
    canonical: '/farbtyp-beratung',
  },
};

export default function FarbtypBeratungPage() {
  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl">
        <h1 className="text-h1 mb-8">Farbtyp-Beratung</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl">
            Jeder Mensch hat Farben, die ihn besonders strahlen lassen. Eine Farbtyp-Beratung
            hilft dir, deine perfekte Farbpalette zu finden.
          </p>

          <h2>Die vier Farbtypen</h2>
          <p>
            Die klassische Farbtyp-Lehre unterscheidet vier Haupttypen, benannt nach den Jahreszeiten:
          </p>

          <h3>Frühlingstyp</h3>
          <p>
            Warme, helle Farben wie Pfirsich, Koralle, warmes Gelb und helles Grün stehen dem Frühlingstyp besonders gut.
          </p>

          <h3>Sommertyp</h3>
          <p>
            Kühle, gedämpfte Farben wie Rosé, Lavendel, kühles Blau und Grau harmonieren perfekt mit dem Sommertyp.
          </p>

          <h3>Herbsttyp</h3>
          <p>
            Warme, erdige Farben wie Rostrot, Olivgrün, Senfgelb und Schokoladenbraun lassen den Herbsttyp strahlen.
          </p>

          <h3>Wintertyp</h3>
          <p>
            Klare, kühle Farben wie Reinweiß, Schwarz, kräftiges Blau und Pink betonen die Schönheit des Wintertyps.
          </p>

          <p className="text-sm text-brand-secondary mt-8 border-t pt-4">
            TODO: Detaillierte Beschreibungen aller Farbtypen, Beispielbilder, Styling-Tipps und
            Farbtabellen ergänzen. Content von businessstylist.de übernehmen.
          </p>
        </div>

        <div className="mt-12 p-8 bg-business-cream rounded-2xl">
          <h3 className="text-h3 mb-4">Finde deinen Farbtyp</h3>
          <p className="mb-6">
            Mit unserer kostenlosen Typenanalyse erfährst du, welcher Farbtyp du bist und
            welche Farben dich am besten zur Geltung bringen.
          </p>
          <Link href="/typenanalyse">
            <Button>Kostenlose Typenanalyse starten</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
