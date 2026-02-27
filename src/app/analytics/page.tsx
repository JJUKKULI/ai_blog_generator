'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeftIcon, 
  TrendingUpIcon, 
  FileTextIcon, 
  ClockIcon, 
  CalendarIcon, 
  AlertCircleIcon, 
  CloudOffIcon,
  CloudIcon
} from 'lucide-react';

interface Stats {
  totalArticles: number;
  totalWords: number;
  avgReadingTime: number;
  recentActivity: {
    date: string;
    count: number;
  }[];
  toneDistribution: {
    tone: string;
    count: number;
  }[];
}

export default function Analytics() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'supabase' | 'localStorage'>('localStorage');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    loadStats();
  }, [session, status, router]);

  const loadStats = async () => {
    let articles: any[] = [];
    
    // Supabase 시도
    const supabaseConfigured = !!(
      process.env.NEXT_PUBLIC_SUPABASE_URL && 
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    if (supabaseConfigured && session?.user?.id) {
      try {
        
        const response = await fetch('/api/analytics');
        
        if (response.ok) {
          const { data } = await response.json();
          
          if (data && data.length > 0) {
            articles = data;
            setDataSource('supabase');
          } else {
            // Supabase에 데이터 없으면 localStorage 확인
            articles = loadFromLocalStorage();
            setDataSource('localStorage');
          }
        } else {
          // API 실패 시 localStorage 사용
          articles = loadFromLocalStorage();
          setDataSource('localStorage');
        }
      } catch (error) {
        articles = loadFromLocalStorage();
        setDataSource('localStorage');
      }
    } else {
      // Supabase 미설정
      articles = loadFromLocalStorage();
      setDataSource('localStorage');
    }

    // 통계 계산
    if (articles.length > 0) {
      calculateStats(articles);
    } else {
      setStats({
        totalArticles: 0,
        totalWords: 0,
        avgReadingTime: 0,
        recentActivity: [],
        toneDistribution: [],
      });
    }

    setLoading(false);
  };

  const loadFromLocalStorage = () => {
    try {
      const savedHistory = localStorage.getItem('ai-blog-history');
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        return parsed.map((article: any) => ({
          ...article,
          created_at: article.date,
          word_count: article.wordCount,
          reading_time: article.readingTime,
        }));
      }
    } catch (error) {
    }
    return [];
  };

  const calculateStats = (articles: any[]) => {
    const totalArticles = articles.length;
    const totalWords = articles.reduce((sum, a) => sum + (a.word_count || a.wordCount || 0), 0);
    const avgReadingTime = totalArticles > 0
      ? Math.round(articles.reduce((sum, a) => sum + (a.reading_time || a.readingTime || 0), 0) / totalArticles)
      : 0;

    // 최근 7일 활동
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const recentActivity = last7Days.map(date => ({
      date,
      count: articles.filter(a => {
        const articleDate = new Date(a.created_at || a.date);
        return articleDate.toISOString().split('T')[0] === date;
      }).length,
    }));

    // 톤 분포
    const toneCounts: { [key: string]: number } = {};
    articles.forEach(a => {
      toneCounts[a.tone] = (toneCounts[a.tone] || 0) + 1;
    });
    const toneDistribution = Object.entries(toneCounts).map(([tone, count]) => ({
      tone,
      count,
    }));

    setStats({
      totalArticles,
      totalWords,
      avgReadingTime,
      recentActivity,
      toneDistribution,
    });
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  const isSupabaseMode = dataSource === 'supabase';

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <div className="border-b border-dark-border">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="p-2 hover:bg-dark-surface rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5 text-dark-text" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-dark-text">사용 통계</h1>
                <p className="text-dark-muted text-sm">AI 블로그 생성 활동 분석</p>
              </div>
            </div>

            {/* 데이터 소스 표시 */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-surface border border-dark-border rounded-lg">
              {isSupabaseMode ? (
                <>
                  <CloudIcon className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-500">클라우드</span>
                </>
              ) : (
                <>
                  <CloudOffIcon className="w-3 h-3 text-yellow-500" />
                  <span className="text-xs text-yellow-500">로컬</span>
                </>
              )}
            </div>
          </div>

          {/* Supabase 미연결 경고 */}
          {!isSupabaseMode && (
            <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-3">
              <AlertCircleIcon className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-yellow-500 font-medium text-sm mb-1">
                  로컬 데이터만 표시 중
                </p>
                <p className="text-yellow-500/80 text-xs">
                  현재 브라우저 로컬 스토리지의 데이터만 표시됩니다. 
                  클라우드 동기화를 사용하려면 Supabase를 설정하세요.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {!stats || stats.totalArticles === 0 ? (
          <div className="text-center py-12">
            <FileTextIcon className="w-16 h-16 text-dark-muted mx-auto mb-4" />
            <p className="text-dark-text text-lg mb-2">아직 생성된 글이 없습니다</p>
            <p className="text-dark-muted mb-6">첫 번째 글을 작성해보세요!</p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors"
            >
              글 생성하기
            </button>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-dark-surface border border-dark-border rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-accent-subtle rounded-lg">
                    <FileTextIcon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-dark-muted text-sm">총 생성 글</span>
                </div>
                <p className="text-3xl font-bold text-dark-text">{stats.totalArticles}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-dark-surface border border-dark-border rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-accent-subtle rounded-lg">
                    <TrendingUpIcon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-dark-muted text-sm">총 작성 단어</span>
                </div>
                <p className="text-3xl font-bold text-dark-text">{stats.totalWords.toLocaleString()}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-dark-surface border border-dark-border rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-accent-subtle rounded-lg">
                    <ClockIcon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-dark-muted text-sm">평균 읽기 시간</span>
                </div>
                <p className="text-3xl font-bold text-dark-text">{stats.avgReadingTime}분</p>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-dark-surface border border-dark-border rounded-xl p-6 mb-8"
            >
              <h2 className="text-lg font-semibold text-dark-text mb-4 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-accent" />
                최근 7일 활동
              </h2>
              <div className="flex items-end justify-between gap-2 h-48">
                {stats.recentActivity.map((day, index) => {
                  const maxCount = Math.max(...stats.recentActivity.map(d => d.count), 1);
                  const height = (day.count / maxCount) * 100;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex items-end justify-center" style={{ height: '160px' }}>
                        {day.count > 0 && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className="w-full bg-accent rounded-t-lg min-h-[8px]"
                            title={`${day.count}개`}
                          />
                        )}
                      </div>
                      <span className="text-xs text-dark-muted">
                        {new Date(day.date).getDate()}일
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Tone Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-dark-surface border border-dark-border rounded-xl p-6"
            >
              <h2 className="text-lg font-semibold text-dark-text mb-4">톤 분포</h2>
              <div className="space-y-4">
                {stats.toneDistribution.map((item, index) => {
                  const percentage = (item.count / stats.totalArticles) * 100;
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-dark-text font-medium">{item.tone}</span>
                        <span className="text-dark-muted text-sm">{item.count}개 ({percentage.toFixed(0)}%)</span>
                      </div>
                      <div className="w-full h-2 bg-dark-bg rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="h-full bg-accent rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
