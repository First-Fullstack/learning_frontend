import React from 'react';
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  TrendingUp
} from 'lucide-react';
import { dashboardStats } from '../../data/adminMockData';

const AdminDashboard: React.FC = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  };

  const stats = [
    {
      name: '登録ユーザー数',
      value: dashboardStats.totalUsers.toLocaleString(),
      icon: Users,
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: '講座数',
      value: dashboardStats.totalCourses,
      icon: BookOpen,
      change: '+3',
      changeType: 'positive'
    },
    {
      name: 'アクティブ契約数',
      value: dashboardStats.activeSubscriptions.toLocaleString(),
      icon: CreditCard,
      change: '+8%',
      changeType: 'positive'
    },
    {
      name: '月間売上',
      value: formatCurrency(dashboardStats.totalRevenue),
      icon: TrendingUp,
      change: `+${dashboardStats.monthlyGrowth}%`,
      changeType: 'positive'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* ページタイトル */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">ダッシュボード</h1>
        <p className="mt-1 text-sm text-gray-500">
          学習プラットフォームの運営状況を確認できます
        </p>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6"
            >
              <dt>
                <div className="absolute rounded-md bg-blue-500 p-3">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <p className="ml-14 sm:ml-16 truncate text-sm font-medium text-gray-500">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-14 sm:ml-16 flex items-baseline flex-wrap">
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">{item.value}</p>
                <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.change}
                </p>
              </dd>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard; 