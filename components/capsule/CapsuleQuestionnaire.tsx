'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export interface CapsuleAnswers {
  purpose: string;
  purposeCustom: string;
  styles: string[];
  stylesCustom: string;
  fabrics: string[];
  fabricsCustom: string;
  brands: string;
  colorsLike: string;
  colorsAvoid: string;
  height: string;
  profession: string;
  size: string;
}

const INITIAL_ANSWERS: CapsuleAnswers = {
  purpose: '',
  purposeCustom: '',
  styles: [],
  stylesCustom: '',
  fabrics: [],
  fabricsCustom: '',
  brands: '',
  colorsLike: '',
  colorsAvoid: '',
  height: '',
  profession: '',
  size: '',
};

const PURPOSE_OPTIONS = [
  'Beruf / Business',
  'Alltag / Freizeit',
  'Reisen',
  'Besondere Anlaesse',
  'Eine Mischung aus mehreren',
];

const STYLE_OPTIONS = [
  'Klassisch & zeitlos',
  'Minimalistisch',
  'Elegant',
  'Sportlich-leger',
  'Modern',
  'Romantisch',
];

const FABRIC_OPTIONS = [
  'Baumwolle',
  'Leinen',
  'Seide',
  'Wolle',
  'Kaschmir',
  'Nur Naturfasern',
];

interface Props {
  onComplete: (answers: CapsuleAnswers) => void;
}

export default function CapsuleQuestionnaire({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<CapsuleAnswers>(INITIAL_ANSWERS);

  const totalSteps = 8;
  const progress = ((step + 1) / totalSteps) * 100;

  const canProceed = (): boolean => {
    switch (step) {
      case 0: return !!answers.purpose;
      case 1: return answers.styles.length > 0;
      case 2: return answers.fabrics.length > 0;
      case 3: return answers.brands.trim().length > 0;
      case 4: return answers.colorsLike.trim().length > 0;
      case 5: return answers.height.trim().length > 0;
      case 6: return answers.profession.trim().length > 0;
      case 7: return answers.size.trim().length > 0;
      default: return false;
    }
  };

  const next = () => {
    if (step < totalSteps - 1) setStep(step + 1);
    else onComplete(answers);
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const toggleMulti = (field: 'styles' | 'fabrics', value: string) => {
    setAnswers((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-brand-secondary mb-2">
          <span>Frage {step + 1} von {totalSteps}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="min-h-[320px]">
        {step === 0 && (
          <StepWrapper
            title="Wofuer wird die Capsule Wardrobe hauptsaechlich benutzt?"
            subtitle="Waehle die Hauptanwendung. Ergaenze gerne im Freitextfeld."
          >
            <div className="space-y-3">
              {PURPOSE_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    answers.purpose === opt
                      ? 'border-brand-accent bg-brand-accent/5'
                      : 'border-gray-200 hover:border-brand-accent/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="purpose"
                    className="sr-only"
                    checked={answers.purpose === opt}
                    onChange={() => setAnswers({ ...answers, purpose: opt })}
                  />
                  <span className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                    answers.purpose === opt ? 'border-brand-accent' : 'border-gray-300'
                  }`}>
                    {answers.purpose === opt && <span className="w-2.5 h-2.5 rounded-full bg-brand-accent" />}
                  </span>
                  <span className="text-brand-primary">{opt}</span>
                </label>
              ))}
            </div>
            <textarea
              placeholder="Ergaenzende Hinweise (optional)..."
              value={answers.purposeCustom}
              onChange={(e) => setAnswers({ ...answers, purposeCustom: e.target.value })}
              rows={2}
              className="w-full mt-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent resize-none text-sm"
            />
          </StepWrapper>
        )}

        {step === 1 && (
          <StepWrapper
            title="Welche Stile magst du?"
            subtitle="Waehle einen oder mehrere Stile."
          >
            <div className="grid grid-cols-2 gap-3">
              {STYLE_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    answers.styles.includes(opt)
                      ? 'border-brand-accent bg-brand-accent/5'
                      : 'border-gray-200 hover:border-brand-accent/40'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={answers.styles.includes(opt)}
                    onChange={() => toggleMulti('styles', opt)}
                  />
                  <span className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center ${
                    answers.styles.includes(opt) ? 'border-brand-accent bg-brand-accent' : 'border-gray-300'
                  }`}>
                    {answers.styles.includes(opt) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className="text-brand-primary text-sm">{opt}</span>
                </label>
              ))}
            </div>
            <textarea
              placeholder="Weitere Stilvorlieben (optional)..."
              value={answers.stylesCustom}
              onChange={(e) => setAnswers({ ...answers, stylesCustom: e.target.value })}
              rows={2}
              className="w-full mt-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent resize-none text-sm"
            />
          </StepWrapper>
        )}

        {step === 2 && (
          <StepWrapper
            title="Welche Fasern und Stoffe magst du?"
            subtitle="Waehle einen oder mehrere Stoffe."
          >
            <div className="grid grid-cols-2 gap-3">
              {FABRIC_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    answers.fabrics.includes(opt)
                      ? 'border-brand-accent bg-brand-accent/5'
                      : 'border-gray-200 hover:border-brand-accent/40'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={answers.fabrics.includes(opt)}
                    onChange={() => toggleMulti('fabrics', opt)}
                  />
                  <span className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center ${
                    answers.fabrics.includes(opt) ? 'border-brand-accent bg-brand-accent' : 'border-gray-300'
                  }`}>
                    {answers.fabrics.includes(opt) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className="text-brand-primary text-sm">{opt}</span>
                </label>
              ))}
            </div>
            <textarea
              placeholder="Weitere Stoffvorlieben (optional)..."
              value={answers.fabricsCustom}
              onChange={(e) => setAnswers({ ...answers, fabricsCustom: e.target.value })}
              rows={2}
              className="w-full mt-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent resize-none text-sm"
            />
          </StepWrapper>
        )}

        {step === 3 && (
          <StepWrapper
            title="Welche Marken magst du?"
            subtitle="Nenne deine Lieblingsmarken oder die Preisklasse, in der du einkaufen moechtest."
          >
            <textarea
              placeholder="z. B. COS, Massimo Dutti, Arket, mittleres Preissegment..."
              value={answers.brands}
              onChange={(e) => setAnswers({ ...answers, brands: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent resize-none"
            />
          </StepWrapper>
        )}

        {step === 4 && (
          <StepWrapper
            title="Welche Farben magst du?"
            subtitle="Nenne deine Lieblingsfarben und Farben, die du vermeiden moechtest."
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-primary mb-2">Lieblingsfarben</label>
                <textarea
                  placeholder="z. B. Dunkelblau, Creme, Bordeaux, Olivgruen..."
                  value={answers.colorsLike}
                  onChange={(e) => setAnswers({ ...answers, colorsLike: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-primary mb-2">Farben, die du vermeiden moechtest (optional)</label>
                <textarea
                  placeholder="z. B. Neon, Orange, Gelb..."
                  value={answers.colorsAvoid}
                  onChange={(e) => setAnswers({ ...answers, colorsAvoid: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent resize-none"
                />
              </div>
            </div>
          </StepWrapper>
        )}

        {step === 5 && (
          <StepWrapper
            title="Was ist deine Groesse?"
            subtitle="Deine Koerpergroesse in cm."
          >
            <div className="max-w-xs">
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="z. B. 168"
                  value={answers.height}
                  onChange={(e) => setAnswers({ ...answers, height: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent text-lg"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-secondary">cm</span>
              </div>
            </div>
          </StepWrapper>
        )}

        {step === 6 && (
          <StepWrapper
            title="Was ist dein Beruf?"
            subtitle="Damit Anika die Garderobe passend zu deinem Arbeitsumfeld zusammenstellt."
          >
            <textarea
              placeholder="z. B. Unternehmensberaterin, Lehrerin, Freelancerin, Aerztin..."
              value={answers.profession}
              onChange={(e) => setAnswers({ ...answers, profession: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent resize-none"
            />
          </StepWrapper>
        )}

        {step === 7 && (
          <StepWrapper
            title="Was ist deine Konfektionsgroesse?"
            subtitle="Falls Ober- und Unterteil abweichen, gib gerne beides an."
          >
            <textarea
              placeholder="z. B. 38, oder: Oberteil 36 / Hose 40"
              value={answers.size}
              onChange={(e) => setAnswers({ ...answers, size: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent resize-none"
            />
          </StepWrapper>
        )}
      </div>

      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={back}
          className={`text-brand-secondary hover:text-brand-primary transition-colors font-medium ${
            step === 0 ? 'invisible' : ''
          }`}
        >
          Zurueck
        </button>
        <Button
          onClick={next}
          disabled={!canProceed()}
          size="lg"
        >
          {step === totalSteps - 1 ? 'Weiter zur Bestellung' : 'Weiter'}
        </Button>
      </div>
    </div>
  );
}

function StepWrapper({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-semibold text-brand-primary mb-2">{title}</h3>
      <p className="text-brand-secondary mb-6 text-sm">{subtitle}</p>
      {children}
    </div>
  );
}
