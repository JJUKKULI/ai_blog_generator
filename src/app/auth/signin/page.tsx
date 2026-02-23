'use client';

import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Github, Chrome } from 'lucide-react';

export default function SignIn() {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* 로고/제목 */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-dark-text mb-2">
            AI 블로그 생성기
          </h1>
          <p className="text-dark-muted">
            로그인하여 클라우드에 저장하고<br />
            어디서든 접속하세요
          </p>
        </div>

        {/* 로그인 카드 */}
        <div className="bg-dark-surface border border-dark-border rounded-xl p-8 shadow-dark">
          <h2 className="text-xl font-semibold text-dark-text mb-6 text-center">
            시작하기
          </h2>

          <div className="space-y-3">
            {/* Google 로그인 */}
            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 text-gray-800 rounded-lg transition-all font-medium border border-gray-200 hover:border-gray-300"
            >
              <Chrome className="w-5 h-5" />
              Google로 계속하기
            </button>

            {/* GitHub 로그인 */}
            <button
              onClick={() => signIn('github', { callbackUrl: '/' })}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#24292e] hover:bg-[#1b1f23] text-white rounded-lg transition-all font-medium"
            >
              <Github className="w-5 h-5" />
              GitHub로 계속하기
            </button>
          </div>

          {/* 구분선 */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-surface text-dark-muted">또는</span>
            </div>
          </div>

          {/* 로그인 없이 계속 */}
          <button
            onClick={() => window.location.href = '/'}
            className="w-full px-4 py-3 bg-dark-bg border border-dark-border text-dark-text hover:bg-dark-border/50 rounded-lg transition-all font-medium"
          >
            로그인 없이 계속하기
          </button>

          {/* 안내 메시지 */}
          <p className="mt-6 text-xs text-dark-muted text-center">
            로그인하면 여러 기기에서 동기화된 히스토리를<br />
            이용할 수 있습니다.
          </p>
        </div>

        {/* 기능 설명 */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl mb-1">☁️</div>
            <p className="text-xs text-dark-muted">클라우드<br />동기화</p>
          </div>
          <div>
            <div className="text-2xl mb-1">📊</div>
            <p className="text-xs text-dark-muted">사용<br />통계</p>
          </div>
          <div>
            <div className="text-2xl mb-1">🔒</div>
            <p className="text-xs text-dark-muted">안전한<br />저장</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
