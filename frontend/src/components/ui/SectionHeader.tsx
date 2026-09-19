import React from 'react';

export interface SectionHeaderProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  title,
  description,
  action,
  badge,
  className = '',
}) => (
  <div className={`flex flex-col sm:flex-row sm:items-start justify-between gap-3 ${className}`}>
    <div className="flex items-start gap-3 min-w-0">
      {icon && (
        <div className="mt-0.5 text-slate-500 shrink-0">
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-base font-semibold text-slate-100 leading-snug">{title}</h2>
          {badge}
        </div>
        {description && (
          <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);
