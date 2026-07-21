'use client';

import { useState, FormEvent } from 'react';

export default function FirstImpressionForm() {
  const [wirkungSelected, setWirkungSelected] = useState<string[]>([]);
  const [zufriedenheit, setZufriedenheit] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const MAX_WIRKUNG = 3;

  const handleWirkungChange = (value: string, checked: boolean) => {
    if (checked && wirkungSelected.length < MAX_WIRKUNG) {
      setWirkungSelected([...wirkungSelected, value]);
    } else if (!checked) {
      setWirkungSelected(wirkungSelected.filter((v) => v !== value));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);

    const situationen: string[] = [];
    formData.getAll('situationen').forEach((v) => situationen.push(v as string));

    const payload = {
      vorname: formData.get('vorname') as string,
      email: formData.get('email') as string,
      alter_jahre: formData.get('alter') ? Number(formData.get('alter')) : null,
      beruf: (formData.get('beruf') as string) || undefined,
      branche: (formData.get('branche') as string) || undefined,
      position: (formData.get('position') as string) || undefined,
      ziel: (formData.get('ziel') as string) || undefined,
      wirkung: wirkungSelected.length > 0 ? wirkungSelected : undefined,
      satz: (formData.get('satz') as string) || undefined,
      stil: (formData.get('stil') as string) || undefined,
      herausforderung: (formData.get('herausforderung') as string) || undefined,
      situationen: situationen.length > 0 ? situationen : undefined,
      zufriedenheit: zufriedenheit,
      haeufigkeit: (formData.get('haeufigkeit') as string) || undefined,
      spiegelt: (formData.get('spiegelt') as string) || undefined,
    };

    try {
      const res = await fetch('/api/first-impression/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Fehler beim Absenden');
      }

      setIsSuccess(true);
    } catch {
      setError('Beim Absenden ist ein Fehler aufgetreten. Bitte versuche es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="analyse-section" style={{ paddingTop: 'clamp(56px,8vh,88px)', paddingBottom: 'clamp(56px,8vh,88px)' }}>
        <div className="analyse-section__head">
          <span className="analyse-section__num">✓</span>
          <h2 className="analyse-section__title">Analyse erhalten</h2>
        </div>
        <div className="analyse-fields">
          <p className="analyse-lede">
            Vielen Dank für deine Angaben. Du erhältst deinen persönlichen Business First Impression Score™
            und deine Auswertung per E-Mail.
          </p>
          <p style={{ fontSize: '14px', color: 'var(--fi-ink-faint)' }}>
            Auswertung innerhalb von 48 Stunden.
          </p>
        </div>
      </div>
    );
  }

  const wirkungOptions = [
    'Kompetent', 'Souverän', 'Führungsstark', 'Selbstbewusst',
    'Vertrauenswürdig', 'Nahbar', 'Modern', 'Elegant',
    'Kreativ', 'Authentisch', 'Innovativ', 'Strukturiert',
  ];

  const situationenOptions = [
    'Im Büro', 'Meetings', 'Kundentermine', 'Präsentationen',
    'Bewerbungsgespräche', 'Networking', 'Social Media', 'Vorträge',
  ];

  return (
    <form id="analyseForm" onSubmit={handleSubmit} noValidate>
      {/* 01 Persönliche Angaben */}
      <section className="analyse-section">
        <div className="analyse-section__head">
          <span className="analyse-section__num">01</span>
          <h2 className="analyse-section__title">Persönliche Angaben</h2>
        </div>
        <div className="analyse-fields">
          <div className="analyse-grid-2">
            <div>
              <label className="analyse-field__label" htmlFor="vorname">Vorname</label>
              <input className="analyse-input" type="text" id="vorname" name="vorname" autoComplete="given-name" required />
            </div>
            <div>
              <label className="analyse-field__label" htmlFor="email">E-Mail-Adresse</label>
              <input className="analyse-input" type="email" id="email" name="email" autoComplete="email" required />
            </div>
          </div>
          <div className="analyse-grid-3">
            <div>
              <label className="analyse-field__label" htmlFor="alter">Alter</label>
              <input className="analyse-input" type="number" id="alter" name="alter" min={16} max={99} inputMode="numeric" placeholder="Jahre" />
            </div>
            <div>
              <label className="analyse-field__label" htmlFor="beruf">Beruf</label>
              <input className="analyse-input" type="text" id="beruf" name="beruf" />
            </div>
            <div>
              <label className="analyse-field__label" htmlFor="branche">Branche</label>
              <input className="analyse-input" type="text" id="branche" name="branche" />
            </div>
          </div>
          <fieldset className="analyse-fieldset">
            <legend className="analyse-field__label">Aktuelle Position</legend>
            <div className="analyse-choices">
              {['Berufseinsteigerin', 'Angestellte', 'Teamleitung', 'Führungskraft', 'Selbstständig', 'Unternehmerin', 'Sonstiges'].map((opt) => (
                <label key={opt} className="analyse-choice">
                  <input type="radio" name="position" value={opt} />
                  <span className="analyse-choice__box">{opt}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </section>

      {/* 02 Karriere */}
      <section className="analyse-section">
        <div className="analyse-section__head">
          <span className="analyse-section__num">02</span>
          <h2 className="analyse-section__title">Deine Karriere</h2>
          <p className="analyse-section__hint">Wo möchtest du beruflich in den nächsten zwei bis fünf Jahren stehen?</p>
        </div>
        <div className="analyse-fields">
          <fieldset className="analyse-fieldset">
            <legend className="analyse-field__label">Dein berufliches Ziel</legend>
            <div className="analyse-choices analyse-choices--stack">
              {['Fachkarriere', 'Teamleitung', 'Führungsposition', 'Geschäftsführung', 'Unternehmerin', 'Noch nicht sicher'].map((opt) => (
                <label key={opt} className="analyse-choice">
                  <input type="radio" name="ziel" value={opt} />
                  <span className="analyse-choice__box">{opt === 'Noch nicht sicher' ? 'Ich bin mir noch nicht sicher' : opt}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </section>

      {/* 03 Gewünschte Wirkung */}
      <section className="analyse-section">
        <div className="analyse-section__head">
          <span className="analyse-section__num">03</span>
          <h2 className="analyse-section__title">Deine gewünschte Wirkung</h2>
          <p className="analyse-section__hint">Welche drei Eigenschaften sollen andere spontan mit dir verbinden?</p>
        </div>
        <div className="analyse-fields">
          <fieldset className="analyse-fieldset">
            <div className="analyse-counter">
              <legend className="analyse-field__label">Wähle genau drei</legend>
              <span
                className="analyse-counter__state"
                data-full={wirkungSelected.length >= MAX_WIRKUNG ? 'true' : 'false'}
              >
                {wirkungSelected.length} von {MAX_WIRKUNG}
              </span>
            </div>
            <div className="analyse-choices">
              {wirkungOptions.map((opt) => (
                <label key={opt} className="analyse-choice">
                  <input
                    type="checkbox"
                    name="wirkung"
                    value={opt}
                    checked={wirkungSelected.includes(opt)}
                    disabled={!wirkungSelected.includes(opt) && wirkungSelected.length >= MAX_WIRKUNG}
                    onChange={(e) => handleWirkungChange(opt, e.target.checked)}
                  />
                  <span className="analyse-choice__box">{opt}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <label className="analyse-field__label" htmlFor="satz">
              Vervollständige diesen Satz
              <span className="analyse-field__sub">Ich möchte, dass Menschen nach einem Meeting über mich sagen: ...</span>
            </label>
            <textarea className="analyse-textarea" id="satz" name="satz" placeholder="Sie wirkt ..." />
          </div>
        </div>
      </section>

      {/* 04 Aktuelle Situation */}
      <section className="analyse-section">
        <div className="analyse-section__head">
          <span className="analyse-section__num">04</span>
          <h2 className="analyse-section__title">Deine aktuelle Situation</h2>
        </div>
        <div className="analyse-fields">
          <div>
            <label className="analyse-field__label" htmlFor="stil">Wie würdest du deinen aktuellen Business-Stil beschreiben?</label>
            <textarea className="analyse-textarea" id="stil" name="stil" />
          </div>
          <div>
            <label className="analyse-field__label" htmlFor="herausforderung">Was ist aktuell deine größte Herausforderung beim Thema Business-Outfit?</label>
            <textarea className="analyse-textarea" id="herausforderung" name="herausforderung" />
          </div>
          <fieldset className="analyse-fieldset">
            <legend className="analyse-field__label">
              In welchen Situationen möchtest du besonders überzeugen?
              <span className="analyse-field__sub">Mehrfachauswahl möglich</span>
            </legend>
            <div className="analyse-choices">
              {situationenOptions.map((opt) => (
                <label key={opt} className="analyse-choice">
                  <input type="checkbox" name="situationen" value={opt} />
                  <span className="analyse-choice__box">{opt}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </section>

      {/* 05 Selbsteinschätzung */}
      <section className="analyse-section">
        <div className="analyse-section__head">
          <span className="analyse-section__num">05</span>
          <h2 className="analyse-section__title">Deine Selbsteinschätzung</h2>
        </div>
        <div className="analyse-fields">
          <fieldset className="analyse-fieldset">
            <legend className="analyse-field__label">Wie zufrieden bist du aktuell mit deiner Business-Wirkung?</legend>
            <div className="analyse-scale">
              <div className="analyse-scale__bar">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => (
                  <label
                    key={val}
                    className={`analyse-scale__seg${zufriedenheit !== null && val <= zufriedenheit ? ' is-filled' : ''}${val === zufriedenheit ? ' is-current' : ''}`}
                  >
                    <input
                      type="radio"
                      name="zufriedenheit"
                      value={val}
                      onChange={() => setZufriedenheit(val)}
                    />
                    <span>{val}</span>
                  </label>
                ))}
              </div>
              <div className="analyse-scale__legend">
                <span>Gar nicht zufrieden</span>
                <span>Sehr zufrieden</span>
              </div>
            </div>
          </fieldset>
          <fieldset className="analyse-fieldset">
            <legend className="analyse-field__label">
              Wie häufig denkst du morgens
              <span className="analyse-field__sub">&ldquo;Ich weiß nicht, was ich heute anziehen soll.&rdquo;</span>
            </legend>
            <div className="analyse-choices">
              {['Nie', 'Selten', 'Manchmal', 'Häufig', 'Fast täglich'].map((opt) => (
                <label key={opt} className="analyse-choice">
                  <input type="radio" name="haeufigkeit" value={opt} />
                  <span className="analyse-choice__box">{opt}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="analyse-fieldset">
            <legend className="analyse-field__label">Spiegelt dein aktueller Business-Auftritt deine Kompetenz wider?</legend>
            <div className="analyse-choices">
              {['Ja', 'Teilweise', 'Nein'].map((opt) => (
                <label key={opt} className="analyse-choice">
                  <input type="radio" name="spiegelt" value={opt} />
                  <span className="analyse-choice__box">{opt}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </section>

      {/* 06 Fotos */}
      <section className="analyse-section">
        <div className="analyse-section__head">
          <span className="analyse-section__num">06</span>
          <h2 className="analyse-section__title">Deine Fotos</h2>
          <p className="analyse-section__hint">Ohne Foto kann ich deine Wirkung nicht analysieren. Achte auf gute Ausleuchtung und darauf, dass dein Outfit vollständig zu erkennen ist.</p>
        </div>
        <div className="analyse-fields">
          <div className="analyse-upload">
            <p className="analyse-upload__title">Ganzkörperfoto in deinem typischen Business-Outfit</p>
            <p className="analyse-upload__hint">Erforderlich · JPG oder PNG · Ein zweites Outfit, das du regelmäßig trägst, ist willkommen.</p>
            <input type="file" name="fotos" accept="image/*" multiple />
          </div>
        </div>
      </section>

      {/* Submit */}
      <div className="analyse-close">
        {error && (
          <p className="analyse-error">{error}</p>
        )}
        <button className="analyse-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Wird gesendet...' : 'Analyse absenden'}
          {!isSubmitting && <span className="analyse-submit__arrow" aria-hidden="true">→</span>}
        </button>
        <p className="analyse-close__note">
          Nach der Auswertung erhältst du deinen persönlichen Business First Impression Score™,
          deinen stärksten Wirkungsbereich, dein größtes Entwicklungspotenzial und einen
          Optimierungstipp, den du sofort umsetzen kannst.
        </p>
      </div>
    </form>
  );
}
