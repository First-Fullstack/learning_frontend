export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  isPremium: boolean;
  progress: number;
  videoUrl: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  courseId: string;
  questions: Question[];
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  completed: boolean;
}