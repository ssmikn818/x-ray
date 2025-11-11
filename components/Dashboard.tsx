import React from 'react';
import { WeeklyReportData, NarrativeDataPoint, NarrativeFrameId } from '../types';
import { NARRATIVE_FRAMES } from '../constants';
import NarrativeChart from './NarrativeChart';
import NarrativeDetailCard from './NarrativeDetailCard';
import ConsumptionAnalysis from './ConsumptionAnalysis';

const MOCK_DATA: WeeklyReportData = {
  currentWeek: [
    { id: NarrativeFrameId.UsVsThem, name: '편 가르기', value: 35 },
    { id: NarrativeFrameId.FearMongering, name: '불안감 조성', value: 25 },
    { id: NarrativeFrameId.Scapegoating, name: '특정 대상 탓하기', value: 15 },
    { id: NarrativeFrameId.ThreatToValues, name: '위기감 조성', value: 20 },
    { id: NarrativeFrameId.PastGlory, name: '과거 미화하기', value: 5 },
  ],
  previousWeek: [
    { id: NarrativeFrameId.UsVsThem, name: '편 가르기', value: 30 },
    { id: NarrativeFrameId.FearMongering, name: '불안감 조성', value: 20 },
    { id: NarrativeFrameId.Scapegoating, name: '특정 대상 탓하기', value: 18 },
    { id: NarrativeFrameId.ThreatToValues, name: '위기감 조성', value: 22 },
    { id: NarrativeFrameId.PastGlory, name: '과거 미화하기', value: 10 },
  ]
};

const Dashboard: React.FC = () => {
  const { currentWeek, previousWeek } = MOCK_DATA;
  const totalCurrentWeek = currentWeek.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-4xl font-bold text-center text-gray-900">나의 콘텐츠 소비 성향은?</h2>
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-semibold mb-6 text-gray-800">숨은 의도 유형별 소비량</h3>
            <div className="h-96 w-full">
              <NarrativeChart data={currentWeek} />
            </div>
          </div>
          
          <div className="space-y-4">
            {currentWeek
              .sort((a, b) => b.value - a.value)
              .map(item => {
                const prevItem = previousWeek.find(p => p.id === item.id);
                const percentage = totalCurrentWeek > 0 ? (item.value / totalCurrentWeek) * 100 : 0;
                return (
                  <NarrativeDetailCard 
                    key={item.id}
                    narrativeId={item.id}
                    percentage={percentage}
                    currentValue={item.value}
                    previousValue={prevItem?.value || 0}
                  />
                );
              })}
          </div>
        </div>
        
        <ConsumptionAnalysis data={currentWeek} />
      </div>
    </div>
  );
};

export default Dashboard;