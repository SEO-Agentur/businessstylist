'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/forms/Input';
import { formatPrice } from '@/lib/utils/format';

interface ProductPage {
  id: string;
  slug: string;
  name: string;
  description: string;
  content: string;
  price: number | null;
  priceDisplay: string;
  status: string;
  createdAt: string;
}

export default function AdminProductsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<ProductPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductPage | null>(null);

  const [formData, setFormData] = useState({
    slug: '',
    name: '',
    description: '',
    content: '',
    price: '',
    priceDisplay: '',
    status: 'PUBLISHED',
    seoTitle: '',
    seoDescription: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (session?.user?.role !== 'ADMIN') {
      router.push('/');
    }
  }, [session, status, router]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/product-pages');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingProduct
        ? `/api/admin/product-pages/${editingProduct.id}`
        : '/api/admin/product-pages';

      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchProducts();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product: ProductPage) => {
    setEditingProduct(product);
    setFormData({
      slug: product.slug,
      name: product.name,
      description: product.description,
      content: product.content,
      price: product.price?.toString() || '',
      priceDisplay: product.priceDisplay,
      status: product.status,
      seoTitle: '',
      seoDescription: '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie diese Produktseite wirklich löschen?')) return;

    try {
      const response = await fetch(`/api/admin/product-pages/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      slug: '',
      name: '',
      description: '',
      content: '',
      price: '',
      priceDisplay: '',
      status: 'PUBLISHED',
      seoTitle: '',
      seoDescription: '',
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  if (loading || status === 'loading') {
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

  return (
    <div className="section-padding bg-brand-light min-h-screen">
      <div className="container-custom max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-h1 mb-2">Produktverwaltung</h1>
            <p className="text-brand-secondary">Verwalte Produktseiten und Services</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Abbrechen' : '+ Neue Produktseite'}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <h2 className="text-h3 mb-6">
              {editingProduct ? 'Produktseite bearbeiten' : 'Neue Produktseite'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  label="URL-Slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  placeholder="z.B. kleiderschrank-check"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Beschreibung</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Inhalt</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                  rows={8}
                  placeholder="HTML oder Markdown Inhalt..."
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Input
                  label="Preis (EUR)"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="179.00"
                />
                <Input
                  label="Preis Anzeige"
                  value={formData.priceDisplay}
                  onChange={(e) => setFormData({ ...formData, priceDisplay: e.target.value })}
                  placeholder="€ 179,-"
                />
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                  >
                    <option value="PUBLISHED">Veröffentlicht</option>
                    <option value="DRAFT">Entwurf</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-h4 mb-4">SEO</h3>
                <div className="space-y-4">
                  <Input
                    label="SEO Titel"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    placeholder="Optional: Überschreibt Standard-Titel"
                  />
                  <div>
                    <label className="block text-sm font-medium mb-2">SEO Beschreibung</label>
                    <textarea
                      value={formData.seoDescription}
                      onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                      rows={2}
                      placeholder="Optional: Meta-Beschreibung für Suchmaschinen"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" variant="primary">
                  {editingProduct ? 'Speichern' : 'Erstellen'}
                </Button>
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Abbrechen
                </Button>
              </div>
            </form>
          </Card>
        )}

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4">Name</th>
                  <th className="text-left py-4 px-4">Slug</th>
                  <th className="text-left py-4 px-4">Preis</th>
                  <th className="text-left py-4 px-4">Status</th>
                  <th className="text-right py-4 px-4">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-brand-secondary">
                      Keine Produktseiten gefunden
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium">{product.name}</td>
                      <td className="py-4 px-4 text-brand-secondary text-sm">/{product.slug}</td>
                      <td className="py-4 px-4">
                        {product.price ? formatPrice(product.price) : '-'}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          product.status === 'PUBLISHED'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {product.status === 'PUBLISHED' ? 'Veröffentlicht' : 'Entwurf'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-brand-accent hover:text-brand-accent-dark"
                        >
                          Bearbeiten
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Löschen
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
