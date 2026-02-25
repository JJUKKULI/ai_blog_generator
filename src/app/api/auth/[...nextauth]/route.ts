import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { supabaseAdmin } from '@/lib/supabase';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      // Supabase가 설정되지 않았으면 그냥 로그인 허용
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        console.log('✅ Supabase 미설정 - 로그인만 허용');
        return true;
      }

      try {
        console.log('🔄 Supabase에 사용자 저장 시도:', user.email);

        // 기존 사용자 확인 (email로)
        const { data: existingUser, error: selectError } = await supabaseAdmin
          .from('users')
          .select('*')
          .eq('email', user.email)
          .single();

        if (selectError && selectError.code !== 'PGRST116') {
          console.error('❌ 사용자 조회 오류:', selectError);
        }

        // user.id는 Google/GitHub에서 숫자 문자열로 올 수 있어서 UUID로 변환 필요
        let userId: string;
        
        if (existingUser) {
          // 기존 사용자면 기존 UUID 사용
          userId = existingUser.id;
          
          // 마지막 로그인 시간 업데이트
          const { error: updateError } = await supabaseAdmin
            .from('users')
            .update({ 
              last_login: new Date().toISOString(),
              name: user.name,
              image: user.image,
            })
            .eq('email', user.email);

          if (updateError) {
            console.error('❌ 사용자 업데이트 오류:', updateError);
          } else {
            console.log('✅ 사용자 업데이트 성공');
          }
        } else {
          // 새 사용자면 새 UUID 생성
          userId = crypto.randomUUID();
          
          const { error: insertError } = await supabaseAdmin.from('users').insert({
            id: userId,
            email: user.email,
            name: user.name,
            image: user.image,
            created_at: new Date().toISOString(),
            last_login: new Date().toISOString(),
          });

          if (insertError) {
            console.error('❌ 사용자 생성 오류:', insertError);
          } else {
            console.log('✅ 사용자 생성 성공:', userId);
          }
        }

        // 로그인 이벤트 기록 (생성된 또는 기존 userId 사용)
        const { error: analyticsError } = await supabaseAdmin.from('analytics').insert({
          id: crypto.randomUUID(),
          user_id: userId,  // 수정: Google/GitHub ID 대신 Supabase UUID 사용
          event_type: 'login',
          metadata: {
            provider: account?.provider,
            timestamp: new Date().toISOString(),
          },
          created_at: new Date().toISOString(),
        });

        if (analyticsError) {
          console.error('❌ 분석 기록 오류:', analyticsError);
        } else {
          console.log('✅ 로그인 이벤트 기록 성공');
        }

        return true;
      } catch (error) {
        console.error('❌ signIn 콜백 오류:', error);
        // 에러가 있어도 로그인은 허용 (localStorage 사용 가능하도록)
        return true;
      }
    },
    async session({ session, token }) {
      console.log('🔑 session callback 호출됨');
      console.log('Token sub:', token.sub);
      console.log('Session user email:', session.user?.email);
      
      if (session.user?.email) {
        // Supabase에서 실제 UUID 조회
        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
          try {
            const { data, error } = await supabaseAdmin
              .from('users')
              .select('id')
              .eq('email', session.user.email)
              .single();
            
            if (error) {
              console.error('❌ session callback에서 user 조회 에러:', error);
            } else if (data) {
              session.user.id = data.id;
              console.log('✅ session.user.id 설정됨:', data.id);
            } else {
              console.warn('⚠️ user 데이터 없음');
            }
          } catch (error) {
            console.error('❌ session callback 전체 에러:', error);
          }
        }
      }
      
      console.log('최종 session.user.id:', session.user?.id);
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
