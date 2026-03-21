'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variants: Record<ButtonVariant, string> = {
  primary: [
    'bg-primary text-white border border-primary',
    'hover:bg-primary-dark hover:border-primary-dark hover:shadow-glow',
    'active:scale-[0.98]',
  ].join(' '),
  secondary: [
    'bg-surface text-text-primary border border-border',
    'hover:border-primary hover:bg-primary/5 hover:shadow-glow',
    'active:scale-[0.98]',
  ].join(' '),
  ghost: [
    'bg-transparent text-text-primary border border-transparent',
    'hover:bg-slate-100 hover:border-border',
    'active:scale-[0.98]',
  ].join(' '),
  accent: [
    'bg-accent text-white border border-accent',
    'hover:bg-accent-dark hover:border-accent-dark hover:shadow-glow-accent',
    'active:scale-[0.98]',
  ].join(' '),
  outline: [
    'bg-transparent text-primary border border-primary/40',
    'hover:bg-primary/10 hover:border-primary hover:shadow-glow',
    'active:scale-[0.98]',
  ].join(' '),
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-6 py-3 text-sm rounded-xl gap-2',
  lg: 'px-8 py-4 text-base rounded-xl gap-2.5',
};

/**
 * Button component with shimmer hover effect, multiple variants and sizes
 * Supports rendering as <a> element when href is provided
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      href,
      external,
      loading,
      icon,
      iconPosition = 'right',
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center font-grotesk font-medium',
      'transition-all duration-200 ease-out',
      'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'btn-shimmer',
      'select-none whitespace-nowrap',
      variants[variant],
      sizes[size],
      (disabled || loading) && 'opacity-50 cursor-not-allowed pointer-events-none',
      className
    );

    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin h-4 w-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {icon && iconPosition === 'left' && !loading && (
          <span className="shrink-0">{icon}</span>
        )}
        <span>{children}</span>
        {icon && iconPosition === 'right' && !loading && (
          <span className="shrink-0">{icon}</span>
        )}
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          className={baseClasses}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          aria-disabled={disabled}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
