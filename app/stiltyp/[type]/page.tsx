import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { getKibbeTypeInfo, KibbeType } from '@/lib/quiz/scoring';

const validTypes = [
  'dramatic',
  'soft-dramatic',
  'flamboyant-natural',
  'natural',
  'soft-natural',
  'dramatic-classic',
  'classic',
  'soft-classic',
  'flamboyant-gamine',
  'gamine',
  'soft-gamine',
  'romantic',
  'theatrical-romantic',
];

const typeMapping: Record<string, KibbeType> = {
  'dramatic': 'DRAMATIC',
  'soft-dramatic': 'SOFT_DRAMATIC',
  'flamboyant-natural': 'FLAMBOYANT_NATURAL',
  'natural': 'NATURAL',
  'soft-natural': 'SOFT_NATURAL',
  'dramatic-classic': 'DRAMATIC_CLASSIC',
  'classic': 'CLASSIC',
  'soft-classic': 'SOFT_CLASSIC',
  'flamboyant-gamine': 'FLAMBOYANT_GAMINE',
  'gamine': 'GAMINE',
  'soft-gamine': 'SOFT_GAMINE',
  'romantic': 'ROMANTIC',
  'theatrical-romantic': 'THEATRICAL_ROMANTIC',
};

export async function generateStaticParams() {
  return validTypes.map((type) => ({
    type,
  }));
}

export async function generateMetadata({ params }: { params: { type: string } }): Promise<Metadata> {
  const type = params.type;
  if (!validTypes.includes(type)) {
    return { title: 'Stiltyp nicht gefunden' };
  }

  const kibbeType = typeMapping[type];
  const typeInfo = getKibbeTypeInfo(kibbeType);

  return {
    title: `${typeInfo.name} - Kibbe Stiltyp Guide | Businessstylist`,
    description: `${typeInfo.description} Entdecke alles über den ${typeInfo.name} Stiltyp: Merkmale, Styling-Tipps und passende Business-Looks.`,
    alternates: {
      canonical: `/stiltyp/${type}`,
    },
  };
}

export default function StiltypPage({ params }: { params: { type: string } }) {
  const type = params.type;

  if (!validTypes.includes(type)) {
    notFound();
  }

  const kibbeType = typeMapping[type];
  const typeInfo = getKibbeTypeInfo(kibbeType);

  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl">
        <div className="mb-8">
          <Link href="/kibbe-body-type-test" className="text-brand-accent hover:underline text-sm">
            ← Zurück zur Typenanalyse
          </Link>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 bg-brand-accent rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {typeInfo.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-h1">{typeInfo.name}</h1>
            <p className="text-brand-secondary">Kibbe Stiltyp Guide</p>
          </div>
        </div>

        <Card className="p-8 mb-8 bg-business-cream">
          <p className="text-body-lg">{typeInfo.description}</p>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h2 className="text-h3 mb-4">Deine Merkmale</h2>
            <ul className="space-y-3">
              {typeInfo.characteristics.map((char, idx) => (
                <li key={idx} className="flex items-start">
                  <svg
                    className="w-5 h-5 text-brand-accent mr-3 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {char}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-h3 mb-4">Styling-Keywords</h2>
            <div className="flex flex-wrap gap-2">
              {typeInfo.styleKeywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-brand-accent bg-opacity-20 text-brand-accent rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-8 mb-8">
          <h2 className="text-h2 mb-6">Styling-Tipps für {typeInfo.name}</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              TODO: Detaillierte Styling-Empfehlungen für {typeInfo.name} hinzufügen:
            </p>
            <ul>
              <li>Schnitte und Silhouetten</li>
              <li>Stoffe und Materialien</li>
              <li>Farben und Muster</li>
              <li>Accessoires</li>
              <li>Business-Outfit-Ideen</li>
              <li>Do&apos;s and Don&apos;ts</li>
            </ul>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 text-center">
            <h3 className="text-h3 mb-4">Finde deinen Typ</h3>
            <p className="text-brand-secondary mb-6">
              Mache jetzt unsere kostenlose Typenanalyse und finde heraus, welcher Stiltyp du bist.
            </p>
            <Link href="/kibbe-body-type-test">
              <Button className="w-full">Typenanalyse starten</Button>
            </Link>
          </Card>

          <Card className="p-6 text-center">
            <h3 className="text-h3 mb-4">Persönliche Stilberatung</h3>
            <p className="text-brand-secondary mb-6">
              Lass dich professionell beraten und erhalte ein individuelles Styling-Konzept.
            </p>
            <Link href="/stilberatung">
              <Button variant="secondary" className="w-full">
                Mehr erfahren
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
