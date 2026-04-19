import { redirect } from 'next/navigation';
import Link from 'next/link';
import { requireAdmin } from '@/lib/auth/middleware';
import Card from '@/components/ui/Card';
import { prisma } from '@/lib/db/prisma';

export default async function AdminDashboardPage() {
  await requireAdmin();

  // Get counts
  const [userCount, orderCount, lookbookCount] = await Promise.all([
    prisma.user.count(),
    prisma.order.count(),
    prisma.lookbook.count(),
  ]);

  const [menuItemCount, productPageCount] = await Promise.all([
    prisma.menuItem.count(),
    prisma.productPage.count(),
  ]);

  const adminLinks = [
    {
      title: 'Menüverwaltung',
      href: '/admin/menu',
      description: 'Header & Footer Menüpunkte verwalten',
      count: menuItemCount,
    },
    {
      title: 'Produktseiten',
      href: '/admin/products',
      description: 'Produktseiten erstellen & bearbeiten',
      count: productPageCount,
    },
    {
      title: 'Nutzer',
      href: '/admin/users',
      description: 'Nutzerverwaltung, Rollen, Details',
      count: userCount,
    },
    {
      title: 'Lookbooks',
      href: '/admin/lookbooks',
      description: 'Upload, Zuordnung zu Kibbe-Typen',
      count: lookbookCount,
    },
    {
      title: 'Seiten (CMS)',
      href: '/admin/pages',
      description: 'Landingpages, SEO-Felder',
      count: 0,
    },
    {
      title: 'Bestellungen',
      href: '/admin/orders',
      description: 'Bestellungen & Status',
      count: orderCount,
    },
    {
      title: 'Nachrichten',
      href: '/admin/messages',
      description: 'Nachrichten an Nutzer senden',
      count: 0,
    },
  ];

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-h1 mb-2">Admin Dashboard</h1>
          <p className="text-brand-secondary">
            Verwaltung der Businessstylist-Plattform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card hover className="h-full">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-h3">{link.title}</h3>
                  {link.count > 0 && (
                    <span className="px-3 py-1 bg-brand-accent text-white rounded-full text-sm">
                      {link.count}
                    </span>
                  )}
                </div>
                <p className="text-brand-secondary">{link.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
