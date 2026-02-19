'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { site } from '@/lib/content';
import { Menu, X } from 'lucide-react';
import { trackCtaClick } from '@/lib/analytics';
import { cn } from '@/lib/cn';

const navLinks = [
  { href: '/programs', label: 'Programs' },
  { href: '/coaches', label: 'Coaches' },
  { href: '/events', label: 'Events' },
  { href: '/results', label: 'Results' },
  { href: '/facility', label: 'Facility' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="font-display text-xl font-bold">
          {site.name}
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {label}
            </Link>
          ))}
          <Link href="/start" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Start here
          </Link>
          <Link
            href="/contact"
            onClick={() => trackCtaClick('Book evaluation', '/contact')}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 min-h-[44px]"
          >
            Book evaluation
          </Link>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/contact"
            onClick={() => trackCtaClick('Book evaluation (mobile)', '/contact')}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 min-h-[44px]"
          >
            Book
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            className="rounded-md p-2 hover:bg-muted min-h-[44px] min-w-[44px]"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t md:hidden">
          <nav className="container mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-md px-4 py-3 text-sm font-medium hover:bg-muted min-h-[44px] flex items-center"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/start"
              className="rounded-md px-4 py-3 text-sm font-medium hover:bg-muted min-h-[44px] flex items-center"
              onClick={() => setOpen(false)}
            >
              Start here
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
