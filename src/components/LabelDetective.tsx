import React, { useState, useRef } from 'react';
import { detectiveCases } from '../data/detectiveData';
import { UpdateScoreFn } from '../types';
import { Search, Eye, AlertCircle, CheckCircle2, XCircle, Award, Sparkles, ArrowRight, ShieldCheck, HelpCircle, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LabelDetectiveProps {
  onUpdateScore: UpdateScoreFn;
  bestScores: Record<string, number>;
}

export const LabelDetective: React.FC<LabelDetectiveProps> = ({ onUpdateScore, bestScores }) => {
  const [currentCaseIdx, setCurrentCaseIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showClue, setShowClue] = useState(false);
  const [solvedCasesCount, setSolvedCasesCount] = useState(0);
  const [detectiveScore, setDetectiveScore] = useState(0);
  const [highlightTarget, setHighlightTarget] = useState<'all' | 'sugars' | 'salt' | 'ingredients'>('all');
  const isAnsweringRef = useRef(false);

  const bestDetectiveScore = bestScores['detective'] || 0;
  const currentCase = detectiveCases[currentCaseIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnsweringRef.current || answered) return;
    isAnsweringRef.current = true;

    setSelectedOption(idx);
    setAnswered(true);

    const isCorrect = currentCase.options[idx].correct;
    const nextScore = isCorrect ? detectiveScore + 20 : detectiveScore;
    if (isCorrect) {
      setSolvedCasesCount(prev => prev + 1);
      setDetectiveScore(nextScore);
      try {
        confetti({ particleCount: 45, spread: 55, origin: { y: 0.65 } });
      } catch (e) {}
    }

    if (currentCaseIdx === detectiveCases.length - 1) {
      // Assign score ONLY ONCE at the end of the 4 cases, updating only if higher than previous best
      onUpdateScore('detective', nextScore);
    }
  };

  const handleNextCase = () => {
    isAnsweringRef.current = false;
    if (currentCaseIdx < detectiveCases.length - 1) {
      setCurrentCaseIdx(prev => prev + 1);
      setSelectedOption(null);
      setAnswered(false);
      setShowClue(false);
      setHighlightTarget('all');
    }
  };

  const getDetectiveBadge = () => {
    if (solvedCasesCount >= 4) return { title: 'Capo Ispettore Supremo delle Etichette 🏆', color: 'bg-amber-100 text-amber-900 border-amber-300' };
    if (solvedCasesCount === 3) return { title: 'Ispettore Nutrizionale Esperto 🥇', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
    if (solvedCasesCount === 2) return { title: 'Detective in Carriera 🥈', color: 'bg-blue-100 text-blue-900 border-blue-300' };
    if (solvedCasesCount === 1) return { title: 'Apprendista Investigatore 🥉', color: 'bg-purple-100 text-purple-900 border-purple-300' };
    return { title: 'Tirocinante Detective 🕵️', color: 'bg-slate-100 text-slate-800 border-slate-300' };
  };

  const badge = getDetectiveBadge();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🔍</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
              Detective dell'Etichetta
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Indagine scientifica: scopri cosa c'è davvero oltre gli slogan pubblicitari
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${badge.color}`}>
            {badge.title}
          </span>
          <div className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
            {detectiveScore} pt
          </div>
          <div className="px-2.5 py-1 rounded-full bg-slate-800 text-amber-300 font-bold text-xs flex items-center gap-1">
            <Trophy className="w-3 h-3 text-amber-400" /> Record: {bestDetectiveScore} pt
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Realistic Interactive Nutrition Label Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Reperto dell'Indagine
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {currentCase.productName}
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-200">
                Caso n. {currentCase.id}
              </span>
            </div>

            {/* Slogan Claim Box */}
            <div className="mb-4 p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900">
              <strong>Slogan sulla scatola: </strong>
              <em>«{currentCase.marketingClaim}»</em>
            </div>

            {/* Magnifying filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5 mb-3 text-xs">
              <span className="text-slate-500 font-semibold flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> Ispeziona con la Lente:
              </span>
              <button
                onClick={() => setHighlightTarget('sugars')}
                className={`px-2 py-0.5 rounded-md font-bold transition ${
                  highlightTarget === 'sugars' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Zuccheri
              </button>
              <button
                onClick={() => setHighlightTarget('salt')}
                className={`px-2 py-0.5 rounded-md font-bold transition ${
                  highlightTarget === 'salt' ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Sale
              </button>
              <button
                onClick={() => setHighlightTarget('ingredients')}
                className={`px-2 py-0.5 rounded-md font-bold transition ${
                  highlightTarget === 'ingredients' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Ingredienti
              </button>
              <button
                onClick={() => setHighlightTarget('all')}
                className={`px-2 py-0.5 rounded-md font-bold transition ${
                  highlightTarget === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Reset
              </button>
            </div>

            {/* Official Style Nutrition Table */}
            <div className="border-4 border-black p-4 font-sans text-xs bg-white shadow-md">
              <div className="text-xl font-black border-b-8 border-black pb-1 uppercase tracking-tight">
                Dichiarazione Nutrizionale
              </div>
              <div className="text-[11px] text-slate-600 border-b border-black py-1">
                Valori medi per <strong>100 g</strong> di prodotto
              </div>

              <div className="flex justify-between border-b border-slate-300 py-1.5 font-bold">
                <span>Energia</span>
                <span>{currentCase.label.energyKj} kJ / {currentCase.label.energyKcal} kcal</span>
              </div>

              <div className="flex justify-between border-b border-slate-200 py-1 font-bold">
                <span>Grassi</span>
                <span>{currentCase.label.fatTotal} g</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 py-1 pl-4 text-slate-700">
                <span>di cui acidi grassi saturi</span>
                <span>{currentCase.label.fatSaturated} g</span>
              </div>

              <div className="flex justify-between border-b border-slate-200 py-1 font-bold">
                <span>Carboidrati</span>
                <span>{currentCase.label.carbsTotal} g</span>
              </div>

              {/* Sugars highlight row */}
              <div className={`flex justify-between border-b border-slate-300 py-1 pl-4 transition-all ${
                highlightTarget === 'sugars' ? 'bg-rose-100 font-black text-rose-950 p-1.5 rounded' : 'text-slate-800 font-semibold'
              }`}>
                <span>di cui zuccheri</span>
                <span className="font-extrabold">{currentCase.label.carbsSugars} g</span>
              </div>

              <div className="flex justify-between border-b border-slate-200 py-1 text-slate-700">
                <span>Fibre</span>
                <span>{currentCase.label.fiber} g</span>
              </div>

              <div className="flex justify-between border-b border-slate-200 py-1 font-bold">
                <span>Proteine</span>
                <span>{currentCase.label.protein} g</span>
              </div>

              {/* Salt highlight row */}
              <div className={`flex justify-between border-b-4 border-black py-1.5 transition-all ${
                highlightTarget === 'salt' ? 'bg-cyan-100 font-black text-cyan-950 p-1.5 rounded' : 'font-bold'
              }`}>
                <span>Sale</span>
                <span className="font-extrabold">{currentCase.label.salt} g</span>
              </div>

              {/* Ingredients list highlight */}
              <div className={`mt-3 pt-2 text-[11px] leading-relaxed transition-all ${
                highlightTarget === 'ingredients' ? 'bg-purple-50 p-2 rounded border border-purple-300 font-semibold text-purple-950' : 'text-slate-700'
              }`}>
                <strong className="text-black">INGREDIENTI (in ordine decrescente di peso):</strong>{' '}
                {currentCase.label.ingredientsList}
              </div>
            </div>
          </div>
        </div>

        {/* Investigative Question & Case Solving Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Rapporto di Indagine
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-800 mt-0.5">
                {currentCase.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {currentCase.subtitle}
              </p>
            </div>

            {/* Clue button */}
            <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-emerald-600" /> Ti serve un indizio?
                </span>
                <button
                  onClick={() => setShowClue(!showClue)}
                  className="px-2.5 py-1 text-xs font-bold bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition"
                >
                  {showClue ? 'Nascondi Indizio' : 'Rivela Indizio 💡'}
                </button>
              </div>
              {showClue && (
                <div className="mt-2 text-xs font-medium text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  {currentCase.clue}
                </div>
              )}
            </div>

            {/* Question */}
            <div className="pt-2">
              <h4 className="text-sm font-bold text-slate-900 mb-3">
                {currentCase.question}
              </h4>

              <div className="space-y-2.5">
                {currentCase.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  let btnStyle = "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800";

                  if (answered) {
                    if (opt.correct) {
                      btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-2 ring-emerald-400/30";
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
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-white border border-slate-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 text-slate-700">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-xs sm:text-sm leading-relaxed flex-1">
                        {opt.text}
                      </span>
                      {answered && opt.correct && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      {answered && isSelected && !opt.correct && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Answer Feedback */}
            {answered && (
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
                  currentCase.options[selectedOption!].correct
                    ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                    : 'bg-amber-50 text-amber-950 border-amber-300'
                }`}>
                  <div className="font-bold flex items-center gap-2 mb-1">
                    {currentCase.options[selectedOption!].correct ? (
                      <>
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span>Caso Risolto! Hai guadagnato +20 punti! 🎉</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span>Analisi del Detective:</span>
                      </>
                    )}
                  </div>
                  <p>{currentCase.options[selectedOption!].explanation}</p>
                </div>

                <div className="bg-slate-900 text-emerald-300 p-3.5 rounded-2xl text-xs font-mono leading-relaxed border border-slate-700">
                  <strong className="text-white">Regola d'oro del Detective:</strong> {currentCase.verdictTip}
                </div>

                {currentCaseIdx < detectiveCases.length - 1 ? (
                  <div className="flex justify-end">
                    <button
                      onClick={handleNextCase}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow transition-transform active:scale-95"
                    >
                      <span>Passa al Prossimo Caso di Indagine</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl font-bold text-center text-xs">
                    🎉 Congratulazioni! Hai completato tutti i casi e smascherato le etichette ingannevoli!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
