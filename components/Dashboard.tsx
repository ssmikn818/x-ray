import React, { useState } from 'react';
import { WeeklyReportData, NarrativeFrameId } from '../types';
import { NARRATIVE_FRAMES } from '../constants';

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

const CombinedCoachingWarningPreview: React.FC = () => (
    <div className="grid grid-cols-1 gap-6 h-full">
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200/80 shadow-inner h-full flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">AI 생각 습관 진단 예시</h3>
            <div className="bg-blue-50/75 p-5 rounded-lg text-lg text-gray-700 leading-relaxed border border-blue-200/50">
               <p>이번 주에는 <strong className="font-bold text-gray-900">'편 가르기'</strong> 유형의 콘텐츠를 가장 많이 보셨네요. 세상을 '우리'와 '적'으로 나누는 이야기에 자주 귀를 기울이셨다는 의미일 수 있어요.</p>
               <br/>
               <p>이런 관점은 소속감을 느끼게 해주기도 하지만, 자칫 <u>다른 생각에 마음을 닫게 만들 수도 있답니다.</u></p>
            </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200/80 shadow-inner h-full flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">에코 체임버 경고 예시</h3>
            <div className="bg-amber-50 border border-amber-200 rounded-xl shadow-md p-5 flex items-start space-x-4">
                <div className="flex-shrink-0 text-amber-500 mt-1">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </div>
                <div className="text-lg text-amber-800 leading-relaxed">
                     <h4 className="font-bold text-xl text-amber-900 mb-2">에코 체임버 경고</h4>
                     <p>최근 <strong className="font-semibold text-amber-900">'불안감 조성'</strong> 유형의 소비가 급증했어요. 비슷한 이야기만 계속 접하면 생각의 울타리를 치게 될 수 있답니다.</p>
                </div>
            </div>
        </div>
    </div>
);


const ExtensionPreview: React.FC = () => (
    <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700 shadow-2xl h-full flex flex-col">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="flex-grow bg-gray-700 h-8 rounded-md flex items-center px-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6.364-3.636l-1.414 1.414M21 12h-2M4 12H2m15.636-6.364l-1.414-1.414M6.364 6.364L4.95 4.95M12 5V3m6.364 12.364l1.414 1.414M4.95 19.05l1.414-1.414" /></svg>
                <span>youtube.com/watch?v=...</span>
            </div>
        </div>
        {/* Content Area */}
        <div className="flex-grow bg-black rounded-lg relative overflow-hidden">
            {/* Mock video player */}
            <div className="w-full h-full object-cover opacity-50 bg-gray-900" />
            <div className="absolute inset-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white opacity-70" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
            </div>
            {/* X-Ray Overlay */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg w-2/3 max-w-sm animate-fade-in border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    <h5 className="font-bold text-gray-800 text-lg">X-Ray 실시간 분석</h5>
                </div>
                <div className="space-y-1 text-gray-700">
                    <p>• <strong className="text-purple-600">불안감 조성</strong>: 78%</p>
                    <p>• <strong className="text-amber-600">특정 대상 탓하기</strong>: 45%</p>
                </div>
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
        a: '그럼요. 입력하신 텍스트는 분석 목적으로만 사용되며 서버에 저장되지 않습니다. 개인정보 보호를 최우선으로 생각합니다. 브라우저 확장 프로그램 등 자동 분석 기능 출시 시에도 데이터는 사용자의 기기 내에서 처리하는 것을 원칙으로 할 것입니다.',
    },
    {
        q: '어떤 종류의 글을 분석할 수 있나요?',
        a: '뉴스 기사, 블로그 포스트, 소셜 미디어 게시물, 댓글 등 의도가 담길 수 있는 모든 텍스트를 분석할 수 있습니다. 향후 확장 프로그램이 출시되면 유튜브 영상, 웹페이지 전체를 자동으로 분석할 수 있게 됩니다.',
    },
    {
        q: '분석 결과는 얼마나 정확한가요?',
        a: '최신 AI 기술을 사용하여 높은 정확도를 목표로 하지만, 모든 분석은 참고용으로 활용하시는 것이 좋습니다. AI는 때로 맥락을 완벽하게 이해하지 못할 수 있습니다.',
    },
];

const FinalCTA: React.FC = () => (
    <div className="text-center py-16 px-8 bg-white border border-gray-200 shadow-lg rounded-2xl my-24">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
           가장 먼저 새로운 기능을 만나보세요
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            X-Ray의 정식 출시 소식을 이메일로 가장 먼저 알려드립니다.
        </p>
        <div className="mt-10 max-w-2xl mx-auto">
             <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="이메일 주소를 입력해주세요" required className="flex-grow px-5 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" />
                <button type="submit" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                    출시 알림 받기
                </button>
             </form>
             <p className="text-sm text-gray-500 mt-4">스팸은 보내지 않아요! 오직 X-Ray의 새로운 소식만 알려드립니다.</p>
        </div>
    </div>
);


const Dashboard: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-24">
      {/* Unified Hero Section */}
      <div className="text-center pt-16">
        <h2 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            텍스트 분석을 넘어, <br className="hidden md:block" />
            <span className="text-blue-600">당신의 미디어 생활 전체를 케어합니다</span>
        </h2>
        <p className="mt-6 max-w-3xl mx-auto text-xl lg:text-2xl text-gray-600">
            X-Ray는 당신이 소비하는 모든 콘텐츠를 더 깊이 이해하고, 건강한 정보 소비 습관을 만들 수 있도록 돕는 강력한 도구입니다. 정식 출시될 핵심 기능들을 미리 만나보세요.
        </p>
      </div>
      
      {/* Features Section */}
      <div className="space-y-12">
        <FeatureSection
            title="주간 리포트로 소비 습관 파악"
            description="어떤 유형의 콘텐츠를 주로 소비하는지 한눈에 파악하고, 숨겨진 소비 습관을 발견하세요. 지난주와 비교하여 소비 패턴의 변화를 추적하고 나의 콘텐츠 소비 패턴을 점검할 수 있습니다."
        >
            <WeeklyReportPreview />
        </FeatureSection>
        
        <FeatureSection
            title="AI 코칭 & 편향성 경고"
            description="나의 소비 데이터에 기반한 맞춤형 AI 코칭으로 미디어 리터러시를 키워보세요. 정보 편향이 한쪽으로 심해지면 AI가 선제적으로 알려드려 확증 편향의 함정에서 벗어나도록 돕습니다."
            imagePosition="left"
        >
            <CombinedCoachingWarningPreview />
        </FeatureSection>

        <FeatureSection
            title="브라우저 확장 프로그램으로 실시간 분석"
            description="유튜브, 뉴스 사이트 등 지금 보고 있는 모든 콘텐츠의 숨은 의도를 실시간으로 자동 분석하세요. 더 이상 복사해서 붙여넣을 필요 없이, X-Ray가 알아서 똑똑하게 분석해드립니다."
        >
            <ExtensionPreview />
        </FeatureSection>
      </div>

      <FinalCTA />

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