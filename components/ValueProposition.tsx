import React from 'react';

// --- 기능별 시각적 예시 컴포넌트들 (대형화 및 리디자인) ---

// 1. 핵심 의도 요약
const VisualSummary: React.FC = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-center">
        <h3 className="text-sm font-semibold text-blue-600 tracking-wider uppercase mb-2">AI 분석 요약</h3>
        <p className="text-2xl font-bold tracking-tight text-gray-800 leading-relaxed">
            "금전적 이득을 목적으로, 사용자의 FOMO(소외되는 것에 대한 불안감)를 자극하여 성급한 구매를 유도합니다."
        </p>
    </div>
);

// 2. 조작 지수 측정
const VisualGauge: React.FC = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
         <div className="flex justify-between items-end mb-2">
            <h4 className="text-lg font-bold text-gray-800">조작 지수</h4>
            <div>
                <span className="font-bold text-4xl text-red-600">82</span>
                <span className="text-gray-500 font-semibold ml-1"> / 100</span>
            </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-red-600 h-full rounded-full" style={{ width: `82%` }}></div>
        </div>
        <p className="text-right mt-2 font-semibold text-lg text-red-600">높음</p>
    </div>
);

// 3. 문제 문장 하이라이트
const VisualHighlights: React.FC = () => (
    <div className="bg-gray-50 text-gray-800 rounded-xl border border-gray-200 p-6 text-lg leading-relaxed shadow-lg hover:shadow-xl transition-shadow duration-300">
        <p>
            ...월 1,000만원 '자동수익'의 비밀, 지금 바로 공개합니다. 제 AI 자동매매 프로그램을 사용하면 <mark className="bg-exaggerated-promises/30 px-1 rounded">누구나 3일 만에 경제적 자유를 얻을 수 있습니다</mark>. <mark className="bg-urgency-fomo/40 px-1 rounded">지금 신청하지 않으면 평생 후회할 마지막 기회</mark>! 선착순 100명에게만 제공되는 특별 혜택을...
        </p>
    </div>
);

// 4. 비판적 사고 '해독제'
const VisualAntidote: React.FC = () => (
     <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 space-y-4">
        <div className="flex items-start">
            <span className="text-2xl mr-4 mt-[-2px]" aria-hidden="true">🧐</span>
            <p className="text-lg font-semibold text-gray-800">
                이 '비밀'은 왜 소수의 사람들에게만, 그것도 지금 공개되는 걸까요?
            </p>
        </div>
        <div className="flex flex-wrap gap-3 pl-10">
            <div className="bg-blue-50 text-blue-800 px-3 py-1.5 rounded-lg border border-blue-200 text-base">
                정말 효과가 있다면 왜 더 많은 사람과 공유하지 않을까?
            </div>
            <div className="bg-blue-50 text-blue-800 px-3 py-1.5 rounded-lg border border-blue-200 text-base">
                '마지막 기회'라는 말로 성급한 결정을 유도하는 건 아닐까?
            </div>
        </div>
    </div>
);

interface FeatureShowcaseProps {
    title: string;
    description: string;
    children: React.ReactNode;
    imageSide?: 'left' | 'right';
}

const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ title, description, children, imageSide = 'right' }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className={`space-y-4 ${imageSide === 'left' ? 'lg:order-last' : ''}`}>
            <h3 className="text-3xl font-bold text-gray-900 leading-tight">{title}</h3>
            <p className="text-xl text-gray-600 leading-relaxed">{description}</p>
        </div>
        <div className={`mt-6 lg:mt-0 ${imageSide === 'left' ? 'lg:order-first' : ''}`}>
            {children}
        </div>
    </div>
);


// --- 메인 컴포넌트 ---
const ValueProposition: React.FC = () => {
    return (
        <section className="py-16 md:py-24 bg-gray-50/50">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-relaxed mb-4">
                        텍스트의 진짜 얼굴, AI가 밝혀드립니다
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        X-Ray는 단순한 분석을 넘어, 당신이 더 현명하게 정보를 소비하도록 돕는 4가지 핵심 기능을 제공합니다.
                    </p>
                </div>

                <div className="space-y-20 md:space-y-28">
                    <FeatureShowcase
                        title="1. 핵심 의도 파악: 그래서 하고 싶은 말이 뭔데?"
                        description="긴 글을 읽고도 그래서 뭐 어쩌라는 건지 헷갈릴 때가 있죠. X-Ray는 텍스트의 최종 목적과 숨은 의도를 한 문장으로 명확하게 요약해줍니다."
                        imageSide="right"
                    >
                        <VisualSummary />
                    </FeatureShowcase>

                    <FeatureShowcase
                        title="2. 위험도 측정: 이 글, 얼마나 믿어야 할까?"
                        description="감정적인 언어, 과장된 주장, 논리적 오류 등을 종합하여 텍스트의 '조작 지수'를 측정합니다. 위험도가 높을수록 더 신중하게 읽어야 한다는 신호입니다."
                        imageSide="left"
                    >
                        <VisualGauge />
                    </FeatureShowcase>
                    
                    <FeatureShowcase
                        title="3. 설득 기술 탐지: 어떤 말로 나를 흔들고 있을까?"
                        description="저자가 당신의 마음을 움직이기 위해 어떤 기술을 사용하는지 정확히 짚어냅니다. 교묘하게 숨겨진 설득의 장치들을 눈으로 직접 확인하세요."
                        imageSide="right"
                    >
                        <VisualHighlights />
                    </FeatureShowcase>

                    <FeatureShowcase
                        title="4. 비판적 사고 코칭: 어떻게 다르게 생각할 수 있을까?"
                        description="분석으로 끝나지 않습니다. X-Ray는 당신이 한 걸음 더 나아가 비판적으로 생각할 수 있도록, 날카로운 '해독제 질문'을 던져줍니다."
                        imageSide="left"
                    >
                        <VisualAntidote />
                    </FeatureShowcase>
                </div>
            </div>
        </section>
    );
};

export default ValueProposition;