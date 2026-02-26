import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// 클라이언트 사이드용 (RLS 적용)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 서버 사이드용 (RLS 우회 - 관리자 권한)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);

// Database types
export interface DbArticle {
  id: string;
  user_id: string;
  title: string;
  content: string;
  topic: string;
  keywords: string[];
  tone: string;
  author: string;
  reading_time: number;
  word_count: number;
  meta_description: string | null;
  hashtags: string[];
  created_at: string;
  updated_at: string;
}

export interface DbUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  created_at: string;
  last_login: string;
}

export interface DbAnalytics {
  id: string;
  user_id: string;
  event_type: 'article_generated' | 'article_edited' | 'article_deleted' | 'login';
  metadata: Record<string, any>;
  created_at: string;
}
