import React, { useState, useEffect, useMemo } from 'react';
import { NarrativeDataPoint } from '../types';
import { generateConsumptionAnalysis } from '../services/geminiService';


const FormattedText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
    const parts = useMemo(() => {
        if (!text) return [];
        return text.split('\n').map((line, lineIndex) => {
            if (line.trim() === '') return <br key={`br-${lineIndex}`} />;
            
            const segments = line.split(/(\*\*.*?\*\*|__.*?__)/g).filter(Boolean);

            return (
                <p key={lineIndex} className="mb-2">
                    {segments.map((segment, segIndex) => {
                        if (segment.startsWith('**') && segment.endsWith('**')) {
                            return <strong key={segIndex} className="font-bold text-gray-900">{segment.slice(2, -2)}</strong>;
                        }
                        if (segment.startsWith('__') && segment.endsWith('__')) {
                            return <u key={segIndex}>{segment.slice(2, -2)}</u>;
                        }
                        return <span key={segIndex}>{segment}</span>;
                    })}
                </p>
            );
        });
    }, [text]);

    return <div className={className}>{parts}</div>;
};


interface ConsumptionAnalysisProps {
    data: NarrativeDataPoint[];
}

const ConsumptionAnalysis: React.FC<ConsumptionAnalysisProps> = ({ data }) => {
    const [analysis, setAnalysis] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getAnalysis = async () => {
            if (!data || data.length === 0) {
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            setError(null);
            try {
                const result = await generateConsumptionAnalysis(data);
                setAnalysis(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : '분석 내용을 불러오는 데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        getAnalysis();
    }, [data]);

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div className="mt-8 border-t border-gray-200 pt-6">
            <h4 className="text-3xl font-semibold mb-4 text-gray-900">AI 생각 습관 진단</h4>
            <div className="bg-blue-50/75 p-6 rounded-lg text-lg text-gray-700 leading-relaxed border border-blue-200/50 min-h-[150px]">
                {isLoading && <p>AI 코치가 데이터를 분석하고 있습니다...</p>}
                {error && <p className="text-red-600">{error}</p>}
                {!isLoading && !error && (
                    <FormattedText text={analysis} />
                )}
            </div>
        </div>
    );
};

export default ConsumptionAnalysis;