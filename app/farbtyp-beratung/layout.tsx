import type { Metadata } from 'next';
import { METADATA_BASE } from '@/lib/utils/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: 'Farbberatung & Farbtyp-Analyse – Professionelle Farbberatung | Businessstylist',
  description: 'Professionelle Farbberatung für Farben, die Dir stehen. Finde Deinen Farbtyp mit der Vier-Jahreszeiten-Methode – Wintertyp, Herbsttyp, Sommertyp, Frühlingstyp. Jetzt buchen!',
  keywords: [
    'Farbberatung',
    'Farbtyp',
    'Farbanalyse',
    'Vier-Jahreszeiten-Methode',
    'Wintertyp',
    'Herbsttyp',
    'Sommertyp',
    'Frühlingstyp',
    'Farbpalette',
    'Farbtyp bestimmen',
    'Welche Farben stehen mir',
    'Stilberatung Farben',
  ],
  alternates: {
    canonical: '/farbtyp-beratung',
  },
  openGraph: {
    title: 'Farbberatung & Farbtyp-Analyse | Businessstylist',
    description: 'Entdecke Deinen Farbtyp und die Farben, die Deine natürliche Ausstrahlung unterstreichen. Professionelle Farbberatung für 179 EUR.',
    type: 'website',
    locale: 'de_DE',
  },
};

export default function FarbtypBeratungLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
