'use client';

import { useForm, ValidationError } from '@formspree/react';

const WIRKUNG_OPTIONS = [
  'Kompetent', 'Souverän', 'Modern', 'Vertrauenswürdig', 'Führungsstark',
  'Nahbar', 'Elegant', 'Authentisch', 'Kreativ', 'Innovativ',
  'Strukturiert', 'Durchsetzungsfähig', 'Ruhig', 'Offen',
];

const SITUATIONEN_OPTIONS = [
  'Meetings', 'Kundentermine', 'Präsentationen', 'Geschäftsreisen',
  'Networking', 'Events', 'Videokonferenzen',
];

const MATERIALIEN_OPTIONS = [
  'Baumwolle', 'Leinen', 'Wolle', 'Kaschmir', 'Seide', 'Tencel', 'Viskose', 'Denim',
];

const SCHUHE_OPTIONS = [
  'Loafer', 'Pumps', 'Slingbacks', 'Sneaker', 'Stiefeletten', 'Boots',
];

const PASSFORM_OPTIONS = [
  'Oversized', 'Locker', 'Gerade', 'Tailliert', 'Figurbetont', 'Unterschiedlich je nach Teil',
];

const PASSFORMPROBLEME_OPTIONS = [
  'Blazer an den Schultern', 'Ärmel zu lang', 'Hosen zu lang',
  'Hosen sitzen an der Taille nicht', 'Kleider passen selten',
];

const PRIORITAETEN_OPTIONS = [
  'Morgens schneller entscheiden', 'Weniger Fehlkäufe', 'Professioneller wirken',
  'Moderner wirken', 'Hochwertiger wirken', 'Mehr Selbstbewusstsein',
  'Nachhaltiger einkaufen', 'Weniger Kleidung besitzen', 'Mehr Kombinationen',
  'Eine klare Business-Garderobe',
];

export default function BusinessCapsuleQuestionnaire() {
  const [state, handleSubmit] = useForm('maqreaey');

  if (state.succeeded) {
    return (
      <div className="capsule-form">
        <div className="capsule-form__wrap">
          <div className="capsule-form__success">
            <div className="capsule-form__success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="capsule-form__success-title">Unterlagen erfolgreich versendet</h2>
            <p className="capsule-form__success-text">
              Vielen Dank! Anika hat deine Unterlagen erhalten und beginnt jetzt mit der Analyse
              deiner Business-Garderobe. Du erhältst deine individuelle Business Capsule Wardrobe
              innerhalb von 7–10 Werktagen per E-Mail.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="capsule-form">
      <div className="capsule-form__wrap">
        {/* Hero */}
        <header className="capsule-form__hero">
          <p className="capsule-form__eyebrow">BusinessStylist® Methode</p>
          <h1 className="capsule-form__title">
            Business Capsule<br />Wardrobe
            <em>Fragebogen</em>
          </h1>
          <p className="capsule-form__lede">
            Vielen Dank für deine Buchung. Damit ich deine persönliche Business Capsule
            Wardrobe™ entwickeln kann, brauche ich ein genaues Bild von deinem Berufsalltag,
            deiner Garderobe und deinen Zielen.
          </p>
          <p className="capsule-form__note">
            Nimm dir Zeit und antworte so ausführlich wie möglich. Je präziser deine Antworten,
            desto genauer wird deine Garderobenstrategie.
          </p>
          <div className="capsule-form__meta">
            <span className="capsule-form__eyebrow">7 Kapitel</span>
            <span className="capsule-form__eyebrow">Ca. 35 Minuten</span>
          </div>
        </header>

        {/* Scope */}
        <section className="capsule-form__scope">
          <p className="capsule-form__eyebrow">Das entsteht aus deinen Antworten</p>
          <div className="capsule-form__stats">
            <div className="capsule-form__stat">
              <span className="capsule-form__stat-value">25–35</span>
              <span className="capsule-form__stat-label">Teile in deiner Capsule</span>
            </div>
            <div className="capsule-form__stat">
              <span className="capsule-form__stat-value">80–100</span>
              <span className="capsule-form__stat-label">Outfit&shy;kombinationen</span>
            </div>
            <div className="capsule-form__stat">
              <span className="capsule-form__stat-value">90</span>
              <span className="capsule-form__stat-label">Tage Einkaufsfahrplan</span>
            </div>
          </div>
          <ul className="capsule-form__scope-list">
            <li>Deine komplette Business-Garderobe</li>
            <li>Saisonplanung über das ganze Jahr</li>
            <li>Keine Fehlkäufe mehr</li>
            <li>Priorisierte Einkaufsliste statt Bauchgefühl</li>
          </ul>
          <p className="capsule-form__pull">Einkauf nach Plan statt nach Gefühl.</p>
        </section>

        {/* Form */}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="hidden" name="_subject" value="Business Capsule Wardrobe – Neuer Fragebogen" />
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          {/* I. Person & Berufsalltag */}
          <Chapter num="I" title="Person & Berufsalltag" />

          <Section num="01" title="Persönliche Angaben">
            <div className="capsule-form__grid-2">
              <Field label="Vorname" name="vorname" required />
              <Field label="Nachname" name="nachname" required />
            </div>
            <div className="capsule-form__grid-2">
              <Field label="E-Mail-Adresse" name="email" type="email" required />
              <Field label="Unternehmen" name="unternehmen" />
            </div>
            <div className="capsule-form__grid-2">
              <Field label="Beruf" name="beruf" />
              <Field label="Position" name="position" />
            </div>
          </Section>

          <Section num="02" title="Dein Berufsalltag">
            <RadioGroup name="arbeitsort" label="Wo arbeitest du hauptsächlich?" options={['Büro', 'Homeoffice', 'Hybrid', 'Außendienst', 'Selbstständig']} />
            <CheckboxGroup name="situationen" label="Welche Situationen gehören regelmäßig zu deinem Arbeitsalltag?" hint="Mehrfachauswahl möglich" options={SITUATIONEN_OPTIONS} />
            <RadioStack name="dresscode" label="Welcher Dresscode gilt bei dir?" options={['Business Formal', 'Business Professional', 'Business Casual', 'Smart Casual', 'Kein fester Dresscode']} />
          </Section>

          <Section num="03" title="Deine Karriere">
            <TextArea name="pos_heute" label="Welche Position hast du aktuell?" />
            <TextArea name="pos_ziel" label="Wo möchtest du beruflich in den nächsten 2–3 Jahren stehen?" />
            <TextArea name="verantwortung" label="Welche Verantwortung möchtest du übernehmen?" />
          </Section>

          {/* II. Wirkung & Rückblick */}
          <Chapter num="II" title="Wirkung & Rückblick" />

          <Section num="04" title="Deine gewünschte Wirkung" hint="Wie möchtest du beruflich wahrgenommen werden?">
            <CheckboxGroup name="wirkung" label="Wähle bis zu fünf" options={WIRKUNG_OPTIONS} />
          </Section>

          <Section num="05" title="Rückblick auf deinen Business Style Check™">
            <TextArea name="erkenntnis" label="Welche Erkenntnis war für dich am wertvollsten?" />
            <TextArea name="umgesetzt" label="Was hast du seitdem bereits umgesetzt?" />
            <TextArea name="veraendert" label="Hat sich dein Ziel oder deine Situation verändert?" />
          </Section>

          {/* III. Garderobe & Farben */}
          <Chapter num="III" title="Garderobe & Farben" />

          <Section num="06" title="Dein aktueller Kleiderschrank">
            <ScaleField name="zufriedenheit" label="Wie zufrieden bist du aktuell mit deiner Business-Garderobe?" />
            <TextArea name="gefaellt" label="Was gefällt dir besonders?" />
            <TextArea name="stoert" label="Was stört dich?" />
            <TextArea name="taeglich" label="Welche Kleidungsstücke trägst du fast täglich?" />
            <TextArea name="ungetragen" label="Welche Teile hängen seit Jahren ungetragen im Schrank?" hint="Auch die Gründe interessieren mich, falls du sie kennst." />
          </Section>

          <Section num="07" title="Farben & Stil">
            <div className="capsule-form__grid-2">
              <Field label="Farben, die du gerne trägst" name="farben_gern" />
              <Field label="Farben, die du vermeidest" name="farben_meiden" />
            </div>
            <TextArea name="stil_beschreibung" label="Wie würdest du deinen aktuellen Stil beschreiben?" />
            <TextArea name="inspiration" label="Welche Frauen inspirieren dich stilistisch?" hint="Namen, LinkedIn-Profile, Pinterest oder Instagram" />
          </Section>

          {/* IV. Budget & Einkauf */}
          <Chapter num="IV" title="Budget & Einkauf" />

          <Section num="08" title="Dein Investitionsrahmen" hint="Danach richte ich deine Einkaufsliste und den 90-Tage-Fahrplan aus.">
            <BudgetLadder name="budget" label="Budget für den Aufbau deiner Business Capsule Wardrobe" />
            <RadioGroup name="preisklasse" label="Du kaufst bevorzugt" options={['Budget', 'Mittelklasse', 'Premium', 'Gemischt']} />
            <Field label="Welche Marken kaufst du aktuell?" name="marken_aktuell" />
            <Field label="Welche Marken passen dir besonders gut?" name="marken_passen" />
            <Field label="Welche Marken möchtest du gerne ausprobieren?" name="marken_neu" />
          </Section>

          {/* V. Passform & Details */}
          <Chapter num="V" title="Passform & Details" />

          <Section num="09" title="Passform & Größen" hint="Falls du bei einzelnen Teilen zwischen zwei Größen liegst, schreib beide hin.">
            <SizeGrid />
            <RadioGroup name="passform" label="Welche Passform bevorzugst du?" options={PASSFORM_OPTIONS} />
            <div className="capsule-form__grid-2">
              <TextArea name="betonen" label="Das möchtest du betonen" />
              <TextArea name="nicht_betonen" label="Das eher weniger" />
            </div>
            <CheckboxGroup name="passformprobleme" label="Hast du häufig Passformprobleme?" hint="Mehrfachauswahl möglich" options={PASSFORMPROBLEME_OPTIONS} />
          </Section>

          <Section num="10" title="Materialien">
            <CheckboxGroup name="materialien" label="Diese Materialien trägst du besonders gerne" hint="Mehrfachauswahl möglich" options={MATERIALIEN_OPTIONS} />
            <Field label="Welche Materialien vermeidest du?" name="mat_meiden" hint="Auch Unverträglichkeiten oder Pflegegründe sind hier wichtig." />
          </Section>

          <Section num="11" title="Schuhe & Accessoires">
            <CheckboxGroup name="schuhe" label="Welche Schuhe trägst du regelmäßig?" hint="Mehrfachauswahl möglich" options={SCHUHE_OPTIONS} />
            <Field label="Welche Tasche nutzt du im Berufsalltag?" name="tasche" />
            <RadioGroup name="schmuck" label="Trägst du Schmuck?" options={['Ja', 'Nein']} />
            <Field label="Falls ja — welchen?" name="schmuck_welcher" placeholder="z. B. filigrane Goldketten, Ohrstecker" />
          </Section>

          {/* VI. Fotos */}
          <Chapter num="VI" title="Fotos" />

          <Section num="12" title="Deine Garderobe in Bildern" hint="Auf Basis dieser Fotos entscheide ich, was bleibt, was ersetzt wird und was fehlt. Tageslicht, ganze Figur, Handy genügt.">
            <UploadField name="fotos_outfits" title="Outfitfotos" hint="8–10 aktuelle Business-Outfits, jeweils Ganzkörper." required />
            <UploadField name="fotos_einzelteile" title="Einzelteile" hint="Alle Blazer, Business-Hosen, Röcke, Kleider, Blusen, Shirts, Strick, Schuhe und Taschen." required />
            <UploadField name="fotos_schrank" title="Dein Business-Kleiderschrank" hint="Ein Blick in den geöffneten Schrank. Sehr hilfreich, um Menge und Struktur einzuschätzen." />
            <UploadField name="fotos_inspiration" title="Inspiration" hint="Screenshots, Pinterest-Board oder Outfit-Inspirationen, die dir gefallen." />
            <Field label="Link zu deinem Pinterest-Board" name="pinterest" type="url" placeholder="https://" hint="Optional" />
          </Section>

          {/* VII. Deine Ziele */}
          <Chapter num="VII" title="Deine Ziele" />

          <Section num="13" title="Was möchtest du unbedingt behalten?" hint="Diese Teile fasse ich nicht an — sie werden Teil deiner Capsule.">
            <TextArea name="behalten" label="Kleidungsstücke, die du auf jeden Fall weiter tragen möchtest" />
          </Section>

          <Section num="14" title="Was möchtest du verändern?">
            <TextArea name="veraendern" label="Deine Antwort" />
          </Section>

          <Section num="15" title="Was ist dir am wichtigsten?">
            <CheckboxGroup name="prioritaeten" label="Deine Prioritäten" hint="Mehrfachauswahl möglich" options={PRIORITAETEN_OPTIONS} />
          </Section>

          <Section num="16" title="Deine No-Gos">
            <TextArea name="niemals" label="Gibt es Kleidungsstücke, die du niemals tragen würdest?" />
          </Section>

          <Section num="17" title="Deine Wunschgarderobe" hint="Stell dir vor, deine perfekte Business-Garderobe ist in sechs Monaten Realität.">
            <TextArea name="wunsch" label="Woran würdest du merken, dass sie perfekt ist?" />
            <TextArea name="sonstiges" label="Gibt es noch etwas, das ich wissen sollte?" hint="Optional" />
          </Section>

          {/* Submit */}
          <div className="capsule-form__close">
            <button className="capsule-form__submit" type="submit" disabled={state.submitting}>
              {state.submitting ? 'Wird gesendet...' : 'Unterlagen absenden'}
              {!state.submitting && <span aria-hidden="true">→</span>}
            </button>
            <ValidationError errors={state.errors} className="capsule-form__error" />

            <p className="capsule-form__close-note">
              Nach Erhalt deiner Unterlagen analysiere ich deine Garderobe und erstelle deine
              individuelle Business Capsule Wardrobe™. Du erhältst:
            </p>
            <ul className="capsule-form__deliver">
              <li>BusinessStylist® Identity Card™</li>
              <li>Individuelle Garderobenanalyse</li>
              <li>Behalten | Aussortieren | Ersetzen</li>
              <li>Deine persönliche Capsule Wardrobe</li>
              <li>Farbpalette & Signature Pieces</li>
              <li>Outfitformeln für deinen Berufsalltag</li>
              <li>Saisonplanung</li>
              <li>Outfit-Collagen</li>
              <li>Shopping-Empfehlungen mit Produktlinks</li>
              <li>Budget- und Premium-Alternativen</li>
              <li>Priorisierte Einkaufsliste</li>
              <li>Investment Summary™</li>
              <li>90-Tage-Einkaufsfahrplan</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ──────────────── Sub-components ──────────────── */

function Chapter({ num, title }: { num: string; title: string }) {
  return (
    <div className="capsule-form__chapter">
      <span className="capsule-form__chapter-num">{num}</span>
      <h2 className="capsule-form__chapter-title">{title}</h2>
    </div>
  );
}

function Section({ num, title, hint, children }: { num: string; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="capsule-form__section">
      <div className="capsule-form__section-head">
        <span className="capsule-form__section-num">{num}</span>
        <div>
          <h3 className="capsule-form__section-title">{title}</h3>
          {hint && <p className="capsule-form__section-hint">{hint}</p>}
        </div>
      </div>
      <div className="capsule-form__fields">{children}</div>
    </section>
  );
}

function Field({ label, name, type = 'text', required, placeholder, hint }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; hint?: string }) {
  return (
    <div>
      <label className="capsule-form__label" htmlFor={name}>
        {label}
        {hint && <span className="capsule-form__hint-inline">{hint}</span>}
      </label>
      <input className="capsule-form__input" type={type} id={name} name={name} required={required} placeholder={placeholder} />
    </div>
  );
}

function TextArea({ label, name, hint }: { label: string; name: string; hint?: string }) {
  return (
    <div>
      <label className="capsule-form__label" htmlFor={name}>
        {label}
        {hint && <span className="capsule-form__hint-inline">{hint}</span>}
      </label>
      <textarea className="capsule-form__textarea" id={name} name={name} rows={4} />
    </div>
  );
}

function RadioGroup({ name, label, options }: { name: string; label: string; options: string[] }) {
  return (
    <fieldset>
      <legend className="capsule-form__label">{label}</legend>
      <div className="capsule-form__choices">
        {options.map((opt) => (
          <label key={opt} className="capsule-form__choice">
            <input type="radio" name={name} value={opt} />
            <span className="capsule-form__choice-box">{opt}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function RadioStack({ name, label, options }: { name: string; label: string; options: string[] }) {
  return (
    <fieldset>
      <legend className="capsule-form__label">{label}</legend>
      <div className="capsule-form__choices capsule-form__choices--stack">
        {options.map((opt) => (
          <label key={opt} className="capsule-form__choice">
            <input type="radio" name={name} value={opt} />
            <span className="capsule-form__choice-box">{opt}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function CheckboxGroup({ name, label, hint, options }: { name: string; label: string; hint?: string; options: string[] }) {
  return (
    <fieldset>
      <legend className="capsule-form__label">
        {label}
        {hint && <span className="capsule-form__hint-inline">{hint}</span>}
      </legend>
      <div className="capsule-form__choices">
        {options.map((opt) => (
          <label key={opt} className="capsule-form__choice">
            <input type="checkbox" name={name} value={opt} />
            <span className="capsule-form__choice-box">{opt}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function ScaleField({ name, label }: { name: string; label: string }) {
  return (
    <fieldset>
      <legend className="capsule-form__label">{label}</legend>
      <div className="capsule-form__scale">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => (
          <label key={val} className="capsule-form__scale-seg">
            <input type="radio" name={name} value={String(val)} />
            <span>{val}</span>
          </label>
        ))}
      </div>
      <div className="capsule-form__scale-legend">
        <span>Gar nicht zufrieden</span>
        <span>Sehr zufrieden</span>
      </div>
    </fieldset>
  );
}

function BudgetLadder({ name, label }: { name: string; label: string }) {
  const rungs = [
    { value: 'bis 500', display: 'bis 500 €', tier: 'Start' },
    { value: '500–1.000', display: '500 – 1.000 €', tier: 'Aufbau' },
    { value: '1.000–2.000', display: '1.000 – 2.000 €', tier: 'Investition' },
    { value: 'über 2.000', display: 'über 2.000 €', tier: 'Premium' },
  ];
  return (
    <fieldset>
      <legend className="capsule-form__label">{label}</legend>
      <div className="capsule-form__ladder">
        {rungs.map((r) => (
          <label key={r.value} className="capsule-form__rung">
            <input type="radio" name={name} value={r.value} />
            <span>
              {r.display}
              <em>{r.tier}</em>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function SizeGrid() {
  const sizes = [
    { id: 'groesse', label: 'Körpergröße', placeholder: 'cm' },
    { id: 'k_blazer', label: 'Blazer', placeholder: '—' },
    { id: 'k_oberteile', label: 'Oberteile', placeholder: '—' },
    { id: 'k_hosen', label: 'Hosen', placeholder: '—' },
    { id: 'k_roecke', label: 'Röcke', placeholder: '—' },
    { id: 'k_kleider', label: 'Kleider', placeholder: '—' },
    { id: 'k_schuhe', label: 'Schuhe', placeholder: '—' },
  ];
  return (
    <fieldset>
      <legend className="capsule-form__label">Deine Maße</legend>
      <div className="capsule-form__sizes">
        {sizes.map((s) => (
          <div key={s.id} className="capsule-form__size">
            <label htmlFor={s.id}>{s.label}</label>
            <input type="text" id={s.id} name={s.id} placeholder={s.placeholder} />
          </div>
        ))}
      </div>
    </fieldset>
  );
}

function UploadField({ name, title, hint, required }: { name: string; title: string; hint: string; required?: boolean }) {
  return (
    <div className={`capsule-form__upload ${required ? 'capsule-form__upload--key' : ''}`}>
      <div className="capsule-form__upload-head">
        <p className="capsule-form__upload-title">{title}</p>
        <span className={`capsule-form__upload-req ${!required ? 'capsule-form__upload-req--opt' : ''}`}>
          {required ? 'Erforderlich' : 'Optional'}
        </span>
      </div>
      <p className="capsule-form__upload-hint">{hint}</p>
      <input type="file" name={name} accept="image/*" multiple required={required} />
    </div>
  );
}
