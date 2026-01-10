import Link from 'next/link';
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { formatPrice } from '@/lib/utils/format';

export const metadata: Metadata = {
  title: 'Preise - Stilberatung & Services | Businessstylist',
  description: 'Übersicht über alle Stilberatungs-Services und Preise. Von der Typenanalyse über das Starter Lookbook bis zur individuellen Stilberatung.',
  alternates: {
    canonical: '/preise',
  },
};

export default function PreisePage() {
  const packages = [
    {
      name: 'Starter Lookbook',
      price: 97,
      description: 'Perfekter Einstieg in die Business-Garderobe',
      features: [
        'Digitales Lookbook (PDF)',
        '15 fertige Outfit-Kombinationen',
        'Shopping-Liste',
        'Styling-Tipps',
      ],
      href: '/shop/lookbook',
      popular: false,
    },
    {
      name: 'Stilberatung Einzelsession',
      price: 297,
      description: 'Intensive 1:1 Beratung für deinen Business-Stil',
      features: [
        '90 Minuten persönliche Beratung',
        'Stilanalyse & Typberatung',
        'Individuelles Lookbook',
        'Shopping-Guide',
        '4 Wochen E-Mail-Support',
      ],
      href: '/shop/stilberatung',
      popular: true,
    },
    {
      name: 'Stilberatung Abo',
      price: 97,
      priceNote: 'pro Monat',
      description: 'Kontinuierliche Unterstützung für deinen Stil',
      features: [
        'Monatliches Lookbook Update',
        'Styling-Tipps per E-Mail',
        'Zugriff auf exklusive Guides',
        'Community-Zugang',
        'Jederzeit kündbar',
      ],
      href: '/shop/stilberatung-abo',
      popular: false,
    },
  ];

  return (
    <>
      <section className="section-padding bg-business-cream">
        <div className="container-custom text-center">
          <h1 className="text-display-1 font-serif mb-6">
            Preise & Pakete
          </h1>
          <p className="text-body-lg text-brand-secondary max-w-2xl mx-auto">
            Wähle das Paket, das am besten zu deinen Bedürfnissen passt
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card key={pkg.name} className={`relative ${pkg.popular ? 'ring-2 ring-brand-accent' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-brand-accent text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Beliebt
                    </span>
                  </div>
                )}

                <h3 className="text-h3 mb-2">{pkg.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{formatPrice(pkg.price)}</span>
                  {pkg.priceNote && (
                    <span className="text-brand-secondary ml-2">{pkg.priceNote}</span>
                  )}
                </div>
                <p className="text-brand-secondary mb-6">{pkg.description}</p>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={pkg.href}>
                  <Button
                    variant={pkg.popular ? 'primary' : 'secondary'}
                    className="w-full"
                  >
                    Auswählen
                  </Button>
                </Link>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-h2 mb-4">Zusatzleistungen</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-8">
              <Card>
                <h3 className="text-h3 mb-2">Kleiderschrank Check</h3>
                <p className="text-2xl font-bold mb-3">{formatPrice(197)}</p>
                <p className="text-brand-secondary mb-4">
                  Persönlicher Check deines Kleiderschranks mit Aussortier-Hilfe und neuen Kombinationsideen
                </p>
                <Link href="/shop/kleiderschrank-check">
                  <Button variant="secondary" className="w-full">Mehr erfahren</Button>
                </Link>
              </Card>

              <Card>
                <h3 className="text-h3 mb-2">Business Ebook</h3>
                <p className="text-2xl font-bold mb-3">{formatPrice(29)}</p>
                <p className="text-brand-secondary mb-4">
                  Kompakter Guide mit den wichtigsten Stilregeln für den Business-Alltag
                </p>
                <Link href="/shop/ebook">
                  <Button variant="secondary" className="w-full">Mehr erfahren</Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
