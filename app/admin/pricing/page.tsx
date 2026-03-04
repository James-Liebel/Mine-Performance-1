'use client';

const DEMO_MEMBERSHIPS = [
  { name: 'Pitching', category: 'Adult', options: [{ label: '2 days/wk', price: '$180' }, { label: '3 days/wk', price: '$240' }] },
  { name: 'Hitting', category: 'Adult', options: [{ label: '2 days/wk', price: '$180' }, { label: '3 days/wk', price: '$240' }] },
  { name: 'Hitting + SPT combo', category: 'Adult', options: [{ label: '2 days/wk', price: '$220' }, { label: '3 days/wk', price: '$300' }] },
  { name: 'Pitching + SPT combo', category: 'Adult', options: [{ label: '2 days/wk', price: '$220' }, { label: '3 days/wk', price: '$300' }] },
  { name: 'SPT only', category: 'Adult', options: [{ label: '2 days/wk', price: '$140' }, { label: '3 days/wk', price: '$190' }] },
  { name: 'Youth team', category: 'Youth', options: [{ label: '1 day/wk', price: '$100' }, { label: '2 days/wk', price: '$160' }] },
];

export default function AdminPricingPage() {
  return (
    <div className="container admin-page" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <h1 className="admin-page-title" style={{ marginBottom: '0.5rem' }}>Pricing (demo)</h1>
      <p className="admin-page-desc text-muted" style={{ marginBottom: '1.5rem' }}>
        <strong>Click any membership name or price to edit.</strong> In production, changes update the site immediately. All prices are billed every 4 weeks.
      </p>

      <div className="admin-pricing-table-wrap">
        <table className="admin-pricing-table">
          <thead>
            <tr><th>Membership</th><th>Category</th><th>Price options</th></tr>
          </thead>
          <tbody>
            {DEMO_MEMBERSHIPS.map((m) => (
              <tr key={m.name}>
                <td><strong>{m.name}</strong></td>
                <td>{m.category}</td>
                <td>
                  {m.options.map((opt) => (
                    <div key={opt.label} style={{ marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                      {opt.label}: <strong>{opt.price}</strong>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <button type="button" className="btn btn-secondary" disabled>Add membership</button>
        <button type="button" className="btn btn-primary" disabled>Save pricing (disabled in demo)</button>
      </div>
    </div>
  );
}
