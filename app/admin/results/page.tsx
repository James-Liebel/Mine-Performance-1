'use client';

const DEMO_COMMITS = [
  { athlete: 'Brady Thompson', college: 'University of Kentucky', division: 'D1', year: '2025', position: 'RHP' },
  { athlete: 'Dylan Carter', college: 'Xavier University', division: 'D1', year: '2025', position: 'OF' },
  { athlete: 'Marcus Williams', college: 'Wright State', division: 'D1', year: '2024', position: 'LHP' },
  { athlete: 'Ethan Moore', college: 'Thomas More University', division: 'D3', year: '2024', position: 'SS' },
  { athlete: 'Ryan Sullivan', college: 'Sinclair CC', division: 'JUCO/NAIA', year: '2025', position: 'C' },
];

const DEMO_ENDORSEMENTS = [
  { athlete: 'Brady Thompson', quote: 'Mine Performance completely changed my approach to pitching. The data-driven training helped me add 6 mph to my fastball.' },
  { athlete: 'Parent of Dylan Carter', quote: 'The coaches genuinely care about each athlete. Dylan improved more in 6 months here than 2 years elsewhere.' },
];

export default function AdminResultsPage() {
  return (
    <div className="container admin-page" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <h1 className="admin-page-title" style={{ marginBottom: '0.5rem' }}>College commits &amp; endorsements (demo)</h1>
      <p className="admin-page-desc text-muted" style={{ marginBottom: '1.5rem' }}>
        Manage athletes who committed to colleges and player endorsements. In production, all fields are editable.
      </p>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>College commits</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Athlete</th><th>College</th><th>Division</th><th>Year</th><th>Position</th></tr>
            </thead>
            <tbody>
              {DEMO_COMMITS.map((c) => (
                <tr key={c.athlete}>
                  <td><strong>{c.athlete}</strong></td>
                  <td>{c.college}</td>
                  <td className="admin-cell--muted">{c.division}</td>
                  <td className="admin-cell--muted">{c.year}</td>
                  <td className="admin-cell--muted">{c.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" className="btn btn-primary btn-sm" style={{ marginTop: '0.5rem' }} disabled>+ Add college commit</button>
      </section>

      <section>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Player endorsements</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Quote</th><th>Athlete</th></tr>
            </thead>
            <tbody>
              {DEMO_ENDORSEMENTS.map((e) => (
                <tr key={e.athlete}>
                  <td className="admin-cell--muted" style={{ maxWidth: '400px' }}>{e.quote}</td>
                  <td><strong>{e.athlete}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" className="btn btn-primary btn-sm" style={{ marginTop: '0.5rem' }} disabled>+ Add endorsement</button>
      </section>
    </div>
  );
}
