'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/forms/Input';

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setSubmitStatus('success');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

    setTimeout(() => {
      setSubmitStatus('idle');
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

              {submitStatus === 'success' && (
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
                  label="Telefon (optional)"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+49 XXX XXXXXXX"
                />

                <div>
                  <label className="block text-sm font-semibold text-brand-primary mb-2">
                    Betreff
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
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
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Beschreibe dein Anliegen..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all resize-none"
                  />
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
                    <a href="mailto:kontakt@businessstylist.de" className="text-brand-accent hover:underline">
                      kontakt@businessstylist.de
                    </a>
                    <p className="text-brand-secondary text-sm mt-1">
                      Antwortzeit: Innerhalb von 24 Stunden
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-h3 mb-2">Telefon</h3>
                    <a href="tel:+49XXXXXXXXX" className="text-brand-accent hover:underline">
                      +49 (0) XXX XXXXXXX
                    </a>
                    <p className="text-brand-secondary text-sm mt-1">
                      Mo-Fr: 9:00 - 18:00 Uhr
                    </p>
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
            <a href="/typenanalyse">
              <Button size="lg" variant="secondary">Kostenlose Typanalyse</Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
