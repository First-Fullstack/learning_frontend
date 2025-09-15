import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Eye, EyeOff, HelpCircle } from 'lucide-react';
import { Quiz, courses } from '../../data/adminMockData';

interface Question {
  id: number;
  text: string;
  type: 'multiple_choice' | 'true_false';
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  quiz?: Quiz | null;
  onSave: (quizData: Partial<Quiz> & { questions: Question[] }) => void;
}

const QuizEditModal: React.FC<QuizEditModalProps> = ({
  isOpen,
  onClose,
  quiz,
  onSave
}) => {
  const [formData, setFormData] = useState({
    title: '',
    courseId: '',
    description: '',
    status: 'active' as 'active' | 'inactive',
    timeLimit: 30,
    passingScore: 70
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const questionTypes = [
    { value: 'multiple_choice', label: '選択肢問題' },
    { value: 'true_false', label: '正誤問題' }
  ];

  useEffect(() => {
    if (quiz) {
      setFormData({
        title: quiz.title,
        courseId: quiz.courseTitle,
        description: 'このクイズでは、講座の内容を理解できているかを確認します。',
        status: quiz.status,
        timeLimit: 30,
        passingScore: 70
      });
      // ダミーの問題データ
      setQuestions([
        {
          id: 1,
          text: 'Reactの基本的な概念について正しいものは？',
          type: 'multiple_choice',
          options: ['コンポーネントベース', 'サーバーサイドレンダリングのみ', 'データベース管理', '画像編集'],
          correctAnswer: 0,
          explanation: 'Reactはコンポーネントベースのライブラリです。'
        },
        {
          id: 2,
          text: 'useStateはReactのフックである。',
          type: 'true_false',
          options: ['正しい', '間違い'],
          correctAnswer: 0,
          explanation: 'useStateはReactの基本的なフックの一つです。'
        }
      ]);
    } else {
      setFormData({
        title: '',
        courseId: '',
        description: '',
        status: 'active',
        timeLimit: 30,
        passingScore: 70
      });
      setQuestions([]);
    }
    setErrors({});
  }, [quiz]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      text: '',
      type: 'multiple_choice',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    };
    setQuestions(prev => [...prev, newQuestion]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    setQuestions(prev => prev.map((q, i) => 
      i === index ? { ...q, [field]: value } : q
    ));
  };

  const updateQuestionOption = (questionIndex: number, optionIndex: number, value: string) => {
    setQuestions(prev => prev.map((q, i) => 
      i === questionIndex 
        ? { ...q, options: q.options.map((opt, j) => j === optionIndex ? value : opt) }
        : q
    ));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'クイズ名は必須です';
    }

    if (!formData.courseId) {
      newErrors.courseId = '対象講座を選択してください';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'クイズの説明は必須です';
    }

    if (questions.length === 0) {
      newErrors.questions = '最低1問は必要です';
    }

    questions.forEach((question, index) => {
      if (!question.text.trim()) {
        newErrors[`question_${index}`] = `問題${index + 1}の内容を入力してください`;
      }
      if (question.type === 'multiple_choice') {
        const validOptions = question.options.filter(opt => opt.trim());
        if (validOptions.length < 2) {
          newErrors[`question_${index}_options`] = `問題${index + 1}の選択肢は最低2つ必要です`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave({
        ...formData,
        id: quiz?.id,
        courseTitle: formData.courseId,
        questionCount: questions.length,
        createdAt: quiz?.createdAt || new Date().toISOString(),
        questions
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
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                {quiz ? 'クイズを編集' : '新規クイズを作成'}
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
                    クイズ名 *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      errors.title ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="クイズ名を入力"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    対象講座 *
                  </label>
                  <select
                    value={formData.courseId}
                    onChange={(e) => handleInputChange('courseId', e.target.value)}
                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      errors.courseId ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">講座を選択</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.title}>{course.title}</option>
                    ))}
                  </select>
                  {errors.courseId && (
                    <p className="mt-1 text-sm text-red-600">{errors.courseId}</p>
                  )}
                </div>
              </div>

              {/* 説明 */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  クイズの説明 *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="クイズの内容や目的を説明してください"
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
                    <option value="active">有効</option>
                    <option value="inactive">無効</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    制限時間（分）
                  </label>
                  <input
                    type="number"
                    value={formData.timeLimit}
                    onChange={(e) => handleInputChange('timeLimit', parseInt(e.target.value))}
                    min="1"
                    max="120"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    合格点（%）
                  </label>
                  <input
                    type="number"
                    value={formData.passingScore}
                    onChange={(e) => handleInputChange('passingScore', parseInt(e.target.value))}
                    min="1"
                    max="100"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* 問題一覧 */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-gray-900">問題</h4>
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    問題を追加
                  </button>
                </div>

                {errors.questions && (
                  <p className="mb-4 text-sm text-red-600">{errors.questions}</p>
                )}

                <div className="space-y-6">
                  {questions.map((question, index) => (
                    <div key={question.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h5 className="text-sm font-medium text-gray-900">問題 {index + 1}</h5>
                        <button
                          type="button"
                          onClick={() => removeQuestion(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* 問題内容 */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          問題文 *
                        </label>
                        <textarea
                          value={question.text}
                          onChange={(e) => updateQuestion(index, 'text', e.target.value)}
                          rows={2}
                          className={`block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                            errors[`question_${index}`] ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="問題文を入力してください"
                        />
                        {errors[`question_${index}`] && (
                          <p className="mt-1 text-sm text-red-600">{errors[`question_${index}`]}</p>
                        )}
                      </div>

                      {/* 問題タイプ */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          問題タイプ
                        </label>
                        <select
                          value={question.type}
                          onChange={(e) => updateQuestion(index, 'type', e.target.value)}
                          className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          {questionTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                      </div>

                      {/* 選択肢 */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          選択肢
                        </label>
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={`correct_${index}`}
                                checked={question.correctAnswer === optionIndex}
                                onChange={() => updateQuestion(index, 'correctAnswer', optionIndex)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              />
                              <input
                                type="text"
                                value={option}
                                onChange={(e) => updateQuestionOption(index, optionIndex, e.target.value)}
                                className="flex-1 border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder={`選択肢${optionIndex + 1}`}
                              />
                            </div>
                          ))}
                        </div>
                        {errors[`question_${index}_options`] && (
                          <p className="mt-1 text-sm text-red-600">{errors[`question_${index}_options`]}</p>
                        )}
                      </div>

                      {/* 解説 */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          解説
                        </label>
                        <textarea
                          value={question.explanation}
                          onChange={(e) => updateQuestion(index, 'explanation', e.target.value)}
                          rows={2}
                          className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="正解の解説を入力してください"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* プレビュー */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">プレビュー</h4>
                <div className="bg-white rounded border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-900">{formData.title || 'クイズ名'}</h5>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      formData.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {formData.status === 'active' ? '有効' : '無効'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {formData.courseId && `${formData.courseId} • `}
                    {questions.length}問 • 制限時間{formData.timeLimit}分 • 合格点{formData.passingScore}%
                  </p>
                  <p className="text-sm text-gray-500">
                    {formData.description || 'クイズの説明がここに表示されます'}
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
              {quiz ? '更新' : '作成'}
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

export default QuizEditModal; 