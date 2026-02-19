import { leaderboardHighlights, statstakUrl } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Results & Leaderboard',
  description: 'Athlete results and leaderboard highlights from Mine Performance Academy.',
};

export default function ResultsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="font-display text-3xl font-bold">Results & Leaderboard</h1>
      <p className="mt-2 text-muted-foreground">
        {leaderboardHighlights.description}
      </p>
      <div className="mt-10 rounded-xl border bg-card p-8 text-center">
        <p className="text-muted-foreground">
          Full leaderboards, velocity data, and athlete metrics are tracked on our training platform.
        </p>
        <a
          href={statstakUrl(leaderboardHighlights.statstakPath)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {leaderboardHighlights.cta}
        </a>
      </div>
    </div>
  );
}
