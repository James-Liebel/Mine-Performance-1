'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const DEMO_SUPABASE_COUNTS = {
  athletes: 620,
  parents: 410,
  programs: 18,
  activeMemberships: 340,
  eventsThisMonth: 38,
  registrationsThisMonth: 190,
};

type UserSummary = {
  email: string;
  name: string;
  role: 'admin' | 'user';
  credits: number;
  membershipId: string;
};

const DEMO_USERS: UserSummary[] = [
  { email: 'admin@mineperformance.com', name: 'Admin', role: 'admin', credits: 25, membershipId: 'coach' },
  { email: 'member1@example.com', name: 'Taylor Smith', role: 'user', credits: 10, membershipId: 'pitching-2day' },
  { email: 'member2@example.com', name: 'Jordan Lee', role: 'user', credits: 6, membershipId: 'hitting-3day' },
  { email: 'parent@example.com', name: 'Casey Johnson', role: 'user', credits: 4, membershipId: 'youth-team' },
];

export default function AdminSupabasePage() {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<UserSummary | null>(null);
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState<'admin' | 'user'>('user');
  const [editCredits, setEditCredits] = useState<number>(0);
  const [editMembershipId, setEditMembershipId] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/admin/users?limit=5');
        const json = await res.json();
        if (!res.ok) {
          // If unauthorized or any error, fall back to demo users for the pitch.
          if (!cancelled) {
            setUsers(DEMO_USERS);
          }
          return;
        }
        const list: UserSummary[] = Array.isArray(json)
          ? json
          : Array.isArray(json.users)
          ? json.users
          : [];
        if (!cancelled) {
          setUsers(list.length > 0 ? list : DEMO_USERS);
        }
      } catch (e) {
        if (!cancelled) {
          // On error (including unauthorized), show demo users instead of an error.
          setUsers(DEMO_USERS);
          setError(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="container admin-page" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <h1 className="admin-page-title" style={{ marginBottom: '0.5rem' }}>Supabase data (demo)</h1>
      <p className="admin-page-desc text-muted" style={{ marginBottom: '1.5rem' }}>
        This page shows a high-level view of the kinds of records stored in Supabase. In a real setup,
        these numbers would be live counts from your database.
      </p>

      <section className="card card-elevated admin-analytics-section" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '0.75rem', fontSize: '1.1rem' }}>Key tables (demo)</h2>
        <ul className="admin-metrics-list">
          <li>
            <span className="admin-metric-label">Athletes:</span>{' '}
            <span className="admin-metric-value">{DEMO_SUPABASE_COUNTS.athletes}</span>
          </li>
          <li>
            <span className="admin-metric-label">Parents / guardians:</span>{' '}
            <span className="admin-metric-value">{DEMO_SUPABASE_COUNTS.parents}</span>
          </li>
          <li>
            <span className="admin-metric-label">Programs / teams:</span>{' '}
            <span className="admin-metric-value">{DEMO_SUPABASE_COUNTS.programs}</span>
          </li>
          <li>
            <span className="admin-metric-label">Active memberships:</span>{' '}
            <span className="admin-metric-value">{DEMO_SUPABASE_COUNTS.activeMemberships}</span>
          </li>
          <li>
            <span className="admin-metric-label">Events this month:</span>{' '}
            <span className="admin-metric-value">{DEMO_SUPABASE_COUNTS.eventsThisMonth}</span>
          </li>
          <li>
            <span className="admin-metric-label">Registrations this month:</span>{' '}
            <span className="admin-metric-value">{DEMO_SUPABASE_COUNTS.registrationsThisMonth}</span>
          </li>
        </ul>
      </section>

      <section className="card card-elevated admin-analytics-section" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '0.75rem', fontSize: '1.1rem' }}>Users (Supabase-backed)</h2>
        {loading && <p className="text-muted">Loading users…</p>}
        {!loading && users.length === 0 && (
          <p className="text-muted">No users found yet. In a real deployment this would list Supabase users.</p>
        )}
        {!loading && users.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Credits</th>
                  <th>Membership</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.email}>
                    <td className="admin-cell--muted">{u.email}</td>
                    <td>{u.name}</td>
                    <td>{u.role === 'admin' ? 'Admin' : 'Member'}</td>
                    <td>{u.credits ?? 0}</td>
                    <td>{u.membershipId || '—'}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => {
                          setEditing(u);
                          setEditName(u.name);
                          setEditRole(u.role);
                          setEditCredits(u.credits ?? 0);
                          setEditMembershipId(u.membershipId ?? '');
                        }}
                      >
                        Edit (demo)
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-muted" style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>
          For full user management (roles, credits, memberships), use the advanced{' '}
          <Link href="/admin/users">Users page</Link>. This preview is meant to show how Supabase-backed users
          would appear in the system; current rows are demo data when the API is not available.
        </p>
      </section>

      {editing && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="supabase-edit-user-title"
          onClick={(e) => e.target === e.currentTarget && setEditing(null)}
        >
          <div className="modal card admin-form" style={{ maxWidth: '520px' }}>
            <header className="modal-header">
              <h2 id="supabase-edit-user-title">Edit user (demo only)</h2>
              <button
                type="button"
                className="icon-button"
                aria-label="Close"
                onClick={() => setEditing(null)}
              >
                ✕
              </button>
            </header>
            <div style={{ padding: '0.75rem 0 0' }}>
              <div className="form-group">
                <label className="form-label">Email (fixed)</label>
                <div className="admin-cell--muted">{editing.email}</div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="supabase-edit-name">Name</label>
                <input
                  id="supabase-edit-name"
                  type="text"
                  className="form-input"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div className="form-row form-row--2">
                <div className="form-group">
                  <label className="form-label" htmlFor="supabase-edit-role">Role</label>
                  <select
                    id="supabase-edit-role"
                    className="form-input"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value as 'admin' | 'user')}
                  >
                    <option value="user">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="supabase-edit-credits">Credits</label>
                  <input
                    id="supabase-edit-credits"
                    type="number"
                    min={0}
                    className="form-input"
                    value={editCredits}
                    onChange={(e) => setEditCredits(Math.max(0, Number(e.target.value) || 0))}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="supabase-edit-membership">Membership</label>
                <input
                  id="supabase-edit-membership"
                  type="text"
                  className="form-input"
                  value={editMembershipId}
                  onChange={(e) => setEditMembershipId(e.target.value)}
                />
              </div>
              <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                These controls are for demo purposes only. When Supabase is connected, this dialog would
                update the underlying <code>users</code> table.
              </p>
            </div>
            <footer className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setUsers((prev) =>
                    prev.map((u) =>
                      u.email === editing.email
                        ? {
                            ...u,
                            name: editName,
                            role: editRole,
                            credits: editCredits,
                            membershipId: editMembershipId,
                          }
                        : u
                    )
                  );
                  setEditing(null);
                }}
              >
                Save (demo)
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setEditing(null)}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}

      <section className="card card-elevated admin-analytics-section">
        <h2 style={{ marginTop: 0, marginBottom: '0.75rem', fontSize: '1.1rem' }}>Supabase actions</h2>
        <ul className="admin-metrics-list">
          <li>
            <span className="admin-metric-label">What you manage here:</span>{' '}
            <span className="admin-metric-value">
              day-to-day data through the existing admin pages:
              {' '}
              <Link href="/admin/users">Users</Link>,{' '}
              <Link href="/admin/events">Schedules &amp; events</Link>,{' '}
              <Link href="/admin/pricing">Pricing</Link>, and{' '}
              <Link href="/admin/waivers">Waivers</Link>.
              In a real deployment these screens would read and write to Supabase tables like <code>users</code>, <code>events</code>, <code>memberships</code>, and <code>waivers</code>.
            </span>
          </li>
          <li>
            <span className="admin-metric-label">What Supabase is for:</span>{' '}
            <span className="admin-metric-value">
              deeper database tasks like backups, row-level security rules, performance tuning, and raw table access.
            </span>
          </li>
        </ul>
        <div style={{ marginTop: '1rem' }}>
          <Link
            href="https://app.supabase.com/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Open Supabase project
          </Link>
        </div>
      </section>
    </div>
  );
}

