'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuthStore } from '../store/useAuthStore';
import Loading from './loading';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, isLoading, login } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.push('/profile');
    }
  }, [isLoading, isLoggedIn, router]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('/api/login', { email, password });
      login(res.data.user);
      toast.success('Login successful!');
      setTimeout(() => {
        router.push('/profile');
      }, 200);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const details = err.response?.data?.details as Record<
          string,
          { errors: string[] }
        > | undefined;

        let msg = err.response?.data.error;

        if (details) {
          msg = Object.values(details)
            .map((field) => field.errors.join(', '))
            .join(', ');
        }

        setError(msg);
        toast.error(msg);
      } else {
        setError('An unexpected error occurred');
        toast.error('An unexpected error occurred');
      }

    } finally {
      setLoading(false);
    }
  };
  if (isLoading || isLoggedIn) {
    return <Loading />
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <Card className="w-full max-w-[400px] shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>
            {error && (
              <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full cursor-pointer" 
              disabled={loading || !email || !password}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Logging in...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2">
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Button variant="link" className="p-0 cursor-pointer" disabled={isLoading} onClick={() => router.push('/register')}>
              Sign up
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
