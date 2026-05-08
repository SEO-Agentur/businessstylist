import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt | Businessstylist',
  description:
    'Kontaktiere Businessstylist für persönliche Stilberatung, Fragen zu Services oder Buchungen. Wir freuen uns auf deine Nachricht.',
  alternates: { canonical: '/kontakt' },
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
