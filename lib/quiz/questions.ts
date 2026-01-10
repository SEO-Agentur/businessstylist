export interface QuizQuestion {
  id: string;
  section: string;
  text: string;
  options: QuizOption[];
}

export interface QuizOption {
  value: string;
  text: string;
  scoring: {
    D?: number;
    N?: number;
    R?: number;
    G?: number;
  };
}

export const KIBBE_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    section: 'Vertikale Linie / Körperproportion',
    text: 'Wie würdest du deine Körpergröße bzw. vertikale Wirkung beschreiben?',
    options: [
      { value: 'A', text: 'Sehr groß/auffallend lang', scoring: { D: 1 } },
      { value: 'B', text: 'Eher groß/überdurchschnittlich', scoring: { D: 0.5, N: 0.5 } },
      { value: 'C', text: 'Mittel, ausgeglichen', scoring: { N: 1 } },
      { value: 'D', text: 'Eher klein/kompakt', scoring: { N: 0.5, R: 0.5 } },
      { value: 'E', text: 'Sehr klein/petite, wirkt zierlich', scoring: { R: 1 } },
    ],
  },
  {
    id: 'q2',
    section: 'Vertikale Linie / Körperproportion',
    text: 'Wie würdest du deine gesamte Silhouette beschreiben?',
    options: [
      { value: 'A', text: 'Schmal & lang, wenig Rundungen', scoring: { D: 1 } },
      { value: 'B', text: 'Lang, aber etwas Breite an Schultern/Hüfte', scoring: { D: 0.5, N: 0.5 } },
      { value: 'C', text: 'Ausgeglichen, weder sehr schmal noch sehr breit', scoring: { N: 1 } },
      { value: 'D', text: 'Etwas weich, mit moderaten Rundungen', scoring: { N: 0.5, R: 0.5 } },
      { value: 'E', text: 'Sehr weich, deutlich rund/kurvig', scoring: { R: 1 } },
    ],
  },
  {
    id: 'q3',
    section: 'Knochenbau',
    text: 'Wie würdest du deine Schultern beschreiben?',
    options: [
      { value: 'A', text: 'Schmal, kantig, deutlich eckig', scoring: { D: 1 } },
      { value: 'B', text: 'Schmal bis moderat, leicht kantig', scoring: { D: 0.5, N: 0.5 } },
      { value: 'C', text: 'Moderat/balanciert', scoring: { N: 1 } },
      { value: 'D', text: 'Etwas breit, weich gerundet', scoring: { N: 0.5, R: 0.5 } },
      { value: 'E', text: 'Rund, weich, eher schmal aber "soft"', scoring: { R: 1 } },
    ],
  },
  {
    id: 'q4',
    section: 'Knochenbau',
    text: 'Wie würdest du deine Arme und Beine beschreiben?',
    options: [
      { value: 'A', text: 'Lang, schlank, sehnig', scoring: { D: 1 } },
      { value: 'B', text: 'Lang, etwas kräftiger', scoring: { D: 0.5, N: 0.5 } },
      { value: 'C', text: 'Mittel, proportional', scoring: { N: 1 } },
      { value: 'D', text: 'Kürzer, weich', scoring: { N: 0.5, R: 0.5 } },
      { value: 'E', text: 'Kurz bis mittel, weich und rund', scoring: { R: 1 } },
    ],
  },
  {
    id: 'q5',
    section: 'Knochenbau',
    text: 'Wie würdest du deine Hände und Füße beschreiben?',
    options: [
      { value: 'A', text: 'Lang, schmal, knochig', scoring: { D: 1 } },
      { value: 'B', text: 'Eher lang, etwas breiter', scoring: { D: 0.5, N: 0.5 } },
      { value: 'C', text: 'Mittel, ausgeglichen', scoring: { N: 1 } },
      { value: 'D', text: 'Etwas klein, weich', scoring: { N: 0.5, R: 0.5 } },
      { value: 'E', text: 'Klein, rund, zart', scoring: { R: 1 } },
    ],
  },
  {
    id: 'q6',
    section: 'Fleisch/Weichteile',
    text: 'Wie nimmst du an Gewicht zu (falls zutreffend)?',
    options: [
      { value: 'A', text: 'Kaum sichtbar, bleibt schmal', scoring: { D: 1 } },
      { value: 'B', text: 'Zunahme eher "gerade", wenig Rundung', scoring: { D: 0.5, N: 0.5 } },
      { value: 'C', text: 'Gleichmäßig verteilt', scoring: { N: 1 } },
      { value: 'D', text: 'Zunahme an Hüfte/Oberschenkel/Arme weicher', scoring: { N: 0.5, R: 0.5 } },
      { value: 'E', text: 'Zunahme betont Kurven (Brust/Hüfte/Po)', scoring: { R: 1 } },
    ],
  },
  {
    id: 'q7',
    section: 'Fleisch/Weichteile',
    text: 'Wie würdest du dein Körperflesh/Gewebe beschreiben?',
    options: [
      { value: 'A', text: 'Straff, wenig weich', scoring: { D: 1 } },
      { value: 'B', text: 'Straff mit etwas Substanz', scoring: { D: 0.5, N: 0.5 } },
      { value: 'C', text: 'Ausgeglichen', scoring: { N: 1 } },
      { value: 'D', text: 'Weich, leicht "plüschig"', scoring: { N: 0.5, R: 0.5 } },
      { value: 'E', text: 'Sehr weich, rund, kurvig', scoring: { R: 1 } },
    ],
  },
  {
    id: 'q8',
    section: 'Taille & Kurven',
    text: 'Wie definiert ist deine Taille?',
    options: [
      { value: 'A', text: 'Kaum definiert, eher gerade Linie', scoring: { D: 1 } },
      { value: 'B', text: 'Leicht definiert', scoring: { D: 0.5, N: 0.5 } },
      { value: 'C', text: 'Moderat definiert', scoring: { N: 1 } },
      { value: 'D', text: 'Deutlich definiert, weich', scoring: { N: 0.5, R: 0.5 } },
      { value: 'E', text: 'Stark definiert, sehr kurvig', scoring: { R: 1 } },
    ],
  },
  {
    id: 'q9',
    section: 'Taille & Kurven',
    text: 'Wie würdest du deine Hüfte und deinen Po beschreiben?',
    options: [
      { value: 'A', text: 'Schmal/gerade', scoring: { D: 1 } },
      { value: 'B', text: 'Schmal-moderat', scoring: { D: 0.5, N: 0.5 } },
      { value: 'C', text: 'Ausgeglichen', scoring: { N: 1 } },
      { value: 'D', text: 'Weich/moderat rund', scoring: { N: 0.5, R: 0.5 } },
      { value: 'E', text: 'Sehr rund/ausgeprägt', scoring: { R: 1 } },
    ],
  },
  {
    id: 'q10',
    section: 'Gesichtszüge',
    text: 'Wie würdest du deine Kieferlinie beschreiben?',
    options: [
      { value: 'A', text: 'Scharf, kantig', scoring: { D: 1 } },
      { value: 'B', text: 'Eher definiert', scoring: { D: 0.5, N: 0.5 } },
      { value: 'C', text: 'Ausgeglichen', scoring: { N: 1 } },
      { value: 'D', text: 'Weicher, leicht rund', scoring: { N: 0.5, R: 0.5 } },
      { value: 'E', text: 'Sehr weich, rund', scoring: { R: 1 } },
    ],
  },
  {
    id: 'q11',
    section: 'Gesichtszüge',
    text: 'Wie würdest du deine Wangen beschreiben?',
    options: [
      { value: 'A', text: 'Flach, eher knochig', scoring: { D: 1 } },
      { value: 'B', text: 'Leicht definiert', scoring: { D: 0.5, N: 0.5 } },
      { value: 'C', text: 'Ausgeglichen', scoring: { N: 1 } },
      { value: 'D', text: 'Weich, leicht voll', scoring: { N: 0.5, R: 0.5 } },
      { value: 'E', text: 'Sehr voll, rund', scoring: { R: 1 } },
    ],
  },
  {
    id: 'q12',
    section: 'Gesichtszüge',
    text: 'Wie würdest du deine Nase beschreiben?',
    options: [
      { value: 'A', text: 'Schmal, scharf', scoring: { D: 1 } },
      { value: 'B', text: 'Schmal-moderat', scoring: { D: 0.5, N: 0.5 } },
      { value: 'C', text: 'Mittel', scoring: { N: 1 } },
      { value: 'D', text: 'Etwas breit, weich', scoring: { N: 0.5, R: 0.5 } },
      { value: 'E', text: 'Klein, weich/rund', scoring: { R: 1 } },
    ],
  },
  {
    id: 'q13',
    section: 'Gesichtszüge',
    text: 'Wie würdest du deine Lippen beschreiben?',
    options: [
      { value: 'A', text: 'Schmal', scoring: { D: 1 } },
      { value: 'B', text: 'Eher schmal bis mittel', scoring: { D: 0.5, N: 0.5 } },
      { value: 'C', text: 'Mittel', scoring: { N: 1 } },
      { value: 'D', text: 'Voller', scoring: { N: 0.5, R: 0.5 } },
      { value: 'E', text: 'Sehr voll', scoring: { R: 1 } },
    ],
  },
  {
    id: 'q14',
    section: 'Gesichtszüge',
    text: 'Wie würdest du deine Augen beschreiben?',
    options: [
      { value: 'A', text: 'Schmal/"catlike", definiert', scoring: { D: 1 } },
      { value: 'B', text: 'Mittel, eher definiert', scoring: { D: 0.5, N: 0.5 } },
      { value: 'C', text: 'Mittel, ausgeglichen', scoring: { N: 1 } },
      { value: 'D', text: 'Größer/softer', scoring: { N: 0.5, R: 0.5 } },
      { value: 'E', text: 'Groß, rund, sehr weich', scoring: { R: 1 } },
    ],
  },
  {
    id: 'q15',
    section: 'Natural vs Sharp vs Soft',
    text: 'Wie ist deine Gesamtausstrahlung ohne Styling?',
    options: [
      { value: 'A', text: 'Markant, edgy, "sharp"', scoring: { D: 1 } },
      { value: 'B', text: 'Markant mit etwas Lässigkeit', scoring: { D: 0.5, N: 0.5 } },
      { value: 'C', text: 'Harmonisch, klassisch', scoring: { N: 1 } },
      { value: 'D', text: 'Weich, freundlich', scoring: { N: 0.5, R: 0.5 } },
      { value: 'E', text: 'Sehr weich, romantisch', scoring: { R: 1 } },
    ],
  },
  {
    id: 'q16',
    section: 'Classic Marker',
    text: 'Wie wirken deine Proportionen insgesamt?',
    options: [
      { value: 'A', text: 'Extrem (viel Länge oder viel Schärfe)', scoring: { D: 1 } },
      { value: 'B', text: 'Eher betont, aber nicht extrem', scoring: { D: 0.5, N: 0.5 } },
      { value: 'C', text: 'Sehr ausgewogen/"symmetrisch"', scoring: { N: 1 } },
      { value: 'D', text: 'Ausgewogen, aber weich', scoring: { N: 0.5, R: 0.5 } },
      { value: 'E', text: 'Sehr weich und kurvig dominant', scoring: { R: 1 } },
    ],
  },
  {
    id: 'q17',
    section: 'Gamine Marker',
    text: 'Wirkt dein Körper eher "petite/kompakt" selbst wenn du nicht klein bist?',
    options: [
      { value: 'A', text: 'Nein, wirkt eher lang', scoring: { D: 1, G: 1 } },
      { value: 'B', text: 'Eher lang', scoring: { D: 0.5, N: 0.5 } },
      { value: 'C', text: 'Neutral', scoring: { N: 1 } },
      { value: 'D', text: 'Eher kompakt', scoring: { N: 0.5, R: 0.5, G: 1 } },
      { value: 'E', text: 'Sehr kompakt/petite', scoring: { R: 1, G: 1 } },
    ],
  },
  {
    id: 'q18',
    section: 'Gamine Marker',
    text: 'Hast du starke Kontraste (z.B. große Augen + schmaler Kiefer / mix aus sharp & soft)?',
    options: [
      { value: 'A', text: 'Ja, sehr kontrastreich', scoring: { D: 1, G: 1 } },
      { value: 'B', text: 'Etwas kontrastreich', scoring: { D: 0.5, N: 0.5 } },
      { value: 'C', text: 'Neutral', scoring: { N: 1 } },
      { value: 'D', text: 'Eher weich-compact', scoring: { N: 0.5, R: 0.5, G: 1 } },
      { value: 'E', text: 'Sehr "doll-like"/petite', scoring: { R: 1, G: 1 } },
    ],
  },
  {
    id: 'q19',
    section: 'Gamine Marker',
    text: 'Stehen dir kurze, knackige Schnitte/Details (z.B. Cropped Jacken, kleine Muster) besonders gut?',
    options: [
      { value: 'A', text: 'Ja, sehr', scoring: { D: 1, G: 1 } },
      { value: 'B', text: 'Oft', scoring: { D: 0.5, N: 0.5 } },
      { value: 'C', text: 'Kommt drauf an', scoring: { N: 1 } },
      { value: 'D', text: 'Eher selten', scoring: { N: 0.5, R: 0.5 } },
      { value: 'E', text: 'Ja, aber eher verspielt/soft', scoring: { R: 1, G: 1 } },
    ],
  },
];
