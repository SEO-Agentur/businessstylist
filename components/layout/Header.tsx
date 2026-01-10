'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/context/CartContext';

interface MenuItem {
  id: string;
  label: string;
  href: string;
  external: boolean;
}

export default function Header() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const [navigationLinks, setNavigationLinks] = useState<MenuItem[]>([]);

  const defaultLinks = [
    { id: '1', href: '/stilberatung', label: 'Stilberatung', external: false },
    { id: '2', href: '/typenanalyse', label: 'Typberatung', external: false },
    { id: '3', href: '/downloads', label: 'Downloads', external: false },
    { id: '4', href: '/shop', label: 'Shop', external: false },
    { id: '5', href: '/preise', label: 'Preise', external: false },
  ];

  useEffect(() => {
    fetch('/api/admin/menu-items?position=HEADER')
      .then(res => res.json())
      .then(data => {
        const visibleItems = data.filter((item: MenuItem & { visible: boolean }) => item.visible);
        if (visibleItems.length > 0) {
          setNavigationLinks(visibleItems);
        } else {
          setNavigationLinks(defaultLinks);
        }
      })
      .catch(() => {
        setNavigationLinks(defaultLinks);
      });
  }, []);

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
            <Link
              href="/checkout"
              className="relative text-brand-secondary hover:text-brand-primary transition-colors p-2"
              aria-label="Warenkorb"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
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
              <Link
                href="/checkout"
                className="flex items-center text-brand-secondary hover:text-brand-primary font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Warenkorb {totalItems > 0 && `(${totalItems})`}
              </Link>
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
