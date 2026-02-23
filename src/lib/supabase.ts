import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
