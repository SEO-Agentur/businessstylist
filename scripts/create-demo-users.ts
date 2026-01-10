import { hash } from 'bcryptjs';
import { prisma } from '../lib/db/prisma';

async function main() {
  try {
    const userPassword = await hash('user', 12);
    const adminPassword = await hash('admin', 12);

    const existingUser = await prisma.user.findUnique({
      where: { email: 'user@demo.com' },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          name: 'Demo User',
          email: 'user@demo.com',
          password: userPassword,
          role: 'USER',
        },
      });
      console.log('Demo User erstellt: user@demo.com / user');
    } else {
      console.log('Demo User existiert bereits');
    }

    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@demo.com' },
    });

    if (!existingAdmin) {
      await prisma.user.create({
        data: {
          name: 'Demo Admin',
          email: 'admin@demo.com',
          password: adminPassword,
          role: 'ADMIN',
        },
      });
      console.log('Demo Admin erstellt: admin@demo.com / admin');
    } else {
      console.log('Demo Admin existiert bereits');
    }

    console.log('\nDemo-Logins:');
    console.log('User: user@demo.com / user');
    console.log('Admin: admin@demo.com / admin');
  } catch (error) {
    console.error('Fehler beim Erstellen der Demo-User:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
