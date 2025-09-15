import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Edit, Save } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  joinDate: string;
  totalCourses: number;
  completedCourses: number;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // モックユーザーデータ
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '田中太郎',
    email: 'tanaka@example.com',
    joinDate: '2024年1月',
    totalCourses: 5,
    completedCourses: 2
  });

  const [editForm, setEditForm] = useState({
    name: userProfile.name,
    email: userProfile.email
  });

  const getProgressPercentage = () => {
    return Math.round((userProfile.completedCourses / userProfile.totalCourses) * 100);
  };

  const handleSave = () => {
    setUserProfile(prev => ({
      ...prev,
      name: editForm.name,
      email: editForm.email
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: userProfile.name,
      email: userProfile.email
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">マイページ</h1>
            <button
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Profile Overview */}
          <div className="space-y-6">
            {/* User Info */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mr-4">プロフィール</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    編集
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      保存
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                    >
                      キャンセル
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">名前</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="名前を入力"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{userProfile.name}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">メールアドレス</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="メールアドレスを入力"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{userProfile.email}</div>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-6">メンバー登録: {userProfile.joinDate}</p>

              {/* Basic Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{userProfile.totalCourses}</div>
                  <div className="text-sm text-gray-600">総コース数</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{userProfile.completedCourses}</div>
                  <div className="text-sm text-gray-600">完了コース</div>
                </div>
              </div>

              {/* Simple Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">完了率</span>
                  <span className="text-sm font-medium text-gray-700">{getProgressPercentage()}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 