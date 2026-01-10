'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/forms/Input';

interface NewsletterSignupProps {
  leadMagnet?: 'smart-casual' | 'dresscode-playbook' | null;
  title?: string;
  description?: string;
  buttonText?: string;
}

export default function NewsletterSignup({
  leadMagnet = null,
  title = 'Newsletter abonnieren',
  description = 'Erfolgslooks, Outfit-Guides und Insider-Tipps zuerst bekommen',
  buttonText = 'Jetzt anmelden'
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, leadMagnet }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setEmail('');

        if (leadMagnet && data.downloadUrl) {
          window.location.href = data.downloadUrl;
        }
      } else {
        setError(data.error || 'Ein Fehler ist aufgetreten');
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 text-center">
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-h3 mb-2">Erfolgreich angemeldet!</h3>
        <p className="text-brand-secondary">
          {leadMagnet
            ? 'Dein Download startet in Kürze. Prüfe auch dein E-Mail-Postfach!'
            : 'Prüfe dein E-Mail-Postfach und bestätige deine Anmeldung.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-card">
      <h3 className="text-h3 mb-2">{title}</h3>
      <p className="text-brand-secondary mb-6">{description}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          name="email"
          placeholder="Deine E-Mail-Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <Button
          type="submit"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Wird angemeldet...' : buttonText}
        </Button>

        <p className="text-xs text-brand-secondary text-center">
          Mit der Anmeldung akzeptierst du unsere{' '}
          <a href="/datenschutz" className="underline hover:text-brand-primary">
            Datenschutzerklärung
          </a>
        </p>
      </form>
    </div>
  );
}
