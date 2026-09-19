import React from 'react';
import { clsx } from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:   'bg-accent hover:bg-[#0284c7] text-[#ffffff] shadow-elevation-sm',
  secondary: 'bg-transparent hover:bg-white/5 text-slate-300 border border-white/[0.09] hover:border-white/[0.16]',
  ghost:     'bg-transparent hover:bg-white/5 text-slate-400 hover:text-slate-200',
  danger:    'bg-transparent hover:bg-red-500/10 text-red-400 border border-red-500/20 hover:border-red-500/40',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-7  px-3   text-xs  gap-1.5 rounded-md',
  md: 'h-9  px-4   text-sm  gap-2   rounded-lg',
  lg: 'h-11 px-5   text-sm  gap-2.5 rounded-lg',
};

export const Button: React.FC<ButtonProps> = ({
  variant  = 'secondary',
  size     = 'md',
  loading  = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}) => (
  <button
    disabled={disabled || loading}
    className={clsx(
      'inline-flex items-center justify-center font-medium',
      'transition-colors duration-150 select-none shrink-0',
      'disabled:opacity-40 disabled:cursor-not-allowed',
      variants[variant],
      sizes[size],
      className
    )}
    {...props}
  >
    {loading
      ? <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      : leftIcon}
    {children && <span>{children}</span>}
    {!loading && rightIcon}
  </button>
);
