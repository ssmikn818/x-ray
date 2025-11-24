import React from 'react';

const FrustratingContentShowcase: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16 md:py-24 animate-fade-in border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                    이런 메시지, 받아보신 적 있나요?
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                   매일 쏟아지는 정보 속에서 나도 모르게 흔들리고 있다면, 당신의 탓이 아닙니다.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Case 1: KakaoTalk Style (Investment Scam) */}
                <div className="bg-[#bacee0] p-4 rounded-xl shadow-lg border border-gray-200 flex flex-col h-full transform transition-transform duration-300 hover:-translate-y-2">
                    <div className="flex items-center mb-4 space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center border border-gray-400/30 overflow-hidden">
                             <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-800">김미영 팀장</span>
                            <span className="text-[10px] text-gray-600">오후 2:30</span>
                        </div>
                    </div>
                    <div className="bg-white p-3.5 rounded-lg shadow-sm text-sm text-gray-800 leading-relaxed relative ml-1">
                        <div className="absolute -left-1.5 top-3 w-3 h-3 bg-white transform rotate-45"></div>
                        <p>
                            [긴급] 회원님은 현재 <strong>상위 1% '시크릿 정보방'</strong> 입장 가능 대상자입니다.<br/><br/>
                            3일만 따라오시면 <strong>수익률 1000%</strong> 보장해 드립니다. 놓치면 후회합니다!<br/><br/>
                            👉 지금 바로 입장: bit.ly/secret...
                        </p>
                    </div>
                </div>

                {/* Case 2: News Headline Style (Fear Mongering) */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col h-full transform transition-transform duration-300 hover:-translate-y-2 overflow-hidden">
                    <div className="h-40 bg-gray-200 flex items-center justify-center relative">
                        <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-4 3H9m-4 4h2m-4 4h2m4-8h2m-4 4h2" /></svg>
                        <div className="absolute bottom-0 left-0 bg-red-600 text-white text-xs font-bold px-3 py-1">속보</div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                        <span className="text-blue-600 font-bold text-xs mb-2">사회 > 이슈</span>
                        <h3 className="text-xl font-bold text-gray-900 leading-snug mb-3">
                            "이대로 가면 대한민국 망한다"... 충격적인 진실 공개
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-3">
                            전문가들은 입을 모아 경고하고 있습니다. 지금 당장 행동하지 않으면 우리의 미래는 없습니다. 저들의 음모를 막아야...
                        </p>
                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-400">
                             <span>OO일보</span>
                             <span>댓글 3,928</span>
                        </div>
                    </div>
                </div>

                {/* Case 3: SMS/Messenger Style (Smishing/Scare) */}
                <div className="bg-gray-50 rounded-xl shadow-lg border border-gray-200 flex flex-col h-full transform transition-transform duration-300 hover:-translate-y-2 overflow-hidden">
                    <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                         <span className="font-bold text-gray-700">안전 안내 문자</span>
                         <span className="text-xs text-gray-400">방금 전</span>
                    </div>
                    <div className="p-4 flex flex-col space-y-4 flex-grow bg-white">
                        <div className="flex flex-col space-y-2">
                             <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-[95%] self-start">
                                <p className="text-gray-800 text-sm leading-relaxed">
                                    [필독] 의사들은 절대 알려주지 않는 <strong>'항암 식품'</strong>의 진실! 🤫
                                </p>
                            </div>
                             <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-[95%] self-start">
                                <p className="text-gray-800 text-sm leading-relaxed">
                                    이거 모르고 드시면 <strong>독</strong>을 먹는 것과 같습니다. 사랑하는 가족을 위해 지금 확인하세요.
                                </p>
                            </div>
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center space-x-3 cursor-pointer hover:bg-blue-100 transition-colors">
                                <div className="bg-blue-200 p-2 rounded-lg">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">충격적인 영상 보기</p>
                                    <p className="text-xs text-gray-500 truncate">youtube.com/watch?v=...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default FrustratingContentShowcase;