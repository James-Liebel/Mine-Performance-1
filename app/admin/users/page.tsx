'use client';

const DEMO_USERS = [
  { email: 'admin@mineperformance.com', name: 'Admin', role: 'Admin', credits: 25, membership: 'Coach' },
  { email: 'member1@example.com', name: 'Taylor Smith', role: 'Member', credits: 10, membership: 'Pitching 2-day' },
  { email: 'member2@example.com', name: 'Jordan Lee', role: 'Member', credits: 6, membership: 'Hitting 3-day' },
  { email: 'parent@example.com', name: 'Casey Johnson', role: 'Member', credits: 4, membership: 'Youth team' },
  { email: 'jsmith@example.com', name: 'Jake Smith', role: 'Member', credits: 12, membership: 'Hitting + SPT combo' },
  { email: 'arivera@example.com', name: 'Alex Rivera', role: 'Member', credits: 8, membership: 'Pitching 3-day' },
  { email: 'mwilson@example.com', name: 'Morgan Wilson', role: 'Member', credits: 0, membership: 'SPT only' },
  { email: 'kbrown@example.com', name: 'Kyle Brown', role: 'Member', credits: 15, membership: 'Pitching + SPT combo' },
];

export default function AdminUsersPage() {
  return (
    <div className="container admin-page" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <h1 className="admin-page-title" style={{ marginBottom: '0.5rem' }}>Users (demo)</h1>
      <p className="admin-page-desc text-muted" style={{ marginBottom: '1.5rem' }}>
        Manage who can sign in, their role, credits, and membership. <strong>Click a row or Edit to change fields.</strong> In production, changes apply when the user signs in again.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="text-muted">Search</span>
          <input type="search" className="form-input" placeholder="Email or name..." disabled style={{ minWidth: '12rem' }} />
        </label>
        <span className="text-muted" style={{ marginLeft: 'auto' }}>{DEMO_USERS.length} users (demo)</span>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>Email</th><th>Display name</th><th>Role</th><th>Credits</th><th>Membership</th><th></th></tr>
          </thead>
          <tbody>
            {DEMO_USERS.map((u) => (
              <tr key={u.email}>
                <td className="admin-cell--muted">{u.email}</td>
                <td>{u.name}</td>
                <td>
                  <span data-role={u.role.toLowerCase()}>{u.role}</span>
                </td>
                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    {u.credits}
                    <button type="button" className="btn btn-ghost btn-sm" disabled aria-label="Remove 1 credit">&minus;</button>
                    <button type="button" className="btn btn-ghost btn-sm" disabled aria-label="Add 1 credit">+</button>
                  </span>
                </td>
                <td>{u.membership}</td>
                <td>
                  <button type="button" className="btn btn-ghost btn-sm" disabled>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
