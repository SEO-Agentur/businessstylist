import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { prisma } from '@/lib/db/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productPage = await prisma.productPage.findUnique({
      where: { id: params.id },
    });

    if (!productPage) {
      return NextResponse.json({ error: 'Product page not found' }, { status: 404 });
    }

    return NextResponse.json(productPage);
  } catch (error) {
    console.error('Error fetching product page:', error);
    return NextResponse.json({ error: 'Failed to fetch product page' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const productPage = await prisma.productPage.update({
      where: { id: params.id },
      data: {
        slug: data.slug,
        name: data.name,
        description: data.description,
        content: data.content,
        price: data.price ? parseFloat(data.price) : null,
        priceDisplay: data.priceDisplay,
        stripePriceId: data.stripePriceId || null,
        status: data.status,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
      },
    });

    return NextResponse.json(productPage);
  } catch (error) {
    console.error('Error updating product page:', error);
    return NextResponse.json({ error: 'Failed to update product page' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.productPage.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product page:', error);
    return NextResponse.json({ error: 'Failed to delete product page' }, { status: 500 });
  }
}
