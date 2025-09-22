import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { redirectIfAuthenticated } from '@/app/lib/authMiddleware';
import { registerSchema } from '@/app/lib/schemas/authSchemas';
import z from 'zod';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const redirectResponse = await redirectIfAuthenticated();
  if (redirectResponse) {
    return redirectResponse;
  }

  try {
    const body = await request.json();
    
    const result = registerSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: z.treeifyError(result.error).properties
        },
        { status: 400 }
      );
    }
    
    const { email, password, name } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { user: userWithoutPassword, message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}