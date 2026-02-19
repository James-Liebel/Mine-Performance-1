/**
 * Server-safe button link class names. Use in server components instead of buttonVariants.
 */
export function getButtonClasses(options: {
  variant?: 'default' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
} = {}) {
  const { variant = 'default', size = 'default' } = options;
  const base =
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[44px]';
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 py-3',
    accent: 'bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3',
    outline: 'border border-input bg-background hover:bg-muted px-6 py-3',
    ghost: 'hover:bg-muted px-6 py-3',
  };
  const sizes = {
    default: 'h-11 px-6',
    sm: 'h-9 px-4',
    lg: 'h-12 px-8 text-base',
  };
  return `${base} ${variants[variant]} ${sizes[size]}`;
}
