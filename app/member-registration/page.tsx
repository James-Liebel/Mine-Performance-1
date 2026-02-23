'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { MEMBERSHIPS, type Membership, type MembershipOption } from '@/lib/memberships';
import { TrainingOptionsGrid } from '@/components/TrainingOptionsGrid';
import { MembershipModal } from '@/components/MembershipModal';
import { EditableContent } from '@/components/EditableContent';
import { CreditsExplainer } from '@/components/CreditsExplainer';

const MEMBER_REG_CALLBACK = '/member-registration';

interface ModalState {
  open: boolean;
  membership: Membership | null;
  selectedOption: MembershipOption | null;
}

export default function MemberRegistrationPage() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const [memberships, setMemberships] = useState<Membership[]>(MEMBERSHIPS);
  const [modal, setModal] = useState<ModalState>({
    open: false,
    membership: null,
    selectedOption: null,
  });

  useEffect(() => {
    fetch('/api/memberships')
      .then((r) => r.json())
      .then((data) => setMemberships(Array.isArray(data) ? data : MEMBERSHIPS))
      .catch(() => setMemberships(MEMBERSHIPS));
  }, []);

  type CategoryFilter = 'all' | 'adult' | 'youth' | 'remote';
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

  const adultMemberships = memberships.filter((m) => m.category === 'adult');
  const youthMemberships = memberships.filter((m) => m.category === 'youth');
  const remoteMemberships = memberships.filter((m) => m.category === 'remote');
  const allMemberships = [...adultMemberships, ...youthMemberships, ...remoteMemberships];
  const filteredMemberships =
    categoryFilter === 'all'
      ? allMemberships
      : memberships.filter((m) => m.category === categoryFilter);

  const openModal = (membership: Membership) => {
    const defaultOption =
      membership.options.find((opt) => opt.daysPerWeek === 2) ??
      membership.options[0] ??
      null;
    setModal({
      open: true,
      membership,
      selectedOption: defaultOption,
    });
  };

  const closeModal = () => {
    setModal({ open: false, membership: null, selectedOption: null });
  };

  const setSelectedOption = (option: MembershipOption) => {
    setModal((prev) =>
      prev.membership ? { ...prev, selectedOption: option } : prev
    );
  };

  return (
    <div className="page page-training-options">
      <section className="hero hero-dark hero-compact training-options-hero">
        <div className="container">
          <h1>
            <EditableContent contentKey="member_reg_heading" fallback="Training options" as="span" />
          </h1>
          <p className="hero-subtitle training-options-subtitle">
            <EditableContent contentKey="member_reg_subtitle" fallback="Billed every 4 weeks. Youth = under 10U · Adults = 10U+." as="span" />
          </p>
        </div>
      </section>

      <div className="container training-options-container training-options-with-sidebar">
        <div className="training-options-layout">
          <aside className="training-options-sidebar" aria-label="Filter plans">
            <section className="credits-explainer-section credits-explainer-section--compact">
              <CreditsExplainer compact />
            </section>
            <div className="training-options-filter-block">
              <span className="training-options-filter-label">Show</span>
              <div className="training-options-filter-pills" role="group" aria-label="Plan category">
                {(['all', 'adult', 'youth', 'remote'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`training-options-pill ${categoryFilter === cat ? 'training-options-pill--active' : ''}`}
                    onClick={() => setCategoryFilter(cat)}
                    aria-pressed={categoryFilter === cat}
                  >
                    {cat === 'all' ? 'All' : cat === 'adult' ? 'Adult' : cat === 'youth' ? 'Youth' : 'Remote'}
                  </button>
                ))}
              </div>
            </div>
          </aside>
          <main className="training-options-main">
            <h2 className="training-options-all-plans-heading">
              <EditableContent contentKey="member_reg_listings_intro" fallback="Compare plans — click a plan for details and pricing." as="span" />
            </h2>
            <section className="training-options-section training-options-all-plans" aria-labelledby="all-plans-heading">
              <p id="all-plans-heading" className="visually-hidden">All membership plans</p>
              <TrainingOptionsGrid
                memberships={filteredMemberships}
                onSelect={openModal}
                isLoggedIn={isLoggedIn}
              />
            </section>
            <p className="training-options-help text-muted">
          <EditableContent contentKey="member_reg_help_before" fallback="Not sure which plan fits? " as="span" />
          <Link href="/contact">Contact us</Link>
          <EditableContent contentKey="member_reg_help_after" fallback=" and we'll help you choose." as="span" />
            </p>
            <p className="training-options-spt-footnote text-muted" style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
              <EditableContent contentKey="member_reg_spt_definition" fallback="Strength = Sports Performance Training (strength, movement, conditioning)." as="span" />
            </p>
          </main>
        </div>
      </div>

      {modal.open && modal.membership && (
        <MembershipModal
          membership={modal.membership}
          selectedOption={modal.selectedOption}
          onSelectOption={setSelectedOption}
          onClose={closeModal}
          isLoggedIn={isLoggedIn}
          loginCallbackUrl={MEMBER_REG_CALLBACK}
        />
      )}
    </div>
  );
}

