import React from 'react';
import { clsx } from 'clsx';

export type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-white/[0.07]   text-slate-400  border-white/[0.09]',
  accent:  'bg-accent/10      text-accent      border-accent/20',
  success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-500/10   text-amber-400   border-amber-500/20',
  danger:  'bg-red-500/10     text-red-400     border-red-500/20',
  info:    'bg-blue-500/10    text-blue-400    border-blue-500/20',
};

const dotColor: Record<BadgeVariant, string> = {
  default: 'bg-slate-400',
  accent:  'bg-accent',
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  danger:  'bg-red-400',
  info:    'bg-blue-400',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  className,
  dot,
}) => (
  <span
    className={clsx(
      'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium border',
      variants[variant],
      className
    )}
  >
    {dot && <span className={clsx('w-1.5 h-1.5 rounded-full shrink-0', dotColor[variant])} />}
    {children}
  </span>
);
