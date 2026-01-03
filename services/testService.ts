
import { TestResult, Test, Question, TestRecommendation } from '../types';
import { 
    PHQ9_THRESHOLDS, 
    GAD7_THRESHOLDS, 
    ISI_THRESHOLDS, 
    ROSENBERG_THRESHOLDS, 
    CRT_THRESHOLDS,
    RAS_THRESHOLDS,
    PSS_THRESHOLDS,
    COG_THRESHOLDS,
    LIFE_THRESHOLDS
} from '../constants';

export const calculateScore = (test: Test, answers: Record<string, number>): TestResult => {
  let rawScores: Record<string, number> = {};
  let interpretation = '';
  let total = 0;

  // --- COGNITIVE SCORING (Right/Wrong) ---
  if (test.scoringMethod === 'cognitive' || test.id === 'crt') {
    let correctCount = 0;
    
    test.questions.forEach(q => {
      const val = answers[q.id];
      
      if (q.type === 'reaction_time') {
          // Score based on speed. < 300ms is 'good'.
          if (val > 0 && val < (q.correctValue || 350)) correctCount++;
      } else if (q.type === 'pattern_memory') {
          // If val is 1 (passed), add point
          if (val === 1) correctCount++;
      } else if (q.correctValue !== undefined) {
         if (val === q.correctValue) {
           correctCount++;
         }
      }
    });

    rawScores['total'] = correctCount;
    
    // Choose threshold
    const thresholds = test.id === 'cognitive_lab' ? COG_THRESHOLDS : CRT_THRESHOLDS;
    const match = thresholds.find(t => correctCount >= t.minScore && correctCount <= t.maxScore);
    interpretation = match ? match.label : 'Completed';
  } 
  
  // --- TYPOLOGY SCORING (Max Category Wins) ---
  else if (test.scoringMethod === 'typology') {
      const traits: Record<string, number> = {};
      
      test.questions.forEach(q => {
          const answerVal = answers[q.id];
          if (q.type === 'multiple_choice') {
             // For MCQ where option has trait
             const selectedOpt = q.options?.find(o => o.value === answerVal); 
             if (selectedOpt && selectedOpt.trait) {
                 traits[selectedOpt.trait] = (traits[selectedOpt.trait] || 0) + 1;
             }
          } else {
             // For Likert where Question has trait
             if (q.trait) {
                 traits[q.trait] = (traits[q.trait] || 0) + (answers[q.id] || 0);
             }
          }
      });
      
      rawScores = traits;
      
      let maxTrait = 'Undetermined';
      let maxVal = -1;
      Object.entries(traits).forEach(([t, v]) => {
          if (v > maxVal) {
              maxVal = v;
              maxTrait = t;
          }
      });
      interpretation = `Primary Style: ${maxTrait}`;
  }

  // --- SUMMATION / AVERAGE SCORING ---
  else {
    const subscales: Record<string, number> = {};
    let count = 0;

    test.questions.forEach(q => {
      let val = answers[q.id] || 0;
      
      // Handle Reverse Scoring
      if (q.reverseScore && q.options) {
          // Assuming options are 0-based or 1-based, we flip.
          // E.g. 1,2,3,4,5 -> max 5, min 1.  (5+1)-val. 
          const vals = q.options.map(o => o.value);
          const maxOpt = Math.max(...vals);
          const minOpt = Math.min(...vals);
          val = (maxOpt + minOpt) - val;
      }

      total += val;
      count++;

      if (q.trait) {
          subscales[q.trait] = (subscales[q.trait] || 0) + val;
      }
    });

    if (test.scoringMethod === 'average') {
        total = total / count;
        total = Math.round(total * 10) / 10;
    }

    rawScores['total'] = total;
    Object.assign(rawScores, subscales);

    if (test.id === 'phq9') interpretation = getLabel(total, PHQ9_THRESHOLDS);
    else if (test.id === 'gad7') interpretation = getLabel(total, GAD7_THRESHOLDS);
    else if (test.id === 'isi') interpretation = getLabel(total, ISI_THRESHOLDS);
    else if (test.id === 'rosenberg') interpretation = getLabel(total, ROSENBERG_THRESHOLDS);
    else if (test.id === 'rel_satisfaction') interpretation = getLabel(total, RAS_THRESHOLDS);
    else if (test.id === 'parental_stress') interpretation = getLabel(total, PSS_THRESHOLDS);
    else if (test.id === 'life_architecture') interpretation = getLabel(total, LIFE_THRESHOLDS);
    else if (test.id === 'dass21') {
        // DASS needs *2 for validity
        Object.keys(subscales).forEach(k => rawScores[k] = subscales[k] * 2);
        interpretation = "DASS-21 Profile (See details)";
    }
    else if (test.id === 'big5') {
         // Normalized out of 100 for easy charting
         // Each trait has 10 questions, max score 50.
         Object.keys(subscales).forEach(key => {
            rawScores[key] = (subscales[key] / 50) * 100;
         });
         interpretation = "Personality Profile";
    }
    else {
        interpretation = `Score: ${total}`;
    }
  }

  return {
    id: 'res_' + Math.random().toString(36).substr(2, 9),
    testId: test.id,
    userId: 'current',
    date: new Date().toISOString(),
    rawScores,
    answers,
    interpretation
  };
};

const getLabel = (score: number, thresholds: TestRecommendation[]): string => {
    if (!thresholds) return 'Completed';
    const match = thresholds.find(t => score >= t.minScore && score <= t.maxScore);
    return match ? match.label : 'Completed';
}

const RESULTS_STORAGE_KEY = 'braincraft_results';

export const saveResult = (result: TestResult) => {
  const existingStr = localStorage.getItem(RESULTS_STORAGE_KEY);
  const existing: TestResult[] = existingStr ? JSON.parse(existingStr) : [];
  existing.push(result);
  localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(existing));
};

export const getResult = (id: string): TestResult | undefined => {
  const existingStr = localStorage.getItem(RESULTS_STORAGE_KEY);
  const existing: TestResult[] = existingStr ? JSON.parse(existingStr) : [];
  return existing.find(r => r.id === id);
};

export const getUserResults = (): TestResult[] => {
  const existingStr = localStorage.getItem(RESULTS_STORAGE_KEY);
  return existingStr ? JSON.parse(existingStr) : [];
};
