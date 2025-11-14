import React from 'react';

// --- 아이콘 컴포넌트들 ---
const IconSummarize: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const IconGauge: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const IconShield: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

const IconBrain: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);


// --- 기능별 시각적 예시 컴포넌트들 ---
const VisualSummary: React.FC = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mt-auto">
        <h3 className="text-xs font-semibold text-blue-600 tracking-wider uppercase">AI 분석 요약</h3>
        <p className="mt-1 text-lg font-bold tracking-tight text-gray-800">
            금전적 이득 유도, 성급한 구매 유도
        </p>
    </div>
);

const VisualGauge: React.FC = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mt-auto">
         <div className="flex justify-between items-end">
            <span className="text-gray-600 font-medium text-sm">조작 가능성</span>
            <div>
                <span className="font-bold text-3xl text-red-600">95</span>
                <span className="text-gray-500 font-semibold ml-1">/ 100</span>
            </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-red-600 h-full rounded-full" style={{ width: '95%' }}></div>
        </div>
    </div>
);

const VisualTactics: React.FC = () => (
     <div className="bg-white rounded-lg border border-gray-200 p-4 mt-auto space-y-2">
        <div className="text-xs flex items-center justify-between font-semibold text-gray-700">
            <span>과장된 약속</span>
            <span className="text-red-500">높음</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-red-500 h-2 rounded-full" style={{ width: `92%` }}></div>
        </div>
        <div className="text-xs flex items-center justify-between font-semibold text-gray-700">
            <span>긴급함/소외 불안감 조성</span>
            <span className="text-red-500">높음</span>
        </div>
         <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: `85%` }}></div>
        </div>
    </div>
);

const VisualAntidote: React.FC = () => (
    <div className="bg-blue-50/50 border border-blue-200/60 rounded-lg p-4 mt-auto">
        <div className="flex items-start">
             <span className="text-xl mr-3" aria-hidden="true">🧐</span>
            <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                    높은 수익을 약속하는데, 그 근거는 명확한가요?
                </p>
            </div>
        </div>
    </div>
);


interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    children: React.ReactNode;
    iconBgColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, children, iconBgColor }) => (
    <div className="bg-gray-50 rounded-2xl border border-gray-200/80 shadow-sm p-6 md:p-8 flex flex-col transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-300">
        <div className="flex-grow space-y-4">
             <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${iconBgColor}`}>
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
                {description}
            </p>
        </div>
        <div className="mt-6">
             {children}
        </div>
    </div>
);

const ValueProposition: React.FC = () => {
    const features = [
        {
            icon: <IconSummarize />,
            iconBgColor: "bg-blue-500",
            title: "핵심 의도 3초 컷",
            description: "AI가 글의 장르와 핵심 의도를 한 문장으로 요약해요. 바쁜 당신을 위해, 가장 중요한 결론부터 명확하게 제시합니다.",
            visual: <VisualSummary />
        },
        {
            icon: <IconGauge />,
            iconBgColor: "bg-red-500",
            title: "조작 가능성 수치화",
            description: "이 글이 얼마나 객관적인지, 혹은 조작적인지 0점에서 100점 사이의 점수로 보여줘요. 감정적인 내용에 휘둘리기 전, 객관적인 지표로 위험도를 먼저 확인하세요.",
            visual: <VisualGauge />
        },
        {
            icon: <IconShield />,
            iconBgColor: "bg-teal-500",
            title: "설득 기술 역추적",
            description: "'편 가르기', '불안감 조성' 등 어떤 설득 기술이 사용되었는지 정확히 찾아내요. 상대방의 전략을 알면 비판적으로 대응할 수 있는 힘이 생깁니다.",
            visual: <VisualTactics />
        },
        {
            icon: <IconBrain />,
            iconBgColor: "bg-purple-500",
            title: "비판적 사고력 강화",
            description: "단순히 분석 결과를 알려주는 것을 넘어, 스스로 생각할 힘을 길러주는 질문을 던져요. '해독제 질문'은 당신을 더 현명한 미디어 소비자로 만들어 줄 거예요.",
            visual: <VisualAntidote />
        },
    ];

    return (
        <section className="py-12 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto">
                     <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug mb-4">
                        단순한 분석을 넘어, <span className="text-blue-600">현명한 판단을 위한 4가지 도구</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        X-Ray는 복잡한 정보를 명쾌하게 분해하여 당신의 미디어 나침반이 되어줍니다. 이제 정보의 본질을 꿰뚫어 보세요.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard 
                            key={index} 
                            icon={feature.icon}
                            iconBgColor={feature.iconBgColor}
                            title={feature.title} 
                            description={feature.description}
                        >
                            {feature.visual}
                        </FeatureCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ValueProposition;
