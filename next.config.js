/** @type {import('next').NextConfig} */
const isGhPages = process.env.GITHUB_PAGES_DEPLOY === '1';
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] || '';
const isActions = !!process.env.GITHUB_ACTIONS;

let basePath = process.env.BASE_PATH || '';
let assetPrefix;
let trailingSlash = false;

if (isActions && repo) {
  basePath = `/${repo}`;
  assetPrefix = `/${repo}/`;
  trailingSlash = true;
} else if (basePath) {
  assetPrefix = basePath;
}

const nextConfig = {
  reactStrictMode: true,
  images: {
    // Always serve images directly so static exports don't rely on /_next/image
    unoptimized: true,
  },
  // Always build as a static export so GitHub Pages workflows get an ./out directory
  output: 'export',
  ...(basePath && { basePath }),
  ...(assetPrefix && { assetPrefix }),
  ...(trailingSlash && { trailingSlash: true }),
  ...(!isGhPages && {
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'X-Frame-Options', value: 'DENY' },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=31536000; includeSubDomains; preload',
            },
            {
              key: 'Content-Security-Policy',
              value: [
                "default-src 'self'",
                "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
                "style-src 'self' 'unsafe-inline'",
                "img-src 'self' data: https:",
                "font-src 'self'",
                "connect-src 'self'",
                "frame-ancestors 'none'",
                "base-uri 'self'",
                "form-action 'self'",
              ].join('; '),
            },
          ],
        },
      ];
    },
  }),
};

module.exports = nextConfig;
