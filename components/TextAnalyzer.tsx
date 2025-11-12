import React, { useState, useMemo } from 'react';
import { analyzeText, type AnalysisResult } from '../services/geminiService';
import { NARRATIVE_FRAMES } from '../constants';
import { NarrativeFrameId } from '../types';

const FormattedText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
    const renderBlocks = useMemo(() => {
        if (!text) return null;
        const blocks = [];
        const lines = text.split('\n');
        let currentList: React.ReactNode[] = [];

        const flushList = () => {
            if (currentList.length > 0) {
                blocks.push(<ul key={`ul-${blocks.length}`} className="space-y-1">{currentList}</ul>);
                currentList = [];
            }
        };

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmedLine = line.trim();
            
            if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
                const content = trimmedLine.substring(2);
                const segments = content.split(/(\*\*.*?\*\*|__.*?__)/g).filter(Boolean);
                const renderedSegments = segments.map((segment, segIndex) => {
                     if (segment.startsWith('**') && segment.endsWith('**')) {
                        return <strong key={segIndex} className="font-bold text-gray-900">{segment.slice(2, -2)}</strong>;
                    }
                    if (segment.startsWith('__') && segment.endsWith('__')) {
                        return <u key={segIndex}>{segment.slice(2, -2)}</u>;
                    }
                    return <span key={segIndex}>{segment}</span>;
                });
                currentList.push(
                    <li key={`li-${i}`} className="flex items-start">
                        <span className="mr-3 mt-1.5 text-blue-500 flex-shrink-0">&#8226;</span>
                        <span className="flex-1">{renderedSegments}</span>
                    </li>
                );
            } else {
                flushList();
                if (trimmedLine !== '') {
                    const segments = line.split(/(\*\*.*?\*\*|__.*?__)/g).filter(Boolean);
                    const renderedSegments = segments.map((segment, segIndex) => {
                        if (segment.startsWith('**') && segment.endsWith('**')) {
                            return <strong key={segIndex} className="font-bold text-gray-900">{segment.slice(2, -2)}</strong>;
                        }
                        if (segment.startsWith('__') && segment.endsWith('__')) {
                            return <u key={segIndex}>{segment.slice(2, -2)}</u>;
                        }
                        return <span key={segIndex}>{segment}</span>;
                    });
                     blocks.push(<p key={`p-${i}`} className="mb-2">{renderedSegments}</p>);
                } else if (i < lines.length - 1 && lines[i+1].trim() !== '') {
                     blocks.push(<br key={`br-${i}`} />);
                }
            }
        }
        flushList();
        return blocks;
    }, [text]);

    return <div className={className}>{renderBlocks}</div>;
};


interface ResultCardProps {
    frameId: NarrativeFrameId;
    score: number;
    explanation: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ frameId, score, explanation }) => {
    const frame = NARRATIVE_FRAMES[frameId];
    if (!frame) return null;

    const scoreColor = score > 70 ? 'text-red-500' : score > 40 ? 'text-amber-500' : 'text-green-600';
    
    const textColorClass = useMemo(() => {
        switch(frameId) {
            case NarrativeFrameId.UsVsThem: return 'text-indigo-600';
            case NarrativeFrameId.FearMongering: return 'text-purple-600';
            case NarrativeFrameId.Scapegoating: return 'text-amber-600';
            case NarrativeFrameId.PastGlory: return 'text-teal-600';
            case NarrativeFrameId.ThreatToValues: return 'text-rose-600';
            case NarrativeFrameId.ExaggeratedPromises: return 'text-yellow-500';
            case NarrativeFrameId.UrgencyFomo: return 'text-orange-600';
            default: return 'text-gray-800';
        }
    }, [frameId]);


    return (
        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center space-x-3 mb-3">
                <div className={`flex-shrink-0 p-2 rounded-lg ${frame.color} bg-opacity-20 ${textColorClass}`}>
                    {React.cloneElement(frame.icon, { className: 'h-6 w-6' })}
                </div>
                <h6 className={`font-bold text-xl ${textColorClass}`}>{frame.name}</h6>
                <span className={`font-mono font-bold text-xl ml-auto ${scoreColor}`}>{score}점</span>
            </div>
            <div className="space-y-3 text-xl">
                 <FormattedText text={explanation} className="text-gray-700 leading-relaxed"/>
                 <p className="text-gray-500 text-base border-t border-gray-200 pt-3 mt-4 leading-relaxed">
                     💡 {frame.description}
                 </p>
            </div>
        </div>
    );
};

interface AnalysisSummaryProps {
  score: number;
  genre: string;
  intentionSummary: string;
}

const AnalysisSummary: React.FC<AnalysisSummaryProps> = ({ score, genre, intentionSummary }) => {
    const levelInfo = useMemo(() => {
        if (score > 70) {
            return {
                level: '높음',
                color: 'bg-red-500',
                textColor: 'text-red-600',
            };
        }
        if (score > 40) {
            return {
                level: '보통',
                color: 'bg-amber-500',
                textColor: 'text-amber-600',
            };
        }
        return {
            level: '낮음',
            color: 'bg-green-600',
            textColor: 'text-green-700',
        };
    }, [score]);
    
    return (
        <div className="p-6 bg-white rounded-xl border border-gray-200">
            <h5 className="font-bold text-gray-800 text-xl mb-4 text-center">종합 분석 요약</h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                 {/* Left side: Level */}
                <div className="text-center bg-gray-50 p-4 rounded-lg border border-gray-200 h-full flex flex-col justify-center">
                     <p className="text-gray-500 text-base">숨은 의도 강도</p>
                     <p className={`mt-1 font-bold text-3xl ${levelInfo.textColor}`}>{levelInfo.level}</p>
                </div>
                {/* Middle side: Intention */}
                 <div className="text-center bg-gray-50 p-4 rounded-lg border border-gray-200 h-full flex flex-col justify-center">
                     <p className="font-semibold text-gray-500 text-base">AI가 판단한 핵심 의도</p>
                     <p className={`px-3 py-1 mt-1 text-xl font-bold text-white rounded-full inline-block ${levelInfo.color}`}>{intentionSummary || '분석 중...'}</p>
                 </div>
                 {/* Right side: Genre */}
                 <div className="text-center bg-gray-50 p-4 rounded-lg border border-gray-200 h-full flex flex-col justify-center">
                     <p className="font-semibold text-gray-500 text-base">글의 유형</p>
                     <p className="font-bold text-blue-600 text-3xl mt-1">{genre}</p>
                 </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3.5 mt-5 overflow-hidden">
                <div className={`${levelInfo.color} h-3.5 rounded-full transition-all duration-500`} style={{ width: `${score}%` }}></div>
            </div>
        </div>
    );
};


const TextAnalyzer: React.FC = () => {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async () => {
        if (!text.trim()) {
            setError('분석할 텍스트를 입력해주세요.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const analysisResult = await analyzeText(text);
            setResult(analysisResult);
        } catch (err) {
            setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-lg transition-all duration-500">
            <h3 className="text-3xl font-semibold mb-6 text-gray-800 text-center">실시간 의도 분석</h3>
            <div className="flex flex-col gap-8">
                {/* Top Section: Input */}
                <div className="space-y-4">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="여기에 분석하고 싶은 글을 붙여넣으세요. (뉴스 기사, 댓글, SNS 게시물 등)"
                        className="w-full h-72 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-lg resize-y bg-gray-50/50 leading-relaxed"
                        disabled={isLoading}
                        rows={12}
                    />
                    <button
                        onClick={handleAnalyze}
                        disabled={isLoading || !text.trim()}
                        className="w-full px-6 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed text-xl"
                    >
                        {isLoading ? '분석 중...' : '숨은 의도 분석하기'}
                    </button>
                </div>

                {/* Bottom Section: Output */}
                <div className="relative min-h-[200px] bg-gray-50 rounded-lg p-6 border border-gray-200">
                    {isLoading ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600">
                            <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="text-xl font-semibold">AI가 분석하고 있습니다...</p>
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center h-full text-center">
                            <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">{error}</div>
                        </div>
                    ) : result ? (
                        <div className="animate-fade-in space-y-8">
                            
                             {typeof result.manipulationIndex === 'number' && (
                                <div>
                                    <h4 className="text-2xl font-bold text-gray-900 mb-4">분석 요약</h4>
                                    <AnalysisSummary score={result.manipulationIndex} genre={result.genre} intentionSummary={result.intentionSummary}/>
                                </div>
                            )}

                            <div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-4">감지된 숨은 의도 유형</h4>
                                {result.analysis.length > 0 ? (
                                    <div className="space-y-4">
                                        {result.analysis
                                            .sort((a, b) => b.score - a.score)
                                            .map((item) => <ResultCard key={item.frameId} {...item} />
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center p-6 bg-white rounded-lg border">
                                        <p className="text-gray-600 text-lg">특별히 감지된 숨은 의도 유형이 없습니다.</p>
                                        <p className="text-gray-500 mt-1">이 글은 중립적이거나 논리적 근거에 기반한 주장일 수 있습니다.</p>
                                    </div>
                                )}
                            </div>
                            
                            {result.comprehensiveAnalysis && (
                            <div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span>AI 종합 분석 리포트</span>
                                </h4>
                                <div className="bg-white p-6 rounded-lg border border-gray-200 text-xl space-y-6">
                                  <div className="border-b border-gray-200 pb-4">
                                      <h5 className="font-bold text-gray-800 text-xl mb-2">핵심 의도 분석</h5>
                                      <FormattedText text={result.comprehensiveAnalysis.summary} className="text-gray-800 leading-relaxed"/>
                                  </div>
                                  <div className="border-b border-gray-200 pb-4">
                                      <h5 className="font-bold text-gray-800 text-xl mb-2">주요 설득 전략</h5>
                                      <FormattedText text={result.comprehensiveAnalysis.tactics} className="text-gray-800 leading-relaxed"/>
                                  </div>
                                  <div>
                                      <h5 className="font-bold text-gray-800 text-xl mb-2">비판적 사고를 위한 제언</h5>
                                      <FormattedText text={result.comprehensiveAnalysis.advice} className="text-gray-800 leading-relaxed"/>
                                  </div>
                                </div>
                            </div>
                            )}
                        </div>
                    ) : (
                         <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            <h4 className="text-xl font-semibold mb-1">분석 결과를 여기에 표시합니다</h4>
                            <p>텍스트를 붙여넣고 분석 버튼을 눌러주세요.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TextAnalyzer;