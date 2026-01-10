import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/db/prisma';

export async function POST() {
  try {
    const userPassword = await hash('user', 12);
    const adminPassword = await hash('admin', 12);

    const existingUser = await prisma.user.findUnique({
      where: { email: 'user@demo.com' },
    });

    let userCreated = false;
    if (!existingUser) {
      await prisma.user.create({
        data: {
          name: 'Demo User',
          email: 'user@demo.com',
          password: userPassword,
          role: 'USER',
        },
      });
      userCreated = true;
    }

    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@demo.com' },
    });

    let adminCreated = false;
    if (!existingAdmin) {
      await prisma.user.create({
        data: {
          name: 'Demo Admin',
          email: 'admin@demo.com',
          password: adminPassword,
          role: 'ADMIN',
        },
      });
      adminCreated = true;
    }

    return NextResponse.json({
      message: 'Demo-User Setup abgeschlossen',
      userCreated,
      adminCreated,
      credentials: {
        user: { email: 'user@demo.com', password: 'user' },
        admin: { email: 'admin@demo.com', password: 'admin' },
      },
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Erstellen der Demo-User' },
      { status: 500 }
    );
  }
}
