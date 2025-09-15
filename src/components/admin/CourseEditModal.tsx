import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { Course } from '../../data/adminMockData';

interface CourseEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  course?: Course | null;
  onSave: (courseData: Partial<Course>) => void;
}

const CourseEditModal: React.FC<CourseEditModalProps> = ({
  isOpen,
  onClose,
  course,
  onSave
}) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    status: 'draft' as 'published' | 'draft' | 'archived',
    isPremium: false,
    videoUrls: [''],
    thumbnailUrl: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    'プログラミング',
    'デザイン',
    'ビジネス',
    'マーケティング',
    'データサイエンス',
    'ライフスタイル',
    'その他'
  ];

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        category: course.category,
        description: 'この講座では、基礎から応用まで体系的に学習できます。',
        status: course.status,
        isPremium: true,
        videoUrls: ['https://www.youtube.com/watch?v=example1', 'https://vimeo.com/example2'],
        thumbnailUrl: 'https://example.com/thumbnail.jpg'
      });
    } else {
      setFormData({
        title: '',
        category: '',
        description: '',
        status: 'draft',
        isPremium: false,
        videoUrls: [''],
        thumbnailUrl: ''
      });
    }
    setErrors({});
  }, [course]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // エラーをクリア
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleVideoUrlChange = (index: number, value: string) => {
    const newVideoUrls = [...formData.videoUrls];
    newVideoUrls[index] = value;
    setFormData(prev => ({
      ...prev,
      videoUrls: newVideoUrls
    }));
  };

  const addVideoUrl = () => {
    setFormData(prev => ({
      ...prev,
      videoUrls: [...prev.videoUrls, '']
    }));
  };

  const removeVideoUrl = (index: number) => {
    if (formData.videoUrls.length > 1) {
      const newVideoUrls = formData.videoUrls.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        videoUrls: newVideoUrls
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = '講座名は必須です';
    }

    if (!formData.category) {
      newErrors.category = 'カテゴリを選択してください';
    }

    if (!formData.description.trim()) {
      newErrors.description = '講座の説明は必須です';
    }

    if (formData.videoUrls.some(url => !url.trim())) {
      newErrors.videoUrls = '動画URLは必須です';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave({
        ...formData,
        id: course?.id,
        videoCount: formData.videoUrls.filter(url => url.trim()).length,
        createdAt: course?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* 背景オーバーレイ */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        {/* モーダル */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                {course ? '講座を編集' : '新規講座を作成'}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 基本情報 */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    講座名 *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      errors.title ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="講座名を入力"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    カテゴリ *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      errors.category ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">カテゴリを選択</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                  )}
                </div>
              </div>

              {/* 説明 */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  講座の説明 *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="講座の内容や特徴を説明してください"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              {/* 設定 */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ステータス
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="draft">下書き</option>
                    <option value="published">公開</option>
                    <option value="archived">アーカイブ</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPremium"
                    checked={formData.isPremium}
                    onChange={(e) => handleInputChange('isPremium', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPremium" className="ml-2 block text-sm text-gray-900">
                    プレミアムコンテンツ
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    サムネイルURL
                  </label>
                  <input
                    type="url"
                    value={formData.thumbnailUrl}
                    onChange={(e) => handleInputChange('thumbnailUrl', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="https://example.com/thumbnail.jpg"
                  />
                </div>
              </div>

              {/* 動画URL */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    動画URL *
                  </label>
                  <button
                    type="button"
                    onClick={addVideoUrl}
                    className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-blue-600 bg-blue-50 hover:bg-blue-100"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    動画を追加
                  </button>
                </div>
                
                <div className="space-y-3">
                  {formData.videoUrls.map((url, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => handleVideoUrlChange(index, e.target.value)}
                        className={`flex-1 border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                          errors.videoUrls ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                      {formData.videoUrls.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeVideoUrl(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {errors.videoUrls && (
                  <p className="mt-1 text-sm text-red-600">{errors.videoUrls}</p>
                )}
              </div>

              {/* プレビュー */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">プレビュー</h4>
                <div className="bg-white rounded border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-900">{formData.title || '講座名'}</h5>
                    <div className="flex items-center space-x-2">
                      {formData.isPremium && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          プレミアム
                        </span>
                      )}
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        formData.status === 'published' ? 'bg-green-100 text-green-800' :
                        formData.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {formData.status === 'published' ? '公開' :
                         formData.status === 'draft' ? '下書き' : 'アーカイブ'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {formData.category && `${formData.category} • `}
                    {formData.videoUrls.filter(url => url.trim()).length}本の動画
                  </p>
                  <p className="text-sm text-gray-500">
                    {formData.description || '講座の説明がここに表示されます'}
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* フッター */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              <Save className="h-4 w-4 mr-2" />
              {course ? '更新' : '作成'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseEditModal; 