/**
 * Analytics placeholder. No real keys. Events for CTA clicks.
 */
export function trackCtaClick(label: string, destination?: string) {
  if (typeof window === 'undefined') return;
  // Placeholder: e.g. window.gtag('event', 'cta_click', { label, destination });
  console.debug('[Analytics] CTA click', { label, destination });
}

export function trackStartWizardComplete(goal: string, recommendedProgram: string) {
  if (typeof window === 'undefined') return;
  console.debug('[Analytics] Start wizard complete', { goal, recommendedProgram });
}
