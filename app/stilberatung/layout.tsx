import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stilberatung für Business-Frauen – Business Style Check™ | BusinessStylist®',
  description: 'Stilberatung, die auf Wirkung setzt: Der Business Style Check™ ist die Farb- und Stilberatung für Business-Frauen – von einer Mode-Stylistin und gelernten Kostümbildnerin, online, einmalig 99 €. Weil der erste Eindruck zählt.',
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
    title: 'Stilberatung für Business-Frauen – Business Style Check™',
    description: 'Farb- und Stilberatung, die auf Wirkung setzt. Deine persönliche Stilstrategie inkl. BusinessStylist® Identity Profil™ – einmalig 99 €.',
    url: 'https://businessstylist.de/stilberatung',
    locale: 'de_DE',
    siteName: 'Businessstylist',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Stilberatung',
  name: 'Business Style Check™ – Stilberatung für Business-Frauen',
  description: 'Farb- und Stilberatung, die auf Wirkung setzt: persönliche Business-Stilstrategie inkl. BusinessStylist® Identity Profil™.',
  provider: {
    '@type': 'Organization',
    name: 'BusinessStylist®',
    url: 'https://businessstylist.de',
  },
  areaServed: 'DE',
  offers: {
    '@type': 'Offer',
    price: '99',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was kostet eine Stilberatung bei BusinessStylist®?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Der Business Style Check™ kostet einmalig 99 € – inklusive Deiner kompletten Stilstrategie und dem BusinessStylist® Identity Profil™ als PDF.',
      },
    },
    {
      '@type': 'Question',
      name: 'Findet die Stilberatung online oder vor Ort statt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Komplett online. Du brauchst weder einen Termin noch eine Anprobe vor Ort – nur Fotos Deiner aktuellen Business-Outfits.',
      },
    },
    {
      '@type': 'Question',
      name: 'Bekomme ich konkrete Einkaufslinks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nein, bewusst nicht. Der Business Style Check™ ist die Strategie. Personal Shopping mit klickbaren Links bekommst Du in der Business Capsule Wardrobe™.',
      },
    },
    {
      '@type': 'Question',
      name: 'Worin unterscheidet sich diese Stilberatung von einer klassischen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Eine klassische Beratung endet beim Aussehen. Hier geht es um Wirkung: wie Du wahrgenommen werden willst und wie Dein Business-Stil das unterstützt.',
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
