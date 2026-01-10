export interface QuizAnswers {
  [key: string]: string;
}

export interface Scores {
  D: number;
  N: number;
  R: number;
  G: number;
}

export type KibbeType =
  | 'DRAMATIC'
  | 'SOFT_DRAMATIC'
  | 'FLAMBOYANT_NATURAL'
  | 'NATURAL'
  | 'SOFT_NATURAL'
  | 'DRAMATIC_CLASSIC'
  | 'CLASSIC'
  | 'SOFT_CLASSIC'
  | 'FLAMBOYANT_GAMINE'
  | 'GAMINE'
  | 'SOFT_GAMINE'
  | 'ROMANTIC'
  | 'THEATRICAL_ROMANTIC';

import { KIBBE_QUESTIONS } from './questions';

export function calculateScores(answers: QuizAnswers): Scores {
  const scores: Scores = { D: 0, N: 0, R: 0, G: 0 };

  KIBBE_QUESTIONS.forEach((question) => {
    const answer = answers[question.id];
    if (!answer) return;

    const option = question.options.find((opt) => opt.value === answer);
    if (!option) return;

    if (option.scoring.D) scores.D += option.scoring.D;
    if (option.scoring.N) scores.N += option.scoring.N;
    if (option.scoring.R) scores.R += option.scoring.R;
    if (option.scoring.G) scores.G += option.scoring.G;
  });

  return scores;
}

export function determineKibbeType(scores: Scores): KibbeType {
  const { D, N, R, G } = scores;

  // Check if scores are very balanced (Classic family)
  const isBalanced =
    Math.abs(D - N) <= 1 && Math.abs(N - R) <= 1 && Math.abs(D - R) <= 1;

  if (isBalanced) {
    if (D > N && D > R) return 'DRAMATIC_CLASSIC';
    if (R > D && R > N) return 'SOFT_CLASSIC';
    return 'CLASSIC';
  }

  // Check for Gamine indicators (high G score + compact/contrast)
  if (G >= 4) {
    if (D > R && D > N - 1) return 'FLAMBOYANT_GAMINE';
    if (R > D && R > N - 1) return 'SOFT_GAMINE';
    return 'GAMINE';
  }

  // Dramatic family (D dominant)
  if (D >= N + 2 && D >= R + 2) {
    return 'DRAMATIC';
  }
  if (D > N && D > R) {
    if (Math.abs(D - R) <= 1) return 'SOFT_DRAMATIC';
    if (Math.abs(D - N) <= 1) return 'DRAMATIC_CLASSIC';
    return 'DRAMATIC';
  }

  // Natural family (N dominant)
  if (N >= D + 2 && N >= R + 2) {
    return 'FLAMBOYANT_NATURAL';
  }
  if (N > D && N > R) {
    if (Math.abs(N - R) <= 1) return 'SOFT_NATURAL';
    return 'NATURAL';
  }

  // Romantic family (R dominant)
  if (R >= D + 2 && R >= N + 2) {
    return 'ROMANTIC';
  }
  if (R > D && R > N) {
    if (Math.abs(R - D) <= 1) return 'THEATRICAL_ROMANTIC';
    return 'ROMANTIC';
  }

  // Fallback to highest score
  const maxScore = Math.max(D, N, R);
  if (D === maxScore) return 'DRAMATIC';
  if (N === maxScore) return 'NATURAL';
  return 'ROMANTIC';
}

export function getKibbeTypeInfo(type: KibbeType): {
  name: string;
  description: string;
  characteristics: string[];
  styleKeywords: string[];
} {
  const typeInfo = {
    DRAMATIC: {
      name: 'Dramatic',
      description:
        'Du hast eine markante, lange und scharfe Linie. Deine Silhouette ist kantig und dramatisch.',
      characteristics: [
        'Lange vertikale Linie',
        'Schmale, kantige Knochen',
        'Wenig Kurven',
        'Markante Gesichtszüge',
      ],
      styleKeywords: [
        'Klare Linien',
        'Strukturiert',
        'Minimalistisch',
        'Dramatisch',
        'Sharp',
      ],
    },
    SOFT_DRAMATIC: {
      name: 'Soft Dramatic',
      description:
        'Du verbindest dramatische Länge mit weichen, kurvigen Formen - eine kraftvolle, feminine Präsenz.',
      characteristics: [
        'Lange Linie mit Kurven',
        'Weiche, volle Formen',
        'Mix aus sharp und soft',
        'Glamouröse Ausstrahlung',
      ],
      styleKeywords: [
        'Glamourös',
        'Kurvig',
        'Elegant',
        'Dramatisch-feminin',
        'Luxuriös',
      ],
    },
    FLAMBOYANT_NATURAL: {
      name: 'Flamboyant Natural',
      description:
        'Du hast eine lange, breite Linie mit natürlicher, lässiger Ausstrahlung.',
      characteristics: [
        'Lange vertikale Linie',
        'Breite, kräftige Knochen',
        'Natürliche, sportliche Form',
        'Lässige Eleganz',
      ],
      styleKeywords: [
        'Locker',
        'Lässig',
        'Natürlich',
        'Ungezwungen',
        'Sportlich-elegant',
      ],
    },
    NATURAL: {
      name: 'Natural',
      description:
        'Du hast eine ausgeglichene, natürliche Linie mit leichter Breite und Substanz.',
      characteristics: [
        'Moderate Höhe',
        'Natürliche Breite',
        'Unkomplizierte Form',
        'Entspannte Ausstrahlung',
      ],
      styleKeywords: [
        'Natürlich',
        'Unkompliziert',
        'Komfortabel',
        'Erdverbunden',
        'Relaxed',
      ],
    },
    SOFT_NATURAL: {
      name: 'Soft Natural',
      description:
        'Du verbindest natürliche, breite Knochen mit weichen, femininen Kurven.',
      characteristics: [
        'Moderate Höhe',
        'Weiche, natürliche Kurven',
        'Breite mit Softness',
        'Freundliche Ausstrahlung',
      ],
      styleKeywords: [
        'Weich',
        'Natürlich',
        'Feminin',
        'Ungezwungen',
        'Frisch',
      ],
    },
    DRAMATIC_CLASSIC: {
      name: 'Dramatic Classic',
      description:
        'Du hast perfekte Proportionen mit einem Hauch von Schärfe und Dramatik.',
      characteristics: [
        'Symmetrische Proportionen',
        'Leichte Schärfe',
        'Ausgewogene Form',
        'Elegante Ausstrahlung',
      ],
      styleKeywords: [
        'Klassisch',
        'Elegant',
        'Strukturiert',
        'Zeitlos',
        'Raffiniert',
      ],
    },
    CLASSIC: {
      name: 'Classic',
      description:
        'Du verkörperst perfekte Balance und Symmetrie - zeitlose, klassische Schönheit.',
      characteristics: [
        'Perfekt ausgewogen',
        'Symmetrisch',
        'Harmonisch',
        'Moderate alle Merkmale',
      ],
      styleKeywords: [
        'Klassisch',
        'Zeitlos',
        'Elegant',
        'Ausgewogen',
        'Harmonisch',
      ],
    },
    SOFT_CLASSIC: {
      name: 'Soft Classic',
      description:
        'Du hast klassische Balance mit einem Hauch von Weichheit und Rundung.',
      characteristics: [
        'Symmetrische Proportionen',
        'Sanfte Rundungen',
        'Weiche, harmonische Form',
        'Feminine Eleganz',
      ],
      styleKeywords: [
        'Klassisch',
        'Feminin',
        'Soft',
        'Elegant',
        'Harmonisch',
      ],
    },
    FLAMBOYANT_GAMINE: {
      name: 'Flamboyant Gamine',
      description:
        'Du bist kompakt und kontrastreich - mit einer Mischung aus sharp und compact.',
      characteristics: [
        'Petite mit Kontrasten',
        'Sharp und compact',
        'Jugendliche Energie',
        'Mix aus Gegensätzen',
      ],
      styleKeywords: [
        'Verspielt',
        'Kontrastreich',
        'Frech',
        'Jung',
        'Energisch',
      ],
    },
    GAMINE: {
      name: 'Gamine',
      description:
        'Du bist kompakt und ausgewogen - mit jugendlicher, verspielter Ausstrahlung.',
      characteristics: [
        'Petite und compact',
        'Ausgewogene Kontraste',
        'Jugendlich',
        'Verspielt',
      ],
      styleKeywords: [
        'Verspielt',
        'Jung',
        'Frisch',
        'Kontrastreich',
        'Energisch',
      ],
    },
    SOFT_GAMINE: {
      name: 'Soft Gamine',
      description:
        'Du bist petite und kompakt mit weichen, runden Formen - süß und feminin.',
      characteristics: [
        'Petite mit Kurven',
        'Weiche Kontraste',
        'Doll-like',
        'Süße Ausstrahlung',
      ],
      styleKeywords: [
        'Süß',
        'Verspielt',
        'Feminin',
        'Compact',
        'Romantisch-jung',
      ],
    },
    ROMANTIC: {
      name: 'Romantic',
      description:
        'Du bist durchgehend weich, rund und kurvig - pure Weiblichkeit.',
      characteristics: [
        'Volle, weiche Kurven',
        'Runde Formen überall',
        'Sehr feminin',
        'Üppige Ausstrahlung',
      ],
      styleKeywords: [
        'Romantisch',
        'Kurvig',
        'Weich',
        'Feminin',
        'Luxuriös',
      ],
    },
    THEATRICAL_ROMANTIC: {
      name: 'Theatrical Romantic',
      description:
        'Du bist überwiegend weich und kurvig, mit einem Hauch von Schärfe.',
      characteristics: [
        'Weiche Kurven',
        'Kleine Schärfe-Details',
        'Sehr feminin',
        'Glamouröse Ausstrahlung',
      ],
      styleKeywords: [
        'Glamourös',
        'Romantisch',
        'Feminin',
        'Sinnlich',
        'Elegant',
      ],
    },
  };

  return typeInfo[type] || typeInfo.CLASSIC;
}
