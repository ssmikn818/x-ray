

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { NarrativeDataPoint } from '../types';
import { NARRATIVE_FRAMES } from '../constants';

interface NarrativeChartProps {
  data: NarrativeDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-md shadow-lg">
        <p className="label font-bold text-gray-800">{`${label}`}</p>
        <p className="intro text-sm text-gray-600">{`횟수: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const NarrativeChart: React.FC<NarrativeChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
        <XAxis type="number" stroke="#9ca3af" hide />
        <YAxis 
          type="category" 
          dataKey="name" 
          stroke="#4b5563" 
          axisLine={false}
          tickLine={false}
          width={110}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
        <Bar dataKey="value" barSize={20} radius={[0, 10, 10, 0]}>
          {data.map((entry) => (
            <Cell key={`cell-${entry.id}`} fill={NARRATIVE_FRAMES[entry.id].hexColor} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default NarrativeChart;