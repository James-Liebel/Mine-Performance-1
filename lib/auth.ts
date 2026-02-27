/**
 * Auth helpers for API routes.
 */
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export async function requireAdmin(): Promise<{ ok: false; status: 401 } | { ok: true }> {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;
  const isDev = process.env.NODE_ENV !== 'production';

  if (!session?.user) {
    return { ok: false, status: 401 };
  }

  // In production, require explicit admin role.
  // In development, any logged-in user is allowed (admin nav still only shows for admins).
  if (!isDev && role !== 'admin') {
    return { ok: false, status: 401 };
  }

  return { ok: true };
}
