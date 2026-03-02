export type MembershipCategory = 'adult' | 'youth' | 'remote';

export interface MembershipOption {
  id: string;
  label: string;
  daysPerWeek: number;
  priceCents: number;
  /** Stripe Payment Link URL for this option (e.g. https://buy.stripe.com/...). When set, "Choose plan" goes here instead of contact. */
  stripePaymentLink?: string;
}

export interface Membership {
  id: string;
  name: string;
  category: MembershipCategory;
  basePrice2Day: number;
  billingLabel: 'billed every 4 weeks';
  options: MembershipOption[];
  /** Stripe Payment Link URL for this plan (used when no option-specific link is set). */
  stripePaymentLink?: string;
  /** Short description of what the membership includes */
  description?: string;
  /** Days of the week this option is available (e.g. Mon, Wed, Fri) */
  daysAvailable?: string[];
  /** Time range when sessions are available (e.g. "5:00 pm – 7:00 pm") */
  timesAvailable?: string;
}

function build(p1?: number, p2?: number, p3?: number): MembershipOption[] {
  const opts: MembershipOption[] = [];
  if (p1 !== undefined) {
    opts.push({ id: '1-day', label: '1 day per week', daysPerWeek: 1, priceCents: p1 * 100 });
  }
  if (p2 !== undefined) {
    opts.push({ id: '2-day', label: '2 days per week', daysPerWeek: 2, priceCents: p2 * 100 });
  }
  if (p3 !== undefined) {
    opts.push({ id: '3-day', label: '3 days per week', daysPerWeek: 3, priceCents: p3 * 100 });
  }
  return opts;
}

export const MEMBERSHIPS: Membership[] = [
  {
    id: 'spt-pitching',
    name: 'Strength + Pitching',
    category: 'adult',
    basePrice2Day: 400,
    billingLabel: 'billed every 4 weeks',
    options: build(300, 400, 500),
    description: 'Performance Combo: Combined strength training and pitching development.',
    daysAvailable: ['Mon', 'Wed', 'Fri'],
    timesAvailable: '5:00 pm – 7:00 pm',
  },
  {
    id: 'spt-hitting',
    name: 'Strength + Hitting',
    category: 'adult',
    basePrice2Day: 400,
    billingLabel: 'billed every 4 weeks',
    options: build(300, 400, 500),
    description: 'Performance Combo: Strength work and hitting instruction in one plan.',
    daysAvailable: ['Tue', 'Thu', 'Sat'],
    timesAvailable: '6:00 pm – 8:00 pm',
  },
  {
    id: 'hitting-pitching-adult',
    name: 'Hitting + Pitching',
    category: 'adult',
    basePrice2Day: 400,
    billingLabel: 'billed every 4 weeks',
    options: build(300, 400, 500),
    description: 'Performance Combo: Dual focus on hitting and pitching development.',
    daysAvailable: ['Mon', 'Wed', 'Fri'],
    timesAvailable: '5:00 pm – 7:30 pm',
  },
  {
    id: 'hitting-armcare-spt',
    name: 'Hitting / Arm Care / Strength',
    category: 'adult',
    basePrice2Day: 500,
    billingLabel: 'billed every 4 weeks',
    options: build(400, 500, 600),
    description: 'Triple Discipline: Full mix of hitting, arm care, and strength.',
    daysAvailable: ['Mon', 'Wed', 'Fri'],
    timesAvailable: '5:00 pm – 7:30 pm',
  },
  {
    id: 'hitting-pitching-spt',
    name: 'Hitting / Pitching / Strength',
    category: 'adult',
    basePrice2Day: 500,
    billingLabel: 'billed every 4 weeks',
    options: build(400, 500, 600),
    description: 'Triple Discipline: Complete training covering hitting, pitching, and strength.',
    daysAvailable: ['Mon', 'Wed', 'Fri'],
    timesAvailable: '5:00 pm – 7:30 pm',
  },
  {
    id: 'fielding-spt',
    name: 'Fielding and Strength',
    category: 'adult',
    basePrice2Day: 400,
    billingLabel: 'billed every 4 weeks',
    options: build(300, 400, 500),
    description: 'Performance Combo: Infield/outfield work plus weight room.',
    daysAvailable: ['Tue', 'Thu'],
    timesAvailable: '6:00 pm – 8:00 pm',
  },

  {
    id: 'spt',
    name: 'Strength',
    category: 'adult',
    basePrice2Day: 320,
    billingLabel: 'billed every 4 weeks',
    options: build(240, 320, 400),
    description: 'Single Discipline: Weight room and athletic development only.',
    daysAvailable: ['Mon', 'Wed', 'Fri'],
    timesAvailable: '5:00 pm – 7:00 pm',
  },
  {
    id: 'hitting',
    name: 'Hitting',
    category: 'adult',
    basePrice2Day: 320,
    billingLabel: 'billed every 4 weeks',
    options: build(240, 320, 400),
    description: 'Single Discipline: Cage work, exit velocity, and approach refinement.',
    daysAvailable: ['Mon', 'Wed', 'Fri'],
    timesAvailable: '5:00 pm – 7:00 pm',
  },
  {
    id: 'pitching',
    name: 'Pitching',
    category: 'adult',
    basePrice2Day: 320,
    billingLabel: 'billed every 4 weeks',
    options: build(240, 320, 400),
    description: 'Single Discipline: Velocity development, mechanics, and arm care.',
    daysAvailable: ['Mon', 'Wed', 'Fri'],
    timesAvailable: '5:00 pm – 7:00 pm',
  },

  {
    id: 'catching',
    name: 'Catching Program',
    category: 'adult',
    basePrice2Day: 320,
    billingLabel: 'billed every 4 weeks',
    options: build(240, 320, 400),
    description: 'Single Discipline: Receiving, blocking, and game-calling development.',
    daysAvailable: ['Tue', 'Thu'],
    timesAvailable: '6:00 pm – 8:00 pm',
  },
  {
    id: 'arm-care-development',
    name: 'Arm Care & Development',
    category: 'adult',
    basePrice2Day: 320,
    billingLabel: 'billed every 4 weeks',
    options: build(240, 320, 400),
    description: 'Single Discipline: Return-to-throw and injury prevention protocols.',
    daysAvailable: ['Mon', 'Wed'],
    timesAvailable: '5:00 pm – 6:30 pm',
  },
  {
    id: 'baseline-membership',
    name: 'Baseline Membership',
    category: 'adult',
    basePrice2Day: 50,
    billingLabel: 'billed every 4 weeks',
    options: [{ id: 'baseline', label: 'Baseline', daysPerWeek: 0, priceCents: 5000 }],
    description: 'Entry-level access to the facility and basic resources.',
  },
  {
    id: 'training-only-summer',
    name: 'Training Only (Summer)',
    category: 'adult',
    basePrice2Day: 75,
    billingLabel: 'billed every 4 weeks',
    options: [{ id: 'summer-training', label: 'Summer session', daysPerWeek: 1, priceCents: 7500 }],
    description: 'Limited seasonal training option during summer months.',
  },

  {
    id: 'youth-spt',
    name: 'Youth Strength',
    category: 'youth',
    basePrice2Day: 160,
    billingLabel: 'billed every 4 weeks',
    options: build(undefined, 160, undefined),
    description: 'Youth Speed, Power & Throws sessions.',
    daysAvailable: ['Tue', 'Thu'],
    timesAvailable: '4:00 pm – 6:00 pm',
  },
  {
    id: 'youth-hitting',
    name: 'Youth Hitting Membership',
    category: 'youth',
    basePrice2Day: 240,
    billingLabel: 'billed every 4 weeks',
    options: build(undefined, 240, undefined),
    description: 'Youth Hitting sessions.',
    daysAvailable: ['Tue', 'Thu'],
    timesAvailable: '4:00 pm – 6:00 pm',
  },
  {
    id: 'youth-pitching',
    name: 'Youth Pitching Membership',
    category: 'youth',
    basePrice2Day: 240,
    billingLabel: 'billed every 4 weeks',
    options: build(undefined, 240, undefined),
    description: 'Youth Pitching sessions.',
    daysAvailable: ['Mon', 'Wed'],
    timesAvailable: '4:00 pm – 5:30 pm',
  },
  {
    id: 'youth-hitting-spt',
    name: 'Youth Hitting + Strength',
    category: 'youth',
    basePrice2Day: 320,
    billingLabel: 'billed every 4 weeks',
    options: build(undefined, 320, undefined),
    description: 'Combined Youth Hitting and Strength.',
    daysAvailable: ['Tue', 'Thu'],
    timesAvailable: '4:00 pm – 6:00 pm',
  },
  {
    id: 'youth-pitching-spt',
    name: 'Youth Pitching + Strength',
    category: 'youth',
    basePrice2Day: 320,
    billingLabel: 'billed every 4 weeks',
    options: build(undefined, 320, undefined),
    description: 'Combined Youth Pitching and Strength.',
    daysAvailable: ['Mon', 'Wed'],
    timesAvailable: '4:00 pm – 6:00 pm',
  },
  {
    id: 'youth-hitting-pitching',
    name: 'Youth Hitting + Pitching',
    category: 'youth',
    basePrice2Day: 320,
    billingLabel: 'billed every 4 weeks',
    options: build(undefined, 320, undefined),
    description: 'Combined Youth Hitting and Pitching.',
    daysAvailable: ['Mon', 'Wed', 'Fri'],
    timesAvailable: '4:00 pm – 6:00 pm',
  },
  {
    id: 'remote-pitching-training',
    name: 'Remote Pitching Training',
    category: 'remote',
    basePrice2Day: 250,
    billingLabel: 'billed every 4 weeks',
    options: [{ id: 'remote-2-day', label: 'Remote program (2 days per week suggested)', daysPerWeek: 2, priceCents: 25000 }],
    description: 'Video-based pitching program with coach check-ins.',
    daysAvailable: ['Flexible'],
    timesAvailable: 'By appointment',
  },
];

export function getMembershipById(id: string): Membership | undefined {
  return MEMBERSHIPS.find((m) => m.id === id);
}

export function getMembershipOptions(id: string): MembershipOption[] {
  const membership = getMembershipById(id);
  return membership?.options ?? [];
}

