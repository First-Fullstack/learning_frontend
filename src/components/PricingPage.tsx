import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, Zap, Crown, BookOpen } from 'lucide-react';

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-gray-800 mb-6">
            あなたの
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"> 学習の旅</span>
            を選択
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            あなたの学習スタイルに最適なプランを選択してください。無料から始めて、必要に応じてアップグレードできます。
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200 relative">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">無料</h3>
              <div className="text-4xl font-black text-gray-800 mb-4">
                ¥0<span className="text-lg font-normal text-gray-500">/月</span>
              </div>
              <p className="text-gray-600">始めるのに最適</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">3つの無料コースにアクセス</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">基本的な進捗管理</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">コミュニティアクセス</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">モバイルアプリアクセス</span>
              </li>
            </ul>

            <Link
              to="/courses"
              className="w-full bg-gray-100 text-gray-800 py-4 rounded-2xl font-bold text-center block hover:bg-gray-200 transition-colors"
            >
              無料で始める
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 shadow-2xl border-2 border-yellow-300 relative transform scale-105">
            {/* Most Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-white text-orange-500 px-6 py-2 rounded-full font-bold text-sm flex items-center shadow-lg">
                <Star className="w-4 h-4 mr-2" />
                最も人気
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">プレミアム</h3>
              <div className="text-4xl font-black text-white mb-4">
                ¥1,480<span className="text-lg font-normal text-yellow-100">/月</span>
              </div>
              <p className="text-yellow-100">優秀になるために必要なすべて</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-white mr-3 flex-shrink-0" />
                <span className="text-white">500以上のコースへの無制限アクセス</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-white mr-3 flex-shrink-0" />
                <span className="text-white">高度な進捗分析</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-white mr-3 flex-shrink-0" />
                <span className="text-white">オフライン用のダウンロード可能コンテンツ</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-white mr-3 flex-shrink-0" />
                <span className="text-white">優先カスタマーサポート</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-white mr-3 flex-shrink-0" />
                <span className="text-white">修了証明書</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-white mr-3 flex-shrink-0" />
                <span className="text-white">広告なしの学習体験</span>
              </li>
            </ul>

            <button className="w-full bg-white text-orange-500 py-4 rounded-2xl font-bold text-center hover:bg-gray-50 transition-colors">
              今すぐサブスク
            </button>
          </div>

          {/* Pay-per-Course Plan */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-blue-200 relative">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">買い切り</h3>
              <div className="text-4xl font-black text-gray-800 mb-4">
                ¥2,980<span className="text-lg font-normal text-gray-500">/コース</span>
              </div>
              <p className="text-gray-600">特定のコースに集中</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">選択したコースへの永続アクセス</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">オフライン用のダウンロード可能</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">修了証明書</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">月額料金なし</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">いつでも学習可能</span>
              </li>
            </ul>

            <Link
              to="/courses"
              className="w-full bg-blue-500 text-white py-4 rounded-2xl font-bold text-center block hover:bg-blue-600 transition-colors"
            >
              コースを選択
            </Link>
          </div>
        </div>

        {/* Plan Comparison */}
        <div className="mt-16 bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">プラン比較</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">機能</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">無料</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">プレミアム</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">買い切り</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-4 font-medium text-gray-700">コースアクセス</td>
                  <td className="py-4 px-4 text-center text-gray-600">3コース</td>
                  <td className="py-4 px-4 text-center text-gray-600">無制限</td>
                  <td className="py-4 px-4 text-center text-gray-600">選択したコース</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-gray-700">進捗管理</td>
                  <td className="py-4 px-4 text-center text-gray-600">基本</td>
                  <td className="py-4 px-4 text-center text-gray-600">高度</td>
                  <td className="py-4 px-4 text-center text-gray-600">基本</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-gray-700">オフライン学習</td>
                  <td className="py-4 px-4 text-center text-gray-600">✗</td>
                  <td className="py-4 px-4 text-center text-gray-600">✓</td>
                  <td className="py-4 px-4 text-center text-gray-600">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-gray-700">修了証明書</td>
                  <td className="py-4 px-4 text-center text-gray-600">✗</td>
                  <td className="py-4 px-4 text-center text-gray-600">✓</td>
                  <td className="py-4 px-4 text-center text-gray-600">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-gray-700">月額料金</td>
                  <td className="py-4 px-4 text-center text-gray-600">¥0</td>
                  <td className="py-4 px-4 text-center text-gray-600">¥1,480</td>
                  <td className="py-4 px-4 text-center text-gray-600">¥0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">プランを選ぶ理由</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">柔軟性</h4>
              <p className="text-gray-600 text-sm">あなたの学習スタイルと予算に合わせて最適なプランを選択できます。</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">価値の提供</h4>
              <p className="text-gray-600 text-sm">各プランで提供される価値に見合った料金設定で、コストパフォーマンスを重視。</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">成長サポート</h4>
              <p className="text-gray-600 text-sm">学習の各段階で必要なサポートとリソースを提供し、継続的な成長をサポート。</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">よくある質問</h3>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Q: プランはいつでも変更できますか？</h4>
              <p className="text-gray-600">はい、いつでもプランを変更できます。プレミアムから無料への変更も可能です。</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Q: 買い切りコースは永続的に利用できますか？</h4>
              <p className="text-gray-600">はい、一度購入したコースは永続的にアクセスできます。月額料金は発生しません。</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Q: 無料プランでも進捗は保存されますか？</h4>
              <p className="text-gray-600">はい、無料プランでも学習進捗は保存され、後でプレミアムにアップグレードした際に引き継がれます。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;