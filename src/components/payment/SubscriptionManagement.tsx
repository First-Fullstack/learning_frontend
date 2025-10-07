import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Calendar, Download, Settings, AlertTriangle, CheckCircle, X } from 'lucide-react';

interface Subscription {
  id: string;
  planName: string;
  status: 'active' | 'cancelled' | 'past_due';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  amount: number;
  nextBillingDate: string;
  paymentMethod: {
    type: string;
    last4: string;
    brand: string;
  };
}

const SubscriptionManagement: React.FC = () => {
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // モックデータ
  const subscription: Subscription = {
    id: 'sub_1234567890',
    planName: 'プレミアムプラン',
    status: 'active',
    currentPeriodStart: '2024-01-01',
    currentPeriodEnd: '2024-02-01',
    amount: 2000,
    nextBillingDate: '2024-02-01',
    paymentMethod: {
      type: 'card',
      last4: '1234',
      brand: 'Visa'
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCancelSubscription = async () => {
    setIsLoading(true);
    
    // ダミーの処理（実際のAPI接続は行わない）
    setTimeout(() => {
      setIsLoading(false);
      setShowCancelModal(false);
      // 実際のアプリでは状態を更新
    }, 2000);
  };

  const handleChangePlan = () => {
    navigate('/pricing');
  };

  const handleUpdatePaymentMethod = () => {
    // 実際のアプリでは支払い方法更新画面に遷移
    console.log('支払い方法を更新');
  };

  const handleDownloadInvoice = () => {
    // 実際のアプリでは領収書をダウンロード
    console.log('領収書をダウンロード');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'アクティブ';
      case 'cancelled':
        return 'キャンセル済み';
      case 'past_due':
        return '支払い遅延';
      default:
        return '不明';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/profile')}
              className="mr-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">サブスクリプション管理</h1>
              <p className="text-gray-600 mt-1">プランと支払い情報を管理</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左側: サブスクリプション詳細 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 現在のプラン */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">現在のプラン</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(subscription.status)}`}>
                  {getStatusText(subscription.status)}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">プラン名</span>
                  <span className="font-semibold text-gray-800">{subscription.planName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">月額料金</span>
                  <span className="font-semibold text-gray-800">{formatCurrency(subscription.amount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">現在の期間</span>
                  <span className="font-semibold text-gray-800">
                    {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">次回請求日</span>
                  <span className="font-semibold text-gray-800 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(subscription.nextBillingDate)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleChangePlan}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  プラン変更
                </button>
                {subscription.status === 'active' && (
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                  >
                    解約
                  </button>
                )}
              </div>
            </div>

            {/* 支払い方法 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">支払い方法</h2>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <CreditCard className="w-8 h-8 text-gray-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {subscription.paymentMethod.brand} •••• {subscription.paymentMethod.last4}
                    </p>
                    <p className="text-sm text-gray-600">有効期限: 12/25</p>
                  </div>
                </div>
                <button
                  onClick={handleUpdatePaymentMethod}
                  className="text-blue-600 hover:text-blue-500 font-semibold"
                >
                  変更
                </button>
              </div>
            </div>

            {/* 請求履歴 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">請求履歴</h2>
              
              <div className="space-y-3">
                {[
                  { date: '2024-01-01', amount: 2000, status: 'paid' },
                  { date: '2023-12-01', amount: 2000, status: 'paid' },
                  { date: '2023-11-01', amount: 2000, status: 'paid' }
                ].map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Download className="w-4 h-4 text-gray-600 mr-3" />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {formatDate(invoice.date)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(invoice.amount)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {invoice.status === 'paid' ? '支払い済み' : '未払い'}
                      </span>
                      <button className="text-blue-600 hover:text-blue-500 text-sm">
                        ダウンロード
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右側: クイックアクション */}
          <div className="space-y-6">
            {/* 利用可能な機能 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">利用可能な機能</h3>
              <ul className="space-y-3">
                {[
                  '全コースへのアクセス',
                  '進捗管理',
                  'クイズ機能',
                  '修了証書',
                  '優先サポート',
                  '広告なし体験'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* サポート */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">サポート</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/support')}
                  className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Settings className="w-4 h-4 inline mr-2" />
                  サポートに問い合わせ
                </button>
                <button
                  onClick={() => navigate('/faq')}
                  className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  よくある質問
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 解約確認モーダル */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">サブスクリプション解約</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                サブスクリプションを解約すると、現在の期間終了後（{formatDate(subscription.currentPeriodEnd)}）にアクセスが制限されます。
                本当に解約しますか？
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleCancelSubscription}
                  disabled={isLoading}
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? '処理中...' : '解約する'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionManagement;
