'use client';

import Link from 'next/link';
import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils/format';
import { useCart } from '@/lib/context/CartContext';

const AMAZON_TASCHENBUCH_URL = 'https://amzn.to/3OFSH2V';

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
      directLink: true,
    },
    {
      id: 'capsule-wardrobe',
      name: 'Capsule Wardrobe',
      slug: '/capsule-wardrobe#bestellen',
      price: 79,
      description: 'Anika erstellt dir einen individuellen Capsule-Wardrobe-Plan – abgestimmt auf deinen Alltag, Stil und deine Figur.',
      type: 'Individueller Plan',
      features: ['Persoenlich von Anika erstellt', 'Abgestimmte Farbpalette', 'Kombinationsvorschlaege', 'Markenempfehlungen'],
      directLink: true,
    },
    {
      id: 'kleiderschrank-check',
      name: 'Kleiderschrank Check',
      slug: '/kleiderschrank-check',
      price: 179,
      description: 'Dein Einstieg ins Business-Styling: Wir analysieren deine Garderobe und entwickeln direkt erste Outfit-Ideen.',
      type: 'Service',
      features: ['Bestehende Teile neu stylen', 'Kein Kaufdruck', 'Passform-Tipps'],
    },
    {
      id: 'stilberatung',
      name: 'Stilberatung',
      slug: '/stilberatung',
      price: 390,
      description: 'In 1:1-Sessions entwickle ich mit Dir deinen Business-Look: klar, typgerecht und zukunftsfähig.',
      type: 'Service',
      features: ['Farb- & Stiltyp Analyse', 'komplette Outfit-Strategie', 'Figur & Passform', 'Lookbook inkl.'],
    },
    {
      id: 'stilberatung-abo',
      name: 'Stilberatung Jahresabo',
      slug: '/stilberatung',
      price: 1290,
      description: 'Dein Stil-System: Initialanalyse + Kleiderschrank-Check + monatliches Lookbook & persoenlicher Shop',
      type: 'Jahresabo',
      features: ['alle Initialanalysen', 'Kleiderschrank-Check', 'monatliches Lookbook', 'persoenlicher Shop'],
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

  const handleAddPlaybook = () => {
    addToCart({
      id: 'dresscode-playbook',
      name: 'Dresscode Playbook',
      price: 33.95,
      type: 'ebook',
    });
    setAddedItems((prev) => [...prev, 'dresscode-playbook']);
    setTimeout(() => {
      setAddedItems((prev) => prev.filter((id) => id !== 'dresscode-playbook'));
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

      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-h2 mb-8">Buch & E-Book</h2>
          <div className="bg-gradient-to-br from-business-navy to-business-darkNavy rounded-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center gap-8 p-8 md:p-12">
              <div className="flex-shrink-0 lg:w-64 flex justify-center">
                <img
                  src="/dresscode-playbook.png"
                  alt="Dresscode Playbook – auf Tablet, Smartphone und als Buch"
                  className="w-full max-w-xs drop-shadow-2xl"
                />
              </div>
              <div className="flex-1 text-white">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-block px-3 py-1 bg-brand-accent text-white text-xs rounded-full font-semibold uppercase tracking-wide">
                    E-Book
                  </span>
                  <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs rounded-full font-semibold uppercase tracking-wide">
                    Taschenbuch
                  </span>
                </div>
                <h3 className="text-h2 font-serif mb-3">Dresscode Playbook</h3>
                <p className="text-lg text-gray-300 mb-4 max-w-xl">
                  Der ultimative Guide für jeden Business-Dresscode. Von Smart Casual bis Black Tie – verstehe und beherrsche jeden Dresscode mit Sicherheit.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-gray-300">
                  {[
                    'Alle Business-Dresscodes erklärt',
                    '50+ Seiten mit Outfit-Beispielen',
                    'Checklisten für jeden Anlass',
                    'Sofort-Download als PDF',
                  ].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mb-6">
                  <span className="text-4xl font-bold">€ 33,95</span>
                  <span className="text-gray-400 text-sm ml-2">E-Book</span>
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                  <Button
                    variant="accent"
                    onClick={handleAddPlaybook}
                    disabled={addedItems.includes('dresscode-playbook')}
                  >
                    {addedItems.includes('dresscode-playbook') ? (
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
                  <Link href="/dresscode-playbook">
                    <Button variant="secondary" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                      Mehr erfahren
                    </Button>
                  </Link>
                  <a
                    href={AMAZON_TASCHENBUCH_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-brand-primary border-2 border-white hover:bg-gray-100 px-5 py-2.5 text-sm whitespace-nowrap"
                  >
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                    Taschenbuch auf Amazon kaufen
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-h2 mb-8">Services & Digitale Produkte</h2>
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
                  {product.price > 0 && !(product as any).directLink && (
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
                    <Button variant={product.price === 0 || (product as any).directLink ? 'primary' : 'secondary'} className="w-full">
                      {(product as any).directLink && product.price > 0 ? 'Jetzt starten' : 'Mehr erfahren'}
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
