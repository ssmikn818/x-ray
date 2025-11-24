
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-50/90 backdrop-blur-sm sticky top-0 z-20 border-b border-slate-200">
      <div className="container mx-auto px-4 md:px-8 py-5 flex items-center justify-between max-w-7xl">
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              X-Ray <span className="text-gray-500 font-light text-2xl hidden sm:inline">| 숨은 의도 분석기</span>
            </h1>
        </div>

        <div className="hidden lg:flex items-center">
            <button className="px-6 py-2 bg-gray-900 text-white font-bold rounded-lg shadow-md transition-all duration-300 hover:bg-gray-800 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-base flex items-center gap-2">
                <span>🚀</span>
                <span>X-Ray Pro 사전 예약</span>
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
