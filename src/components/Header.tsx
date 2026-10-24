import React from 'react';
import { ViewMode } from '../types';
import { Apple, Award, Home, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  globalScore: number;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, globalScore }) => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-900 text-white shadow-md border-b border-emerald-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('home'); }}
        >
          <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner group-hover:scale-105 transition-transform">
            🥗
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wide text-lg sm:text-xl text-white">
                FOOD QUEST
              </span>
              <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                Code Week Edition
              </span>
            </div>
            <p className="text-xs text-emerald-100/80 hidden sm:block">
              La missione dell'alimentazione sana & pensiero computazionale
            </p>
          </div>
        </div>

        {/* Actions & Score */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur border border-white/20 text-sm font-bold shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="text-emerald-100 hidden sm:inline text-xs font-medium">Punteggio:</span>
            <span className="text-amber-200 font-extrabold">{globalScore} pt</span>
          </div>

          {currentView !== 'home' && (
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-emerald-900 hover:bg-emerald-50 text-xs sm:text-sm font-bold shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
              title="Torna alla schermata principale"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('certificate')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0 ${
              currentView === 'certificate'
                ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-300'
                : 'bg-amber-500/90 hover:bg-amber-400 text-white'
            }`}
            title="Visualizza e stampa l'attestato finale"
          >
            <Award className="w-4 h-4" />
            <span className="hidden sm:inline">Attestato</span>
          </button>
        </div>
      </div>
    </header>
  );
};
