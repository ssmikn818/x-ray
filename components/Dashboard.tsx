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
  '향후 계획': [
    {
      q: '앞으로 어떤 기능들이 추가될 예정인가요?',
      a: '현재는 텍스트 분석에 집중하고 있지만, 향후 이미지 및 영상 콘텐츠 분석, 실시간 웹페이지 분석을 위한 브라우저 확장 프로그램, 개인화된 미디어 리터러시 교육 콘텐츠 등 다양한 기능을 추가하여 종합적인 미디어 리터러시 솔루션으로 발전해 나갈 계획입니다.',
    },
  ]
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
        <section id="features" className="py-12 md:py-20">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 md:p-12 rounded-2xl border border-gray-200 shadow-lg text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug mb-4">
                    더 강력해질 X-Ray를 만나보세요
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                    정식 버전에서는 텍스트 분석을 넘어, 당신의 미디어 소비 패턴 전체를 진단하고 코칭하는 개인 비서로 발전할 예정입니다. 새로운 기능이 준비되면 가장 먼저 알려드릴게요.
                </p>
                <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg transition-transform hover:scale-105 duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-xl">
                    출시 알림 신청하기
                </button>
            </div>

            <div id="faq" className="max-w-4xl mx-auto mt-24">
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