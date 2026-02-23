/**
 * MP1 conversion-first: Hero with brand, 1-line value prop, 2 CTAs.
 * Same data as StoryProblem (EditableContent); layout only.
 */
import Link from 'next/link';
import { EditableContent } from '@/components/EditableContent';

export function HomeConversionHero() {
  return (
    <section className="hero hero-conversion" aria-labelledby="home-hero-heading" data-testid="home-hero">
      <div className="container hero-conversion-inner">
        <h1 id="home-hero-heading" className="hero-conversion-title">
          <EditableContent contentKey="hero_heading" fallback="Mine Performance Baseball Academy" as="span" />
        </h1>
        <p className="hero-conversion-tagline">
          <EditableContent contentKey="hero_space_offerings" fallback="Batting cages, pitching lab, weight room, assessment area." as="span" />
        </p>
        <div className="hero-conversion-ctas">
          <Link href="/start" className="btn btn-primary btn-lg" data-testid="hero-cta">
            Book an Evaluation
          </Link>
          <Link href="/member-registration" className="btn btn-secondary btn-lg">
            View memberships
          </Link>
        </div>
      </div>
    </section>
  );
}
