import { site } from '@/lib/content';
import Link from 'next/link';
import { getButtonClasses } from '@/lib/button-classes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Our story and mission at Mine Performance Academy.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="font-display text-3xl font-bold">About {site.name}</h1>
      <p className="mt-2 text-muted-foreground">{site.tagline}</p>
      <div className="prose prose-neutral mt-10 max-w-none">
        <p>{site.description}</p>
        <p className="mt-4">
          We combine data-driven training with experienced coaching to help athletes reach the next level—whether that’s velocity, pitch design, hitting, strength, or return from injury.
        </p>
      </div>
      <div className="mt-10">
        <Link href="/contact" className={getButtonClasses()}>
          Get in touch
        </Link>
      </div>
    </div>
  );
}
