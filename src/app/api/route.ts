import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { topic, stack, tone, length } = await req.json();

    const prompt = `
너는 숙련된 개발자 기술 블로거다.

주제: ${topic}
기술 스택: ${stack}
글 톤: ${tone}
글 길이: ${length}

SEO를 고려한 기술 블로그 글을 마크다운 형식으로 작성해라.
제목, 소제목(h2), 코드 블록이 포함되어야 한다.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return NextResponse.json({
      content: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "GPT 생성 실패" }, { status: 500 });
  }
}
