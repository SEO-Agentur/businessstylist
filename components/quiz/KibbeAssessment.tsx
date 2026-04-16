'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { KIBBE_QUESTIONS } from '@/lib/quiz/questions';
import { calculateScores, determineKibbeType, getKibbeTypeInfo, KibbeType } from '@/lib/quiz/scoring';

const STORAGE_KEY = 'lookbook_kibbe_assessment';

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

interface KibbeAssessmentProps {
  onTypeSelected: (type: string, displayName: string) => void;
}

export default function KibbeAssessment({ onTypeSelected }: KibbeAssessmentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ type: KibbeType; displayName: string; description: string } | null>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers) setAnswers(parsed.answers);
        if (typeof parsed.step === 'number') setCurrentStep(parsed.step);
      }
    } catch {
    }
  }, []);

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, step: currentStep }));
      } catch {
      }
    }
  }, [answers, currentStep]);

  const currentQuestion = KIBBE_QUESTIONS[currentStep];
  const totalQuestions = KIBBE_QUESTIONS.length;
  const isLastQuestion = currentStep === totalQuestions - 1;
  const progressPercent = (currentStep / totalQuestions) * 100;

  const scrollToQuestion = () => {
    setTimeout(() => {
      questionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      const scores = calculateScores(newAnswers);
      const type = determineKibbeType(scores);
      const info = getKibbeTypeInfo(type);
      const displayName = KIBBE_TYPE_DISPLAY[type];
      setResult({ type, displayName, description: info.description });
      sessionStorage.removeItem(STORAGE_KEY);
    } else {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        scrollToQuestion();
      }, 180);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      scrollToQuestion();
    }
  };

  const handleConfirm = () => {
    if (result) {
      onTypeSelected(result.type, result.displayName);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  if (result) {
    return (
      <div className="space-y-6">
        <div className="text-center py-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C9A96E]/20 mb-4">
            <svg className="w-8 h-8 text-[#C9A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-sm text-[#8A9AB5] mb-1">Dein Stil-Profil</p>
          <h3 className="text-2xl font-serif font-semibold text-white mb-3">{result.displayName}</h3>
          <p className="text-[#8A9AB5] text-sm leading-relaxed max-w-sm mx-auto">{result.description}</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <p className="text-sm text-[#8A9AB5] text-center">
            Für eine vertiefte Analyse mit Styling-Tipps:{' '}
            <Link href="/kibbe-body-type-test" className="text-[#C9A96E] hover:underline">
              Zum ausführlichen Kibbe-Test →
            </Link>
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="py-3 px-4 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors flex-shrink-0"
          >
            Neu starten
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-4 rounded-lg bg-[#C9A96E] text-[#0D1B2E] text-sm font-semibold hover:bg-[#D4B87A] transition-colors"
          >
            Lookbook für Deinen Typ sichern – 29 €
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={questionRef} className="space-y-5">
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-[#8A9AB5]">
          <span>Frage {currentStep + 1} von {totalQuestions}</span>
          <span>ca. 4–5 Minuten</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C9A96E] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <p className="text-xs text-[#8A9AB5] italic">
        Dein persönliches Stil-Profil – beantworte alle 19 Fragen, um Deinen Kibbe-Typ zu ermitteln.
      </p>

      <div>
        {currentQuestion.section && (
          <p className="text-xs font-semibold text-[#C9A96E] uppercase tracking-wider mb-1.5">
            {currentQuestion.section}
          </p>
        )}
        <p className="text-base font-medium text-white leading-snug">
          {currentQuestion.text}
        </p>
      </div>

      <div className="space-y-2">
        {currentQuestion.options.map((option) => {
          const isSelected = answers[currentQuestion.id] === option.value;
          return (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${
                isSelected
                  ? 'border-[#C9A96E] bg-[#C9A96E]/10 text-white'
                  : 'border-white/10 text-[#8A9AB5] hover:border-[#C9A96E]/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="font-semibold text-[#C9A96E] mr-2">{option.value})</span>
              {option.text}
            </button>
          );
        })}
      </div>

      {currentStep > 0 && (
        <button
          onClick={handleBack}
          className="text-sm text-[#8A9AB5] hover:text-white transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Zurück
        </button>
      )}
    </div>
  );
}
