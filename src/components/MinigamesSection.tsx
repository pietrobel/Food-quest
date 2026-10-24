import React, { useState, useEffect, useRef } from 'react';
import { vfStatements } from '../data/vfData';
import { ClassifyItem, UpdateScoreFn } from '../types';
import { 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Timer, 
  Award,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MinigamesSectionProps {
  onUpdateScore: UpdateScoreFn;
  bestScores: Record<string, number>;
}

export const MinigamesSection: React.FC<MinigamesSectionProps> = ({ onUpdateScore, bestScores }) => {
  const [activeTab, setActiveTab] = useState<'memory' | 'vf' | 'classify'>('memory');

  // ==========================================
  // A. MEMORY GAME STATE
  // ==========================================
  const memoryIcons = ['🍎', '🥦', '🐟', '🥖', '🥛', '🫘', '🥑', '💧'];
  const [memoryDeck, setMemoryDeck] = useState<{ id: number; icon: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryTimer, setMemoryTimer] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [memoryFinished, setMemoryFinished] = useState(false);
  const [memorySessionScore, setMemorySessionScore] = useState(0);

  const bestMemoryScore = bestScores['memory'] || 0;

  const initMemory = () => {
    const raw = [...memoryIcons, ...memoryIcons];
    for (let i = raw.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [raw[i], raw[j]] = [raw[j], raw[i]];
    }
    setMemoryDeck(raw.map((icon, idx) => ({ id: idx, icon, flipped: false, matched: false })));
    setFlippedCards([]);
    setMemoryMoves(0);
    setMemoryTimer(0);
    setMatchedPairs(0);
    setMemoryFinished(false);
    setMemorySessionScore(0);
  };

  useEffect(() => {
    if (activeTab === 'memory' && memoryDeck.length === 0) {
      initMemory();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== 'memory' || memoryFinished || memoryDeck.length === 0) return;
    const interval = setInterval(() => {
      setMemoryTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTab, memoryFinished, memoryDeck]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length >= 2 || memoryDeck[index].flipped || memoryDeck[index].matched) return;

    const newDeck = [...memoryDeck];
    newDeck[index].flipped = true;
    setMemoryDeck(newDeck);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves(prev => prev + 1);
      const [i1, i2] = newFlipped;

      if (newDeck[i1].icon === newDeck[i2].icon) {
        newDeck[i1].matched = true;
        newDeck[i2].matched = true;
        setMemoryDeck(newDeck);
        setFlippedCards([]);
        setMatchedPairs(prev => {
          const next = prev + 1;
          if (next === 8) {
            setMemoryFinished(true);
            const calculatedBonus = Math.max(25, 80 - memoryMoves * 2);
            setMemorySessionScore(calculatedBonus);
            onUpdateScore('memory', calculatedBonus);
            try {
              confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
            } catch (e) {}
          }
          return next;
        });
      } else {
        setTimeout(() => {
          setMemoryDeck(prevDeck => {
            const copy = [...prevDeck];
            copy[i1].flipped = false;
            copy[i2].flipped = false;
            return copy;
          });
          setFlippedCards([]);
        }, 850);
      }
    }
  };

  // ==========================================
  // B. VERO O FALSO STATE (15 AFFERMAZIONI)
  // Strict single-answer locking with useRef
  // ==========================================
  const [vfIndex, setVfIndex] = useState(0);
  const [vfAnswered, setVfAnswered] = useState(false);
  const [vfUserAnswer, setVfUserAnswer] = useState<boolean | null>(null);
  const [vfScore, setVfScore] = useState(0);
  const [vfFinished, setVfFinished] = useState(false);
  const isVfAnsweringRef = useRef(false);

  const bestVfScore = bestScores['vf'] || 0;
  const currentVf = vfStatements[vfIndex];

  const handleVfAnswer = (choice: boolean) => {
    // Strictly prevent multiple answers or double selections
    if (isVfAnsweringRef.current || vfAnswered) return;
    isVfAnsweringRef.current = true;

    setVfUserAnswer(choice);
    setVfAnswered(true);

    const isCorrect = choice === currentVf.isTrue;
    if (isCorrect) {
      setVfScore(prev => prev + 10);
      try {
        confetti({ particleCount: 30, spread: 40, origin: { y: 0.7 } });
      } catch (e) {}
    }
  };

  const handleVfNext = () => {
    isVfAnsweringRef.current = false;
    setVfAnswered(false);
    setVfUserAnswer(null);

    if (vfIndex < vfStatements.length - 1) {
      setVfIndex(prev => prev + 1);
    } else {
      setVfFinished(true);
      // Assign score ONLY ONCE per exercise upon completion, updating only if higher than previous best
      onUpdateScore('vf', vfScore);
    }
  };

  const handleVfRestart = () => {
    isVfAnsweringRef.current = false;
    setVfIndex(0);
    setVfAnswered(false);
    setVfUserAnswer(null);
    setVfScore(0);
    setVfFinished(false);
  };

  // ==========================================
  // C. ABBINA E CLASSIFICA STATE (16 ALIMENTI)
  // ==========================================
  const initialClassifyItems: ClassifyItem[] = [
    { id: 'c1', name: 'Mela Rossa', icon: '🍎', category: 'frutta_verdura', info: 'Vitamine e fibre' },
    { id: 'c2', name: 'Broccolo', icon: '🥦', category: 'frutta_verdura', info: 'Glucosinolati' },
    { id: 'c3', name: 'Carote', icon: '🥕', category: 'frutta_verdura', info: 'Beta-carotene' },
    { id: 'c4', name: 'Mirtilli', icon: '🫐', category: 'frutta_verdura', info: 'Antocianine' },

    { id: 'c5', name: 'Riso Integrale', icon: '🌾', category: 'cereali', info: 'Carboidrati complessi' },
    { id: 'c6', name: 'Pane di Segale', icon: '🍞', category: 'cereali', info: 'Fibre sazianti' },
    { id: 'c7', name: 'Pasta Integrale', icon: '🍝', category: 'cereali', info: 'Amidi a lento rilascio' },
    { id: 'c8', name: 'Patata al forno', icon: '🥔', category: 'cereali', info: 'Tubero amidaceo' },

    { id: 'c9', name: 'Lenticchie', icon: '🫘', category: 'proteine', info: 'Proteine vegetali' },
    { id: 'c10', name: 'Filetto di Pesce', icon: '🐟', category: 'proteine', info: 'Omega-3 nobili' },
    { id: 'c11', name: 'Uovo fresco', icon: '🥚', category: 'proteine', info: 'Valore biologico 100' },
    { id: 'c12', name: 'Tofu naturale', icon: '🧈', category: 'proteine', info: 'Proteine da soia' },

    { id: 'c13', name: 'Olio EVO', icon: '🫒', category: 'grassi_latticini', info: 'Acido oleico monoinsaturo' },
    { id: 'c14', name: 'Noci & Mandorle', icon: '🌰', category: 'grassi_latticini', info: 'Acidi grassi e zinco' },
    { id: 'c15', name: 'Yogurt Bianco', icon: '🥛', category: 'grassi_latticini', info: 'Calcio e probiotici' },
    { id: 'c16', name: 'Ricotta Fresca', icon: '🧀', category: 'grassi_latticini', info: 'Proteine del siero' },
  ];

  const [unassignedItems, setUnassignedItems] = useState<ClassifyItem[]>([]);
  const [baskets, setBaskets] = useState<Record<string, ClassifyItem[]>>({
    frutta_verdura: [],
    cereali: [],
    proteine: [],
    grassi_latticini: []
  });
  const [selectedClassifyItem, setSelectedClassifyItem] = useState<ClassifyItem | null>(null);
  const [classifyFeedback, setClassifyFeedback] = useState<string | null>(null);
  const [classifySessionScore, setClassifySessionScore] = useState<number>(0);

  const bestClassifyScore = bestScores['classify'] || 0;

  const initClassify = () => {
    const shuffled = [...initialClassifyItems].sort(() => Math.random() - 0.5);
    setUnassignedItems(shuffled);
    setBaskets({ frutta_verdura: [], cereali: [], proteine: [], grassi_latticini: [] });
    setSelectedClassifyItem(null);
    setClassifyFeedback(null);
    setClassifySessionScore(0);
  };

  useEffect(() => {
    if (activeTab === 'classify' && unassignedItems.length === 0 && Object.values(baskets).every(b => b.length === 0)) {
      initClassify();
    }
  }, [activeTab]);

  const handleClassifyToBasket = (basketKey: 'frutta_verdura' | 'cereali' | 'proteine' | 'grassi_latticini') => {
    if (!selectedClassifyItem) {
      setClassifyFeedback("Prima seleziona un alimento dalla riserva in alto cliccandoci sopra!");
      return;
    }

    if (selectedClassifyItem.category === basketKey) {
      setBaskets(prev => ({
        ...prev,
        [basketKey]: [...prev[basketKey], selectedClassifyItem]
      }));
      setUnassignedItems(prev => prev.filter(i => i.id !== selectedClassifyItem.id));

      const isLast = unassignedItems.length === 1;
      const pointsToAdd = isLast ? 30 : 5; // 5 pt + 25 bonus on completion (80 pt total)
      const nextScore = classifySessionScore + pointsToAdd;
      setClassifySessionScore(nextScore);

      if (isLast) {
        // Assign score ONLY ONCE when all items are classified, updating only if higher than previous best
        onUpdateScore('classify', nextScore);
        try {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        } catch (e) {}
        setClassifyFeedback("🎉 Bravissimo! Hai classificato con successo tutti i 16 alimenti!");
      } else {
        setClassifyFeedback(`✅ Ottimo! "${selectedClassifyItem.name}" posizionato correttamente (+5 pt)!`);
      }
      setSelectedClassifyItem(null);
    } else {
      setClassifyFeedback(`❌ Riprova! "${selectedClassifyItem.name}" non appartiene a questa categoria nutrizionale.`);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎮</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
              Minigiochi Nutrizionali
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              I punteggi vengono registrati e aggiornati solo se superano il tuo record precedente
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('memory')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'memory'
                ? 'bg-purple-600 text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🃏 Memory Alimenti
          </button>
          <button
            onClick={() => setActiveTab('vf')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'vf'
                ? 'bg-purple-600 text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ⚖️ Vero o Falso (15)
          </button>
          <button
            onClick={() => setActiveTab('classify')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'classify'
                ? 'bg-purple-600 text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🧺 Abbina e Classifica
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: MEMORY GAME */}
      {/* ========================================================= */}
      {activeTab === 'memory' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm font-semibold">
            <div className="flex items-center gap-2 text-slate-700">
              <Timer className="w-4 h-4 text-purple-600" />
              <span>Tempo: <strong>{memoryTimer}s</strong></span>
            </div>
            <div className="text-slate-700">
              Mosse: <strong>{memoryMoves}</strong>
            </div>
            <div className="text-purple-700 font-bold">
              Coppie: <strong>{matchedPairs} / 8</strong>
            </div>
            <div className="flex items-center gap-1.5 bg-purple-50 text-purple-900 px-3 py-1 rounded-xl border border-purple-200 text-xs font-bold">
              <Trophy className="w-3.5 h-3.5 text-purple-600" />
              <span>Record Memory: {bestMemoryScore} pt</span>
            </div>
            <button
              onClick={initMemory}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ricomincia</span>
            </button>
          </div>

          {!memoryFinished ? (
            <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-lg mx-auto">
              {memoryDeck.map((card, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCardClick(idx)}
                  className={`h-20 sm:h-24 rounded-2xl text-3xl sm:text-4xl flex items-center justify-center transition-all duration-300 shadow-sm border ${
                    card.matched
                      ? 'bg-emerald-100 border-emerald-300 opacity-90 cursor-default scale-95'
                      : card.flipped
                      ? 'bg-white border-purple-400 ring-2 ring-purple-300 scale-100'
                      : 'bg-gradient-to-br from-emerald-800 to-teal-900 border-emerald-700 text-white hover:scale-105 active:scale-95'
                  }`}
                >
                  {card.flipped || card.matched ? card.icon : '❓'}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 space-y-4 max-w-md mx-auto">
              <div className="text-6xl animate-bounce">🎉</div>
              <h3 className="text-xl font-black text-slate-800">
                Memory Nutrizionale Completato!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Hai trovato tutte le 8 coppie in <strong>{memoryMoves} mosse</strong> e <strong>{memoryTimer} secondi</strong>!
              </p>
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs font-bold text-purple-900">
                Punteggio partita: {memorySessionScore} pt | Record registrato: {Math.max(bestMemoryScore, memorySessionScore)} pt
              </div>
              <button
                onClick={initMemory}
                className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm shadow"
              >
                Gioca Ancora
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: VERO O FALSO (15 AFFERMAZIONI) */}
      {/* ========================================================= */}
      {activeTab === 'vf' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          {!vfFinished ? (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 border-b pb-3">
                <span>Affermazione {vfIndex + 1} di {vfStatements.length}</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-600">Sessione: <strong>{vfScore} pt</strong></span>
                  <span className="text-purple-700 font-extrabold flex items-center gap-1 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                    <Trophy className="w-3.5 h-3.5" /> Record: {bestVfScore} pt
                  </span>
                </div>
              </div>

              {/* Statement Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-2">
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                  Valuta l'affermazione nutrizionale
                </span>
                <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                  «{currentVf.statement}»
                </p>
              </div>

              {/* Single Choice Vero / Falso buttons - strictly locks upon first click */}
              <div className="flex justify-center gap-4">
                {/* VERO Button */}
                <button
                  type="button"
                  disabled={vfAnswered}
                  onClick={() => handleVfAnswer(true)}
                  className={`flex-1 max-w-[240px] py-3.5 px-4 rounded-2xl font-extrabold text-sm sm:text-base shadow transition-all flex items-center justify-center gap-2 ${
                    !vfAnswered
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95 cursor-pointer hover:shadow-md'
                      : vfUserAnswer === true
                      ? currentVf.isTrue === true
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-300 scale-102 pointer-events-none'
                        : 'bg-rose-600 text-white ring-4 ring-rose-300 scale-102 pointer-events-none'
                      : 'bg-slate-100 text-slate-400 border border-slate-200 opacity-30 pointer-events-none'
                  }`}
                >
                  <span>👍 VERO</span>
                  {vfAnswered && vfUserAnswer === true && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      currentVf.isTrue === true ? 'bg-emerald-700 text-white' : 'bg-rose-700 text-white'
                    }`}>
                      {currentVf.isTrue === true ? '✅ Tua Risposta (Esatta)' : '❌ Tua Risposta (Errata)'}
                    </span>
                  )}
                </button>

                {/* FALSO Button */}
                <button
                  type="button"
                  disabled={vfAnswered}
                  onClick={() => handleVfAnswer(false)}
                  className={`flex-1 max-w-[240px] py-3.5 px-4 rounded-2xl font-extrabold text-sm sm:text-base shadow transition-all flex items-center justify-center gap-2 ${
                    !vfAnswered
                      ? 'bg-rose-600 hover:bg-rose-700 text-white active:scale-95 cursor-pointer hover:shadow-md'
                      : vfUserAnswer === false
                      ? currentVf.isTrue === false
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-300 scale-102 pointer-events-none'
                        : 'bg-rose-600 text-white ring-4 ring-rose-300 scale-102 pointer-events-none'
                      : 'bg-slate-100 text-slate-400 border border-slate-200 opacity-30 pointer-events-none'
                  }`}
                >
                  <span>👎 FALSO</span>
                  {vfAnswered && vfUserAnswer === false && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      currentVf.isTrue === false ? 'bg-emerald-700 text-white' : 'bg-rose-700 text-white'
                    }`}>
                      {currentVf.isTrue === false ? '✅ Tua Risposta (Esatta)' : '❌ Tua Risposta (Errata)'}
                    </span>
                  )}
                </button>
              </div>

              {/* Feedback when answered */}
              {vfAnswered && (
                <div className="space-y-4 animate-fadeIn">
                  <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
                    vfUserAnswer === currentVf.isTrue
                      ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                      : 'bg-rose-50 text-rose-950 border-rose-300'
                  }`}>
                    <div className="font-bold flex items-center gap-2 mb-1">
                      {vfUserAnswer === currentVf.isTrue ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          <span>Risposta Esatta! (+10 pt alla sessione) 🎉</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                          <span>
                            Risposta Errata (0 pt): l'affermazione corretta è {currentVf.isTrue ? 'VERO' : 'FALSO'}!
                          </span>
                        </>
                      )}
                    </div>
                    <p>{currentVf.explanation}</p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleVfNext}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm shadow transition-transform active:scale-95"
                    >
                      <span>
                        {vfIndex < vfStatements.length - 1 ? 'Prossima Affermazione' : 'Vedi Risultato V/F'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 space-y-4 max-w-md mx-auto">
              <div className="text-6xl animate-bounce">🏆</div>
              <h3 className="text-xl font-black text-slate-800">
                Sfida Vero o Falso Conclusa!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Hai totalizzato <strong>{vfScore} punti</strong> in questa sessione.
              </p>
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs font-bold text-purple-900">
                {vfScore > bestVfScore ? (
                  <span className="text-emerald-700 flex items-center justify-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Nuovo Record Personale: {vfScore} pt!
                  </span>
                ) : (
                  <span>Il tuo miglior record resta: {bestVfScore} pt</span>
                )}
              </div>
              <button
                onClick={handleVfRestart}
                className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm shadow"
              >
                Rigioca Vero o Falso
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: ABBINA E CLASSIFICA (16 ALIMENTI) */}
      {/* ========================================================= */}
      {activeTab === 'classify' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-800">
                Canestri di Classificazione degli Alimenti
              </h3>
              <p className="text-xs text-slate-500">
                1. Clicca su un alimento nella riserva in alto. 2. Clicca sulla cesta corretta per riporlo!
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold bg-purple-50 text-purple-900 px-3 py-1 rounded-xl border border-purple-200 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-purple-600" /> Record: {bestClassifyScore} pt
              </span>
              <button
                onClick={initClassify}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Riavvia</span>
              </button>
            </div>
          </div>

          {/* Feedback badge */}
          {classifyFeedback && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 text-center animate-fadeIn">
              {classifyFeedback}
            </div>
          )}

          {/* Unassigned Items Pool */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Alimenti da Classificare ({unassignedItems.length} rimasti)
              </span>
              {selectedClassifyItem && (
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Selezionato: {selectedClassifyItem.icon} {selectedClassifyItem.name}
                </span>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl min-h-[90px] flex flex-wrap gap-2 items-center justify-center">
              {unassignedItems.length > 0 ? (
                unassignedItems.map(item => {
                  const isSelected = selectedClassifyItem?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedClassifyItem(item)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm border ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 scale-105 ring-2 ring-blue-300'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-blue-400 hover:bg-blue-50/50'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.name}</span>
                    </button>
                  );
                })
              ) : (
                <span className="text-xs font-bold text-emerald-700">
                  🎉 Tutti gli alimenti sono stati classificati nelle ceste corrette!
                </span>
              )}
            </div>
          </div>

          {/* 4 Baskets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Basket 1: Frutta & Verdura */}
            <div
              onClick={() => handleClassifyToBasket('frutta_verdura')}
              className="p-4 rounded-2xl bg-emerald-50/60 border-2 border-emerald-300 hover:border-emerald-500 cursor-pointer transition flex flex-col justify-between min-h-[170px]"
            >
              <div>
                <div className="text-center font-extrabold text-sm text-emerald-900 border-b border-emerald-200 pb-2 mb-2">
                  🥦 Frutta & Verdura
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {baskets.frutta_verdura.map(item => (
                    <span key={item.id} className="text-xs bg-white text-emerald-900 font-bold px-2 py-0.5 rounded shadow-sm border border-emerald-200">
                      {item.icon} {item.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-[10px] text-center text-emerald-700 font-semibold mt-3 pt-2 border-t border-emerald-200/50">
                Clicca qui per posizionare
              </div>
            </div>

            {/* Basket 2: Cereali & Tuberi */}
            <div
              onClick={() => handleClassifyToBasket('cereali')}
              className="p-4 rounded-2xl bg-amber-50/60 border-2 border-amber-300 hover:border-amber-500 cursor-pointer transition flex flex-col justify-between min-h-[170px]"
            >
              <div>
                <div className="text-center font-extrabold text-sm text-amber-900 border-b border-amber-200 pb-2 mb-2">
                  🍞 Cereali & Tuberi
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {baskets.cereali.map(item => (
                    <span key={item.id} className="text-xs bg-white text-amber-900 font-bold px-2 py-0.5 rounded shadow-sm border border-amber-200">
                      {item.icon} {item.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-[10px] text-center text-amber-700 font-semibold mt-3 pt-2 border-t border-amber-200/50">
                Clicca qui per posizionare
              </div>
            </div>

            {/* Basket 3: Proteine */}
            <div
              onClick={() => handleClassifyToBasket('proteine')}
              className="p-4 rounded-2xl bg-rose-50/60 border-2 border-rose-300 hover:border-rose-500 cursor-pointer transition flex flex-col justify-between min-h-[170px]"
            >
              <div>
                <div className="text-center font-extrabold text-sm text-rose-900 border-b border-rose-200 pb-2 mb-2">
                  🫘 Fonti Proteiche
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {baskets.proteine.map(item => (
                    <span key={item.id} className="text-xs bg-white text-rose-900 font-bold px-2 py-0.5 rounded shadow-sm border border-rose-200">
                      {item.icon} {item.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-[10px] text-center text-rose-700 font-semibold mt-3 pt-2 border-t border-rose-200/50">
                Clicca qui per posizionare
              </div>
            </div>

            {/* Basket 4: Grassi Buoni & Latticini */}
            <div
              onClick={() => handleClassifyToBasket('grassi_latticini')}
              className="p-4 rounded-2xl bg-cyan-50/60 border-2 border-cyan-300 hover:border-cyan-500 cursor-pointer transition flex flex-col justify-between min-h-[170px]"
            >
              <div>
                <div className="text-center font-extrabold text-sm text-cyan-900 border-b border-cyan-200 pb-2 mb-2">
                  🫒 Grassi Buoni & Latticini
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {baskets.grassi_latticini.map(item => (
                    <span key={item.id} className="text-xs bg-white text-cyan-900 font-bold px-2 py-0.5 rounded shadow-sm border border-cyan-200">
                      {item.icon} {item.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-[10px] text-center text-cyan-700 font-semibold mt-3 pt-2 border-t border-cyan-200/50">
                Clicca qui per posizionare
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
