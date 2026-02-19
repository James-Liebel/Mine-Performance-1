import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16 text-center md:px-6">
      <h1 className="font-display text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted-foreground">
        The page you’re looking for doesn’t exist or was moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Go home
      </Link>
    </div>
  );
}
