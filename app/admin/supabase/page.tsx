'use client';

import Link from 'next/link';

const DEMO_SUPABASE_COUNTS = {
  athletes: 620,
  parents: 410,
  programs: 18,
  activeMemberships: 340,
  eventsThisMonth: 38,
  registrationsThisMonth: 190,
};

const DEMO_USERS = [
  { email: 'admin@mineperformance.com', name: 'Admin', role: 'Admin', credits: 25, membership: 'coach' },
  { email: 'member1@example.com', name: 'Taylor Smith', role: 'Member', credits: 10, membership: 'pitching-2day' },
  { email: 'member2@example.com', name: 'Jordan Lee', role: 'Member', credits: 6, membership: 'hitting-3day' },
  { email: 'parent@example.com', name: 'Casey Johnson', role: 'Member', credits: 4, membership: 'youth-team' },
];

export default function AdminSupabasePage() {
  return (
    <div className="container admin-page" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <h1 className="admin-page-title" style={{ marginBottom: '0.5rem' }}>Supabase data (demo)</h1>
      <p className="admin-page-desc text-muted" style={{ marginBottom: '1.5rem' }}>
        High-level view of the kinds of records stored in Supabase. In a real setup, these numbers would be live counts from your database.
      </p>

      <section className="card card-elevated admin-analytics-section" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '0.75rem', fontSize: '1.1rem' }}>Key tables (demo)</h2>
        <ul className="admin-metrics-list">
          {Object.entries(DEMO_SUPABASE_COUNTS).map(([key, value]) => (
            <li key={key}>
              <span className="admin-metric-label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}:</span>{' '}
              <span className="admin-metric-value">{value}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="card card-elevated admin-analytics-section" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '0.75rem', fontSize: '1.1rem' }}>Users (demo)</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Email</th><th>Name</th><th>Role</th><th>Credits</th><th>Membership</th></tr>
            </thead>
            <tbody>
              {DEMO_USERS.map((u) => (
                <tr key={u.email}>
                  <td className="admin-cell--muted">{u.email}</td>
                  <td>{u.name}</td>
                  <td>{u.role}</td>
                  <td>{u.credits}</td>
                  <td>{u.membership}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card card-elevated admin-analytics-section">
        <h2 style={{ marginTop: 0, marginBottom: '0.75rem', fontSize: '1.1rem' }}>Supabase actions</h2>
        <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
          In a real deployment, manage users, events, memberships, and waivers through Supabase.
        </p>
        <Link href="https://app.supabase.com/" target="_blank" rel="noreferrer" className="btn btn-primary">Open Supabase project</Link>
      </section>
    </div>
  );
}
