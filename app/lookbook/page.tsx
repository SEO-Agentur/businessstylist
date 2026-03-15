import Link from 'next/link';
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { formatPrice } from '@/lib/utils/format';

export const metadata: Metadata = {
  title: 'Lookbook - Fertige Business-Outfit-Ideen | Businessstylist',
  description: '15 fertige Business-Outfits als digitales Lookbook. Perfekt für den Einstieg in eine professionelle Garderobe.',
  alternates: {
    canonical: '/lookbook',
  },
};

export default function LookbookPage() {
  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl">
        <h1 className="text-h1 mb-8">Lookbook</h1>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl">
            Dein Einstieg in die perfekte Business-Garderobe: 15 fertige Outfit-Kombinationen
            als digitales Lookbook.
          </p>

          <h2>Was ist im Lookbook enthalten?</h2>
          <ul>
            <li>15 komplett zusammengestellte Business-Outfits</li>
            <li>Visueller Guide mit hochwertigen Bildern</li>
            <li>Shopping-Liste mit allen Teilen</li>
            <li>Styling-Tipps für jeden Look</li>
            <li>Kombinationsmöglichkeiten</li>
          </ul>

          <h2>Für wen ist das Lookbook geeignet?</h2>
          <p>
            Das Lookbook ist perfekt für dich, wenn du:
          </p>
          <ul>
            <li>Neu im Berufsleben bist und eine professionelle Garderobe aufbauen möchtest</li>
            <li>Inspiration für Business-Outfits suchst</li>
            <li>Keine Zeit für aufwendige Stilberatung hast</li>
            <li>Mit einem kleinen Budget starten möchtest</li>
          </ul>
        </div>

        <Card className="p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-h3 mb-2">Lookbook</h3>
              <p className="text-4xl font-bold mb-2">{formatPrice(97)}</p>
              <p className="text-brand-secondary">Einmalige Zahlung, sofortiger Download</p>
            </div>
            <div>
              <Link href="/shop/lookbook">
                <Button size="lg">Jetzt kaufen</Button>
              </Link>
            </div>
          </div>
        </Card>

        <div className="mt-12">
          <h3 className="text-h3 mb-6">Das sagen unsere Kundinnen</h3>
          <Card className="p-6">
            <blockquote className="text-brand-secondary italic mb-4">
              &ldquo;Das Lookbook hat mir den Einstieg in meinen neuen Job so viel leichter gemacht.
              Endlich weiß ich, was ich anziehen soll!&rdquo;
            </blockquote>
            <p className="font-semibold">— Lisa K., Marketing Managerin</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
