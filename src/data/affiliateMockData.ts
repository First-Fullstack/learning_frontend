import { Affiliate, AffiliateLink, AffiliateTracking, AffiliateReward, MonthlyReward, AffiliateSummary } from '../types';

export const mockAffiliates: Affiliate[] = [
  {
    id: '1',
    name: '田中太郎',
    email: 'tanaka@example.com',
    status: 'active',
    totalReward: 125000,
    joinDate: '2024-01-15'
  },
  {
    id: '2',
    name: '佐藤花子',
    email: 'sato@example.com',
    status: 'active',
    totalReward: 89000,
    joinDate: '2024-02-20'
  },
  {
    id: '3',
    name: '鈴木一郎',
    email: 'suzuki@example.com',
    status: 'inactive',
    totalReward: 45000,
    joinDate: '2024-01-30'
  },
  {
    id: '4',
    name: '高橋美咲',
    email: 'takahashi@example.com',
    status: 'active',
    totalReward: 156000,
    joinDate: '2024-03-10'
  },
  {
    id: '5',
    name: '伊藤健太',
    email: 'ito@example.com',
    status: 'active',
    totalReward: 78000,
    joinDate: '2024-02-05'
  }
];

export const mockAffiliateLinks: AffiliateLink[] = [
  {
    id: '1',
    affiliateId: '1',
    affiliateName: '田中太郎',
    link: 'https://learning-site.com/ref/abc123',
    status: 'active',
    createdAt: '2024-01-15',
    clickCount: 245,
    conversionCount: 12
  },
  {
    id: '2',
    affiliateId: '2',
    affiliateName: '佐藤花子',
    link: 'https://learning-site.com/ref/def456',
    status: 'active',
    createdAt: '2024-02-20',
    clickCount: 189,
    conversionCount: 8
  },
  {
    id: '3',
    affiliateId: '3',
    affiliateName: '鈴木一郎',
    link: 'https://learning-site.com/ref/ghi789',
    status: 'inactive',
    createdAt: '2024-01-30',
    clickCount: 67,
    conversionCount: 3
  },
  {
    id: '4',
    affiliateId: '4',
    affiliateName: '高橋美咲',
    link: 'https://learning-site.com/ref/jkl012',
    status: 'active',
    createdAt: '2024-03-10',
    clickCount: 312,
    conversionCount: 18
  },
  {
    id: '5',
    affiliateId: '5',
    affiliateName: '伊藤健太',
    link: 'https://learning-site.com/ref/mno345',
    status: 'active',
    createdAt: '2024-02-05',
    clickCount: 156,
    conversionCount: 7
  }
];

export const mockAffiliateTracking: AffiliateTracking[] = [
  {
    id: '1',
    affiliateId: '1',
    affiliateName: '田中太郎',
    clickCount: 245,
    conversionCount: 12,
    period: '2024-03',
    conversionRate: 4.9
  },
  {
    id: '2',
    affiliateId: '2',
    affiliateName: '佐藤花子',
    clickCount: 189,
    conversionCount: 8,
    period: '2024-03',
    conversionRate: 4.2
  },
  {
    id: '3',
    affiliateId: '3',
    affiliateName: '鈴木一郎',
    clickCount: 67,
    conversionCount: 3,
    period: '2024-03',
    conversionRate: 4.5
  },
  {
    id: '4',
    affiliateId: '4',
    affiliateName: '高橋美咲',
    clickCount: 312,
    conversionCount: 18,
    period: '2024-03',
    conversionRate: 5.8
  },
  {
    id: '5',
    affiliateId: '5',
    affiliateName: '伊藤健太',
    clickCount: 156,
    conversionCount: 7,
    period: '2024-03',
    conversionRate: 4.5
  }
];

export const mockAffiliateRewards: AffiliateReward[] = [
  {
    id: '1',
    affiliateId: '1',
    affiliateName: '田中太郎',
    totalReward: 125000,
    paymentStatus: 'unpaid',
    nextPaymentDate: '2024-04-01'
  },
  {
    id: '2',
    affiliateId: '2',
    affiliateName: '佐藤花子',
    totalReward: 89000,
    paymentStatus: 'paid',
    lastPaymentDate: '2024-03-01',
    nextPaymentDate: '2024-04-01'
  },
  {
    id: '3',
    affiliateId: '3',
    affiliateName: '鈴木一郎',
    totalReward: 45000,
    paymentStatus: 'paid',
    lastPaymentDate: '2024-02-01',
    nextPaymentDate: '2024-04-01'
  },
  {
    id: '4',
    affiliateId: '4',
    affiliateName: '高橋美咲',
    totalReward: 156000,
    paymentStatus: 'unpaid',
    nextPaymentDate: '2024-04-01'
  },
  {
    id: '5',
    affiliateId: '5',
    affiliateName: '伊藤健太',
    totalReward: 78000,
    paymentStatus: 'unpaid',
    nextPaymentDate: '2024-04-01'
  }
];

// 月次報酬データ
export const mockMonthlyRewards: MonthlyReward[] = [
  // 田中太郎の月次報酬
  { id: '1', affiliateId: '1', affiliateName: '田中太郎', year: 2024, month: 1, rewardAmount: 25000, paymentStatus: 'paid', paymentDate: '2024-02-01', createdAt: '2024-01-31' },
  { id: '2', affiliateId: '1', affiliateName: '田中太郎', year: 2024, month: 2, rewardAmount: 30000, paymentStatus: 'paid', paymentDate: '2024-03-01', createdAt: '2024-02-29' },
  { id: '3', affiliateId: '1', affiliateName: '田中太郎', year: 2024, month: 3, rewardAmount: 35000, paymentStatus: 'paid', paymentDate: '2024-04-01', createdAt: '2024-03-31' },
  { id: '4', affiliateId: '1', affiliateName: '田中太郎', year: 2024, month: 4, rewardAmount: 35000, paymentStatus: 'unpaid', createdAt: '2024-04-30' },

  // 佐藤花子の月次報酬
  { id: '5', affiliateId: '2', affiliateName: '佐藤花子', year: 2024, month: 2, rewardAmount: 20000, paymentStatus: 'paid', paymentDate: '2024-03-01', createdAt: '2024-02-29' },
  { id: '6', affiliateId: '2', affiliateName: '佐藤花子', year: 2024, month: 3, rewardAmount: 25000, paymentStatus: 'paid', paymentDate: '2024-04-01', createdAt: '2024-03-31' },
  { id: '7', affiliateId: '2', affiliateName: '佐藤花子', year: 2024, month: 4, rewardAmount: 22000, paymentStatus: 'paid', paymentDate: '2024-05-01', createdAt: '2024-04-30' },
  { id: '8', affiliateId: '2', affiliateName: '佐藤花子', year: 2024, month: 5, rewardAmount: 22000, paymentStatus: 'unpaid', createdAt: '2024-05-31' },

  // 鈴木一郎の月次報酬
  { id: '9', affiliateId: '3', affiliateName: '鈴木一郎', year: 2024, month: 1, rewardAmount: 15000, paymentStatus: 'paid', paymentDate: '2024-02-01', createdAt: '2024-01-31' },
  { id: '10', affiliateId: '3', affiliateName: '鈴木一郎', year: 2024, month: 2, rewardAmount: 15000, paymentStatus: 'paid', paymentDate: '2024-03-01', createdAt: '2024-02-29' },
  { id: '11', affiliateId: '3', affiliateName: '鈴木一郎', year: 2024, month: 3, rewardAmount: 15000, paymentStatus: 'paid', paymentDate: '2024-04-01', createdAt: '2024-03-31' },
  { id: '12', affiliateId: '3', affiliateName: '鈴木一郎', year: 2024, month: 4, rewardAmount: 0, paymentStatus: 'unpaid', createdAt: '2024-04-30', notes: '活動停止' },

  // 高橋美咲の月次報酬
  { id: '13', affiliateId: '4', affiliateName: '高橋美咲', year: 2024, month: 3, rewardAmount: 40000, paymentStatus: 'paid', paymentDate: '2024-04-01', createdAt: '2024-03-31' },
  { id: '14', affiliateId: '4', affiliateName: '高橋美咲', year: 2024, month: 4, rewardAmount: 45000, paymentStatus: 'paid', paymentDate: '2024-05-01', createdAt: '2024-04-30' },
  { id: '15', affiliateId: '4', affiliateName: '高橋美咲', year: 2024, month: 5, rewardAmount: 50000, paymentStatus: 'paid', paymentDate: '2024-06-01', createdAt: '2024-05-31' },
  { id: '16', affiliateId: '4', affiliateName: '高橋美咲', year: 2024, month: 6, rewardAmount: 21000, paymentStatus: 'unpaid', createdAt: '2024-06-30' },

  // 伊藤健太の月次報酬
  { id: '17', affiliateId: '5', affiliateName: '伊藤健太', year: 2024, month: 2, rewardAmount: 18000, paymentStatus: 'paid', paymentDate: '2024-03-01', createdAt: '2024-02-29' },
  { id: '18', affiliateId: '5', affiliateName: '伊藤健太', year: 2024, month: 3, rewardAmount: 20000, paymentStatus: 'paid', paymentDate: '2024-04-01', createdAt: '2024-03-31' },
  { id: '19', affiliateId: '5', affiliateName: '伊藤健太', year: 2024, month: 4, rewardAmount: 22000, paymentStatus: 'paid', paymentDate: '2024-05-01', createdAt: '2024-04-30' },
  { id: '20', affiliateId: '5', affiliateName: '伊藤健太', year: 2024, month: 5, rewardAmount: 18000, paymentStatus: 'unpaid', createdAt: '2024-05-31' }
];

// アフィリエイター別累積情報
export const mockAffiliateSummaries: AffiliateSummary[] = [
  {
    affiliateId: '1',
    affiliateName: '田中太郎',
    totalReward: 125000,
    unpaidAmount: 35000,
    paidAmount: 90000,
    lastPaymentDate: '2024-04-01',
    nextPaymentDate: '2024-05-01'
  },
  {
    affiliateId: '2',
    affiliateName: '佐藤花子',
    totalReward: 89000,
    unpaidAmount: 22000,
    paidAmount: 67000,
    lastPaymentDate: '2024-05-01',
    nextPaymentDate: '2024-06-01'
  },
  {
    affiliateId: '3',
    affiliateName: '鈴木一郎',
    totalReward: 45000,
    unpaidAmount: 0,
    paidAmount: 45000,
    lastPaymentDate: '2024-04-01',
    nextPaymentDate: '2024-05-01'
  },
  {
    affiliateId: '4',
    affiliateName: '高橋美咲',
    totalReward: 156000,
    unpaidAmount: 21000,
    paidAmount: 135000,
    lastPaymentDate: '2024-06-01',
    nextPaymentDate: '2024-07-01'
  },
  {
    affiliateId: '5',
    affiliateName: '伊藤健太',
    totalReward: 78000,
    unpaidAmount: 18000,
    paidAmount: 60000,
    lastPaymentDate: '2024-05-01',
    nextPaymentDate: '2024-06-01'
  }
];
