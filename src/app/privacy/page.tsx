import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Mine Performance Academy.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-display text-3xl font-bold">Privacy policy</h1>
      <p className="mt-4 text-muted-foreground">
        Placeholder — needs client content. Add your privacy policy here (how you collect, use, and protect visitor and athlete data).
      </p>
    </div>
  );
}
