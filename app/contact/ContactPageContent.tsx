'use client';

import { Suspense } from 'react';
import { ContactForm } from './ContactForm';
import { BookingBanner } from './BookingBanner';
import { EditableContent } from '@/components/EditableContent';
import { useSiteContent } from '@/contexts/SiteContentContext';

export function ContactPageContent() {
  const { content } = useSiteContent();

  return (
    <div className="page page-contact-conversion">
      <div className="contact-page-unique">
        <div className="contact-visit-strip-full" aria-label="Visit us">
          <div className="container contact-visit-strip-inner">
            <div className="contact-visit-strip-item">
              <span className="contact-visit-strip-label">Address</span>
              <EditableContent contentKey="contact_address" fallback="" as="span" />
            </div>
            <div className="contact-visit-strip-item">
              <span className="contact-visit-strip-label">Phone</span>
              <a href={`tel:${(content.contact_phone ?? '').replace(/\D/g, '')}`}>
                <EditableContent contentKey="contact_phone" fallback="" as="span" />
              </a>
            </div>
            <div className="contact-visit-strip-item">
              <span className="contact-visit-strip-label">Email</span>
              <a href={`mailto:${content.contact_email ?? ''}`}>
                <EditableContent contentKey="contact_email" fallback="" as="span" />
              </a>
            </div>
            <div className="contact-visit-strip-item">
              <span className="contact-visit-strip-label">Hours</span>
              <span style={{ whiteSpace: 'pre-line', fontSize: '0.9rem' }}>
                <EditableContent contentKey="contact_hours" fallback="Mon–Fri 8am–9pm · Sat–Sun 10am–8pm" as="span" />
              </span>
            </div>
            <div className="contact-visit-strip-item contact-visit-strip-actions">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content.contact_address ?? '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <EditableContent contentKey="contact_directions_label" fallback="Directions" as="span" />
              </a>
            </div>
          </div>
        </div>

        <div className="container contact-page-inner" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
          <h1>
            <EditableContent contentKey="contact_heading" fallback="Contact Us" as="span" />
          </h1>
          <p className="text-muted" style={{ marginBottom: '1.5rem', maxWidth: '520px' }}>
            <EditableContent contentKey="contact_intro" fallback="Book a session, ask about programs, or schedule a facility tour. We're here to help." as="span" />
          </p>

          <Suspense fallback={null}>
            <BookingBanner />
          </Suspense>

          <section className="card card-elevated contact-form-full" style={{ padding: '1.75rem', maxWidth: '640px' }}>
            <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '1rem' }}>
              <EditableContent contentKey="contact_send_message_heading" fallback="Send a message" as="span" />
            </h2>
            <ContactForm />
          </section>
        </div>
      </div>
    </div>
  );
}
