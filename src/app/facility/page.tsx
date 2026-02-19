import { getButtonClasses } from '@/lib/button-classes';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Facility',
  description: 'Tour our facility and amenities at Mine Performance Academy.',
};

export default function FacilityPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="font-display text-3xl font-bold">Facility</h1>
      <p className="mt-2 text-muted-foreground">
        A dedicated space for velocity, hitting, strength, and recovery.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="aspect-video rounded-xl bg-muted" />
        <div className="aspect-video rounded-xl bg-muted" />
        <div className="aspect-video rounded-xl bg-muted sm:col-span-2" />
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Amenities</h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-muted-foreground">
          <li>Indoor throwing lanes and cages</li>
          <li>TrackMan and Edgertronic for pitch design</li>
          <li>Strength and conditioning area</li>
          <li>Recovery and rehab space</li>
        </ul>
      </div>
      <div className="mt-10">
        <Link href="/contact" className={getButtonClasses()}>
          Visit us — get directions
        </Link>
      </div>
    </div>
  );
}
