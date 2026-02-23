/**
 * MP1 conversion-first: 3-step "How it works" (Evaluation → Plan → Training).
 * Presentation only; no new claims.
 */
import Link from 'next/link';
import { EditableContent } from '@/components/EditableContent';

const STEPS = [
  { keyLabel: 'how_step_1_label', keyBody: 'how_step_1_body', href: '/start', cta: 'Book evaluation' },
  { keyLabel: 'how_step_2_label', keyBody: 'how_step_2_body', href: '/member-registration', cta: 'View plans' },
  { keyLabel: 'how_step_3_label', keyBody: 'how_step_3_body', href: '/contact', cta: 'Get started' },
] as const;

const FALLBACKS = [
  { label: '1. Evaluation', body: 'We assess your goals and current level so we can recommend the right program.' },
  { label: '2. Plan', body: 'Choose a membership or rental option that fits your schedule and goals.' },
  { label: '3. Training', body: 'Train with our coaches and use our facility to reach the next level.' },
];

export function HomeHowItWorks() {
  return (
    <section className="page-home-section home-how-it-works" aria-labelledby="how-heading" data-testid="how-it-works">
      <div className="container">
        <h2 id="how-heading">
          <EditableContent contentKey="how_heading" fallback="How it works" as="span" />
        </h2>
        <p className="section-sub">
          <EditableContent contentKey="how_sub" fallback="Three simple steps to get started." as="span" />
        </p>
        <ol className="home-how-steps" role="list">
          {STEPS.map((step, i) => (
            <li key={i} className="home-how-step card card-elevated">
              <span className="home-how-step-num" aria-hidden>{i + 1}</span>
              <h3 className="home-how-step-title">
                <EditableContent contentKey={step.keyLabel} fallback={FALLBACKS[i].label} as="span" />
              </h3>
              <p className="home-how-step-body">
                <EditableContent contentKey={step.keyBody} fallback={FALLBACKS[i].body} as="span" />
              </p>
              <Link href={step.href} className="btn btn-primary btn-sm">
                {step.cta}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
