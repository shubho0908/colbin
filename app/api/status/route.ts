import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    const tokenCookie = (await cookies()).get('token');
    if (!tokenCookie) {
      return NextResponse.json({ loggedIn: false }, { status: 200 });
    }
    try {
      jwt.verify(tokenCookie.value, process.env.JWT_SECRET || 'fallback_secret_key');
      return NextResponse.json({ loggedIn: true }, { status: 200 });
    } catch {
      return NextResponse.json({ loggedIn: false }, { status: 200 });
    }
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
