'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, ClockIcon, TrashIcon, Trash2Icon } from 'lucide-react';
import { Article } from '@/types';
import { formatDate } from '@/lib/utils';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: Article[];
  onSelectArticle: (article: Article) => void;
  onClearHistory: () => void;
  onDeleteArticle: (articleId: string) => void;
}

export function HistorySidebar({
  isOpen,
  onClose,
  history,
  onSelectArticle,
  onClearHistory,
  onDeleteArticle,
}: HistorySidebarProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleClearHistory = () => {
    setShowDeleteModal(true);
  };

  const confirmClearHistory = () => {
    onClearHistory();
    setShowDeleteModal(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-dark-surface border-l border-dark-border z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-dark-border">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-semibold text-dark-text">
                  히스토리
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-dark-border/50 transition-colors"
              >
                <XIcon className="w-5 h-5 text-dark-muted" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                  <ClockIcon className="w-12 h-12 text-dark-muted mb-4" />
                  <p className="text-dark-muted text-sm">
                    아직 생성된 글이 없습니다.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map((article) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="relative group"
                    >
                      <button
                        onClick={() => {
                          onSelectArticle(article);
                          onClose();
                        }}
                        className="w-full text-left p-4 pr-12 rounded-lg bg-dark-bg border border-dark-border hover:border-accent/50 transition-all"
                      >
                        <h3 className="text-dark-text font-medium mb-1 line-clamp-2 group-hover:text-accent transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-dark-muted text-xs mb-2">
                          {formatDate(article.date)}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {article.keywords?.slice(0, 3).map((keyword, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-accent-subtle text-accent text-xs rounded"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </button>
                      
                      {/* 개별 삭제 버튼 */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteArticle(article.id);
                        }}
                        className="absolute top-4 right-4 p-2 rounded-md opacity-0 group-hover:opacity-100 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all"
                        title="삭제"
                      >
                        <Trash2Icon className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {history.length > 0 && (
              <div className="p-4 border-t border-dark-border">
                <button
                  onClick={handleClearHistory}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <TrashIcon className="w-4 h-4" />
                  모두 삭제
                </button>
              </div>
            )}
          </motion.div>

          {/* 삭제 확인 모달 */}
          <AnimatePresence>
            {showDeleteModal && (
              <>
                {/* 모달 오버레이 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowDeleteModal(false)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center"
                >
                  {/* 모달 컨텐츠 */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-md mx-4"
                  >
                    <div className="bg-dark-surface border-2 border-red-500/30 rounded-xl p-6 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                      {/* 아이콘 */}
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                          <TrashIcon className="w-8 h-8 text-red-400" />
                        </div>
                      </div>
                      
                      {/* 제목 */}
                      <h3 className="text-xl font-bold text-dark-text text-center mb-2">
                        모든 히스토리를 삭제하시겠습니까?
                      </h3>
                      
                      {/* 설명 */}
                      <p className="text-dark-muted text-center text-sm mb-6">
                        총 {history.length}개의 글이 영구적으로 삭제됩니다.<br />
                        이 작업은 되돌릴 수 없습니다.
                      </p>
                      
                      {/* 버튼 */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => setShowDeleteModal(false)}
                          className="flex-1 px-4 py-2.5 bg-dark-bg border border-dark-border text-dark-text rounded-lg hover:bg-dark-border/50 transition-colors font-medium"
                        >
                          취소
                        </button>
                        <button
                          onClick={confirmClearHistory}
                          className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
