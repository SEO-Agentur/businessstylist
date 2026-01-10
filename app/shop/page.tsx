import Link from 'next/link';
import type { Metadata } from 'next';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils/format';

export const metadata: Metadata = {
  title: 'Shop - Stilberatung, Lookbooks & mehr | Businessstylist',
  description: 'Entdecke unsere Services: Professionelle Stilberatung, Starter Lookbooks, Kleiderschrank Check und Business Ebooks für deinen perfekten Look.',
  alternates: {
    canonical: '/shop',
  },
};

export default function ShopPage() {
  const products = [
    {
      name: 'Business Ebook',
      slug: 'ebook',
      price: 29,
      description: 'Kompakter Guide mit den wichtigsten Stilregeln für den Business-Alltag',
      type: 'Digital',
    },
    {
      name: 'Starter Lookbook',
      slug: 'lookbook',
      price: 97,
      description: '15 fertige Outfit-Kombinationen für deinen Business-Alltag',
      type: 'Digital',
    },
    {
      name: 'Kleiderschrank Check',
      slug: 'kleiderschrank-check',
      price: 197,
      description: 'Persönlicher Check deines Kleiderschranks mit Aussortier-Hilfe',
      type: 'Service',
    },
    {
      name: 'Stilberatung',
      slug: 'stilberatung',
      price: 297,
      description: '90 Minuten persönliche 1:1 Stilberatung',
      type: 'Service',
    },
    {
      name: 'Stilberatung Abo',
      slug: 'stilberatung-abo',
      price: 97,
      priceNote: '/ Monat',
      description: 'Monatliche Lookbook Updates und kontinuierliche Unterstützung',
      type: 'Subscription',
    },
  ];

  return (
    <>
      <section className="section-padding bg-business-cream">
        <div className="container-custom text-center">
          <h1 className="text-display-1 font-serif mb-6">
            Shop
          </h1>
          <p className="text-body-lg text-brand-secondary max-w-2xl mx-auto">
            Entdecke unsere Services und Produkte für deinen perfekten Business-Stil
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.slug} hover>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-brand-light text-brand-secondary text-sm rounded-full">
                    {product.type}
                  </span>
                </div>
                <h3 className="text-h3 mb-3">{product.name}</h3>
                <p className="text-brand-secondary mb-4">{product.description}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                  {product.priceNote && (
                    <span className="text-brand-secondary ml-2">{product.priceNote}</span>
                  )}
                </div>
                <Link href={`/shop/${product.slug}`}>
                  <Button variant="primary" className="w-full">
                    Mehr erfahren
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
