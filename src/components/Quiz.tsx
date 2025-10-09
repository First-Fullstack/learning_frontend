import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockQuizzes } from '../data/mockData';
import { CheckCircle, XCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const Quiz: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  console.log(courseId);
  
  const navigate = useNavigate();
  const quiz = mockQuizzes.find(q => q.courseId === courseId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">クイズが見つかりません</h2>
          <button 
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800"
          >
            戻る
          </button>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const selectedAnswer = selectedAnswers[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correctAnswer;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setQuizCompleted(true);
      const correctAnswers = selectedAnswers.filter((answer, index) => 
        answer === quiz.questions[index].correctAnswer
      ).length;
      
      navigate('/completion', { 
        state: { 
          score: correctAnswers, 
          totalQuestions: quiz.questions.length,
          courseId 
        } 
      });
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowFeedback(selectedAnswers[currentQuestion - 1] !== undefined);
    }
  };

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">コースクイズ</h1>
          <p className="text-gray-600">知識をテストして進捗を追跡しましょう</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              問題 {currentQuestion + 1} / {quiz.questions.length}
            </span>
            <span className="text-sm font-semibold text-gray-700">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          {/* Question */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-4 mb-8">
            {currentQ.options.map((option, index) => {
              let buttonClass = "w-full p-6 rounded-2xl border-2 font-semibold text-left transition-all duration-200 ";
              
              if (!showFeedback) {
                buttonClass += selectedAnswer === index 
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300 hover:bg-blue-50";
              } else {
                if (index === currentQ.correctAnswer) {
                  buttonClass += "border-green-500 bg-green-50 text-green-700";
                } else if (selectedAnswer === index && index !== currentQ.correctAnswer) {
                  buttonClass += "border-red-500 bg-red-50 text-red-700";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={showFeedback}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showFeedback && (
                      <div>
                        {index === currentQ.correctAnswer && (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        )}
                        {selectedAnswer === index && index !== currentQ.correctAnswer && (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`p-6 rounded-2xl mb-8 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center">
                {isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 mr-3" />
                )}
                <div>
                  <h3 className={`font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? '正解！' : '不正解'}
                  </h3>
                  <p className={`${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {isCorrect 
                      ? '素晴らしい！正解です。' 
                      : `正解は: ${currentQ.options[currentQ.correctAnswer]}`
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all ${
                currentQuestion === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              前へ
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswer === undefined}
              className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedAnswer === undefined
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
              }`}
            >
              {isLastQuestion ? 'クイズを完了' : '次へ'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;