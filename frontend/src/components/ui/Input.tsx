import React from 'react';
import { clsx } from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  leftIcon,
  className,
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-medium text-slate-400">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={clsx(
            'w-full bg-surface border rounded-lg px-3 py-2 text-sm text-slate-100',
            'placeholder:text-slate-600 transition-colors duration-150',
            'focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20',
            error
              ? 'border-red-500/40 focus:border-red-500/60'
              : 'border-white/[0.09] hover:border-white/[0.14]',
            leftIcon && 'pl-9',
            className
          )}
          {...props}
        />
      </div>
      {(helperText || error) && (
        <p className={clsx('text-xs', error ? 'text-red-400' : 'text-slate-500')}>
          {error ?? helperText}
        </p>
      )}
    </div>
  );
};

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  helperText,
  error,
  className,
  id,
  children,
  ...props
}) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-medium text-slate-400">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={clsx(
          'w-full bg-surface border rounded-lg px-3 py-2 text-sm text-slate-100',
          'transition-colors duration-150',
          'focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20',
          error
            ? 'border-red-500/40'
            : 'border-white/[0.09] hover:border-white/[0.14]',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {(helperText || error) && (
        <p className={clsx('text-xs', error ? 'text-red-400' : 'text-slate-500')}>
          {error ?? helperText}
        </p>
      )}
    </div>
  );
};
