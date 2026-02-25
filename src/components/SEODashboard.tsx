'use client';

import { motion } from 'framer-motion';
import { 
  CheckCircle2Icon, 
  AlertCircleIcon, 
  InfoIcon,
  TrendingUpIcon,
  FileTextIcon,
  TypeIcon,
  LayoutIcon,
  KeyIcon
} from 'lucide-react';
import { SEOAnalysis, getSEOGrade } from '@/lib/seo';

interface SEODashboardProps {
  analysis: SEOAnalysis;
}

export function SEODashboard({ analysis }: SEODashboardProps) {
  const { grade, color, label } = getSEOGrade(analysis.score);

  return (
    <div className="space-y-6">
      {/* 종합 점수 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-surface border border-dark-border rounded-xl p-6 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-dark-text flex items-center gap-2">
            <TrendingUpIcon className="w-5 h-5 text-accent" />
            SEO 종합 점수
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className={`text-4xl font-bold ${color}`}>{grade}</span>
              <span className="text-dark-muted text-xs mt-0.5">{label}</span>
            </div>
          </div>
        </div>

        {/* 점수 바 */}
        <div className="relative w-full h-3 bg-dark-bg rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${analysis.score}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full rounded-full ${
              analysis.score >= 80
                ? 'bg-green-500'
                : analysis.score >= 60
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-dark-muted">0</span>
          <span className="text-sm font-medium text-dark-text">{analysis.score}/100</span>
          <span className="text-xs text-dark-muted">100</span>
        </div>
      </motion.div>

      {/* 상세 분석 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 제목 */}
        <SEOCard
          icon={<TypeIcon className="w-5 h-5" />}
          title="제목"
          score={analysis.title.score}
          details={[
            { label: '길이', value: `${analysis.title.length}자`, optimal: analysis.title.optimal },
            { label: '키워드 포함', value: analysis.title.hasKeyword ? '예' : '아니오', optimal: analysis.title.hasKeyword },
          ]}
          suggestions={analysis.title.suggestions}
        />

        {/* 키워드 */}
        <SEOCard
          icon={<KeyIcon className="w-5 h-5" />}
          title="키워드 밀도"
          score={analysis.keywords.score}
          details={Object.entries(analysis.keywords.density).map(([kw, density]) => ({
            label: kw,
            value: `${density.toFixed(1)}%`,
            optimal: density >= 1.5 && density <= 3.0,
          }))}
          suggestions={analysis.keywords.suggestions}
        />

        {/* 메타 디스크립션 */}
        <SEOCard
          icon={<FileTextIcon className="w-5 h-5" />}
          title="메타 디스크립션"
          score={analysis.metaDescription.score}
          details={[
            { label: '길이', value: `${analysis.metaDescription.length}자`, optimal: analysis.metaDescription.optimal },
            { label: '키워드 포함', value: analysis.metaDescription.hasKeyword ? '예' : '아니오', optimal: analysis.metaDescription.hasKeyword },
          ]}
          suggestions={analysis.metaDescription.suggestions}
        />

        {/* 가독성 */}
        <SEOCard
          icon={<LayoutIcon className="w-5 h-5" />}
          title="가독성"
          score={analysis.readability.score}
          details={[
            { label: '평균 문장 길이', value: `${analysis.readability.avgSentenceLength}단어`, optimal: analysis.readability.avgSentenceLength < 25 },
            { label: '난이도', value: getLevelLabel(analysis.readability.level), optimal: analysis.readability.level !== 'hard' },
          ]}
          suggestions={analysis.readability.suggestions}
        />
      </div>

      {/* 구조 */}
      <SEOCard
        icon={<LayoutIcon className="w-5 h-5" />}
        title="문서 구조"
        score={analysis.structure.score}
        details={[
          { label: 'H1 헤더', value: `${analysis.structure.h1Count}개`, optimal: analysis.structure.h1Count === 1 },
          { label: 'H2 헤더', value: `${analysis.structure.h2Count}개`, optimal: analysis.structure.h2Count >= 2 },
          { label: 'H3 헤더', value: `${analysis.structure.h3Count}개`, optimal: true },
        ]}
        suggestions={analysis.structure.suggestions}
      />
    </div>
  );
}

interface SEOCardProps {
  icon: React.ReactNode;
  title: string;
  score: number;
  details: Array<{ label: string; value: string; optimal: boolean }>;
  suggestions: string[];
}

function SEOCard({ icon, title, score, details, suggestions }: SEOCardProps) {
  const scoreColor = score >= 80 ? 'text-green-500' : score >= 60 ? 'text-yellow-500' : 'text-red-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-surface border border-dark-border rounded-lg p-4 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-dark-text">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        <span className={`text-lg font-bold ${scoreColor}`}>{score}</span>
      </div>

      {/* 상세 정보 */}
      <div className="space-y-2 mb-3">
        {details.map((detail, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="text-dark-muted">{detail.label}</span>
            <div className="flex items-center gap-1">
              <span className="text-dark-text">{detail.value}</span>
              {detail.optimal ? (
                <CheckCircle2Icon className="w-4 h-4 text-green-500" />
              ) : (
                <AlertCircleIcon className="w-4 h-4 text-yellow-500" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 개선 제안 */}
      {suggestions.length > 0 && (
        <div className="pt-3 border-t border-dark-border">
          <div className="flex items-start gap-2">
            <InfoIcon className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <p key={index} className="text-xs text-dark-muted">{suggestion}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function getLevelLabel(level: 'easy' | 'medium' | 'hard'): string {
  switch (level) {
    case 'easy': return '쉬움';
    case 'medium': return '보통';
    case 'hard': return '어려움';
  }
}
