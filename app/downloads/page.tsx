import type { Metadata } from 'next';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import NewsletterSignup from '@/components/forms/NewsletterSignup';

export const metadata: Metadata = {
  title: 'Kostenlose Downloads - Businessstylist',
  description: 'Kostenlose Style-Guides, Checklisten und E-Books für deinen perfekten Business-Look. Smart Casual Checkliste, Dresscode Playbook und mehr.',
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
              Kostenlose Style-Guides & Downloads
            </h1>
            <p className="text-body-lg text-brand-secondary">
              Professionelle Checklisten, E-Books und Guides für deinen perfekten Business-Look.
              Alle kostenlosen Downloads auf einen Blick.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-brand-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                Kostenlos
              </div>

              <div className="aspect-[4/3] bg-business-navy mb-6 rounded-lg overflow-hidden">
                <img
                  src="https://businessstylist.de/wp-content/uploads/2025/12/smart-casual-checkliste.png"
                  alt="Smart Casual Checkliste"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-h3 mb-3">Smart Casual Checkliste</h3>
              <p className="text-brand-secondary mb-4">
                Dein kompletter Guide für den perfekten Smart Casual Look. Mit Do&apos;s & Don&apos;ts,
                Outfit-Vorschlägen für Damen und Herren sowie Profi-Tipps von Anika.
              </p>

              <ul className="space-y-2 mb-6 text-sm text-brand-secondary">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  4-seitiges PDF mit allen Essentials
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Checklisten für Damen & Herren
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Sofort umsetzbare Profi-Tipps
                </li>
              </ul>

              <NewsletterSignup
                leadMagnet="smart-casual"
                title="Jetzt herunterladen"
                description="Trage deine E-Mail ein und erhalte die Checkliste sofort."
                buttonText="Checkliste herunterladen"
              />
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-brand-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                Kostenlos
              </div>

              <div className="aspect-[4/3] bg-business-navy mb-6 rounded-lg flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  <p className="text-lg font-semibold">Dresscode Playbook</p>
                  <p className="text-sm opacity-80 mt-2">Dein ultimativer Guide</p>
                </div>
              </div>

              <h3 className="text-h3 mb-3">Dresscode Playbook</h3>
              <p className="text-brand-secondary mb-4">
                Der ultimative Guide zu allen Business-Dresscodes. Von Business Formal bis Smart Casual –
                lerne, wann welcher Look angemessen ist und wie du ihn perfekt umsetzt.
              </p>

              <ul className="space-y-2 mb-6 text-sm text-brand-secondary">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Alle Dresscodes erklärt
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Outfit-Beispiele für jeden Anlass
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Inkl. Branchen-spezifischer Tipps
                </li>
              </ul>

              <NewsletterSignup
                leadMagnet="dresscode-playbook"
                title="Jetzt herunterladen"
                description="Trage deine E-Mail ein und erhalte das Playbook sofort."
                buttonText="Playbook herunterladen"
              />
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-h2 mb-6">Brauchst du persönliche Beratung?</h2>
          <p className="text-body-lg mb-8 max-w-2xl mx-auto">
            Die Downloads sind ein toller Start. Für eine wirklich maßgeschneiderte Stilberatung,
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
