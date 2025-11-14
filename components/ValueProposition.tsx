import React from 'react';
import { NARRATIVE_FRAMES } from '../constants';
import { NarrativeFrameId } from '../types';

const UpdatedAnalysisReport: React.FC = () => {
    const frame1 = NARRATIVE_FRAMES[NarrativeFrameId.ExaggeratedPromises];
    const frame2 = NARRATIVE_FRAMES[NarrativeFrameId.UrgencyFomo];

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl p-6 md:p-8 w-full max-w-3xl mx-auto transform hover:shadow-cyan-500/10 transition-shadow duration-500">
            {/* 요약 */}
            <div className="text-center border-b border-gray-200 pb-6 mb-6">
                <h3 className="text-base font-semibold text-blue-600 tracking-wider uppercase">AI 분석 요약</h3>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl leading-tight">
                    금전적 이득 유도, 성급한 구매 유도
                </h2>
                <p className="mt-3 text-lg text-gray-500">
                    이 글의 장르는 AI에 의해 <strong className="text-gray-700 font-semibold">'광고/홍보물'</strong>(으)로 판단되었어요.
                </p>
            </div>
            
            {/* 조작 지수 */}
            <div className="max-w-md mx-auto mb-8">
                <h4 className="text-xl font-bold text-gray-800 mb-3 text-center">숨은 의도 강도 (조작 지수)</h4>
                 <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-md">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-gray-600 font-medium">조작 가능성</span>
                        <div>
                            <span className="font-bold text-4xl text-red-600">95</span>
                            <span className="text-gray-500 font-semibold ml-1"> / 100</span>
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div className="bg-gradient-to-r from-amber-500 to-red-600 h-full rounded-full" style={{ width: '95%' }}></div>
                    </div>
                    <p className="text-right mt-2 font-semibold text-lg text-red-600">높음</p>
                </div>
            </div>

            {/* 주요 설득 전략 */}
            <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">AI가 찾아낸 주요 설득 전략</h4>
                <div className="space-y-3 max-w-lg mx-auto">
                    {/* Frame 1 */}
                    <div className="border border-gray-200 rounded-lg p-4 flex items-center bg-white">
                        <div className="flex items-center space-x-3 flex-shrink-0 w-[140px]">
                            <div className={`${frame1.color} bg-opacity-20 p-2 rounded-md`}>
                                {React.cloneElement(frame1.icon, { className: 'h-5 w-5', style: { color: frame1.hexColor } })}
                            </div>
                            <span className="font-semibold text-gray-800">{frame1.name}</span>
                        </div>
                        <div className="flex-grow flex items-center mx-4">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `92%` }}></div>
                            </div>
                        </div>
                        <div className="flex items-center w-[100px] justify-end">
                            <span className="font-semibold w-12 text-center text-red-600">높음</span>
                            <span className="font-mono font-bold text-gray-800 w-12 text-right">92%</span>
                        </div>
                    </div>
                    {/* Frame 2 */}
                    <div className="border border-gray-200 rounded-lg p-4 flex items-center bg-white">
                        <div className="flex items-center space-x-3 flex-shrink-0 w-[140px]">
                            <div className={`${frame2.color} bg-opacity-20 p-2 rounded-md`}>
                                {React.cloneElement(frame2.icon, { className: 'h-5 w-5', style: { color: frame2.hexColor } })}
                            </div>
                            <span className="font-semibold text-gray-800">{frame2.name}</span>
                        </div>
                        <div className="flex-grow flex items-center mx-4">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `85%` }}></div>
                            </div>
                        </div>
                        <div className="flex items-center w-[100px] justify-end">
                            <span className="font-semibold w-12 text-center text-red-600">높음</span>
                            <span className="font-mono font-bold text-gray-800 w-12 text-right">85%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 해독제 */}
            <div>
                 <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    '해독제': 생각해볼 지점
                </h4>
                <div className="bg-blue-50/50 border border-blue-200/60 rounded-xl p-5 max-w-2xl mx-auto">
                    <div className="flex items-start">
                         <span className="text-2xl mr-4 mt-[-2px]" aria-hidden="true">🧐</span>
                        <div className="flex-1">
                            <p className="text-lg font-semibold text-gray-800 mb-4">
                                높은 수익을 약속하는데, 그 근거는 명확한가요?
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <div className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 text-base">
                                    '자동 수익'의 원리는 무엇일까요?
                                </div>
                                <div className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 text-base">
                                    실제 검증된 사례가 충분히 있나요?
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ValueProposition: React.FC = () => {
    return (
        <section className="py-12 md:py-24 bg-gray-50/50">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                <div className="text-center mb-12 md:mb-16">
                     <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug mb-4">
                        이제 <span className="text-blue-600">핵심</span>만 명쾌하게 보세요
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        복잡하고 감정적인 글에 더는 휘둘리지 마세요. X-Ray는 혼란스러운 정보를 명쾌한 분석 리포트로 변환하여, 당신이 객관적인 시각을 유지하도록 돕습니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-x-8 items-start">
                    {/* Problem Column */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm h-full">
                        <h3 className="text-2xl font-bold text-gray-600 mb-8 text-center">BEFORE: 혼란스러운 정보의 홍수</h3>
                         <div className="relative h-64 flex items-center justify-center p-4">
                            <div className="absolute bg-white rounded-xl border border-gray-200 shadow-lg p-4 w-64 transform -rotate-6 opacity-80 hover:opacity-100 transition-opacity">
                                <h4 className="font-bold text-sm text-gray-700">월 1,000만원 '자동수익'</h4>
                                <p className="text-xs text-gray-500 mt-1">지금 아니면 평생 후회...</p>
                            </div>
                             <div className="absolute bg-white rounded-xl border border-gray-200 shadow-lg p-4 w-64 transform rotate-3 scale-105 opacity-80 hover:opacity-100 transition-opacity">
                                <h4 className="font-bold text-sm text-gray-700">의사도 모르는 진실?</h4>
                                <p className="text-xs text-gray-500 mt-1">이것 하나만 끊으면...</p>
                            </div>
                            <div className="absolute bg-white rounded-xl border border-gray-200 shadow-lg p-4 w-64 transform rotate-12 scale-90 opacity-80 hover:opacity-100 transition-opacity">
                                <h4 className="font-bold text-sm text-gray-700">OOO 때문에 나라가...</h4>
                                <p className="text-xs text-gray-500 mt-1">우리 아이들의 미래는...</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Arrow for mobile */}
                    <div className="flex lg:hidden justify-center items-center text-blue-500 my-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>

                    {/* Arrow for desktop */}
                    <div className="hidden lg:flex justify-center items-center h-full pt-32">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>

                    {/* Solution Column */}
                    <div className="lg:col-start-3">
                         <h3 className="text-2xl font-bold text-blue-600 mb-6 text-center">AFTER: 명쾌한 AI 분석 리포트</h3>
                        <UpdatedAnalysisReport />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ValueProposition;
