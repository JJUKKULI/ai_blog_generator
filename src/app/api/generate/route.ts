import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { topic, keywords, tone } = await req.json();

    if (!topic || !keywords || keywords.length === 0) {
      return NextResponse.json(
        { error: '주제와 키워드를 입력해주세요.' },
        { status: 400 }
      );
    }

    const prompt = `
당신은 기술 블로그 작성 전문가입니다.
아래 정보를 바탕으로 고품질의 기술 블로그 글을 작성해주세요.

**주제**: ${topic}
**키워드**: ${keywords.join(', ')}
**톤**: ${tone}

# 작성 지침:
1. **구조**: 서론 - 본문 - 결론 형식
2. **마크다운 형식**: 제목(##, ###), 리스트, 코드 블록 사용
3. **코드 예시**: 실제 동작하는 코드 예제 포함 (언어 태그 명시)
4. **길이**: 800-1200자 정도
5. **SEO**: 키워드를 자연스럽게 포함
6. **가독성**: 단락 구분, 리스트 활용

# 응답 형식 (JSON):
{
  "title": "블로그 제목 (40자 이내, SEO 키워드 포함)",
  "content": "마크다운 형식의 본문",
  "hashtags": ["태그1", "태그2", "태그3"],
  "metaDescription": "SEO용 메타 설명 (150자 이내)"
}
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `당신은 기술 블로그 작성을 돕는 전문 AI입니다. 
항상 정확한 JSON 형식으로 응답하며, 마크다운으로 구조화된 콘텐츠를 생성합니다.
톤(${tone})을 고려하여 작성하되, 전문적이고 유익한 내용을 제공합니다.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');

    // 유효성 검증
    if (!result.title || !result.content) {
      throw new Error('Invalid response from OpenAI');
    }

    return NextResponse.json({
      title: result.title,
      content: result.content,
      hashtags: result.hashtags || [],
      metaDescription: result.metaDescription || '',
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: '글 생성에 실패했습니다. 잠시 후 다시 시도해주세요.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
