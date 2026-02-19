import { faqs } from '@/lib/content';
import { getButtonClasses } from '@/lib/button-classes';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Mine Performance Academy programs and booking.',
};

export default function FAQPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="font-display text-3xl font-bold">FAQ</h1>
      <p className="mt-2 text-muted-foreground">
        Common questions about programs, booking, and what to expect.
      </p>
      <dl className="mt-10 space-y-8">
        {faqs.map((faq, i) => (
          <div key={i}>
            <dt className="text-lg font-semibold">{faq.question}</dt>
            <dd className="mt-2 text-muted-foreground">{faq.answer}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-12">
        <Link href="/contact" className={getButtonClasses()}>
          Still have questions? Contact us
        </Link>
      </div>
    </div>
  );
}
