'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalMenuItems: 0,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (session?.user?.role !== 'ADMIN') {
      router.push('/');
    }
  }, [session, status, router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [menuResponse, productsResponse] = await Promise.all([
          fetch('/api/admin/menu-items'),
          fetch('/api/admin/product-pages'),
        ]);

        const menuData = await menuResponse.json();
        const productsData = await productsResponse.json();

        setStats({
          totalUsers: 0,
          totalProducts: productsData.length || 0,
          totalMenuItems: menuData.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    if (session?.user?.role === 'ADMIN') {
      fetchStats();
    }
  }, [session]);

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

  const adminActions = [
    {
      title: 'Menüverwaltung',
      description: 'Header & Footer Menüpunkte verwalten',
      href: '/admin/menu',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
      count: stats.totalMenuItems,
    },
    {
      title: 'Produktverwaltung',
      description: 'Produktseiten erstellen & bearbeiten',
      href: '/admin/products',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      count: stats.totalProducts,
    },
    {
      title: 'Benutzerverwaltung',
      description: 'Benutzer verwalten & Rollen zuweisen',
      href: '/admin/users',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      count: stats.totalUsers,
    },
    {
      title: 'Lookbooks',
      description: 'Lookbooks verwalten & zuweisen',
      href: '/admin/lookbooks',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      count: 0,
    },
    {
      title: 'Seiten',
      description: 'CMS Seiten bearbeiten',
      href: '/admin/pages',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      count: 0,
    },
    {
      title: 'Einstellungen',
      description: 'Systemeinstellungen & Konfiguration',
      href: '/admin',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      count: null,
    },
  ];

  return (
    <div className="section-padding bg-brand-light min-h-screen">
      <div className="container-custom max-w-7xl">
        <div className="mb-12">
          <h1 className="text-h1 mb-2">Admin Dashboard</h1>
          <p className="text-brand-secondary">Verwaltung & Konfiguration</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-secondary mb-1">Menüpunkte</p>
                <p className="text-3xl font-bold text-brand-primary">{stats.totalMenuItems}</p>
              </div>
              <div className="text-brand-accent">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-secondary mb-1">Produktseiten</p>
                <p className="text-3xl font-bold text-brand-primary">{stats.totalProducts}</p>
              </div>
              <div className="text-brand-accent">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-secondary mb-1">Benutzer</p>
                <p className="text-3xl font-bold text-brand-primary">{stats.totalUsers}</p>
              </div>
              <div className="text-brand-accent">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-h2 mb-6">Verwaltungsbereiche</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card hover className="h-full cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="text-brand-accent flex-shrink-0">
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="text-h4 mb-2">{action.title}</h3>
                        {action.count !== null && (
                          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-brand-accent bg-brand-accent bg-opacity-10 rounded-full">
                            {action.count}
                          </span>
                        )}
                      </div>
                      <p className="text-brand-secondary text-sm">{action.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <Card>
          <h2 className="text-h2 mb-6">Schnellaktionen</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/menu">
              <Button variant="primary">+ Neuer Menüpunkt</Button>
            </Link>
            <Link href="/admin/products">
              <Button variant="primary">+ Neue Produktseite</Button>
            </Link>
            <Link href="/admin/users">
              <Button variant="secondary">Benutzer verwalten</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
