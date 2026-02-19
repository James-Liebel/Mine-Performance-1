import { events } from '@/lib/content';
import { getButtonClasses } from '@/lib/button-classes';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Camps, clinics, and events at Mine Performance Academy.',
};

export default function EventsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="font-display text-3xl font-bold">Events</h1>
      <p className="mt-2 text-muted-foreground">
        Register for upcoming camps and clinics.
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {events.map((e) => (
          <article
            key={e.id}
            className="rounded-xl border bg-card p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold">{e.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{e.date}</p>
            <p className="mt-2 text-sm">{e.shortDescription}</p>
            <Link
              href={e.ctaPath}
              className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Register
            </Link>
          </article>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        For dates and registration, contact us.
      </p>
      <div className="mt-8">
        <Link href="/contact" className={getButtonClasses({ variant: 'secondary' })}>
          Contact us about events
        </Link>
      </div>
    </div>
  );
}
