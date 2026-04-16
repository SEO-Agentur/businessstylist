import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stilberatung & Personal Styling für Business-Frauen',
  description: 'Stilberatung von einer Top Personal Stylistin: Kleiderschrank-Check & Stylingtipps für Business-Frauen. Jetzt ab 390,- € buchen.',
  authors: [{ name: 'Businessstylist' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://businessstylist.de/stilberatung',
  },
  openGraph: {
    type: 'website',
    title: 'Farb- und Stilberatung: Dein persönlicher Stil',
    description: 'Professionelle Stilberatung von einer erfahrenen Personal Stylistin. Farben, Formen, Schnitte und Kleiderschrank-Check — online oder vor Ort.',
    url: 'https://businessstylist.de/stilberatung',
    locale: 'de_DE',
    siteName: 'Businessstylist',
    images: [
      {
        url: 'https://businessstylist.de/og-stilberatung.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Stylistin bei der Farb- und Stilberatung',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Farb- und Stilberatung: Dein persönlicher Stil',
    description: 'Professionelle Stilberatung von einer erfahrenen Personal Stylistin.',
    images: ['https://businessstylist.de/og-stilberatung.jpg'],
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Farb- und Stilberatung',
  serviceType: 'Personal Styling',
  provider: {
    '@type': 'Person',
    name: 'Anika Schmitz',
    jobTitle: 'Personal Stylistin',
    url: 'https://businessstylist.de/ueber-mich',
  },
  areaServed: { '@type': 'Country', name: 'Deutschland' },
  description: 'Professionelle Farb- und Stilberatung mit Kleiderschrank-Check, Personal Shopping und Stylingtipps. Online oder vor Ort.',
  offers: [
    {
      '@type': 'Offer',
      name: '1:1 Stilberatung',
      description: '2 × 90 Minuten persönliche Beratung, Farb- & Stiltyp-Analyse, Figur & Passform, komplette Outfit-Strategie, individuelles Lookbook',
      price: '390.00',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: 'https://businessstylist.de/stilberatung',
    },
    {
      '@type': 'Offer',
      name: 'Jahresabo Stil-System',
      description: 'Jahresbegleitung mit Kleiderschrank-Check, monatlichem Lookbook und persönlichem Shop mit kuratierten Teilen',
      price: '1290.00',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: 'https://businessstylist.de/stilberatung',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was kostet eine Farb- und Stilberatung?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Einzel-Stilberatung kostet 390 € inklusive zweier 90-minütiger Termine, Farbanalyse, Figurtyp-Bestimmung und einem individuellen Lookbook. Das Jahresabo liegt bei 1.290 € und umfasst zusätzlich einen Kleiderschrank-Check, monatliche Lookbooks und Personal Shopping. Alle Preise verstehen sich inkl. MwSt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie lange dauert eine Stilberatung?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Einzelberatung besteht aus zwei Terminen à 90 Minuten – einem Vorgespräch mit Analyse und einer anschließenden Anprobe mit Lookbook-Erstellung. Beim Jahresabo verteilen sich die Termine über zwölf Monate, sodass Deine Stilberatung mit Dir wächst.',
      },
    },
    {
      '@type': 'Question',
      name: 'Findet die Beratung online oder vor Ort statt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Beides ist möglich. Die Online-Stilberatung nutzt Video-Sessions und digitale Lookbooks – ideal für volle Kalender. Vor-Ort-Termine bieten mehr Raum für Anprobe und Kleiderschrank-Check. Viele Kundinnen kombinieren beide Formate.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was ist ein Kleiderschrank-Check und wie läuft er ab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Beim Kleiderschrank-Check gehen wir Deine Garderobe systematisch durch. Wir prüfen, welche Kleidungsstücke zu Deinem Farb- und Figurtyp passen, welche Looks sich kombinieren lassen und wo Lücken bestehen. Das Ergebnis ist eine funktionale Garderobe ohne Fehlkäufe.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Qualifikation hat die Stylistin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Als Personal Stylistin habe ich fundierte Weiterbildung in Mode, Styling und Imageberatung aus der Beauty-Branche. Jede Stilberatung basiert auf Kompetenz und Gespür, nicht auf Trends – damit Dein Stil langfristig trägt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Gibt es eine Zufriedenheitsgarantie?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wenn Du nach dem ersten Termin das Gefühl hast, dass die Beratung nicht zu Dir passt, sprechen wir darüber und finden eine Lösung. Mir ist wichtig, dass Du langfristig profitierst – nicht nur einmal gut angezogen bist.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://businessstylist.de/' },
    { '@type': 'ListItem', position: 2, name: 'Stilberatung', item: 'https://businessstylist.de/stilberatung' },
  ],
};

export default function StilberatungLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
