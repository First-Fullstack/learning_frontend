import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Trophy, Star, RefreshCw, ArrowLeft, Target } from 'lucide-react';

interface LocationState {
  score: number;
  totalQuestions: number;
  courseId: string;
}

const Completion: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">クイズ結果が見つかりません</h2>
          <Link to="/courses" className="text-blue-600 hover:text-blue-800">
            コース一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const { score, totalQuestions, courseId } = state;
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getScoreColor = () => {
    if (percentage >= 80) return 'from-green-400 to-emerald-500';
    if (percentage >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  const getScoreMessage = () => {
    if (percentage >= 80) return {
      title: "素晴らしい！🎉",
      message: "このトピックをマスターしました！次の挑戦の準備はできましたか？",
      emoji: "🏆"
    };
    if (percentage >= 60) return {
      title: "よくできました！👍",
      message: "正しい道を進んでいます。復習して再挑戦して向上しましょう！",
      emoji: "📚"
    };
    return {
      title: "学習を続けましょう！💪",
      message: "心配しないで！学習には時間がかかります。教材を復習して再挑戦しましょう。",
      emoji: "🎯"
    };
  };

  const scoreInfo = getScoreMessage();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Results Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 to-pink-400"></div>
          
          {/* Score Circle */}
          <div className="mb-8">
            <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r ${getScoreColor()} flex items-center justify-center shadow-2xl mb-6`}>
              <div className="text-center">
                <div className="text-3xl font-black text-white">{percentage}%</div>
                <div className="text-sm text-white opacity-90">スコア</div>
              </div>
            </div>
            
            <div className="text-6xl mb-4">{scoreInfo.emoji}</div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">{scoreInfo.title}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{scoreInfo.message}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{score}</div>
              <div className="text-gray-600">正解数</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{totalQuestions}</div>
              <div className="text-gray-600">総問題数</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{percentage >= 80 ? 'A' : percentage >= 60 ? 'B' : 'C'}</div>
              <div className="text-gray-600">評価</div>
            </div>
          </div>

          {/* Achievement Badge */}
          {percentage >= 80 && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl mb-8">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="w-8 h-8 mr-2" />
                <span className="text-2xl font-bold">実績解除！</span>
              </div>
              <p className="text-lg opacity-90">クイズマスター - 80%以上を獲得</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <Link
            to={`/quiz/${courseId}`}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            再挑戦
          </Link>
          
          <Link
            to={`/course/${courseId}`}
            className="bg-white text-gray-800 py-4 px-6 rounded-2xl font-bold border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            コースに戻る
          </Link>
          
          <Link
            to="/courses"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-2xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center"
          >
            <Star className="w-5 h-5 mr-2" />
            他のコース
          </Link>
        </div>

        {/* Motivational Quote */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-6">
          <blockquote className="text-lg text-gray-700 italic">
            "学習の素晴らしいところは、誰もそれをあなたから奪うことができないことです。"
          </blockquote>
          <cite className="text-gray-500 text-sm block mt-2">- B.B. King</cite>
        </div>
      </div>
    </div>
  );
};

export default Completion;