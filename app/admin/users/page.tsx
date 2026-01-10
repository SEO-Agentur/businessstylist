import { requireAdmin } from '@/lib/auth/middleware';
import { prisma } from '@/lib/db/prisma';
import Card from '@/components/ui/Card';
import { formatDate } from '@/lib/utils/format';

export default async function AdminUsersPage() {
  await requireAdmin();

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: {
          orders: true,
          quizResults: true,
        },
      },
    },
  });

  return (
    <div className="section-padding">
      <div className="container-custom">
        <h1 className="text-h1 mb-8">Nutzerverwaltung</h1>

        <Card className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-semibold">E-Mail</th>
                <th className="text-left p-4 font-semibold">Name</th>
                <th className="text-left p-4 font-semibold">Rolle</th>
                <th className="text-left p-4 font-semibold">Bestellungen</th>
                <th className="text-left p-4 font-semibold">Quiz</th>
                <th className="text-left p-4 font-semibold">Registriert</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.name || '-'}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        user.role === 'ADMIN'
                          ? 'bg-brand-accent text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">{user._count.orders}</td>
                  <td className="p-4">{user._count.quizResults}</td>
                  <td className="p-4 text-sm text-brand-secondary">
                    {formatDate(user.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
