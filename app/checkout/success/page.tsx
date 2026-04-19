'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <Card className="text-center py-12">
            <div className="flex justify-center mb-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent"></div>
            </div>
            <p className="text-body-lg text-brand-secondary">Bestätigung wird geladen...</p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container-custom max-w-3xl">
        <Card className="text-center py-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="text-h1 mb-4">Zahlung erfolgreich!</h1>
          <p className="text-body-lg text-brand-secondary mb-8">
            Vielen Dank für deine Bestellung. Wir haben dir eine Bestätigungsmail gesendet und melden uns in Kürze bei dir.
          </p>
          <div className="bg-brand-light rounded-lg p-6 mb-8 text-left">
            <h2 className="text-h3 mb-3">Was passiert als Nächstes?</h2>
            <ul className="space-y-2 text-brand-secondary">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Du erhältst eine Bestellbestätigung per E-Mail</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Wir melden uns innerhalb von 24 Stunden für die Terminvereinbarung</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Digitale Produkte werden direkt an deine E-Mail-Adresse gesendet</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/account/dashboard">
              <Button variant="primary" size="lg">Zu meinem Account</Button>
            </Link>
            <Link href="/">
              <Button variant="secondary" size="lg">Zur Startseite</Button>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<section className="section-padding"><div className="container-custom max-w-3xl"><Card className="text-center py-12"><div className="flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent" /></div></Card></div></section>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
