'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Loading from './loading';

export default function Profile() {
  const { user, isLoggedIn, isLoading, checkAuth, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoading, isLoggedIn, router]);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    logout();
    router.push('/login');
  };

  if (isLoading) {
    return <Loading />
  } 
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="shadow-lg">
          <CardHeader className="space-y-2 md:flex md:items-center md:justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Profile Dashboard</CardTitle>
              <CardDescription>Welcome back, {user.name}</CardDescription>
            </div>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="mt-4 md:mt-0 cursor-pointer"
            >
              Sign Out
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Email Address</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">September 2025</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Account Type</p>
                    <p className="font-medium">Job Seeker</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Profile Completion</p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="rounded-full h-2 bg-emerald-600" />
                    </div>
                    <p className="text-sm text-muted-foreground">100% Complete</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 p-2 rounded">
                    <div className="w-2 h-2 rounded-full bg-emerald-600" />
                    Active Status
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 cursor-pointer">
                    <span>Edit Profile</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 cursor-pointer">
                    <span>View Applications</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 cursor-pointer">
                    <span>Job Alerts</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 cursor-pointer">
                    <span>Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
