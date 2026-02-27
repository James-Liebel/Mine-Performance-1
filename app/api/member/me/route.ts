import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { getUserByEmail } from '@/lib/user-service';
import { getTransactionsByEmail } from '@/lib/credit-transactions';

/** GET: current user profile (credits, name, membership, credit history) for logged-in member. */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const isDev = process.env.NODE_ENV !== 'production';
  const user = getUserByEmail(session.user.email);
  let transactions = getTransactionsByEmail(session.user.email, 30);

  // In development, if there is no history yet, show a small demo history so the UI is populated.
  if (isDev && transactions.length === 0) {
    const now = new Date();
    const daysAgo = (n: number) => {
      const d = new Date(now);
      d.setDate(d.getDate() - n);
      return d.toISOString();
    };
    transactions = [
      {
        id: 'demo_1',
        email: session.user.email,
        amount: 20,
        reason: 'stripe_purchase',
        reference: 'cs_demo_purchase',
        createdAt: daysAgo(3),
      },
      {
        id: 'demo_2',
        email: session.user.email,
        amount: -4,
        reason: 'booking_spend',
        reference: 'booking_demo_cage',
        createdAt: daysAgo(2),
      },
      {
        id: 'demo_3',
        email: session.user.email,
        amount: 10,
        reason: 'membership_grant',
        reference: 'membership_demo',
        createdAt: daysAgo(10),
      },
    ];
  }

  const credits =
    user?.credits && user.credits > 0
      ? user.credits
      : isDev
      ? transactions.reduce((sum, t) => sum + t.amount, 0)
      : 0;

  return NextResponse.json({
    email: session.user.email,
    name: user?.name ?? session.user.name ?? null,
    credits,
    membershipId: user?.membershipId ?? '',
    creditHistory: transactions,
  });
}
