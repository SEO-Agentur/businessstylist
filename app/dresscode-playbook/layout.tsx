import type { Metadata } from 'next';
import { METADATA_BASE } from '@/lib/utils/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: 'Dresscode Playbook – Stil verstehen, Wirkung gestalten',
  description: 'Das Dresscode Playbook von Anika Schmitz: ein Begleiter für Menschen mit beruflicher Verantwortung. Capsule Wardrobe, Checklisten, Wochenplaner. Digital und als Taschenbuch.',
  authors: [{ name: 'Anika Schmitz' }],
  robots: 'index, follow, max-image-preview:large',
  alternates: {
    canonical: '/dresscode-playbook',
  },
  openGraph: {
    type: 'book',
    title: 'Dresscode Playbook – Stil verstehen, Wirkung gestalten',
    description: 'Ein Begleiter für Menschen, die Kleidung nicht mehr jeden Morgen neu entscheiden wollen. Von Anika Schmitz.',
    url: '/dresscode-playbook',
    locale: 'de_DE',
    siteName: 'Businessstylist',
    images: [
      {
        url: '/dresscode-playbook.png',
        width: 1200,
        height: 630,
        alt: "Cover des Buchs 'Dresscode Playbook' von Anika Schmitz",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dresscode Playbook – Stil verstehen, Wirkung gestalten',
    description: 'Ein Begleiter für Menschen, die Kleidung nicht mehr jeden Morgen neu entscheiden wollen.',
    images: ['/dresscode-playbook.png'],
  },
};

const jsonLdBook = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: 'Dresscode Playbook',
  alternateName: 'Dresscode Playbook – Stil verstehen, Wirkung gestalten',
  author: {
    '@type': 'Person',
    name: 'Anika Schmitz',
    url: 'https://businessstylist.de/ueber-mich',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Businessstylist',
  },
  inLanguage: 'de',
  bookFormat: 'https://schema.org/EBook',
  datePublished: '2025',
  image: 'https://businessstylist.de/dresscode-playbook.png',
  description:
    'Das Dresscode Playbook ist kein klassischer Stilratgeber. Es ist ein Buch für Menschen, die ihre Wirkung verstehen wollen, ohne sich zu inszenieren.',
  offers: [
    {
      '@type': 'Offer',
      name: 'Digitale Ausgabe (PDF + EPUB)',
      price: '33.95',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: 'https://businessstylist.de/dresscode-playbook',
      priceValidUntil: '2026-12-31',
    },
    {
      '@type': 'Offer',
      name: 'Taschenbuch',
      availability: 'https://schema.org/InStock',
      url: 'https://amzn.to/3OFSH2V',
      seller: {
        '@type': 'Organization',
        name: 'Amazon',
      },
    },
  ],
};

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Für wen ist das Dresscode Playbook geeignet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Für Menschen mit beruflicher Verantwortung, die verlässlich gut gekleidet sein wollen — ohne jeden Morgen neu darüber nachzudenken. Das Buch richtet sich an Frauen und Männer gleichermaßen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Gilt die Beratung nur für Männer oder auch für Frauen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Das Buch richtet sich ausdrücklich an beide. Dresscodes funktionieren nach denselben Grundprinzipien — die Umsetzung wird für Frauen und Männer jeweils konkret beschrieben.',
      },
    },
    {
      '@type': 'Question',
      name: 'In welchem Format erhalte ich das Playbook?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Als PDF und EPUB, optimiert für alle Geräte. Du kannst es auf dem Computer lesen, auf dem Tablet blättern oder ausdrucken.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie erhalte ich das Playbook nach dem Kauf?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sofort nach der Zahlung erhältst Du einen Download-Link per E-Mail. Das Playbook ist außerdem jederzeit in Deinem Kundenbereich verfügbar.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kann ich digital und Taschenbuch kombinieren?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Du kannst das E-Book hier direkt kaufen und das Taschenbuch zusätzlich über Amazon bestellen. Beide Versionen haben denselben Inhalt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie unterscheidet sich dieses Buch von anderen Stilratgebern?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Das Dresscode Playbook ist kein Trendbuch und kein klassischer Stilratgeber. Es geht nicht darum, einen neuen Look zu entwickeln — sondern darum, Kleidung als System zu verstehen, das zuverlässig funktioniert.',
      },
    },
    {
      '@type': 'Question',
      name: 'Gibt es Updates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Bei neuen Versionen oder Erweiterungen erhältst Du kostenlose Updates und wirst per E-Mail benachrichtigt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Gibt es eine Geld-zurück-Garantie?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Digitale Produkte sind nach deutschem Recht vom Widerruf ausgeschlossen, sobald der Download begonnen hat. Wenn Du Fragen vor dem Kauf hast, erreichst Du uns jederzeit über das Kontaktformular.',
      },
    },
  ],
};

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Start',
      item: 'https://businessstylist.de/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Shop',
      item: 'https://businessstylist.de/shop',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Dresscode Playbook',
    },
  ],
};

export default function DresscodePlaybookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBook) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      {children}
    </>
  );
}
