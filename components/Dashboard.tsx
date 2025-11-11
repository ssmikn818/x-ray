import React, { useState } from 'react';
import { WeeklyReportData, NarrativeFrameId } from '../types';
import { NARRATIVE_FRAMES } from '../constants';
import ConsumptionAnalysis from './ConsumptionAnalysis';

// Mock data remains the same for the preview
const MOCK_DATA: WeeklyReportData = {
  currentWeek: [
    { id: NarrativeFrameId.UsVsThem, name: '편 가르기', value: 35 },
    { id: NarrativeFrameId.FearMongering, name: '불안감 조성', value: 25 },
    { id: NarrativeFrameId.ThreatToValues, name: '위기감 조성', value: 20 },
    { id: NarrativeFrameId.Scapegoating, name: '특정 대상 탓하기', value: 15 },
    { id: NarrativeFrameId.PastGlory, name: '과거 미화하기', value: 5 },
  ],
  previousWeek: [
    { id: NarrativeFrameId.UsVsThem, name: '편 가르기', value: 30 },
    { id: NarrativeFrameId.FearMongering, name: '불안감 조성', value: 20 },
    { id: NarrativeFrameId.ThreatToValues, name: '위기감 조성', value: 22 },
    { id: NarrativeFrameId.Scapegoating, name: '특정 대상 탓하기', value: 18 },
    { id: NarrativeFrameId.PastGlory, name: '과거 미화하기', value: 10 },
  ]
};

const TrendIndicator: React.FC<{ change: number }> = ({ change }) => {
    if (change === 0) {
        return <span className="text-gray-500 text-sm font-medium">--</span>;
    }
    const isUp = change > 0;
    const symbol = isUp ? '▲' : '▼';
    const color = isUp ? 'text-red-500' : 'text-green-500';

    return (
        <div className="flex items-center">
            <span className={`${color} font-semibold text-base`}>
                {symbol} {Math.abs(change)}%
            </span>
            <span className="text-xs text-gray-500 ml-1">지난주 대비</span>
        </div>
    );
};

const WeeklyReportPreview: React.FC = () => {
    const { currentWeek, previousWeek } = MOCK_DATA;
    const totalCurrentWeek = currentWeek.reduce((sum, item) => sum + item.value, 0);
    const sortedCurrentWeek = [...currentWeek].sort((a, b) => b.value - a.value);

    return (
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200/80 shadow-inner space-y-6 h-full">
            <h3 className="text-xl font-semibold text-gray-800 text-center">주간 리포트 예시</h3>
            <div className="space-y-4">
                {sortedCurrentWeek.map(item => {
                    const narrative = NARRATIVE_FRAMES[item.id];
                    const prevItem = previousWeek.find(p => p.id === item.id);
                    const currentValue = item.value;
                    const previousValue = prevItem?.value || 0;
                    const percentage = totalCurrentWeek > 0 ? (item.value / totalCurrentWeek) * 100 : 0;
                    const totalPrevious = previousValue > 0 ? previousValue : 1;
                    const changePercentage = previousValue > 0 ? Math.round(((currentValue - previousValue) / totalPrevious) * 100) : (currentValue > 0 ? 100 : 0);
                    
                    return (
                        <div key={item.id}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                    <div className={`p-1.5 rounded-full ${narrative.color} text-white`}>
                                        {React.cloneElement(narrative.icon, { className: 'h-5 w-5' })}
                                    </div>
                                    <span className="font-semibold text-gray-700">{narrative.name}</span>
                                </div>
                                <TrendIndicator change={changePercentage} />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex-grow bg-gray-200 rounded-full h-4 overflow-hidden">
                                    <div className={`${narrative.color}`} style={{ width: `${percentage}%`, height: '100%' }}></div>
                                </div>
                                <span className="font-mono text-sm w-12 text-right text-gray-600">{percentage.toFixed(0)}%</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const CoachingPreview: React.FC = () => (
    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200/80 shadow-inner h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">AI 생각 습관 진단 예시</h3>
        <div className="bg-blue-50/75 p-5 rounded-lg text-lg text-gray-700 leading-relaxed border border-blue-200/50">
           <p>이번 주에는 <strong className="font-bold text-gray-900">'편 가르기'</strong> 유형의 콘텐츠를 가장 많이 보셨네요. 세상을 '우리'와 '적'으로 나누는 이야기에 자주 귀를 기울이셨다는 의미일 수 있어요.</p>
           <br/>
           <p>이런 관점은 소속감을 느끼게 해주기도 하지만, 자칫 __다른 생각에 마음을 닫게 만들 수도 있답니다.__ 다음 주에는 나와 다른 의견을 가진 사람의 이야기는 어떨지 한번 찾아보는 건 어떨까요?</p>
        </div>
    </div>
);

const WarningPreview: React.FC = () => (
     <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200/80 shadow-inner h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">에코 체임버 경고 예시</h3>
        <div className="bg-amber-50 border border-amber-200 rounded-xl shadow-md p-5 flex items-start space-x-4">
            <div className="flex-shrink-0 text-amber-500 mt-1">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
            <div>
                 <h4 className="font-bold text-xl text-amber-800">에코 체임버 경고</h4>
                 <p className="text-lg text-amber-700 mt-1">최근 <strong className="font-semibold">'불안감 조성'</strong> 유형의 콘텐츠 소비가 급증했어요. 다른 관점의 이야기도 확인해 보시는 건 어떨까요?</p>
            </div>
        </div>
    </div>
);


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
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    {title}
                </h3>
                <p className="text-lg text-gray-600">
                    {description}
                </p>
            </div>
            <div className={`h-full lg:col-span-3 ${imagePosition === 'left' ? 'lg:order-first' : ''}`}>
                {children}
            </div>
        </div>
    </div>
);

const FAQItem: React.FC<{ q: string; a: string; }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 py-4">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                <span className="flex-1 pr-4">{q}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                <p className="text-gray-600 text-lg leading-relaxed">
                    {a}
                </p>
            </div>
        </div>
    );
};


const faqs = [
    {
        q: '이 서비스는 무료인가요?',
        a: '네, X-Ray의 핵심 기능은 정식 출시 후에도 무료로 제공될 예정입니다. 더 깊이 있는 분석을 위한 전문가 플랜도 준비 중입니다.',
    },
    {
        q: '제 데이터는 안전하게 관리되나요?',
        a: '그럼요. 입력하신 텍스트는 분석 목적으로만 사용되며 서버에 저장되지 않습니다. 개인정보 보호를 최우선으로 생각합니다.',
    },
    {
        q: '어떤 종류의 글을 분석할 수 있나요?',
        a: '뉴스 기사, 블로그 포스트, 소셜 미디어 게시물, 댓글 등 의도가 담길 수 있는 모든 텍스트를 분석할 수 있습니다.',
    },
    {
        q: '분석 결과는 얼마나 정확한가요?',
        a: '최신 AI 기술을 사용하여 높은 정확도를 목표로 하지만, 모든 분석은 참고용으로 활용하시는 것이 좋습니다. AI는 때로 맥락을 완벽하게 이해하지 못할 수 있습니다.',
    },
];


const Dashboard: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-24">
      {/* Top Section: Hero & CTA */}
      <div className="text-center py-16">
        <h2 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            미디어 소비 습관, <br className="hidden md:block" />
            <span className="text-blue-600">AI 리포트로 관리하세요</span>
        </h2>
        <p className="mt-6 max-w-3xl mx-auto text-xl lg:text-2xl text-gray-600">
            나도 모르게 빠져드는 확증 편향, X-Ray의 AI가 당신의 미디어 소비 패턴을 분석하고 균형 잡힌 시각을 위한 개인화 코칭을 제공합니다.
        </p>
        <div className="mt-10">
            <button
              className="px-10 py-5 bg-blue-600 text-white font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed text-2xl shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span>출시 알림 신청하고 가장 먼저 써보기</span>
              </div>
            </button>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="space-y-12">
        <FeatureSection
            title="주간 소비 패턴 분석"
            description="어떤 유형의 콘텐츠를 주로 소비하는지 한눈에 파악하고, 숨겨진 소비 습관을 발견하세요. 지난주와 비교하여 소비 패턴의 변화를 추적하고 나의 콘텐츠 소비 패턴을 점검할 수 있습니다."
        >
            <WeeklyReportPreview />
        </FeatureSection>
        
        <FeatureSection
            title="AI 개인화 코칭"
            description="나의 소비 데이터에 기반한 맞춤형 AI 코칭으로 미디어 리터러시를 키워보세요. AI가 나의 소비 습관이 가질 수 있는 영향을 분석하고, 더 균형 잡힌 시각을 위한 실천 가능한 조언을 제공합니다."
            imagePosition="left"
        >
            <CoachingPreview />
        </FeatureSection>

         <FeatureSection
            title="에코 체임버 경고"
            description="정보 편향이 한쪽으로 심해지면 AI가 선제적으로 알려드려요. 확증 편향의 함정에서 벗어나, 다양한 관점을 탐색하고 더 넓은 시야를 가질 수 있도록 돕습니다."
        >
            <WarningPreview />
        </FeatureSection>
      </div>

      {/* Final CTA Section */}
      <div className="text-center py-20 bg-white border border-gray-200/80 shadow-lg rounded-2xl my-24">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
           이제, 미디어의 숨은 의도를 <br/> 간파할 시간입니다.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            가장 먼저 X-Ray의 출시 소식을 받고, AI 리포트를 경험해보세요.
        </p>
        <div className="mt-8">
             <button
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 text-xl shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
            >
              출시 알림 신청하기
            </button>
        </div>
         <div className="mt-16 max-w-5xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-gray-700">
                출시 알림을 신청해야 하는 이유: <span className="text-blue-600">더 강력한 기능들이 준비 중입니다!</span>
            </h3>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {/* Feature 1 */}
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-blue-100 text-blue-600 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-gray-800">링크 & 영상 분석</h4>
                        <p className="mt-1 text-gray-600">텍스트뿐만 아니라 유튜브 영상, 뉴스 기사 링크만으로도 숨은 의도를 간편하게 분석할 수 있게 됩니다.</p>
                    </div>
                </div>
                {/* Feature 2 */}
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-blue-100 text-blue-600 p-3 rounded-full">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-gray-800">사이트 성향 분석</h4>
                        <p className="mt-1 text-gray-600">특정 언론사나 커뮤니티의 전체적인 논조와 편향성을 진단하여 더 큰 그림을 볼 수 있도록 돕습니다.</p>
                    </div>
                </div>
                 {/* Feature 3 */}
                <div className="flex items-start space-x-4">
                     <div className="flex-shrink-0 bg-blue-100 text-blue-600 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-gray-800">실시간 팩트체크 연동</h4>
                        <p className="mt-1 text-gray-600">분석 결과와 관련된 주요 팩트체크 정보를 함께 제공하여 정보의 신뢰도를 교차 확인할 수 있습니다.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

       {/* FAQ Section */}
       <div className="max-w-4xl mx-auto py-16">
            <h2 className="text-center text-4xl lg:text-5xl font-bold text-gray-900 mb-12">
                자주 묻는 질문 (FAQ)
            </h2>
            <div className="space-y-2">
                {faqs.map((faq, index) => <FAQItem key={index} q={faq.q} a={faq.a} />)}
            </div>
        </div>

    </div>
  );
};

export default Dashboard;