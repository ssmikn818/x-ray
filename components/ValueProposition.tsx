import React from 'react';

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center h-full flex flex-col items-center group">
        <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
    </div>
);

const ValueProposition: React.FC = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                <div className="text-center mb-20 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                        텍스트의 진짜 얼굴,<br className="md:hidden" /> AI가 밝혀드립니다
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        X-Ray는 단순한 분석을 넘어, 당신의 현명한 정보 소비를 돕습니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <FeatureCard
                        icon="🔍"
                        title="3초 만에 파악하는 핵심 의도"
                        description="길고 복잡한 글도 AI가 한 문장으로 요약해 드립니다. 겉으로 드러나지 않는 진짜 목적을 꿰뚫어 보세요."
                     />
                     <FeatureCard
                        icon="🛡️"
                        title="조작 지수와 위험도 측정"
                        description="감정적 선동, 논리적 비약, 과장된 약속 등을 분석하여 이 글이 얼마나 신뢰할 수 있는지 수치로 보여줍니다."
                     />
                     <FeatureCard
                        icon="🧠"
                        title="나를 지키는 비판적 사고"
                        description="AI가 던지는 날카로운 '해독제 질문'을 통해 정보에 휘둘리지 않고 스스로 생각하는 힘을 길러줍니다."
                     />
                </div>
            </div>
        </section>
    );
};

export default ValueProposition;