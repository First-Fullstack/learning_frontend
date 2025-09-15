import React, { useState } from 'react';
import { Edit, Plus, CreditCard, TrendingUp, Users } from 'lucide-react';
import { subscriptionPlans } from '../../data/adminMockData';

const AdminSubscription: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  };

  const stats = [
    {
      name: '総売上',
      value: formatCurrency(1250000),
      change: '+15.3%',
      changeType: 'positive'
    },
    {
      name: 'アクティブ契約数',
      value: '892',
      change: '+8.2%',
      changeType: 'positive'
    },
    {
      name: '平均月額単価',
      value: formatCurrency(1400),
      change: '+2.1%',
      changeType: 'positive'
    },
    {
      name: '解約率',
      value: '3.2%',
      change: '-0.5%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="space-y-6">
      {/* ページタイトル */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">サブスクリプション管理</h1>
          <p className="mt-1 text-sm text-gray-500">
            プラン設定と売上管理を行います
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          新規プラン作成
        </button>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-500 p-3">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* プラン一覧 */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">プラン設定</h3>
            <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100">
              <Plus className="h-4 w-4 mr-2" />
              プラン追加
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-lg border p-6 ${
                  selectedPlan === plan.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{plan.name}</h4>
                    <p className="text-sm text-gray-500">{plan.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatCurrency(plan.price)}
                  </span>
                  <span className="text-gray-500">/月</span>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <div className="h-2 w-2 rounded-full bg-green-400 mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex space-x-3">
                  <button className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    編集
                  </button>
                  <button className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    複製
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 売上分析 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 月別売上 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">月別売上推移</h3>
            <div className="space-y-4">
              {[
                { month: '12月', revenue: 1250000, growth: '+15.3%' },
                { month: '11月', revenue: 1085000, growth: '+12.1%' },
                { month: '10月', revenue: 968000, growth: '+8.7%' },
                { month: '9月', revenue: 890000, growth: '+5.2%' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-900">{item.month}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(item.revenue)}
                    </div>
                    <div className="text-sm text-green-600">{item.growth}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* プラン別契約数 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">プラン別契約数</h3>
            <div className="space-y-4">
              {[
                { plan: 'プレミアムプラン', count: 567, percentage: 63.6 },
                { plan: 'ベーシックプラン', count: 325, percentage: 36.4 }
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{item.plan}</span>
                    <span className="text-sm text-gray-500">{item.count}人</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-xs text-gray-500">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* クイックアクション */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">クイックアクション</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <CreditCard className="h-4 w-4 mr-2" />
              売上レポート
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Users className="h-4 w-4 mr-2" />
              契約者分析
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <TrendingUp className="h-4 w-4 mr-2" />
              成長率分析
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Edit className="h-4 w-4 mr-2" />
              プラン設定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSubscription; 