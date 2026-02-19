'use client';

import { useState } from 'react';
import Link from 'next/link';
import { programs } from '@/lib/content';
import { buttonVariants } from '@/components/ui/button';
import { trackStartWizardComplete } from '@/lib/analytics';

const goals = [
  { id: 'velocity', label: 'Velocity / throwing' },
  { id: 'pitch-design', label: 'Pitch design' },
  { id: 'rehab', label: 'Rehab / return to play' },
  { id: 'hitting', label: 'Hitting' },
  { id: 'strength', label: 'Strength & conditioning' },
];

export default function StartPage() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<string | null>(null);
  const [age, setAge] = useState<string>('');
  const [recommended, setRecommended] = useState<typeof programs[0] | null>(null);

  const handleGoal = (g: string) => {
    setGoal(g);
    setStep(2);
  };

  const handleAge = () => {
    const program = programs.find((p) => p.id === goal) || programs[0];
    setRecommended(program);
    trackStartWizardComplete(goal || 'unknown', program.id);
    setStep(3);
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 md:px-6">
      <h1 className="font-display text-3xl font-bold">Start here</h1>
      <p className="mt-2 text-muted-foreground">
        Tell us your goal and we’ll recommend a program and next step.
      </p>

      {step === 1 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold">What’s your main goal?</h2>
          <ul className="mt-4 space-y-2">
            {goals.map((g) => (
              <li key={g.id}>
                <button
                  type="button"
                  onClick={() => handleGoal(g.id)}
                  className="w-full rounded-lg border bg-card px-4 py-4 text-left text-sm font-medium shadow-sm hover:bg-muted min-h-[44px]"
                >
                  {g.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {step === 2 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold">Age group (optional)</h2>
          <p className="mt-1 text-sm text-muted-foreground">Helps us tailor recommendations.</p>
          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-4 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Select</option>
            <option value="youth">Youth</option>
            <option value="hs">High school</option>
            <option value="college">College / adult</option>
          </select>
          <div className="mt-6 flex gap-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={buttonVariants({ variant: 'outline' })}
            >
              Back
            </button>
            <button type="button" onClick={handleAge} className={buttonVariants()}>
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && recommended && (
        <div className="mt-10 rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">We recommend</h2>
          <p className="mt-2 font-medium">{recommended.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{recommended.shortDescription}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href={recommended.ctaPath} className={buttonVariants()}>
              {recommended.cta}
            </Link>
            <Link href="/programs" className={buttonVariants({ variant: 'secondary' })}>
              View all programs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
