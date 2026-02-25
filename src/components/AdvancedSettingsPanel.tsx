'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon, SettingsIcon } from 'lucide-react';
import { useState } from 'react';

export interface AdvancedSettings {
  audience: 'beginner' | 'intermediate' | 'expert';
  length: 'short' | 'medium' | 'long';
  structure: 'list' | 'story' | 'technical' | 'balanced';
  seoLevel: 'basic' | 'advanced';
}

interface AdvancedSettingsPanelProps {
  settings: AdvancedSettings;
  onChange: (settings: AdvancedSettings) => void;
}

export function AdvancedSettingsPanel({ settings, onChange }: AdvancedSettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateSetting = <K extends keyof AdvancedSettings>(
    key: K,
    value: AdvancedSettings[K]
  ) => {
    onChange({ ...settings, [key]: value });
  };

  const audienceOptions = [
    { value: 'beginner' as const, label: '초보자', desc: '기초부터 쉽게' },
    { value: 'intermediate' as const, label: '중급자', desc: '실용적 내용' },
    { value: 'expert' as const, label: '전문가', desc: '고급 기법' },
  ];

  const lengthOptions = [
    { value: 'short' as const, label: '짧음', desc: '400-600자' },
    { value: 'medium' as const, label: '보통', desc: '800-1200자' },
    { value: 'long' as const, label: '김', desc: '1500-2000자' },
  ];

  const structureOptions = [
    { value: 'list' as const, label: '리스트형', desc: '목록 중심' },
    { value: 'story' as const, label: '스토리형', desc: '문제-해결' },
    { value: 'technical' as const, label: '기술문서', desc: '체계적 구조' },
    { value: 'balanced' as const, label: '균형형', desc: '설명+예제' },
  ];

  const seoOptions = [
    { value: 'basic' as const, label: '기본', desc: '기본 최적화' },
    { value: 'advanced' as const, label: '고급', desc: '키워드 밀도 최적화' },
  ];

  return (
    <div className="mb-4">
      {/* 토글 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-dark-surface border border-dark-border rounded-lg hover:border-accent/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <SettingsIcon className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-dark-text">고급 설정</span>
        </div>
        {isOpen ? (
          <ChevronUpIcon className="w-4 h-4 text-dark-muted" />
        ) : (
          <ChevronDownIcon className="w-4 h-4 text-dark-muted" />
        )}
      </button>

      {/* 설정 패널 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-3 p-4 bg-dark-surface border border-dark-border rounded-lg space-y-5">
              {/* 대상 독자 */}
              <div>
                <label className="block text-sm font-semibold text-dark-text mb-3">
                  대상 독자
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {audienceOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateSetting('audience', option.value)}
                      className={`p-3 rounded-lg border transition-all ${
                        settings.audience === option.value
                          ? 'bg-accent text-white border-accent shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                          : 'bg-dark-bg text-dark-text border-dark-border hover:border-accent/50'
                      }`}
                    >
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs opacity-75 mt-1">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 글 길이 */}
              <div>
                <label className="block text-sm font-semibold text-dark-text mb-3">
                  글 길이
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {lengthOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateSetting('length', option.value)}
                      className={`p-3 rounded-lg border transition-all ${
                        settings.length === option.value
                          ? 'bg-accent text-white border-accent shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                          : 'bg-dark-bg text-dark-text border-dark-border hover:border-accent/50'
                      }`}
                    >
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs opacity-75 mt-1">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 구조 타입 */}
              <div>
                <label className="block text-sm font-semibold text-dark-text mb-3">
                  구조 타입
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {structureOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateSetting('structure', option.value)}
                      className={`p-3 rounded-lg border transition-all ${
                        settings.structure === option.value
                          ? 'bg-accent text-white border-accent shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                          : 'bg-dark-bg text-dark-text border-dark-border hover:border-accent/50'
                      }`}
                    >
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs opacity-75 mt-1">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* SEO 최적화 레벨 */}
              <div>
                <label className="block text-sm font-semibold text-dark-text mb-3">
                  SEO 최적화
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {seoOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateSetting('seoLevel', option.value)}
                      className={`p-3 rounded-lg border transition-all ${
                        settings.seoLevel === option.value
                          ? 'bg-accent text-white border-accent shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                          : 'bg-dark-bg text-dark-text border-dark-border hover:border-accent/50'
                      }`}
                    >
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs opacity-75 mt-1">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 현재 설정 요약 */}
              <div className="pt-3 border-t border-dark-border">
                <div className="text-xs text-dark-muted">
                  <span className="font-medium text-dark-text">현재 설정:</span>{' '}
                  {audienceOptions.find((o) => o.value === settings.audience)?.label} ·{' '}
                  {lengthOptions.find((o) => o.value === settings.length)?.label} ·{' '}
                  {structureOptions.find((o) => o.value === settings.structure)?.label} ·{' '}
                  {seoOptions.find((o) => o.value === settings.seoLevel)?.label} SEO
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
