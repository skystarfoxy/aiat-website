import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'primary' | 'accent' | 'muted' | 'upcoming' | 'past' | 'online' | 'research' | 'education' | 'partnership';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-border/60 text-text-secondary border border-border',
  primary: 'bg-primary/15 text-primary-light border border-primary/25',
  accent: 'bg-accent/15 text-accent border border-accent/25',
  muted: 'bg-surface text-muted border border-border/50',
  upcoming: 'bg-primary/15 text-primary-light border border-primary/30',
  past: 'bg-surface text-muted border border-border/60',
  online: 'bg-accent/15 text-accent border border-accent/25',
  research: 'bg-violet-500/15 text-violet-300 border border-violet-500/25',
  education: 'bg-blue-500/15 text-blue-300 border border-blue-500/25',
  partnership: 'bg-amber-500/15 text-amber-300 border border-amber-500/25',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-text-secondary',
  primary: 'bg-primary',
  accent: 'bg-accent',
  muted: 'bg-muted',
  upcoming: 'bg-primary',
  past: 'bg-muted',
  online: 'bg-accent',
  research: 'bg-violet-400',
  education: 'bg-blue-400',
  partnership: 'bg-amber-400',
};

/**
 * Badge component — pill-shaped label for tags, statuses, categories
 */
export function Badge({ variant = 'default', children, className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5',
        'px-2.5 py-1 rounded-full',
        'text-xs font-medium tracking-wide',
        'font-grotesk',
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full shrink-0',
            dotColors[variant]
          )}
        />
      )}
      {children}
    </span>
  );
}
