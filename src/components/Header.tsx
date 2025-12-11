'use client';
import Link from 'next/link';
import { Scissors } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Auth } from './Auth';
import { useUser } from '@/firebase';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="transition-colors hover:text-primary"
  >
    {children}
  </Link>
);

export function Header() {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Scissors className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg">GoldenBarber</span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center gap-6 text-sm font-medium">
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/barbers">Barbers</NavLink>
          <NavLink href="/book-appointment">Book Appointment</NavLink>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4">
          <Auth />
        </div>
      </div>
    </header>
  );
}
