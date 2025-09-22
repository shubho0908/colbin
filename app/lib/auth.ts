import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function verifyToken(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { error: 'Authorization token is required', status: 401 };
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    
    return { decoded, error: null };
  } catch {
    return { error: 'Invalid or expired token', status: 401 };
  }
}

export async function checkIfAuthenticated() {
  try {
    const tokenCookie = (await cookies()).get("token");
    if (!tokenCookie) {
      return { isAuthenticated: false };
    }

    const decoded = jwt.verify(tokenCookie.value, process.env.JWT_SECRET || 'fallback_secret_key');
    
    return { isAuthenticated: true, user: decoded };
  } catch {
    return { isAuthenticated: false };
  }
}