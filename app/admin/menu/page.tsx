'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/forms/Input';

interface MenuItem {
  id: string;
  label: string;
  href: string;
  position: string;
  order: number;
  parentId: string | null;
  external: boolean;
  visible: boolean;
  children?: MenuItem[];
}

export default function AdminMenuPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [filter, setFilter] = useState<'HEADER' | 'FOOTER' | 'ALL'>('ALL');

  const [formData, setFormData] = useState({
    label: '',
    href: '',
    position: 'HEADER',
    order: 0,
    external: false,
    visible: true,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (session?.user?.role !== 'ADMIN') {
      router.push('/');
    }
  }, [session, status, router]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/admin/menu-items');
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingItem
        ? `/api/admin/menu-items/${editingItem.id}`
        : '/api/admin/menu-items';

      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchMenuItems();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving menu item:', error);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      label: item.label,
      href: item.href,
      position: item.position,
      order: item.order,
      external: item.external,
      visible: item.visible,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie diesen Menüpunkt wirklich löschen?')) return;

    try {
      const response = await fetch(`/api/admin/menu-items/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchMenuItems();
      }
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      label: '',
      href: '',
      position: 'HEADER',
      order: 0,
      external: false,
      visible: true,
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const filteredMenuItems = filter === 'ALL'
    ? menuItems
    : menuItems.filter(item => item.position === filter);

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
            <h1 className="text-h1 mb-2">Menüverwaltung</h1>
            <p className="text-brand-secondary">Verwalte Header- und Footer-Menüpunkte</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Abbrechen' : '+ Neuer Menüpunkt'}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <h2 className="text-h3 mb-6">
              {editingItem ? 'Menüpunkt bearbeiten' : 'Neuer Menüpunkt'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Label"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  required
                />
                <Input
                  label="URL/Pfad"
                  value={formData.href}
                  onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                  required
                  placeholder="/seite oder https://..."
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Position</label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                  >
                    <option value="HEADER">Header</option>
                    <option value="FOOTER">Footer</option>
                  </select>
                </div>

                <Input
                  label="Reihenfolge"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                />

                <div className="space-y-3 pt-8">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.external}
                      onChange={(e) => setFormData({ ...formData, external: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Externer Link</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.visible}
                      onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Sichtbar</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" variant="primary">
                  {editingItem ? 'Speichern' : 'Erstellen'}
                </Button>
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Abbrechen
                </Button>
              </div>
            </form>
          </Card>
        )}

        <div className="mb-6 flex gap-4">
          <Button
            variant={filter === 'ALL' ? 'primary' : 'secondary'}
            onClick={() => setFilter('ALL')}
          >
            Alle
          </Button>
          <Button
            variant={filter === 'HEADER' ? 'primary' : 'secondary'}
            onClick={() => setFilter('HEADER')}
          >
            Header
          </Button>
          <Button
            variant={filter === 'FOOTER' ? 'primary' : 'secondary'}
            onClick={() => setFilter('FOOTER')}
          >
            Footer
          </Button>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4">Label</th>
                  <th className="text-left py-4 px-4">URL</th>
                  <th className="text-left py-4 px-4">Position</th>
                  <th className="text-left py-4 px-4">Reihenfolge</th>
                  <th className="text-left py-4 px-4">Status</th>
                  <th className="text-right py-4 px-4">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {filteredMenuItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-brand-secondary">
                      Keine Menüpunkte gefunden
                    </td>
                  </tr>
                ) : (
                  filteredMenuItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium">{item.label}</td>
                      <td className="py-4 px-4 text-brand-secondary text-sm">{item.href}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          item.position === 'HEADER'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {item.position}
                        </span>
                      </td>
                      <td className="py-4 px-4">{item.order}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          item.visible
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.visible ? 'Sichtbar' : 'Versteckt'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-brand-accent hover:text-brand-accent-dark"
                        >
                          Bearbeiten
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
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
