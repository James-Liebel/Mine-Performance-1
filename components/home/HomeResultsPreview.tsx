/**
 * MP1 conversion-first: Results preview section with CTA to /results.
 */
import Link from 'next/link';
import { EditableContent } from '@/components/EditableContent';

export function HomeResultsPreview() {
  return (
    <section className="page-home-section home-results-preview" aria-labelledby="results-preview-heading" data-testid="results-preview">
      <div className="container">
        <h2 id="results-preview-heading">
          <EditableContent contentKey="results_heading" fallback="College commits" as="span" />
        </h2>
        <p className="section-sub">
          <EditableContent contentKey="results_sub" fallback="Athletes from our facility who have committed to play at the next level. We're proud of every one of them." as="span" />
        </p>
        <Link href="/results" className="btn btn-primary" data-testid="results-preview-cta">
          See our results
        </Link>
      </div>
    </section>
  );
}
