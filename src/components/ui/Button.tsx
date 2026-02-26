'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  children,
  disabled,
  onClick,
  type = 'button',
}: ButtonProps) {
  const variants = {
    primary:
      'bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20',
    secondary:
      'bg-editorial-surface text-editorial-text border border-editorial-border hover:bg-editorial-bg',
    ghost:
      'bg-transparent text-editorial-muted hover:text-editorial-text hover:bg-editorial-border/50',
    dark: 'bg-dark-surface text-dark-text border border-dark-border hover:bg-dark-border/20'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm font-medium',
    lg: 'px-8 py-3.5 text-base font-medium'
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={
        !disabled && !isLoading
          ? { scale: 1.02 }
          : undefined
      }
      whileTap={
        !disabled && !isLoading
          ? { scale: 0.98 }
          : undefined
      }
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-dark-bg',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span>생성 중...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
}
