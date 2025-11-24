import React, { useState } from 'react';

// --- Placeholder Mockups for Upcoming Features ---
const ImageVideoAnalysisMockup: React.FC = () => (
    <svg className="w-full h-auto rounded-lg bg-white border border-gray-200" viewBox="0 0 400 250">
        <rect width="400" height="250" fill="#f9fafb" />
        <rect x="20" y="20" width="360" height="180" rx="8" fill="#e5e7eb" />
        <circle cx="200" cy="110" r="30" fill="#9ca3af" opacity="0.5" />
        <path d="M185 95 L225 110 L185 125 Z" fill="white" />
        <rect x="20" y="210" width="150" height="15" rx="4" fill="#d1d5db" />
        <g className="text-blue-500" stroke="currentColor" strokeWidth="2">
            <line x1="250" y1="210" x2="380" y2="210" />
            <line x1="250" y1="220" x2="380" y2="220" />
            <path d="M250 215 h130" strokeDasharray="4 4" className="opacity-50" />
        </g>
        <text x="315" y="195" fontFamily="sans-serif" fontSize="12" fill="#6b7280" textAnchor="middle">AI 분석 중...</text>
    </svg>
);
const BrowserExtensionMockup: React.FC = () => (
    <svg className="w-full h-auto rounded-lg bg-white border border-gray-200" viewBox="0 0 400 250">
        <rect width="400" height="250" fill="#f9fafb" rx="8"/>
        <rect x="1" y="1" width="398" height="30" rx="7" ry="7" fill="#e5e7eb"/>
        <circle cx="15" cy="16" r="5" fill="#fca5a5" />
        <circle cx="30" cy="16" r="5" fill="#fcd34d" />
        <circle cx="45" cy="16" r="5" fill="#86efac" />
        <rect x="70" y="10" width="200" height="12" rx="6" fill="#d1d5db" />
        
        {/* Page Content */}
        <rect x="20" y="50" width="250" height="15" rx="4" fill="#9ca3af" />
        <rect x="20" y="80" width="360" height="8" rx="4" fill="#d1d5db" />
        <rect x="20" y="100" width="360" height="8" rx="4" fill="#d1d5db" />
        <rect x="20" y="120" width="300" height="8" rx="4" fill="#d1d5db" />
        
        {/* X-Ray Extension Popup */}
        <g transform="translate(200, 60)">
            <rect width="180" height="150" fill="white" rx="8" className="shadow-lg" stroke="#d1d5db" />
            <rect x="10" y="10" width="30" height="30" rx="6" fill="#dbeafe" />
            <path d="M17 17 L23 23 M23 17 L17 23" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
            <text x="50" y="30" fontFamily="sans-serif" fontSize="12" fill="#1e3a8a" fontWeight="bold">X-Ray 분석</text>
            <rect x="10" y="50" width="160" height="8" rx="4" fill="#e5e7eb" />
            <rect x="10" y="70" width="160" height="8" rx="4" fill="#fee2e2" />
            <rect x="10" y="90" width="120" height="8" rx="4" fill="#e5e7eb" />
        </g>
    </svg>
);
const PersonalizedCoachingMockup: React.FC = () => (
    <svg className="w-full h-auto rounded-lg bg-white border border-gray-200" viewBox="0 0 400 250">
        <rect width="400" height="250" fill="#f9fafb" />
        <text x="20" y="35" fontFamily="sans-serif" fontSize="16" fill="#111827" fontWeight="bold">나의 미디어 소비 대시보드</text>
        <g transform="translate(20, 60)">
            <rect width="160" height="150" fill="white" rx="8" stroke="#e5e7eb" />
            <text x="10" y="20" fontFamily="sans-serif" fontSize="12" fill="#374151">주요 소비 유형</text>
            <rect x="10" y="40" width="140" height="10" rx="5" fill="#a78bfa" />
            <rect x="10" y="65" width="100" height="10" rx="5" fill="#f87171" />
            <rect x="10" y="90" width="120" height="10" rx="5" fill="#fbbf24" />
        </g>
        <g transform="translate(200, 60)">
            <rect width="180" height="150" fill="#eff6ff" rx="8" stroke="#bfdbfe" />
            <text x="10" y="25" fontFamily="sans-serif" fontSize="12" fill="#1e40af" fontWeight="bold">AI 코칭 💡</text>
            <text x="10" y="50" fontFamily="sans-serif" fontSize="11" fill="#1e3a8a">'불안감 조성' 유형의</text>
            <text x="10" y="65" fontFamily="sans-serif" fontSize="11" fill="#1e3a8a">콘텐츠를 자주 보고 있어요.</text>
             <text x="10" y="95" fontFamily="sans-serif" fontSize="11" fill="#1e3a8a" className="font-semibold">→ 사실 확인 훈련하기</text>
        </g>
    </svg>
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
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-relaxed">
                {title}
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed">
                {description}
            </p>
        </div>
        <div className={`mt-6 lg:mt-0 ${imageSide === 'left' ? 'lg:order-first' : ''}`}>
            {children}
        </div>
    </div>
);

// --- FAQ 관련 컴포넌트 ---
const faqs = {
  '서비스 이용': [
    {
      q: 'X-Ray는 어떤 서비스인가요?',
      a: 'X-Ray는 AI를 이용해 뉴스 기사, SNS 게시물, 댓글 등 다양한 텍스트에 숨겨진 설득 기술이나 조작 의도를 분석해주는 미디어 리터러시 코칭 서비스입니다. 사용자가 정보에 휘둘리지 않고 비판적으로 콘텐츠를 소비하도록 돕는 것을 목표로 합니다.',
    },
    {
      q: '어떤 종류의 텍스트를 분석할 수 있나요?',
      a: '뉴스 기사, 사설, 칼럼, 블로그 포스트, SNS 게시물, 댓글 등 대부분의 텍스트 형식을 분석할 수 있습니다. 특히 감정적인 주장이 강하거나, 특정 행동을 유도하는 글을 분석할 때 더 효과적입니다.',
    },
  ],
  '데이터 및 보안': [
    {
      q: '제가 입력한 텍스트는 저장되나요?',
      a: '아니요, 저장되지 않습니다. 사용자가 입력한 텍스트는 분석을 위해 일시적으로만 사용되며, 분석이 완료된 후 즉시 폐기됩니다. 사용자의 개인정보와 프라이버시를 최우선으로 생각합니다.',
    },
    {
      q: '분석 내용은 다른 사람에게 공유되나요?',
      a: '절대 공유되지 않습니다. 모든 분석 과정은 사용자의 브라우저 내에서 독립적으로 처리되며, 분석 결과 또한 사용자 본인만 확인할 수 있습니다. 안심하고 사용하세요.',
    },
  ],
  '분석 기술': [
    {
      q: '어떤 원리로 숨은 의도를 분석하나요?',
      a: "X-Ray의 AI는 대규모 언어 모델(LLM)을 기반으로, 수많은 미디어 텍스트와 심리학, 논리학 이론을 학습했습니다. 이를 통해 '편 가르기', '불안감 조성' 등 사전에 정의된 7가지의 조작적 설득 기술(내러티브 프레임)의 사용 여부와 강도를 탐지합니다.",
    },
    {
      q: '분석 결과는 항상 100% 정확한가요?',
      a: "AI 분석 결과는 높은 정확도를 목표로 하지만, 100% 완벽하다고 보장할 수는 없습니다. 글의 맥락, 배경지식, 문화적 차이 등에 따라 해석이 달라질 수 있습니다. 분석 결과는 비판적 사고를 돕는 '참고 자료'로 활용하시고, 최종 판단은 사용자 스스로 내리는 것이 중요합니다.",
    },
  ],
};

type FaqCategory = keyof typeof faqs;

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-5">
      <button
        className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="pr-4">{q}</span>
        <svg className={`w-6 h-6 flex-shrink-0 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="mt-4 text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-md border border-gray-200/80">{a}</div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<FaqCategory>('서비스 이용');
    
    return (
        <section id="features">
            {/* 출시 예정 기능 섹션 - 확장 버전 */}
            <div id="roadmap" className="py-16 md:py-24 bg-gradient-to-br from-purple-100 via-blue-100 to-green-100 scroll-mt-24">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center mb-16 md:mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                            X-Ray는 텍스트를 넘어 영상까지,<br/>미디어의 진실을 꿰뚫어 봅니다
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            단순한 텍스트 분석을 넘어, 영상과 이미지에 숨겨진 의도까지 파악하는 종합 미디어 리터러시 솔루션으로 진화합니다. X-Ray의 미래를 기대해주세요.
                        </p>
                    </div>
                    
                    <div className="max-w-7xl mx-auto space-y-20 md:space-y-28">
                        <FeatureShowcase 
                            title="유튜브 썸네일과 영상 속 표정까지 읽어냅니다"
                            description="텍스트뿐만 아니라, 영상의 편집 방식과 이미지에 숨겨진 미묘한 조작 의도까지 AI가 찾아냅니다."
                            imageSide="right"
                        >
                            <ImageVideoAnalysisMockup />
                        </FeatureShowcase>
                        <FeatureShowcase 
                            title="설치 한 번으로, 인터넷이 안전해집니다"
                            description="뉴스 기사든 SNS 피드든, 클릭할 필요도 없이 자동으로 분석하고 숨은 의도를 경고해 드립니다."
                            imageSide="left"
                        >
                            <BrowserExtensionMockup />
                        </FeatureShowcase>
                        <FeatureShowcase 
                            title="나도 모르게 선동당하고 있을까? AI가 진단해 드립니다"
                            description="내가 자주 보는 뉴스나 유튜브 채널을 분석해, 어떤 설득 전략에 약한지 알려드립니다. 복잡한 공부 없이, 나만을 위한 맞춤형 피드백을 받아보세요."
                            imageSide="right"
                        >
                            <PersonalizedCoachingMockup />
                        </FeatureShowcase>
                    </div>

                    <div className="text-center mt-20 md:mt-24">
                        <button className="px-8 py-3 bg-gray-900 text-white font-bold rounded-lg shadow-lg hover:bg-gray-800 transition-all duration-200 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-xl inline-flex items-center justify-center gap-2">
                            <span>🚀</span>
                            <span>내 취약점 진단받기 (사전 예약)</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* FAQ 섹션 */}
            <div id="faq" className="max-w-4xl mx-auto pt-24 pb-12 md:py-20 scroll-mt-24">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">자주 묻는 질문 (FAQ)</h2>

                <div className="flex justify-center border-b border-gray-200 mb-6 space-x-2 md:space-x-4">
                    {Object.keys(faqs).map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveTab(category as FaqCategory)}
                            className={`px-3 md:px-5 py-3 text-base md:text-lg font-semibold transition-colors duration-200 focus:outline-none rounded-t-lg ${
                                activeTab === category
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-500 hover:text-gray-800'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="animate-fade-in">
                    {faqs[activeTab].map((faq, index) => (
                        <FaqItem key={index} q={faq.q} a={faq.a} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Dashboard;