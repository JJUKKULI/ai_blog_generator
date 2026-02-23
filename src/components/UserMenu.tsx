'use client';

import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserIcon, LogOutIcon, BarChart2Icon, LogInIcon } from 'lucide-react';

export function UserMenu() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (status === 'loading') {
    return (
      <div className="w-10 h-10 bg-dark-surface border border-dark-border rounded-lg animate-pulse" />
    );
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn()}
        className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors font-medium"
      >
        <LogInIcon className="w-4 h-4" />
        로그인
      </button>
    );
  }

  return (
    <div className="relative">
      {/* 프로필 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-dark-surface border border-dark-border hover:border-accent/50 rounded-lg transition-colors"
      >
        {session.user?.image ? (
          <img
            src={session.user.image}
            alt={session.user.name || 'User'}
            className="w-6 h-6 rounded-full"
          />
        ) : (
          <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
            <UserIcon className="w-4 h-4 text-white" />
          </div>
        )}
        <span className="text-dark-text text-sm font-medium hidden sm:block">
          {session.user?.name?.split(' ')[0] || 'User'}
        </span>
      </button>

      {/* 드롭다운 메뉴 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 배경 오버레이 */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* 메뉴 */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-12 w-64 bg-dark-surface border border-dark-border rounded-lg shadow-dark-lg z-50 overflow-hidden"
            >
              {/* 사용자 정보 */}
              <div className="p-4 border-b border-dark-border">
                <div className="flex items-center gap-3">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-dark-text font-medium truncate">
                      {session.user?.name || 'User'}
                    </p>
                    <p className="text-dark-muted text-xs truncate">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* 메뉴 아이템 */}
              <div className="p-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    // TODO: 통계 페이지로 이동
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-dark-text hover:bg-dark-bg rounded-lg transition-colors text-left"
                >
                  <BarChart2Icon className="w-4 h-4 text-dark-muted" />
                  <span>사용 통계</span>
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut({ callbackUrl: '/' });
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                >
                  <LogOutIcon className="w-4 h-4" />
                  <span>로그아웃</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
