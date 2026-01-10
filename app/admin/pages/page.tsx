import { requireAdmin } from '@/lib/auth/middleware';
import Card from '@/components/ui/Card';
import { prisma } from '@/lib/db/prisma';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default async function AdminPagesPage() {
  await requireAdmin();

  const pages = await prisma.page.findMany({
    orderBy: { updatedAt: 'desc' },
  });

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-h1">Seiten-Verwaltung (CMS)</h1>
          <Link href="/admin/pages/new">
            <Button>Neue Seite</Button>
          </Link>
        </div>

        {pages.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-brand-secondary">
              Noch keine Seiten vorhanden. Erstelle deine erste Seite.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {pages.map((page) => (
              <Card key={page.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-h3 mb-2">{page.title}</h3>
                    <p className="text-sm text-brand-secondary mb-2">
                      /{page.slug}
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm ${
                        page.status === 'PUBLISHED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {page.status}
                    </span>
                  </div>
                  <Link href={`/admin/pages/${page.id}`}>
                    <Button variant="secondary" size="sm">
                      Bearbeiten
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Card className="p-6 bg-brand-light">
            <h3 className="font-semibold mb-2">CMS Features:</h3>
            <ul className="text-sm text-brand-secondary space-y-1">
              <li>✓ Titel, Slug, Content (MDX/Markdown)</li>
              <li>✓ SEO-Felder (Title, Description, Canonical, OG, Twitter)</li>
              <li>✓ Dublin Core Meta (DC Title, Description, Creator, Language)</li>
              <li>✓ Schema JSON-LD (frei editierbar)</li>
              <li>✓ Status (Draft/Published)</li>
              <li>TODO: Rich Text Editor, Bildupload, Preview</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
