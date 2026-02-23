'use client';

import { useMemo } from 'react';
import { EventsClient, type EventItem } from './EventsClient';
import { PrimaryCTA } from '@/components/PrimaryCTA';
import { EditableContent } from '@/components/EditableContent';

function formatEventDate(dateStr: string, startTime?: string): string {
  try {
    const d = new Date(dateStr);
    const day = d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    return startTime ? `${day} · ${startTime}` : day;
  } catch {
    return dateStr;
  }
}

export function EventsPageContent({ events }: { events: EventItem[] }) {
  const upcomingList = useMemo(() => {
    const now = new Date().toISOString().slice(0, 10);
    return [...events]
      .filter((e) => e.date >= now)
      .sort((a, b) => a.date.localeCompare(b.date) || (a.startTime ?? '').localeCompare(b.startTime ?? ''))
      .slice(0, 5);
  }, [events]);

  return (
    <div className="page page-events-conversion">
      <div className="container events-page-inner events-layout-two-col" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        <h1 className="events-page-title-full">
          <EditableContent contentKey="events_heading" fallback="Scheduling" as="span" />
        </h1>
        <p className="text-muted events-page-intro-full" style={{ marginBottom: '1.5rem' }}>
          <EditableContent contentKey="events_intro" fallback="Training slots — camps, clinics, sessions. Use the calendar to view and book by day. Toggle to show only slots you're signed up for or all slots. Green outline = open; red = full." as="span" />
        </p>

        <aside className="events-col-upcoming" aria-label="Upcoming">
          {upcomingList.length > 0 ? (
            <>
              <h2 className="events-upcoming-title">
                <EditableContent contentKey="events_upcoming_heading" fallback="Upcoming" as="span" />
              </h2>
              <ul className="events-upcoming-list" role="list">
                {upcomingList.map((e) => (
                  <li key={e.id} className="events-upcoming-item">
                    <span className="events-upcoming-date">{formatEventDate(e.date, e.startTime)}</span>
                    <span className="events-upcoming-title-text">{e.title}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>No upcoming slots listed.</p>
          )}
        </aside>

        <div className="events-col-calendar">
          <EventsClient events={events} />
          <PrimaryCTA />
        </div>
      </div>
    </div>
  );
}
