import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Start here',
  description: 'Find the right program for your goal. Answer a few questions and we’ll recommend your next step.',
};

export default function StartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
