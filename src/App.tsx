import React, { useState } from 'react';
import { ViewMode, UpdateScoreFn } from './types';
import { Header } from './components/Header';
import { HomeDashboard } from './components/HomeDashboard';
import { PlateChallenge } from './components/PlateChallenge';
import { FoodBattle } from './components/FoodBattle';
import { LabelDetective } from './components/LabelDetective';
import { CanvasGame2D } from './components/CanvasGame2D';
import { QuizSection } from './components/QuizSection';
import { MinigamesSection } from './components/MinigamesSection';
import { CodeWeekSection } from './components/CodeWeekSection';
import { EcoChefSection } from './components/EcoChefSection';
import { CertificateView } from './components/CertificateView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  
  // High scores tracked individually per exercise: updated ONLY if new score is strictly greater
  const [bestScores, setBestScores] = useState<Record<string, number>>({
    quiz: 0,
    memory: 0,
    vf: 0,
    classify: 0,
    plate: 0,
    battle: 0,
    detective: 0,
    game: 0,
    codeweek: 0,
    eco: 0,
  });

  const handleUpdateScore: UpdateScoreFn = (exerciseKey: string, sessionScore: number) => {
    const previousBest = bestScores[exerciseKey] || 0;
    if (sessionScore > previousBest) {
      setBestScores(prev => ({
        ...prev,
        [exerciseKey]: sessionScore
      }));
      return {
        isNewRecord: true,
        currentBest: sessionScore,
        previousBest
      };
    }
    return {
      isNewRecord: false,
      currentBest: previousBest,
      previousBest
    };
  };

  // Global score is the sum of best record scores for each exercise
  const globalScore = Object.values(bestScores).reduce((acc, curr) => acc + curr, 0);

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50/40 text-slate-800">
      {/* Top Sticky Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        globalScore={globalScore}
      />

      {/* Main Body Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentView === 'home' && (
          <HomeDashboard
            onNavigate={handleNavigate}
            globalScore={globalScore}
            bestScores={bestScores}
          />
        )}

        {currentView === 'plate' && (
          <PlateChallenge 
            onUpdateScore={handleUpdateScore} 
            bestScores={bestScores} 
          />
        )}

        {currentView === 'battle' && (
          <FoodBattle 
            onUpdateScore={handleUpdateScore} 
            bestScores={bestScores} 
          />
        )}

        {currentView === 'detective' && (
          <LabelDetective 
            onUpdateScore={handleUpdateScore} 
            bestScores={bestScores} 
          />
        )}

        {currentView === 'game' && (
          <CanvasGame2D 
            onUpdateScore={handleUpdateScore} 
            bestScores={bestScores} 
          />
        )}

        {currentView === 'quiz' && (
          <QuizSection 
            onUpdateScore={handleUpdateScore} 
            bestScores={bestScores} 
          />
        )}

        {currentView === 'minigames' && (
          <MinigamesSection 
            onUpdateScore={handleUpdateScore} 
            bestScores={bestScores} 
          />
        )}

        {currentView === 'codeweek' && (
          <CodeWeekSection 
            onUpdateScore={handleUpdateScore} 
            bestScores={bestScores} 
          />
        )}

        {currentView === 'eco' && (
          <EcoChefSection 
            onUpdateScore={handleUpdateScore} 
            bestScores={bestScores} 
          />
        )}

        {currentView === 'certificate' && (
          <CertificateView
            globalScore={globalScore}
            bestScores={bestScores}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="no-print bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-1">
          <p className="font-semibold text-slate-700">
            FOOD QUEST – La missione dell'alimentazione sana & Code Week
          </p>
          <p>
            Applicazione didattica interattiva per la scuola secondaria di primo grado.
            Promuove salute, equilibrio, lettura critica delle etichette e pensiero computazionale senza divieti né giudizi morali sul cibo.
          </p>
        </div>
      </footer>
    </div>
  );
}
