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
  const stilberatungDropdown = [
    { label: 'Stilberatung', href: '/stilberatung' },
    { label: 'Farbberatung', href: '/farbtyp-beratung' },
    { label: 'Kleiderschrank Check', href: '/kleiderschrank-check' },
    { label: 'Dresscode Playbook', href: '/dresscode-playbook' },
    { label: 'Lookbook', href: '/lookbook' },
  ];

  const defaultLinks: MenuItem[] = [
    { id: '1', href: '/stilberatung', label: 'Stilberatung', external: false },
    { id: '2', href: '/kibbe-body-type-test', label: 'Typberatung', external: false },
    { id: '3', href: '/downloads', label: 'Downloads', external: false },
    { id: '4', href: '/shop', label: 'Shop', external: false },
    { id: '5', href: '/ueber-mich', label: 'Über mich', external: false },
  ];

  const [navigationLinks, setNavigationLinks] = useState<MenuItem[]>(defaultLinks);

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
      <noscript>
        <style>{`.js-only{display:none !important}`}</style>
      </noscript>
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
            {navigationLinks.map((link) => {
              if (link.label === 'Stilberatung') {
                return (
                  <div
                    key={link.href}
                    className="relative group"
                  >
                    <a href={link.href} className="text-brand-secondary hover:text-brand-primary font-medium transition-colors flex items-center gap-1 py-2">
                      {link.label}
                      <svg
                        className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </a>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 hidden group-hover:block">
                      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 py-3 w-64 overflow-hidden">
                        {stilberatungDropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-6 py-3 text-brand-secondary hover:bg-gradient-to-r hover:from-brand-primary/5 hover:to-brand-accent/5 hover:text-brand-primary transition-all duration-200 font-medium border-l-3 border-transparent hover:border-brand-accent"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent opacity-60"></span>
                              {item.label}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-brand-secondary hover:text-brand-primary font-medium transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}
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
                  href={session.user.role === 'ADMIN' ? '/admin/dashboard' : '/account/dashboard'}
                  className="text-brand-secondary hover:text-brand-primary font-medium transition-colors"
                >
                  {session.user.role === 'ADMIN' ? 'Admin' : 'Mein Bereich'}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
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

          <noscript>
            <a href="#mobile-menu" className="md:hidden p-2 text-brand-secondary" aria-label="Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </a>
          </noscript>
          <button
            className="md:hidden p-2 js-only"
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

        <noscript>
          <div id="mobile-menu" className="md:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              {defaultLinks.map((link) => {
                if (link.label === 'Stilberatung') {
                  return (
                    <details key={link.href} className="group">
                      <summary className="flex items-center justify-between cursor-pointer text-brand-secondary hover:text-brand-primary font-medium transition-colors list-none">
                        <span>{link.label}</span>
                        <svg className="w-4 h-4 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-200">
                        {stilberatungDropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm text-brand-secondary hover:text-brand-primary transition-colors block"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-brand-secondary hover:text-brand-primary font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link href="/checkout" className="text-brand-secondary hover:text-brand-primary font-medium transition-colors">
                Warenkorb
              </Link>
              <Link href="/auth/signin" className="text-brand-secondary hover:text-brand-primary font-medium transition-colors">
                Anmelden
              </Link>
              <Link href="/kontakt" className="btn-primary">
                Kontakt
              </Link>
            </div>
          </div>
        </noscript>
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              {navigationLinks.map((link) => {
                if (link.label === 'Stilberatung') {
                  return (
                    <div key={link.href} className="space-y-2">
                      <Link
                        href={link.href}
                        className="text-brand-secondary hover:text-brand-primary font-medium transition-colors block"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                      <div className="pl-4 space-y-2 border-l-2 border-gray-200">
                        {stilberatungDropdown.slice(1).map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm text-brand-secondary hover:text-brand-primary transition-colors block"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-brand-secondary hover:text-brand-primary font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
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
                    href={session.user.role === 'ADMIN' ? '/admin/dashboard' : '/account/dashboard'}
                    className="text-brand-secondary hover:text-brand-primary font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {session.user.role === 'ADMIN' ? 'Admin' : 'Mein Bereich'}
                  </Link>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: '/' });
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
