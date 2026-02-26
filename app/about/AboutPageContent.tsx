'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { CoachesClient, type Coach } from '@/app/coaches/CoachesClient';
import { EditableContent } from '@/components/EditableContent';

const basePath = typeof process !== 'undefined' ? (process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH || '') : '';

function fetchCoaches(): Promise<Coach[]> {
  return fetch(`${basePath}/api/coaches`)
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Not found'))))
    .then((data) => (Array.isArray(data) ? data : []))
    .catch(() =>
      fetch(`${basePath}/coaches-fallback.json`)
        .then((r) => (r.ok ? r.json() : []))
        .then((data) => (Array.isArray(data) ? data : []))
        .catch(() => [])
    );
}

export function AboutPageContent() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'title'>('name');

  useEffect(() => {
    fetchCoaches().then(setCoaches);
  }, []);

  const refetchCoaches = () => {
    fetchCoaches().then(setCoaches);
  };

  const specialties = useMemo(() => {
    const set = new Set<string>(coaches.map((c) => c.specialty?.trim()).filter(Boolean));
    return ['all', ...Array.from(set).sort()];
  }, [coaches]);

  const filteredAndSortedCoaches = useMemo(() => {
    let list = coaches;
    if (filterSpecialty !== 'all') {
      list = list.filter((c) => (c.specialty?.trim() ?? '') === filterSpecialty);
    }
    return [...list].sort((a, b) => {
      if (sortBy === 'name') return (a.name ?? '').localeCompare(b.name ?? '');
      return (a.title ?? '').localeCompare(b.title ?? '');
    });
  }, [coaches, filterSpecialty, sortBy]);

  return (
    <div className="page page-about-conversion">
      <section className="page-home-section alt-bg">
        <div className="container">
          <h1 data-testid="about-heading">
            <EditableContent contentKey="about_page_heading" fallback="About Mine Performance Academy" as="span" />
          </h1>
          <p className="section-sub" style={{ maxWidth: '640px' }}>
            <EditableContent contentKey="about_page_intro" fallback="Mine Performance Academy is a purpose-built baseball training facility in Florence, KY. We combine data-driven coaching, a fully equipped training space, and clear development plans for athletes from youth through college." as="span" />
          </p>
        </div>
      </section>

      <section className="page-home-section about-why-strip about-zigzag about-zigzag--left" aria-label="Why Mine Performance">
        <div className="container">
          <div className="about-zigzag-inner">
            <div className="about-zigzag-content">
              <span className="about-section-num" aria-hidden>1</span>
              <h2 className="about-why-strip-title">
                <EditableContent contentKey="about_why_heading" fallback="Why Mine Performance" as="span" />
              </h2>
              <ul className="about-why-strip-list" role="list">
                <li><strong>Data-driven</strong> — Velocity, spin rate, exit velo, and assessments tracked over time.</li>
                <li><strong>Pro coaching</strong> — D1 experience, certifications, and long-term development focus.</li>
                <li><strong>Full facility</strong> — Cages, pitching lab, S&C, and assessment zones under one roof.</li>
                <li><strong>Clear path</strong> — Plans that scale from youth through college commit.</li>
              </ul>
            </div>
            <div className="about-zigzag-visual about-zigzag-visual--placeholder" aria-hidden>
              <span className="about-zigzag-visual-label">Why us</span>
            </div>
          </div>
        </div>
      </section>

      <section className="page-home-section about-facility-block about-zigzag about-zigzag--right">
        <div className="container">
          <div className="about-zigzag-inner">
            <div className="about-zigzag-content about-zigzag-content--order-2">
              <span className="about-section-num" aria-hidden>2</span>
              <h2>
                <EditableContent contentKey="about_facility_heading" fallback="Facility" as="span" />
              </h2>
              <p className="section-sub" style={{ maxWidth: '100%' }}>
                <EditableContent contentKey="about_facility_sub" fallback="Our space includes batting cages, a pitching lab, strength and conditioning area, and assessment zones designed for capturing velocity, spin rate, exit velocity, and more." as="span" />
              </p>
            </div>
            <div className="about-zigzag-visual about-zigzag-visual--placeholder" aria-hidden>
              <span className="about-zigzag-visual-label">Facility</span>
            </div>
          </div>
        </div>
      </section>

      <section className="page-home-section alt-bg about-see-facility">
        <div className="container">
          <span className="about-section-num" aria-hidden>3</span>
          <h2>
            <EditableContent contentKey="about_see_facility_heading" fallback="See the facility" as="span" />
          </h2>
          <p className="section-sub" style={{ maxWidth: '640px', marginBottom: '1.5rem' }}>
            <EditableContent contentKey="about_see_facility_sub" fallback="Take a look inside our training space." as="span" />
          </p>
          <div className="facility-video-wrap">
            <div className="facility-video-placeholder" aria-hidden>
              <span className="facility-video-placeholder-text">
                <EditableContent contentKey="about_video_placeholder" fallback="Video coming soon" as="span" />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="coaching-staff" className="page-home-section coaches-directory alt-bg" data-testid="coaching-staff">
        <div className="container">
          <span className="about-section-num" aria-hidden>4</span>
          <h2>
            <EditableContent contentKey="about_coaching_heading" fallback="Coaching staff" as="span" />
          </h2>
          <p className="section-sub" style={{ maxWidth: '640px', marginBottom: '1rem' }}>
            <EditableContent contentKey="about_coaching_sub" fallback="Our coaches bring D1 playing experience, certifications, and hundreds of athletes trained. They're focused on measurable progress, smart programming, and long-term development." as="span" />
          </p>
          <div className="coaches-directory-layout">
            <aside className="coaches-directory-filters" aria-label="Filter coaches">
              <div className="coaches-filter-group">
                <label className="coaches-filter-label">Specialty</label>
                <select
                  className="form-input coaches-filter-select"
                  value={filterSpecialty}
                  onChange={(e) => setFilterSpecialty(e.target.value)}
                  data-testid="coaches-filter-specialty"
                >
                  {specialties.map((s) => (
                    <option key={s} value={s}>{s === 'all' ? 'All' : s}</option>
                  ))}
                </select>
              </div>
              <div className="coaches-filter-group">
                <label className="coaches-filter-label">Sort by</label>
                <select
                  className="form-input coaches-filter-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'title')}
                  data-testid="coaches-sort"
                >
                  <option value="name">Name A–Z</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </aside>
            <div className="coaches-directory-main">
              {filteredAndSortedCoaches.length === 0 ? (
                <div className="coaches-empty-state" data-testid="coaches-empty-state">
                  <p>No coaches match. Try changing the filter.</p>
                  {basePath && (
                    <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      Coach listings are available on the full site.
                    </p>
                  )}
                </div>
              ) : (
                <CoachesClient coaches={filteredAndSortedCoaches} onCoachChange={refetchCoaches} />
              )}
            </div>
          </div>
          <div className="cta-row" style={{ marginTop: '2rem' }}>
            <Link href="/member-registration" className="btn btn-primary" data-testid="page-primary-cta">
              View memberships
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
