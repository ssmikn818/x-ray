
import React from 'react';
import { NarrativeFrameId, type NarrativeFrame } from './types';

export const NARRATIVE_FRAMES: Record<NarrativeFrameId, NarrativeFrame> = {
  [NarrativeFrameId.UsVsThem]: {
    id: NarrativeFrameId.UsVsThem,
    name: '편 가르기',
    // FIX: Use double quotes for the string to avoid syntax errors with inner single quotes.
    description: "세상을 '우리'와 '적'으로 단순하게 나누어 갈등을 일으키는 유형입니다.",
    color: 'bg-us-vs-them',
    hexColor: '#6366f1',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5V4h-5m-7 16H5V4h5m1 16V4" />
      </svg>
    ),
  },
  [NarrativeFrameId.FearMongering]: {
    id: NarrativeFrameId.FearMongering,
    name: '불안감 조성',
    // FIX: Use double quotes for consistency.
    description: "위험을 실제보다 부풀려서 사람들의 두려움과 불안을 자극하는 유형입니다.",
    color: 'bg-fear-mongering',
    hexColor: '#a855f7',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  [NarrativeFrameId.Scapegoating]: {
    id: NarrativeFrameId.Scapegoating,
    name: '특정 대상 탓하기',
    // FIX: Use double quotes for consistency.
    description: "모든 문제를 특정 사람이나 집단의 탓으로 돌려 비난하게 만드는 유형입니다.",
    color: 'bg-scapegoating',
    hexColor: '#f59e0b',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1.5c-4.418 0-8 3.582-8 8 0 4.418 3.582 8 8 8s8-3.582 8-8c0-4.418-3.582-8-8-8zm0 13c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5zm5.5-1.5L14 11.5m3.5 3.5L14 11.5m-7 3.5L10 11.5M6.5 15L10 11.5" />
      </svg>
    ),
  },
  [NarrativeFrameId.PastGlory]: {
    id: NarrativeFrameId.PastGlory,
    name: '과거 미화하기',
    // FIX: Use double quotes for the string to avoid syntax errors with inner single quotes.
    description: "'좋았던 옛날'을 계속 이야기하며 현실의 문제를 외면하게 만드는 유형입니다.",
    color: 'bg-past-glory',
    hexColor: '#14b8a6',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  [NarrativeFrameId.ThreatToValues]: {
    id: NarrativeFrameId.ThreatToValues,
    name: '위기감 조성',
    // FIX: Use double quotes for the string to avoid syntax errors with inner single quotes.
    description: "'우리의 가치'가 공격받고 있다며 위기감을 만들어 사람들을 움직이는 유형입니다.",
    color: 'bg-threat-to-values',
    hexColor: '#f43f5e',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  [NarrativeFrameId.ExaggeratedPromises]: {
    id: NarrativeFrameId.ExaggeratedPromises,
    name: '과장된 약속',
    description: "현실과 동떨어진 이익이나 결과를 보장하며 비판적 사고를 마비시키는 유형입니다.",
    color: 'bg-exaggerated-promises',
    hexColor: '#facc15',
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  [NarrativeFrameId.UrgencyFomo]: {
    id: NarrativeFrameId.UrgencyFomo,
    name: '긴급함/소외 불안감 조성',
    description: "제한된 시간이나 기회를 강조하여 성급한 결정을 유도하는 유형입니다.",
    color: 'bg-urgency-fomo',
    hexColor: '#f97316',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
};