import type { Metadata } from 'next';
import { METADATA_BASE } from '@/lib/utils/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: 'Lookbook 2026 | Personalisiert nach Kibbe-Typ – 29 €',
  description:
    'Entdecke Dein persönliches Lookbook 2026 mit 2 Outfits, abgestimmt auf Deinen Kibbe-Typ. Sofort-Download als PDF. Einmalzahlung 29 €, keine Abo-Falle.',
  alternates: {
    canonical: 'https://businessstylist.de/lookbook',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    title: 'Lookbook 2026 – Personalisiert nach Kibbe-Typ',
    description:
      'Zwei Outfits, abgestimmt auf Deinen Kibbe-Typ. Sofortiger PDF-Download für 29 €.',
    url: 'https://businessstylist.de/lookbook',
    siteName: 'Businessstylist',
    locale: 'de_DE',
    images: [
      {
        url: 'https://businessstylist.de/og-lookbook-2026.jpg',
        width: 1200,
        height: 630,
        alt: 'Lookbook 2026 – Personalisiert nach Kibbe-Typ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lookbook 2026 – Personalisiert nach Kibbe-Typ',
    description:
      'Zwei Outfits, abgestimmt auf Deinen Kibbe-Typ. Sofortiger PDF-Download für 29 €.',
    images: ['https://businessstylist.de/og-lookbook-2026.jpg'],
  },
};

export default function LookbookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
