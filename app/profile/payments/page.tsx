'use client';

import { useEffect, useState } from 'react';

type CreditReason =
  | 'stripe_purchase'
  | 'stripe_refund'
  | 'booking_spend'
  | 'admin_adjustment'
  | 'membership_grant'
  | 'other';

interface CreditTransaction {
  id: string;
  amount: number;
  reason: CreditReason;
  reference?: string;
  createdAt: string;
}

interface MemberMeResponse {
  email: string;
  name: string | null;
  credits: number;
  membershipId: string;
  creditHistory: CreditTransaction[];
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

const REASON_LABEL: Record<CreditReason, string> = {
  stripe_purchase: 'Stripe purchase',
  stripe_refund: 'Refund',
  booking_spend: 'Event booking',
  admin_adjustment: 'Admin adjustment',
  membership_grant: 'Membership',
  other: 'Other',
};

const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';

const DEMO_MEMBER_DATA: MemberMeResponse = {
  email: 'admin@mineperformance.com',
  name: 'Ryan Hollingsworth',
  credits: 25,
  membershipId: 'pitching-3day',
  creditHistory: [
    { id: 'tx-1', amount: 10, reason: 'stripe_purchase', reference: 'Pitching 3-day', createdAt: '2026-02-28T14:30:00Z' },
    { id: 'tx-2', amount: 8, reason: 'membership_grant', reference: 'Membership renewal', createdAt: '2026-02-25T09:00:00Z' },
    { id: 'tx-3', amount: -4, reason: 'booking_spend', reference: 'Open Cage Session', createdAt: '2026-02-22T16:15:00Z' },
    { id: 'tx-4', amount: -2, reason: 'booking_spend', reference: 'Velocity Assessment', createdAt: '2026-02-18T10:00:00Z' },
    { id: 'tx-5', amount: 5, reason: 'admin_adjustment', reference: 'Promo credit', createdAt: '2026-02-15T11:30:00Z' },
    { id: 'tx-6', amount: 8, reason: 'stripe_purchase', reference: 'Pitching 3-day', createdAt: '2026-02-01T10:00:00Z' },
  ],
};

export default function ProfilePaymentsPage() {
  const [data, setData] = useState<MemberMeResponse | null>(isStaticExport ? DEMO_MEMBER_DATA : null);
  const [loading, setLoading] = useState(!isStaticExport);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isStaticExport) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/member/me');
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json?.error || 'Failed to load payment info');
        }
        if (!cancelled) {
          setData(json as MemberMeResponse);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load payment info');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const balance = data?.credits ?? 0;
  const history = data?.creditHistory ?? [];

  return (
    <div className="container profile-payments-page" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
      <div className="profile-payments-layout">
        <section className="profile-payment-info card card-elevated">
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.1rem' }}>Payment & credits</h2>

          {loading && <p className="text-muted">Loading…</p>}
          {error && !loading && (
            <p className="text-muted" style={{ color: 'var(--error, #c00)' }}>
              {error}
            </p>
          )}

          {!loading && !error && (
            <>
              <div className="profile-balance-row">
                <span>Credits balance</span>
                <strong>{balance}</strong>
              </div>
              <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Credits are used to book events and sessions. Purchases, refunds, and admin adjustments all show up in the activity below.
              </p>
              {data?.membershipId && (
                <div className="profile-registration-section" style={{ marginTop: '1.5rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>Active membership</h3>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Membership ID: <strong>{data.membershipId}</strong>
                  </p>
                </div>
              )}
            </>
          )}
        </section>

        <section className="profile-past-payments card card-elevated">
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.1rem' }}>Credits activity</h2>
          {loading && <p className="text-muted">Loading…</p>}
          {error && !loading && (
            <p className="text-muted" style={{ color: 'var(--error, #c00)' }}>
              {error}
            </p>
          )}
          {!loading && !error && history.length === 0 && (
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
              No credit activity yet.
            </p>
          )}
          {!loading && !error && history.length > 0 && (
            <div className="profile-payments-table-wrap">
              <table className="profile-payments-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((tx) => (
                    <tr key={tx.id}>
                      <td>{formatDate(tx.createdAt)}</td>
                      <td>
                        {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                      </td>
                      <td>{REASON_LABEL[tx.reason] ?? tx.reason}</td>
                      <td>{tx.reference ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!loading && !error && history.length > 0 && (
            <p className="text-muted" style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
              Positive amounts are credits added (e.g. Stripe purchase, membership); negative amounts are credits spent or deducted.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

