'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyIcon, RefreshCwIcon, DownloadIcon, CheckIcon, EditIcon, SaveIcon, XIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { Article } from '@/types';

interface ArticleViewProps {
  article: Article;
  onRegenerate?: () => void;
  onUpdate?: (content: string, title: string) => void;
}

export function ArticleView({ article, onRegenerate, onUpdate }: ArticleViewProps) {
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(article.content);
  const [editedTitle, setEditedTitle] = useState(article.title);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditedContent(article.content);
    setEditedTitle(article.title);
  }, [article.content, article.title]);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const rect = contentRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const docHeight = contentRef.current.scrollHeight;
      const scrolled = Math.max(0, -rect.top);
      const total = docHeight - windowHeight;
      const percentage = Math.min(100, Math.max(0, (scrolled / total) * 100));
      setProgress(percentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(isEditing ? editedContent : article.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const content = isEditing ? editedContent : article.content;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${article.title.replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editedContent, editedTitle);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(article.content);
    setEditedTitle(article.title);
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-editorial-bg min-h-screen relative"
    >
      {/* Reading Progress Bar */}
      <div className="sticky top-0 left-0 right-0 h-0.5 bg-editorial-border z-20">
        <motion.div
          className="h-full bg-accent"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Floating Action Bar - 위치를 더 아래로 이동 (top-24) 및 보라색 그림자 */}
      <div className="sticky top-24 z-10 flex justify-end px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-1 bg-editorial-surface/90 backdrop-blur-sm rounded-lg p-1 border border-editorial-border shadow-[0_0_15px_rgba(99,102,241,0.3)]"
        >
          <AnimatePresence mode="wait">
            {isEditing ? (
              <>
                <motion.button
                  key="save"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={handleSave}
                  className="p-2 rounded-md text-accent hover:text-accent-hover hover:bg-accent-subtle transition-colors"
                  title="저장"
                >
                  <SaveIcon className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  key="cancel"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={handleCancel}
                  className="p-2 rounded-md text-editorial-muted hover:text-editorial-text hover:bg-editorial-bg transition-colors"
                  title="취소"
                >
                  <XIcon className="w-4 h-4" />
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  key="edit"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={() => setIsEditing(true)}
                  className="p-2 rounded-md text-editorial-muted hover:text-accent hover:bg-accent-subtle transition-colors"
                  title="수정"
                >
                  <EditIcon className="w-4 h-4" />
                </motion.button>

                <motion.button
                  key="copy"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={handleCopy}
                  className="p-2 rounded-md text-editorial-muted hover:text-editorial-text hover:bg-editorial-bg transition-colors"
                  title="클립보드에 복사"
                >
                  {copied ? (
                    <CheckIcon className="w-4 h-4 text-green-600" />
                  ) : (
                    <CopyIcon className="w-4 h-4" />
                  )}
                </motion.button>

                <motion.button
                  key="download"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={handleDownloadMarkdown}
                  className="p-2 rounded-md text-editorial-muted hover:text-editorial-text hover:bg-editorial-bg transition-colors"
                  title="마크다운 다운로드"
                >
                  <DownloadIcon className="w-4 h-4" />
                </motion.button>

                {onRegenerate && (
                  <motion.button
                    key="regenerate"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={onRegenerate}
                    className="p-2 rounded-md text-editorial-muted hover:text-editorial-text hover:bg-editorial-bg transition-colors"
                    title="재생성"
                  >
                    <RefreshCwIcon className="w-4 h-4" />
                  </motion.button>
                )}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-12 md:py-20" ref={contentRef}>
        {/* Title */}
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-editorial-text leading-tight mb-6 bg-transparent border-b-2 border-accent focus:outline-none focus:border-accent-hover pb-2"
            placeholder="제목을 입력하세요..."
          />
        ) : (
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-editorial-text leading-tight mb-6"
          >
            {article.title}
          </motion.h1>
        )}

        {/* Metadata Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center gap-2 text-sm text-editorial-muted mb-12 pb-8 border-b border-editorial-border"
        >
          <span className="font-medium text-editorial-text">{article.author}</span>
          <span>·</span>
          <span>{formatDate(article.date)}</span>
          <span>·</span>
          <span>{article.readingTime}분 읽기</span>
          <span>·</span>
          <span>{article.wordCount.toLocaleString()}자</span>
          <span className="ml-auto px-2 py-0.5 bg-accent-subtle text-accent text-xs font-medium rounded">
            {article.tone}
          </span>
        </motion.div>

        {/* Content - Editing or Viewing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {isEditing ? (
            <div className="relative">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full min-h-[600px] p-6 bg-white border-2 border-accent rounded-lg text-editorial-text font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-y"
                placeholder="마크다운 형식으로 작성하세요..."
              />
              <div className="mt-2 text-xs text-editorial-muted">
                마크다운 형식을 지원합니다. 저장하면 바로 렌더링됩니다.
              </div>
            </div>
          ) : (
            <div className="prose-editorial">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
          )}
        </motion.div>

        {/* Hashtags */}
        {!isEditing && article.hashtags && article.hashtags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-editorial-border flex flex-wrap gap-2"
          >
            {article.hashtags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-accent-subtle text-accent text-sm font-medium rounded-full"
              >
                #{tag}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
