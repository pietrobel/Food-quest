import React, { useState, useRef } from 'react';
import { battleRounds } from '../data/battleData';
import { UpdateScoreFn } from '../types';
import { MessageSquare, Code2, Sparkles, Award, ArrowRight, Lightbulb, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FoodBattleProps {
  onUpdateScore: UpdateScoreFn;
  bestScores: Record<string, number>;
}

export const FoodBattle: React.FC<FoodBattleProps> = ({ onUpdateScore, bestScores }) => {
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [battleScore, setBattleScore] = useState(0);
  const [isBattleFinished, setIsBattleFinished] = useState(false);
  const isAnsweringRef = useRef(false);

  const bestBattleScore = bestScores['battle'] || 0;
  const currentRound = battleRounds[currentRoundIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnsweringRef.current || answered) return;
    isAnsweringRef.current = true;

    setSelectedOption(idx);
    setAnswered(true);

    const isCorrect = currentRound.options[idx].correct;
    if (isCorrect) {
      setBattleScore(prev => prev + 20);
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      } catch (e) {}
    }
  };

  const handleNextRound = () => {
    isAnsweringRef.current = false;
    if (currentRoundIdx < battleRounds.length - 1) {
      setCurrentRoundIdx(prev => prev + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setIsBattleFinished(true);
      onUpdateScore('battle', battleScore);
    }
  };

  const handleRestartBattle = () => {
    isAnsweringRef.current = false;
    setCurrentRoundIdx(0);
    setSelectedOption(null);
    setAnswered(false);
    setBattleScore(0);
    setIsBattleFinished(false);
  };

  const characterCards = [
    {
      id: 'pizza',
      name: 'Paolo Pizza',
      avatar: '🍕',
      role: 'Convivialità & Tradizione',
      speech: currentRound.characters.pizza,
      color: 'border-amber-400 bg-amber-50/70',
      tag: 'Carboidrati Complessi'
    },
    {
      id: 'burger',
      name: 'Ugo Hamburger',
      avatar: '🍔',
      role: 'Il Gusto & la Svolta Casalinga',
      speech: currentRound.characters.burger,
      color: 'border-orange-400 bg-orange-50/70',
      tag: 'Proteine & Ingredienti'
    },
    {
      id: 'broccolo',
      name: 'Bruno Broccolo',
      avatar: '🥦',
      role: 'Il Saggio dei Micronutrienti',
      speech: currentRound.characters.broccolo,
      color: 'border-emerald-400 bg-emerald-50/70',
      tag: 'Glucosinolati & Vitamine'
    },
    {
      id: 'carota',
      name: 'Carla Carota',
      avatar: '🥕',
      role: 'La Scienziata delle Fibre',
      speech: currentRound.characters.carota,
      color: 'border-rose-400 bg-rose-50/70',
      tag: 'Beta-Carotene & Liposolubili'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💬</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
              Food Battle: Chi ha ragione?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Un dibattito vivace a fumetti con blocchi di logica Scratch & Code.org
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500">
            Round {currentRoundIdx + 1} di {battleRounds.length}
          </span>
          <div className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
            Sessione: {battleScore} pt
          </div>
          <div className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center gap-1 border border-amber-300">
            <Trophy className="w-3.5 h-3.5 text-amber-600" /> Record: {bestBattleScore} pt
          </div>
        </div>
      </div>

      {!isBattleFinished ? (
        <div className="space-y-6">
          {/* Battle Stage: 4 Characters in confrontation */}
          <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 text-white shadow-xl border border-slate-700">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" /> Tema del Round: {currentRound.topic}
              </span>
              <span className="text-xs bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 px-2.5 py-0.5 rounded-full font-medium">
                Ascolta tutti i personaggi prima di giudicare!
              </span>
            </div>

            {/* Characters Discussion Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {characterCards.map((char) => {
                const isSpeaker = currentRound.activeSpeaker === char.id;
                return (
                  <div
                    key={char.id}
                    className={`relative rounded-2xl p-4 transition-all duration-300 border ${
                      isSpeaker 
                        ? 'bg-white/15 border-amber-400 shadow-lg ring-2 ring-amber-400/40' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-4xl sm:text-5xl shrink-0 p-2 bg-white/10 rounded-2xl">
                        {char.avatar}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-extrabold text-sm sm:text-base text-white">
                            {char.name}
                          </h4>
                          {isSpeaker && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-900 animate-pulse">
                              Lancia il dibattito 🗣️
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-amber-200/80 mb-2 font-medium">
                          {char.role}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed bg-black/20 p-2.5 rounded-xl border border-white/5">
                          {char.speech}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scratch / Code.org Logic Block */}
            <div className="mt-5 bg-black/40 rounded-2xl p-4 border border-indigo-500/30 text-xs font-mono text-cyan-300 space-y-1">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider mb-1">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>Blocco Logico Scratch del Dibattito:</span>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-xl border border-cyan-500/20 text-cyan-200 overflow-x-auto">
                <code>{currentRound.scratchTip}</code>
              </div>
            </div>
          </div>

          {/* Interactive Question / Verdict Box */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                La tua decisione da Giudice della Nutrizione
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-800 mt-1">
                {currentRound.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentRound.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle = "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800";
                
                if (answered) {
                  if (opt.correct) {
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

            {/* Feedback and next round */}
            {answered && (
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
                  currentRound.options[selectedOption!].correct
                    ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                    : 'bg-amber-50 text-amber-950 border-amber-300'
                }`}>
                  <div className="font-bold flex items-center gap-2 mb-1">
                    {currentRound.options[selectedOption!].correct ? (
                      <>
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span>Verdetto Esatto! Hai guadagnato +15 punti! 🎉</span>
                      </>
                    ) : (
                      <>
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                        <span>Spiegazione della Scienza dell'Alimentazione:</span>
                      </>
                    )}
                  </div>
                  <p>{currentRound.options[selectedOption!].explanation}</p>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-indigo-950">
                  <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Curiosità Nutrizionale da ricordare:</strong> {currentRound.curiosity}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNextRound}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow transition-transform active:scale-95"
                  >
                    <span>
                      {currentRoundIdx < battleRounds.length - 1 ? 'Prossimo Round del Dibattito' : 'Vedi il Finale della Battaglia'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Battle Final Summary Screen */
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-center max-w-2xl mx-auto space-y-6">
          <div className="text-6xl animate-bounce">🏆</div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Esito Finale della Food Battle
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">
              {battleScore >= 45 
                ? 'Campione Supremo della Mediazione Nutrizionale!' 
                : 'Bravo Mediatore del Gusto e della Scienza!'}
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Hai ottenuto <strong>{battleScore} punti</strong> su 60 disponibili!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left text-xs sm:text-sm text-emerald-950 leading-relaxed space-y-2">
            <div className="font-bold flex items-center gap-2 text-emerald-900">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Cosa hanno imparato i personaggi alla fine della discussione:</span>
            </div>
            <p>
              🍕 <strong>Pizza & 🍔 Hamburger:</strong> Hanno capito che non sono né mostri né veleni: preparati con buoni ingredienti e consumati all'interno di uno stile di vita vario e attivo, trovano spazio sereno nella nostra vita.
            </p>
            <p>
              🥦 <strong>Broccolo & 🥕 Carota:</strong> Hanno ricordato che la verdura è deliziosa se valorizzata con spezie, cotture delicate e un filo d'olio EVO, senza rinunce tristi!
            </p>
          </div>

          <button
            onClick={handleRestartBattle}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm shadow transition"
          >
            Rigioca la Food Battle
          </button>
        </div>
      )}
    </div>
  );
};
