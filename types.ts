
export interface Question {
  id: string;
  text: string;
  options: {
    value: string;
    label: string;
    description?: string;
  }[];
}

export interface UserAnswers {
  [questionId: string]: string;
}

export interface DiagnosisResult {
  personaTitle: string;
  summary: string;
  idealEnvironment: {
    title: string;
    description: string;
    pros: string[];
  }[];
  careerAdvice: string;
  hallTypeMatch: string;
  matchScore: {
    label: string;
    value: number; // 0-100
  }[];
  feasibilityScore: {
    score: number; // 0-100 (内定可能性)
    reason: string;
    missingSkills: string[];
  };
}

export type AppState = 'onboarding' | 'questions' | 'loading' | 'result';
