import React from 'react';
import { clsx } from 'clsx';

export type ProgressVariant = 'accent' | 'success' | 'warning' | 'danger' | 'default';

export interface ProgressBarProps {
  value: number; // 0–100
  variant?: ProgressVariant;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  animated?: boolean;
}

const trackColor: Record<ProgressVariant, string> = {
  default: 'bg-accent',
  accent:  'bg-accent',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger:  'bg-red-500',
};

const trackHeight: Record<'xs' | 'sm' | 'md', string> = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2.5',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  variant   = 'accent',
  size      = 'sm',
  className,
  animated  = false,
}) => {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div
      className={clsx('w-full rounded-full bg-white/[0.06] overflow-hidden', trackHeight[size], className)}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={clsx(
          'h-full rounded-full transition-all duration-500 ease-out',
          trackColor[variant],
          animated && 'animate-pulse'
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};
