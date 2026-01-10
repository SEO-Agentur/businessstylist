import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt | Businessstylist',
  description: 'Kontaktiere uns für eine persönliche Stilberatung oder bei Fragen zu unseren Services.',
  alternates: {
    canonical: '/kontakt',
  },
};

export default function KontaktPage() {
  return (
    <div className="section-padding">
      <div className="container-custom max-w-3xl">
        <h1 className="text-h1 mb-8">Kontakt</h1>

        <div className="prose prose-lg max-w-none">
          <p>
            Hast du Fragen zu unseren Services oder möchtest eine persönliche Beratung buchen?
            Wir freuen uns auf deine Nachricht!
          </p>

          <h2>Kontaktmöglichkeiten</h2>
          <p>
            E-Mail: kontakt@businessstylist.de<br />
            Telefon: +49 (0) XXX XXXXXXX
          </p>

          <p className="text-sm text-brand-secondary mt-8">
            TODO: Kontaktformular implementieren und echte Kontaktdaten von businessstylist.de einfügen
          </p>
        </div>
      </div>
    </div>
  );
}
