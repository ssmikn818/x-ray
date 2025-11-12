import React from 'react';

interface ExampleCardProps {
  title: string;
  content: string[];
  icon: React.ReactNode;
}

const ExampleCard: React.FC<ExampleCardProps> = ({ title, content, icon }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 flex flex-col h-full transform transition-transform duration-300 hover:-translate-y-1">
      <div className="flex-grow">
        <div className="flex items-start space-x-4 mb-4">
            <div className="flex-shrink-0 text-gray-400 mt-1">{icon}</div>
            <h4 className="text-xl font-bold text-gray-800">{title}</h4>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200/80 text-gray-600 space-y-2 mb-4">
          {content.map((line, index) => <p key={index}>{line}</p>)}
        </div>
      </div>
    </div>
  );
};

const FrustratingContentShowcase: React.FC = () => {
    const examples: ExampleCardProps[] = [
        {
            title: "월 1,000만원 '자동수익'의 비밀",
            content: [
                "딱 3일만 따라하면 당신도 경제적 자유를 얻을 수 있습니다.",
                "지금 신청하지 않으면 평생 후회할 마지막 기회!"
            ],
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>
        },
        {
            title: "OOO 때문에 나라가 망해가고 있습니다!",
            content: [
                "정신차리지 않으면 우리 아이들의 미래는 없습니다. 저들 때문에 모든 것이 무너지고 있습니다.",
                "순수한 우리들의 가치를 지키기 위해 지금 당장 행동해야 합니다."
            ],
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        },
        {
            title: "당신이 매일 먹는 OO, 사실은 1급 독극물?",
            content: [
                "의사들은 절대 말해주지 않는 음식의 충격적인 진실!",
                "이것 하나만 끊어도 모든 병이 사라집니다. 지금 바로 확인하세요."
            ],
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
        }
    ];

  return (
    <div className="bg-gray-100/50 p-8 md:p-12 rounded-2xl border border-gray-200 animate-fade-in">
        <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                혹시, 이런 글 때문에 불편하셨나요?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                우리를 지치게 만드는 수많은 콘텐츠들. X-Ray는 바로 이런 글에 숨겨진 의도를 파악하기 위해 만들어졌습니다.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {examples.map((example, index) => (
                <ExampleCard key={index} {...example} />
            ))}
        </div>
    </div>
  );
};

export default FrustratingContentShowcase;