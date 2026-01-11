import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ – Häufig gestellte Fragen | Businessstylist',
  description: 'Alle Antworten zu Stilberatung, Farbberatung, Capsule Wardrobe und Business-Outfits. Von Ablauf über Kosten bis zu individuellen Fragen – hier findest du Klarheit.',
  keywords: 'FAQ, Stilberatung Fragen, Farbberatung FAQ, Capsule Wardrobe, Business Outfit Beratung, Stilberatung Ablauf, Kosten Stilberatung',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'FAQ – Häufig gestellte Fragen | Businessstylist',
    description: 'Alle Antworten zu Stilberatung, Farbberatung, Capsule Wardrobe und Business-Outfits.',
    url: 'https://businessstylist.de/faq',
    type: 'website',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
