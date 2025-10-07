import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Trash2, CheckCircle } from 'lucide-react';

const DeleteAccount: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmText: '',
    reason: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const reasons = [
    'サービスが不要になった',
    '他のサービスに移行する',
    '料金が高い',
    '機能が不十分',
    'サポートが不十分',
    'その他'
  ];

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.password) {
      newErrors.password = 'パスワードを入力してください';
    }

    if (!formData.confirmText) {
      newErrors.confirmText = '確認テキストを入力してください';
    } else if (formData.confirmText !== 'DELETE') {
      newErrors.confirmText = '「DELETE」と正確に入力してください';
    }

    if (!formData.reason) {
      newErrors.reason = '退会理由を選択してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // ダミーの処理（実際のAPI接続は行わない）
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // エラーをクリア
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSuccess = () => {
    navigate('/');
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>

            {/* Success Message */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">アカウントが削除されました</h2>
            <p className="text-gray-600 mb-6">
              アカウントと関連するすべてのデータが削除されました。
              <br />
              ご利用いただき、ありがとうございました。
            </p>

            {/* Action Button */}
            <button
              onClick={handleSuccess}
              className="w-full bg-red-500 text-white py-3 px-4 rounded-xl font-bold hover:bg-red-600 transition-colors"
            >
              ホームページに戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isConfirmed) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <button
                  onClick={() => navigate('/profile')}
                  className="mr-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">アカウント削除</h1>
                  <p className="text-gray-600 mt-1">アカウントを削除する前に確認してください</p>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">重要な注意事項</h3>
                  <ul className="text-sm text-red-700 space-y-2">
                    <li>• アカウントを削除すると、すべてのデータが完全に削除されます</li>
                    <li>• 学習進捗、コース履歴、修了証書などがすべて失われます</li>
                    <li>• この操作は取り消すことができません</li>
                    <li>• サブスクリプションがある場合は、先に解約してください</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Confirmation Button */}
            <div className="text-center">
              <button
                onClick={() => setIsConfirmed(true)}
                className="bg-red-500 text-white py-3 px-8 rounded-xl font-bold hover:bg-red-600 transition-colors"
              >
                削除を続行する
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <button
                onClick={() => setIsConfirmed(false)}
                className="mr-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">アカウント削除確認</h1>
                <p className="text-gray-600 mt-1">最終確認を行ってください</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                現在のパスワード
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="現在のパスワードを入力"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? '👁️‍🗨️' : '👁️'}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Reason Field */}
            <div>
              <label htmlFor="reason" className="block text-sm font-semibold text-gray-700 mb-2">
                退会理由
              </label>
              <select
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors ${
                  errors.reason ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">選択してください</option>
                {reasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
              {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
            </div>

            {/* Confirmation Text Field */}
            <div>
              <label htmlFor="confirmText" className="block text-sm font-semibold text-gray-700 mb-2">
                確認のため「DELETE」と入力してください
              </label>
              <input
                id="confirmText"
                name="confirmText"
                type="text"
                value={formData.confirmText}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors ${
                  errors.confirmText ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="DELETE"
              />
              {errors.confirmText && <p className="text-red-500 text-sm mt-1">{errors.confirmText}</p>}
            </div>

            {/* Final Warning */}
            <div className="bg-red-100 border border-red-300 rounded-xl p-4">
              <div className="flex items-center">
                <Trash2 className="w-5 h-5 text-red-500 mr-3" />
                <p className="text-red-700 font-medium">
                  この操作は取り消すことができません。本当に削除しますか？
                </p>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setIsConfirmed(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                キャンセル
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-red-500 text-white py-3 px-4 rounded-xl font-bold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    削除中...
                  </div>
                ) : (
                  'アカウントを削除'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
