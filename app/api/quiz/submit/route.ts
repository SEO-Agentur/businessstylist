import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { calculateScores, determineKibbeType, getKibbeTypeInfo } from '@/lib/quiz/scoring';
import { sendEmail, generateWelcomeEmail } from '@/lib/email/service';
import { hash } from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { answers, email, phone, consent, newsletter } = body;

    // Validate input
    if (!answers || !email || !phone || !consent) {
      return NextResponse.json(
        { error: 'Alle Pflichtfelder müssen ausgefüllt sein' },
        { status: 400 }
      );
    }

    // Calculate scores and determine type
    const scores = calculateScores(answers);
    const kibbeType = determineKibbeType(scores);
    const typeInfo = getKibbeTypeInfo(kibbeType);

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    let isNewUser = false;
    let generatedPassword = '';

    if (!user) {
      // Generate random password
      generatedPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
      const hashedPassword = await hash(generatedPassword, 10);

      // Create new user
      user = await prisma.user.create({
        data: {
          email,
          phone,
          password: hashedPassword,
          role: 'USER',
        },
      });

      isNewUser = true;
    } else {
      // Update phone if provided
      if (phone && !user.phone) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { phone },
        });
      }
    }

    // Save quiz result
    await prisma.quizResult.create({
      data: {
        userId: user.id,
        resultType: kibbeType,
        answers: JSON.stringify(answers),
        scores: JSON.stringify(scores),
        phone,
      },
    });

    // Send welcome email if new user
    if (isNewUser) {
      const emailHtml = generateWelcomeEmail(
        user.name || email.split('@')[0],
        generatedPassword,
        typeInfo.name
      );

      await sendEmail({
        to: email,
        subject: 'Deine Typenanalyse-Ergebnis bei Businessstylist',
        html: emailHtml,
      });
    }

    return NextResponse.json({
      success: true,
      message: isNewUser
        ? 'Dein Account wurde erstellt. Wir haben dir dein Passwort per E-Mail gesendet.'
        : 'Deine Analyse wurde gespeichert.',
      userId: user.id,
      kibbeType,
    });
  } catch (error) {
    console.error('Quiz submit error:', error);
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.' },
      { status: 500 }
    );
  }
}
