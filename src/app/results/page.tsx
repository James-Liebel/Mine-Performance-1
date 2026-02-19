import Link from 'next/link';
import { leaderboardHighlights } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Results & Leaderboard',
  description: 'Athlete results and leaderboard highlights from Mine Performance Academy.',
};

const metricDefinitions: { name: string; description: string }[] = [
  { name: '60yd', description: 'Placeholder — needs client content. (e.g. 60-yard dash time in seconds.)' },
  { name: 'C Velo', description: 'Placeholder — needs client content. (e.g. Catching velocity in mph.)' },
  { name: 'Exit Velo', description: 'Placeholder — needs client content. (e.g. Exit velocity off the bat in mph.)' },
  { name: 'FB Velo', description: 'Placeholder — needs client content. (e.g. Fastball velocity in mph.)' },
];

export default function ResultsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="font-display text-3xl font-bold">Results & Leaderboard</h1>
      <p className="mt-2 text-muted-foreground">
        {leaderboardHighlights.description}
      </p>

      <section className="mt-10" aria-labelledby="metric-definitions">
        <h2 id="metric-definitions" className="text-xl font-semibold">What we measure</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          These metrics are tracked on our platform. Placeholder — needs client content for &ldquo;what good looks like&rdquo; (e.g. age-band benchmarks).
        </p>
        <ul className="mt-4 space-y-3">
          {metricDefinitions.map((m) => (
            <li key={m.name} className="rounded-lg border bg-card p-4">
              <span className="font-medium">{m.name}</span>
              <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 rounded-xl border bg-card p-8 text-center">
        <p className="text-muted-foreground">
          Full leaderboards, velocity data, and athlete metrics are tracked on our training platform.
        </p>
        <Link
          href={leaderboardHighlights.ctaPath}
          className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {leaderboardHighlights.cta}
        </Link>
      </div>
    </div>
  );
}
