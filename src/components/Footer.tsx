import Link from 'next/link';
import { site, contact } from '@/lib/content';

export function Footer() {
  const address = contact.address;
  const addressLine = [address.street, address.city, address.state, address.zip].filter(Boolean).join(', ');
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-bold">{site.name}</p>
            <p className="mt-2 text-sm text-muted-foreground">{site.tagline}</p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 min-h-[44px]"
            >
              Book evaluation
            </Link>
          </div>
          <div>
            <h3 className="font-semibold">Contact</h3>
            <address className="mt-2 text-sm text-muted-foreground not-italic">
              {addressLine}
              <br />
              <a href={`tel:${contact.phone}`} className="hover:text-foreground">{contact.phone}</a>
              <br />
              <a href={`mailto:${contact.email}`} className="hover:text-foreground">{contact.email}</a>
            </address>
            <div className="mt-2 text-sm text-muted-foreground">
              {contact.hours.map((h, i) => (
                <p key={i}>{h}</p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Quick links</h3>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/programs" className="hover:text-foreground">Programs</Link></li>
              <li><Link href="/events" className="hover:text-foreground">Events</Link></li>
              <li><Link href="/faq" className="hover:text-foreground">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><Link href="/results" className="hover:text-foreground">Results & leaderboard</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <Link href="/privacy" className="hover:text-foreground">Privacy policy</Link>
          {' · '}
          <Link href="/terms" className="hover:text-foreground">Terms of use</Link>
        </div>
      </div>
    </footer>
  );
}
