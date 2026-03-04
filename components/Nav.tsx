'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { Logo } from '@/components/Logo';
import { PRIMARY_NAV_LINKS, linkIsActive } from '@/lib/nav-config';
import { useSafeSession } from '@/lib/useSafeSession';

const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: session, status } = useSafeSession();

  const user = session?.user as { role?: string; admin?: boolean } | undefined;
  const isAdmin = Boolean(user?.admin || user?.role === 'admin');
  const showAdminNav = isStaticExport || isAdmin;
  const adminHref = isStaticExport ? '/profile' : '/admin';

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <nav className="nav" aria-label="Main navigation">
        <div className="container nav-inner">
          <Logo />
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={mobileOpen}
            aria-controls="nav-menu"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span aria-hidden>{mobileOpen ? '✕' : '☰'}</span>
          </button>
          <ul id="nav-menu" className="nav-menu" data-open={mobileOpen}>
            {PRIMARY_NAV_LINKS.map((link) => (
              <li key={link.href} className="nav-item">
                <Link
                  href={link.href}
                  className={`nav-link${linkIsActive(link.href, pathname) ? ' active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {showAdminNav && (
              <li className="nav-item">
                <Link
                  href={adminHref}
                  className={`nav-link${pathname?.startsWith('/admin') || pathname?.startsWith('/profile') ? ' active' : ''}`}
                >
                  Admin
                </Link>
              </li>
            )}
            <li className="nav-item nav-item-cta">
              {isStaticExport ? (
                <Link
                  href="/login"
                  className={`nav-cta btn btn-primary${pathname === '/login' ? ' active' : ''}`}
                  data-testid="nav-login"
                >
                  Admin demo
                </Link>
              ) : status === 'loading' ? (
                <span className="nav-cta btn btn-primary" aria-hidden style={{ opacity: 0.7 }}>
                  …
                </span>
              ) : session ? (
                <span className="nav-cta-group" style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
                  <Link
                    href="/profile"
                    className={`nav-cta btn btn-primary${pathname === '/profile' ? ' active' : ''}`}
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    className="nav-cta nav-cta-outline btn"
                    onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    Logout
                  </button>
                </span>
              ) : (
                <Link
                  href="/login"
                  className={`nav-cta btn btn-primary${pathname === '/login' ? ' active' : ''}`}
                  data-testid="nav-login"
                >
                  Login · Sign up
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
