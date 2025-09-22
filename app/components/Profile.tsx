'use client';

import { useEffect, useState } from 'react';
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
import { User } from "@prisma/client"

export default function Profile() {
  const [user, setUser] = useState<User | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/profile');
        setUser(res.data.user);
      } catch {
        router.push('/login');
      }
    };
    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    try {
      await axios.get('/api/logout');
      router.push('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your profile details.</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogout}>Logout</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
