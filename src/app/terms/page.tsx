import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of use',
  description: 'Terms of use for Mine Performance Academy.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-display text-3xl font-bold">Terms of use</h1>
      <p className="mt-4 text-muted-foreground">
        Placeholder — needs client content. Add your terms of use here (participation, waivers, cancellation, etc.).
      </p>
    </div>
  );
}
