#!/bin/bash

echo "🚀 AI Blog Generator - 완벽한 설치 스크립트"
echo "================================================"
echo ""

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. 현재 디렉토리 확인
echo "📂 Step 1: 프로젝트 디렉토리 확인 중..."
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ 에러: package.json 파일을 찾을 수 없습니다.${NC}"
    echo "   프로젝트 루트 디렉토리에서 이 스크립트를 실행하세요."
    exit 1
fi
echo -e "${GREEN}✅ 프로젝트 디렉토리 확인 완료${NC}"
echo ""

# 2. 기존 파일 정리
echo "🧹 Step 2: 기존 빌드 파일 및 캐시 정리 중..."
rm -rf node_modules package-lock.json .next
echo -e "${GREEN}✅ 정리 완료${NC}"
echo ""

# 3. 의존성 설치
echo "📦 Step 3: 의존성 설치 중..."
echo "   (이 과정은 1-2분 정도 소요됩니다)"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 의존성 설치 실패${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 의존성 설치 완료${NC}"
echo ""

# 4. Tailwind 버전 확인
echo "🎨 Step 4: Tailwind CSS 버전 확인 중..."
TAILWIND_VERSION=$(npm list tailwindcss --depth=0 2>/dev/null | grep tailwindcss | sed 's/.*@//')
echo "   설치된 Tailwind CSS 버전: $TAILWIND_VERSION"
if [[ $TAILWIND_VERSION == 3.* ]]; then
    echo -e "${GREEN}✅ Tailwind CSS v3 확인 완료${NC}"
else
    echo -e "${YELLOW}⚠️  Tailwind CSS 버전이 v3가 아닙니다. CSS가 제대로 작동하지 않을 수 있습니다.${NC}"
fi
echo ""

# 5. 환경 변수 확인
echo "🔑 Step 5: 환경 변수 확인 중..."
if [ ! -f ".env.local" ]; then
    if [ -f ".env.example" ]; then
        echo -e "${YELLOW}⚠️  .env.local 파일이 없습니다.${NC}"
        echo "   .env.example을 복사하여 .env.local 생성 중..."
        cp .env.example .env.local
        echo -e "${GREEN}✅ .env.local 파일 생성 완료${NC}"
        echo ""
        echo -e "${YELLOW}⚠️  중요: .env.local 파일을 열어서 OPENAI_API_KEY를 입력하세요!${NC}"
        echo ""
    else
        echo -e "${YELLOW}⚠️  .env.example 파일이 없습니다.${NC}"
        echo "   .env.local 파일을 수동으로 생성하세요."
    fi
else
    echo -e "${GREEN}✅ .env.local 파일 존재 확인${NC}"
    
    # API 키 확인
    if grep -q "your_key_here\|your-key-here\|sk-proj-" .env.local; then
        if grep -q "your_key_here\|your-key-here" .env.local; then
            echo -e "${YELLOW}⚠️  OpenAI API 키가 아직 설정되지 않았습니다.${NC}"
            echo "   .env.local 파일을 열어서 실제 API 키를 입력하세요."
        else
            echo -e "${GREEN}✅ OpenAI API 키 확인 완료${NC}"
        fi
    fi
fi
echo ""

# 6. 필수 파일 확인
echo "📋 Step 6: 필수 파일 확인 중..."
FILES_OK=true

if [ ! -f "postcss.config.mjs" ]; then
    echo -e "${RED}❌ postcss.config.mjs 파일이 없습니다${NC}"
    FILES_OK=false
fi

if [ ! -f "tailwind.config.ts" ]; then
    echo -e "${RED}❌ tailwind.config.ts 파일이 없습니다${NC}"
    FILES_OK=false
fi

if [ ! -f "src/app/globals.css" ]; then
    echo -e "${RED}❌ src/app/globals.css 파일이 없습니다${NC}"
    FILES_OK=false
fi

if [ ! -f "tsconfig.json" ]; then
    echo -e "${RED}❌ tsconfig.json 파일이 없습니다${NC}"
    FILES_OK=false
fi

if [ "$FILES_OK" = true ]; then
    echo -e "${GREEN}✅ 모든 필수 파일 확인 완료${NC}"
else
    echo -e "${RED}❌ 일부 필수 파일이 없습니다. 프로젝트를 다시 압축 해제하세요.${NC}"
    exit 1
fi
echo ""

# 7. tsconfig.json baseUrl 확인
echo "⚙️  Step 7: TypeScript 설정 확인 중..."
if grep -q '"baseUrl": "."' tsconfig.json; then
    echo -e "${GREEN}✅ tsconfig.json baseUrl 설정 확인${NC}"
else
    echo -e "${YELLOW}⚠️  tsconfig.json에 baseUrl이 설정되지 않았습니다${NC}"
fi
echo ""

# 완료
echo "================================================"
echo -e "${GREEN}🎉 설치 완료!${NC}"
echo ""
echo "다음 명령어로 개발 서버를 시작하세요:"
echo -e "${YELLOW}npm run dev${NC}"
echo ""
echo "브라우저에서 http://localhost:3000 을 열면"
echo "완벽한 다크 테마 UI를 볼 수 있습니다! ✨"
echo ""
echo "================================================"
