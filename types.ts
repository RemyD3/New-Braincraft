
export interface User {
  id: string;
  name: string;
  email: string;
  isFirstTestFree: boolean;
  isAdmin?: boolean;
}

export enum TestCategory {
  Personality = 'Personality',
  Mood = 'Mood',
  Anxiety = 'Anxiety',
  Cognition = 'Cognition',
  Wellness = 'Wellness',
  Relationships = 'Relationships',
  Family = 'Family'
}

export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'binary' | 'multiple_choice' | 'slider' | 'pattern_memory' | 'reaction_time';
  options?: { value: number; label: string; trait?: string }[]; // Added trait to options for typology
  trait?: string; // For multi-trait tests like Big Five
  reverseScore?: boolean;
  correctValue?: number; // For cognitive tests
  // Interactive configs
  gridSize?: number; // For pattern memory (e.g., 3 for 3x3)
  patternSequence?: number[]; // The correct indices to click
  minLabel?: string; // For sliders
  maxLabel?: string; // For sliders
}

export interface Test {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  durationMinutes: number;
  questionCount: number;
  category: TestCategory;
  price: number;
  imageUrl: string;
  questions: Question[];
  researchCitation: string;
  isClinicalScreening: boolean;
  scoringMethod?: 'summation' | 'average' | 'typology' | 'cognitive'; // How to calculate result
}

export interface TestResult {
  id: string;
  testId: string;
  userId: string;
  date: string;
  rawScores: Record<string, number>; // e.g. { "total": 15 } or { "Openness": 20 }
  answers: Record<string, number>;
  interpretation: string;
  details?: string; // Extended detailed text
}

export interface TestRecommendation {
  minScore: number;
  maxScore: number;
  label: string;
  description: string;
  color: string;
  crisisWarning?: boolean;
}
