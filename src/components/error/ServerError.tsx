import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, RefreshCw, AlertTriangle, Wifi, WifiOff } from 'lucide-react';

const ServerError: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleRetry = () => {
    // 実際のアプリでは再試行ロジックを実装
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          {/* Error Icon */}
          <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-12 h-12 text-white" />
          </div>

          {/* Error Code */}
          <div className="text-8xl font-black text-red-300 mb-4">500</div>

          {/* Error Message */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">サーバーエラーが発生しました</h1>
          <p className="text-xl text-gray-600 mb-8">
            申し訳ございませんが、サーバー内部でエラーが発生しました。
            <br />
            しばらく時間をおいてから再度お試しください。
          </p>

          {/* Error Details */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 text-left">
            <h3 className="text-lg font-bold text-red-800 mb-4">エラーの詳細</h3>
            <div className="space-y-2 text-sm text-red-700">
              <p>• エラーコード: 500 Internal Server Error</p>
              <p>• 発生時刻: {new Date().toLocaleString('ja-JP')}</p>
              <p>• エラーID: ERR-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          </div>

          {/* Troubleshooting Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 text-left">
            <h3 className="text-lg font-bold text-blue-800 mb-4">解決方法</h3>
            <ol className="space-y-3 text-sm text-blue-700">
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                <span>ページを更新してください</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                <span>インターネット接続を確認してください</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                <span>しばらく時間をおいてから再試行してください</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                <span>問題が続く場合はサポートまでお問い合わせください</span>
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
              再試行
            </button>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleRefresh}
                className="bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                ページを更新
              </button>
              
              <button
                onClick={handleGoHome}
                className="bg-blue-100 text-blue-700 py-3 px-6 rounded-xl font-bold hover:bg-blue-200 transition-colors flex items-center justify-center"
              >
                <Home className="w-4 h-4 mr-2" />
                ホームに戻る
              </button>
            </div>
          </div>

          {/* Connection Status */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-center mb-2">
              {navigator.onLine ? (
                <Wifi className="w-5 h-5 text-green-500 mr-2" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-500 mr-2" />
              )}
              <span className={`font-semibold ${navigator.onLine ? 'text-green-700' : 'text-red-700'}`}>
                {navigator.onLine ? 'オンライン' : 'オフライン'}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {navigator.onLine 
                ? 'インターネット接続は正常です' 
                : 'インターネット接続を確認してください'
              }
            </p>
          </div>

          {/* Support Contact */}
          <div className="mt-6 text-sm text-gray-500">
            <p>
              問題が解決しない場合は、
              <a href="/support" className="text-blue-600 hover:text-blue-500 font-semibold">
                サポート
              </a>
              までお問い合わせください。
            </p>
            <p className="mt-1">
              エラーID: ERR-{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
