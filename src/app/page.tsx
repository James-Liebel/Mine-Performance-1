import Link from 'next/link';
import { site, programs, testimonials, events, leaderboardHighlights } from '@/lib/content';
import { getButtonClasses } from '@/lib/button-classes';

export default function HomePage() {
  return (
    <>
      <section className="border-b border-border bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 text-center md:px-6">
          <p className="font-display text-sm tracking-[0.2em] text-accent uppercase">Mine Performance Academy</p>
          <h1 className="font-display mt-2 text-3xl font-normal tracking-tight md:text-4xl lg:text-5xl text-foreground">
            {site.tagline}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {site.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className={getButtonClasses({ size: 'lg' })}>
              Book evaluation
            </Link>
            <Link href="/start" className={getButtonClasses({ variant: 'accent', size: 'lg' })}>
              Start here — find your program
            </Link>
          </div>
        </div>
      </section>

      <section id="programs" className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-2xl font-normal tracking-tight md:text-3xl text-foreground">Programs</h2>
          <p className="mt-2 text-muted-foreground">Choose your path. We’ll help you get there.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.slice(0, 6).map((p) => (
              <article
                key={p.id}
                className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md hover:border-primary/20"
              >
                <span className="text-sm font-medium text-muted-foreground">{p.category}</span>
                <h3 className="mt-1 text-xl font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.shortDescription}</p>
                <Link
                  href={p.ctaPath}
                  className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  {p.cta}
                </Link>
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

      <section className="border-t border-border bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-2xl font-normal tracking-tight md:text-3xl text-foreground">Results</h2>
          <p className="mt-2 text-muted-foreground">{leaderboardHighlights.description}</p>
          <div className="mt-6">
            <Link
              href={leaderboardHighlights.ctaPath}
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {leaderboardHighlights.cta}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-2xl font-normal tracking-tight md:text-3xl text-foreground">Upcoming events</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {events.slice(0, 2).map((e) => (
              <article
                key={e.id}
                className="rounded-xl border bg-card p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold">{e.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{e.date}</p>
                <p className="mt-2 text-sm">{e.shortDescription}</p>
                <Link
                  href={e.ctaPath}
                  className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                  Register
                </Link>
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

      <section className="border-t border-border bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-2xl font-normal tracking-tight md:text-3xl text-foreground">What families say</h2>
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
          <h2 className="font-display text-2xl font-normal tracking-tight md:text-3xl text-foreground">Ready to start?</h2>
          <p className="mt-2 text-muted-foreground">Book an evaluation or take the Start here quiz.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className={getButtonClasses({ size: 'lg' })}>
              Book evaluation
            </Link>
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
