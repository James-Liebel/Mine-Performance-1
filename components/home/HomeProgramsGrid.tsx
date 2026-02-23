/**
 * MP1 conversion-first: Programs as a card grid (primary section).
 * Uses same PROGRAMS data; layout only.
 */
import Link from 'next/link';
import { PROGRAMS } from '@/data/home-content';
import { EditableContent } from '@/components/EditableContent';

const PROGRAM_KEYS = [
  { name: 'program_0_name', desc: 'program_0_desc' },
  { name: 'program_1_name', desc: 'program_1_desc' },
  { name: 'program_2_name', desc: 'program_2_desc' },
] as const;

export function HomeProgramsGrid() {
  return (
    <section className="page-home-section home-programs-grid alt-bg" aria-labelledby="programs-heading" data-testid="programs-section">
      <div className="container">
        <h2 id="programs-heading">
          <EditableContent contentKey="programs_heading" fallback="Programs" as="span" />
        </h2>
        <p className="section-sub">
          <EditableContent contentKey="programs_sub" fallback="Whether you're building velocity, refining your swing, or coming back from injury — we have a path designed for you." as="span" />
        </p>
        <div className="home-programs-cards">
          {PROGRAMS.map((p, i) => (
            <Link key={p.href} href={p.href} className="card card-elevated home-program-card">
              <h3 className="home-program-card-title">
                <EditableContent contentKey={PROGRAM_KEYS[i].name} fallback={p.name} as="span" />
              </h3>
              <p className="home-program-card-desc">
                <EditableContent contentKey={PROGRAM_KEYS[i].desc} fallback={p.desc} as="span" />
              </p>
              <span className="home-program-card-link">View details →</span>
            </Link>
          ))}
        </div>
        <div className="home-programs-cta">
          <Link href="/member-registration" className="btn btn-primary">View memberships</Link>
          <Link href="/contact" className="btn btn-secondary">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
