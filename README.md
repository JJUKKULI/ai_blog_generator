# 🤖 AI 기술 블로그 생성기

GPT를 활용한 기술 블로그 자동 생성 서비스입니다.

## ✨ 주요 기능

### 🎯 핵심 기능
- 📝 **AI 기반 기술 블로그 자동 생성** (GPT-4o)
- 🎨 **고급 설정** (대상 독자, 글 길이, 구조, SEO 레벨)
- 📊 **실시간 SEO 분석** (점수, 개선 제안)
- 🔐 **OAuth 로그인** (Google, GitHub)
- ☁️ **클라우드 동기화** (Supabase)

### 📈 SEO 기능
- 실시간 SEO 점수 분석 (A-F 등급)
- 제목, 키워드 밀도, 메타 디스크립션 최적화
- 가독성 및 문서 구조 분석
- 맞춤형 개선 제안

### ⚙️ 고급 설정
- **대상 독자**: 초보자 / 중급자 / 전문가
- **글 길이**: 짧음(400-600자) / 보통(800-1200자) / 김(1500-2000자)
- **구조**: 리스트형 / 스토리형 / 기술문서형 / 균형형
- **SEO**: 기본 / 고급 최적화

### 🎨 UI/UX
- 세련된 다크 테마
- Framer Motion 애니메이션
- 반응형 디자인
- 읽기 진행률 표시

### 💾 데이터 관리
- 히스토리 자동 저장
- 클라우드 동기화 (로그인 시)
- 마크다운 다운로드
- 클립보드 복사

## 🛠️ 기술 스택

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, Pretendard 폰트
- **Animation**: Framer Motion
- **AI**: OpenAI GPT-4o
- **Auth**: NextAuth.js (Google, GitHub OAuth)
- **Database**: Supabase (PostgreSQL)
- **Markdown**: React Markdown
- **Icons**: Lucide React
- **Deploy**: Vercel

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
│   │   ├── analytics/
│   │   │   └── page.tsx          # 통계 페이지
│   │   ├── api/
│   │   │   ├── analytics/
│   │   │   │   └── route.ts      # 통계 API
│   │   │   ├── articles/
│   │   │   │   └── route.ts      # 글 CRUD API
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts  # NextAuth 설정
│   │   │   └── generate/
│   │   │       └── route.ts      # GPT-4o 생성 API
│   │   ├── auth/
│   │   │   └── signin/
│   │   │       └── page.tsx      # 로그인 페이지
│   │   ├── layout.tsx             # 루트 레이아웃
│   │   ├── page.tsx               # 메인 페이지
│   │   └── globals.css            # 전역 스타일
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx         # 재사용 버튼
│   │   │   └── Input.tsx          # 재사용 입력
│   │   ├── AdvancedSettingsPanel.tsx  # 고급 설정 패널
│   │   ├── ArticleView.tsx        # 생성된 글 뷰
│   │   ├── HistorySidebar.tsx     # 히스토리 사이드바
│   │   ├── KeywordInput.tsx       # 키워드 입력
│   │   ├── ScrollToTop.tsx        # 맨 위로 버튼
│   │   ├── SEODashboard.tsx       # SEO 대시보드
│   │   ├── SessionProvider.tsx    # 세션 프로바이더
│   │   ├── ToneSelector.tsx       # 톤 선택기
│   │   └── UserMenu.tsx           # 사용자 메뉴
│   ├── lib/
│   │   ├── seo.ts                 # SEO 분석 로직
│   │   ├── supabase.ts            # Supabase 클라이언트
│   │   └── utils.ts               # 유틸리티 함수
│   └── types/
│       ├── index.ts               # 타입 정의
│       └── next-auth.d.ts         # NextAuth 타입
├── public/
│   ├── favicon.ico                # 파비콘
│   └── logo.png                   # 로고
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

### Vercel 배포 (권장)

**빠른 배포:**
```bash
# 1. GitHub에 푸시
git push origin main

# 2. Vercel에서 Import
# https://vercel.com → New Project → Import

# 3. 환경 변수 설정 후 Deploy
```

**상세 가이드:**
- 📖 [VERCEL_DEPLOY_GUIDE.md](./VERCEL_DEPLOY_GUIDE.md) - 완벽 배포 가이드
- ⚡ [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - 5분 빠른 배포

---

## 🔐 환경 변수

### 필수 환경 변수

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `OPENAI_API_KEY` | OpenAI API 키 | `sk-proj-...` |
| `NEXTAUTH_SECRET` | NextAuth 암호화 키 (32자+) | `random-string-32-chars` |
| `NEXTAUTH_URL` | 배포 URL | `https://your-app.vercel.app` |
| `GOOGLE_CLIENT_ID` | Google OAuth 클라이언트 ID | `xxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth 비밀키 | `GOCSPX-...` |
| `GITHUB_ID` | GitHub OAuth 앱 ID | `Iv1...` |
| `GITHUB_SECRET` | GitHub OAuth 비밀키 | `...` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon 키 | `eyJhbGc...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role 키 | `eyJhbGc...` |

### 로컬 개발 설정

`.env.local` 파일 생성:

```env
# OpenAI
OPENAI_API_KEY=sk-proj-your-key-here

# NextAuth
NEXTAUTH_SECRET=generate-random-32-char-string
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_ID=your-github-app-id
GITHUB_SECRET=your-github-app-secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**NEXTAUTH_SECRET 생성:**
```bash
# 방법 1 (권장)
openssl rand -base64 32

# 방법 2
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# 방법 3 (온라인)
# https://generate-secret.vercel.app/32
```

## 📄 라이선스

MIT License

## 📚 추가 문서

- 📖 [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - 프로젝트 전체 정리 (발표/문서용)
- 📊 [AI_Blog_Generator_Presentation.pptx](./AI_Blog_Generator_Presentation.pptx) - 발표 자료
- ⚡ [VERCEL_DEPLOY_GUIDE.md](./VERCEL_DEPLOY_GUIDE.md) - 완벽 배포 가이드
- 🚀 [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - 5분 빠른 배포

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
