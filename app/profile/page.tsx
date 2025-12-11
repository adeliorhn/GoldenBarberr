'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function useRequireAuth() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  return { user, loading: isUserLoading };
};

export default function ProfilePage() {
  const { user, loading } = useRequireAuth();

  if (loading || !user) {
    return (
      <div className="container py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="items-center text-center">
              <Skeleton className="h-24 w-24 rounded-full" />
              <Skeleton className="h-8 w-48 mt-4" />
              <Skeleton className="h-4 w-64 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full mt-4" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="items-center text-center">
            <Avatar className="w-24 h-24 border-4 border-primary">
              <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
              <AvatarFallback className="text-3xl">
                {user.displayName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4 text-3xl font-headline">{user.displayName}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              Welcome to your GoldenBarber profile. Here you can manage your appointments and preferences.
            </p>
            <Button asChild>
              <Link href="/book-appointment">Book a New Appointment</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
