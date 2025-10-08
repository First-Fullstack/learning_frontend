import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockCourses, categories } from '../data/mockData';
import { Play, Lock, Crown, Clock } from 'lucide-react';

const CourseList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [coursesData, setCoursesData] = useState({
    courses: [],
    current_page: 0,
    total_count: 0,
    total_pages: 0}
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('http://localhost:8000/v1/courses', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
          const data = await res.json();
          setCoursesData(data);          
        } else {
          const err = await res.json();
          alert(err.detail?.message || 'コースを取得できませんでした');
        }
      } catch (error) {
        alert('サーバーエラー');
      }
    };
    console.log(coursesData);
    
    fetchCourses();
  }, []);

  useEffect(() => {
    console.log('Updated coursesData:', coursesData);
  }, [coursesData]);

  const filteredCourses = selectedCategory === 'All'
    ? coursesData.courses 
    : coursesData.courses.filter(course => course.category === selectedCategory);

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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
            コースを
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600"> 探す</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            様々なカテゴリとスキルレベルの素晴らしいコースを発見しましょう
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category === 'All' ? 'すべて' : 
               category === 'Languages' ? '言語' :
               category === 'Business' ? 'ビジネス' :
               category === 'Creative' ? 'クリエイティブ' :
               category === 'Lifestyle' ? 'ライフスタイル' : category}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Premium Badge */}
                {course.isPremium && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center shadow-lg">
                      <Crown className="w-4 h-4 mr-1" />
                      プレミアム
                    </div>
                  </div>
                )}

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-8 h-8 text-gray-800 ml-1" />
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                {/* Category and Difficulty */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-500 font-medium">
                    {course.category === 'Languages' ? '言語' :
                     course.category === 'Business' ? 'ビジネス' :
                     course.category === 'Creative' ? 'クリエイティブ' :
                     course.category === 'Lifestyle' ? 'ライフスタイル' : course.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(course.difficulty)}`}>
                    {course.difficulty === 'Beginner' ? '初級' :
                     course.difficulty === 'Intermediate' ? '中級' :
                     course.difficulty === 'Advanced' ? '上級' : course.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{course.title}</h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">進捗</span>
                    <span className="text-sm font-semibold text-gray-700">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to={`/course/${course.id}`}
                  className={`w-full py-3 rounded-xl font-semibold text-center transition-all duration-200 flex items-center justify-center ${
                    course.isPremium && course.progress === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                  }`}
                >
                  {course.isPremium && course.progress === 0 ? (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      プレミアム限定
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      {course.progress > 0 ? '学習を続ける' : 'コースを始める'}
                    </>
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Courses Message */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">コースが見つかりません</h3>
            <p className="text-gray-500">別のカテゴリを選択してみてください</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-3xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">すべてのコースをアンロックする準備はできましたか？</h2>
          <p className="text-lg mb-6 opacity-90">プレミアムコンテンツへの無制限アクセスで学習の旅を加速させましょう。</p>
          <Link
            to="/pricing"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-2xl font-bold hover:bg-gray-100 transition-colors"
          >
            料金プランを見る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseList;