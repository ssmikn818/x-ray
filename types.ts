// FIX: Import `ReactElement` and use it for the `icon` property to resolve the "Cannot find namespace 'JSX'" error.
import type { ReactElement, SVGProps } from 'react';

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
  // FIX: Explicitly type icon props to allow cloning with className, as all icons are SVGs.
  icon: ReactElement<SVGProps<SVGSVGElement>>;
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
