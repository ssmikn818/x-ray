import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between max-w-screen-2xl">
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              X-Ray <span className="text-gray-500 font-light text-3xl">| 숨은 의도 분석기</span>
            </h1>
        </div>
        <button className="hidden lg:block px-5 py-2.5 bg-blue-600 text-white font-bold rounded-lg transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg">
            출시 알림 신청
        </button>
      </div>
    </header>
  );
};

export default Header;