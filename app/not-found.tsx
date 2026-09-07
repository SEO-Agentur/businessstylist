import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="page-section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container-custom text-center">
        <p className="page-eyebrow">404</p>
        <h1 className="page-title" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}>
          Seite nicht gefunden
        </h1>
        <p className="page-lede mx-auto" style={{ marginBottom: '32px' }}>
          Diese Seite existiert leider nicht oder wurde verschoben.
          Vielleicht findest du gesucht über das Menü oder direkt auf der Startseite.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" variant="primary">Zur Startseite</Button>
          </Link>
          <Link href="/kontakt">
            <Button size="lg" variant="secondary">Kontakt aufnehmen</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
