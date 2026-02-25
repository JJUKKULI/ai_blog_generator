'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, HistoryIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ToneSelector } from '@/components/ToneSelector';
import { ArticleView } from '@/components/ArticleView';
import { KeywordInput } from '@/components/KeywordInput';
import { HistorySidebar } from '@/components/HistorySidebar';
import { UserMenu } from '@/components/UserMenu';
import { Article } from '@/types';
import { calculateReadingTime } from '@/lib/utils';

const HISTORY_STORAGE_KEY = 'ai-blog-history';
const MAX_HISTORY_ITEMS = 20;

export default function Home() {
  const { data: session } = useSession();
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [tone, setTone] = useState('Professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<Article[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Load history from localStorage or Supabase on mount
  useEffect(() => {
    if (session?.user) {
      // 로그인 상태: Supabase에서 불러오기
      loadFromSupabase();
    } else {
      // 비로그인 상태: localStorage에서 불러오기
      const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (savedHistory) {
        try {
          const parsed = JSON.parse(savedHistory);
          const historyWithDates = parsed.map((article: any) => ({
            ...article,
            date: new Date(article.date),
          }));
          setHistory(historyWithDates);
        } catch (error) {
          console.error('Failed to load history:', error);
        }
      }
    }
  }, [session]);

  const loadFromSupabase = async () => {
    if (!session?.user?.id) return;

    // Supabase 환경 변수 확인
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log('Supabase not configured, using localStorage');
      return;
    }

    try {
      console.log('🔄 API를 통해 Supabase에서 글 로드...');
      
      const response = await fetch('/api/articles');
      
      if (!response.ok) {
        throw new Error('API 로드 실패');
      }

      const { data } = await response.json();

      if (data && data.length > 0) {
        const articles: Article[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          content: item.content,
          date: new Date(item.created_at),
          tone: item.tone,
          topic: item.topic,
          keywords: item.keywords,
          author: item.author,
          readingTime: item.reading_time,
          wordCount: item.word_count,
          metaDescription: item.meta_description,
          hashtags: item.hashtags,
        }));
        setHistory(articles);
        console.log('✅ Supabase에서 로드 성공:', articles.length, '개');
      } else {
        console.log('ℹ️ Supabase에 저장된 글 없음');
        setHistory([]);
      }
    } catch (error) {
      console.warn('❌ Supabase 로드 실패, localStorage 사용:', error);
      // Supabase 실패 시 localStorage 사용
      const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (savedHistory) {
        try {
          const parsed = JSON.parse(savedHistory);
          const historyWithDates = parsed.map((article: any) => ({
            ...article,
            date: new Date(article.date),
          }));
          setHistory(historyWithDates);
        } catch (e) {
          console.error('Failed to load localStorage:', e);
        }
      }
    }
  };

  // Save history to localStorage or Supabase
  const saveToHistory = async (article: Article) => {
    if (session?.user?.id && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      // 로그인 상태 + Supabase 설정됨: API Route로 저장
      try {
        console.log('🔄 API를 통해 Supabase에 저장 시도...');
        console.log('Session user ID:', session.user.id);
        console.log('Article ID:', article.id);
        
        const response = await fetch('/api/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: article.id,
            title: article.title,
            content: article.content,
            topic: article.topic,
            keywords: article.keywords,
            tone: article.tone,
            author: article.author,
            reading_time: article.readingTime,
            word_count: article.wordCount,
            meta_description: article.metaDescription,
            hashtags: article.hashtags,
          }),
        });

        console.log('API 응답 상태:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('❌ API 응답 에러:', errorData);
          throw new Error(`API 저장 실패: ${response.status}`);
        }

        const result = await response.json();
        console.log('✅ Supabase에 저장 성공!', result);
        
        // 히스토리 다시 불러오기
        await loadFromSupabase();
      } catch (error) {
        console.error('❌ Supabase 저장 실패, localStorage 사용:', error);
        // Supabase 실패 시 localStorage에 저장
        const updatedHistory = [article, ...history].slice(0, MAX_HISTORY_ITEMS);
        setHistory(updatedHistory);
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
      }
    } else {
      console.log('📦 localStorage에 저장 (비로그인 또는 Supabase 미설정)');
      // 비로그인 상태 또는 Supabase 미설정: localStorage에 저장
      const updatedHistory = [article, ...history].slice(0, MAX_HISTORY_ITEMS);
      setHistory(updatedHistory);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
    }
  };

  const clearHistory = async () => {
    if (session?.user?.id && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      // 로그인 상태: API로 Supabase에서 삭제
      try {
        // 모든 글 ID 가져오기
        const articleIds = history.map(a => a.id);
        
        // 각 글 삭제
        for (const id of articleIds) {
          await fetch(`/api/articles?id=${id}`, {
            method: 'DELETE',
          });
        }
        
        setHistory([]);
        console.log('✅ 모든 글 삭제 완료');
      } catch (error) {
        console.error('❌ Supabase 삭제 실패:', error);
      }
    } else {
      // 비로그인 상태: localStorage에서 삭제
      setHistory([]);
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    }
  };

  const deleteArticle = async (articleId: string) => {
    if (session?.user?.id && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      // 로그인 상태: API로 Supabase에서 삭제
      try {
        const response = await fetch(`/api/articles?id=${articleId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('API 삭제 실패');
        }

        console.log('✅ 글 삭제 성공');
        
        // 히스토리 다시 불러오기
        await loadFromSupabase();
      } catch (error) {
        console.error('❌ Supabase 삭제 실패:', error);
      }
    } else {
      // 비로그인 상태: localStorage에서 삭제
      const updatedHistory = history.filter(article => article.id !== articleId);
      setHistory(updatedHistory);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
    }
    
    // 현재 보고 있는 글이 삭제된 경우 초기화
    if (currentArticle?.id === articleId) {
      setCurrentArticle(null);
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          keywords,
          tone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '글 생성에 실패했습니다.');
      }

      // Article 객체 생성
      const wordCount = data.content.length;
      const readingTime = calculateReadingTime(data.content);

      const article: Article = {
        id: crypto.randomUUID(),  // UUID 생성
        title: data.title,
        content: data.content,
        date: new Date(),
        tone,
        topic,
        keywords,
        author: 'AI Writer',
        readingTime,
        wordCount,
        metaDescription: data.metaDescription,
        hashtags: data.hashtags,
      };

      setCurrentArticle(article);
      saveToHistory(article); // Save to history
    } catch (err) {
      console.error('Generation error:', err);
      setError(err instanceof Error ? err.message : '글 생성에 실패했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNewTopic = () => {
    setCurrentArticle(null);
    setTopic('');
    setKeywords([]);
    setError(null);
  };

  const handleRegenerate = () => {
    if (topic.trim()) {
      handleGenerate();
    }
  };

  const handleUpdateArticle = async (newContent: string, newTitle: string) => {
    if (currentArticle) {
      const updatedArticle: Article = {
        ...currentArticle,
        title: newTitle,
        content: newContent,
        wordCount: newContent.length,
        readingTime: calculateReadingTime(newContent),
      };
      setCurrentArticle(updatedArticle);
      
      if (session?.user?.id && process.env.NEXT_PUBLIC_SUPABASE_URL) {
        // 로그인 상태: API로 Supabase 업데이트
        try {
          const response = await fetch('/api/articles', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: updatedArticle.id,
              title: newTitle,
              content: newContent,
              word_count: newContent.length,
              reading_time: calculateReadingTime(newContent),
            }),
          });

          if (!response.ok) {
            throw new Error('API 업데이트 실패');
          }

          console.log('✅ 글 수정 성공');
          
          // 히스토리 다시 불러오기
          await loadFromSupabase();
        } catch (error) {
          console.error('❌ Supabase 업데이트 실패:', error);
        }
      } else {
        // 비로그인 상태: localStorage 업데이트
        const updatedHistory = history.map(article => 
          article.id === updatedArticle.id ? updatedArticle : article
        );
        setHistory(updatedHistory);
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
      }
    }
  };

  const handleSelectArticle = (article: Article) => {
    setCurrentArticle(article);
    setTopic(article.topic);
    setKeywords(article.keywords || []);
    setTone(article.tone);
  };

  return (
    <div className="min-h-screen bg-dark-bg font-sans">
      {/* Floating New Topic Button */}
      {currentArticle && (
        <motion.button
          onClick={handleNewTopic}
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.2 }}
          className="fixed top-6 left-6 z-30 w-10 h-10 flex items-center justify-center bg-dark-surface border border-dark-border rounded-lg text-dark-muted hover:text-dark-text hover:border-accent/50 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.15)]"
          title="새 글 작성"
        >
          <PlusIcon className="w-5 h-5" />
        </motion.button>
      )}

      {/* History Button */}
      <motion.button
        onClick={() => setIsHistoryOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-6 right-6 z-30 w-10 h-10 flex items-center justify-center bg-dark-surface border border-dark-border rounded-lg text-dark-muted hover:text-dark-text hover:border-accent/50 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.15)]"
        title="히스토리"
      >
        <HistoryIcon className="w-5 h-5" />
        {history.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs flex items-center justify-center rounded-full">
            {history.length > 9 ? '9+' : history.length}
          </span>
        )}
      </motion.button>

      {/* User Menu - 히스토리 왼쪽에 배치 */}
      <div className="fixed top-6 right-20 z-30">
        <UserMenu />
      </div>

      {/* History Sidebar */}
      <HistorySidebar
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectArticle={handleSelectArticle}
        onClearHistory={clearHistory}
        onDeleteArticle={deleteArticle}
      />

      {/* Generator Section */}
      <motion.section
        layout
        className={`bg-dark-bg ${
          currentArticle ? 'py-12' : 'min-h-screen flex items-center'
        } transition-all duration-500`}
      >
        <div className="w-full max-w-2xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-center mb-10 ${
              currentArticle ? 'scale-90 origin-top' : ''
            } transition-transform duration-500`}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-text mb-4 leading-tight">
              무엇에 대해 작성하시겠습니까?
            </h1>
            <p className="text-dark-muted text-lg">
              구조화되고 매력적인 기술 블로그 글을 몇 초 만에 생성하세요.
            </p>
          </motion.div>

          {/* Input Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-dark-surface border border-dark-border rounded-xl p-4 md:p-6 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
          >
            {/* Topic Input */}
            <div className="mb-4">
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="예: React useEffect 완벽 가이드, WebSocket 실전 활용법..."
                variant="dark"
                className="text-base md:text-lg font-mono placeholder:font-mono"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
            </div>

            {/* Keywords Input */}
            <div className="mb-4">
              <KeywordInput keywords={keywords} onChange={setKeywords} />
            </div>

            {/* Controls Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <ToneSelector value={tone} onChange={setTone} />
              <Button
                onClick={handleGenerate}
                isLoading={isGenerating}
                disabled={!topic.trim() || keywords.length === 0}
                variant="primary"
                size="md"
              >
                생성하기
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}
          </motion.div>

          {/* Loading State */}
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16"
              >
                <div className="flex space-x-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2.5 h-2.5 bg-accent rounded-full"
                      animate={{
                        y: [-6, 6, -6],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
                <p className="mt-4 text-dark-muted text-sm font-medium">
                  AI가 글을 작성하고 있습니다...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Article Output */}
      <AnimatePresence>
        {!isGenerating && currentArticle && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <ArticleView
              key={currentArticle.id}
              article={currentArticle}
              onRegenerate={handleRegenerate}
              onUpdate={handleUpdateArticle}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
