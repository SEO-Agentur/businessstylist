'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import CapsuleQuestionnaire, { CapsuleAnswers } from '@/components/capsule/CapsuleQuestionnaire';
import Button from '@/components/ui/Button';
import Link from 'next/link';

type Status = 'loading' | 'ready' | 'submitting' | 'done' | 'error' | 'invalid';

export default function CapsuleFragebogenPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');

  const [status, setStatus] = useState<Status>('loading');
  const [customerName, setCustomerName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!sessionId) {
      setStatus('invalid');
      return;
    }

    fetch(`/api/capsule-wardrobe/verify?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          setCustomerName(data.name || '');
          setStatus('ready');
        } else if (data.reason === 'already_completed') {
          setStatus('done');
        } else {
          setStatus('invalid');
        }
      })
      .catch(() => setStatus('error'));
  }, [sessionId]);

  const handleComplete = async (answers: CapsuleAnswers) => {
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/capsule-wardrobe/answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, answers }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ein Fehler ist aufgetreten.');
      router.push('/capsule-wardrobe/erfolg');
    } catch (err: any) {
      setErrorMsg(err.message || 'Ein Fehler ist aufgetreten.');
      setStatus('ready');
    }
  };

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

  return (
    <>
      <section className="section-padding bg-business-cream">
        <div className="container-custom text-center max-w-2xl">
          <h1 className="text-h1 font-serif mb-3">
            {customerName ? `Danke, ${customerName}!` : 'Danke fuer deine Bestellung!'}
          </h1>
          <p className="text-body-lg text-brand-secondary">
            Deine Zahlung war erfolgreich. Bitte fuell jetzt den kurzen Fragebogen aus,
            damit Anika deinen individuellen Capsule-Wardrobe-Plan erstellen kann.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
              {errorMsg}
            </div>
          )}

          {status === 'submitting' ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-brand-secondary">Deine Angaben werden gespeichert...</p>
            </div>
          ) : (
            <CapsuleQuestionnaire onComplete={handleComplete} />
          )}
        </div>
      </section>
    </>
  );
}
