import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/auth/middleware';
import Link from 'next/link';
import Card from '@/components/ui/Card';

export default async function AccountPage() {
  const session = await requireAuth();

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-h1 mb-2">Willkommen, {session.user.name || session.user.email}!</h1>
          <p className="text-brand-secondary">Verwalte deine Käufe, Lookbooks und Einstellungen</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/account/orders">
            <Card hover>
              <h3 className="text-h3 mb-2">Bestellungen</h3>
              <p className="text-brand-secondary">Übersicht deiner Käufe und Rechnungen</p>
            </Card>
          </Link>

          <Link href="/account/lookbooks">
            <Card hover>
              <h3 className="text-h3 mb-2">Meine Lookbooks</h3>
              <p className="text-brand-secondary">Zugriff auf deine persönlichen Lookbooks</p>
            </Card>
          </Link>

          <Link href="/account/downloads">
            <Card hover>
              <h3 className="text-h3 mb-2">Downloads</h3>
              <p className="text-brand-secondary">Ebooks und digitale Produkte</p>
            </Card>
          </Link>

          <Link href="/account/typenanalyse">
            <Card hover>
              <h3 className="text-h3 mb-2">Typenanalyse</h3>
              <p className="text-brand-secondary">Deine gespeicherten Ergebnisse</p>
            </Card>
          </Link>

          <Link href="/account/messages">
            <Card hover>
              <h3 className="text-h3 mb-2">Nachrichten</h3>
              <p className="text-brand-secondary">Nachrichten von deinem Stylist</p>
            </Card>
          </Link>

          <Link href="/account/profile">
            <Card hover>
              <h3 className="text-h3 mb-2">Profil</h3>
              <p className="text-brand-secondary">Einstellungen und Datenschutz</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
