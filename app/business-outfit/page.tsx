import Link from 'next/link';
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import { METADATA_BASE } from '@/lib/utils/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: 'Business Outfit - Der ultimative Guide für Business-Frauen | Businessstylist',
  description: 'Alles über das perfekte Business Outfit für Frauen: Dresscodes, Styling-Tipps, Outfit-Ideen und mehr.',
  keywords: ['Business Outfit', 'Business Outfit Frau', 'Büro Outfit', 'Business Kleidung Damen'],
  alternates: {
    canonical: '/business-outfit',
  },
};

export default function BusinessOutfitPage() {
  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl">
        <h1 className="text-h1 mb-8">Business Outfit - Der ultimative Guide</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl">
            Das perfekte Business Outfit kombiniert Professionalität mit persönlichem Stil.
            In diesem Guide erfährst du alles über Dresscodes, Must-Haves und Styling-Tipps.
          </p>

          <h2>Die Basics eines Business Outfits</h2>
          <p>
            Ein professionelles Business Outfit besteht aus sorgfältig ausgewählten Basis-Teilen,
            die sich vielfältig kombinieren lassen.
          </p>

          <h3>Must-Have Pieces</h3>
          <ul>
            <li>Klassischer Blazer in Schwarz oder Navy</li>
            <li>Weiße Bluse</li>
            <li>Schwarze Stoffhose</li>
            <li>Bleistiftrock</li>
            <li>Elegante Pumps</li>
          </ul>

          <p className="text-sm text-brand-secondary mt-8 border-t pt-4">
            TODO: Vollständiger SEO-optimierter Artikel mit min. 1000 Wörtern zu Business Outfits.
            Inhalte von businessstylist.de übernehmen und erweitern.
          </p>
        </div>

        <div className="mt-12 p-8 bg-business-cream rounded-2xl">
          <h3 className="text-h3 mb-4">Brauchst du Hilfe bei deinem Business-Look?</h3>
          <p className="mb-6">
            Unsere professionelle Stilberatung hilft dir, den perfekten Business-Look für deinen Alltag zu finden.
          </p>
          <Link href="/stilberatung">
            <Button>Jetzt Stilberatung buchen</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
