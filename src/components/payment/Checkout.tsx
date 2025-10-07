import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Lock, Check, ArrowLeft, Calendar, Star } from 'lucide-react';

interface Plan {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    billingAddress: '',
    city: '',
    postalCode: '',
    country: 'JP'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // プラン情報を取得（実際のアプリではURLパラメータやstateから取得）
  const selectedPlan: Plan = {
    id: 1,
    name: 'プレミアムプラン',
    price: 2000,
    description: 'すべてのコースにアクセス可能',
    features: [
      '全コース視聴',
      '進捗管理',
      'クイズ機能',
      '優先サポート',
      '修了証書',
      '広告なしの学習体験'
    ],
    isPopular: true
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.cardNumber.replace(/\s/g, '')) {
      newErrors.cardNumber = 'カード番号を入力してください';
    } else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = '有効なカード番号を入力してください';
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = '有効期限を入力してください';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'MM/YY形式で入力してください';
    }

    if (!formData.cvv) {
      newErrors.cvv = 'CVVを入力してください';
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = '有効なCVVを入力してください';
    }

    if (!formData.cardName.trim()) {
      newErrors.cardName = 'カード名義人を入力してください';
    }

    if (!formData.billingAddress.trim()) {
      newErrors.billingAddress = '請求先住所を入力してください';
    }

    if (!formData.city.trim()) {
      newErrors.city = '市区町村を入力してください';
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = '郵便番号を入力してください';
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
    
    // ダミーの決済処理（実際のAPI接続は行わない）
    setTimeout(() => {
      setIsLoading(false);
      navigate('/payment-success', { 
        state: { 
          plan: selectedPlan,
          amount: selectedPlan.price 
        } 
      });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // カード番号のフォーマット
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [name]: formatted }));
    }
    // 有効期限のフォーマット
    else if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(.{2})/, '$1/');
      setFormData(prev => ({ ...prev, [name]: formatted }));
    }
    // CVVの数字のみ
    else if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: formatted }));
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // エラーをクリア
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左側: 決済フォーム */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <button
                  onClick={() => navigate('/pricing')}
                  className="mr-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">決済情報</h1>
                  <p className="text-gray-600 mt-1">安全な決済でサブスクリプションを開始</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Card Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  カード情報
                </h3>
                
                <div className="space-y-4">
                  {/* Card Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      カード番号
                    </label>
                    <input
                      name="cardNumber"
                      type="text"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.cardNumber ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                  </div>

                  {/* Expiry and CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        有効期限
                      </label>
                      <input
                        name="expiryDate"
                        type="text"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.expiryDate ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        name="cvv"
                        type="text"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.cvv ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="123"
                        maxLength={4}
                      />
                      {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                    </div>
                  </div>

                  {/* Card Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      カード名義人
                    </label>
                    <input
                      name="cardName"
                      type="text"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.cardName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="TARO TANAKA"
                    />
                    {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">請求先住所</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      住所
                    </label>
                    <input
                      name="billingAddress"
                      type="text"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.billingAddress ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="東京都渋谷区..."
                    />
                    {errors.billingAddress && <p className="text-red-500 text-sm mt-1">{errors.billingAddress}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        市区町村
                      </label>
                      <input
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.city ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="渋谷区"
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        郵便番号
                      </label>
                      <input
                        name="postalCode"
                        type="text"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.postalCode ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="150-0002"
                      />
                      {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center">
                  <Lock className="w-5 h-5 text-green-500 mr-3" />
                  <p className="text-green-700 text-sm">
                    すべての決済情報は暗号化され、安全に処理されます。
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 px-6 rounded-xl font-bold hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    処理中...
                  </div>
                ) : (
                  `${formatCurrency(selectedPlan.price)}でサブスクリプションを開始`
                )}
              </button>
            </form>
          </div>

          {/* 右側: プラン詳細 */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">選択したプラン</h2>
            
            <div className={`border-2 rounded-2xl p-6 ${selectedPlan.isPopular ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
              {selectedPlan.isPopular && (
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    人気プラン
                  </div>
                </div>
              )}
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedPlan.name}</h3>
              <p className="text-gray-600 mb-4">{selectedPlan.description}</p>
              
              <div className="text-3xl font-bold text-gray-800 mb-6">
                {formatCurrency(selectedPlan.price)}
                <span className="text-lg text-gray-500">/月</span>
              </div>

              <ul className="space-y-3 mb-6">
                {selectedPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>次回請求日</span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    2024年2月1日
                  </span>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="mt-6 text-xs text-gray-500">
              <p>
                サブスクリプションを開始することで、
                <a href="/terms" className="text-blue-600 hover:text-blue-500">利用規約</a>
                および
                <a href="/privacy" className="text-blue-600 hover:text-blue-500">プライバシーポリシー</a>
                に同意したものとみなされます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
