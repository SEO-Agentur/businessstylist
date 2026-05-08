import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop - Stilberatung, Kleiderschrank-Check & mehr | Businessstylist',
  description:
    'Buche Services von Businessstylist: Kleiderschrank-Check, Stilberatung, Typanalyse und weitere Produkte für deinen perfekten Business-Look.',
  alternates: { canonical: '/shop' },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
