// SEO 분석 유틸리티

export interface SEOAnalysis {
  score: number; // 0-100
  title: {
    score: number;
    length: number;
    optimal: boolean;
    hasKeyword: boolean;
    suggestions: string[];
  };
  keywords: {
    score: number;
    density: { [keyword: string]: number };
    optimal: boolean;
    suggestions: string[];
  };
  metaDescription: {
    score: number;
    length: number;
    optimal: boolean;
    hasKeyword: boolean;
    suggestions: string[];
  };
  readability: {
    score: number;
    level: 'easy' | 'medium' | 'hard';
    avgSentenceLength: number;
    suggestions: string[];
  };
  structure: {
    score: number;
    h1Count: number;
    h2Count: number;
    h3Count: number;
    hasProperStructure: boolean;
    suggestions: string[];
  };
}

// 제목 분석
export function analyzeTitleSEO(
  title: string,
  keywords: string[]
): SEOAnalysis['title'] {
  const length = title.length;
  const optimal = length >= 30 && length <= 60;
  const lowerTitle = title.toLowerCase();
  const hasKeyword = keywords.some(kw => lowerTitle.includes(kw.toLowerCase()));
  
  const suggestions: string[] = [];
  let score = 100;

  if (length < 30) {
    suggestions.push('제목이 너무 짧습니다. 30-60자를 권장합니다.');
    score -= 20;
  } else if (length > 60) {
    suggestions.push('제목이 너무 깁니다. 60자 이내로 줄이세요.');
    score -= 20;
  }

  if (!hasKeyword) {
    suggestions.push('제목에 주요 키워드를 포함하세요.');
    score -= 30;
  }

  if (title.startsWith('# ')) {
    score -= 10; // 마크다운 헤더 포함 시 감점
  }

  return {
    score: Math.max(0, score),
    length,
    optimal,
    hasKeyword,
    suggestions,
  };
}

// 키워드 밀도 분석
export function analyzeKeywordDensity(
  content: string,
  keywords: string[]
): SEOAnalysis['keywords'] {
  const text = content.toLowerCase();
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const totalWords = words.length;

  const density: { [keyword: string]: number } = {};
  keywords.forEach(keyword => {
    const kw = keyword.toLowerCase();
    const count = (text.match(new RegExp(kw, 'gi')) || []).length;
    density[keyword] = (count / totalWords) * 100;
  });

  const avgDensity = Object.values(density).reduce((a, b) => a + b, 0) / keywords.length;
  const optimal = avgDensity >= 1.5 && avgDensity <= 3.0;
  
  const suggestions: string[] = [];
  let score = 100;

  Object.entries(density).forEach(([kw, dens]) => {
    if (dens < 1.0) {
      suggestions.push(`키워드 "${kw}"가 부족합니다 (${dens.toFixed(1)}%). 1.5-3% 권장.`);
      score -= 15;
    } else if (dens > 4.0) {
      suggestions.push(`키워드 "${kw}"가 과도합니다 (${dens.toFixed(1)}%). 키워드 스터핑 주의.`);
      score -= 20;
    }
  });

  if (keywords.length === 0) {
    suggestions.push('키워드를 설정하세요.');
    score = 0;
  }

  return {
    score: Math.max(0, score),
    density,
    optimal,
    suggestions,
  };
}

// 메타 디스크립션 분석
export function analyzeMetaDescription(
  metaDescription: string | null,
  keywords: string[]
): SEOAnalysis['metaDescription'] {
  if (!metaDescription) {
    return {
      score: 0,
      length: 0,
      optimal: false,
      hasKeyword: false,
      suggestions: ['메타 디스크립션을 작성하세요. (120-160자 권장)'],
    };
  }

  const length = metaDescription.length;
  const optimal = length >= 120 && length <= 160;
  const lowerMeta = metaDescription.toLowerCase();
  const hasKeyword = keywords.some(kw => lowerMeta.includes(kw.toLowerCase()));
  
  const suggestions: string[] = [];
  let score = 100;

  if (length < 120) {
    suggestions.push(`메타 디스크립션이 너무 짧습니다 (${length}자). 120-160자를 권장합니다.`);
    score -= 25;
  } else if (length > 160) {
    suggestions.push(`메타 디스크립션이 너무 깁니다 (${length}자). 160자 이내로 줄이세요.`);
    score -= 20;
  }

  if (!hasKeyword) {
    suggestions.push('메타 디스크립션에 주요 키워드를 포함하세요.');
    score -= 30;
  }

  return {
    score: Math.max(0, score),
    length,
    optimal,
    hasKeyword,
    suggestions,
  };
}

// 가독성 분석 (간단한 버전)
export function analyzeReadability(content: string): SEOAnalysis['readability'] {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = content.split(/\s+/).filter(w => w.length > 0);
  
  const avgSentenceLength = words.length / sentences.length;
  
  let level: 'easy' | 'medium' | 'hard';
  let score = 100;
  const suggestions: string[] = [];

  if (avgSentenceLength < 15) {
    level = 'easy';
  } else if (avgSentenceLength < 25) {
    level = 'medium';
  } else {
    level = 'hard';
    suggestions.push('문장이 너무 깁니다. 짧고 명확한 문장을 사용하세요.');
    score -= 20;
  }

  // 단락 수 체크
  const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
  if (paragraphs.length < 3) {
    suggestions.push('단락을 더 나누어 가독성을 높이세요.');
    score -= 15;
  }

  return {
    score: Math.max(0, score),
    level,
    avgSentenceLength: Math.round(avgSentenceLength),
    suggestions,
  };
}

// 구조 분석 (마크다운 헤더)
export function analyzeStructure(content: string): SEOAnalysis['structure'] {
  const h1Count = (content.match(/^# /gm) || []).length;
  const h2Count = (content.match(/^## /gm) || []).length;
  const h3Count = (content.match(/^### /gm) || []).length;
  
  const hasProperStructure = h1Count === 1 && h2Count >= 2;
  
  const suggestions: string[] = [];
  let score = 100;

  if (h1Count === 0) {
    suggestions.push('H1 헤더(# 제목)를 추가하세요.');
    score -= 30;
  } else if (h1Count > 1) {
    suggestions.push('H1 헤더는 1개만 사용해야 합니다.');
    score -= 20;
  }

  if (h2Count < 2) {
    suggestions.push('H2 헤더(## 소제목)를 2개 이상 사용하세요.');
    score -= 25;
  }

  if (h2Count === 0 && h3Count > 0) {
    suggestions.push('H3를 사용하기 전에 H2 헤더를 먼저 사용하세요.');
    score -= 15;
  }

  return {
    score: Math.max(0, score),
    h1Count,
    h2Count,
    h3Count,
    hasProperStructure,
    suggestions,
  };
}

// 종합 SEO 분석
export function analyzeSEO(
  title: string,
  content: string,
  keywords: string[],
  metaDescription: string | null
): SEOAnalysis {
  const titleAnalysis = analyzeTitleSEO(title, keywords);
  const keywordAnalysis = analyzeKeywordDensity(content, keywords);
  const metaAnalysis = analyzeMetaDescription(metaDescription, keywords);
  const readabilityAnalysis = analyzeReadability(content);
  const structureAnalysis = analyzeStructure(content);

  // 가중치 적용 종합 점수
  const score = Math.round(
    titleAnalysis.score * 0.25 +      // 25%
    keywordAnalysis.score * 0.20 +    // 20%
    metaAnalysis.score * 0.15 +       // 15%
    readabilityAnalysis.score * 0.25 + // 25%
    structureAnalysis.score * 0.15     // 15%
  );

  return {
    score,
    title: titleAnalysis,
    keywords: keywordAnalysis,
    metaDescription: metaAnalysis,
    readability: readabilityAnalysis,
    structure: structureAnalysis,
  };
}

// 점수에 따른 등급
export function getSEOGrade(score: number): {
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  color: string;
  label: string;
} {
  if (score >= 90) return { grade: 'A', color: 'text-green-500', label: '매우 우수' };
  if (score >= 80) return { grade: 'B', color: 'text-blue-500', label: '우수' };
  if (score >= 70) return { grade: 'C', color: 'text-yellow-500', label: '보통' };
  if (score >= 60) return { grade: 'D', color: 'text-orange-500', label: '미흡' };
  return { grade: 'F', color: 'text-red-500', label: '개선 필요' };
}
