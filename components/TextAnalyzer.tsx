import React, { useState, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { analyzeText, type AnalysisResult } from '../services/geminiService';
import { NARRATIVE_FRAMES } from '../constants';
import { NarrativeFrameId, NarrativeFrame } from '../types';
import KakaoShareButton from './KakaoShareButton';
import ExtensionReservation from './ExtensionReservation';

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const LOADING_MESSAGES = [
    "AI가 돋보기를 닦고 있습니다... 쓱싹쓱싹 🔍",
    "숨은 의도 찾는 중... 꼭꼭 숨어라 머리카락 보일라 🙈",
    "이 글의 뼈를 때리는 중입니다... 순살 제조 중 🍗",
    "라떼는 말이야... 이런 분석 사람이 밤새서 했어 ☕",
    "팩트가 어디 갔나... 현미경으로 찾는 중 🔬",
    "어그로 판독기 가동! 삐빅- 🚨",
    "중요한 건 꺾이지 않는 분석 마음... 💖",
    "뇌피셜 거름망 설치 중... 아주 촘촘하게! 🕸️",
    "잠시만요, AI도 내용을 읽고 살짝 어질어질하대요 😵‍💫",
    "행간을 읽는 중... 근데 줄간격이 너무 넓네요 📏",
    "선동인지 팩트인지, AI 판사가 입장하고 있습니다 ⚖️",
    "작성자의 마음속을 들여다보는 중... 엑스레이 촬영 📸",
    "솔직히 말해서... 저도 이 글 보고 좀 놀랐습니다 🤖",
    "가짜뉴스 탐지견 출동! 킁킁 🐶",
    "진실의 방으로... 글을 모시는 중입니다 🚪",
    "알잘딱깔센으로 분석하고 있습니다 ✨",
    "이 구역의 팩트 폭격기는 나야 나 ✈️"
];

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
                        return <strong key={segIndex} className="font-bold text-inherit">{segment.slice(2, -2)}</strong>;
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
                            return <strong key={segIndex} className="font-bold text-inherit">{segment.slice(2, -2)}</strong>;
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

// --- START: New Analysis Report Components ---

const Tooltip: React.FC<{ children: React.ReactNode; text: string; className?: string }> = ({ children, text, className }) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const ref = useRef<HTMLSpanElement>(null);

    const handleMouseEnter = () => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setPosition({
                top: rect.top,
                left: rect.left + rect.width / 2,
            });
            setVisible(true);
        }
    };

    const handleMouseLeave = () => {
        setVisible(false);
    };

    const tooltipContent = visible ? createPortal(
        <div
            className={`fixed z-50 w-72 p-3 text-sm font-medium text-white bg-gray-800 rounded-lg shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full -mt-2 ${className || ''}`}
            style={{ top: position.top, left: position.left }}
        >
            {text}
            <svg className="absolute text-gray-800 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" preserveAspectRatio="none"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
        </div>,
        document.body
    ) : null;

    return (
        <>
            <span ref={ref} className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {children}
            </span>
            {tooltipContent}
        </>
    );
};

const HighlightedText: React.FC<{ originalText: string; analysis: AnalysisResult['analysis']; }> = ({ originalText, analysis }) => {
    const highlights = useMemo(() => {
        const allSpans: { text: string; frame: NarrativeFrame; explanation: string }[] = [];
        analysis.forEach(item => {
            const frame = NARRATIVE_FRAMES[item.frameId];
            if (frame && item.evidence_spans) {
                item.evidence_spans.forEach(span => {
                    if(span.trim() !== '') {
                        allSpans.push({ text: span, frame, explanation: item.explanation });
                    }
                });
            }
        });
        const uniqueSpans = Array.from(new Map(allSpans.sort((a,b) => b.text.length - a.text.length).map(item => [item.text, item])).values());
        return uniqueSpans;
    }, [analysis]);

    if (highlights.length === 0) {
        return <p className="text-lg leading-relaxed whitespace-pre-wrap bg-gray-100 text-gray-800 p-6 rounded-xl">{originalText}</p>;
    }
    
    const regex = new RegExp(`(${highlights.map(h => escapeRegExp(h.text)).join('|')})`, 'g');
    const parts = originalText.split(regex).filter(part => part);

    return (
        <div className="text-lg leading-relaxed whitespace-pre-wrap bg-gray-100 text-gray-800 pt-12 px-6 pb-6 rounded-xl border border-gray-200 max-h-[500px] overflow-y-auto">
            {parts.map((part, index) => {
                const highlight = highlights.find(h => h.text === part);
                if (highlight) {
                    return (
                        <Tooltip key={index} text={highlight.explanation}>
                            <mark
                                className="px-1 py-0.5 rounded-md cursor-pointer"
                                style={{ backgroundColor: `${highlight.frame.hexColor}50` }} 
                            >
                                {part}
                            </mark>
                        </Tooltip>
                    );
                }
                return <span key={index}>{part}</span>;
            })}
        </div>
    );
};


const ManipulationIndexGauge: React.FC<{ score: number }> = ({ score }) => {
    const levelInfo = useMemo(() => {
        if (score > 70) {
            return {
                label: '높음',
                textColor: 'text-red-600',
                gradient: 'bg-gradient-to-r from-amber-500 to-red-600',
            };
        }
        if (score > 40) {
            return {
                label: '보통',
                textColor: 'text-amber-600',
                gradient: 'bg-gradient-to-r from-yellow-500 to-amber-500',
            };
        }
        return {
            label: '낮음',
            textColor: 'text-green-600',
            gradient: 'bg-gradient-to-r from-teal-400 to-green-500',
        };
    }, [score]);

    return (
         <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-md">
            <div className="flex justify-between items-end mb-2">
                <span className="text-gray-600 font-medium">조작 가능성</span>
                <div>
                    <span className={`font-bold text-4xl ${levelInfo.textColor}`}>{score}</span>
                    <span className="text-gray-500 font-semibold ml-1"> / 100</span>
                </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div className={`${levelInfo.gradient} h-full rounded-full transition-all duration-500`} style={{ width: `${score}%` }}></div>
            </div>
            <p className={`text-right mt-2 font-semibold text-lg ${levelInfo.textColor}`}>{levelInfo.label}</p>
        </div>
    );
};

const DetectedFrameItem: React.FC<{ frameId: NarrativeFrameId; score: number; explanation: string; }> = ({ frameId, score, explanation }) => {
    const [isOpen, setIsOpen] = useState(false);
    const frame = NARRATIVE_FRAMES[frameId];
    if (!frame) return null;

    const level = useMemo(() => {
        if (score > 70) return { label: '높음', color: 'text-red-600', barColor: 'bg-red-500' };
        if (score > 40) return { label: '보통', color: 'text-amber-600', barColor: 'bg-amber-500' };
        return { label: '낮음', color: 'text-blue-600', barColor: 'bg-blue-500' };
    }, [score]);

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white transition-shadow hover:shadow-md hover:border-gray-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center p-4 text-left focus:outline-none"
                aria-expanded={isOpen}
            >
                <div className="flex items-center space-x-3 flex-shrink-0 w-[140px] md:w-[160px]">
                    <div className={`${frame.color} bg-opacity-20 p-2 rounded-md`}>
                        {React.cloneElement(frame.icon as React.ReactElement<any>, { className: 'h-5 w-5', style: { color: frame.hexColor } })}
                    </div>
                    <span className="font-semibold text-gray-800">{frame.name}</span>
                </div>
                <div className="flex-grow flex items-center mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className={`${level.barColor} h-2.5 rounded-full`} style={{ width: `${score}%` }}></div>
                    </div>
                </div>
                <div className="flex items-center w-[100px] md:w-[120px] justify-end">
                    <span className={`font-semibold w-12 text-center ${level.color}`}>{level.label}</span>
                    <span className="font-mono font-bold text-gray-800 w-12 text-right">{score}%</span>
                     <svg className={`w-5 h-5 ml-3 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>
            {isOpen && (
                <div className="p-5 bg-gray-50 border-t border-gray-200 animate-fade-in">
                    <p className="text-gray-600 text-sm mb-2 border-b border-gray-200 pb-2 font-semibold">AI의 판단 근거:</p>
                    <FormattedText text={explanation} className="text-gray-700 leading-relaxed" />
                </div>
            )}
        </div>
    );
};

const AntidoteSection: React.FC<{ content: string }> = ({ content }) => {
    const questionBlocks = useMemo(() => {
        if (!content) return [];
        return content.split(/\n\s*\n/).map(block => {
            const lines = block.split('\n').filter(line => line.trim() !== '');
            if (lines.length === 0) return null;
            const question = lines[0];
            const thoughtPoints = lines.slice(1).map(line => line.trim().replace(/^- /, ''));
            return { question, thoughtPoints };
        }).filter((item): item is { question: string; thoughtPoints: string[] } => item !== null);
    }, [content]);


    if (questionBlocks.length === 0) {
        return null;
    }

    return (
        <div>
            <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                '해독제': 생각해볼 지점
            </h4>
            <div className="space-y-5">
                {questionBlocks.map((block, index) => (
                    <div key={index} className="bg-blue-50/50 border border-blue-200/60 rounded-xl p-5">
                        <div className="flex items-start">
                             <span className="text-2xl mr-4 mt-[-2px]" aria-hidden="true">🧐</span>
                            <div className="flex-1">
                                <p className="text-lg font-semibold text-gray-800 mb-4">
                                    <FormattedText text={block.question} />
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {block.thoughtPoints.map((point, pIndex) => (
                                        <div key={pIndex} className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 text-base">
                                            <FormattedText text={point} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- START: Digital Advisor Component ---
const detectIntentType = (intent: string) => {
  if (!intent) return 'DEFAULT';
  const financialKeywords = ['금전', '이득', '수익', '투자', '보장', '계좌', '돈', '입금'];
  const fearKeywords = ['공포', '불안', '선동', '혐오', '음모', '희생양', '위기', '파멸'];
  const marketingKeywords = ['과장', '긴급', '한정', '매진', '마감', '기회', '혜택'];
  if (financialKeywords.some(k => intent.includes(k))) return 'FINANCIAL';
  if (fearKeywords.some(k => intent.includes(k))) return 'FEAR';
  if (marketingKeywords.some(k => intent.includes(k))) return 'MARKETING';
  return 'DEFAULT';
};

const DigitalAdvisor: React.FC<{ score: number; intent: string }> = ({ score, intent }) => {
    const category = detectIntentType(intent);
    
    // Default advice (Low/Medium risk or Default category)
    let advice = {
        action: "🛡️ 경계심을 가지고 읽어야 합니다.",
        explanation: "숨겨진 의도가 감지되었습니다. 액면 그대로 믿지 말고 비판적으로 바라보세요.",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        text: "text-yellow-800"
    };

    if (score >= 70) {
        switch (category) {
            case 'FINANCIAL':
                advice = {
                    action: "⛔ 절대 링크를 누르거나 송금하지 마세요.",
                    explanation: "금전적 이득을 미끼로 사기를 치려는 전형적인 수법입니다. 즉시 삭제 및 차단하세요.",
                    bg: "bg-red-50",
                    border: "border-red-200",
                    text: "text-red-800"
                };
                break;
            case 'FEAR':
                advice = {
                    action: "🤔 사실이 아닐 확률이 높습니다.",
                    explanation: "불안감과 분노를 자극해 판단력을 흐리는 선동 문구입니다. 다른 사람에게 공유하지 마세요.",
                    bg: "bg-orange-50",
                    border: "border-orange-200",
                    text: "text-orange-800"
                };
                break;
            case 'MARKETING':
                advice = {
                    action: "💳 충동적인 결제를 멈추세요.",
                    explanation: "'마감 임박' 등으로 조급함을 유발하고 있습니다. 실제 후기를 다시 한번 검색해보세요.",
                    bg: "bg-amber-50",
                    border: "border-amber-200",
                    text: "text-amber-800"
                };
                break;
            default:
                advice = {
                    action: "🚫 매우 높은 위험이 감지되었습니다.",
                    explanation: "이 글은 당신의 판단을 조작하려는 강한 의도를 가지고 있습니다.",
                    bg: "bg-red-50",
                    border: "border-red-200",
                    text: "text-red-800"
                };
        }
    } else if (score < 40) {
         advice = {
            action: "✅ 비교적 안전한 콘텐츠입니다.",
            explanation: "하지만 언제나 비판적인 시각을 유지하는 것이 좋습니다.",
            bg: "bg-green-50",
            border: "border-green-200",
            text: "text-green-800"
        };
    }

    return (
        <div className={`${advice.bg} border ${advice.border} rounded-xl p-6 mt-6 animate-fade-in shadow-sm`}>
            <div className="flex items-start">
                 <div className="flex-shrink-0 mr-4">
                     {score >= 70 ? (
                         <span className="text-3xl">⚠️</span>
                     ) : score < 40 ? (
                         <span className="text-3xl">🌿</span>
                     ) : (
                         <span className="text-3xl">🧐</span>
                     )}
                 </div>
                <div className="flex-grow">
                    <h5 className={`text-lg font-bold ${advice.text} mb-1`}>{advice.action}</h5>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">{advice.explanation}</p>
                </div>
            </div>
        </div>
    );
};
// --- END: Digital Advisor Component ---


const AnalysisReport: React.FC<{ 
    result: AnalysisResult; 
    originalText: string; 
    isSharedMode?: boolean; 
    onReset?: () => void 
}> = ({ result, originalText, isSharedMode = false, onReset }) => {
    if (!result) return null;
    
    const isUrlAnalysis = useMemo(() => {
        const trimmedText = originalText.trim();
        return /^https?:\/\//.test(trimmedText);
    }, [originalText]);

    const [activeTab, setActiveTab] = useState('report');

    useEffect(() => {
        if (isUrlAnalysis && activeTab === 'source') {
            setActiveTab('report');
        }
    }, [isUrlAnalysis, activeTab]);


    const TabButton: React.FC<{ tabName: string; label: string; }> = ({ tabName, label }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-6 py-3 text-lg font-bold rounded-t-lg transition-colors duration-200 focus:outline-none -mb-px ${
                activeTab === tabName
                ? 'bg-white border-gray-200 border-t border-x text-blue-600'
                : 'bg-transparent text-gray-500 hover:text-gray-700 border-b border-gray-200'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="animate-fade-in space-y-8">
            {isSharedMode && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center mb-6">
                    <p className="text-blue-800 font-medium text-lg">공유받은 분석 결과입니다.</p>
                </div>
            )}

             <div className="text-center border-b border-gray-200 pb-6 mb-6">
                <h3 className="text-base font-semibold text-blue-600 tracking-wider uppercase">AI 분석 요약</h3>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl leading-tight">
                    {result.intentionSummary}
                </h2>
                <p className="mt-3 text-lg text-gray-500">
                    이 글의 장르는 AI에 의해 <strong className="text-gray-700 font-semibold">'{result.genre}'</strong>(으)로 판단되었어요.
                </p>
            </div>
            
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-stretch">
                    <div className="flex-grow">
                        <h4 className="text-xl font-bold text-gray-800 mb-3 text-center">숨은 의도 강도 (조작 지수)</h4>
                        <ManipulationIndexGauge score={result.manipulationIndex} />
                        
                        {/* Digital Advisor for Shared Mode */}
                        {isSharedMode && (
                            <DigitalAdvisor score={result.manipulationIndex} intent={result.intentionSummary} />
                        )}
                    </div>
                    {!isSharedMode && (
                        <div className="flex flex-col justify-end">
                            <KakaoShareButton 
                                score={result.manipulationIndex} 
                                intentionSummary={result.intentionSummary} 
                                originalText={originalText}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Hide Tabs in Shared Mode because we don't have the full analysis data */}
            {!isSharedMode && (
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-2 justify-center" aria-label="Tabs">
                        <TabButton tabName="report" label="종합 리포트" />
                        {!isUrlAnalysis && <TabButton tabName="source" label="X-Ray 하이라이트" />}
                    </nav>
                </div>
            )}
            
            <div className={`bg-white p-6 md:p-8 rounded-b-2xl border ${!isSharedMode ? 'border-t-0' : 'rounded-t-2xl'} border-gray-200 shadow-lg`}>
                 {activeTab === 'report' && (
                    <div className="animate-fade-in space-y-8">
                        {!isSharedMode && (
                            <div>
                                <h4 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    <span>AI가 찾아낸 주요 설득 전략</span>
                                </h4>
                                {result.analysis.length > 0 ? (
                                    <div className="space-y-3">
                                        {result.analysis
                                            .sort((a, b) => b.score - a.score)
                                            .map((item) => <DetectedFrameItem key={item.frameId} {...item} />
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center p-6 bg-gray-100 rounded-lg border border-gray-200">
                                        <p className="text-gray-800 text-lg">특별히 감지된 숨은 의도 유형이 없습니다.</p>
                                        <p className="text-gray-600 mt-1">이 글은 중립적이거나 논리적 근거에 기반한 주장일 수 있습니다.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {result.comprehensiveAnalysis && !isSharedMode && (
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                    <h5 className="font-bold text-gray-800 text-xl mb-3 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        <span>AI 종합 분석</span>
                                    </h5>
                                    <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                                        <FormattedText text={result.comprehensiveAnalysis.summary} />
                                        <FormattedText text={result.comprehensiveAnalysis.tactics} />
                                    </div>
                                </div>
                                <AntidoteSection content={result.comprehensiveAnalysis.criticalQuestions} />
                            </div>
                        )}

                        {isSharedMode && (
                            <div className="space-y-8">
                                {/* Shared Mode Original Text Display */}
                                {originalText && (
                                    <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
                                        <h4 className="text-lg font-bold text-gray-800 mb-3">분석된 원문 내용 (일부):</h4>
                                        <div className="whitespace-pre-wrap text-gray-700 text-base leading-relaxed break-words max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                            {originalText}
                                        </div>
                                    </div>
                                )}

                                <div className="text-center py-4">
                                    <p className="text-gray-600 text-lg mb-6">
                                        상세한 분석 내용과 설득 전략은 직접 분석해보면 확인할 수 있습니다.
                                    </p>
                                    <button
                                        onClick={onReset}
                                        className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-xl"
                                    >
                                        나도 새로 분석하기
                                    </button>
                                </div>
                            </div>
                        )}

                        {!isSharedMode && <ExtensionReservation />}
                    </div>
                 )}
                 {activeTab === 'source' && !isUrlAnalysis && !isSharedMode && (
                    <div className="animate-fade-in space-y-4">
                        <p className="text-center text-gray-500">원본 텍스트에서 AI가 탐지한 숨은 의도 유형들을 확인해보세요. 하이라이트된 부분에 마우스를 올리면 AI의 분석 내용을 볼 수 있습니다.</p>
                        <HighlightedText originalText={originalText} analysis={result.analysis} />
                    </div>
                 )}
            </div>
        </div>
    );
};

// --- END: New Analysis Report Components ---

interface TextAnalyzerProps {
  sharedData?: { score: number; intent: string; text?: string } | null;
  onClearSharedData?: () => void;
}

const TextAnalyzer: React.FC<TextAnalyzerProps> = ({ sharedData, onClearSharedData }) => {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSharedMode, setIsSharedMode] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);

    useEffect(() => {
        if (sharedData) {
            setIsSharedMode(true);
            setResult({
                genre: '공유된 분석 결과',
                intentionSummary: sharedData.intent,
                manipulationIndex: sharedData.score,
                analysis: [], // Details not available from URL params
                comprehensiveAnalysis: {
                    summary: '',
                    tactics: '',
                    criticalQuestions: ''
                }
            });
            if (sharedData.text) {
                setText(sharedData.text);
            }
        }
    }, [sharedData]);

    // Effect for rotating loading messages
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined;
        if (isLoading) {
             // Set initial random message
            setLoadingMessage(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);

            interval = setInterval(() => {
                setLoadingMessage(prev => {
                    // Pick a random message different from the current one (simple retry logic)
                    let nextMsg = LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
                    while (nextMsg === prev && LOADING_MESSAGES.length > 1) {
                         nextMsg = LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
                    }
                    return nextMsg;
                });
            }, 3000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isLoading]);

    const handleAnalyze = async () => {
        if (!text.trim()) {
            setError('분석할 텍스트 혹은 URL을 입력해주세요.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);
        setIsSharedMode(false);

        try {
            const analysisResult = await analyzeText(text);
            setResult(analysisResult);
        } catch (err) {
            setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setResult(null);
        setText('');
        setIsSharedMode(false);
        if (onClearSharedData) {
            onClearSharedData();
        }
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-lg transition-all duration-500">
            {!isSharedMode && (
                <>
                    <h3 className="text-3xl font-semibold mb-2 text-gray-800 text-center">실시간 의도 분석</h3>
                    <p className="text-lg text-gray-500 text-center mb-6">
                        뉴스 기사, 블로그, SNS 등 분석하고 싶은 글의 텍스트나 URL을 아래에 붙여넣으세요.
                    </p>
                    <div className="flex flex-col gap-8">
                        {/* Top Section: Input */}
                        <div className="space-y-4">
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder={`여기에 분석할 텍스트 혹은 URL을 입력하세요.\n\n(예시)\n- https://news.kakao.com/v/2024... (뉴스 기사 URL)\n- "3일 만에 수익 1000% 보장!" (광고 문구)\n- "이거 안 사면 평생 후회합니다." (불안감 조성)`}
                                className="w-full h-72 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-lg resize-y bg-gray-50/50 leading-relaxed placeholder-gray-400"
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
                    </div>
                </>
            )}

            {/* Bottom Section: Output */}
            {/* Show output container if we have a result (shared or new) OR if we are loading/error */}
            {(result || isLoading || error || isSharedMode) && (
                <div className={`relative min-h-[200px] bg-gray-50 rounded-lg p-6 border border-gray-200 ${!isSharedMode ? 'mt-8' : ''}`}>
                    {isLoading ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 bg-white/80 z-10 rounded-lg">
                            <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="text-xl font-semibold animate-pulse text-gray-800 px-4 text-center">{loadingMessage}</p>
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center h-full text-center">
                            <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">{error}</div>
                        </div>
                    ) : result ? (
                        <AnalysisReport 
                            result={result} 
                            originalText={text} 
                            isSharedMode={isSharedMode} 
                            onReset={handleReset} 
                        />
                    ) : null}
                </div>
            )}
            
            {/* Default Placeholder when no input and no shared result */}
            {!result && !isLoading && !error && !isSharedMode && (
                <div className="relative min-h-[200px] bg-gray-50 rounded-lg p-6 border border-gray-200 mt-8">
                     <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <h4 className="text-xl font-semibold mb-1">분석 결과를 여기에 표시합니다</h4>
                        <p>텍스트 혹은 URL을 입력하고 분석 버튼을 눌러주세요.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TextAnalyzer;