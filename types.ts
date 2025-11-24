
import type { ReactElement } from 'react';

export enum NarrativeFrameId {
  UsVsThem = 'us-vs-them',
  FearMongering = 'fear-mongering',
  Scapegoating = 'scapegoating',
  PastGlory = 'past-glory',
  ThreatToValues = 'threat-to-values',
  ExaggeratedPromises = 'exaggerated-promises',
  UrgencyFomo = 'urgency-fomo',
}

export interface NarrativeFrame {
  id: NarrativeFrameId;
  name: string;
  description: string;
  color: string;
  hexColor: string;
  icon: ReactElement;
}

export interface NarrativeDataPoint {
  id: NarrativeFrameId;
  name: string;
  value: number;
}

export interface WeeklyReportData {
  currentWeek: NarrativeDataPoint[];
  previousWeek: NarrativeDataPoint[];
}
