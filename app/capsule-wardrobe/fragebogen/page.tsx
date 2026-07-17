'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BusinessCapsuleQuestionnaire from '@/components/capsule/BusinessCapsuleQuestionnaire';
import Button from '@/components/ui/Button';
import Link from 'next/link';

type Status = 'loading' | 'ready' | 'done' | 'error' | 'invalid';

export default function CapsuleFragebogenPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    if (!sessionId) {
      setStatus('invalid');
      return;
    }

    fetch(`/api/capsule-wardrobe/verify?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          setStatus('ready');
        } else if (data.reason === 'already_completed') {
          setStatus('done');
        } else {
          setStatus('invalid');
        }
      })
      .catch(() => setStatus('error'));
  }, [sessionId]);

  if (status === 'loading') {
    return (
      <section className="section-padding">
        <div className="container-custom max-w-2xl text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-2/3 mx-auto mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (status === 'invalid') {
    return (
      <section className="section-padding">
        <div className="container-custom max-w-2xl text-center">
          <h1 className="text-h1 font-serif mb-4">Ungueltige Session</h1>
          <p className="text-brand-secondary mb-6">
            Diese Seite ist nur nach einer erfolgreichen Bestellung zugaenglich.
            Falls du gerade bestellt hast, pruefe bitte deinen Link oder kontaktiere uns.
          </p>
          <Link href="/capsule-wardrobe">
            <Button>Zur Capsule-Wardrobe-Seite</Button>
          </Link>
        </div>
      </section>
    );
  }

  if (status === 'done') {
    return (
      <section className="section-padding">
        <div className="container-custom max-w-2xl text-center">
          <h1 className="text-h1 font-serif mb-4">Fragebogen bereits ausgefuellt</h1>
          <p className="text-brand-secondary mb-6">
            Du hast den Fragebogen bereits abgeschickt. Anika arbeitet an deinem Plan!
          </p>
          <Link href="/">
            <Button>Zur Startseite</Button>
          </Link>
        </div>
      </section>
    );
  }

  if (status === 'error') {
    return (
      <section className="section-padding">
        <div className="container-custom max-w-2xl text-center">
          <h1 className="text-h1 font-serif mb-4">Fehler</h1>
          <p className="text-brand-secondary mb-6">
            Beim Laden ist ein Fehler aufgetreten. Bitte versuche es erneut oder kontaktiere uns.
          </p>
          <Link href="/capsule-wardrobe">
            <Button>Zur Capsule-Wardrobe-Seite</Button>
          </Link>
        </div>
      </section>
    );
  }

  return <BusinessCapsuleQuestionnaire />;
}
