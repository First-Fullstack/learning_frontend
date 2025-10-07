import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, RefreshCw, ArrowLeft, CreditCard, AlertTriangle } from 'lucide-react';

const PaymentFailed: React.FC = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/checkout');
  };

  const handleBackToPricing = () => {
    navigate('/pricing');
  };

  const handleContactSupport = () => {
    navigate('/support');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-white" />
          </div>

          {/* Error Message */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">決済に失敗しました</h1>
          <p className="text-xl text-gray-600 mb-8">
            申し訳ございませんが、決済処理中にエラーが発生しました。
            <br />
            以下をお試しください。
          </p>

          {/* Possible Causes */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 text-left">
            <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              考えられる原因
            </h3>
            <ul className="space-y-2 text-sm text-red-700">
              <li>• カード情報に誤りがある</li>
              <li>• カードの残高不足</li>
              <li>• カードが期限切れ</li>
              <li>• カード会社による決済拒否</li>
              <li>• ネットワーク接続の問題</li>
              <li>• 入力した情報の不備</li>
            </ul>
          </div>

          {/* Troubleshooting Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 text-left">
            <h3 className="text-lg font-bold text-blue-800 mb-4">解決方法</h3>
            <ol className="space-y-3 text-sm text-blue-700">
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                <span>カード情報を再確認してください</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                <span>別のカードでお試しください</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                <span>カード会社に確認してください</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                <span>しばらく時間をおいてから再試行してください</span>
              </li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleRetry}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 px-6 rounded-xl font-bold hover:from-red-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              決済を再試行
            </button>
            
            <button
              onClick={handleBackToPricing}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              料金プランに戻る
            </button>

            <button
              onClick={handleContactSupport}
              className="w-full bg-blue-100 text-blue-700 py-3 px-6 rounded-xl font-bold hover:bg-blue-200 transition-colors flex items-center justify-center"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              サポートに問い合わせ
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-sm text-gray-500">
            <p>
              問題が解決しない場合は、
              <a href="mailto:support@learning-site.com" className="text-blue-600 hover:text-blue-500 font-semibold">
                support@learning-site.com
              </a>
              までお問い合わせください。
            </p>
            <p className="mt-2">
              お客様のカード情報は安全に処理され、保存されることはありません。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
