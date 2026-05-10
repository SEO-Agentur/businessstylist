'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/forms/Input';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Passwort muss mindestens 6 Zeichen lang sein');
      return;
    }
    if (password !== confirm) {
      setError('Passwoerter stimmen nicht ueberein');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Ein Fehler ist aufgetreten');
        setIsLoading(false);
        return;
      }
      setSuccess(true);
    } catch (err) {
      setError('Ein Fehler ist aufgetreten');
    }
    setIsLoading(false);
  };

  if (!token) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center section-padding">
        <div className="max-w-md w-full text-center">
          <h1 className="text-h1 mb-4">Ungueltiger Link</h1>
          <p className="text-brand-secondary mb-6">Der Link ist unvollstaendig oder abgelaufen.</p>
          <Link href="/auth/forgot-password" className="text-brand-accent hover:underline">
            Neuen Link anfordern
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center section-padding">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-h1 mb-4">Neues Passwort</h1>
          <p className="text-brand-secondary">Waehle ein neues Passwort fuer Dein Konto.</p>
        </div>

        {success ? (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-4 rounded text-center">
            <p className="font-semibold mb-2">Passwort erfolgreich geaendert</p>
            <Link href="/auth/signin" className="text-brand-accent hover:underline">
              Jetzt anmelden
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>
            )}
            <Input
              label="Neues Passwort"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              label="Passwort bestaetigen"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Wird gespeichert...' : 'Passwort speichern'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
