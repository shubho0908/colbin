
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const tokenCookie = (await cookies()).get('token');
    if (!tokenCookie) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    let decoded: string | JwtPayload;
    try {
      decoded = jwt.verify(tokenCookie.value, process.env.JWT_SECRET || 'fallback_secret_key');
    } catch {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    if (!decoded || typeof decoded === 'string') {
      return NextResponse.json(
        { error: 'Invalid token payload' },
        { status: 401 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { id: (decoded as JwtPayload).userId as string },
    });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(
      { user: userWithoutPassword },
      { status: 200 }
    );
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}