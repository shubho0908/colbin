'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Find Your Perfect Career
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Connect with top employers and opportunities that match your skills and aspirations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className='cursor-pointer' asChild size="lg">
              <Link href="/register">Get Started</Link>
            </Button>
            <Button className='cursor-pointer' variant="outline" size="lg" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <Card>
              <CardHeader>
                <CardTitle>Create Profile</CardTitle>
                <CardDescription>
                  Build your professional profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Showcase your skills, experience, and achievements to stand out to potential employers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Apply for Jobs</CardTitle>
                <CardDescription>
                  Find opportunities that match your skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Browse through curated job listings and apply to positions that align with your career goals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connect</CardTitle>
                <CardDescription>
                  Network with professionals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Build meaningful connections with industry professionals and expand your network.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
