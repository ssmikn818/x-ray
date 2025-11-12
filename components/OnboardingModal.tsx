import React from 'react';

interface StepProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ icon, title, children }) => (
    <div className="flex items-start space-x-5">
        <div className="flex-shrink-0 mt-1 bg-blue-100 text-blue-600 rounded-full h-10 w-10 flex items-center justify-center">
            {icon}
        </div>
        <div>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <div className="text-lg text-gray-600 leading-relaxed mt-1">{children}</div>
        </div>
    </div>
);


const OnboardingModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 md:p-10 border border-gray-200 shadow-2xl space-y-8 transform transition-all">
        <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug">X-Ray에 오신 것을 환영합니다!</h2>
            <p className="text-gray-600 mt-2 text-xl leading-relaxed">AI로 콘텐츠의 진짜 의도를 꿰뚫어 보세요.</p>
        </div>

        <div className="space-y-6 border-t border-b border-gray-200 py-6">
            <Step
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-4 3H9m-4 4h2m-4 4h2m4-8h2m-4 4h2" /></svg>}
                title="1. 넘쳐나는 정보들"
            >
               <p>우리가 매일 보는 뉴스, 댓글, SNS 게시물. 겉으로는 그럴듯해 보여도, 그 속에는 교묘한 설득 기술이 숨어있을 수 있습니다.</p>
            </Step>
            <Step
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
                title="2. 숨은 의도 탐지"
            >
                <p>
                  논리 대신 감정을 자극해 <strong className="font-semibold text-gray-800">'편을 가르거나'</strong>, <strong className="font-semibold text-gray-800">'불안감을 조성'</strong>하여 비판적 사고를 마비시키려는 <strong className="font-semibold text-blue-600">'숨은 의도'</strong>를 발견합니다.
                </p>
            </Step>
            <Step
                 icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                title="3. 현명한 판단"
            >
                <p>
                    X-Ray는 당신의 미디어 리터러시 코치입니다. 정보의 홍수 속에서 <strong className="font-semibold text-gray-800">휘둘리지 않고 현명하게 판단</strong>하도록 돕습니다.
                </p>
            </Step>
        </div>

        <div className="text-center">
            <button
                onClick={onClose}
                className="w-full sm:w-auto px-10 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white text-xl"
            >
                시작하기
            </button>
            <p className="text-sm text-gray-500 mt-3">분석 내용은 저장되지 않으니 안심하세요.</p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
