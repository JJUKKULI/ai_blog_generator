# 🚀 Vercel 배포 완벽 가이드

## 📋 목차
1. [준비 사항](#준비-사항)
2. [GitHub 저장소 생성](#github-저장소-생성)
3. [Vercel 계정 생성 및 연결](#vercel-계정-생성-및-연결)
4. [환경 변수 설정](#환경-변수-설정)
5. [배포 실행](#배포-실행)
6. [배포 후 설정](#배포-후-설정)
7. [문제 해결](#문제-해결)

---

## 1️⃣ 준비 사항

### ✅ 필수 항목:

#### A. 환경 변수 값들 준비:

**OpenAI:**
```
OPENAI_API_KEY=sk-...
```

**NextAuth:**
```
NEXTAUTH_SECRET=(랜덤 문자열 32자 이상)
NEXTAUTH_URL=https://your-app.vercel.app
```

**Supabase:**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

**Google OAuth:**
```
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-...
```

**GitHub OAuth:**
```
GITHUB_ID=Iv1...
GITHUB_SECRET=...
```

#### B. NEXTAUTH_SECRET 생성:

**방법 1 - 온라인:**
```
https://generate-secret.vercel.app/32
```

**방법 2 - 터미널:**
```bash
openssl rand -base64 32
```

**방법 3 - Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 2️⃣ GitHub 저장소 생성

### A. GitHub에서 새 저장소 생성:

1. **GitHub 접속:** https://github.com
2. **New repository** 클릭
3. **저장소 설정:**
   - Repository name: `ai-blog-generator`
   - Description: `AI 기술 블로그 생성기`
   - Public 또는 Private 선택
   - ❌ README, .gitignore, license 체크 해제 (이미 있음)
4. **Create repository** 클릭

### B. 로컬 프로젝트와 연결:

```bash
# 프로젝트 디렉토리로 이동
cd /path/to/ai-blog-generator

# Git 초기화 (이미 되어있으면 생략)
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: AI Blog Generator with SEO & Advanced Settings"

# GitHub 저장소 연결 (YOUR_USERNAME를 실제 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/ai-blog-generator.git

# 메인 브랜치로 변경
git branch -M main

# GitHub에 푸시
git push -u origin main
```

---

## 3️⃣ Vercel 계정 생성 및 연결

### A. Vercel 회원가입:

1. **Vercel 접속:** https://vercel.com
2. **Sign Up** 클릭
3. **Continue with GitHub** 선택
4. GitHub 계정 인증

### B. 새 프로젝트 생성:

1. **Dashboard** 접속
2. **Add New...** → **Project** 클릭
3. **Import Git Repository** 섹션에서:
   - GitHub 저장소 목록에서 `ai-blog-generator` 찾기
   - **Import** 클릭

### C. 프로젝트 설정:

**Configure Project 화면에서:**

```
Project Name: ai-blog-generator
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

**❌ 아직 Deploy 누르지 말 것!**
→ 환경 변수를 먼저 설정해야 합니다.

---

## 4️⃣ 환경 변수 설정

### A. Environment Variables 설정:

**Configure Project 화면에서:**

1. **Environment Variables** 섹션 펼치기
2. 다음 변수들을 **하나씩** 추가:

#### 필수 환경 변수:

| Key | Value | 설명 |
|-----|-------|------|
| `OPENAI_API_KEY` | `sk-...` | OpenAI API 키 |
| `NEXTAUTH_SECRET` | `생성한 랜덤 문자열` | NextAuth 암호화 키 |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | 배포 URL (나중에 수정) |
| `GOOGLE_CLIENT_ID` | `xxx.apps.googleusercontent.com` | Google OAuth 클라이언트 ID |
| `GOOGLE_CLIENT_SECRET` | `GOCSPX-...` | Google OAuth 비밀키 |
| `GITHUB_ID` | `Iv1...` | GitHub OAuth 앱 ID |
| `GITHUB_SECRET` | `...` | GitHub OAuth 비밀키 |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` | Supabase Anon 키 |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGc...` | Supabase Service Role 키 |

**중요:**
- `NEXTAUTH_URL`은 일단 `https://placeholder.vercel.app`로 입력
- 배포 후 실제 URL로 수정

### B. 환경 변수 입력 방법:

```
1. Key 입력: OPENAI_API_KEY
2. Value 입력: sk-proj-...
3. Environment 선택: Production, Preview, Development 모두 체크
4. "Add" 버튼 클릭
5. 다음 변수로 이동
```

**💡 팁:**
- 복사-붙여넣기로 정확하게 입력
- 앞뒤 공백 주의
- 따옴표 넣지 말 것

---

## 5️⃣ 배포 실행

### A. 첫 배포:

1. 모든 환경 변수 입력 완료 확인
2. **Deploy** 버튼 클릭
3. 빌드 진행 상황 확인:
   ```
   Installing dependencies...
   Building application...
   Uploading build artifacts...
   Deploying...
   ```

### B. 배포 완료:

**성공 시:**
```
✅ Deployment Ready
🎉 Your project is live at:
   https://ai-blog-generator-xxx.vercel.app
```

**실제 배포 URL 복사해두기!**

---

## 6️⃣ 배포 후 설정

### A. NEXTAUTH_URL 업데이트:

1. **Vercel Dashboard** → 프로젝트 선택
2. **Settings** → **Environment Variables**
3. `NEXTAUTH_URL` 찾기
4. **Edit** 클릭
5. Value를 실제 배포 URL로 변경:
   ```
   https://ai-blog-generator-xxx.vercel.app
   ```
6. **Save** 클릭
7. **Redeploy** (자동으로 재배포됨)

### B. OAuth 콜백 URL 업데이트:

#### Google OAuth:

1. **Google Cloud Console** 접속
2. **APIs & Services** → **Credentials**
3. OAuth 2.0 Client ID 선택
4. **Authorized redirect URIs**에 추가:
   ```
   https://ai-blog-generator-xxx.vercel.app/api/auth/callback/google
   ```
5. **Save**

#### GitHub OAuth:

1. **GitHub Settings** → **Developer settings** → **OAuth Apps**
2. 앱 선택
3. **Authorization callback URL** 업데이트:
   ```
   https://ai-blog-generator-xxx.vercel.app/api/auth/callback/github
   ```
4. **Update application**

### C. Supabase URL 허용:

1. **Supabase Dashboard** → 프로젝트 선택
2. **Settings** → **API**
3. **URL Configuration** → **Site URL**:
   ```
   https://ai-blog-generator-xxx.vercel.app
   ```
4. **Additional Redirect URLs**에 추가:
   ```
   https://ai-blog-generator-xxx.vercel.app/**
   ```
5. **Save**

---

## 7️⃣ 배포 확인

### A. 기본 기능 테스트:

**1. 사이트 접속:**
```
https://your-app.vercel.app
```

**2. 로그인 테스트:**
- Google 로그인 시도
- GitHub 로그인 시도

**3. 글 생성 테스트:**
- 주제 입력
- 키워드 입력
- 생성하기 클릭
- 결과 확인

**4. 고급 설정 테스트:**
- 고급 설정 열기
- 옵션 변경
- 생성 테스트

**5. SEO 분석 테스트:**
- 생성된 글에서 SEO 분석 클릭
- 점수 확인

**6. 히스토리 테스트:**
- 글 여러 개 생성
- 히스토리 확인
- 클라우드 동기화 확인 (☁️ 아이콘)

### B. 성능 확인:

**Vercel Analytics:**
```
Dashboard → Analytics
- Core Web Vitals
- Performance Score
```

**예상 점수:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

---

## 🐛 문제 해결

### 문제 1: 빌드 실패

**증상:**
```
Error: Build failed
```

**해결:**
1. **Vercel Dashboard** → **Deployments** → 실패한 배포 클릭
2. **Build Logs** 확인
3. 일반적인 원인:
   - 환경 변수 누락
   - 타입스크립트 에러
   - 패키지 버전 충돌

**해결책:**
```bash
# 로컬에서 빌드 테스트
npm run build

# 에러 수정 후 푸시
git add .
git commit -m "Fix build error"
git push
```

---

### 문제 2: API 에러

**증상:**
```
500 Internal Server Error
API route error
```

**해결:**
1. **Vercel Dashboard** → **Deployments** → **Functions**
2. 에러 로그 확인
3. 일반적인 원인:
   - `OPENAI_API_KEY` 누락 또는 잘못됨
   - 환경 변수 오타

**확인:**
```
Settings → Environment Variables
각 변수 값 재확인
```

---

### 문제 3: OAuth 로그인 실패

**증상:**
```
Callback URL mismatch
```

**해결:**

**Google:**
```
Authorized redirect URIs:
https://your-app.vercel.app/api/auth/callback/google
```

**GitHub:**
```
Authorization callback URL:
https://your-app.vercel.app/api/auth/callback/github
```

**NextAuth URL:**
```
NEXTAUTH_URL=https://your-app.vercel.app
```

---

### 문제 4: Supabase 연결 실패

**증상:**
```
Failed to fetch from Supabase
CORS error
```

**해결:**
```
Supabase Dashboard → Settings → API
Site URL: https://your-app.vercel.app
Additional Redirect URLs: https://your-app.vercel.app/**
```

---

### 문제 5: 환경 변수 변경이 반영 안됨

**해결:**
```
1. 환경 변수 수정
2. Deployments → 최근 배포 → ⋯ → Redeploy
3. "Use existing Build Cache" 체크 해제
4. Redeploy
```

---

## 🎯 배포 체크리스트

### 배포 전:
- [ ] GitHub 저장소 생성
- [ ] 모든 환경 변수 준비
- [ ] NEXTAUTH_SECRET 생성
- [ ] OAuth 앱 생성 (Google, GitHub)
- [ ] Supabase 프로젝트 생성

### 배포 중:
- [ ] Vercel 계정 생성
- [ ] 프로젝트 Import
- [ ] 환경 변수 모두 입력
- [ ] Deploy 클릭
- [ ] 빌드 성공 확인

### 배포 후:
- [ ] NEXTAUTH_URL 업데이트
- [ ] OAuth 콜백 URL 업데이트
- [ ] Supabase URL 설정
- [ ] 로그인 테스트
- [ ] 글 생성 테스트
- [ ] SEO 분석 테스트
- [ ] 히스토리 테스트

---

## 🚀 완료!

**배포 성공 시:**
```
✅ 사이트 접속 가능
✅ 로그인 작동
✅ 글 생성 작동
✅ SEO 분석 작동
✅ 클라우드 동기화 작동
```

**축하합니다! 🎉**

---

## 💡 추가 팁

### 커스텀 도메인:
```
Vercel Dashboard → Settings → Domains
→ 원하는 도메인 추가
```

### 자동 배포:
```
GitHub에 푸시하면 자동으로 배포됨
main 브랜치 → Production
다른 브랜치 → Preview
```

### 환경 분리:
```
Production: 실제 운영
Preview: PR 미리보기
Development: 로컬 개발
```

---

**배포 날짜:** 2024-02-20  
**버전:** PRODUCTION-v1.0  
**상태:** 🚀 배포 준비 완료
