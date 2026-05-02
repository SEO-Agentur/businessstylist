import type { Metadata } from 'next';
import GateForm from './GateForm';

export const metadata: Metadata = {
  title: 'Geschützter Bereich',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
    },
  },
};

export default function LookbookGatePage({
  searchParams,
}: {
  searchParams?: { next?: string; error?: string };
}) {
  const next = searchParams?.next && searchParams.next.startsWith('/lookbook')
    ? searchParams.next
    : '/lookbook';
  const hasError = searchParams?.error === '1';

  return (
    <div className="min-h-[70vh] flex items-center justify-center section-padding bg-business-cream">
      <div className="container-custom max-w-md">
        <div className="bg-white rounded-2xl shadow-card p-8 md:p-10 border border-gray-100">
          <h1 className="font-serif text-h2 mb-3 text-brand-primary">
            Geschützter Bereich
          </h1>
          <p className="text-brand-secondary mb-8">
            Dieser Bereich ist passwortgeschützt. Bitte gib das Passwort ein, um fortzufahren.
          </p>
          <GateForm next={next} hasError={hasError} />
        </div>
      </div>
    </div>
  );
}
