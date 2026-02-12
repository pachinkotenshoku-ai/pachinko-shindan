
import React, { useState, useCallback } from 'react';
import { Layout } from './components/Layout';
import { ResultView } from './components/ResultView';
import { QUESTIONS } from './constants';
import { AppState, UserAnswers, DiagnosisResult } from './types';
import { analyzeCareerMatching } from './services/geminiService';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<AppState>('onboarding');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startQuestionnaire = () => {
    setGameState('questions');
    setCurrentQuestionIdx(0);
    setAnswers({});
  };

  const handleAnswerSelect = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestionIdx < QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      processDiagnosis(newAnswers);
    }
  };

  const processDiagnosis = async (finalAnswers: UserAnswers) => {
    setGameState('loading');
    try {
      const result = await analyzeCareerMatching(finalAnswers);
      setDiagnosisResult(result);
      setGameState('result');
    } catch (err) {
      console.error(err);
      setError('診断中にエラーが発生しました。時間を置いて再度お試しください。');
      setGameState('onboarding');
    }
  };

  const reset = () => {
    setGameState('onboarding');
    setDiagnosisResult(null);
    setError(null);
  };

  const progress = ((currentQuestionIdx) / QUESTIONS.length) * 100;

  return (
    <Layout>
      {gameState === 'onboarding' && (
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="max-w-3xl text-center space-y-10 animate-in zoom-in duration-500">
            <div className="space-y-4">
              <div className="inline-block p-4 bg-indigo-50 rounded-3xl mb-4 border border-indigo-100 shadow-sm">
                <svg className="w-16 h-16 text-indigo-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.312-2.841.873-4.085m1.542-.98A10.023 10.023 0 0112 2c2.348 0 4.524.812 6.244 2.175" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                あなたの市場価値を、<br /><span className="text-indigo-600">AIがリアルに</span>判定
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                「やりたい仕事」と「できる仕事」のギャップを可視化。
                パチンコ業界特化型AIが、あなたの内定可能性と最適なキャリアパスをシミュレートします。
              </p>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm border border-red-100 font-bold shadow-sm">
                ⚠️ {error}
              </div>
            )}

            <div className="flex flex-col items-center gap-6">
              <button
                onClick={startQuestionnaire}
                className="group relative inline-flex items-center justify-center px-12 py-5 font-black text-white transition-all duration-300 bg-indigo-600 rounded-full shadow-xl hover:bg-indigo-700 hover:shadow-indigo-200 transform hover:-translate-y-1"
              >
                キャリア診断を開始（無料）
                <svg className="w-6 h-6 ml-2 -mr-1 transition-all duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <p className="text-xs text-slate-400 font-medium">所要時間 約1分 | 個人情報の入力は不要です</p>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto pt-8 border-t border-slate-200">
              <div className="text-center">
                <p className="text-2xl font-black text-slate-800">スキル別</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Analysis</p>
              </div>
              <div className="text-center border-x border-slate-100">
                <p className="text-2xl font-black text-slate-800">内定率</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Feasibility</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-slate-800">最適解</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Solution</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {gameState === 'questions' && (
        <div className="flex-grow flex flex-col items-center justify-center p-6 bg-slate-50">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 relative overflow-hidden animate-in slide-in-from-bottom-4">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
              <div 
                className="h-full bg-indigo-500 transition-all duration-500 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="mb-10 flex justify-between items-center">
              <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full uppercase tracking-widest">
                STEP {currentQuestionIdx + 1} / {QUESTIONS.length}
              </span>
              <span className="text-xs font-bold text-slate-400">
                {currentQuestionIdx < 4 ? '👤 Profile' : '📋 Preferences'}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-10 leading-tight">
              {QUESTIONS[currentQuestionIdx].text}
            </h3>

            <div className="grid gap-4">
              {QUESTIONS[currentQuestionIdx].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswerSelect(QUESTIONS[currentQuestionIdx].id, option.value)}
                  className="flex flex-col items-start p-6 rounded-2xl border-2 border-slate-100 text-left transition-all hover:border-indigo-400 hover:bg-indigo-50 group hover:shadow-md"
                >
                  <span className="font-bold text-lg text-slate-800 group-hover:text-indigo-800 transition-colors">{option.label}</span>
                  {option.description && (
                    <span className="text-sm text-slate-400 group-hover:text-indigo-600/70 mt-1">{option.description}</span>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-12 flex justify-between items-center">
              {currentQuestionIdx > 0 ? (
                <button
                  onClick={() => setCurrentQuestionIdx(prev => prev - 1)}
                  className="text-slate-400 hover:text-indigo-600 text-sm font-bold flex items-center gap-2 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  戻る
                </button>
              ) : <div></div>}
            </div>
          </div>
        </div>
      )}

      {gameState === 'loading' && (
        <div className="flex-grow flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
          <div className="relative w-32 h-32 mb-8">
            <div className="absolute inset-0 border-8 border-indigo-50 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-12 h-12 text-indigo-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">AI市場価値シミュレーション中</h3>
          <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
            業界平均データとあなたのスキルを照合し、<br />現実的な内定可能性を算出しています...
          </p>
        </div>
      )}

      {gameState === 'result' && diagnosisResult && (
        <ResultView result={diagnosisResult} onReset={reset} />
      )}
    </Layout>
  );
};

export default App;
