'use client';

import dynamic from 'next/dynamic';
import FirstImpressionForm from '@/components/first-impression/FirstImpressionForm';

const AnalyseRail = dynamic(
  () => import('@/components/first-impression/AnalyseRail'),
  { ssr: false }
);

const dimensions = [
  'Kompetenz', 'Professionalität', 'Führungswirkung',
  'Vertrauenswürdigkeit', 'Modernität', 'Authentizität',
  'Klarheit', 'Stilkonsistenz', 'Passung zur beruflichen Rolle',
];

export default function ErsterEindruckPage() {
  const scrollToForm = () => {
    const el = document.getElementById('analyseForm');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="analyse-page">
      <AnalyseRail />

      <main className="analyse-shell">
        <div className="analyse-wrap">

          {/* Hero */}
          <header className="analyse-hero">
            <p className="analyse-eyebrow">BusinessStylist® Methode · Phase 01</p>

            <h1 className="analyse-hero__title">
              Der erste Eindruck entsteht in Sekunden.
              Deine Kompetenz braucht länger.
              <em>Business First Impression Analyse™</em>
            </h1>

            <p className="analyse-hero__lede">
              Jeden Tag senden wir berufliche Signale — oft, ohne es bewusst wahrzunehmen.
              Diese Analyse zeigt dir, welche.
            </p>

            <button onClick={scrollToForm} className="analyse-cta" type="button">
              Analyse starten →
            </button>

            <div className="analyse-hero__meta">
              <span className="analyse-eyebrow">Kostenfrei</span>
              <span className="analyse-eyebrow">12 Minuten</span>
              <span className="analyse-eyebrow">Persönliche Auswertung</span>
            </div>
          </header>

          {/* Das Problem */}
          <section className="analyse-section analyse-section--problem">
            <div className="analyse-section__accent-line" />
            <blockquote className="analyse-blockquote">
              Leistung überzeugt. Wirkung entscheidet, ob deine Leistung gesehen wird.
            </blockquote>
            <div className="analyse-fields">
              <p className="analyse-lede">
                Du kennst das: Die Kollegin, die fachlich weniger bringt, bekommt im Meeting mehr Raum.
                Die Beförderung geht an jemanden, der souveräner wirkte — nicht kompetenter war.
              </p>
              <p className="analyse-lede">
                Das liegt nicht an dir. Es liegt an der Lücke zwischen dem, was du kannst,
                und dem, was andere in den ersten Sekunden wahrnehmen.
              </p>
              <p className="analyse-lede">
                Diese Lücke lässt sich schließen — bewusst, strategisch und ohne dich zu verbiegen.
              </p>
            </div>
          </section>

          {/* Die Haltung */}
          <section className="analyse-section">
            <blockquote className="analyse-blockquote analyse-blockquote--centered">
              Kleidung macht dich nicht kompetenter. Sie macht deine Kompetenz sichtbar.
            </blockquote>
            <p className="analyse-statement">
              Diese Analyse bewertet nicht dich als Person, sondern ausschließlich die Wirkung
              deines aktuellen Business-Auftritts.
            </p>
          </section>

          {/* Was analysiert wird */}
          <section className="analyse-section">
            <div className="analyse-section__head">
              <span className="analyse-section__num" />
              <h2 className="analyse-section__title">Neun Dimensionen deiner Wirkung</h2>
            </div>
            <div className="analyse-dimensions">
              {dimensions.map((dim) => (
                <div key={dim} className="analyse-dimension">{dim}</div>
              ))}
            </div>
            <div className="analyse-score-preview">
              <p className="analyse-field__label">Business First Impression Score™</p>
              <div className="analyse-score-bar">
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} className="analyse-score-bar__seg" />
                ))}
              </div>
              <div className="analyse-scale__legend">
                <span>0</span>
                <span>100</span>
              </div>
            </div>
          </section>

          {/* Was du bekommst */}
          <section className="analyse-section">
            <div className="analyse-section__head">
              <span className="analyse-section__num" />
              <h2 className="analyse-section__title">Was du bekommst</h2>
            </div>
            <div className="analyse-fields">
              <ul className="analyse-benefits">
                <li>Deinen Business First Impression Score™</li>
                <li>Deinen stärksten Wirkungsbereich und dein größtes Entwicklungspotenzial</li>
                <li>Einen konkreten Optimierungstipp, den du sofort umsetzen kannst</li>
              </ul>
            </div>
          </section>

          {/* Wer analysiert */}
          <section className="analyse-section">
            <div className="analyse-section__head">
              <span className="analyse-section__num" />
              <h2 className="analyse-section__title">Wer analysiert</h2>
            </div>
            <div className="analyse-fields analyse-who">
              <div className="analyse-portrait">
                <img src="/anika-schmitz.jpg" alt="Anika Schmitz, BusinessStylist®" />
              </div>
              <div>
                <p className="analyse-field__label">Anika Schmitz, BusinessStylist®</p>
                <blockquote className="analyse-quote">
                  Ich zeige Frauen nicht einfach, was sie anziehen sollen. Ich entwickle mit der
                  BusinessStylist®-Methode einen Business-Auftritt, der ihre Kompetenz sichtbar macht.
                </blockquote>
              </div>
            </div>
          </section>

          {/* Transition into form */}
          <div className="analyse-transition">
            <div className="analyse-transition__line" />
            <span className="analyse-eyebrow">Phase 01 · DEFINE™</span>
            <p className="analyse-transition__text">Beginnen wir mit dem, was du erreichen willst.</p>
          </div>

          {/* The Form */}
          <FirstImpressionForm />

          {/* Footer */}
          <footer className="analyse-foot">
            <div className="analyse-foot__inner">
              <div>
                <img
                  src="/businessstylist-logo-sml.png"
                  alt="BusinessStylist®"
                  className="analyse-foot__logo"
                />
                <p className="analyse-eyebrow">Anika Schmitz</p>
              </div>
              <p className="analyse-foot__claim">Wirkung vor Worten.</p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
