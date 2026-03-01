/**
 * Centralized image paths. Place image files in public/ and reference here.
 * basePath is used for GitHub Pages (e.g. /Mine-Performance-1) so images load correctly.
 */
const basePath = typeof process !== 'undefined' ? (process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH || '') : '';

export const IMAGES = {
  logo: {
    src: `${basePath}/mp-logo.png`,
    alt: 'Mine Performance logo',
    width: 120,
    height: 120,
  },
} as const;

export type ImageKey = keyof typeof IMAGES;
