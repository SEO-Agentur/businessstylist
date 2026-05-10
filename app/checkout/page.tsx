'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useCart } from '@/lib/context/CartContext';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/forms/Input';
import { formatPrice } from '@/lib/utils/format';

type AuthMode = 'unknown' | 'guest' | 'existing_with_password' | 'existing_no_password' | 'new';

export default function CheckoutPage() {
  const { data: session } = useSession();
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice, discount, discountAmount, clearDiscount } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [widerrufsConsent, setWiderrufsConsent] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('unknown');
  const [authPassword, setAuthPassword] = useState('');
  const [wantsAccount, setWantsAccount] = useState(true);
  const [authError, setAuthError] = useState('');
  const lastCheckedEmail = useRef('');

  useEffect(() => {
    if (session?.user) {
      setAuthMode('guest');
      return;
    }
    const email = formData.email.trim().toLowerCase();
    if (!email || !/.+@.+\..+/.test(email)) {
      setAuthMode('unknown');
      return;
    }
    if (email === lastCheckedEmail.current) return;
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/auth/check-email?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        lastCheckedEmail.current = email;
        if (data.exists && data.hasPassword) setAuthMode('existing_with_password');
        else if (data.exists && !data.hasPassword) setAuthMode('existing_no_password');
        else setAuthMode('new');
      } catch {
        setAuthMode('new');
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [formData.email, session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitting(true);

    let authAction: 'login' | 'set_password' | undefined;
    let passwordForRequest: string | undefined;

    if (!session?.user) {
      if (authMode === 'existing_with_password') {
        if (!authPassword) {
          setAuthError('Bitte gib Dein Passwort ein');
          setIsSubmitting(false);
          return;
        }
        authAction = 'login';
        passwordForRequest = authPassword;
      } else if ((authMode === 'new' || authMode === 'existing_no_password') && wantsAccount && authPassword) {
        if (authPassword.length < 6) {
          setAuthError('Passwort muss mindestens 6 Zeichen lang sein');
          setIsSubmitting(false);
          return;
        }
        authAction = 'set_password';
        passwordForRequest = authPassword;
      }
    }

    try {
      const response = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items,
          customerInfo: formData,
          discountCode: discount?.code || null,
          authAction,
          authPassword: passwordForRequest,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data?.code === 'invalid_password' || data?.code === 'password_required') {
          setAuthMode('existing_with_password');
          setAuthError(data.error || 'Bitte gib Dein Passwort ein');
          setIsSubmitting(false);
          return;
        }
        throw new Error(data.error || 'Fehler beim Erstellen der Checkout-Session');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(error.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
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
            <h1 className="text-h1 mb-4">Bestellung erfolgreich!</h1>
            <p className="text-body-lg text-brand-secondary mb-8">
              Vielen Dank für deine Bestellung. Wir haben dir eine Bestätigungsmail gesendet und melden uns in Kürze bei dir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button variant="primary" size="lg">Weiter shoppen</Button>
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

  if (items.length === 0) {
    return (
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <Card className="text-center py-12">
            <div className="flex justify-center mb-6">
              <svg className="w-20 h-20 text-brand-secondary opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-h1 mb-4">Dein Warenkorb ist leer</h1>
            <p className="text-body-lg text-brand-secondary mb-8">
              Entdecke unsere Services und füge Artikel hinzu, um fortzufahren.
            </p>
            <Link href="/shop">
              <Button variant="primary" size="lg">Zum Shop</Button>
            </Link>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="section-padding bg-business-cream">
        <div className="container-custom text-center">
          <h1 className="text-display-1 font-serif mb-6">
            Zur Kasse
          </h1>
          <p className="text-body-lg text-brand-secondary max-w-2xl mx-auto">
            Schließe deine Bestellung ab und starte deinen Stilwandel
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <h2 className="text-h2 mb-6">Warenkorb</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0">
                      <div className="flex-grow">
                        <h3 className="text-h3 mb-1">{item.name}</h3>
                        <p className="text-sm text-brand-secondary mb-2">{item.type}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                              aria-label="Menge verringern"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                              aria-label="Menge erhöhen"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                          >
                            Entfernen
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-h3">{formatPrice(item.price * item.quantity)}</p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-brand-secondary">{formatPrice(item.price)} / Stück</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h2 className="text-h2 mb-6">Deine Daten</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Dein vollständiger Name"
                  />

                  <Input
                    label="E-Mail"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="deine@email.de"
                  />

                  <Input
                    label="Telefon"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+49 XXX XXXXXXX"
                  />

                  <Input
                    label="Adresse"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Straße und Hausnummer"
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Postleitzahl"
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      placeholder="12345"
                    />

                    <Input
                      label="Stadt"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="Stadt"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-primary mb-2">
                      Anmerkungen (optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Besondere Wünsche oder Hinweise..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  {!session?.user && (authMode === 'existing_with_password' || authMode === 'existing_no_password' || authMode === 'new') && (
                    <div className="p-4 border border-brand-accent/30 rounded-lg bg-brand-light/40 space-y-4">
                      {authMode === 'existing_with_password' ? (
                        <>
                          <div>
                            <h3 className="font-semibold text-brand-primary mb-1">Willkommen zurueck</h3>
                            <p className="text-sm text-brand-secondary">
                              Fuer diese E-Mail existiert bereits ein Konto. Bitte melde Dich an, um nach dem Kauf direkt ins Dashboard zu gelangen.
                            </p>
                          </div>
                          <Input
                            label="Passwort"
                            type="password"
                            value={authPassword}
                            onChange={(e) => setAuthPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                          />
                          <p className="text-xs text-brand-secondary">
                            <Link href="/auth/forgot-password" className="underline hover:text-brand-accent">
                              Passwort vergessen?
                            </Link>
                          </p>
                        </>
                      ) : (
                        <>
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={wantsAccount}
                              onChange={(e) => setWantsAccount(e.target.checked)}
                              className="mt-1 w-4 h-4 flex-shrink-0 accent-brand-accent"
                            />
                            <span className="text-sm text-brand-secondary">
                              Konto erstellen, damit ich nach dem Kauf direkt auf mein Dashboard zugreifen und spaeter wieder einloggen kann (empfohlen).
                            </span>
                          </label>
                          {wantsAccount && (
                            <Input
                              label="Passwort festlegen (min. 6 Zeichen)"
                              type="password"
                              value={authPassword}
                              onChange={(e) => setAuthPassword(e.target.value)}
                              autoComplete="new-password"
                              placeholder="Mindestens 6 Zeichen"
                            />
                          )}
                        </>
                      )}
                      {authError && (
                        <p className="text-sm text-red-700">{authError}</p>
                      )}
                    </div>
                  )}

                  <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <input
                      type="checkbox"
                      id="widerrufs-consent"
                      checked={widerrufsConsent}
                      onChange={(e) => setWiderrufsConsent(e.target.checked)}
                      required
                      className="mt-1 w-4 h-4 flex-shrink-0 accent-brand-accent cursor-pointer"
                    />
                    <label htmlFor="widerrufs-consent" className="text-sm text-brand-secondary leading-relaxed cursor-pointer">
                      Ich verlange ausdrücklich, dass Sie vor Ablauf der Widerrufsfrist mit der Ausführung beginnen. Mir ist bekannt, dass ich mit Beginn der Ausführung mein Widerrufsrecht verliere.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting || !widerrufsConsent}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Bestellung wird verarbeitet...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Jetzt kostenpflichtig bestellen
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <h2 className="text-h2 mb-6">Zusammenfassung</h2>

                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-brand-secondary">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                {discount && discountAmount > 0 && (
                  <div className="border-t border-gray-200 pt-4 mb-4 space-y-2 text-sm">
                    <div className="flex justify-between items-center text-green-700">
                      <span className="font-semibold">
                        Rabatt {discount.code}
                        <button
                          type="button"
                          onClick={clearDiscount}
                          className="ml-2 text-xs text-brand-secondary underline hover:text-brand-primary"
                        >
                          entfernen
                        </button>
                      </span>
                      <span className="font-semibold">− {formatPrice(discountAmount)}</span>
                    </div>
                    {discount.description && (
                      <p className="text-xs text-brand-secondary">{discount.description}</p>
                    )}
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-h3">Gesamt</span>
                    <span className="text-h2 text-brand-accent">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <div className="bg-brand-light rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm">
                      <p className="font-semibold mb-1">Sichere Zahlung</p>
                      <p className="text-brand-secondary">Nach Bestellung erhältst du eine Rechnung per E-Mail.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-brand-secondary">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    100% sichere Bezahlung
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Persönliche Betreuung
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
