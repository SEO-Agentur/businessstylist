'use client';

import { useForm, ValidationError } from '@formspree/react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/forms/Input';

export default function KontaktPage() {
  const [state, handleSubmit] = useForm('mnjwdwny');
  const isSubmitting = state.submitting;
  const hasError = state.errors && (Array.isArray((state.errors as any)) ? (state.errors as any).length > 0 : Object.keys(state.errors as any).length > 0);

  return (
    <>
      <section className="relative section-padding overflow-hidden bg-gradient-to-br from-business-navy via-business-darkNavy to-business-charcoal">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-business-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-accent rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom max-w-4xl text-center text-white relative z-10">
          <h1 className="text-display-2 font-serif mb-6">
            Kontakt
          </h1>
          <p className="text-xl leading-relaxed">
            Hast du Fragen zu unseren Services oder möchtest eine persönliche Beratung buchen?<br />
            Wir freuen uns auf deine Nachricht!
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-h2 mb-6">Schreib uns eine Nachricht</h2>

              {hasError && !state.succeeded && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
                  <p className="font-semibold">Nachricht konnte nicht gesendet werden.</p>
                  <p className="text-sm">Bitte überprüfe deine Eingaben oder schreibe uns direkt an info@businessstylist.de.</p>
                </div>
              )}

              {state.succeeded && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-semibold">Nachricht erfolgreich versendet!</p>
                      <p className="text-sm">Wir melden uns so schnell wie möglich bei dir.</p>
                    </div>
                  </div>
                </div>
              )}

              {!state.succeeded && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="_subject" value="Neue Nachricht: Kontaktformular Businessstylist" />
                <input type="hidden" name="_language" value="de" />
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <Input
                  label="Name"
                  type="text"
                  name="name"
                  required
                  placeholder="Dein vollständiger Name"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-sm text-red-600 mt-1" />

                <div>
                  <Input
                    label="E-Mail"
                    type="email"
                    name="email"
                    required
                    placeholder="deine@email.de"
                  />
                  <ValidationError prefix="E-Mail" field="email" errors={state.errors} className="text-sm text-red-600 mt-1" />
                </div>

                <Input
                  label="Telefon (optional)"
                  type="tel"
                  name="phone"
                  placeholder="+49 XXX XXXXXXX"
                />

                <div>
                  <label className="block text-sm font-semibold text-brand-primary mb-2">
                    Betreff
                  </label>
                  <select
                    name="subject"
                    required
                    defaultValue=""
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all"
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="stilberatung">Stilberatung buchen</option>
                    <option value="kleiderschrank">Kleiderschrank Check</option>
                    <option value="lookbook">Starter Lookbook</option>
                    <option value="jahresabo">Jahresabo Interesse</option>
                    <option value="allgemein">Allgemeine Anfrage</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-primary mb-2">
                    Nachricht
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    placeholder="Beschreibe dein Anliegen..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all resize-none"
                  />
                  <ValidationError prefix="Nachricht" field="message" errors={state.errors} className="text-sm text-red-600 mt-1" />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Nachricht senden
                    </>
                  )}
                </Button>
              </form>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-h2 mb-6">Weitere Kontaktmöglichkeiten</h2>
              </div>

              <Card>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-h3 mb-2">E-Mail</h3>
                    <a href="mailto:info@businessstylist.de" className="text-brand-accent hover:underline">
                      info@businessstylist.de
                    </a>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-h3 mb-2">Instagram</h3>
                    <a href="https://www.instagram.com/businessstylist.de" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">
                      @businessstylist.de
                    </a>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.27 8.27 0 004.84 1.55V6.85a4.85 4.85 0 01-1.07-.16z"/>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-h3 mb-2">TikTok</h3>
                    <a href="https://www.tiktok.com/@businessstylist" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">
                      @businessstylist
                    </a>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-h3 mb-2">Termin buchen</h3>
                    <p className="text-brand-secondary mb-3">
                      Buche direkt einen Beratungstermin
                    </p>
                    <a href="/stilberatung" className="text-brand-accent hover:underline font-semibold">
                      Zur Terminbuchung →
                    </a>
                  </div>
                </div>
              </Card>

              <div className="bg-brand-light rounded-2xl p-6">
                <h3 className="text-h3 mb-3">Häufig gestellte Fragen</h3>
                <p className="text-brand-secondary mb-4">
                  Viele Antworten findest du bereits in unseren FAQs
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-brand-secondary">
                    <svg className="w-4 h-4 text-business-gold mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Wie läuft eine Stilberatung ab?
                  </div>
                  <div className="flex items-center text-brand-secondary">
                    <svg className="w-4 h-4 text-business-gold mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Welche Zahlungsmethoden werden akzeptiert?
                  </div>
                  <div className="flex items-center text-brand-secondary">
                    <svg className="w-4 h-4 text-business-gold mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Kann ich einen Termin verschieben?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-light">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-h2 mb-4">Bereit für deinen Stilwandel?</h2>
          <p className="text-body-lg text-brand-secondary mb-8">
            Lass uns gemeinsam deinen perfekten Business-Look entwickeln
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/stilberatung">
              <Button size="lg" variant="accent">Stilberatung buchen</Button>
            </a>
            <a href="/kibbe-body-type-test">
              <Button size="lg" variant="secondary">Kostenlose Typanalyse</Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
