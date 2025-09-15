import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Users, Trophy, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                  <Play className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-800 mb-6 leading-tight">
              いつでも
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600"> 何でも</span>
              <br />
              学べる！
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              楽しくインタラクティブなコースで新しいスキルを習得しましょう。
              言語からビジネススキルまで - 学習を楽しくします！🚀
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to="/courses"
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center"
              >
                今すぐ学習を始める
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              
              <Link
                to="/pricing"
                className="bg-white text-gray-800 px-8 py-4 rounded-2xl font-bold text-lg border-3 border-gray-200 hover:border-gray-300 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                料金を見る
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-400">
                <div className="flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">1000万人+</div>
                <div className="text-gray-600">満足な学習者</div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-400">
                <div className="flex items-center justify-center mb-4">
                  <Trophy className="w-8 h-8 text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">500+</div>
                <div className="text-gray-600">専門コース</div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-400">
                <div className="flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-purple-500" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">4.9/5</div>
                <div className="text-gray-600">平均評価</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-20 animate-pulse delay-500"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">サブスク学習サイトデモを選ぶ理由</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              あなたのペースに合わせて、モチベーションを保つ完璧な学習体験を設計しました。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-6">
                <Play className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">インタラクティブ学習</h3>
              <p className="text-gray-600">クイズ、動画、実践的な演習で学習を定着させます。</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-100">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">進捗管理</h3>
              <p className="text-gray-600">詳細な分析と達成バッジで上達を確認できます。</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">専門コンテンツ</h3>
              <p className="text-gray-600">業界のプロフェッショナルと認定講師から学べます。</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;