import Link from 'next/link';
import { programs } from '@/lib/content';
import { getButtonClasses } from '@/lib/button-classes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Programs',
  description:
    'Velocity, pitch design, hitting, strength, and rehab programs at Mine Performance Academy.',
};

export default function ProgramsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="font-display text-3xl font-normal tracking-tight text-foreground">Programs</h1>
      <p className="mt-2 text-muted-foreground">
        Choose the right program for your goals. Book an evaluation to get started.
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((p) => (
          <article
            key={p.id}
            className="flex flex-col rounded-xl border bg-card p-6 shadow-sm"
          >
            <span className="text-sm font-medium text-muted-foreground">{p.category}</span>
            <h2 className="mt-1 text-xl font-semibold">{p.name}</h2>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.shortDescription}</p>
            <p className="mt-3 text-sm">{p.description}</p>
            <Link
              href={p.ctaPath}
              className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {p.cta}
            </Link>
          </article>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link href="/start" className={getButtonClasses({ variant: 'secondary' })}>
          Not sure? Start here — find your program
        </Link>
      </div>
    </div>
  );
}
