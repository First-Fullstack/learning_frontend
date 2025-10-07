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

// アフィリエイト関連の型定義
export interface Affiliate {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  totalReward: number;
  joinDate: string;
}

export interface AffiliateLink {
  id: string;
  affiliateId: string;
  affiliateName: string;
  link: string;
  status: 'active' | 'inactive';
  createdAt: string;
  clickCount: number;
  conversionCount: number;
}

export interface AffiliateTracking {
  id: string;
  affiliateId: string;
  affiliateName: string;
  clickCount: number;
  conversionCount: number;
  period: string;
  conversionRate: number;
}

export interface AffiliateReward {
  id: string;
  affiliateId: string;
  affiliateName: string;
  totalReward: number;
  paymentStatus: 'unpaid' | 'paid';
  lastPaymentDate?: string;
  nextPaymentDate?: string;
}

// 月次報酬管理用の型定義
export interface MonthlyReward {
  id: string;
  affiliateId: string;
  affiliateName: string;
  year: number;
  month: number;
  rewardAmount: number;
  paymentStatus: 'unpaid' | 'paid';
  paymentDate?: string;
  createdAt: string;
  notes?: string;
}

// アフィリエイター別累積情報
export interface AffiliateSummary {
  affiliateId: string;
  affiliateName: string;
  totalReward: number;
  unpaidAmount: number;
  paidAmount: number;
  lastPaymentDate?: string;
  nextPaymentDate?: string;
}