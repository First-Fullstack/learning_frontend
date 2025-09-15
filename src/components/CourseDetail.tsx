import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockCourses } from '../data/mockData';
import { Play, Lock, Crown, Clock, CheckCircle, Star, ArrowLeft } from 'lucide-react';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = mockCourses.find(c => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">コースが見つかりません</h2>
          <Link to="/courses" className="text-blue-600 hover:text-blue-800">
            コース一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const isLocked = course.isPremium && course.progress === 0;
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          コース一覧に戻る
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Video and Info */}
          <div>
            {/* Video Player */}
            <div className="relative mb-8">
              <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                {isLocked ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                    <div className="text-center">
                      <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">プレミアムコンテンツ</h3>
                      <p className="text-gray-300 mb-6">このコースをアンロックするにはサブスクしてください</p>
                      <Link
                        to="/pricing"
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all"
                      >
                        今すぐサブスク
                      </Link>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={course.videoUrl}
                    title={course.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>

              {/* Premium Badge */}
              {course.isPremium && (
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold flex items-center shadow-lg">
                    <Crown className="w-4 h-4 mr-2" />
                    プレミアム
                  </div>
                </div>
              )}
            </div>

            {/* Course Meta */}
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                {course.category === 'Languages' ? '言語' :
                 course.category === 'Business' ? 'ビジネス' :
                 course.category === 'Creative' ? 'クリエイティブ' :
                 course.category === 'Lifestyle' ? 'ライフスタイル' : course.category}
              </span>
              <span className={`px-4 py-2 rounded-full font-semibold ${getDifficultyColor(course.difficulty)}`}>
                {course.difficulty === 'Beginner' ? '初級' :
                 course.difficulty === 'Intermediate' ? '中級' :
                 course.difficulty === 'Advanced' ? '上級' : course.difficulty}
              </span>
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                2時間30分
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="ml-2 text-gray-600 font-semibold">4.9 (2,847件のレビュー)</span>
            </div>
          </div>

          {/* Right Column - Course Details */}
          <div>
            <h1 className="text-4xl font-black text-gray-800 mb-6">{course.title}</h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">{course.description}</p>

            {/* Progress Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">あなたの進捗</h3>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">コース完了率</span>
                  <span className="font-bold text-gray-800">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
              
              {course.progress > 0 && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-semibold">素晴らしい進捗です！頑張りましょう！</span>
                </div>
              )}
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">学習内容</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">基礎とコアコンセプトをマスター</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">実践的な例と演習で練習</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">インタラクティブクイズで自信を構築</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">修了証明書を取得</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {isLocked ? (
                <div>
                  <Link
                    to="/pricing"
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-4 rounded-2xl font-bold text-center block hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 flex items-center justify-center"
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    アンロックするにはサブスク
                  </Link>
                  <p className="text-center text-gray-500 mt-2 text-sm">
                    これはプレミアムコンテンツです。すべての機能にアクセスするにはサブスクしてください。
                  </p>
                </div>
              ) : (
                <Link
                  to={`/quiz/${course.id}`}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold text-center block hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  クイズを始める
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;