import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { supabase } from '@/lib/supabase';

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

      try {
        // Supabase에 사용자 정보 저장/업데이트
        const { data: existingUser } = await supabase
          .from('users')
          .select('*')
          .eq('email', user.email)
          .single();

        if (existingUser) {
          // 마지막 로그인 시간 업데이트
          await supabase
            .from('users')
            .update({ 
              last_login: new Date().toISOString(),
              name: user.name,
              image: user.image,
            })
            .eq('email', user.email);
        } else {
          // 새 사용자 생성
          await supabase.from('users').insert({
            id: user.id || crypto.randomUUID(),
            email: user.email,
            name: user.name,
            image: user.image,
            created_at: new Date().toISOString(),
            last_login: new Date().toISOString(),
          });
        }

        // 로그인 이벤트 기록
        await supabase.from('analytics').insert({
          id: crypto.randomUUID(),
          user_id: user.id || user.email,
          event_type: 'login',
          metadata: {
            provider: account?.provider,
            timestamp: new Date().toISOString(),
          },
          created_at: new Date().toISOString(),
        });

        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || '';
      }
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
