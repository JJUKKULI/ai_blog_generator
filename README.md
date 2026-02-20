# 🤖 AI 기술 블로그 생성기

GPT를 활용한 기술 블로그 자동 생성 서비스입니다.

## ✨ 주요 기능

- 📝 AI 기반 기술 블로그 자동 생성
- 🎨 세련된 UI/UX (framer-motion 애니메이션)
- 📊 마크다운 형식의 구조화된 콘텐츠
- 💻 코드 예시 자동 포함
- 🏷️ 해시태그 및 SEO 메타 설명 생성
- 📥 마크다운 파일 다운로드
- 📋 클립보드 복사

## 🛠️ 기술 스택

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **AI**: OpenAI GPT-4o
- **Markdown**: React Markdown

## 📦 설치 및 실행

### 1. 저장소 클론

```bash
git clone https://github.com/JJUKKULI/ai_blog_generator.git
cd ai-blog-generator
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.local` 파일을 생성하고 OpenAI API 키를 설정하세요:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 5. 프로덕션 빌드

```bash
npm run build
npm start
```

## 📂 프로젝트 구조

```
ai-blog-generator/
├── src/
│   ├── app/
│   │   ├── api/generate/
│   │   │   └── route.ts          # OpenAI API 엔드포인트
│   │   ├── layout.tsx
│   │   ├── page.tsx               # 메인 페이지
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx         # 버튼 컴포넌트
│   │   │   └── Input.tsx          # 입력 컴포넌트
│   │   ├── ArticleView.tsx        # 생성된 글 뷰
│   │   ├── KeywordInput.tsx       # 키워드 입력
│   │   └── ToneSelector.tsx       # 톤 선택기
│   ├── lib/
│   │   └── utils.ts               # 유틸리티 함수
│   └── types/
│       └── index.ts               # 타입 정의
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## 🎯 사용 방법

1. **주제 입력**: 작성하고 싶은 기술 주제를 입력하세요
2. **키워드 추가**: 관련 키워드를 입력하고 Enter를 누르세요
3. **톤 선택**: Professional, Technical, Casual, Beginner-Friendly 중 선택
4. **생성**: "생성하기" 버튼을 클릭하세요
5. **결과 확인**: 생성된 블로그 글을 확인하고 다운로드하세요

## 🎨 주요 컴포넌트

### ArticleView
생성된 블로그 글을 표시하는 컴포넌트입니다.
- 마크다운 렌더링
- 읽기 진행률 표시
- 복사, 다운로드, 재생성 기능

### KeywordInput
키워드를 입력하고 관리하는 컴포넌트입니다.
- 동적 키워드 추가/제거
- 애니메이션 효과

### ToneSelector
글의 톤을 선택하는 컴포넌트입니다.
- 탭 스타일 UI
- 애니메이션 전환

## 📝 API 엔드포인트

### POST `/api/generate`

블로그 글을 생성합니다.

**요청 본문:**
```json
{
  "topic": "React useState 훅 사용법",
  "keywords": ["React", "Hooks", "상태관리"],
  "tone": "Professional"
}
```

**응답:**
```json
{
  "title": "React useState 훅 완벽 가이드",
  "content": "마크다운 형식의 본문...",
  "hashtags": ["React", "Hooks", "useState"],
  "metaDescription": "React useState 훅의 사용법과 예제..."
}
```

## 🚀 배포

### Vercel 배포

1. [Vercel](https://vercel.com)에 로그인
2. 프로젝트 Import
3. 환경 변수 설정 (`OPENAI_API_KEY`)
4. Deploy

## 🔐 환경 변수

| 변수명 | 설명 | 필수 여부 |
|--------|------|----------|
| `OPENAI_API_KEY` | OpenAI API 키 | 필수 |

## 📄 라이선스

MIT License

## 🤝 기여

Pull Request를 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 문의

프로젝트에 대한 문의사항이 있으시면 Issue를 등록해주세요.

---

Made with ❤️ by JJUKKULI
