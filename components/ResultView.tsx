
import React from 'react';
import { DiagnosisResult } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

interface ResultViewProps {
  result: DiagnosisResult;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ result, onReset }) => {
  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e'];

  const feasibilityData = [
    { name: 'Possibility', value: result.feasibilityScore.score },
    { name: 'Gap', value: 100 - result.feasibilityScore.score },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* メインタイトルカード */}
      <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-indigo-100 border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
           <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-tighter">Diagnostic Report</span>
        </div>
        <div className="relative z-10">
          <p className="text-indigo-600 font-black mb-2 flex items-center gap-2">
            <span className="w-5 h-1 bg-indigo-600 rounded-full"></span>
            {result.personaTitle}
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            {result.feasibilityScore.score >= 70 ? '🎯 内定獲得の期待大' : 
             result.feasibilityScore.score >= 40 ? '⚠️ 戦略的な対策が必要' : 
             '🛑 キャリアプランの再構築'}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">{result.summary}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 内定可能性ゲージ */}
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center">
          <h3 className="text-sm font-black text-slate-400 mb-4 self-start uppercase tracking-widest flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            内定可能性スコア
          </h3>
          <div className="relative w-full h-56 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={feasibilityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  startAngle={210}
                  endAngle={-30}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill={result.feasibilityScore.score > 70 ? '#10b981' : result.feasibilityScore.score > 40 ? '#f59e0b' : '#ef4444'} />
                  <Cell fill="#f8fafc" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
              <span className="text-5xl font-black text-slate-900">{result.feasibilityScore.score}<span className="text-2xl">%</span></span>
              <span className="text-[10px] text-slate-400 font-bold mt-1">PROBABILITY</span>
            </div>
          </div>
          <div className="mt-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 w-full text-center">
            <p className="text-sm font-bold text-slate-700 leading-relaxed">
              {result.feasibilityScore.reason}
            </p>
          </div>
        </div>

        {/* 課題とアドバイス */}
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col">
          <h3 className="text-sm font-black text-slate-400 mb-6 uppercase tracking-widest flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
            現実的な課題と対策
          </h3>
          <div className="space-y-6 flex-grow">
            <div>
              <p className="text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest">不足・強化すべき点</p>
              <div className="flex flex-wrap gap-2">
                {result.feasibilityScore.missingSkills.length > 0 ? (
                  result.feasibilityScore.missingSkills.map((skill, i) => (
                    <span key={i} className="px-4 py-2 bg-orange-50 text-orange-700 text-xs font-black rounded-xl border border-orange-100">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-sm font-bold text-emerald-600">特になし（即戦力）</span>
                )}
              </div>
            </div>
            <div className="relative">
               <div className="absolute -left-3 top-0 bottom-0 w-1 bg-indigo-100 rounded-full"></div>
               <p className="text-sm text-slate-600 leading-relaxed italic pl-4 font-medium">
                 "{result.careerAdvice}"
               </p>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest">推奨店舗タイプ</p>
            <div className="bg-indigo-600 rounded-2xl py-3 px-6 text-center shadow-lg shadow-indigo-200">
               <p className="text-white font-black text-lg">{result.hallTypeMatch}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 詳細マッチング */}
      <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
        <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
          <div className="w-3 h-8 bg-indigo-600 rounded-full"></div>
          希望条件への適応度分析
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={result.matchScore} margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" hide domain={[0, 100]} />
              <YAxis dataKey="label" type="category" width={110} tick={{ fontSize: 13, fontWeight: 'bold', fill: '#475569' }} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }} 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={28}>
                {result.matchScore.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.9} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 推奨される勤務環境 */}
      <div className="space-y-6">
        <h3 className="text-2xl font-black text-slate-900 text-center tracking-tight">AIが提案する具体的な職場モデル</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {result.idealEnvironment.map((env, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-7 shadow-lg shadow-slate-200/40 border border-slate-100 hover:scale-[1.02] transition-all duration-300">
              <h4 className="font-black text-indigo-600 text-lg mb-3">{env.title}</h4>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed font-bold">{env.description}</p>
              <div className="space-y-3">
                {env.pros.map((pro, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2 text-[11px] font-bold text-slate-600 bg-slate-50 p-2 rounded-lg">
                    <span className="text-emerald-500">✔</span>
                    {pro}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-12 pb-20 flex justify-center">
        <button
          onClick={onReset}
          className="group px-12 py-5 bg-slate-900 text-white font-black rounded-full hover:bg-indigo-600 transition-all shadow-2xl hover:shadow-indigo-200 transform hover:-translate-y-1 active:scale-95 flex items-center gap-3"
        >
          <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          条件を修正して再診断
        </button>
      </div>
    </div>
  );
};
