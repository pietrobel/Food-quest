import React, { useState } from 'react';
import { recipeStepsOriginal, bugChallenges } from '../data/codeWeekData';
import { Code2, ArrowUp, ArrowDown, CheckCircle2, AlertTriangle, Bug, Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

import { UpdateScoreFn } from '../types';
import { Trophy } from 'lucide-react';

interface CodeWeekSectionProps {
  onUpdateScore: UpdateScoreFn;
  bestScores: Record<string, number>;
}

export const CodeWeekSection: React.FC<CodeWeekSectionProps> = ({ onUpdateScore, bestScores }) => {
  const [activeTab, setActiveTab] = useState<1 | 2 | 3>(1);
  const [completedChallenges, setCompletedChallenges] = useState<{ c1: boolean; c2: boolean; c3: boolean }>({
    c1: false,
    c2: false,
    c3: false
  });

  const bestCodeWeekScore = bestScores['codeweek'] || 0;

  // Challenge 1: Recipe Algorithm Reordering (WITHOUT numbers in text!)
  const [recipeSteps, setRecipeSteps] = useState(() => {
    return [...recipeStepsOriginal].sort(() => Math.random() - 0.5);
  });
  const [recipeFeedback, setRecipeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const handleMoveStep = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= recipeSteps.length) return;

    const copy = [...recipeSteps];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    setRecipeSteps(copy);
    setRecipeFeedback(null);
  };

  const handleCheckRecipeOrder = () => {
    const isCorrect = recipeSteps.every((step, idx) => step.expectedOrder === idx + 1);
    if (isCorrect) {
      const updated = { ...completedChallenges, c1: true };
      setCompletedChallenges(updated);
      const totalScore = (updated.c1 ? 25 : 0) + (updated.c2 ? 25 : 0) + (updated.c3 ? 25 : 0);
      onUpdateScore('codeweek', totalScore);
      try {
        confetti({ particleCount: 45, spread: 55, origin: { y: 0.65 } });
      } catch (e) {}
      setRecipeFeedback({
        isCorrect: true,
        message: "🎉 Algoritmo Corretto! (+25 pt) Hai ricostruito la sequenza perfetta: igiene preliminare delle mani, preparazione della frutta fresca, inserimento nel bicchiere, frullatura di sicurezza e consumo immediato!"
      });
    } else {
      setRecipeFeedback({
        isCorrect: false,
        message: "⚠️ L'ordine non è ancora logico o igienico: rifletti sui passaggi preliminari (es. lavarsi bene le mani prima di toccare il cibo) e di sicurezza prima di gustare il frullato."
      });
    }
  };

  const handleResetRecipe = () => {
    setRecipeSteps([...recipeStepsOriginal].sort(() => Math.random() - 0.5));
    setRecipeFeedback(null);
  };

  // Challenge 2: Bug Debugging
  const [selectedBugStep, setSelectedBugStep] = useState<number | null>(null);
  const [bugFeedback, setBugFeedback] = useState<{ isBug: boolean; text: string } | null>(null);
  const currentBugChallenge = bugChallenges[0];

  const handleSelectBugStep = (stepIdx: number) => {
    setSelectedBugStep(stepIdx);
    const step = currentBugChallenge.steps[stepIdx];
    if (step.isBug) {
      const updated = { ...completedChallenges, c2: true };
      setCompletedChallenges(updated);
      const totalScore = (updated.c1 ? 25 : 0) + (updated.c2 ? 25 : 0) + (updated.c3 ? 25 : 0);
      onUpdateScore('codeweek', totalScore);
      try {
        confetti({ particleCount: 35, spread: 45, origin: { y: 0.7 } });
      } catch (e) {}
      setBugFeedback({
        isBug: true,
        text: `🐞 DEBUGGING RIUSCITO! (+25 pt) ${step.explanation}`
      });
    } else {
      setBugFeedback({
        isBug: false,
        text: `Nessun bug qui: ${step.explanation} Continua a cercare l'istruzione pericolosa!`
      });
    }
  };

  // Challenge 3: Conditional Algorithm (IF/ELSE)
  const [condChoice1, setCondChoice1] = useState<string>('none');
  const [condChoice2, setCondChoice2] = useState<string>('none');
  const [condFeedback, setCondFeedback] = useState<{ success: boolean; msg: string } | null>(null);

  const handleCheckCondition = () => {
    if (condChoice1 === 'acqua_sport' && condChoice2 === 'acqua_regolare') {
      const updated = { ...completedChallenges, c3: true };
      setCompletedChallenges(updated);
      const totalScore = (updated.c1 ? 25 : 0) + (updated.c2 ? 25 : 0) + (updated.c3 ? 25 : 0);
      onUpdateScore('codeweek', totalScore);
      try {
        confetti({ particleCount: 45, spread: 55, origin: { y: 0.65 } });
      } catch (e) {}
      setCondFeedback({
        success: true,
        msg: "💻 COMPILAZIONE ALGORITMO RIUSCITA! (+25 pt) Hai gestito i due rami decisionali (IF e ELSE) in modo fisiologicamente ineccepibile, garantendo la giusta idratazione in entrambe le condizioni."
      });
    } else {
      setCondFeedback({
        success: false,
        msg: "⚠️ Errore di logica condizionale: una o entrambe le istruzioni scelte non garantiscono un corretto reintegro idrico. Rivedi i blocchi decisionali!"
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💻</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
              Angolo Code Week: Logica & Alimentazione
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Pensiero computazionale applicato alla salute: sequenze, debugging e strutture condizionali
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab(1)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 1
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            1. Algoritmo Ricetta
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 2
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            2. Caccia al Bug
          </button>
          <button
            onClick={() => setActiveTab(3)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 3
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            3. Condizioni IF / ELSE
          </button>
        </div>
      </div>

      {/* CHALLENGE 1: ALGORITMO RICETTA (NO NUMBERS IN TEXT!) */}
      {activeTab === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6 max-w-3xl mx-auto">
          <div className="border-b pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Sfida 1: Sequenza ed Esecuzione Lineare
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              Ricostruisci l'Algoritmo del Frullato Fresco
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              In informatica, un <strong>algoritmo</strong> è una serie di passi ordinati nel tempo. 
              <strong> Nei testi non ci sono numeri guida</strong>: devi capire l'ordine logico ed igienico corretto spostando i blocchi in alto o in basso con le frecce!
            </p>
          </div>

          {/* List of draggable/movable steps */}
          <div className="space-y-2.5">
            {recipeSteps.map((step, idx) => (
              <div
                key={step.id}
                className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 shadow-sm hover:border-indigo-300 transition"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="text-2xl shrink-0 p-1.5 bg-white rounded-xl shadow-sm border border-slate-100">
                    {step.icon}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                    {step.text}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMoveStep(idx, 'up')}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition ${
                      idx === 0
                        ? 'opacity-30 cursor-not-allowed bg-slate-200 text-slate-400'
                        : 'bg-white hover:bg-indigo-50 text-indigo-700 border border-slate-200 shadow-sm'
                    }`}
                    title="Sposta in alto"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    disabled={idx === recipeSteps.length - 1}
                    onClick={() => handleMoveStep(idx, 'down')}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition ${
                      idx === recipeSteps.length - 1
                        ? 'opacity-30 cursor-not-allowed bg-slate-200 text-slate-400'
                        : 'bg-white hover:bg-indigo-50 text-indigo-700 border border-slate-200 shadow-sm'
                    }`}
                    title="Sposta in basso"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleCheckRecipeOrder}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow transition-transform active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verifica Algoritmo</span>
            </button>

            <button
              onClick={handleResetRecipe}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Mescola di nuovo</span>
            </button>
          </div>

          {recipeFeedback && (
            <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
              recipeFeedback.isCorrect
                ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                : 'bg-amber-50 text-amber-950 border-amber-300'
            }`}>
              {recipeFeedback.message}
            </div>
          )}
        </div>
      )}

      {/* CHALLENGE 2: TROVA IL BUG */}
      {activeTab === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6 max-w-3xl mx-auto">
          <div className="border-b pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
              <Bug className="w-4 h-4" /> Sfida 2: Debugging del Codice Alimentare
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              {currentBugChallenge.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              {currentBugChallenge.context} Fai clic sull'istruzione che ritieni errata per eseguire il debug:
            </p>
          </div>

          <div className="space-y-3">
            {currentBugChallenge.steps.map((st, idx) => {
              const isSelected = selectedBugStep === idx;
              let btnClass = "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800";
              if (isSelected) {
                btnClass = st.isBug
                  ? "bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300"
                  : "bg-rose-50 border-rose-300 text-rose-950";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectBugStep(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 ${btnClass}`}
                >
                  <span>{st.text}</span>
                  <span className="shrink-0 text-xs px-2.5 py-1 rounded bg-white border border-slate-300 shadow-sm text-slate-600 font-bold">
                    Testa Istruzione
                  </span>
                </button>
              );
            })}
          </div>

          {bugFeedback && (
            <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
              bugFeedback.isBug
                ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                : 'bg-amber-50 text-amber-950 border-amber-300'
            }`}>
              {bugFeedback.text}
            </div>
          )}
        </div>
      )}

      {/* CHALLENGE 3: STRUTTURE CONDIZIONALI (IF/THEN/ELSE) */}
      {activeTab === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6 max-w-3xl mx-auto">
          <div className="border-b pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Sfida 3: Strutture Condizionali (IF - THEN - ELSE)
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              L'Algoritmo dell'Idratazione Quotidiana
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Completa la diramazione logica del programma selezionando l'istruzione corretta per ciascun ramo condizionale:
            </p>
          </div>

          {/* Code IDE Mockup */}
          <div className="bg-slate-900 text-cyan-300 p-5 rounded-3xl font-mono text-xs sm:text-sm leading-relaxed border border-slate-700 space-y-4">
            <div>
              <span className="text-pink-400 font-bold">SE</span> (attività_fisica_intensa == <span className="text-emerald-400">VERO</span> || temperatura_ambiente &gt; 28°C) <span className="text-pink-400 font-bold">ALLORA</span>:
            </div>

            <div className="pl-6">
              <select
                value={condChoice1}
                onChange={(e) => { setCondChoice1(e.target.value); setCondFeedback(null); }}
                className="w-full max-w-lg p-2.5 rounded-xl bg-slate-800 text-white font-sans text-xs border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <option value="none">-- Seleziona Blocco di Istruzione --</option>
                <option value="bibita">Bevi solo bevande gassate ed energy drink zuccherati</option>
                <option value="acqua_sport">Aumenta l'apporto di acqua a piccoli sorsi prima, durante e dopo lo sforzo</option>
                <option value="niente">Evita di bere per non sentirti appesantito</option>
              </select>
            </div>

            <div>
              <span className="text-pink-400 font-bold">ALTRIMENTI</span> (normale routine scolastica sedentaria):
            </div>

            <div className="pl-6">
              <select
                value={condChoice2}
                onChange={(e) => { setCondChoice2(e.target.value); setCondFeedback(null); }}
                className="w-full max-w-lg p-2.5 rounded-xl bg-slate-800 text-white font-sans text-xs border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <option value="none">-- Seleziona Blocco di Istruzione --</option>
                <option value="acqua_regolare">Bevi regolarmente acqua distribuita lungo tutta la giornata (circa 1,5 - 2 litri)</option>
                <option value="sete_estrema">Aspetta di avere una sete insopportabile per bere tutto d'un fiato</option>
                <option value="succhi">Sostituisci l'acqua con bevande concentrate industriali</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleCheckCondition}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow transition-transform active:scale-95"
            >
              <Code2 className="w-4 h-4" />
              <span>Esegui Codice</span>
            </button>
          </div>

          {condFeedback && (
            <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
              condFeedback.success
                ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                : 'bg-amber-50 text-amber-950 border-amber-300'
            }`}>
              {condFeedback.msg}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
