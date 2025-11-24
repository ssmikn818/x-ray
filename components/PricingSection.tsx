
import React, { useState } from 'react';
import EarlyBirdModal from './EarlyBirdModal';

const PricingSection: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const scrollToAnalyzer = () => {
        const element = document.getElementById('analyzer-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-20 md:py-28 bg-gray-50" id="pricing">
            <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                        나에게 맞는 X-Ray 선택하기
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl">
                        정보의 홍수 속에서 나를 지키는 가장 현명한 방법
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
                    {/* Basic Plan (Web Tool) */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col order-2 md:order-1">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">X-Ray Basic</h3>
                            <div className="mt-4 flex items-baseline text-gray-900">
                                <span className="text-4xl font-extrabold tracking-tight">평생 무료</span>
                            </div>
                            <p className="mt-4 text-gray-500 text-sm">가끔 의심되는 문자가 올 때 직접 확인하세요.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center">
                                <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span className="text-gray-600">텍스트 복사/붙여넣기 분석</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span className="text-gray-600">기본 조작 지수 확인</span>
                            </li>
                             <li className="flex items-center text-gray-400">
                                <svg className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                <span>자동 감지 기능 없음</span>
                            </li>
                        </ul>
                        <button 
                            onClick={scrollToAnalyzer}
                            className="w-full block bg-white border border-gray-300 rounded-lg py-3 px-4 text-center text-base font-bold text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                        >
                            웹에서 바로 쓰기
                        </button>
                    </div>

                    {/* Pro Plan (Browser Extension) - Highlighted */}
                    <div className="relative bg-white rounded-2xl p-8 border-2 border-indigo-600 shadow-xl h-full flex flex-col transform md:-translate-y-4 z-10 order-1 md:order-2">
                        <div className="absolute top-0 right-0 -mt-3 -mr-3 animate-bounce">
                             <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white uppercase tracking-wide shadow-md">
                                선착순 100명 얼리버드
                            </span>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2 flex-wrap">
                                X-Ray Pro
                                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">Browser Extension</span>
                            </h3>
                            <div className="mt-4 flex items-baseline flex-wrap gap-2">
                                <span className="text-lg text-gray-400 line-through">월 4,900원</span>
                                <span className="text-5xl font-extrabold text-red-600 tracking-tight">평생 0원</span>
                            </div>
                            <p className="mt-4 text-gray-500 text-sm">설치 한 번으로 사기/선동 완벽 차단.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center">
                                <svg className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span className="text-gray-900 font-bold">Basic 기능 전부 포함</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span className="text-gray-900 font-medium">복붙 필요 없는 <span className="text-indigo-600 font-bold">'자동 분석'</span></span>
                            </li>
                             <li className="flex items-center">
                                <svg className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span className="text-gray-900 font-medium">유튜브/뉴스 실시간 위험 경고</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span className="text-gray-900 font-medium">나를 지키는 AI 비서</span>
                            </li>
                        </ul>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-full flex items-center justify-center bg-gray-900 border border-transparent rounded-lg py-4 px-4 text-center text-lg font-bold text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <span className="mr-2">🚀</span> 지금 무료로 예약하기
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && <EarlyBirdModal onClose={() => setIsModalOpen(false)} />}
        </section>
    );
};

export default PricingSection;
