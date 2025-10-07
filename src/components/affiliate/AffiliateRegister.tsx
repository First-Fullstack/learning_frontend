import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Building, Globe, DollarSign, CheckCircle, ArrowLeft } from 'lucide-react';

const AffiliateRegister: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // 個人情報
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // ビジネス情報
    companyName: '',
    website: '',
    businessType: '',
    
    // アフィリエイト情報
    experience: '',
    expectedTraffic: '',
    promotionMethods: [] as string[],
    
    // 支払い情報
    paymentMethod: '',
    bankName: '',
    accountNumber: '',
    accountHolder: '',
    
    // 同意事項
    agreeToTerms: false,
    agreeToPrivacy: false,
    agreeToAffiliateTerms: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [currentStep, setCurrentStep] = useState(1);

  const businessTypes = [
    '個人ブロガー',
    'インフルエンサー',
    '教育関連企業',
    'マーケティング代理店',
    'その他'
  ];

  const experienceLevels = [
    '初心者（初めてアフィリエイトを始める）',
    '中級者（1-2年の経験）',
    '上級者（3年以上の経験）',
    'エキスパート（5年以上の経験）'
  ];

  const trafficLevels = [
    '月間1,000PV未満',
    '月間1,000-10,000PV',
    '月間10,000-100,000PV',
    '月間100,000PV以上'
  ];

  const promotionMethods = [
    'ブログ記事',
    'SNS投稿',
    'メールマガジン',
    'YouTube動画',
    'ポッドキャスト',
    'ウェビナー',
    'その他'
  ];

  const paymentMethods = [
    '銀行振込',
    'PayPal',
    'Stripe',
    'その他'
  ];

  const validateStep = (step: number) => {
    const newErrors: {[key: string]: string} = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = '名前を入力してください';
      if (!formData.lastName.trim()) newErrors.lastName = '姓を入力してください';
      if (!formData.email.trim()) newErrors.email = 'メールアドレスを入力してください';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = '有効なメールアドレスを入力してください';
      if (!formData.phone.trim()) newErrors.phone = '電話番号を入力してください';
    }

    if (step === 2) {
      if (!formData.companyName.trim()) newErrors.companyName = '会社名または個人名を入力してください';
      if (!formData.website.trim()) newErrors.website = 'ウェブサイトURLを入力してください';
      if (!formData.businessType) newErrors.businessType = 'ビジネスタイプを選択してください';
    }

    if (step === 3) {
      if (!formData.experience) newErrors.experience = '経験レベルを選択してください';
      if (!formData.expectedTraffic) newErrors.expectedTraffic = '予想トラフィックを選択してください';
      if (formData.promotionMethods.length === 0) newErrors.promotionMethods = 'プロモーション方法を選択してください';
    }

    if (step === 4) {
      if (!formData.paymentMethod) newErrors.paymentMethod = '支払い方法を選択してください';
      if (formData.paymentMethod === '銀行振込') {
        if (!formData.bankName.trim()) newErrors.bankName = '銀行名を入力してください';
        if (!formData.accountNumber.trim()) newErrors.accountNumber = '口座番号を入力してください';
        if (!formData.accountHolder.trim()) newErrors.accountHolder = '口座名義を入力してください';
      }
    }

    if (step === 5) {
      if (!formData.agreeToTerms) newErrors.agreeToTerms = '利用規約に同意してください';
      if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = 'プライバシーポリシーに同意してください';
      if (!formData.agreeToAffiliateTerms) newErrors.agreeToAffiliateTerms = 'アフィリエイト規約に同意してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(5)) {
      return;
    }

    setIsLoading(true);
    
    // ダミーの登録処理（実際のAPI接続は行わない）
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'promotionMethods') {
        const method = (e.target as HTMLInputElement).value;
        setFormData(prev => ({
          ...prev,
          promotionMethods: checked
            ? [...prev.promotionMethods, method]
            : prev.promotionMethods.filter(m => m !== method)
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // エラーをクリア
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSuccess = () => {
    navigate('/affiliate/dashboard');
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">登録が完了しました！</h2>
            <p className="text-gray-600 mb-6">
              アフィリエイトプログラムへの登録が正常に完了しました。
              <br />
              審査後、詳細な情報をお送りいたします。
            </p>
            <button
              onClick={handleSuccess}
              className="w-full bg-green-500 text-white py-3 px-4 rounded-xl font-bold hover:bg-green-600 transition-colors"
            >
              ダッシュボードに移動
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="mr-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">アフィリエイト登録</h1>
              <p className="text-gray-600 mt-1">パートナーとして一緒に成長しましょう</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">ステップ {currentStep} / 5</span>
            <span className="text-sm font-medium text-gray-600">{Math.round((currentStep / 5) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左側: フォーム */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <form onSubmit={handleSubmit}>
                {/* Step 1: 個人情報 */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">個人情報</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          名前 <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.firstName ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="太郎"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          姓 <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.lastName ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="田中"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.email ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="tanaka@example.com"
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        電話番号 <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.phone ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="090-1234-5678"
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                )}

                {/* Step 2: ビジネス情報 */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">ビジネス情報</h2>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        会社名または個人名 <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          name="companyName"
                          type="text"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.companyName ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="株式会社サンプル"
                        />
                      </div>
                      {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ウェブサイトURL <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          name="website"
                          type="url"
                          value={formData.website}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.website ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="https://example.com"
                        />
                      </div>
                      {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ビジネスタイプ <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          errors.businessType ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="">選択してください</option>
                        {businessTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>}
                    </div>
                  </div>
                )}

                {/* Step 3: アフィリエイト情報 */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">アフィリエイト情報</h2>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        アフィリエイト経験 <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          errors.experience ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="">選択してください</option>
                        {experienceLevels.map((level) => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                      {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        予想トラフィック <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="expectedTraffic"
                        value={formData.expectedTraffic}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          errors.expectedTraffic ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="">選択してください</option>
                        {trafficLevels.map((level) => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                      {errors.expectedTraffic && <p className="text-red-500 text-sm mt-1">{errors.expectedTraffic}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        プロモーション方法 <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {promotionMethods.map((method) => (
                          <label key={method} className="flex items-center">
                            <input
                              type="checkbox"
                              name="promotionMethods"
                              value={method}
                              checked={formData.promotionMethods.includes(method)}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            <span className="text-sm text-gray-700">{method}</span>
                          </label>
                        ))}
                      </div>
                      {errors.promotionMethods && <p className="text-red-500 text-sm mt-1">{errors.promotionMethods}</p>}
                    </div>
                  </div>
                )}

                {/* Step 4: 支払い情報 */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">支払い情報</h2>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        支払い方法 <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          errors.paymentMethod ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="">選択してください</option>
                        {paymentMethods.map((method) => (
                          <option key={method} value={method}>{method}</option>
                        ))}
                      </select>
                      {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>}
                    </div>

                    {formData.paymentMethod === '銀行振込' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            銀行名 <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="bankName"
                            type="text"
                            value={formData.bankName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                              errors.bankName ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="三菱UFJ銀行"
                          />
                          {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            口座番号 <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="accountNumber"
                            type="text"
                            value={formData.accountNumber}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                              errors.accountNumber ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="1234567"
                          />
                          {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            口座名義 <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="accountHolder"
                            type="text"
                            value={formData.accountHolder}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                              errors.accountHolder ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="タナカタロウ"
                          />
                          {errors.accountHolder && <p className="text-red-500 text-sm mt-1">{errors.accountHolder}</p>}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 5: 同意事項 */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">同意事項</h2>
                    
                    <div className="space-y-4">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleInputChange}
                          className="mt-1 mr-3"
                        />
                        <span className="text-sm text-gray-700">
                          <a href="/terms" className="text-blue-600 hover:text-blue-500">利用規約</a>に同意します
                          <span className="text-red-500">*</span>
                        </span>
                      </label>
                      {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          name="agreeToPrivacy"
                          checked={formData.agreeToPrivacy}
                          onChange={handleInputChange}
                          className="mt-1 mr-3"
                        />
                        <span className="text-sm text-gray-700">
                          <a href="/privacy" className="text-blue-600 hover:text-blue-500">プライバシーポリシー</a>に同意します
                          <span className="text-red-500">*</span>
                        </span>
                      </label>
                      {errors.agreeToPrivacy && <p className="text-red-500 text-sm">{errors.agreeToPrivacy}</p>}

                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          name="agreeToAffiliateTerms"
                          checked={formData.agreeToAffiliateTerms}
                          onChange={handleInputChange}
                          className="mt-1 mr-3"
                        />
                        <span className="text-sm text-gray-700">
                          <a href="/affiliate-terms" className="text-blue-600 hover:text-blue-500">アフィリエイト規約</a>に同意します
                          <span className="text-red-500">*</span>
                        </span>
                      </label>
                      {errors.agreeToAffiliateTerms && <p className="text-red-500 text-sm">{errors.agreeToAffiliateTerms}</p>}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                      前へ
                    </button>
                  )}
                  
                  <div className="ml-auto">
                    {currentStep < 5 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-colors"
                      >
                        次へ
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isLoading ? '登録中...' : '登録完了'}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* 右側: アフィリエイト情報 */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">アフィリエイトプログラムの特徴</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center">
                  <DollarSign className="w-4 h-4 text-green-500 mr-2" />
                  最大30%のコミッション
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  月次支払い
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  リアルタイムレポート
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  専用サポート
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  マーケティング素材提供
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">審査について</h4>
              <p className="text-sm text-blue-700">
                登録後、1-2営業日以内に審査を行い、結果をお知らせします。
                承認後、アフィリエイトリンクとダッシュボードへのアクセス情報をお送りします。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateRegister;
