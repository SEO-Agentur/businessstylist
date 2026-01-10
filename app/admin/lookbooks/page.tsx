import { requireAdmin } from '@/lib/auth/middleware';
import Card from '@/components/ui/Card';

export default async function AdminLookbooksPage() {
  await requireAdmin();

  return (
    <div className="section-padding">
      <div className="container-custom">
        <h1 className="text-h1 mb-8">Lookbook-Verwaltung</h1>

        <Card className="p-8">
          <p className="text-brand-secondary mb-4">
            Hier können Lookbooks hochgeladen und Kibbe-Typen zugeordnet werden.
          </p>
          <p className="text-sm text-brand-secondary">
            TODO: Implementierung Upload-Formular, Lookbook-Liste, Bearbeitung
          </p>
        </Card>
      </div>
    </div>
  );
}
