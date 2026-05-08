import type { Metadata } from 'next';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ChecklistSignup from '@/components/forms/ChecklistSignup';

export const metadata: Metadata = {
  title: 'Kostenlose Checklisten - Businessstylist',
  description:
    'Kostenlose Business-Style-Checklisten: Smart Casual, Business Attire und Wardrobe Decluttering. Direkt per E-Mail in dein Postfach.',
  alternates: {
    canonical: '/downloads',
  },
};

type ChecklistCard = {
  slug: 'smart-casual' | 'business-attire' | 'wardrobe-declutter';
  badge: string;
  title: string;
  description: string;
  bullets: string[];
  buttonText: string;
  formDescription: string;
};

const CHECKLISTS: ChecklistCard[] = [
  {
    slug: 'smart-casual',
    badge: 'Kostenlos',
    title: 'Smart Casual Checkliste',
    description:
      "Dein kompletter Guide für den perfekten Smart-Casual-Look. Mit Do's & Don'ts, Outfit-Vorschlägen für Damen und Herren sowie Profi-Tipps von Anika.",
    bullets: [
      'Alle Essentials auf einen Blick',
      'Checklisten für Damen & Herren',
      'Sofort umsetzbare Profi-Tipps',
    ],
    buttonText: 'Checkliste anfordern',
    formDescription:
      'Trage deine E-Mail ein und du erhältst die Smart Casual Checkliste sofort in dein Postfach.',
  },
  {
    slug: 'business-attire',
    badge: 'Kostenlos',
    title: 'Business Attire Checkliste',
    description:
      'Von Business Formal bis Business Casual – die klare Orientierung für den sicheren Auftritt im Berufsalltag, bei Meetings und Kundenterminen.',
    bullets: [
      'Alle Dresscode-Stufen erklärt',
      'Must-Haves für Damen & Herren',
      'Typische Stolpersteine vermeiden',
    ],
    buttonText: 'Checkliste anfordern',
    formDescription:
      'Trage deine E-Mail ein und du erhältst die Business Attire Checkliste sofort in dein Postfach.',
  },
  {
    slug: 'wardrobe-declutter',
    badge: 'Kostenlos',
    title: 'Wardrobe-Decluttering Checkliste',
    description:
      'Schluss mit dem überfüllten Kleiderschrank. Die strukturierte Anleitung, um deine Garderobe auszumisten und auf eine stimmige Capsule zu reduzieren.',
    bullets: [
      'Schritt-für-Schritt-Anleitung',
      'Entscheidungsraster für jedes Teil',
      'Tipps für eine stimmige Capsule',
    ],
    buttonText: 'Checkliste anfordern',
    formDescription:
      'Trage deine E-Mail ein und du erhältst die Wardrobe-Decluttering Checkliste sofort in dein Postfach.',
  },
];

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
              Drei professionelle Checklisten für deinen perfekten Business-Look und einen
              aufgeräumten Kleiderschrank. Einfach E-Mail eintragen – den Rest übernehmen wir.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {CHECKLISTS.map((item) => (
              <Card key={item.slug} className="relative overflow-hidden flex flex-col">
                <div className="absolute top-4 right-4 bg-brand-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {item.badge}
                </div>

                <h3 className="text-h3 mb-3 pr-20">{item.title}</h3>
                <p className="text-brand-secondary mb-4">{item.description}</p>

                <ul className="space-y-2 mb-6 text-sm text-brand-secondary">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start">
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
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <ChecklistSignup
                    checklist={item.slug}
                    title="Jetzt anfordern"
                    description={item.formDescription}
                    buttonText={item.buttonText}
                  />
                </div>
              </Card>
            ))}
          </div>
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
