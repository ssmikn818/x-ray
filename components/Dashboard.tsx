import React, { useState } from 'react';
import { WeeklyReportData, NarrativeFrameId } from '../types';
import NarrativeChart from './NarrativeChart';
import NarrativeDetailCard from './NarrativeDetailCard';
import ConsumptionAnalysis from './ConsumptionAnalysis';

// Mock data to make the component renderable
const mockWeeklyData: WeeklyReportData = {
  currentWeek: [
    { id: NarrativeFrameId.UsVsThem, name: '편 가르기', value: 12 },
    { id: NarrativeFrameId.FearMongering, name: '불안감 조성', value: 25 },
    { id: NarrativeFrameId.Scapegoating, name: '특정 대상 탓하기', value: 18 },
    { id: NarrativeFrameId.ExaggeratedPromises, name: '과장된 약속', value: 30 },
    { id: NarrativeFrameId.UrgencyFomo, name: '긴급함/소외 불안감 조성', value: 8 },
  ],
  previousWeek: [
    { id: NarrativeFrameId.UsVsThem, name: '편 가르기', value: 10 },
    { id: NarrativeFrameId.FearMongering, name: '불안감 조성', value: 20 },
    { id: NarrativeFrameId.Scapegoating, name: '특정 대상 탓하기', value: 22 },
    { id: NarrativeFrameId.ExaggeratedPromises, name: '과장된 약속', value: 25 },
    { id: NarrativeFrameId.UrgencyFomo, name: '긴급함/소외 불안감 조성', value: 12 },
  ],
};


const FeatureSection: React.FC<{ title: string; description: string; children: React.ReactNode; }> = ({ title, description, children }) => (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-200/80 flex flex-col">
        <h3 className="text-2xl font-bold text-gray-800 mb-3 leading-snug">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{description}</p>
        <div className="h-72">{children}</div>
    </div>
);

const WeeklyReport: React.FC<{ data: WeeklyReportData }> = ({ data }) => {
    const totalCurrent = data.currentWeek.reduce((sum, i) => sum + i.value, 0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            <div className="bg-gray-50/70 p-2 rounded-lg">
                <NarrativeChart data={data.currentWeek} />
            </div>
            <div className="space-y-2 overflow-y-auto pr-2 -mr-2">
                {data.currentWeek
                    .filter(item => item.value > 0)
                    .sort((a,b) => b.value - a.value)
                    .map(item => {
                        const prevItem = data.previousWeek.find(p => p.id === item.id);
                        const percentage = totalCurrent > 0 ? (item.value / totalCurrent) * 100 : 0;
                        return (
                            <NarrativeDetailCard 
                                key={item.id}
                                narrativeId={item.id}
                                percentage={percentage}
                                currentValue={item.value}
                                previousValue={prevItem?.value || 0}
                            />
                        );
                })}
            </div>
        </div>
    );
};


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
      // FIX: Use double quotes for the string to avoid syntax errors with inner single quotes.
      a: "X-Ray의 AI는 대규모 언어 모델(LLM)을 기반으로, 수많은 미디어 텍스트와 심리학, 논리학 이론을 학습했습니다. 이를 통해 '편 가르기', '불안감 조성' 등 사전에 정의된 7가지의 조작적 설득 기술(내러티브 프레임)의 사용 여부와 강도를 탐지합니다.",
    },
    {
      q: '분석 결과는 항상 100% 정확한가요?',
      // FIX: Use double quotes for the string to avoid syntax errors with inner single quotes.
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
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-blue-50 via-purple-50 to-rose-50 text-center mb-24">
                 <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug mb-4">
                    출시 알림 신청하고,
                    <br />
                    <span className="text-blue-600">더 강력해질 X-Ray</span>를 가장 먼저 만나보세요
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                    정식 버전에서는 텍스트 분석을 넘어, 당신의 미디어 소비 패턴 전체를 진단하고 코칭하는 개인 비서로 발전합니다. 얼리버드에게만 제공될 특별 기능들을 미리 확인해보세요.
                </p>
                
                <div className="flex justify-center mb-12">
                     <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg transition-transform hover:scale-105 duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-xl">
                        출시 알림 신청하기
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <FeatureSection title="주간 리포트" description="내가 한 주간 어떤 유형의 콘텐츠를 많이 봤는지, 생각 습관이 어떻게 변하는지 추적해보세요.">
                        <WeeklyReport data={mockWeeklyData} />
                    </FeatureSection>
                    <FeatureSection title="AI 코칭" description="소비 데이터를 바탕으로 AI가 나의 미디어 소비 습관을 진단하고, 균형 잡힌 시각을 위한 조언을 해줍니다.">
                        <div className="flex items-center justify-center h-full">
                            <ConsumptionAnalysis data={mockWeeklyData.currentWeek} />
                        </div>
                    </FeatureSection>
                    <FeatureSection title="브라우저 확장 프로그램" description="지금 보고 있는 웹페이지를 바로 분석! 기사나 영상을 보면서 실시간으로 숨은 의도를 파악하세요.">
                        <div className="flex items-center justify-center h-full flex-col text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                            <p className="mt-4 text-gray-500">출시 예정</p>
                        </div>
                    </FeatureSection>
                </div>
            </div>

            <div id="faq" className="max-w-4xl mx-auto">
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