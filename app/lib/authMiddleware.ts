import { NextResponse } from 'next/server';
import { checkIfAuthenticated } from './auth';

export async function redirectIfAuthenticated() {
  const { isAuthenticated } = await checkIfAuthenticated();
  
  if (isAuthenticated) {
    return NextResponse.json(
      { error: 'You are already logged in' },
      { status: 403 }
    );
  }
  
  return null;
}