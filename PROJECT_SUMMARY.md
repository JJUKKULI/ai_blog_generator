# AI 기술 블로그 생성기

---

## 💡 서비스 소개

**AI Blog Generator**

GPT-4o 기반 기술 블로그 자동 생성 플랫폼

> 키워드와 주제만 입력하면 GPT-4o가 SEO 최적화된 전문적인 기술 블로그 글을 자동으로 생성해주는 서비스입니다.
> 다양한 톤과 스타일, 고급 설정을 통해 원하는 형식의 글을 빠르게 작성할 수 있습니다.

---

## 📌 문제 정의

*"기술 블로그 글을 쓰고 싶은데 시간이 너무 오래 걸려요..."*
*"SEO 최적화는 어떻게 하는 거죠? 너무 어려워요..."*  
*"매번 비슷한 구조로 글을 쓰게 되는데 다양하게 쓰고 싶어요..."*

기술 블로그를 작성하는 것은 많은 시간과 노력이 필요합니다.
- 주제 정하기
- 구조 짜기
- 내용 작성
- SEO 최적화
- 해시태그 선정
- 메타 디스크립션 작성

이 모든 과정을 **AI가 자동으로** 처리해드립니다!

---

## 💬 서비스 주요 기능

### 🎯 핵심 기능

#### 1. AI 기반 블로그 자동 생성
- **GPT-4o** 엔진 사용
- 키워드 기반 맞춤형 콘텐츠 생성
- 4가지 톤 선택 (Professional, Technical, Casual, Beginner-Friendly)

#### 2. 고급 설정
- **대상 독자**: 초보자 / 중급자 / 전문가
- **글 길이**: 짧음(400-600자) / 보통(800-1200자) / 김(1500-2000자)
- **구조**: 리스트형 / 스토리형 / 기술문서형 / 균형형
- **SEO 레벨**: 기본 / 고급 최적화

#### 3. 실시간 SEO 분석
- **SEO 점수** 자동 계산 (A-F 등급)
- 제목, 키워드 밀도 분석
- 메타 디스크립션 최적화
- 가독성 및 문서 구조 분석
- 맞춤형 개선 제안

#### 4. 클라우드 동기화
- **OAuth 로그인** (Google, GitHub)
- **Supabase** 클라우드 저장
- 여러 기기에서 접근 가능
- 자동 동기화

#### 5. 편리한 관리 기능
- 히스토리 자동 저장 (최대 20개)
- 실시간 글 수정
- 마크다운 다운로드
- 클립보드 복사
- 재생성 기능

#### 6. 통계 및 분석
- 작성한 글 개수
- 총 단어 수
- 평균 SEO 점수
- 가장 많이 사용한 키워드 TOP 10

---

## 📂 프로젝트 구조

```
ai-blog-generator/
├── src/
│   ├── app/
│   │   ├── analytics/
│   │   │   └── page.tsx              # 통계 페이지
│   │   ├── api/
│   │   │   ├── analytics/
│   │   │   │   └── route.ts          # 통계 API
│   │   │   ├── articles/
│   │   │   │   └── route.ts          # 글 CRUD API
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts      # NextAuth 설정
│   │   │   └── generate/
│   │   │       └── route.ts          # GPT-4o 생성 API
│   │   ├── auth/
│   │   │   └── signin/
│   │   │       └── page.tsx          # 로그인 페이지
│   │   ├── layout.tsx                # 루트 레이아웃
│   │   ├── page.tsx                  # 메인 페이지
│   │   └── globals.css               # 전역 스타일
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx            # 재사용 버튼
│   │   │   └── Input.tsx             # 재사용 입력
│   │   ├── AdvancedSettingsPanel.tsx # 고급 설정 패널
│   │   ├── ArticleView.tsx           # 글 뷰어
│   │   ├── HistorySidebar.tsx        # 히스토리 사이드바
│   │   ├── KeywordInput.tsx          # 키워드 입력
│   │   ├── ScrollToTop.tsx           # 맨 위로 버튼
│   │   ├── SEODashboard.tsx          # SEO 대시보드
│   │   ├── SessionProvider.tsx       # 세션 프로바이더
│   │   ├── ToneSelector.tsx          # 톤 선택기
│   │   └── UserMenu.tsx              # 사용자 메뉴
│   ├── lib/
│   │   ├── seo.ts                    # SEO 분석 로직
│   │   ├── supabase.ts               # Supabase 클라이언트
│   │   └── utils.ts                  # 유틸리티 함수
│   └── types/
│       ├── index.ts                  # 타입 정의
│       └── next-auth.d.ts            # NextAuth 타입
├── public/
│   ├── favicon.ico                   # 파비콘 (ICO)
│   └── logo.png                      # 로고 (PNG)
├── .env.local                        # 환경 변수
├── package.json                      # 의존성 관리
├── tailwind.config.ts                # Tailwind 설정
├── tsconfig.json                     # TypeScript 설정
└── next.config.ts                    # Next.js 설정
```

---

## 💻 기술 스택

### Frontend
- **Next.js 16** - React 프레임워크 (App Router)
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 유틸리티 CSS
- **Framer Motion** - 애니메이션

### Backend & API
- **Next.js API Routes** - 서버리스 API
- **OpenAI GPT-4o** - AI 블로그 생성
- **NextAuth.js** - OAuth 인증
- **Supabase** - PostgreSQL 데이터베이스

### Libraries
- **React Markdown** - 마크다운 렌더링
- **Lucide React** - 아이콘
- **Pretendard** - 한글 폰트

### DevOps
- **Vercel** - 배포 플랫폼
- **GitHub** - 버전 관리
- **Git** - 소스 코드 관리

---

## 💻 Tools

### Development
- **Visual Studio Code** - 코드 에디터
- **Git** - 버전 관리
- **GitHub** - 코드 호스팅
- **Postman** - API 테스트

### Design
- **Figma** - UI/UX 디자인
- **Tailwind CSS** - 스타일링

### Communication
- **Discord** - 팀 커뮤니케이션
- **Notion** - 문서 관리

---

## ⚙️ Track

### Frontend
- **React** - 컴포넌트 기반 UI
- **Next.js** - SSR, API Routes
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 반응형 디자인
- **Framer Motion** - 인터랙티브 애니메이션

### State Management
- **React Hooks** - useState, useEffect
- **Local Storage** - 로컬 데이터 저장
- **Supabase** - 클라우드 동기화

---

## 🔌 API 활용

### OpenAI API
- **GPT-4o 모델** 사용
- 프롬프트 엔지니어링으로 맞춤형 콘텐츠 생성
- JSON 응답 형식 지정
- 토큰 최적화 (max_tokens: 4000)

### NextAuth API
- OAuth 2.0 인증 (Google, GitHub)
- 세션 관리
- JWT 토큰 사용

### Supabase API
- PostgreSQL 데이터베이스
- RESTful API
- 실시간 구독 (Real-time)
- Row Level Security (RLS)

---

## 🎨 주요 기능 상세

### 1. 블로그 생성 프로세스

```
사용자 입력
    ↓
주제 + 키워드 + 톤 + 고급 설정
    ↓
GPT-4o API 호출
    ↓
프롬프트 엔지니어링
    ↓
JSON 응답 (제목, 본문, 해시태그, 메타설명)
    ↓
SEO 분석 (실시간)
    ↓
마크다운 렌더링
    ↓
화면 표시 + 저장
```

### 2. SEO 분석 알고리즘

**점수 계산 (100점 만점):**
- 제목 최적화 (20점)
  - 길이 (30-60자)
  - 키워드 포함 여부
- 키워드 밀도 (25점)
  - 본문 내 키워드 비율
  - 적정 밀도 (1-3%)
- 메타 디스크립션 (15점)
  - 길이 (120-160자)
  - 키워드 포함
- 가독성 (20점)
  - 문단 수
  - 평균 문단 길이
- 구조 (20점)
  - 제목 태그 사용 (h2, h3)
  - 리스트 사용
  - 코드 블록 사용

**등급 분류:**
- A (90-100): 매우 우수
- B (80-89): 우수
- C (70-79): 양호
- D (60-69): 보통
- F (0-59): 개선 필요

### 3. 프롬프트 엔지니어링

**구조화된 프롬프트:**
1. 시스템 역할 정의
2. 대상 독자 설정
3. 글 길이 및 구조 지정
4. SEO 최적화 수준 설정
5. JSON 응답 형식 명시

**톤별 프롬프트:**
- Professional: 전문적이고 격식 있는 표현
- Technical: 기술적 세부사항 강조
- Casual: 친근하고 편안한 어투
- Beginner-Friendly: 초보자 눈높이에 맞춘 쉬운 설명

---

## 📊 데이터베이스 스키마

### articles 테이블

```sql
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  topic TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tone TEXT NOT NULL,
  keywords TEXT[] NOT NULL,
  hashtags TEXT[] NOT NULL,
  metaDescription TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_articles_user_id ON articles(user_id);
CREATE INDEX idx_articles_created_at ON articles(created_at DESC);
```

### Row Level Security (RLS)

```sql
-- 사용자는 자신의 글만 조회 가능
CREATE POLICY "Users can view own articles"
  ON articles FOR SELECT
  USING (auth.uid()::text = user_id);

-- 사용자는 자신의 글만 삽입 가능
CREATE POLICY "Users can insert own articles"
  ON articles FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- 사용자는 자신의 글만 수정 가능
CREATE POLICY "Users can update own articles"
  ON articles FOR UPDATE
  USING (auth.uid()::text = user_id);

-- 사용자는 자신의 글만 삭제 가능
CREATE POLICY "Users can delete own articles"
  ON articles FOR DELETE
  USING (auth.uid()::text = user_id);
```

---

## 🎯 핵심 알고리즘

### 1. 읽기 시간 계산

```typescript
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200; // 한국어 기준
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
```

### 2. 키워드 밀도 계산

```typescript
function calculateKeywordDensity(content: string, keywords: string[]): number {
  const words = content.toLowerCase().split(/\s+/);
  const totalWords = words.length;
  
  let keywordCount = 0;
  keywords.forEach(keyword => {
    const regex = new RegExp(keyword.toLowerCase(), 'gi');
    const matches = content.match(regex);
    keywordCount += matches ? matches.length : 0;
  });
  
  return (keywordCount / totalWords) * 100;
}
```

### 3. 해시태그 추출

```typescript
// GPT-4o가 자동으로 3-5개 생성
// 키워드 + 주제 기반
// 트렌딩 해시태그 고려
```

---

## 🚀 배포 가이드

### 1. 환경 변수 설정

```env
# OpenAI
OPENAI_API_KEY=sk-proj-...

# NextAuth
NEXTAUTH_SECRET=random-32-char-string
NEXTAUTH_URL=https://your-app.vercel.app

# Google OAuth
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-...

# GitHub OAuth
GITHUB_ID=Iv1...
GITHUB_SECRET=...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

### 2. Vercel 배포

```bash
# 1. GitHub에 푸시
git push origin main

# 2. Vercel Import
# https://vercel.com/new

# 3. 환경 변수 설정
# Settings → Environment Variables

# 4. Deploy
```

### 3. OAuth 설정

**Google Cloud Console:**
- Authorized redirect URIs: `https://your-app.vercel.app/api/auth/callback/google`

**GitHub Developer Settings:**
- Authorization callback URL: `https://your-app.vercel.app/api/auth/callback/github`

**Supabase:**
- Site URL: `https://your-app.vercel.app`
- Redirect URLs: `https://your-app.vercel.app/**`

---

## 🎨 UI/UX 특징

### 디자인 시스템

**색상:**
- Primary: `#6366F1` (보라색)
- Background: `#0F0E13` (다크)
- Surface: `#1A1921` (카드)
- Text: `#E7E5E4` (밝은 회색)
- Muted: `#78716C` (어두운 회색)

**타이포그래피:**
- Font Family: Pretendard Variable
- Heading: 굵게, 크게
- Body: 일반 두께, 가독성 중시
- Drop Cap: 첫 문단 첫 글자 강조

**애니메이션:**
- Framer Motion 사용
- 부드러운 페이드 인/아웃
- 스케일 효과
- 레이아웃 애니메이션

### 반응형 디자인

**브레이크포인트:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**모바일 최적화:**
- 톤 선택기: 2x2 그리드
- 히스토리: 스와이프 제스처
- 버튼: 터치 친화적 크기

---

## 📈 성능 최적화

### 1. 코드 스플리팅
- Next.js 자동 코드 스플리팅
- 동적 import 사용
- 번들 크기 최소화

### 2. 이미지 최적화
- Next.js Image 컴포넌트
- WebP 형식 사용
- 지연 로딩

### 3. API 최적화
- 응답 캐싱
- 토큰 제한 (max_tokens: 4000)
- 에러 핸들링

### 4. 데이터베이스 최적화
- 인덱스 사용
- RLS로 보안 강화
- 연결 풀링

---

## 🔒 보안

### 인증 & 인가
- NextAuth.js OAuth 2.0
- JWT 토큰 기반 세션
- CSRF 보호

### 데이터 보호
- Supabase RLS (Row Level Security)
- 환경 변수로 시크릿 관리
- HTTPS 통신

### API 보안
- Rate Limiting
- Input Validation
- Error Handling

---

## 📊 통계 및 분석

### 제공 통계
1. **작성한 글 개수**: 총 생성된 블로그 수
2. **총 단어 수**: 모든 글의 단어 수 합계
3. **평균 SEO 점수**: SEO 점수 평균
4. **인기 키워드**: TOP 10 키워드

### 통계 계산
```typescript
// 평균 SEO 점수
const avgScore = articles.reduce((sum, a) => 
  sum + analyzeSEO(a.title, a.content, a.keywords, a.metaDescription).score, 0
) / articles.length;

// 인기 키워드
const keywordFreq = articles.flatMap(a => a.keywords)
  .reduce((acc, keyword) => {
    acc[keyword] = (acc[keyword] || 0) + 1;
    return acc;
  }, {});
```

---

## 🎯 향후 개선 계획

### 단기 (1-2개월)
- [ ] 다국어 지원 (영어, 일본어)
- [ ] 이미지 자동 생성 (DALL-E)
- [ ] 템플릿 기능
- [ ] 글 버전 관리

### 중기 (3-6개월)
- [ ] AI 피드백 시스템
- [ ] 협업 기능
- [ ] 플러그인 시스템
- [ ] 모바일 앱 (React Native)

### 장기 (6-12개월)
- [ ] 자체 AI 모델 학습
- [ ] 커뮤니티 기능
- [ ] 마켓플레이스
- [ ] 유료 플랜 도입

---

## 🤝 팀 구성

### 개발
- **Full Stack Developer**: 1명
- 프론트엔드, 백엔드, 배포 전체 담당

### 기술 스택 선정 이유
- **Next.js**: SEO 최적화, 풀스택 개발 가능
- **TypeScript**: 타입 안정성, 개발 생산성 향상
- **Tailwind CSS**: 빠른 UI 개발, 일관된 디자인
- **Supabase**: 빠른 백엔드 구축, PostgreSQL 사용
- **Vercel**: 간편한 배포, 자동 스케일링

---

## 📄 라이선스

MIT License

---

## 📧 문의

프로젝트에 대한 문의사항이 있으시면 GitHub Issue를 등록해주세요.

**GitHub**: https://github.com/JJUKKULI/ai_blog_generator

---

Made with ❤️ by JJUKKULI
