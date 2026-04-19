import Link from 'next/link';
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Analyse abgeschlossen | Businessstylist',
  robots: {
    index: false,
    follow: false,
  },
};

export default function QuizSuccessPage() {
  return (
    <div className="min-h-screen section-padding bg-business-cream flex items-center">
      <div className="container-custom max-w-2xl">
        <Card className="p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-h1 mb-4">Geschafft!</h1>

          <p className="text-body-lg text-brand-secondary mb-6">
            Wir haben dir dein Passwort und dein persönliches Typenanalyse-Ergebnis per E-Mail gesendet.
          </p>

          <div className="bg-brand-light p-6 rounded-lg mb-8">
            <h3 className="font-semibold mb-2">Was jetzt?</h3>
            <ol className="text-left space-y-2 text-brand-secondary">
              <li>1. Überprüfe dein E-Mail-Postfach</li>
              <li>2. Melde dich mit deinen Zugangsdaten an</li>
              <li>3. Entdecke dein detailliertes Ergebnis im Dashboard</li>
            </ol>
          </div>

          <Link href="/auth/signin">
            <Button size="lg">Jetzt anmelden</Button>
          </Link>

          <p className="text-sm text-brand-secondary mt-6">
            Keine E-Mail erhalten? Schau auch in deinem Spam-Ordner nach oder{' '}
            <Link href="/kontakt" className="text-brand-accent hover:underline">
              kontaktiere uns
            </Link>
            .
          </p>
        </Card>
      </div>
    </div>
  );
}
