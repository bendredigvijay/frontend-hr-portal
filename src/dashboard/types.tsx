// types.ts
export interface MCQSubsection {
  id: string;
  name: string;
  questions: number;
  completed: boolean;
  timeSpent?: number;
  score?: number;
}

export interface TestSection {
  id: string;
  name: string;
  type: 'mcq' | 'coding';
  duration: number;
  questions: number;
  description: string;
  subsections?: MCQSubsection[];
  completed: boolean;
  timeSpent?: number;
  score?: number;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalQuestions: number;
  status: 'available' | 'completed' | 'in-progress';
  score?: number;
  completedAt?: Date;
  deadline: Date;
  sections: TestSection[];
  attemptId?: string;
}

export interface TestProgress {
  mcqCompleted: boolean;
  codingCompleted: boolean;
  mcqSubmitted: boolean;
  codingSubmitted: boolean;
  currentSection: 'mcq' | 'coding' | null;
  bothCompleted: boolean;
  startTime?: Date;
  mcqStartTime?: Date;
  codingStartTime?: Date;
  mcqEndTime?: Date;
  codingEndTime?: Date;
}

export interface StudentStats {
  testsCompleted: number;
  averageScore: number;
  totalTests: number;
  rank: number;
}
