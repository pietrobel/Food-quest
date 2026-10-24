import React, { useState } from 'react';
import { Leaf, Sparkles, Calendar, BookOpen, Heart, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

import { UpdateScoreFn } from '../types';
import { Trophy } from 'lucide-react';

interface EcoChefProps {
  onUpdateScore: UpdateScoreFn;
  bestScores: Record<string, number>;
}

export const EcoChefSection: React.FC<EcoChefProps> = ({ onUpdateScore, bestScores }) => {
  const [selectedSeason, setSelectedSeason] = useState<'primavera' | 'estate' | 'autunno' | 'inverno'>('autunno');
  const [unlockedRecipes, setUnlockedRecipes] = useState<string[]>([]);
  const bestEcoScore = bestScores['eco'] || 0;

  const seasonalFoods = {
    primavera: {
      name: "Primavera 🌸",
      veg: ["Asparagi 🌿", "Piselli freschi 🫛", "Fave novelle 🫘", "Carciofi 🥬", "Spinaci novelli 🥬"],
      fruits: ["Fragole 🍓", "Nespole 🍑", "Ciliegie 🍒"],
      ecoTip: "In primavera le gemme vegetali sono ricche di vitamina C e clorofilla purificante."
    },
    estate: {
      name: "Estate ☀️",
      veg: ["Pomodori maturi 🍅", "Zucchine 🥒", "Melanzane 🍆", "Peperoni 🫑", "Fagiolini 🫘"],
      fruits: ["Anguria 🍉", "Pesche 🍑", "Albicocche 🍑", "Fichi 🍈", "Melone 🍈"],
      ecoTip: "I cibi estivi contengono fino al 92% di acqua biologica per contrastare il caldo e la sudorazione."
    },
    autunno: {
      name: "Autunno 🍂",
      veg: ["Zucca mantovana 🎃", "Funghi 🍄", "Broccoli 🥦", "Cavolfiore 🥦", "Bietole 🥬"],
      fruits: ["Uva 🍇", "Mele 🍎", "Pere 🍐", "Cachi 🥭", "Melagrana 🍎", "Castagne 🌰"],
      ecoTip: "L'autunno offre cibi ricchi di fibre e antiossidanti che preparano il sistema immunitario al freddo."
    },
    inverno: {
      name: "Inverno ❄️",
      veg: ["Finocchi 🥗", "Cavolo verza 🥬", "Radicchio rosso 🥗", "Porri 🧅", "Cime di rapa 🥦"],
      fruits: ["Arance 🍊", "Mandarini 🍊", "Kiwi 🥝", "Pompelmi 🍋"],
      ecoTip: "Gli agrumi invernali sono la riserva naturale di acido ascorbico (vitamina C) a chilometro zero."
    }
  };

  const zeroWasteRecipes = [
    {
      id: 'pane',
      title: "Pappa al Pomodoro & Panzanella",
      ingredient: "Pane raffermo di qualche giorno 🍞",
      tradition: "Cucina toscana e contadina italiana",
      desc: "Il pane duro viene ammorbidito con acqua o brodo, unito a pomodori maturi e profumato con basilico fresco e un filo di olio EVO.",
      bonus: 15
    },
    {
      id: 'gambi',
      title: "Vellutata di Gambi di Broccolo & Porri",
      ingredient: "Gambi e foglie esterne dei broccoli 🥦",
      tradition: "Minestre di recupero ad alto tenore di fibre",
      desc: "I gambi contengono la stessa quantità di vitamine delle cime! Tagliati a rondelle e lessati con una patata, si trasformano in una crema morbidissima.",
      bonus: 15
    },
    {
      id: 'banane',
      title: "Banana Bread Naturale Senza Zuccheri Aggiunti",
      ingredient: "Banane con buccia scura molto mature 🍌",
      tradition: "Dolce sano per la prima colazione",
      desc: "Le banane molto mature sviluppano una naturale dolcezza che permette di eliminare completamente lo zucchero bianco dall'impasto della torta.",
      bonus: 15
    },
    {
      id: 'bucce',
      title: "Aromi agli Agrumi & Tisane Digestive",
      ingredient: "Scorze di arance e limoni biologici non trattati 🍊",
      tradition: "Erboristeria ed essiccazione domestica",
      desc: "La buccia non trattata è ricchissima di oli essenziali (limonene). Essiccata sul termosifone, insaporisce torte, tisane e risotti.",
      bonus: 15
    }
  ];

  const handleUnlockRecipe = (recipeId: string, _bonus: number) => {
    if (unlockedRecipes.includes(recipeId)) return;
    const nextList = [...unlockedRecipes, recipeId];
    setUnlockedRecipes(nextList);
    const newTotal = nextList.length * 15;
    // Assign score for eco-chef, updating only if higher than previous best
    onUpdateScore('eco', newTotal);
    try {
      confetti({ particleCount: 35, spread: 45, origin: { y: 0.7 } });
    } catch (e) {}
  };

  const currentSeason = seasonalFoods[selectedSeason];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌍</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
              Eco-Chef: Sfida Spreco Zero & Stagionalità
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Laboratorio Agenda 2030 (Goal 12): cucina del riuso, rispetto dei cicli naturali e chilometro zero
            </p>
          </div>
        </div>

        <div className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
          Ricette Sbloccate: {unlockedRecipes.length} / 4
        </div>
      </div>

      {/* Part 1: Zero Waste Recipes */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-base sm:text-lg">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>Le Ricette della Tradizione a "Spreco Zero"</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Circa un terzo del cibo globale viene gettato prima della tavola. Recuperare gli alimenti maturi o gli scarti nobili è un gesto di rispetto ecologico e intelligenza gastronomica!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {zeroWasteRecipes.map(r => {
            const isUnlocked = unlockedRecipes.includes(r.id);
            return (
              <div
                key={r.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isUnlocked 
                    ? 'bg-emerald-50/70 border-emerald-300 shadow-sm' 
                    : 'bg-slate-50 border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                      {r.title}
                    </h4>
                    {isUnlocked && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 shrink-0">
                        Sbloccata ✓
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-bold text-emerald-700 mb-1">
                    Ingrediente di recupero: {r.ingredient}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-400 mb-2">
                    {r.tradition}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {r.desc}
                  </p>
                </div>

                {!isUnlocked ? (
                  <button
                    onClick={() => handleUnlockRecipe(r.id, r.bonus)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Sblocca Ricetta (+{r.bonus} pt)</span>
                  </button>
                ) : (
                  <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Complimenti! Ricetta aggiunta al tuo ricettario sostenibile.</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 2: Interactive Seasonal Calendar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
          <div className="flex items-center gap-2 text-slate-800 font-extrabold text-base sm:text-lg">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <span>Calendario Interattivo della Stagionalità Locale</span>
          </div>

          <div className="flex gap-1.5">
            {[
              { id: 'primavera', label: '🌸 Primavera' },
              { id: 'estate', label: '☀️ Estate' },
              { id: 'autunno', label: '🍂 Autunno' },
              { id: 'inverno', label: '❄️ Inverno' }
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedSeason(s.id as any)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                  selectedSeason === s.id
                    ? 'bg-emerald-700 text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-emerald-950">
              I Doni della Terra in {currentSeason.name}
            </h3>
            <span className="text-xs font-bold bg-white/80 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
              Maturazione Naturale
            </span>
          </div>

          <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed italic">
            💡 {currentSeason.ecoTip}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-emerald-200">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                🥦 Ortaggi del Mese:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentSeason.veg.map((v, i) => (
                  <span key={i} className="text-xs font-bold bg-emerald-100/70 text-emerald-900 px-2.5 py-1 rounded-lg">
                    {v}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-emerald-200">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800 block mb-2">
                🍓 Frutta di Stagione:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentSeason.fruits.map((f, i) => (
                  <span key={i} className="text-xs font-bold bg-rose-100/70 text-rose-900 px-2.5 py-1 rounded-lg">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
