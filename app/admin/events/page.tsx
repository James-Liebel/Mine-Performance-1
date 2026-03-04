'use client';

const DEMO_EVENTS = [
  { id: '1', title: 'Open Cage Session', date: '2026-03-05', startTime: '09:00', endTime: '10:00', type: 'clinic', capacity: 10, booked: 7 },
  { id: '2', title: 'Pitching Lab — Advanced', date: '2026-03-06', startTime: '14:00', endTime: '15:30', type: 'clinic', capacity: 6, booked: 6 },
  { id: '3', title: 'Youth Hitting Camp', date: '2026-03-08', startTime: '10:00', endTime: '12:00', type: 'camp', capacity: 20, booked: 14 },
  { id: '4', title: 'SPT Strength Session', date: '2026-03-10', startTime: '16:00', endTime: '17:00', type: 'clinic', capacity: 12, booked: 9 },
  { id: '5', title: 'Velocity Assessment', date: '2026-03-12', startTime: '08:00', endTime: '09:00', type: 'assessment', capacity: 4, booked: 2 },
];

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

export default function AdminEventsPage() {
  return (
    <div className="container admin-page" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <h1 className="admin-page-title" style={{ marginBottom: '0.5rem' }}>Schedules &amp; events (demo)</h1>
      <p className="admin-page-desc text-muted" style={{ marginBottom: '1.5rem' }}>
        View and manage events. In production, click any event row to edit or delete it. Add new events with the form below.
      </p>

      <section className="card card-elevated" style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: '0 0 1rem', fontSize: '1.1rem' }}>Upcoming events</h2>
        <div className="admin-events-table-wrap">
          <table className="admin-pricing-table admin-events-table">
            <thead>
              <tr><th>Date</th><th>Title</th><th>Time</th><th>Type</th><th>Capacity</th></tr>
            </thead>
            <tbody>
              {DEMO_EVENTS.map((ev) => (
                <tr key={ev.id} className="admin-clickable-row">
                  <td>{formatDate(ev.date)}</td>
                  <td><strong>{ev.title}</strong></td>
                  <td>{ev.startTime} &ndash; {ev.endTime}</td>
                  <td>{ev.type}</td>
                  <td>{ev.booked}/{ev.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card card-elevated admin-form">
        <h2 className="admin-form-title">New event (demo)</h2>
        <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
          In production, this form creates real events on the calendar.
        </p>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input type="text" className="form-input" placeholder="e.g. Open Cage Session" disabled />
        </div>
        <div className="form-row form-row--2">
          <div className="form-group">
            <label className="form-label">Start date</label>
            <input type="date" className="form-input" disabled />
          </div>
          <div className="form-group">
            <label className="form-label">Start time</label>
            <input type="time" className="form-input" defaultValue="09:00" disabled />
          </div>
        </div>
        <button type="button" className="btn btn-primary" disabled>Add event (disabled in demo)</button>
      </section>
    </div>
  );
}
