// Article 타입 정의
export interface Article {
  id: string;
  title: string;
  content: string;
  date: Date;
  tone: string;
  topic: string;
  keywords: string[];        // required - 기본값 [] 보장
  author: string;
  readingTime: number;
  wordCount: number;
  metaDescription: string;   // required - 기본값 '' 보장
  hashtags: string[];        // required - 기본값 [] 보장
}

// API 요청 타입
export interface GenerateArticleRequest {
  topic: string;
  keywords: string[];
  tone: string;
  style?: 'tutorial' | 'til' | 'troubleshooting';
}

// API 응답 타입
export interface GenerateArticleResponse {
  title: string;
  content: string;
  hashtags: string[];
  metaDescription: string;
}

// Tone 옵션
export const TONE_OPTIONS = [
  'Professional',
  'Casual',
  'Technical',
  'Beginner-Friendly'
] as const;

export type ToneType = typeof TONE_OPTIONS[number];

// Style 옵션
export const STYLE_OPTIONS = [
  'tutorial',
  'til',
  'troubleshooting'
] as const;

export type StyleType = typeof STYLE_OPTIONS[number];
