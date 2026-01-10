'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Header() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { href: '/stilberatung', label: 'Stilberatung' },
    { href: '/typenanalyse', label: 'Typberatung' },
    { href: '/downloads', label: 'Downloads' },
    { href: '/shop', label: 'Shop' },
    { href: '/preise', label: 'Preise' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center">
            <img
              src="/businessstylist-logo-sml.png"
              alt="Businessstylist Logo"
              className="h-12 md:h-14 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-brand-secondary hover:text-brand-primary font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {session?.user ? (
              <>
                <Link
                  href={session.user.role === 'ADMIN' ? '/admin' : '/account'}
                  className="text-brand-secondary hover:text-brand-primary font-medium transition-colors"
                >
                  {session.user.role === 'ADMIN' ? 'Admin' : 'Mein Bereich'}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-brand-secondary hover:text-brand-primary font-medium transition-colors"
                >
                  Abmelden
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-brand-secondary hover:text-brand-primary font-medium transition-colors"
                >
                  Anmelden
                </Link>
                <Link href="/kontakt" className="btn-primary">
                  Kontakt
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-brand-secondary hover:text-brand-primary font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {session?.user ? (
                <>
                  <Link
                    href={session.user.role === 'ADMIN' ? '/admin' : '/account'}
                    className="text-brand-secondary hover:text-brand-primary font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {session.user.role === 'ADMIN' ? 'Admin' : 'Mein Bereich'}
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-brand-secondary hover:text-brand-primary font-medium transition-colors"
                  >
                    Abmelden
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="text-brand-secondary hover:text-brand-primary font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Anmelden
                  </Link>
                  <Link
                    href="/kontakt"
                    className="btn-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Kontakt
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
