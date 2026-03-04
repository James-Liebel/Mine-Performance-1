'use client';

import Link from 'next/link';

const DEMO_COACHES = [
  { name: 'Ryan Hollingsworth', role: 'Owner / Head Instructor', bio: 'D1 pitcher. 500+ athletes trained. Specializes in velocity development and arm care.' },
  { name: 'Tyler Martin', role: 'Pitching Coordinator', bio: 'College pitching experience. Focus on mechanics analysis using Rapsodo and high-speed video.' },
  { name: 'Jake Fishburn', role: 'Hitting Instructor', bio: 'Former college outfielder. Uses HitTrax and bat sensor data to optimize swing mechanics.' },
  { name: 'Braden Deem', role: 'Strength & Conditioning', bio: 'CSCS certified. Builds sport-specific programs for arm health, power, and speed.' },
  { name: 'Brian Rodriguez', role: 'Catching / Defense Coordinator', bio: 'Former college catcher. Develops receiving, blocking, and game-calling skills.' },
];

export default function AdminCoachesPage() {
  return (
    <div className="container admin-page" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <h1 className="admin-page-title" style={{ marginBottom: '0.5rem' }}>Coaches (demo)</h1>
      <p className="admin-page-desc text-muted" style={{ marginBottom: '1.5rem' }}>
        Edit bios, add or remove coaches. Changes appear on the <Link href="/about#coaching-staff">About page</Link>.
      </p>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {DEMO_COACHES.map((coach) => (
          <div key={coach.name} className="card card-elevated" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.05rem' }}>{coach.name}</h3>
                <div className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>{coach.role}</div>
                <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>{coach.bio}</p>
              </div>
              <button type="button" className="btn btn-secondary" disabled style={{ flexShrink: 0 }}>Edit</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <button type="button" className="btn btn-primary" disabled>+ Add coach (disabled in demo)</button>
      </div>
    </div>
  );
}
