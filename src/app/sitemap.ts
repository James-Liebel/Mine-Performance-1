import { MetadataRoute } from 'next';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://mineperformance.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '',
    '/programs',
    '/coaches',
    '/events',
    '/results',
    '/facility',
    '/about',
    '/contact',
    '/faq',
    '/start',
  ];
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : ('monthly' as const),
    priority: path === '' ? 1 : 0.8,
  }));
}
