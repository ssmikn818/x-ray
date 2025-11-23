import React, { useState } from 'react';

const ExtensionReservation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        setIsModalOpen(false);
        setIsSubmitted(false);
        setEmail('');
      }, 2000); // Wait 2 seconds so user sees the success state before closing
    }, 1500);
  };

  return (
    <>
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between shadow-sm transition-shadow hover:shadow-md">
        <div className="mb-6 md:mb-0 md:mr-6 text-center md:text-left">
            <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                매번 복사해서 붙여넣기 귀찮으시죠?
            </h4>
            <p className="text-gray-600 text-base md:text-lg">
                크롬 확장 프로그램을 설치하면, <span className="font-semibold text-blue-600">뉴스나 유튜브를 볼 때 자동으로</span> 숨은 의도를 분석해 드립니다.
            </p>
        </div>
        <button
            onClick={() => setIsModalOpen(true)}
            className="flex-shrink-0 px-6 py-3 bg-gray-900 text-white font-bold rounded-lg shadow-lg hover:bg-gray-800 transform hover:-translate-y-0.5 transition-all duration-200"
        >
            🚀 확장 프로그램 베타 테스터 신청하기 (무료)
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl">
            <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            
            <div className="text-center mb-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">베타 테스터 신청</h3>
                <p className="text-gray-600 mt-2">이메일을 남겨주시면 확장 프로그램 출시 소식을 가장 먼저 알려드립니다.</p>
            </div>

            {isSubmitted ? (
                <div className="text-center py-8">
                    <div className="text-green-500 text-5xl mb-4">✓</div>
                    <p className="text-xl font-bold text-gray-800">신청이 완료되었습니다!</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">이메일 주소</label>
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="example@email.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? '처리 중...' : '신청 완료'}
                    </button>
                </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ExtensionReservation;