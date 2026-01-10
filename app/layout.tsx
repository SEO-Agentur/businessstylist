import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Montserrat } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SessionProvider from '@/components/providers/SessionProvider';
import { CartProvider } from '@/lib/context/CartContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'Businessstylist - Professionelle Stilberatung für Business-Frauen',
  description: 'Entdecke deinen perfekten Business-Stil. Professionelle Stilberatung, Typenanalyse und Kleiderschrank-Check für selbstbewusste Frauen im Beruf.',
  keywords: ['Stilberatung', 'Business Outfit', 'Capsule Wardrobe', 'Farbberatung', 'Typenanalyse', 'Kleiderschrank Check'],
  authors: [{ name: 'Businessstylist' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: '/',
    siteName: 'Businessstylist',
    title: 'Businessstylist - Professionelle Stilberatung für Business-Frauen',
    description: 'Entdecke deinen perfekten Business-Stil. Professionelle Stilberatung, Typenanalyse und Kleiderschrank-Check.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Businessstylist - Professionelle Stilberatung für Business-Frauen',
    description: 'Entdecke deinen perfekten Business-Stil. Professionelle Stilberatung, Typenanalyse und Kleiderschrank-Check.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${playfair.variable} ${montserrat.variable}`}>
      <body>
        <SessionProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
