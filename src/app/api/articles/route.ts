import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { supabaseAdmin } from '@/lib/supabase';

// GET - 사용자의 모든 글 가져오기
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    console.error('GET /api/articles error:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

// POST - 새 글 저장
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  console.log('📝 POST /api/articles 호출됨');
  console.log('Session:', session?.user);
  
  if (!session?.user?.id) {
    console.error('❌ session.user.id 없음:', session);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const article = await request.json();
    
    console.log('📄 저장할 글:', {
      id: article.id,
      title: article.title,
      user_id: session.user.id,
    });
    
    const { data, error } = await supabaseAdmin
      .from('articles')
      .insert({
        ...article,
        user_id: session.user.id,
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase insert 에러:', error);
      throw error;
    }

    console.log('✅ 글 저장 성공:', data.id);

    // 분석 이벤트 기록
    const analyticsResult = await supabaseAdmin.from('analytics').insert({
      id: crypto.randomUUID(),
      user_id: session.user.id,
      event_type: 'article_generated',
      metadata: {
        topic: article.topic,
        tone: article.tone,
        word_count: article.word_count,
      },
      created_at: new Date().toISOString(),
    });

    if (analyticsResult.error) {
      console.error('❌ Analytics 기록 에러:', analyticsResult.error);
    } else {
      console.log('✅ Analytics 기록 성공');
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('❌ POST /api/articles 전체 에러:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}

// PUT - 글 수정
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, title, content, word_count, reading_time } = await request.json();
    
    const { data, error } = await supabaseAdmin
      .from('articles')
      .update({
        title,
        content,
        word_count,
        reading_time,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', session.user.id)
      .select()
      .single();

    if (error) throw error;

    // 분석 이벤트 기록
    await supabaseAdmin.from('analytics').insert({
      id: crypto.randomUUID(),
      user_id: session.user.id,
      event_type: 'article_edited',
      metadata: { article_id: id, word_count },
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error('PUT /api/articles error:', error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

// DELETE - 글 삭제
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Article ID required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('articles')
      .delete()
      .eq('id', id)
      .eq('user_id', session.user.id);

    if (error) throw error;

    // 분석 이벤트 기록
    await supabaseAdmin.from('analytics').insert({
      id: crypto.randomUUID(),
      user_id: session.user.id,
      event_type: 'article_deleted',
      metadata: { article_id: id },
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/articles error:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
