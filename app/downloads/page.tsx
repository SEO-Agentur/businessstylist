import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import ChecklistSignup from '@/components/forms/ChecklistSignup';

export const metadata: Metadata = {
  title: 'Kostenlose Checklisten & Guides | Businessstylist',
  description:
    'Hol dir kostenlose Checklisten zu Smart Casual, Business Attire und Wardrobe Decluttering. Einmal E-Mail eintragen, Checklisten auswählen, fertig.',
  alternates: {
    canonical: '/downloads',
  },
};

export default function DownloadsPage() {
  return (
    <>
      <section className="section-padding bg-business-cream">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-display-1 md:text-display-2 font-serif mb-6">
              Kostenlose Checklisten & Guides
            </h1>
            <p className="text-body-lg text-brand-secondary">
              Drei professionell kuratierte Checklisten für deinen perfekten Business-Look und einen
              aufgeräumten Kleiderschrank. Wähle aus, was du brauchst – wir schicken dir alles per E-Mail.
            </p>
          </div>

          <ChecklistSignup />
        </div>
      </section>

      <section className="section-padding bg-brand-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-h2 mb-6">Brauchst du persönliche Beratung?</h2>
          <p className="text-body-lg mb-8 max-w-2xl mx-auto">
            Die Checklisten sind ein toller Start. Für eine wirklich maßgeschneiderte Stilberatung,
            die perfekt zu dir passt, buche eine persönliche 1:1-Session mit Anika.
          </p>
          <Link href="/stilberatung">
            <Button variant="accent" size="lg">
              Jetzt Stilberatung buchen
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
