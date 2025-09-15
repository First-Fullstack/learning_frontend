// 管理者用ダッシュボードのダミーデータ

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  subscriptionStatus: 'active' | 'inactive' | 'cancelled';
  joinDate: string;
  lastLogin: string;
}

export interface Course {
  id: number;
  title: string;
  category: string;
  status: 'published' | 'draft' | 'archived';
  videoCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  id: number;
  title: string;
  courseTitle: string;
  questionCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
}

export interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  activeSubscriptions: number;
  totalRevenue: number;
  monthlyGrowth: number;
}

// ダッシュボード統計
export const dashboardStats: DashboardStats = {
  totalUsers: 1247,
  totalCourses: 23,
  activeSubscriptions: 892,
  totalRevenue: 1250000,
  monthlyGrowth: 15.3
};

// ユーザー一覧
export const adminUsers: AdminUser[] = [
  {
    id: 1,
    name: '田中太郎',
    email: 'tanaka@example.com',
    subscriptionStatus: 'active',
    joinDate: '2024-01-15',
    lastLogin: '2024-12-20'
  },
  {
    id: 2,
    name: '佐藤花子',
    email: 'sato@example.com',
    subscriptionStatus: 'active',
    joinDate: '2024-02-20',
    lastLogin: '2024-12-19'
  },
  {
    id: 3,
    name: '鈴木一郎',
    email: 'suzuki@example.com',
    subscriptionStatus: 'inactive',
    joinDate: '2024-03-10',
    lastLogin: '2024-11-30'
  },
  {
    id: 4,
    name: '高橋美咲',
    email: 'takahashi@example.com',
    subscriptionStatus: 'cancelled',
    joinDate: '2024-01-05',
    lastLogin: '2024-10-15'
  },
  {
    id: 5,
    name: '伊藤健太',
    email: 'ito@example.com',
    subscriptionStatus: 'active',
    joinDate: '2024-04-12',
    lastLogin: '2024-12-20'
  }
];

// コース一覧
export const courses: Course[] = [
  {
    id: 1,
    title: 'React基礎コース',
    category: 'プログラミング',
    status: 'published',
    videoCount: 12,
    createdAt: '2024-01-10',
    updatedAt: '2024-12-15'
  },
  {
    id: 2,
    title: 'TypeScript入門',
    category: 'プログラミング',
    status: 'published',
    videoCount: 8,
    createdAt: '2024-02-05',
    updatedAt: '2024-12-10'
  },
  {
    id: 3,
    title: 'デザイン基礎',
    category: 'デザイン',
    status: 'draft',
    videoCount: 15,
    createdAt: '2024-03-20',
    updatedAt: '2024-12-18'
  },
  {
    id: 4,
    title: 'マーケティング戦略',
    category: 'ビジネス',
    status: 'published',
    videoCount: 10,
    createdAt: '2024-04-15',
    updatedAt: '2024-12-12'
  },
  {
    id: 5,
    title: 'データ分析入門',
    category: 'データサイエンス',
    status: 'archived',
    videoCount: 6,
    createdAt: '2024-05-01',
    updatedAt: '2024-11-30'
  }
];

// クイズ一覧
export const quizzes: Quiz[] = [
  {
    id: 1,
    title: 'React基礎テスト',
    courseTitle: 'React基礎コース',
    questionCount: 10,
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'TypeScript基礎テスト',
    courseTitle: 'TypeScript入門',
    questionCount: 8,
    status: 'active',
    createdAt: '2024-02-10'
  },
  {
    id: 3,
    title: 'デザイン基礎テスト',
    courseTitle: 'デザイン基礎',
    questionCount: 12,
    status: 'inactive',
    createdAt: '2024-03-25'
  },
  {
    id: 4,
    title: 'マーケティング基礎テスト',
    courseTitle: 'マーケティング戦略',
    questionCount: 15,
    status: 'active',
    createdAt: '2024-04-20'
  }
];

// サブスクリプションプラン
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 1,
    name: 'ベーシックプラン',
    price: 1000,
    description: '基本的な学習機能',
    features: ['全コース視聴', '進捗管理', '基本サポート']
  },
  {
    id: 2,
    name: 'プレミアムプラン',
    price: 2000,
    description: '高度な学習機能',
    features: ['全コース視聴', '進捗管理', 'クイズ機能', '優先サポート', '修了証書']
  }
];

// お知らせ
export const notifications = [
  {
    id: 1,
    title: '新機能「クイズ機能」がリリースされました',
    date: '2024-12-20',
    type: 'info'
  },
  {
    id: 2,
    title: 'システムメンテナンスのお知らせ',
    date: '2024-12-25',
    type: 'warning'
  },
  {
    id: 3,
    title: '月次レポートが更新されました',
    date: '2024-12-19',
    type: 'success'
  }
]; 