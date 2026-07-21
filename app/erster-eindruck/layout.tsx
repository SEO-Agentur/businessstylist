import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Erster Eindruck – Business First Impression Analyse™ | BusinessStylist®',
  description: 'Kostenlose Analyse deiner beruflichen Wirkung. In 12 Minuten erfährst du, wie dein Business-Auftritt auf andere wirkt – mit deinem persönlichen Business First Impression Score™.',
  alternates: {
    canonical: '/erster-eindruck',
  },
};

export default function ErsterEindruckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
