import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowRight, Download, Calendar, CreditCard } from 'lucide-react';

interface Plan {
  id: number;
  name: string;
  price: number;
  description: string;
}

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 決済完了情報を取得
  const plan = location.state?.plan as Plan;
  const amount = location.state?.amount as number;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  };

  const handleContinue = () => {
    navigate('/courses');
  };

  const handleDownloadInvoice = () => {
    // ダミーの領収書ダウンロード
    console.log('領収書をダウンロード中...');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">決済が完了しました！</h1>
          <p className="text-xl text-gray-600 mb-8">
            サブスクリプションが正常に開始されました。
            <br />
            今すぐ学習を始めましょう！
          </p>

          {/* Plan Details */}
          {plan && (
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">サブスクリプション詳細</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">プラン名</span>
                  <span className="font-semibold text-gray-800">{plan.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">月額料金</span>
                  <span className="font-semibold text-gray-800">{formatCurrency(plan.price)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">次回請求日</span>
                  <span className="font-semibold text-gray-800 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    2024年2月1日
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">支払い方法</span>
                  <span className="font-semibold text-gray-800 flex items-center">
                    <CreditCard className="w-4 h-4 mr-1" />
                    **** **** **** 1234
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Features Unlocked */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-blue-800 mb-4">今すぐ利用できる機能</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center text-blue-700">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                全コースへのアクセス
              </div>
              <div className="flex items-center text-blue-700">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                進捗管理機能
              </div>
              <div className="flex items-center text-blue-700">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                クイズ機能
              </div>
              <div className="flex items-center text-blue-700">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                修了証書
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 px-6 rounded-xl font-bold hover:from-green-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
            >
              コース一覧を見る
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            
            <button
              onClick={handleDownloadInvoice}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-2" />
              領収書をダウンロード
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-sm text-gray-500">
            <p>
              サブスクリプションの管理は
              <button 
                onClick={() => navigate('/subscription')}
                className="text-blue-600 hover:text-blue-500 font-semibold"
              >
                こちら
              </button>
              から行えます。
            </p>
            <p className="mt-2">
              ご質問がございましたら、
              <a href="/support" className="text-blue-600 hover:text-blue-500 font-semibold">
                サポート
              </a>
              までお気軽にお問い合わせください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
