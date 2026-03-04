const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

let cachedContent: Record<string, string> | null = null;

export async function getSiteContent(): Promise<Record<string, string>> {
  if (isStaticExport) {
    if (cachedContent) return cachedContent;
    const jsonPath = basePath ? `${basePath}/site-content.json` : '/site-content.json';
    try {
      const res = await fetch(jsonPath, { cache: 'force-cache' });
      const data = await res.json().catch(() => ({}));
      cachedContent = res.ok && data && typeof data === 'object' ? (data as Record<string, string>) : {};
      return cachedContent;
    } catch {
      cachedContent = {};
      return cachedContent;
    }
  }

  try {
    const res = await fetch('/api/site-content', { cache: 'no-store' });
    const data = await res.json().catch(() => ({}));
    return res.ok && data && typeof data === 'object' ? (data as Record<string, string>) : {};
  } catch {
    return {};
  }
}

