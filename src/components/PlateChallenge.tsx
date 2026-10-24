import React, { useState } from 'react';
import { plateIngredients, plateChallengeLevels } from '../data/plateData';
import { PlateIngredient, UpdateScoreFn } from '../types';
import { Sparkles, RefreshCw, CheckCircle2, AlertTriangle, ArrowRight, Info, HeartHandshake, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PlateChallengeProps {
  onUpdateScore: UpdateScoreFn;
  bestScores: Record<string, number>;
}

export const PlateChallenge: React.FC<PlateChallengeProps> = ({ onUpdateScore, bestScores }) => {

  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const currentLevel = plateChallengeLevels[currentLevelIdx];

  // Placed items in sectors
  const [vegItems, setVegItems] = useState<PlateIngredient[]>([]);
  const [grainsItem, setGrainsItem] = useState<PlateIngredient | null>(null);
  const [proteinItem, setProteinItem] = useState<PlateIngredient | null>(null);
  const [fatItem, setFatItem] = useState<PlateIngredient | null>(null);
  const [levelScores, setLevelScores] = useState<Record<number, number>>({});

  const [feedback, setFeedback] = useState<{
    type: 'success' | 'warning' | 'error' | null;
    title: string;
    message: string;
    scoreEarned?: number;
  }>({ type: null, title: '', message: '' });

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'veg' | 'grains' | 'proteins' | 'fats_dairy'>('all');

  // Check if item is already placed
  const isItemUsed = (id: string) => {
    if (vegItems.some(i => i.id === id)) return true;
    if (grainsItem?.id === id) return true;
    if (proteinItem?.id === id) return true;
    if (fatItem?.id === id) return true;
    return false;
  };

  const handleSelectIngredient = (ingredient: PlateIngredient) => {
    // If level 3 has restrictions and this item is not allowed
    if (currentLevel.allowedItems && !currentLevel.allowedItems.includes(ingredient.id)) {
      setFeedback({
        type: 'warning',
        title: 'Attenzione alle regole del livello 3!',
        message: 'Nel livello 3 "Sfida Green Sostenibile" sono ammessi solo ingredienti vegetali ed ecologici (legumi, tofu, cereali, ortaggi).'
      });
      return;
    }

    if (ingredient.category === 'veg') {
      if (vegItems.length < 2) {
        setVegItems([...vegItems, ingredient]);
      } else {
        // replace the oldest
        setVegItems([vegItems[1], ingredient]);
      }
    } else if (ingredient.category === 'grains') {
      setGrainsItem(ingredient);
    } else if (ingredient.category === 'proteins') {
      setProteinItem(ingredient);
    } else if (ingredient.category === 'fats_dairy') {
      setFatItem(ingredient);
    }

    setFeedback({ type: null, title: '', message: '' });
  };

  const handleRemoveItem = (sector: 'veg1' | 'veg2' | 'grains' | 'proteins' | 'fats') => {
    if (sector === 'veg1') {
      setVegItems(vegItems.slice(1));
    } else if (sector === 'veg2') {
      setVegItems(vegItems.slice(0, 1));
    } else if (sector === 'grains') {
      setGrainsItem(null);
    } else if (sector === 'proteins') {
      setProteinItem(null);
    } else if (sector === 'fats') {
      setFatItem(null);
    }
    setFeedback({ type: null, title: '', message: '' });
  };

  const handleResetPlate = () => {
    setVegItems([]);
    setGrainsItem(null);
    setProteinItem(null);
    setFatItem(null);
    setFeedback({ type: null, title: '', message: '' });
  };

  const handleEvaluatePlate = () => {
    const has2Veg = vegItems.length === 2;
    const has1Veg = vegItems.length === 1;
    const hasGrains = grainsItem !== null;
    const hasProteins = proteinItem !== null;

    if (!has1Veg && !hasGrains && !hasProteins) {
      setFeedback({
        type: 'error',
        title: 'Il piatto è ancora vuoto!',
        message: 'Aggiungi ingredienti selezionandoli dalla dispensa per iniziare a comporre il piatto.'
      });
      return;
    }

    if (has2Veg && hasGrains && hasProteins) {
      // Perfect balance!
      let points = 30;
      if (fatItem) points += 10; // bonus for good fats (EVO or nuts)

      if (currentLevel.id === 3) {
        // Must have plant proteins
        if (proteinItem?.id === 'lenticchie' || proteinItem?.id === 'tofu_erbe') {
          points += 15;
        } else {
          setFeedback({
            type: 'warning',
            title: 'Ottimo piatto, ma controlla la proteina!',
            message: 'Per completare il Livello 3 "Green 100% Sostenibile", scegli i legumi (lenticchie/ceci) o il tofu vegetale invece di fonti animali.'
          });
          return;
        }
      }

      const newLevelScores = { ...levelScores, [currentLevel.id]: Math.max(levelScores[currentLevel.id] || 0, points) };
      setLevelScores(newLevelScores);
      const totalPlateScore = Object.values(newLevelScores).reduce((a, b) => a + b, 0);
      const scoreRes = onUpdateScore('plate', totalPlateScore);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // fallback
      }

      setFeedback({
        type: 'success',
        title: '🎉 Piatto del Mangiar Sano Perfetto!',
        message: scoreRes.isNewRecord
          ? `Complimenti! Hai centrato le proporzioni ideali del modello Harvard e stabilito un NUOVO RECORD per la Sfida del Piatto Sano (${totalPlateScore} pt totali)!`
          : `Ottima composizione del pasto! Hai completato questo livello ottenendo ${points} pt (il tuo record per il piatto sano resta di ${scoreRes.currentBest} pt).`,
        scoreEarned: points
      });
    } else {
      const missingParts: string[] = [];
      if (!has2Veg) {
        missingParts.push(has1Veg ? "una seconda porzione di verdura/frutta per completare il 50%" : "la metà di Verdura e Frutta fresca (servono 2 porzioni)");
      }
      if (!hasGrains) {
        missingParts.push("il quarto di Cereali Integrali o tuberi (amidi complessi)");
      }
      if (!hasProteins) {
        missingParts.push("il quarto di Proteine Sane (legumi, pesce, uova o latticini freschi)");
      }

      setFeedback({
        type: 'warning',
        title: 'Piatto non ancora equilibrato',
        message: `Per soddisfare la regola aurea della nutrizione manca: ${missingParts.join(', ')}. Clicca sugli ingredienti mancanti per aggiungerli!`
      });
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIdx < plateChallengeLevels.length - 1) {
      setCurrentLevelIdx(currentLevelIdx + 1);
      handleResetPlate();
    }
  };

  // Filtered ingredients
  const filteredIngredients = plateIngredients.filter(item => {
    if (currentLevel.allowedItems && !currentLevel.allowedItems.includes(item.id)) return false;
    if (activeCategoryFilter === 'all') return true;
    return item.category === activeCategoryFilter;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header with Level Selector */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🍽️</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
                La Sfida del Piatto Sano
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Ispirato al modello scientifico della Harvard T.H. Chan School of Public Health
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {plateChallengeLevels.map((lvl, index) => {
              const lvlBest = bestScores[`plate_${lvl.id}`] || 0;
              return (
                <button
                  key={lvl.id}
                  onClick={() => {
                    setCurrentLevelIdx(index);
                    handleResetPlate();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    currentLevelIdx === index
                      ? 'bg-rose-600 text-white shadow'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>Livello {lvl.id}</span>
                  {lvlBest > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-extrabold ${
                      currentLevelIdx === index ? 'bg-rose-800 text-white' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {lvlBest}pt
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Level Description */}
        <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-3.5 flex items-start gap-3">
          <Info className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-rose-950">
            <strong>{currentLevel.title}: </strong>
            {currentLevel.description}
            {currentLevel.bonusCondition && (
              <span className="block mt-1 font-semibold text-rose-800">
                💡 Obiettivo speciale: {currentLevel.bonusCondition}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visual Plate Column */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col items-center">
          <div className="text-center mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Composizione del tuo Piatto
            </span>
            <div className="text-sm font-semibold text-slate-700">
              Fai clic su un ingrediente a lato per collocarlo nel settore corretto
            </div>
          </div>

          {/* Realistic Circular Harvard Plate */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-8 border-slate-200 bg-white shadow-inner p-2 flex flex-col justify-between overflow-hidden">
            {/* Top Half: Left half of plate is Vegetables (half circle), Right is split Grains / Proteins */}
            <div className="w-full h-full rounded-full grid grid-cols-2 gap-1.5 p-1 bg-slate-100">
              {/* Left Column: 1/2 Plate = Vegetables and Fruit */}
              <div 
                className={`rounded-l-full bg-emerald-50 border-2 border-dashed border-emerald-300 p-3 flex flex-col items-center justify-center text-center transition-all ${
                  vegItems.length === 2 ? 'bg-emerald-100/70 border-solid border-emerald-500' : ''
                }`}
              >
                <span className="text-[11px] font-extrabold text-emerald-800 tracking-wide mb-1">
                  🥦 1/2 VERDURE & FRUTTA
                </span>
                <span className="text-[9px] text-emerald-700 mb-2 font-medium">50% del piatto</span>

                <div className="flex flex-col gap-1.5 w-full items-center">
                  {vegItems[0] ? (
                    <button
                      onClick={() => handleRemoveItem('veg1')}
                      className="px-2 py-1 bg-white rounded-md shadow-sm border border-emerald-200 text-[10px] font-bold text-emerald-900 flex items-center gap-1 hover:bg-rose-50 hover:text-rose-700 transition"
                      title="Clicca per rimuovere"
                    >
                      <span>{vegItems[0].icon}</span>
                      <span className="truncate max-w-[85px]">{vegItems[0].name.split(' ')[0]}</span>
                      <span className="text-rose-500 text-[9px]">✕</span>
                    </button>
                  ) : (
                    <div className="text-[10px] text-emerald-400 font-semibold bg-emerald-100/40 px-2 py-0.5 rounded border border-dashed border-emerald-300">
                      + Porzione 1
                    </div>
                  )}

                  {vegItems[1] ? (
                    <button
                      onClick={() => handleRemoveItem('veg2')}
                      className="px-2 py-1 bg-white rounded-md shadow-sm border border-emerald-200 text-[10px] font-bold text-emerald-900 flex items-center gap-1 hover:bg-rose-50 hover:text-rose-700 transition"
                      title="Clicca per rimuovere"
                    >
                      <span>{vegItems[1].icon}</span>
                      <span className="truncate max-w-[85px]">{vegItems[1].name.split(' ')[0]}</span>
                      <span className="text-rose-500 text-[9px]">✕</span>
                    </button>
                  ) : (
                    <div className="text-[10px] text-emerald-400 font-semibold bg-emerald-100/40 px-2 py-0.5 rounded border border-dashed border-emerald-300">
                      + Porzione 2
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: 1/4 Grains + 1/4 Proteins */}
              <div className="flex flex-col gap-1.5 h-full">
                {/* Upper Quarter: Grains */}
                <div 
                  className={`flex-1 rounded-tr-full bg-amber-50 border-2 border-dashed border-amber-300 p-2 flex flex-col items-center justify-center text-center transition-all ${
                    grainsItem ? 'bg-amber-100/70 border-solid border-amber-500' : ''
                  }`}
                >
                  <span className="text-[10px] font-extrabold text-amber-900 mb-0.5">
                    🌾 1/4 CEREALI INTEGRALI
                  </span>
                  <span className="text-[9px] text-amber-700 mb-1 font-medium">25% del piatto</span>

                  {grainsItem ? (
                    <button
                      onClick={() => handleRemoveItem('grains')}
                      className="px-2 py-1 bg-white rounded-md shadow-sm border border-amber-200 text-[10px] font-bold text-amber-950 flex items-center gap-1 hover:bg-rose-50 hover:text-rose-700 transition"
                      title="Clicca per rimuovere"
                    >
                      <span>{grainsItem.icon}</span>
                      <span className="truncate max-w-[90px]">{grainsItem.name.split(' ')[0]}</span>
                      <span className="text-rose-500 text-[9px]">✕</span>
                    </button>
                  ) : (
                    <div className="text-[10px] text-amber-400 font-semibold bg-amber-100/40 px-2 py-0.5 rounded border border-dashed border-amber-300">
                      + Scegli cereali
                    </div>
                  )}
                </div>

                {/* Lower Quarter: Proteins */}
                <div 
                  className={`flex-1 rounded-br-full bg-rose-50 border-2 border-dashed border-rose-300 p-2 flex flex-col items-center justify-center text-center transition-all ${
                    proteinItem ? 'bg-rose-100/70 border-solid border-rose-500' : ''
                  }`}
                >
                  <span className="text-[10px] font-extrabold text-rose-900 mb-0.5">
                    🫘 1/4 PROTEINE SANE
                  </span>
                  <span className="text-[9px] text-rose-700 mb-1 font-medium">25% del piatto</span>

                  {proteinItem ? (
                    <button
                      onClick={() => handleRemoveItem('proteins')}
                      className="px-2 py-1 bg-white rounded-md shadow-sm border border-rose-200 text-[10px] font-bold text-rose-950 flex items-center gap-1 hover:bg-rose-50 hover:text-rose-700 transition"
                      title="Clicca per rimuovere"
                    >
                      <span>{proteinItem.icon}</span>
                      <span className="truncate max-w-[90px]">{proteinItem.name.split(' ')[0]}</span>
                      <span className="text-rose-500 text-[9px]">✕</span>
                    </button>
                  ) : (
                    <div className="text-[10px] text-rose-400 font-semibold bg-rose-100/40 px-2 py-0.5 rounded border border-dashed border-rose-300">
                      + Scegli proteina
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Condiments / Water Tray */}
          <div className="mt-4 flex items-center gap-4 bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl text-xs">
            <div className="flex items-center gap-1.5 text-sky-800 font-bold">
              <span>💧 Acqua:</span>
              <span className="text-[11px] font-normal text-slate-600">Sempre presente</span>
            </div>

            <div className="h-4 w-px bg-slate-300" />

            <div className="flex items-center gap-1.5">
              <span className="font-bold text-emerald-800">🫒 Grassi buoni:</span>
              {fatItem ? (
                <button
                  onClick={() => handleRemoveItem('fats')}
                  className="px-2 py-0.5 bg-white border border-emerald-200 rounded font-bold text-[10px] text-emerald-900 hover:bg-rose-50 hover:text-rose-700 flex items-center gap-1"
                >
                  <span>{fatItem.icon} {fatItem.name.split(' ')[0]}</span>
                  <span className="text-rose-500">✕</span>
                </button>
              ) : (
                <span className="text-[11px] text-slate-400 italic">Olio EVO consigliato</span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 flex gap-3 w-full max-w-sm">
            <button
              onClick={handleEvaluatePlate}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow transition-transform active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verifica Piatto</span>
            </button>

            <button
              onClick={handleResetPlate}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition"
              title="Svuota piatto"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Svuota</span>
            </button>
          </div>

          {/* Feedback Area */}
          {feedback.type && (
            <div
              className={`mt-4 w-full p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                  : feedback.type === 'warning'
                  ? 'bg-amber-50 text-amber-950 border-amber-300'
                  : 'bg-rose-50 text-rose-950 border-rose-300'
              }`}
            >
              <div className="font-bold text-sm flex items-center gap-2 mb-1">
                {feedback.type === 'success' && <Sparkles className="w-4 h-4 text-emerald-600" />}
                {feedback.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                {feedback.type === 'error' && <AlertTriangle className="w-4 h-4 text-rose-600" />}
                <span>{feedback.title}</span>
                {feedback.scoreEarned && (
                  <span className="ml-auto text-xs font-black bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                    +{feedback.scoreEarned} pt
                  </span>
                )}
              </div>
              <div>{feedback.message}</div>

              {feedback.type === 'success' && currentLevelIdx < plateChallengeLevels.length - 1 && (
                <button
                  onClick={handleNextLevel}
                  className="mt-3 flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-xs shadow-sm transition"
                >
                  <span>Passa al Livello {currentLevelIdx + 2}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Ingredients Selection / Pantry Column */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-800">
                Dispensa degli Alimenti
              </h3>
              <p className="text-xs text-slate-500">
                Fai clic su un ingrediente per inserirlo nel piatto
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
              {filteredIngredients.length} opzioni
            </span>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-2">
            {[
              { id: 'all', label: 'Tutti' },
              { id: 'veg', label: '🥦 Verdura/Frutta' },
              { id: 'grains', label: '🌾 Cereali' },
              { id: 'proteins', label: '🫘 Proteine' },
              { id: 'fats_dairy', label: '🫒 Grassi Buoni' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategoryFilter(tab.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  activeCategoryFilter === tab.id
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* List of Ingredient Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[480px] overflow-y-auto pr-1">
            {filteredIngredients.map(item => {
              const used = isItemUsed(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => !used && handleSelectIngredient(item)}
                  className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 ${
                    used
                      ? 'bg-slate-50 border-slate-200 opacity-40 cursor-not-allowed'
                      : 'bg-white hover:bg-emerald-50/50 border-slate-200 hover:border-emerald-400 cursor-pointer shadow-sm hover:shadow'
                  }`}
                >
                  <span className="text-2xl shrink-0 p-1 bg-slate-50 rounded-lg">{item.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-800 leading-tight">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                      {item.description}
                    </div>
                    {used && (
                      <span className="inline-block mt-1 text-[9px] font-bold text-emerald-700">
                        ✓ Nel piatto
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
            <HeartHandshake className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Consiglio del Nutrizionista:</strong> Ricorda che non ci sono cibi vietati. La formula vincente per ogni pasto è la presenza contemporanea di fibre vegetali, carboidrati a lento rilascio e proteine magre.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
