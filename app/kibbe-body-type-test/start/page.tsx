'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import QuizProgress from '@/components/quiz/QuizProgress';
import LeadMagnetForm from '@/components/kibbe/LeadMagnetForm';
import { KIBBE_QUESTIONS } from '@/lib/quiz/questions';
import { calculateScores, determineKibbeType, getKibbeTypeInfo, KibbeType } from '@/lib/quiz/scoring';

type QuizAnswers = { [key: string]: string };

const KIBBE_TYPE_TO_SLUG: Record<KibbeType, string> = {
  DRAMATIC: 'dramatic',
  SOFT_DRAMATIC: 'soft-dramatic',
  FLAMBOYANT_NATURAL: 'flamboyant-natural',
  NATURAL: 'natural',
  SOFT_NATURAL: 'soft-natural',
  DRAMATIC_CLASSIC: 'dramatic-classic',
  CLASSIC: 'classic',
  SOFT_CLASSIC: 'soft-classic',
  FLAMBOYANT_GAMINE: 'flamboyant-gamine',
  GAMINE: 'gamine',
  SOFT_GAMINE: 'soft-gamine',
  ROMANTIC: 'romantic',
  THEATRICAL_ROMANTIC: 'theatrical-romantic',
};

const KIBBE_TYPE_DISPLAY: Record<KibbeType, string> = {
  DRAMATIC: 'Dramatic',
  SOFT_DRAMATIC: 'Soft Dramatic',
  FLAMBOYANT_NATURAL: 'Flamboyant Natural',
  NATURAL: 'Natural',
  SOFT_NATURAL: 'Soft Natural',
  DRAMATIC_CLASSIC: 'Dramatic Classic',
  CLASSIC: 'Classic',
  SOFT_CLASSIC: 'Soft Classic',
  FLAMBOYANT_GAMINE: 'Flamboyant Gamine',
  GAMINE: 'Gamine',
  SOFT_GAMINE: 'Soft Gamine',
  ROMANTIC: 'Romantic',
  THEATRICAL_ROMANTIC: 'Theatrical Romantic',
};

export default function QuizStartPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [result, setResult] = useState<{
    type: KibbeType;
    slug: string;
    displayName: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('quizAnswers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAnswers(parsed.answers || {});
        setCurrentStep(parsed.step || 0);
      } catch {
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('quizAnswers', JSON.stringify({ answers, step: currentStep }));
    }
  }, [answers, currentStep]);

  const currentQuestion = KIBBE_QUESTIONS[currentStep];
  const isLastQuestion = currentStep === KIBBE_QUESTIONS.length - 1;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      const scores = calculateScores(newAnswers);
      const type = determineKibbeType(scores);
      const info = getKibbeTypeInfo(type);
      const displayName = KIBBE_TYPE_DISPLAY[type];
      const slug = KIBBE_TYPE_TO_SLUG[type];
      setResult({ type, slug, displayName, description: info.description });
      localStorage.removeItem('quizAnswers');
    } else {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 200);
    }
  };

  const handleBack = () => {
    if (result) {
      setResult(null);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
    localStorage.removeItem('quizAnswers');
  };

  if (result) {
    return (
      <div className="min-h-screen section-padding bg-business-cream">
        <div className="container-custom max-w-2xl">
          <Card className="p-8 md:p-10 mb-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-brand-secondary font-medium mb-1">Dein Kibbe-Typ ist</p>
              <h1 className="text-display-1 font-serif text-brand-primary mb-3">{result.displayName}</h1>
              <p className="text-brand-secondary leading-relaxed max-w-sm mx-auto">{result.description}</p>
            </div>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-brand-secondary uppercase tracking-wider">Kostenloses Profil</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <LeadMagnetForm kibbeType={result.slug} kibbeTypeDisplay={result.displayName} />

            <div className="mt-6 pt-6 border-t border-gray-100 flex gap-3 justify-center">
              <button
                onClick={handleReset}
                className="text-sm text-brand-secondary hover:text-brand-primary transition-colors"
              >
                Test neu starten
              </button>
              <span className="text-gray-300">·</span>
              <Link
                href={`/stiltyp/${result.slug}`}
                className="text-sm text-brand-accent hover:underline"
              >
                Mehr über {result.displayName} →
              </Link>
            </div>
          </Card>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <p className="text-sm text-brand-secondary text-center mb-4">
              Willst Du Dein Lookbook direkt kaufen?
            </p>
            <Link href="/lookbook">
              <Button className="w-full" variant="primary">
                Personalisertes Lookbook – 29 €
              </Button>
            </Link>
          </div>
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
