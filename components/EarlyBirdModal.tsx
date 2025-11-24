import React, { useState } from 'react';

interface EarlyBirdModalProps {
  onClose: () => void;
}

const EarlyBirdModal: React.FC<EarlyBirdModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Mock submission latency
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset after showing success
      setTimeout(() => {
        onClose();
      }, 3000); // Wait 3 seconds so user sees the success state before closing
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 animate-fade-in backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl border border-gray-100">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        {isSubmitted ? (
            <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">신청이 완료되었습니다!</h3>
                <p className="text-gray-600">평생 무료 이용권이 포함된 출시 소식을<br/>가장 먼저 메일로 보내드릴게요.</p>
            </div>
        ) : (
            <div>
                <div className="text-center mb-6">
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Limited Offer</span>
                    <h3 className="text-2xl font-bold text-gray-900 mt-4 leading-snug">
                        🎉 축하합니다!<br/>얼리버드 혜택 대상입니다.
                    </h3>
                    <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                        현재 개발 막바지 단계입니다. 출시 후에는 <span className="line-through text-gray-400">월 4,900원</span>으로 유료화될 예정입니다.<br/>
                        <strong className="text-gray-800">지금 이메일을 남겨주시면 평생 무료 이용권을 가장 먼저 보내드립니다.</strong>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">이메일 주소</label>
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="example@email.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3.5 px-4 bg-gray-900 text-white font-bold rounded-lg shadow-lg hover:bg-gray-800 transform hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? '처리 중...' : '평생 무료 혜택 받기'}
                    </button>
                    <p className="text-xs text-center text-gray-400 flex items-center justify-center gap-1 mt-3">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                        스팸은 절대 보내지 않습니다. 85명이 이미 신청했습니다.
                    </p>
                </form>
            </div>
        )}
      </div>
    </div>
  );
};

export default EarlyBirdModal;