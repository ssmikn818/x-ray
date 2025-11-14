import React from 'react';
import { NARRATIVE_FRAMES } from '../constants';
import { NarrativeFrameId } from '../types';

const CleanAnalysisReport: React.FC = () => {
    const frame1 = NARRATIVE_FRAMES[NarrativeFrameId.ExaggeratedPromises];
    const frame2 = NARRATIVE_FRAMES[NarrativeFrameId.UrgencyFomo];

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl p-6 md:p-8 w-full max-w-2xl mx-auto transform hover:shadow-cyan-500/10 transition-shadow duration-500">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">AI 분석 리포트: 명쾌한 진단</h3>
            
            {/* 조작 지수 */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-700">숨은 의도 강도 (조작 지수)</h4>
                    <span className="font-bold text-2xl text-red-500">85점 (높음)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden border border-gray-300">
                    <div className="bg-gradient-to-r from-amber-400 to-red-500 h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
            </div>

            {/* 핵심 의도 */}
            <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
                <h4 className="text-sm font-semibold text-gray-500 mb-1">AI가 판단한 핵심 의도</h4>
                <p className="text-xl font-bold text-blue-600">금전적 이득 유도</p>
            </div>

            {/* 감지된 유형 */}
            <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">감지된 주요 설득 전략</h4>
                <div className="space-y-3">
                    <div className="flex items-center bg-white p-3 rounded-lg border border-gray-200">
                        <div className={`flex-shrink-0 p-2 rounded-lg bg-yellow-100 text-yellow-600`}>
                            {React.cloneElement(frame1.icon, { className: 'h-5 w-5' })}
                        </div>
                        <span className="font-semibold text-gray-800 ml-3">{frame1.name}</span>
                        <span className="ml-auto font-mono text-red-500 font-semibold">92점</span>
                    </div>
                    <div className="flex items-center bg-white p-3 rounded-lg border border-gray-200">
                         <div className={`flex-shrink-0 p-2 rounded-lg bg-orange-100 text-orange-600`}>
                            {React.cloneElement(frame2.icon, { className: 'h-5 w-5' })}
                        </div>
                        <span className="font-semibold text-gray-800 ml-3">{frame2.name}</span>
                        <span className="ml-auto font-mono text-red-500 font-semibold">85점</span>
                    </div>
                </div>
            </div>
            
            {/* AI 코칭 */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                 <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                    <span>AI의 비판적 사고 코칭</span>
                </h4>
                <p className="text-gray-800 leading-relaxed pl-1">
                    <strong className="font-semibold text-blue-700">"높은 수익을 약속하지만, 그 근거가 명확한가요?"</strong> 와 같은 핵심 질문을 스스로에게 던져보는 것이 중요합니다.
                </p>
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

                <div className="grid grid-cols-1 lg:grid-cols-5 items-center gap-8 md:gap-12">
                    {/* Before */}
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-bold text-center text-gray-600 mb-4">BEFORE: 혼란스러운 정보</h3>
                        <div className="relative h-80 flex items-center justify-center p-4">
                            <div className="absolute bg-white rounded-xl border border-gray-200 shadow-lg p-4 w-64 transform -rotate-6 opacity-80 hover:opacity-100 transition-opacity">
                                <h4 className="font-bold text-sm text-gray-700">월 1,000만원 '자동수익'</h4>
                                <p className="text-xs text-gray-500 mt-1">지금 아니면 평생 후회...</p>
                            </div>
                             <div className="absolute bg-white rounded-xl border border-gray-200 shadow-lg p-4 w-64 transform rotate-3 scale-95 translate-y-8 opacity-80 hover:opacity-100 transition-opacity">
                                <h4 className="font-bold text-sm text-gray-700">의사도 모르는 진실?</h4>
                                <p className="text-xs text-gray-500 mt-1">이것 하나만 끊으면...</p>
                            </div>
                            <div className="absolute bg-white rounded-xl border border-gray-200 shadow-lg p-4 w-64 transform rotate-12 scale-90 -translate-y-12 opacity-80 hover:opacity-100 transition-opacity">
                                <h4 className="font-bold text-sm text-gray-700">OOO 때문에 나라가...</h4>
                                <p className="text-xs text-gray-500 mt-1">우리 아이들의 미래는...</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="flex justify-center items-center">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-400 transform lg:-rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>
                         <span className="text-2xl font-bold text-blue-600 ml-4">X-Ray</span>
                    </div>

                    {/* After */}
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-bold text-center text-blue-600 mb-4">AFTER: 명쾌한 분석</h3>
                        <CleanAnalysisReport />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ValueProposition;
