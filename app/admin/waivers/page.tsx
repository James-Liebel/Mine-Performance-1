'use client';

const DEMO_WAIVERS = [
  {
    id: '1',
    title: 'Waiver of Liability and Hold Harmless Agreement',
    body: 'By signing, you acknowledge and accept the inherent risks involved in athletic training. Mine Performance Academy is not liable for injuries occurring during normal training activities.',
    signed: 28,
    unsigned: 4,
  },
  {
    id: '2',
    title: 'Photo / Video Release',
    body: 'You grant Mine Performance Academy permission to use photographs and video of your training sessions for promotional and social media purposes.',
    signed: 22,
    unsigned: 10,
  },
  {
    id: '3',
    title: 'Medical Information Disclosure',
    body: 'You agree to disclose any relevant medical conditions or injuries that could affect training participation.',
    signed: 30,
    unsigned: 2,
  },
];

export default function AdminWaiversPage() {
  return (
    <div className="container admin-page" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <h1 className="admin-page-title" style={{ marginBottom: '0.5rem' }}>Waivers (demo)</h1>
      <p className="admin-page-desc text-muted" style={{ marginBottom: '1.5rem' }}>
        <strong>Click a waiver title or text to edit it.</strong> In production, members see these on their profile as Signed or Unsigned.
      </p>

      <section className="card card-elevated admin-form" style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: '0 0 1rem', fontSize: '1.1rem' }}>Add waiver (demo)</h2>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input type="text" className="form-input" placeholder="e.g. Waiver of Liability" disabled />
        </div>
        <div className="form-group">
          <label className="form-label">Body / description</label>
          <textarea className="form-input" rows={3} placeholder="Description shown to members..." disabled />
        </div>
        <button type="button" className="btn btn-primary" disabled>Add waiver (disabled in demo)</button>
      </section>

      <section>
        <h2 className="admin-form-title" style={{ margin: '0 0 0.5rem' }}>Current waivers</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {DEMO_WAIVERS.map((w) => (
            <li key={w.id} className="card card-elevated" style={{ marginBottom: '1rem', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ margin: '0 0 0.35rem', fontSize: '1rem' }}>{w.title}</h3>
                  <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{w.body}</p>
                  <div style={{ fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--accent)' }}>{w.signed} signed</span>
                    {' · '}
                    <span style={{ color: 'var(--text-muted)' }}>{w.unsigned} unsigned</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <button type="button" className="btn btn-secondary" disabled>Edit</button>
                  <button type="button" className="btn profile-remove-btn admin-events-btn-danger" disabled>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
