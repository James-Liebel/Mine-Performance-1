import { contact, site } from '@/lib/content';
import { ContactForm } from '@/components/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch and find Mine Performance Academy.',
};

const addressLine = [
  contact.address.street,
  contact.address.city,
  contact.address.state,
  contact.address.zip,
]
  .filter(Boolean)
  .join(', ');

const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(addressLine)}&output=embed`;

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="font-display text-3xl font-normal tracking-tight text-foreground">Contact</h1>
      <p className="mt-2 text-muted-foreground">
        Visit us or send a message.
      </p>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold">Location</h2>
          <address className="mt-2 text-muted-foreground not-italic">
            {addressLine}
          </address>
          <p className="mt-4">
            <a href={`tel:${contact.phone}`} className="hover:text-primary">{contact.phone}</a>
          </p>
          <p>
            <a href={`mailto:${contact.email}`} className="hover:text-primary">{contact.email}</a>
          </p>
          <h3 className="mt-6 font-semibold">Hours</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {contact.hours.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="aspect-video w-full overflow-hidden rounded-xl border">
            <iframe
              title={`Map: ${site.name}`}
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[250px]"
            />
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-xl font-semibold">Send a message</h2>
        <ContactForm className="mt-4 max-w-lg" />
      </div>
    </div>
  );
}
