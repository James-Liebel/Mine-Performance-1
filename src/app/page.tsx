import Link from 'next/link';
import { site, programs, testimonials, events, leaderboardHighlights, statstakUrl } from '@/lib/content';
import { getButtonClasses } from '@/lib/button-classes';

export default function HomePage() {
  return (
    <>
      <section className="border-b bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 text-center md:px-6">
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {site.tagline}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {site.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={statstakUrl('/')}
              target="_blank"
              rel="noopener noreferrer"
              className={getButtonClasses({ size: 'lg' })}
            >
              Book evaluation
            </a>
            <Link href="/start" className={getButtonClasses({ variant: 'secondary', size: 'lg' })}>
              Start here — find your program
            </Link>
          </div>
        </div>
      </section>

      <section id="programs" className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Programs</h2>
          <p className="mt-2 text-muted-foreground">Choose your path. We’ll help you get there.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.slice(0, 6).map((p) => (
              <article
                key={p.id}
                className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="text-sm font-medium text-muted-foreground">{p.category}</span>
                <h3 className="mt-1 text-xl font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.shortDescription}</p>
                <a
                  href={statstakUrl(p.statstakPath)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  {p.cta}
                </a>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/programs" className={getButtonClasses({ variant: 'secondary' })}>
              View all programs
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Results</h2>
          <p className="mt-2 text-muted-foreground">{leaderboardHighlights.description}</p>
          <div className="mt-6">
            <a
              href={statstakUrl(leaderboardHighlights.statstakPath)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {leaderboardHighlights.cta}
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Upcoming events</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {events.slice(0, 2).map((e) => (
              <article
                key={e.id}
                className="rounded-xl border bg-card p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold">{e.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{e.date}</p>
                <p className="mt-2 text-sm">{e.shortDescription}</p>
                <a
                  href={statstakUrl(e.statstakPath)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                  Register
                </a>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/events" className={getButtonClasses({ variant: 'secondary' })}>
              View all events
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-2xl font-bold md:text-3xl">What families say</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="rounded-lg border bg-background p-6">
                <p className="text-foreground">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 text-sm text-muted-foreground">
                  — {t.author}
                  {t.context && <span>, {t.context}</span>}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 text-center md:px-6">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Ready to start?</h2>
          <p className="mt-2 text-muted-foreground">Book an evaluation or take the Start here quiz.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={statstakUrl('/')}
              target="_blank"
              rel="noopener noreferrer"
              className={getButtonClasses({ size: 'lg' })}
            >
              Book evaluation
            </a>
            <Link href="/start" className={getButtonClasses({ variant: 'secondary', size: 'lg' })}>
              Start here
            </Link>
            <Link href="/contact" className={getButtonClasses({ variant: 'outline', size: 'lg' })}>
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
