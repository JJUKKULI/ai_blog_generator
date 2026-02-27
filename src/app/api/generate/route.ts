import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 프롬프트 생성 함수
function buildPrompt(params: {
  topic: string;
  keywords: string[];
  tone: string;
  audience?: string;
  length?: string;
  structure?: string;
  seoLevel?: string;
}) {
  const {
    topic,
    keywords,
    tone,
    audience = 'intermediate',
    length = 'medium',
    structure = 'balanced',
    seoLevel = 'basic'
  } = params;

  // 대상 독자별 가이드
  const audienceGuides = {
    beginner: {
      description: '초보자',
      style: '전문 용어를 최소화하고, 각 개념을 자세히 설명합니다. 예시를 풍부하게 사용하고, 단계별로 천천히 설명합니다.',
      tone: '친근하고 이해하기 쉬운 언어 사용',
    },
    intermediate: {
      description: '중급자',
      style: '적절한 기술 용어를 사용하되, 핵심 개념은 명확히 설명합니다. 실용적인 예제와 Best Practice를 포함합니다.',
      tone: '전문적이면서도 접근하기 쉬운 균형잡힌 톤',
    },
    expert: {
      description: '전문가',
      style: '고급 기술 용어를 자유롭게 사용하고, 깊이 있는 분석과 최적화 기법을 다룹니다. 아키텍처와 성능에 초점을 맞춥니다.',
      tone: '기술적이고 간결한 전문가 톤',
    },
  };

  // 글 길이별 가이드
  const lengthGuides = {
    short: {
      description: '짧음',
      wordCount: '400-600자',
      style: '핵심 내용만 간결하게. 빠른 이해를 위한 요약형 콘텐츠.',
      sections: '서론 - 핵심 내용 - 간단한 결론',
    },
    medium: {
      description: '보통',
      wordCount: '800-1200자',
      style: '적절한 설명과 예제를 포함한 균형잡힌 콘텐츠.',
      sections: '서론 - 본문(2-3개 섹션) - 결론',
    },
    long: {
      description: '김',
      wordCount: '1500-2000자',
      style: '상세한 설명, 다양한 예제, 심화 내용을 포함한 종합적 콘텐츠.',
      sections: '서론 - 본문(4-5개 섹션) - 실전 예제 - 결론',
    },
  };

  // 구조 타입별 가이드
  const structureGuides = {
    list: {
      description: '리스트형',
      format: '번호나 불릿 포인트로 구조화된 목록 중심',
      style: '각 항목을 명확히 구분하고, 단계별로 정리. "5가지 방법", "핵심 포인트" 등의 형식 활용',
      example: '## 주요 기능\n1. 기능 A\n2. 기능 B\n3. 기능 C',
    },
    story: {
      description: '스토리형',
      format: '문제 제시 → 해결 과정 → 결과의 서사 구조',
      style: '독자의 공감을 이끌어내는 스토리텔링. 실제 사례나 시나리오 활용',
      example: '문제 상황 소개 → 여러 시도와 실패 → 최종 해결책 → 교훈',
    },
    technical: {
      description: '기술 문서형',
      format: '체계적인 기술 문서 스타일',
      style: '개요 - 구성요소 - 작동 원리 - 구현 방법 - 참고사항 순서로 구조화',
      example: '## 개요\n## 아키텍처\n## 구현\n## 예제\n## 주의사항',
    },
    balanced: {
      description: '균형형',
      format: '설명과 예제가 조화로운 표준 블로그 형식',
      style: '서론에서 문제 제기, 본문에서 해결책 제시, 코드 예제와 설명 병행',
      example: '## 서론\n## 핵심 개념\n## 실습\n## 결론',
    },
  };

  // SEO 레벨별 가이드
  const seoGuides = {
    basic: {
      description: '기본',
      requirements: [
        '제목에 주요 키워드 1개 포함',
        '본문에 키워드 자연스럽게 2-3회 사용',
        '메타 디스크립션 120-150자',
      ],
    },
    advanced: {
      description: '고급',
      requirements: [
        '제목에 주요 키워드 포함 (40-55자)',
        '키워드 밀도 2-3% 유지',
        '관련 키워드와 동의어 활용',
        '메타 디스크립션 130-155자로 최적화',
        'H2, H3 헤더에 키워드 자연스럽게 배치',
        '첫 문단에 키워드 포함',
      ],
    },
  };

  const audienceGuide = audienceGuides[audience as keyof typeof audienceGuides];
  const lengthGuide = lengthGuides[length as keyof typeof lengthGuides];
  const structureGuide = structureGuides[structure as keyof typeof structureGuides];
  const seoGuide = seoGuides[seoLevel as keyof typeof seoGuides];

  return `
당신은 기술 블로그 작성 전문가입니다.
아래 정보를 바탕으로 고품질의 기술 블로그 글을 작성해주세요.

# 📋 기본 정보
**주제**: ${topic}
**키워드**: ${keywords.join(', ')}
**톤**: ${tone}

# 🎯 고급 설정
**대상 독자**: ${audienceGuide.description}
- ${audienceGuide.style}
- ${audienceGuide.tone}

**글 길이**: ${lengthGuide.description} (${lengthGuide.wordCount})
- ${lengthGuide.style}
- 구성: ${lengthGuide.sections}

**구조 타입**: ${structureGuide.description}
- ${structureGuide.format}
- ${structureGuide.style}
- 예시: ${structureGuide.example}

**SEO 최적화**: ${seoGuide.description}
${seoGuide.requirements.map(req => `- ${req}`).join('\n')}

# 📝 작성 지침

## 1. 콘텐츠 구조
- 마크다운 형식 사용 (##, ###, 리스트, 코드 블록)
- ${structureGuide.description} 스타일로 구성
- ${lengthGuide.sections}

## 2. 대상 독자 고려
- ${audienceGuide.description}를 위한 ${audienceGuide.tone}
- ${audienceGuide.style}

## 3. 코드 예시 (필요시)
- 실제 동작하는 코드 작성
- 언어 태그 명시 (\`\`\`javascript, \`\`\`python 등)
- 주석으로 설명 추가
- ${audience === 'beginner' ? '단계별로 상세히 설명' : audience === 'expert' ? '최적화와 고급 기법 포함' : '실용적인 예제 중심'}

## 4. SEO 최적화
${seoGuide.requirements.map(req => `- ${req}`).join('\n')}

## 5. 가독성
- 적절한 단락 구분
- 리스트와 표 활용
- 중요 내용은 **볼드** 처리
- 필요시 > 인용구 사용

# 🎨 톤 & 스타일
**${tone}** 톤으로 작성하되:
- Professional: 전문적이고 신뢰감 있게
- Casual: 친근하고 대화하듯이
- Technical: 기술적이고 정확하게
- Beginner-Friendly: 이해하기 쉽고 친절하게

# 📤 응답 형식 (JSON)
\`\`\`json
{
  "title": "블로그 제목 (40-55자, SEO 키워드 포함)",
  "content": "마크다운 형식의 본문 (${lengthGuide.wordCount})",
  "hashtags": ["관련태그1", "관련태그2", "관련태그3", "관련태그4", "관련태그5"],
  "metaDescription": "SEO용 메타 설명 (${seoLevel === 'advanced' ? '130-155자' : '120-150자'})"
}
\`\`\`

**중요**: 
- 반드시 위 JSON 형식으로만 응답
- ${lengthGuide.wordCount} 분량 준수
- ${structureGuide.description} 구조 적용
- ${audienceGuide.description} 수준에 맞춤
`;
}

export async function POST(req: NextRequest) {
  try {
    const { 
      topic, 
      keywords, 
      tone,
      audience,
      length,
      structure,
      seoLevel 
    } = await req.json();

    if (!topic || !keywords || keywords.length === 0) {
      return NextResponse.json(
        { error: '주제와 키워드를 입력해주세요.' },
        { status: 400 }
      );
    }

    const prompt = buildPrompt({
      topic,
      keywords,
      tone,
      audience,
      length,
      structure,
      seoLevel,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `당신은 기술 블로그 작성을 돕는 전문 AI입니다. 
항상 정확한 JSON 형식으로 응답하며, 마크다운으로 구조화된 콘텐츠를 생성합니다.
대상 독자의 수준을 고려하여 적절한 깊이와 설명 방식을 선택합니다.
요청된 구조와 길이를 정확히 준수하며, SEO 최적화를 자연스럽게 적용합니다.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 4000, // 긴 글을 위해 증가
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
    return NextResponse.json(
      { 
        error: '글 생성에 실패했습니다. 잠시 후 다시 시도해주세요.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
