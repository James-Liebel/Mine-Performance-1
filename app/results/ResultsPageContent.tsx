'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EditableContent } from '@/components/EditableContent';
import type { CollegeCommit, Endorsement, CommitDivision } from '@/lib/results-store';

const METRIC_ACCORDION_ITEMS = [
  { id: 'what-we-measure', title: 'What we measure', body: 'We track velocity, spin rate, exit velocity, and other metrics using radar and assessment tools. These help coaches and athletes see progress over time.' },
  { id: 'college-commit', title: 'What college commit means', body: 'Athletes listed here have committed to play at a college or university. Commitments are verified and listed with the athlete’s permission.' },
  { id: 'what-this-means', title: 'What this means for you', body: 'Our facility and coaching support athletes who want to reach the next level. Results vary by athlete; we focus on consistent development and clear feedback.' },
] as const;

const DIVISION_LABELS: Record<CommitDivision, string> = {
  d1: 'Division I',
  d2: 'Division II',
  d3: 'Division III',
  juco_naia: 'JUCO / NAIA',
};

export function ResultsPageContent() {
  const [collegeCommits, setCollegeCommits] = useState<CollegeCommit[]>([]);
  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(METRIC_ACCORDION_ITEMS[0].id);

  useEffect(() => {
    fetch('/api/results')
      .then((r) => r.json())
      .then((data) => {
        setCollegeCommits(Array.isArray(data.collegeCommits) ? data.collegeCommits : []);
        setEndorsements(Array.isArray(data.endorsements) ? data.endorsements : []);
      })
      .catch(() => {
        setCollegeCommits([]);
        setEndorsements([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const commitsByYear = useMemo(() => {
    const map: Record<string, CollegeCommit[]> = {};
    collegeCommits.forEach((c) => {
      const y = c.year ?? 'Other';
      if (!map[y]) map[y] = [];
      map[y].push(c);
    });
    const years = Object.keys(map).sort((a, b) => (b === 'Other' ? -1 : a === 'Other' ? 1 : b.localeCompare(a)));
    return years.map((year) => ({ year, commits: map[year] }));
  }, [collegeCommits]);

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        <p className="text-muted">Loading…</p>
      </div>
    );
  }

  return (
    <div className="page page-results-conversion">
      <section className="page-home-section alt-bg">
        <div className="container">
          <h1 data-testid="results-heading"><EditableContent contentKey="results_heading" fallback="College commits" as="span" /></h1>
          <p className="section-sub" style={{ maxWidth: '640px' }}>
            <EditableContent contentKey="results_sub" fallback="Athletes from our facility who have committed to play at the next level. We're proud of every one of them." as="span" />
          </p>
        </div>
      </section>

      <section className="page-home-section results-metric-explainer" aria-label="Metric explainer" data-testid="results-metric-explainer">
        <div className="container">
          <h2 className="results-explainer-heading">What this means</h2>
          <div className="results-accordion">
            {METRIC_ACCORDION_ITEMS.map((item) => (
              <div key={item.id} className="results-accordion-item card card-elevated">
                <button
                  type="button"
                  className="results-accordion-trigger"
                  aria-expanded={openAccordionId === item.id}
                  aria-controls={`results-accordion-panel-${item.id}`}
                  id={`results-accordion-trigger-${item.id}`}
                  onClick={() => setOpenAccordionId((id) => (id === item.id ? null : item.id))}
                  data-testid={`results-accordion-${item.id}`}
                >
                  <span>{item.title}</span>
                  <span className="results-accordion-icon" aria-hidden>{openAccordionId === item.id ? '−' : '+'}</span>
                </button>
                <div
                  id={`results-accordion-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`results-accordion-trigger-${item.id}`}
                  className="results-accordion-panel"
                  hidden={openAccordionId !== item.id}
                >
                  <p className="results-accordion-body">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-home-section results-by-year-section">
        <div className={`container results-year-layout${commitsByYear.length === 0 ? ' results-year-layout--no-nav' : ''}`}>
          {commitsByYear.length > 0 && (
            <nav className="results-year-nav" aria-label="Jump to year">
              <h2 className="results-year-nav-title"><EditableContent contentKey="results_athletes_heading" fallback="By year" as="span" /></h2>
              <ul className="results-year-nav-list" role="list">
                {commitsByYear.map(({ year }) => (
                  <li key={year}>
                    <a href={`#results-year-${year}`} className="results-year-nav-link">{year}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div className="results-year-content">
            {collegeCommits.length === 0 ? (
              <p className="text-muted"><EditableContent contentKey="results_no_commits" fallback="No college commits listed yet. Check back soon." as="span" /></p>
            ) : (
              <div className="results-by-year-timeline">
                {commitsByYear.map(({ year, commits }) => (
                  <div key={year} id={`results-year-${year}`} className="results-year-block">
                    <h3 className="results-year-heading">{year}</h3>
                  <ul className="results-commits-list results-commits-list--rows" role="list">
                    {commits.map((c) => (
                      <li key={c.id} className="card card-elevated results-commit-card results-commit-card--interactive">
                        <div className="results-commit-inner">
                          {c.imageUrl && (
                            <div className="results-commit-image-wrap">
                              <Image src={c.imageUrl} alt={c.athleteName ? `${c.athleteName} college` : 'College logo'} width={48} height={48} className="results-commit-image" unoptimized />
                            </div>
                          )}
                          <div className="results-commit-main">
                            <span className="results-commit-name">{c.athleteName}</span>
                            <span className="results-commit-college">{c.college}</span>
                          </div>
                        </div>
                        {(c.year || c.position) && (
                          <div className="results-commit-meta">
                            {c.position && <span className="results-commit-position">{c.position}</span>}
                            {c.division && <span className="results-commit-division">{DIVISION_LABELS[c.division]}</span>}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="page-home-section alt-bg results-endorsements-strip" aria-label="Endorsements">
        <div className="container">
          <h2 className="results-endorsements-strip-title"><EditableContent contentKey="results_endorsements_heading" fallback="What they say" as="span" /></h2>
          {endorsements.length === 0 ? (
            <p className="text-muted"><EditableContent contentKey="results_no_endorsements" fallback="No endorsements yet. Check back soon." as="span" /></p>
          ) : (
            <div className="results-endorsements-strip-inner">
              {endorsements.map((e) => (
                <blockquote key={e.id} className="results-endorsement-strip-card card card-elevated">
                  <p className="results-endorsement-quote">&ldquo;{e.quote}&rdquo;</p>
                  <footer className="results-endorsement-footer">
                    <cite className="results-endorsement-name">{e.athleteName}</cite>
                    {e.college && <span className="results-endorsement-college">{e.college}</span>}
                  </footer>
                </blockquote>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="page-home-section">
        <div className="container cta-row">
          <Link href="/member-registration" className="btn btn-primary">
            View memberships
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            Contact us
          </Link>
        </div>
      </section>

      <style jsx>{`
        .results-commits-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }
        .results-commit-card {
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .results-commit-card--interactive {
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .results-commit-card--interactive:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(234, 88, 12, 0.15);
          border-color: var(--surface-hover);
        }
        .results-commit-inner {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .results-commit-image-wrap {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          border-radius: var(--radius);
          overflow: hidden;
          background: var(--bg-subtle);
          border: 1px solid var(--border);
        }
        .results-commit-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .results-commit-main {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          min-width: 0;
        }
        .results-commit-name {
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--text);
        }
        .results-commit-college {
          color: var(--accent);
          font-size: 0.95rem;
        }
        .results-commit-meta {
          display: flex;
          gap: 0.75rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .results-endorsements-grid {
          display: grid;
          gap: 1.25rem;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        }
        .results-endorsement-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .results-endorsement-card--interactive {
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .results-endorsement-card--interactive:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(234, 88, 12, 0.12);
          border-color: var(--surface-hover);
        }
        .results-endorsement-quote {
          margin: 0;
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text);
          flex: 1;
        }
        .results-endorsement-footer {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-style: normal;
        }
        .results-endorsement-name {
          font-weight: 600;
          color: var(--text);
        }
        .results-endorsement-college {
          font-size: 0.9rem;
          color: var(--accent);
        }
      `}</style>
    </div>
  );
}
