import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kleiderschrank-Check - Ordnung & Stil mit System | Businessstylist',
  description:
    'Der Kleiderschrank-Check von Businessstylist: Strukturiert ausmisten, gezielt neu kombinieren und mit einer stimmigen Capsule Wardrobe starten.',
  alternates: { canonical: '/kleiderschrank-check' },
};

export default function KleiderschrankCheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
