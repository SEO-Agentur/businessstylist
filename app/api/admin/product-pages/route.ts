import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { prisma } from '@/lib/db/prisma';

export async function GET() {
  try {
    const productPages = await prisma.productPage.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(productPages);
  } catch (error) {
    console.error('Error fetching product pages:', error);
    return NextResponse.json({ error: 'Failed to fetch product pages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const productPage = await prisma.productPage.create({
      data: {
        slug: data.slug,
        name: data.name,
        description: data.description || '',
        content: data.content || '',
        price: data.price ? parseFloat(data.price) : null,
        priceDisplay: data.priceDisplay || '',
        stripePriceId: data.stripePriceId || null,
        status: data.status || 'PUBLISHED',
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
      },
    });

    return NextResponse.json(productPage, { status: 201 });
  } catch (error) {
    console.error('Error creating product page:', error);
    return NextResponse.json({ error: 'Failed to create product page' }, { status: 500 });
  }
}
