import { redirect } from 'next/navigation';
import Link from 'next/link';
import { requireAuth } from '@/lib/auth/middleware';
import { prisma } from '@/lib/db/prisma';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { getKibbeTypeInfo } from '@/lib/quiz/scoring';
import { formatDate } from '@/lib/utils/format';

export const metadata = {
  title: 'Meine Typenanalyse | Businessstylist',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AccountTypenanalysePage() {
  const session = await requireAuth();

  // Get latest quiz result
  const quizResult = await prisma.quizResult.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  if (!quizResult) {
    return (
      <div className="section-padding">
        <div className="container-custom max-w-3xl">
          <h1 className="text-h1 mb-8">Meine Typenanalyse</h1>
          <Card className="p-8 text-center">
            <p className="text-brand-secondary mb-6">
              Du hast noch keine Typenanalyse gemacht.
            </p>
            <Link href="/typenanalyse">
              <Button>Jetzt Typenanalyse starten</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  const typeInfo = getKibbeTypeInfo(quizResult.resultType as any);
  const scores = quizResult.scores ? JSON.parse(quizResult.scores) : null;

  // Check if user has lookbook for this type
  const userLookbooks = await prisma.userLookbook.findMany({
    where: { userId: session.user.id },
    include: {
      lookbook: true,
    },
  });

  const typeLookbook = userLookbooks.find(
    (ul) => ul.lookbook.kibbeType === quizResult.resultType
  );

  // Check if there's a lookbook available for purchase
  const availableLookbook = await prisma.lookbook.findFirst({
    where: {
      kibbeType: quizResult.resultType,
      freeForType: false,
    },
  });

  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl">
        <div className="mb-8">
          <Link href="/account" className="text-brand-accent hover:underline text-sm">
            ← Zurück zum Dashboard
          </Link>
        </div>

        <h1 className="text-h1 mb-2">Deine Typenanalyse</h1>
        <p className="text-brand-secondary mb-8">
          Analysiert am {formatDate(quizResult.createdAt)}
        </p>

        <Card className="p-8 mb-8 bg-gradient-to-br from-business-cream to-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {typeInfo.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-h2">{typeInfo.name}</h2>
              <p className="text-brand-secondary">Dein Kibbe-Typ</p>
            </div>
          </div>

          <p className="text-body-lg mb-6">{typeInfo.description}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Deine Merkmale:</h3>
              <ul className="space-y-2">
                {typeInfo.characteristics.map((char, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5"
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
            </div>

            <div>
              <h3 className="font-semibold mb-3">Styling-Keywords:</h3>
              <div className="flex flex-wrap gap-2">
                {typeInfo.styleKeywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-brand-accent bg-opacity-20 text-brand-accent rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {scores && (
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-brand-secondary">
                Deine Scores: D={scores.D?.toFixed(1)} | N={scores.N?.toFixed(1)} | R={scores.R?.toFixed(1)}
                {scores.G ? ` | G=${scores.G?.toFixed(1)}` : ''}
              </p>
            </div>
          )}
        </Card>

        {typeLookbook ? (
          <Card className="p-8">
            <h3 className="text-h3 mb-4">Dein Lookbook</h3>
            <p className="text-brand-secondary mb-6">
              Du hast Zugriff auf das passende Lookbook für deinen Typ!
            </p>
            <Link href="/account/lookbooks">
              <Button>Zu meinen Lookbooks</Button>
            </Link>
          </Card>
        ) : availableLookbook ? (
          <Card className="p-8 bg-gradient-to-br from-brand-accent from-opacity-10 to-white border-2 border-brand-accent">
            <h3 className="text-h3 mb-4">Perfekt auf deinen Typ abgestimmt</h3>
            <p className="text-body-lg mb-6">
              Entdecke dein persönliches Lookbook mit 15+ Outfit-Kombinationen,
              die perfekt zu deinem <strong>{typeInfo.name}</strong>-Typ passen.
            </p>

            <div className="flex items-center gap-4 mb-6">
              <svg className="w-6 h-6 text-brand-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>15+ fertige Outfits für deinen Typ</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <svg className="w-6 h-6 text-brand-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Styling-Guide & Shopping-Liste</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <svg className="w-6 h-6 text-brand-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Sofortiger digitaler Download</span>
            </div>

            <Link href={`/shop/lookbook?type=${quizResult.resultType}`}>
              <Button size="lg">Jetzt Lookbook sichern</Button>
            </Link>
          </Card>
        ) : (
          <Card className="p-8">
            <p className="text-brand-secondary text-center">
              Für deinen Typ sind momentan keine speziellen Lookbooks verfügbar.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
