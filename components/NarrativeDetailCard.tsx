import React, { useState } from 'react';
import { NarrativeFrameId } from '../types';
import { NARRATIVE_FRAMES } from '../constants';

interface NarrativeDetailCardProps {
  narrativeId: NarrativeFrameId;
  percentage: number;
  currentValue: number;
  previousValue: number;
}

const TrendIndicator: React.FC<{ change: number }> = ({ change }) => {
    if (change === 0) {
        return <span className="text-gray-500 text-lg">--</span>;
    }
    const isUp = change > 0;
    const symbol = isUp ? '▲' : '▼';
    const color = isUp ? 'text-red-500' : 'text-green-500';

    return (
        <span className={`${color} font-semibold text-lg`}>
            {symbol} {Math.abs(change)}%
        </span>
    );
};

const NarrativeDetailCard: React.FC<NarrativeDetailCardProps> = ({ narrativeId, percentage, currentValue, previousValue }) => {
  const narrative = NARRATIVE_FRAMES[narrativeId];
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const totalPrevious = previousValue > 0 ? previousValue : 1; // Avoid division by zero
  const changePercentage = previousValue > 0 ? Math.round(((currentValue - previousValue) / totalPrevious) * 100) : (currentValue > 0 ? 100 : 0);

  return (
    <div className={`relative ${narrative.color} bg-opacity-10 p-4 rounded-xl border border-transparent hover:border-current transition-all duration-300`}>
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${narrative.color} text-white`}>
                    {React.cloneElement(narrative.icon, { className: 'h-7 w-7' })}
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800 text-xl">{narrative.name}</h4>
                    <p className="text-lg text-gray-600">소비 비중 {percentage.toFixed(1)}%</p>
                </div>
            </div>
            <div className="text-right">
                <TrendIndicator change={changePercentage} />
                <p className="text-base text-gray-500">지난주 대비</p>
            </div>
        </div>
        <button
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            aria-label={`${narrative.name}에 대해 더 알아보기`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
        {isTooltipVisible && (
            <div className="absolute z-20 bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 bg-white text-gray-700 text-lg rounded-lg py-2 px-3 text-center shadow-xl border border-gray-200 pointer-events-none">
                {narrative.description}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-white" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.05))' }}></div>
            </div>
        )}
    </div>
  );
};

export default NarrativeDetailCard;