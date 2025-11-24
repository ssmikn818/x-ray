
import React, { useState } from 'react';

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

const Roadmap: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-b from-indigo-50/70 via-blue-50/30 to-white pt-20 pb-24 border-b border-gray-200">
       <div className="max-w-4xl mx-auto px-6 text-center mb-24 animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-white border-2 border-indigo-600 rounded-full px-6 py-3 mb-8 shadow-lg transform hover:scale-105 transition-transform duration-300">
             <span className="text-indigo-700 font-black tracking-wider uppercase text-lg">X-Ray Pro</span>
             <span className="bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-full">Coming Soon</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
             X-Ray는 텍스트를 넘어 영상까지,<br />
             <span className="text-indigo-600">미디어의 진실</span>을 꿰뚫어 봅니다
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
             단순한 텍스트 분석을 넘어, 영상과 이미지에 숨겨진 의도까지 파악하는<br className="hidden md:block"/>
             <span className="font-bold text-gray-800">X-Ray Pro</span>만의 강력한 기능들을 미리 만나보세요.
          </p>
       </div>

       <div className="max-w-7xl mx-auto px-6 space-y-32">
          {/* Feature 1: Video Analysis */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
             <div className="w-full md:w-[40%] order-2 md:order-1">
                <div className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4 uppercase tracking-wide">
                    Pro 기능 개발 중
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-5 leading-snug">
                   유튜브 썸네일과<br/>영상 속 표정까지 읽어냅니다
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                   텍스트뿐만 아니라, 영상의 편집 방식과 이미지에 숨겨진 미묘한 조작 의도까지 AI가 찾아냅니다.
                </p>
             </div>
             <div className="w-full md:w-[60%] order-1 md:order-2">
                {/* Mockup: Video Player */}
                <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-200 transform md:rotate-1 hover:rotate-0 transition-transform duration-500 w-full">
                    <div className="aspect-video bg-gray-100 rounded-lg relative overflow-hidden flex items-center justify-center group border border-gray-100">
                         {/* Play Button */}
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md z-10 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                        {/* Progress bar overlay */}
                        <div className="absolute bottom-6 right-6 left-6 bg-white/90 backdrop-blur-md rounded-lg p-4 flex items-center gap-4 shadow-sm border border-gray-100">
                             <div className="text-sm font-bold text-blue-600 whitespace-nowrap animate-pulse">AI 분석 중...</div>
                             <div className="h-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                                 <div className="h-full bg-blue-500 w-2/3 rounded-full relative overflow-hidden">
                                     <div className="absolute inset-0 bg-white/30 w-full animate-[shimmer_1s_infinite] -translate-x-full"></div>
                                 </div>
                             </div>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-5">
                        <div className="w-14 h-14 bg-gray-100 rounded-full flex-shrink-0"></div>
                        <div className="flex-grow space-y-3">
                            <div className="h-5 bg-gray-100 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-50 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
             </div>
          </div>

          {/* Feature 2: Extension */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
             <div className="w-full md:w-[60%]">
                {/* Mockup: Browser Window */}
                <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden transform md:-rotate-1 hover:rotate-0 transition-transform duration-500 relative w-full">
                     {/* Browser Header */}
                    <div className="bg-gray-100 px-5 py-4 border-b border-gray-200 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        <div className="ml-6 bg-white rounded-md h-6 w-3/4 shadow-sm border border-gray-200"></div>
                    </div>
                    <div className="p-8 relative min-h-[360px] bg-gray-50/50">
                        <div className="space-y-6 opacity-40 grayscale">
                            <div className="h-8 bg-gray-300 rounded w-3/4 mb-6"></div>
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-300 rounded w-4/5"></div>
                             <div className="h-4 bg-gray-300 rounded w-full"></div>
                        </div>
                        
                        {/* Popup Card */}
                        <div className="absolute top-16 right-10 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-blue-100 p-6 w-72 animate-[fadeIn_0.5s_ease-out]">
                            <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
                                <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-white">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <span className="text-base font-bold text-gray-800">X-Ray 분석</span>
                            </div>
                            <div className="space-y-3">
                                <div className="h-2.5 bg-blue-50 rounded-full w-full"></div>
                                <div className="h-2.5 bg-blue-50 rounded-full w-2/3"></div>
                                <div className="h-2.5 bg-blue-50 rounded-full w-3/4"></div>
                            </div>
                            <div className="mt-4 text-xs text-gray-400 font-medium">자동 감지됨</div>
                        </div>
                    </div>
                </div>
             </div>
             <div className="w-full md:w-[40%]">
                <div className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4 uppercase tracking-wide">
                    베타 테스터 모집 중
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-5 leading-snug">
                   설치 한 번으로,<br/>인터넷이 안전해집니다
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                   뉴스 기사든 SNS 피드든, 클릭할 필요도 없이 자동으로 분석하고 숨은 의도를 경고해 드립니다.
                </p>
             </div>
          </div>

          {/* Feature 3: Dashboard */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
             <div className="w-full md:w-[40%] order-2 md:order-1">
                <div className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4 uppercase tracking-wide">
                    Pro 기능
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-5 leading-snug">
                   나도 모르게 선동당하고 있을까?<br/>AI가 진단해 드립니다
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                   내가 자주 보는 뉴스나 유튜브 채널을 분석해, 어떤 설득 전략에 약한지 알려드립니다. 복잡한 공부 없이, 나만을 위한 맞춤형 피드백을 받아보세요.
                </p>
             </div>
             <div className="w-full md:w-[60%] order-1 md:order-2">
                {/* Mockup: Dashboard */}
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 w-full">
                    <div className="flex justify-between items-center mb-8">
                        <h4 className="font-bold text-xl text-gray-800">나의 미디어 소비 대시보드</h4>
                        <div className="w-10 h-10 rounded-full bg-gray-100"></div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1 bg-gray-50 rounded-xl p-6 border border-gray-100">
                            <div className="text-sm font-semibold text-gray-500 mb-4">주요 소비 유형</div>
                            <div className="space-y-4">
                                <div className="h-4 bg-indigo-400 rounded-full w-full shadow-sm"></div>
                                <div className="h-4 bg-rose-400 rounded-full w-2/3 shadow-sm"></div>
                                <div className="h-4 bg-amber-400 rounded-full w-4/5 shadow-sm"></div>
                            </div>
                        </div>
                        <div className="flex-1 bg-blue-50 rounded-xl p-6 border border-blue-100 flex flex-col justify-between">
                            <div>
                                <div className="text-sm font-bold text-blue-600 mb-3">AI 코칭 💡</div>
                                <p className="text-sm text-blue-800 leading-relaxed font-medium">
                                    '불안감 조성' 유형의 콘텐츠를 자주 보고 있어요.
                                </p>
                            </div>
                            <div className="text-xs font-bold text-blue-600 cursor-pointer hover:underline mt-4">
                                → 사실 확인 훈련하기
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<FaqCategory>('서비스 이용');
    
    return (
        <section id="features" className="bg-white">
            <Roadmap />
            {/* FAQ 섹션 */}
            <div id="faq" className="max-w-4xl mx-auto pt-20 pb-24 md:py-24 scroll-mt-24 px-4">
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
