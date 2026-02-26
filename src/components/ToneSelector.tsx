'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const TONES = ['Professional', 'Technical', 'Casual', 'Beginner-Friendly'] as const;

interface ToneSelectorProps {
  value: string;
  onChange: (tone: string) => void;
}

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className="inline-flex items-center bg-dark-bg/50 rounded-lg p-1 border border-dark-border">
      {TONES.map((tone) => {
        const isActive = value === tone;
        return (
          <button
            key={tone}
            onClick={() => onChange(tone)}
            className={cn(
              'relative px-4 py-2 text-sm font-medium rounded-md transition-colors',
              isActive ? 'text-white' : 'text-dark-muted hover:text-dark-text'
            )}
            type="button"
          >
            {isActive && (
              <motion.div
                layoutId="tone-indicator"
                className="absolute inset-0 bg-accent rounded-md"
                transition={{
                  type: 'spring',
                  bounce: 0.2,
                  duration: 0.4
                }}
              />
            )}
            <span className="relative z-10">{tone}</span>
          </button>
        );
      })}
    </div>
  );
}
