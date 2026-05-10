'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/forms/Input';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center section-padding">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-h1 mb-4">Passwort vergessen</h1>
          <p className="text-brand-secondary">
            Gib Deine E-Mail-Adresse ein. Wir senden Dir einen Link, um Dein Passwort zurueckzusetzen.
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-4 rounded">
            <p className="font-semibold mb-2">E-Mail versendet</p>
            <p className="text-sm">
              Falls die Adresse bei uns hinterlegt ist, haben wir Dir einen Link gesendet. Der Link ist 60 Minuten gueltig.
            </p>
            <div className="mt-4">
              <Link href="/auth/signin" className="text-brand-accent hover:underline">
                Zurueck zur Anmeldung
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="E-Mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Wird gesendet...' : 'Link zusenden'}
            </Button>
            <div className="text-center">
              <Link href="/auth/signin" className="text-sm text-brand-secondary hover:underline">
                Zurueck zur Anmeldung
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
