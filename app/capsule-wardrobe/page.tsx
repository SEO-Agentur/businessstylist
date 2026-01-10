import Link from 'next/link';
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Capsule Wardrobe - Minimalistische Business-Garderobe aufbauen | Businessstylist',
  description: 'Lerne, wie du eine Capsule Wardrobe für den Business-Alltag aufbaust. Weniger Teile, mehr Möglichkeiten.',
  keywords: ['Capsule Wardrobe', 'Minimalistische Garderobe', 'Business Capsule Wardrobe'],
  alternates: {
    canonical: '/capsule-wardrobe',
  },
};

export default function CapsuleWardrobePage() {
  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl">
        <h1 className="text-h1 mb-8">Capsule Wardrobe für Business-Frauen</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl">
            Eine Capsule Wardrobe ist eine minimalistische Garderobe aus wenigen,
            sorgfältig ausgewählten Teilen, die sich vielfältig kombinieren lassen.
          </p>

          <h2>Was ist eine Capsule Wardrobe?</h2>
          <p>
            Das Konzept der Capsule Wardrobe wurde in den 1970er Jahren entwickelt und
            erlebt heute eine Renaissance. Es geht darum, mit ca. 30-40 Kleidungsstücken
            pro Saison auszukommen und dennoch vielfältige Outfits zu kreieren.
          </p>

          <h2>Vorteile einer Capsule Wardrobe</h2>
          <ul>
            <li>Zeitersparnis beim morgendlichen Anziehen</li>
            <li>Weniger Kaufentscheidungen, mehr Klarheit</li>
            <li>Nachhaltiger Konsum</li>
            <li>Bessere Qualität statt Quantität</li>
          </ul>

          <p className="text-sm text-brand-secondary mt-8 border-t pt-4">
            TODO: Vollständiger SEO-optimierter Artikel mit Anleitung zum Aufbau einer Capsule Wardrobe.
            Checklisten, Beispiele und visuelle Guides hinzufügen.
          </p>
        </div>

        <div className="mt-12 p-8 bg-business-cream rounded-2xl">
          <h3 className="text-h3 mb-4">Starte mit deiner persönlichen Capsule Wardrobe</h3>
          <p className="mb-6">
            Unser Kleiderschrank Check hilft dir, deine Garderobe zu optimieren und
            eine funktionale Capsule Wardrobe aufzubauen.
          </p>
          <Link href="/kleiderschrank-check">
            <Button>Kleiderschrank Check buchen</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
