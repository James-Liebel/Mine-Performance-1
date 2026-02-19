import seed from '../../content/seed.json';

export interface Site {
  name: string;
  tagline: string;
  description: string;
}

export interface Contact {
  address: { street: string; city: string; state: string; zip: string };
  phone: string;
  email: string;
  hours: string[];
}

export interface Program {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  cta: string;
  ctaPath: string;
}

export interface Coach {
  id: string;
  name: string;
  title?: string;
  bio?: string;
  categories: string[];
  image?: string | null;
  ctaPath: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  context: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  shortDescription: string;
  ctaPath: string;
}

export const site = seed.site as Site;
export const contact = seed.contact as Contact;
export const programs = seed.programs as Program[];
export const coaches = seed.coaches as Coach[];
export const testimonials = seed.testimonials as Testimonial[];
export const faqs = seed.faqs as Faq[];
export const events = seed.events as Event[];
export const leaderboardHighlights = seed.leaderboardHighlights as {
  description: string;
  cta: string;
  ctaPath: string;
};
