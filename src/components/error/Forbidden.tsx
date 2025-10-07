import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Shield, Lock, Mail } from 'lucide-react';

const Forbidden: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleContactSupport = () => {
    navigate('/support');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          {/* Error Icon */}
          <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-12 h-12 text-white" />
          </div>

          {/* Error Code */}
          <div className="text-8xl font-black text-red-300 mb-4">403</div>

          {/* Error Message */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">アクセスが拒否されました</h1>
          <p className="text-xl text-gray-600 mb-8">
            申し訳ございませんが、このページにアクセスする権限がありません。
            <br />
            管理者にお問い合わせください。
          </p>

          {/* Access Denied Details */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 text-left">
            <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              アクセス制限の理由
            </h3>
            <ul className="space-y-2 text-sm text-red-700">
              <li>• このページは管理者専用です</li>
              <li>• サブスクリプションが必要なコンテンツです</li>
              <li>• アカウントの権限が不足しています</li>
              <li>• 一時的なアクセス制限が設定されています</li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 text-left">
            <h3 className="text-lg font-bold text-blue-800 mb-4">解決方法</h3>
            <ol className="space-y-3 text-sm text-blue-700">
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                <span>サブスクリプションに加入してください</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                <span>アカウントにログインしてください</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                <span>管理者にアクセス権限を依頼してください</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                <span>サポートまでお問い合わせください</span>
              </li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleGoHome}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 px-6 rounded-xl font-bold hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
            >
              <Home className="w-5 h-5 mr-2" />
              ホームページに戻る
            </button>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleGoBack}
                className="bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                前のページに戻る
              </button>
              
              <button
                onClick={handleContactSupport}
                className="bg-red-100 text-red-700 py-3 px-6 rounded-xl font-bold hover:bg-red-200 transition-colors flex items-center justify-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                サポートに問い合わせ
              </button>
            </div>
          </div>

          {/* Subscription CTA */}
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
            <h4 className="text-sm font-semibold text-green-800 mb-2">サブスクリプションに加入しませんか？</h4>
            <p className="text-sm text-green-700 mb-3">
              すべてのコースと機能にアクセスできます
            </p>
            <button
              onClick={() => navigate('/pricing')}
              className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors text-sm"
            >
              料金プランを見る
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-sm text-gray-500">
            <p>
              アクセス権限に関するお問い合わせは
              <a href="mailto:support@learning-site.com" className="text-blue-600 hover:text-blue-500 font-semibold">
                support@learning-site.com
              </a>
              までお願いいたします。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
