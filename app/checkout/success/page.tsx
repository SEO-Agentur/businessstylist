'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');
  const loginToken = searchParams.get('login_token');
  const { data: authSession, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (loginToken && status === 'unauthenticated') {
        await signIn('login-token', { token: loginToken, redirect: false });
        if (!cancelled) {
          router.replace('/account/dashboard');
        }
        return;
      }
      if (!cancelled) setLoading(false);
    }
    if (sessionId) run();
    return () => {
      cancelled = true;
    };
  }, [sessionId, loginToken, status, router]);

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <Card className="text-center py-12">
            <div className="flex justify-center mb-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent"></div>
            </div>
            <p className="text-body-lg text-brand-secondary">Bestaetigung wird geladen...</p>
          </Card>
        </div>
      </section>
    );
  }

  const isLoggedIn = status === 'authenticated' || !!authSession;

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
            Vielen Dank fuer deine Bestellung. Wir haben dir eine Bestaetigungsmail gesendet und melden uns in Kuerze bei dir.
          </p>
          <div className="bg-brand-light rounded-lg p-6 mb-8 text-left">
            <h2 className="text-h3 mb-3">Was passiert als Naechstes?</h2>
            <ul className="space-y-2 text-brand-secondary">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Du erhaeltst eine Bestellbestaetigung per E-Mail</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Wir melden uns innerhalb von 24 Stunden fuer die Terminvereinbarung</span>
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
            {isLoggedIn ? (
              <Link href="/account/dashboard">
                <Button variant="primary" size="lg">Zu meinem Dashboard</Button>
              </Link>
            ) : (
              <Link href="/auth/signin">
                <Button variant="primary" size="lg">Anmelden</Button>
              </Link>
            )}
            <Link href="/">
              <Button variant="secondary" size="lg">Zur Startseite</Button>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}
