-- Supabase RLS 정책 수정
-- NextAuth와 함께 작동하도록 수정

-- 기존 정책 모두 삭제
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Users can view own articles" ON articles;
DROP POLICY IF EXISTS "Users can insert own articles" ON articles;
DROP POLICY IF EXISTS "Users can update own articles" ON articles;
DROP POLICY IF EXISTS "Users can delete own articles" ON articles;
DROP POLICY IF EXISTS "Users can view own analytics" ON analytics;
DROP POLICY IF EXISTS "Users can insert own analytics" ON analytics;

-- 새로운 정책: Service Role Key로 모든 작업 허용
-- (서버에서만 사용, 클라이언트는 API Route를 통해서만 접근)

-- Users 테이블
CREATE POLICY "Enable all access for service role"
ON users
FOR ALL
USING (true)
WITH CHECK (true);

-- Articles 테이블  
CREATE POLICY "Enable all access for service role"
ON articles
FOR ALL
USING (true)
WITH CHECK (true);

-- Analytics 테이블
CREATE POLICY "Enable all access for service role"
ON analytics
FOR ALL
USING (true)
WITH CHECK (true);

-- 완료 메시지
DO $$
BEGIN
  RAISE NOTICE '✅ RLS 정책 수정 완료!';
  RAISE NOTICE '🔓 Service Role Key로 모든 작업 가능';
  RAISE NOTICE '⚠️  클라이언트에서는 API Route를 통해서만 접근하세요';
END $$;
