import React, { useState, useRef } from 'react';
import { quizQuestions } from '../data/quizData';
import { UpdateScoreFn } from '../types';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, Award, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizSectionProps {
  onUpdateScore: UpdateScoreFn;
  bestScores: Record<string, number>;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ onUpdateScore, bestScores }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const isAnsweringRef = useRef(false);

  const bestQuizScore = bestScores['quiz'] || 0;
  const currentQ = quizQuestions[currentIdx];
  const progressPercent = ((currentIdx + (answered ? 1 : 0)) / quizQuestions.length) * 100;

  const handleSelectOption = (idx: number) => {
    if (isAnsweringRef.current || answered) return;
    isAnsweringRef.current = true;

    setSelectedOpt(idx);
    setAnswered(true);

    if (idx === currentQ.correctIndex) {
      setQuizScore(prev => prev + 10);
      try {
        confetti({ particleCount: 35, spread: 45, origin: { y: 0.65 } });
      } catch (e) {}
    }
  };

  const handleNext = () => {
    isAnsweringRef.current = false;
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setAnswered(false);
    } else {
      setIsFinished(true);
      // Assign score ONLY ONCE per exercise upon completion, updating only if higher than previous best
      onUpdateScore('quiz', quizScore);
    }
  };

  const handleRestart = () => {
    isAnsweringRef.current = false;
    setCurrentIdx(0);
    setSelectedOpt(null);
    setAnswered(false);
    setQuizScore(0);
    setIsFinished(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🧠</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
              Quiz dell'Alimentazione Sana
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              20 domande originali: il punteggio si aggiorna solo se superi il tuo record
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500">
            Domanda {currentIdx + 1} di {quizQuestions.length}
          </span>
          <div className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
            Sessione: {quizScore} pt
          </div>
          <div className="px-3 py-1 rounded-full bg-sky-100 text-sky-900 font-bold text-xs flex items-center gap-1 border border-sky-300">
            <Trophy className="w-3.5 h-3.5 text-sky-600" /> Record: {bestQuizScore} pt
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-400">
              <span>Progresso</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-sky-50 text-sky-700 border border-sky-200">
              {currentQ.category}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOpt === idx;
              let btnStyle = "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800";

              if (answered) {
                if (idx === currentQ.correctIndex) {
                  btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-2 ring-emerald-400/40";
                } else if (isSelected) {
                  btnStyle = "bg-rose-50 border-rose-300 text-rose-950 font-bold";
                } else {
                  btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={answered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-full bg-white border border-slate-300 text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-sm text-slate-700">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-xs sm:text-sm leading-relaxed flex-1">
                    {opt}
                  </span>
                  {answered && idx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {answered && isSelected && idx !== currentQ.correctIndex && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next */}
          {answered && (
            <div className="pt-4 border-t border-slate-100 space-y-4 animate-fadeIn">
              <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
                selectedOpt === currentQ.correctIndex
                  ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                  : 'bg-amber-50 text-amber-950 border-amber-300'
              }`}>
                <div className="font-bold flex items-center gap-2 mb-1">
                  {selectedOpt === currentQ.correctIndex ? (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Risposta Esatta! (+10 pt) 🎉</span>
                    </>
                  ) : (
                    <span>💡 Spiegazione Scientifica Corretta:</span>
                  )}
                </div>
                <p>{currentQ.explanation}</p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow transition-transform active:scale-95"
                >
                  <span>
                    {currentIdx < quizQuestions.length - 1 ? 'Prossima Domanda' : 'Vedi Riepilogo Finale'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Summary */
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-center max-w-xl mx-auto space-y-6">
          <div className="text-6xl animate-bounce">🏆</div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Quiz Completato!
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">
              {quizScore >= 160 ? 'Esperto Supremo di Nutrizione!' : 'Ottimo lavoro nel Quiz!'}
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Hai completato la prova totalizzando <strong>{quizScore} punti</strong> su 200 possibili.
            </p>
          </div>

          <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-xs font-bold text-sky-900">
            {quizScore > bestQuizScore ? (
              <span className="text-emerald-700 flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Nuovo Record Personale registrato: {quizScore} pt!
              </span>
            ) : (
              <span>Il tuo miglior record resta: {bestQuizScore} pt</span>
            )}
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-700 text-left space-y-2">
            <div className="font-bold flex items-center gap-2 text-slate-800">
              <Award className="w-4 h-4 text-sky-600" />
              <span>Competenze verificate:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Varietà dei 5 colori di frutta e verdura</li>
              <li>Ruolo biologico fondamentale dell'idratazione</li>
              <li>Lettura critica dell'ordine decrescente degli ingredienti</li>
              <li>Consapevolezza e rispetto della conservazione nel frigo</li>
            </ul>
          </div>

          <button
            onClick={handleRestart}
            className="flex items-center justify-center gap-2 mx-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm shadow transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Riprova il Quiz</span>
          </button>
        </div>
      )}
    </div>
  );
};
