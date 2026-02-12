
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 overflow-x-hidden">
      {/* 没入感を出すための背景アクセント */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-50/50 blur-[120px]"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-violet-50/50 blur-[100px]"></div>
      </div>

      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="text-white font-black text-xl">N</span>
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-800 tracking-tighter leading-none">パチンコ転職ナビ</h1>
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">AI Diagnosis</span>
            </div>
          </div>
          <div className="hidden sm:block">
             <span className="text-[10px] font-bold text-slate-400 border border-slate-200 px-2 py-1 rounded-md">SPECIALIST AGENT</span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col relative z-10">
        {children}
      </main>

      <footer className="py-10 text-center relative z-10">
        <div className="max-w-4xl mx-auto px-6 border-t border-slate-200 pt-8">
          <p className="text-slate-400 text-xs font-medium">
            &copy; 2024 Pachinko Tenshoku Navi AI Diagnosis.<br className="sm:hidden" />
            <span className="hidden sm:inline"> | </span> 
            パチンコ業界の未来をつくるキャリア支援
          </p>
        </div>
      </footer>
    </div>
  );
};
