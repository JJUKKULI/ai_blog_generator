'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: 'light' | 'dark';
}

export function Input({
  className,
  label,
  variant = 'light',
  ...props
}: InputProps) {
  const variants = {
    light:
      'bg-editorial-surface border-editorial-border text-editorial-text placeholder:text-editorial-muted/60 focus:border-accent focus:ring-accent/10',
    dark: 'bg-dark-surface border-dark-border text-dark-text placeholder:text-dark-muted focus:border-accent focus:ring-accent/20'
  };

  return (
    <div className="w-full">
      {label && (
        <label
          className={cn(
            'block text-sm font-medium mb-1.5 ml-1',
            variant === 'dark' ? 'text-dark-muted' : 'text-editorial-muted'
          )}
        >
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full rounded-lg border px-4 py-3 text-base transition-all',
          'focus:outline-none focus:ring-4',
          variants[variant],
          className
        )}
        {...props}
      />
    </div>
  );
}
