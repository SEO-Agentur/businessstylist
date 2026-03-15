'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function UserDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="section-padding">
        <div className="container-custom flex justify-center items-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent mx-auto mb-4"></div>
            <p>Lädt...</p>
          </div>
        </div>
      </div>
    );
  }

  const quickActions = [
    {
      title: 'Typanalyse',
      description: 'Entdecke Deinen Stiltyp',
      href: '/kibbe-body-type-test/start',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Downloads',
      description: 'Deine Dateien & Guides',
      href: '/downloads',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      ),
    },
    {
      title: 'Meine Bestellungen',
      description: 'Übersicht Deiner Käufe',
      href: '/account',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      title: 'Shop',
      description: 'Services & Produkte',
      href: '/shop',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="section-padding bg-brand-light min-h-screen">
      <div className="container-custom max-w-6xl">
        <div className="mb-12">
          <h1 className="text-h1 mb-2">Willkommen zurück{session?.user?.name ? `, ${session.user.name}` : ''}!</h1>
          <p className="text-brand-secondary">Dein persönlicher Bereich</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card hover className="h-full cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="text-brand-accent flex-shrink-0">
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="text-h3 mb-2">{action.title}</h3>
                    <p className="text-brand-secondary">{action.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="mb-8">
          <h2 className="text-h2 mb-6">Dein Profil</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-brand-secondary">E-Mail</label>
              <p className="text-brand-primary font-medium">{session?.user?.email}</p>
            </div>
            {session?.user?.name && (
              <div>
                <label className="text-sm font-medium text-brand-secondary">Name</label>
                <p className="text-brand-primary font-medium">{session.user.name}</p>
              </div>
            )}
            <div className="pt-4">
              <Link href="/account">
                <Button variant="secondary">Profil bearbeiten</Button>
              </Link>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-h2 mb-6">Empfohlene Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Stilberatung',
                description: 'Persönliche 1:1 Beratung',
                href: '/stilberatung',
                price: 'ab € 197,-',
              },
              {
                title: 'Kleiderschrank Check',
                description: 'Optimiere Deine Garderobe',
                href: '/kleiderschrank-check',
                price: '€ 179,-',
              },
              {
                title: 'Capsule Wardrobe',
                description: 'Minimalistisch & Stilvoll',
                href: '/capsule-wardrobe',
                price: 'auf Anfrage',
              },
            ].map((service, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-brand-accent transition-colors">
                <h3 className="text-h4 mb-2">{service.title}</h3>
                <p className="text-brand-secondary text-sm mb-4">{service.description}</p>
                <p className="text-brand-accent font-semibold mb-4">{service.price}</p>
                <Link href={service.href}>
                  <Button variant="secondary" size="sm" className="w-full">
                    Mehr erfahren
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
