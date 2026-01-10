import Link from 'next/link';
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { formatPrice } from '@/lib/utils/format';

export const metadata: Metadata = {
  title: 'Kleiderschrank Check - Optimiere deine Garderobe | Businessstylist',
  description: 'Professioneller Kleiderschrank Check: Ausmisten, neu kombinieren und Lücken füllen. Hole das Maximum aus deiner Garderobe heraus.',
  alternates: {
    canonical: '/kleiderschrank-check',
  },
};

export default function KleiderschrankCheckPage() {
  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl">
        <h1 className="text-h1 mb-8">Kleiderschrank Check</h1>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl">
            Hole das Maximum aus deinem Kleiderschrank heraus: Ausmisten, neu kombinieren
            und gezielt ergänzen.
          </p>

          <h2>Wie läuft der Kleiderschrank Check ab?</h2>
          <ol>
            <li>
              <strong>Vorbereitung:</strong> Du sendest mir Fotos deines Kleiderschranks
            </li>
            <li>
              <strong>Analyse:</strong> Ich bewerte deine Teile und erstelle einen Plan
            </li>
            <li>
              <strong>Persönliches Gespräch:</strong> 60 Minuten Video-Call zur Besprechung
            </li>
            <li>
              <strong>Aussortier-Hilfe:</strong> Klare Empfehlungen, was bleiben kann und was nicht
            </li>
            <li>
              <strong>Neue Kombinationen:</strong> Lookbook mit Outfits aus deinen vorhandenen Teilen
            </li>
            <li>
              <strong>Shopping-Guide:</strong> Liste mit Teilen, die deine Garderobe perfekt ergänzen
            </li>
          </ol>

          <h2>Was bekommst du?</h2>
          <ul>
            <li>60 Minuten persönliches Video-Gespräch</li>
            <li>Individuelle Garderobe-Analyse</li>
            <li>Aussortier-Empfehlungen</li>
            <li>Lookbook mit neuen Kombinationen aus vorhandenen Teilen</li>
            <li>Shopping-Guide zum gezielten Ergänzen</li>
            <li>2 Wochen E-Mail-Support</li>
          </ul>

          <h2>Für wen ist der Kleiderschrank Check geeignet?</h2>
          <p>
            Der Kleiderschrank Check ist perfekt für dich, wenn du:
          </p>
          <ul>
            <li>Viele Kleidungsstücke hast, aber nie etwas zum Anziehen findest</li>
            <li>Ausmisten möchtest, aber unsicher bist, was weg kann</li>
            <li>Neue Kombinationsmöglichkeiten entdecken willst</li>
            <li>Gezielt ergänzen statt wahllos kaufen möchtest</li>
          </ul>
        </div>

        <Card className="p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-h3 mb-2">Kleiderschrank Check</h3>
              <p className="text-4xl font-bold mb-2">{formatPrice(197)}</p>
              <p className="text-brand-secondary">Einmalige Zahlung</p>
            </div>
            <div>
              <Link href="/shop/kleiderschrank-check">
                <Button size="lg">Jetzt buchen</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
