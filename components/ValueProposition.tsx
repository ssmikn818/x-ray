import React from 'react';
import { NARRATIVE_FRAMES } from '../constants';
import { NarrativeFrameId } from '../types';

// Dashboard.tsx의 FeatureSection 컴포넌트를 재사용하여 일관된 디자인을 유지합니다.
interface FeatureSectionProps {
    title: string;
    description: string;
    children: React.ReactNode;
    imagePosition?: 'left' | 'right';
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ title, description, children, imagePosition = 'right' }) => (
    <div className="bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className={`space-y-4 lg:col-span-2 ${imagePosition === 'left' ? 'lg:order-last' : ''}`}>
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
                    {title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                    {description}
                </p>
            </div>
            <div className={`h-full lg:col-span-3 ${imagePosition === 'left' ? 'lg:order-first' : ''}`}>
                {children}
            </div>
        </div>
    </div>
);

// 시각적 이해를 돕기 위한 목업 컴포넌트들
const MockAnalysisSummary: React.FC = () => {
    return (
        <div className="p-6 bg-white rounded-xl border-2 border-gray-200 shadow-xl">
             <div className="grid grid-cols-2 gap-4 items-center">
                <div className="text-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                     <p className="text-gray-500 text-sm">숨은 의도 강도</p>
                     <p className={`mt-1 font-bold text-3xl text-red-600`}>높음</p>
                </div>
                 <div className="text-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                     <p className="font-semibold text-gray-500 text-sm">AI가 판단한 핵심 의도</p>
                     <p className={`px-3 py-1 mt-1 text-xl font-bold text-white rounded-full inline-block bg-red-500`}>금전적 이득 유도</p>
                 </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3.5 mt-5 overflow-hidden">
                <div className={`bg-red-500 h-3.5 rounded-full`} style={{ width: `85%` }}></div>
            </div>
        </div>
    );
};

const MockResultCards: React.FC = () => {
    const frame1 = NARRATIVE_FRAMES[NarrativeFrameId.ExaggeratedPromises];
    const frame2 = NARRATIVE_FRAMES[NarrativeFrameId.UrgencyFomo];
    return (
        <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border-2 border-gray-200 shadow-xl">
                 <div className="flex items-center space-x-3">
                    <div className={`flex-shrink-0 p-2 rounded-lg bg-yellow-400 bg-opacity-20 text-yellow-500`}>
                        {React.cloneElement(frame1.icon, { className: 'h-6 w-6' })}
                    </div>
                    <h6 className={`font-bold text-xl text-yellow-500`}>{frame1.name}</h6>
                    <span className={`font-mono font-bold text-xl ml-auto text-red-500`}>92점</span>
                </div>
            </div>
             <div className="bg-white p-4 rounded-xl border-2 border-gray-200 shadow-xl">
                 <div className="flex items-center space-x-3">
                    <div className={`flex-shrink-0 p-2 rounded-lg bg-orange-500 bg-opacity-20 text-orange-600`}>
                        {React.cloneElement(frame2.icon, { className: 'h-6 w-6' })}
                    </div>
                    <h6 className={`font-bold text-xl text-orange-600`}>{frame2.name}</h6>
                    <span className={`font-mono font-bold text-xl ml-auto text-red-500`}>85점</span>
                </div>
            </div>
        </div>
    );
};

const FormattedTextMock: React.FC<{ text: string; }> = ({ text }) => (
    <div className="flex items-start">
        <span className="mr-3 mt-1.5 text-blue-500 flex-shrink-0">&#8226;</span>
        <span className="flex-1">{text.split(/(\*\*.*?\*\*)/g).map((part, i) => 
            part.startsWith('**') ? <strong key={i} className="font-bold text-gray-900">{part.slice(2,-2)}</strong> : part
        )}</span>
    </div>
);
const MockAIReport: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg border-2 border-gray-200 text-lg space-y-4 shadow-xl">
          <div>
              <h5 className="font-bold text-gray-800 text-lg mb-2">비판적 사고를 위한 제언</h5>
              <div className="text-gray-800 leading-relaxed space-y-1">
                <FormattedTextMock text="**'누구나'**, **'무조건'** 등의 절대적인 표현에 주의하기" />
                <FormattedTextMock text="**높은 수익**에 대한 구체적인 근거나 데이터가 제시되었는지 확인하기" />
              </div>
          </div>
        </div>
    );
};


const ValueProposition: React.FC = () => {
    return (
        <div className="py-12">
            <div className="text-center mb-16">
                 <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug mb-4">
                    X-Ray가 <span className="text-blue-600">명쾌하게 해결해 드립니다</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    방금 보신 것과 같은 교묘한 콘텐츠, 더 이상 감정적으로 반응할 필요가 없습니다. X-Ray의 AI 분석으로 숨은 의도를 객관적으로 파악하고 현명하게 대처하세요.
                </p>
            </div>

            <div className="space-y-12">
                <FeatureSection
                    title="감정은 잠시 내려놓고, 데이터로 핵심을 보세요."
                    description="X-Ray는 감정적인 언어 뒤에 숨은 설득 기술을 객관적인 데이터로 분해합니다. '조작 지수'와 '숨은 의도 유형' 분석을 통해 휘둘리지 않고 한 걸음 떨어져 상황을 볼 수 있는 힘을 길러줍니다."
                >
                    <MockAnalysisSummary />
                </FeatureSection>
                
                <FeatureSection
                    title="단순 '긍정/부정'을 넘어, '어떻게' 설득하는지 알려드립니다."
                    description="이 글이 왜 불편하게 느껴졌을까요? X-Ray는 '편 가르기', '불안감 조성' 등 구체적인 설득 전략을 짚어줍니다. 이제 막연한 찝찝함 대신 명확한 근거를 가지고 콘텐츠를 판단할 수 있습니다."
                    imagePosition="left"
                >
                    <MockResultCards />
                </FeatureSection>

                <FeatureSection
                    title="단순 탐지를 넘어, 당신의 '미디어 리터러시'를 코칭합니다."
                    description="분석은 끝이 아닌 시작입니다. AI 종합 리포트는 콘텐츠의 핵심 의도를 요약하고, 설득 전략을 분석하며, 비판적인 시각을 위한 제언까지 제공합니다. X-Ray는 당신의 든든한 미디어 리터러시 코치가 되어 드립니다."
                >
                    <MockAIReport />
                </FeatureSection>
            </div>
        </div>
    );
};

export default ValueProposition;