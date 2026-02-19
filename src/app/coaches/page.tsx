import { coaches, statstakUrl } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coaches',
  description: 'Meet the coaches and trainers at Mine Performance Academy.',
};

export default function CoachesPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="font-display text-3xl font-bold">Coaches</h1>
      <p className="mt-2 text-muted-foreground">
        Our staff bring credentials and experience to every session.
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {coaches.map((c) => (
          <article key={c.id} className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="h-32 w-full rounded-lg bg-muted" />
            <h2 className="mt-4 text-xl font-semibold">{c.name}</h2>
            {c.title && <p className="text-sm text-muted-foreground">{c.title}</p>}
            {c.bio && <p className="mt-2 text-sm">{c.bio}</p>}
            <div className="mt-3 flex flex-wrap gap-2">
              {c.categories.map((cat) => (
                <span key={cat} className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                  {cat}
                </span>
              ))}
            </div>
            <a
              href={statstakUrl(c.statstakPath)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Schedule with {c.name.split(' ')[0]}
            </a>
          </article>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        Full trainer list and booking:{' '}
        <a
          href={statstakUrl('/trainers')}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary hover:underline"
        >
          View on StatStak
        </a>
      </p>
    </div>
  );
}
