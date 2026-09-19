import React from 'react';
import { clsx } from 'clsx';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Adds hover background + cursor styles for clickable cards */
  interactive?: boolean;
  /** Selected/active ring treatment */
  selected?: boolean;
  /** Danger state */
  danger?: boolean;
  onClick?: () => void;
  as?: React.ElementType;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClass = {
  none: '',
  sm:   'p-3',
  md:   'p-4 sm:p-5',
  lg:   'p-5 sm:p-6',
};

export const Card: React.FC<CardProps> = ({
  children,
  className,
  interactive = false,
  selected    = false,
  danger      = false,
  onClick,
  as: Tag = 'div',
  padding = 'md',
}) => (
  <Tag
    onClick={onClick}
    tabIndex={onClick ? 0 : undefined}
    role={onClick ? 'button' : undefined}
    className={clsx(
      'bg-elevated border rounded-xl',
      paddingClass[padding],
      // State
      danger
        ? 'border-red-500/20 bg-red-500/[0.04]'
        : selected
          ? 'border-accent/35 bg-accent/[0.05] ring-1 ring-accent/20'
          : 'border-white/[0.07]',
      // Interactive
      interactive && [
        'cursor-pointer transition-colors duration-150',
        !danger && !selected && 'hover:bg-overlay hover:border-white/[0.12]',
      ],
      className
    )}
  >
    {children}
  </Tag>
);
