import React from 'react';

interface OnboardingModalProps {
  onClose: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl max-w-2xl w-full p-8 md:p-12 border border-gray-200 shadow-2xl space-y-8">
        <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">X-Ray에 오신 것을 환영합니다!</h2>
            <p className="text-gray-600 mt-2 text-xl md:text-2xl leading-relaxed">AI로 콘텐츠의 진짜 의도를 꿰뚫어 보세요.</p>
        </div>

        <div className="text-gray-700 text-xl leading-relaxed text-center space-y-6">
            <p>
                우리가 매일 보는 뉴스, 댓글, SNS 게시물.
                <br />
                겉으로는 그럴듯해 보여도, 그 속에는...
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 text-xl">
                교묘하게 <strong className="text-indigo-600">'편을 가르거나'</strong>, <strong className="text-purple-600">'불안감을 조성'</strong>하는
                <br />
                <strong className="text-rose-600 font-bold">숨은 의도</strong>가 있을 수 있습니다.
            </div>

            <p className="font-semibold pt-2">
                X-Ray는 이런 설득 기술을 AI로 분석하여,
                <br />
                당신이 정보에 휘둘리지 않고 현명하게 판단하도록 돕습니다.
            </p>
        </div>
        
        <div className="text-center pt-4">
            <button
                onClick={onClose}
                className="w-full sm:w-auto px-12 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white text-xl md:text-2xl"
            >
                시작하기
            </button>
            <p className="text-base text-gray-500 mt-4">분석 내용은 저장되지 않으니 안심하세요.</p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;