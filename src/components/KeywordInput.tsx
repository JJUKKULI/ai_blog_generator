'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KeywordInputProps {
  keywords: string[];
  onChange: (keywords: string[]) => void;
}

export function KeywordInput({ keywords, onChange }: KeywordInputProps) {
  const [inputValue, setInputValue] = useState('');

  const addKeyword = (value: string) => {
    const trimmed = value.trim().toLowerCase();
    if (trimmed && !keywords.includes(trimmed)) {
      onChange([...keywords, trimmed]);
    }
    setInputValue('');
  };

  const removeKeyword = (keyword: string) => {
    onChange(keywords.filter((k) => k !== keyword));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && keywords.length > 0) {
      removeKeyword(keywords[keywords.length - 1]);
    }
  };

  return (
    <div
      className={cn(
        'w-full rounded-lg border bg-dark-surface border-dark-border px-3 py-2 transition-all',
        'focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/20',
        'flex flex-wrap items-center gap-2 min-h-[44px]'
      )}
    >
      <AnimatePresence mode="popLayout">
        {keywords.map((keyword) => (
          <motion.span
            key={keyword}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-accent-subtle text-accent-light text-xs font-medium rounded-md"
          >
            {keyword}
            <button
              onClick={() => removeKeyword(keyword)}
              className="text-accent-light/60 hover:text-accent-light transition-colors ml-0.5"
              type="button"
            >
              <XIcon className="w-3 h-3" />
            </button>
          </motion.span>
        ))}
      </AnimatePresence>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          keywords.length === 0 ? '키워드 입력 (Enter로 추가)...' : ''
        }
        className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm text-dark-text placeholder:text-dark-muted py-1"
      />
    </div>
  );
}
