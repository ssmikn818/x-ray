import React from 'react';
import { NARRATIVE_FRAMES } from '../constants';

interface OnboardingModalProps {
  onClose: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl max-w-3xl w-full p-8 border border-gray-200 shadow-2xl space-y-6">
        <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-blue-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <h2 className="text-4xl font-bold text-gray-900">X-Ray에 오신 것을 환영합니다!</h2>
            <p className="text-gray-600 mt-2 text-2xl">콘텐츠의 진짜 의도를 꿰뚫어 보세요.</p>
        </div>

        <div>
            <h3 className="text-2xl font-semibold text-blue-600 mb-2">혹시, 이런 글 본 적 있나요?</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
                우리가 보는 뉴스, 댓글, SNS 게시물에는 글쓴이의 '숨은 의도'가 담겨 있을 때가 많습니다.
                X-Ray는 이런 의도들을 쉽게 파악해서, 우리가 정보에 휘둘리지 않고 중심을 잡을 수 있도록 도와주는 서비스입니다.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
            {Object.values(NARRATIVE_FRAMES).map(frame => (
                <div key={frame.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-100">
                    <div className={`mt-1 flex-shrink-0 p-2 rounded-full ${frame.color} text-white`}>
                       {React.cloneElement(frame.icon, {className: "h-6 w-6"})}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">{frame.name}</p>
                        <p className="text-gray-500 text-base">{frame.description}</p>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="text-center pt-4">
            <button
                onClick={onClose}
                className="w-full sm:w-auto px-12 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white text-2xl"
            >
                시작하기
            </button>
            <p className="text-base text-gray-500 mt-4">모든 분석은 인공지능이 수행하며, 사용자의 어떤 정보도 저장하지 않습니다.</p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;