'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ADMIN_LINKS = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/stripe', label: 'Stripe' },
  { href: '/admin/supabase', label: 'Supabase' },
  { href: '/admin/events', label: 'Schedules & events' },
  { href: '/admin/pricing', label: 'Pricing' },
  { href: '/admin/coaches', label: 'Coaches' },
  { href: '/admin/results', label: 'College commits' },
  { href: '/admin/waivers', label: 'Waivers' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-inner">
          <h2 className="admin-sidebar-title">Admin</h2>
          <nav className="admin-nav" aria-label="Admin sections">
            <ul className="admin-nav-list">
              {ADMIN_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/admin' && pathname?.startsWith(link.href));
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`admin-nav-link${isActive ? ' active' : ''}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
      <div className="admin-main">
        {children}
      </div>
    </div>
  );
}
