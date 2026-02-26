# 🚀 Vercel 빠른 배포 가이드

## ⚡ 5분 안에 배포하기

### 1단계: GitHub에 업로드 (2분)

```bash
# 프로젝트 폴더에서
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/ai-blog-generator.git
git push -u origin main
```

---

### 2단계: Vercel 연결 (1분)

1. https://vercel.com 접속
2. **Sign up with GitHub**
3. **New Project** → `ai-blog-generator` Import

---

### 3단계: 환경 변수 입력 (2분)

**필수 10개만 입력:**

```env
OPENAI_API_KEY=sk-...
NEXTAUTH_SECRET=(32자 랜덤 문자열)
NEXTAUTH_URL=https://placeholder.vercel.app
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_ID=...
GITHUB_SECRET=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

**Deploy 클릭!**

---

### 4단계: 배포 후 수정

**A. NEXTAUTH_URL 업데이트:**
```
Settings → Environment Variables
NEXTAUTH_URL을 실제 URL로 변경
```

**B. OAuth 콜백 추가:**
```
Google: https://your-app.vercel.app/api/auth/callback/google
GitHub: https://your-app.vercel.app/api/auth/callback/github
```

**C. Supabase URL 추가:**
```
Site URL: https://your-app.vercel.app
```

---

## ✅ 완료!

사이트 접속: https://your-app.vercel.app

---

## 🆘 문제 발생 시

**빌드 실패:**
→ `VERCEL_DEPLOY_GUIDE.md`의 "문제 해결" 섹션 참고

**로그인 안됨:**
→ OAuth 콜백 URL 재확인

**API 에러:**
→ `OPENAI_API_KEY` 재확인

---

## 📚 상세 가이드

전체 가이드: `VERCEL_DEPLOY_GUIDE.md` 참고

---

**Happy Deploying! 🎉**
