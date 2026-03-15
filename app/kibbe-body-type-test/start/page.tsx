'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import QuizProgress from '@/components/quiz/QuizProgress';
import { KIBBE_QUESTIONS } from '@/lib/quiz/questions';

type QuizAnswers = { [key: string]: string };

export default function QuizStartPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Load saved answers from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('quizAnswers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAnswers(parsed.answers || {});
        setCurrentStep(parsed.step || 0);
      } catch (e) {
        console.error('Failed to parse saved answers');
      }
    }
  }, []);

  // Save answers to localStorage
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(
        'quizAnswers',
        JSON.stringify({ answers, step: currentStep })
      );
    }
  }, [answers, currentStep]);

  const currentQuestion = KIBBE_QUESTIONS[currentStep];
  const isLastQuestion = currentStep === KIBBE_QUESTIONS.length - 1;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });

    if (isLastQuestion) {
      setShowLeadCapture(true);
    } else {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 200);
    }
  };

  const handleBack = () => {
    if (showLeadCapture) {
      setShowLeadCapture(false);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !phone || !consent) {
      setError('Bitte fülle alle Pflichtfelder aus');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          email,
          phone,
          consent,
          newsletter,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ein Fehler ist aufgetreten');
      }

      // Clear localStorage
      localStorage.removeItem('quizAnswers');

      // Redirect to success page
      router.push('/kibbe-body-type-test/erfolg');
    } catch (err: any) {
      setError(err.message || 'Ein Fehler ist aufgetreten');
      setIsSubmitting(false);
    }
  };

  if (showLeadCapture) {
    return (
      <div className="min-h-screen section-padding bg-business-cream">
        <div className="container-custom max-w-2xl">
          <Card className="p-8">
            <h1 className="text-h2 mb-4">Fast geschafft!</h1>
            <p className="text-brand-secondary mb-8">
              Um dein persönliches Ergebnis zu erhalten, benötigen wir noch ein paar Informationen von dir.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-brand-primary mb-2">
                  E-Mail-Adresse *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-primary mb-2">
                  Telefonnummer *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 mr-3"
                    required
                  />
                  <span className="text-sm">
                    Ich stimme der Verarbeitung meiner Daten gemäß{' '}
                    <a href="/datenschutz" className="text-brand-accent hover:underline" target="_blank">
                      Datenschutzerklärung
                    </a>{' '}
                    zu und bin damit einverstanden, dass mir meine Analyse per E-Mail zugesendet wird. *
                  </span>
                </label>
              </div>

              <div>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm">
                    Ich möchte zusätzlich Styling-Tipps und Angebote per E-Mail erhalten (optional)
                  </span>
                </label>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleBack}
                  disabled={isSubmitting}
                >
                  Zurück
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Wird gesendet...' : 'Ergebnis erhalten'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-padding bg-business-cream">
      <div className="container-custom max-w-2xl">
        <QuizProgress
          current={currentStep + 1}
          total={KIBBE_QUESTIONS.length}
        />

        <Card className="p-8">
          {currentQuestion.section && (
            <div className="text-sm text-brand-accent font-semibold mb-2">
              {currentQuestion.section}
            </div>
          )}

          <h2 className="text-h3 mb-8">{currentQuestion.text}</h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full text-left px-6 py-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-brand-accent bg-brand-accent bg-opacity-10'
                      : 'border-gray-200 hover:border-brand-accent hover:bg-gray-50'
                  }`}
                >
                  <span className="font-semibold text-brand-accent mr-3">
                    {option.value}
                  </span>
                  {option.text}
                </button>
              );
            })}
          </div>

          {currentStep > 0 && (
            <div className="mt-6">
              <Button variant="secondary" onClick={handleBack}>
                Zurück
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
