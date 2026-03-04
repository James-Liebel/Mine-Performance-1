'use client';

import Link from 'next/link';

const DEMO_STATS = {
  totalRevenue: '$316,500',
  activeMembers: 340,
  eventsThisMonth: 38,
  pendingWaivers: 12,
};

const DEMO_RECENT_ACTIVITY = [
  { id: '1', action: 'New member signup', detail: 'Taylor Smith — Pitching 2-day', time: '2 hours ago' },
  { id: '2', action: 'Event booking', detail: 'Jordan Lee — Open Cage Session (Mar 8)', time: '3 hours ago' },
  { id: '3', action: 'Payment received', detail: '$180.00 — Hitting + SPT combo', time: '5 hours ago' },
  { id: '4', action: 'Waiver signed', detail: 'Casey Johnson — Liability waiver', time: '1 day ago' },
  { id: '5', action: 'Membership renewed', detail: 'Alex Rivera — Pitching 3-day', time: '1 day ago' },
];

export default function AdminDashboardPage() {
  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>Admin dashboard</h1>
      <p className="text-muted admin-page-desc" style={{ marginBottom: '1.5rem' }}>
        Overview of your facility. Use the sections below to manage <strong>events &amp; times</strong>,{' '}
        <strong>pricing</strong>, <strong>waivers</strong>, <strong>users</strong>, and view{' '}
        <strong>Stripe and Supabase overviews</strong>.
        <br />
        <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>
          (Static demo — data shown is illustrative. In production, this dashboard displays live data.)
        </span>
      </p>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total revenue', value: DEMO_STATS.totalRevenue, color: 'var(--accent)' },
          { label: 'Active members', value: DEMO_STATS.activeMembers, color: 'var(--accent)' },
          { label: 'Events this month', value: DEMO_STATS.eventsThisMonth, color: 'var(--text)' },
          { label: 'Pending waivers', value: DEMO_STATS.pendingWaivers, color: 'var(--text)' },
        ].map((stat) => (
          <div key={stat.label} className="card card-elevated" style={{ padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: stat.color }}>{stat.value}</div>
            <div className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="admin-dashboard-grid">
        <Link href="/admin/stripe" className="admin-dashboard-card card card-elevated">
          <h3 style={{ marginTop: 0, marginBottom: '0.35rem' }}>Stripe</h3>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem' }}>
            View demo revenue and payments info and jump to your full Stripe Dashboard for detailed reports and payouts.
          </p>
          <span className="admin-dashboard-arrow" aria-hidden>→</span>
        </Link>

        <Link href="/admin/supabase" className="admin-dashboard-card card card-elevated">
          <h3 style={{ marginTop: 0, marginBottom: '0.35rem' }}>Supabase data</h3>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem' }}>
            See a high-level view of athletes, programs, events, and registrations.
          </p>
          <span className="admin-dashboard-arrow" aria-hidden>→</span>
        </Link>

        <Link href="/admin/events" className="admin-dashboard-card card card-elevated">
          <h3 style={{ marginTop: 0, marginBottom: '0.35rem' }}>Schedules &amp; events</h3>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem' }}>
            Click any event to edit date, time, title, or capacity. Add new events and delete ones you don&apos;t need.
          </p>
          <span className="admin-dashboard-arrow" aria-hidden>→</span>
        </Link>

        <Link href="/admin/pricing" className="admin-dashboard-card card card-elevated">
          <h3 style={{ marginTop: 0, marginBottom: '0.35rem' }}>Pricing</h3>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem' }}>
            Click any membership name or price to edit. Add or remove plans. Click Save when done.
          </p>
          <span className="admin-dashboard-arrow" aria-hidden>→</span>
        </Link>

        <Link href="/admin/waivers" className="admin-dashboard-card card card-elevated">
          <h3 style={{ marginTop: 0, marginBottom: '0.35rem' }}>Waivers</h3>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem' }}>
            Click a waiver title or text to edit. Add new waivers or remove old ones.
          </p>
          <span className="admin-dashboard-arrow" aria-hidden>→</span>
        </Link>

        <Link href="/admin/users" className="admin-dashboard-card card card-elevated">
          <h3 style={{ marginTop: 0, marginBottom: '0.35rem' }}>Users</h3>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem' }}>
            View and manage users, roles, credits, and memberships.
          </p>
          <span className="admin-dashboard-arrow" aria-hidden>→</span>
        </Link>
      </div>

      {/* Recent activity */}
      <section className="card card-elevated" style={{ marginTop: '2rem', padding: '1.5rem' }}>
        <h2 style={{ margin: '0 0 1rem', fontSize: '1.15rem' }}>Recent activity (demo)</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {DEMO_RECENT_ACTIVITY.map((item) => (
            <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.action}</div>
                <div className="text-muted" style={{ fontSize: '0.85rem' }}>{item.detail}</div>
              </div>
              <div className="text-muted" style={{ fontSize: '0.8rem', whiteSpace: 'nowrap', flexShrink: 0 }}>{item.time}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
