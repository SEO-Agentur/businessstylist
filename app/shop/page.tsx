'use client';

import Link from 'next/link';
import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils/format';
import { useCart } from '@/lib/context/CartContext';

export default function ShopPage() {
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<string[]>([]);

  const products = [
    {
      id: 'typanalyse',
      name: 'Typanalyse',
      slug: '/kibbe-body-type-test',
      price: 0,
      description: 'Finde mit wenigen Klicks deinen Stiltyp: eine erste Orientierung für dein authentisches Business-Outfit.',
      type: 'Kostenlos',
      features: ['Typenanalyse nach Kibbe', 'Erste Stilimpulse', 'Orientierungshilfe', 'E-Mail-Auswertung'],
    },
    {
      id: 'lookbook',
      name: 'Lookbook',
      slug: '/lookbook',
      price: 29,
      description: 'Erhalte ein fertiges Lookbook mit Business-Outfits, abgestimmt auf deinen Typ - inklusive Shoppinglinks.',
      type: 'Digital',
      features: ['Typgerechtes Lookbook', 'Outfits mit Shop-Links', 'Farb- & Schnittempfehlungen', 'Stilvolle Basics & Accessoires'],
    },
    {
      id: 'kleiderschrank-check',
      name: 'Kleiderschrank Check',
      slug: '/kleiderschrank-check',
      price: 179,
      description: 'Dein Einstieg ins Business-Styling: Wir analysieren deine Garderobe und entwickeln direkt erste Outfit-Ideen.',
      type: 'Service',
      features: ['90 Min Online-Call', 'Bestehende Teile neu stylen', 'Kein Kaufdruck', 'Passform-Tipps'],
    },
    {
      id: 'stilberatung',
      name: 'Stilberatung',
      slug: '/stilberatung',
      price: 390,
      description: 'In 1:1-Sessions entwickle ich mit Dir deinen Business-Look: klar, typgerecht und zukunftsfähig. 2 × 90 Minuten.',
      type: 'Service',
      features: ['Farb- & Stiltyp Analyse', 'komplette Outfit-Strategie', 'Figur & Passform', 'Lookbook inkl.'],
    },
    {
      id: 'stilberatung-abo',
      name: 'Stilberatung Jahresabo',
      slug: '/stilberatung',
      price: 1290,
      description: 'Dein Stil-System: Initialanalyse + Kleiderschrank-Check + monatliches Lookbook & persönlicher Shop',
      type: 'Jahresabo',
      features: ['alle Initialanalysen', 'Kleiderschrank-Check', 'monatliches Lookbook', 'persönlicher Shop'],
    },
  ];

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      type: product.type,
    });
    setAddedItems([...addedItems, product.id]);
    setTimeout(() => {
      setAddedItems(addedItems.filter(id => id !== product.id));
    }, 2000);
  };

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
              <Card key={product.id} hover className="flex flex-col">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-brand-light text-brand-secondary text-sm rounded-full font-semibold">
                    {product.type}
                  </span>
                </div>
                <h3 className="text-h3 mb-3">{product.name}</h3>
                <p className="text-brand-secondary mb-4">{product.description}</p>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-brand-primary">
                    {formatPrice(product.price)}
                  </span>
                </div>

                <ul className="space-y-2 mb-6 flex-grow">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 mt-auto">
                  {product.price > 0 && (
                    <Button
                      onClick={() => handleAddToCart(product)}
                      variant="accent"
                      className="w-full"
                      disabled={addedItems.includes(product.id)}
                    >
                      {addedItems.includes(product.id) ? (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          In den Warenkorb gelegt
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          In den Warenkorb
                        </>
                      )}
                    </Button>
                  )}
                  <Link href={product.slug}>
                    <Button variant={product.price === 0 ? 'primary' : 'secondary'} className="w-full">
                      Mehr erfahren
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
