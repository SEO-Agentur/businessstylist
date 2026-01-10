import Link from 'next/link';
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Stilberatung - Professionelle Business Stilberatung | Businessstylist',
  description: 'Professionelle Stilberatung für Business-Frauen. Finde deinen authentischen Look mit individueller Beratung von Businessstylist.',
  alternates: {
    canonical: '/stilberatung',
  },
};

export default function StilberatungPage() {
  return (
    <>
      <section className="section-padding bg-business-cream">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-display-1 font-serif mb-6">
              Stilberatung für Business-Frauen
            </h1>
            <p className="text-body-lg text-brand-secondary mb-8">
              Entdecke deinen authentischen Business-Stil mit professioneller Beratung
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2>Was ist Stilberatung?</h2>
            <p>
              Eine professionelle Stilberatung hilft dir, deinen individuellen Business-Look zu finden,
              der deine Persönlichkeit unterstreicht und deine Karriereziele unterstützt.
            </p>

            <h2>Für wen ist die Stilberatung geeignet?</h2>
            <ul>
              <li>Berufseinsteigerinnen, die einen professionellen Look entwickeln möchten</li>
              <li>Führungskräfte, die ihre Außenwirkung optimieren wollen</li>
              <li>Frauen im Karrierewandel mit neuen Anforderungen</li>
              <li>Alle, die sich in ihrer Business-Garderobe wohlfühlen möchten</li>
            </ul>

            <h2>Was bekommst du?</h2>
            <ul>
              <li>Persönliches 1:1 Beratungsgespräch (90 Minuten)</li>
              <li>Analyse deines aktuellen Stils und deiner Bedürfnisse</li>
              <li>Individuelles Stilkonzept für deinen Berufsalltag</li>
              <li>Lookbook mit konkreten Outfit-Kombinationen</li>
              <li>Shopping-Guide mit passenden Marken und Shops</li>
            </ul>
          </div>

          <div className="mt-12 text-center">
            <Link href="/shop/stilberatung">
              <Button size="lg">Jetzt Stilberatung buchen</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
