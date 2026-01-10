import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email, leadMagnet } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Bitte gib eine gültige E-Mail-Adresse ein.' },
        { status: 400 }
      );
    }

    const existingSubscriber = await prisma.user.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      if (leadMagnet) {
        const downloadUrl = getLeadMagnetUrl(leadMagnet);
        return NextResponse.json({
          success: true,
          message: 'Du bist bereits angemeldet. Hier ist dein Download!',
          downloadUrl,
        });
      }

      return NextResponse.json(
        { error: 'Diese E-Mail-Adresse ist bereits registriert.' },
        { status: 400 }
      );
    }

    const downloadUrl = leadMagnet ? getLeadMagnetUrl(leadMagnet) : null;

    return NextResponse.json({
      success: true,
      message: 'Erfolgreich angemeldet!',
      downloadUrl,
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.' },
      { status: 500 }
    );
  }
}

function getLeadMagnetUrl(leadMagnet: string): string {
  const leadMagnets: Record<string, string> = {
    'smart-casual': '/smart-casual-checkliste.pdf',
    'dresscode-playbook': '/dresscode-playbook.pdf',
  };

  return leadMagnets[leadMagnet] || '/';
}
