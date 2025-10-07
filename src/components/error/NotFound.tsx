import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSearch = () => {
    navigate('/courses');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          {/* Error Icon */}
          <div className="w-24 h-24 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-12 h-12 text-white" />
          </div>

          {/* Error Code */}
          <div className="text-8xl font-black text-gray-300 mb-4">404</div>

          {/* Error Message */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">ページが見つかりません</h1>
          <p className="text-xl text-gray-600 mb-8">
            申し訳ございませんが、お探しのページは存在しないか、
            <br />
            移動または削除された可能性があります。
          </p>

          {/* Suggestions */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 text-left">
            <h3 className="text-lg font-bold text-blue-800 mb-4">以下の方法をお試しください：</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• URLを確認してください</li>
              <li>• ホームページから目的のページに移動してください</li>
              <li>• 検索機能を使用してコンテンツを探してください</li>
              <li>• ブラウザの戻るボタンを使用してください</li>
            </ul>
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
                onClick={handleSearch}
                className="bg-green-100 text-green-700 py-3 px-6 rounded-xl font-bold hover:bg-green-200 transition-colors flex items-center justify-center"
              >
                <Search className="w-4 h-4 mr-2" />
                コースを探す
              </button>
            </div>
          </div>

          {/* Additional Help */}
          <div className="mt-8 text-sm text-gray-500">
            <p>
              問題が解決しない場合は、
              <a href="/support" className="text-blue-600 hover:text-blue-500 font-semibold">
                サポート
              </a>
              までお問い合わせください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
