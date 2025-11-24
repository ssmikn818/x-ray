
import React from 'react';

const FormattedText: React.FC<{ text: string }> = ({ text }) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
        <>
            {parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={index} className="text-indigo-700 font-bold bg-indigo-50 px-1 rounded">{part.slice(2, -2)}</strong>;
                }
                return part;
            })}
        </>
    );
};

const FeatureCard: React.FC<{ icon: string; title: string; painPoint: string; solution: string }> = ({ icon, title, painPoint, solution }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col group relative overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

        <div className="text-center mb-8">
            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block filter drop-shadow-sm">{icon}</div>
            <h3 className="text-2xl font-bold text-gray-900 leading-snug break-keep">{title}</h3>
        </div>

        <div className="flex-grow flex flex-col justify-between space-y-6">
            {/* Pain Point Section */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 relative">
                <div className="absolute -top-3 left-4 bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    Problem
                </div>
                <p className="text-gray-600 italic font-medium leading-relaxed text-sm md:text-base">
                    "{painPoint}"
                </p>
            </div>

            {/* Connecting Arrow (Visual only) */}
            <div className="text-center text-gray-300 -my-2">
                <svg className="w-6 h-6 mx-auto animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>

            {/* Solution Section */}
            <div className="px-1 pb-2">
                <div className="text-blue-600 text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                     <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                     Solution
                </div>
                <p className="text-lg text-gray-800 font-medium leading-relaxed">
                    <FormattedText text={solution} />
                </p>
            </div>
        </div>
    </div>
);

const ValueProposition: React.FC = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                <div className="text-center mb-20 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                        그럴듯한 말에 더 이상 속지 마세요.<br className="md:hidden" /> X-Ray가 진실을 꿰뚫어 봅니다.
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        복잡한 정보 속에서 길을 잃지 않도록, 가장 확실한 나침반이 되어드립니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                     <FeatureCard
                        icon="🔍"
                        title="교묘한 광고와 선동, 3초 만에 간파"
                        painPoint="길고 복잡한 글, 진짜 목적이 뭔지 헷갈리셨나요?"
                        solution="AI가 텍스트 뒤에 숨겨진 금전적 유도나 특정 의도를 찾아내어, 가장 핵심적인 한 문장으로 요약해 드립니다."
                     />
                     <FeatureCard
                        icon="🛡️"
                        title="내 감정을 조종하는 위험 신호 감지"
                        painPoint="이 글을 읽고 왜 불안하거나 화가 났을까요?"
                        solution="공포 조장, 논리 비약, 과장된 약속... 당신의 판단을 흐리는 패턴을 분석해 **'신뢰할 수 있는 점수'**로 보여줍니다."
                     />
                     <FeatureCard
                        icon="🧠"
                        title="무방비한 정보 수용을 멈추는 '해독제'"
                        painPoint="남들이 하는 말에 나도 모르게 휩쓸리고 있다면?"
                        solution="정보를 있는 그대로 믿기 전에, AI가 던지는 **'날카로운 질문'**을 통해 스스로 생각하는 힘을 길러줍니다."
                     />
                </div>
            </div>
        </section>
    );
};

export default ValueProposition;
