import React, { useState, useEffect } from 'react';
import { RefreshCw, Clock, Wrench, Mail, Twitter, Facebook } from 'lucide-react';

const Maintenance: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // メンテナンス終了予定時刻（例：2時間後）
  const maintenanceEndTime = new Date(Date.now() + 2 * 60 * 60 * 1000);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = maintenanceEndTime.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          hours: Math.floor(distance / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleContactSupport = () => {
    window.open('mailto:support@learning-site.com', '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          {/* Maintenance Icon */}
          <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wrench className="w-12 h-12 text-white" />
          </div>

          {/* Maintenance Message */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">メンテナンス中です</h1>
          <p className="text-xl text-gray-600 mb-8">
            現在、システムメンテナンスを実施しております。
            <br />
            ご不便をおかけして申し訳ございません。
          </p>

          {/* Countdown Timer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center justify-center">
              <Clock className="w-5 h-5 mr-2" />
              メンテナンス終了予定時刻
            </h3>
            <div className="flex justify-center space-x-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-3xl font-bold text-yellow-600">{timeLeft.hours}</div>
                <div className="text-sm text-gray-600">時間</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-3xl font-bold text-yellow-600">{timeLeft.minutes}</div>
                <div className="text-sm text-gray-600">分</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-3xl font-bold text-yellow-600">{timeLeft.seconds}</div>
                <div className="text-sm text-gray-600">秒</div>
              </div>
            </div>
            <p className="text-sm text-yellow-700 mt-4">
              予定終了時刻: {maintenanceEndTime.toLocaleString('ja-JP')}
            </p>
          </div>

          {/* Maintenance Details */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 text-left">
            <h3 className="text-lg font-bold text-blue-800 mb-4">メンテナンス内容</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• サーバーシステムの更新</li>
              <li>• データベースの最適化</li>
              <li>• セキュリティパッチの適用</li>
              <li>• 新機能の追加</li>
            </ul>
          </div>

          {/* What to Expect */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 text-left">
            <h3 className="text-lg font-bold text-green-800 mb-4">メンテナンス後の改善点</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• より高速なページ読み込み</li>
              <li>• 新しい学習機能の追加</li>
              <li>• セキュリティの向上</li>
              <li>• ユーザーインターフェースの改善</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleRefresh}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 px-6 rounded-xl font-bold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              ページを更新
            </button>
            
            <button
              onClick={handleContactSupport}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <Mail className="w-4 h-4 mr-2" />
              サポートに問い合わせ
            </button>
          </div>

          {/* Social Media Updates */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">最新情報はこちらで確認できます</h4>
            <div className="flex justify-center space-x-4">
              <a
                href="https://twitter.com/learning_site"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com/learning_site"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-sm text-gray-500">
            <p>
              メンテナンスに関するお問い合わせは
              <a href="mailto:support@learning-site.com" className="text-blue-600 hover:text-blue-500 font-semibold">
                support@learning-site.com
              </a>
              までお願いいたします。
            </p>
            <p className="mt-2">
              メンテナンスが予定より早く終了する場合があります。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
