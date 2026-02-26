import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { supabaseAdmin } from '@/lib/supabase';

// GET - 사용자의 통계 데이터 가져오기
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // articles 가져오기
    const { data: articles, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .eq('user_id', session.user.id);

    if (error) throw error;

    return NextResponse.json({ data: articles || [] });
  } catch (error) {
    console.error('GET /api/analytics error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
