import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anmelden | Businessstylist',
  description: 'Melde dich in deinem Businessstylist-Kundenkonto an.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/auth/signin' },
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
