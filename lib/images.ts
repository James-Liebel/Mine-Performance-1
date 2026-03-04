export const IMAGES = {
  logo: {
    src: '/mp-logo.png',
    alt: 'Mine Performance logo',
    width: 120,
    height: 120,
  },
} as const;

export type ImageKey = keyof typeof IMAGES;
