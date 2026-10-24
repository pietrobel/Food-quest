import React from 'react';
import { ViewMode } from '../types';
import { 
  UtensilsCrossed, 
  MessageSquareQuote, 
  Search, 
  Gamepad2, 
  Brain, 
  Dices, 
  Code2, 
  Leaf, 
  ArrowRight,
  ShieldCheck,
  Droplet,
  Wheat,
  Award
} from 'lucide-react';

interface HomeDashboardProps {
  onNavigate: (view: ViewMode) => void;
  globalScore: number;
  bestScores?: Record<string, number>;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({ onNavigate, globalScore, bestScores = {} }) => {
  const cards = [
    {
      id: 'plate' as ViewMode,
      title: "La Sfida del Piatto Sano",
      subtitle: "La modalità più amata",
      description: "Costruisci il tuo pasto ideale bilanciando 1/2 verdure, 1/4 cereali integrali e 1/4 proteine sane con sfide a livello crescente.",
      icon: "🍽️",
      lucide: UtensilsCrossed,
      color: "from-rose-500 to-pink-600",
      border: "border-pink-200 hover:border-pink-400",
      badge: "In Primo Piano ⭐",
      badgeColor: "bg-pink-100 text-pink-800"
    },
    {
      id: 'battle' as ViewMode,
      title: "Food Battle: Chi ha ragione?",
      subtitle: "Dibattito a fumetti & Coding",
      description: "Pizza, Hamburger, Broccolo e Carota si sfidano in una discussione in stile Scratch: scopri chi ha le ragioni scientifiche!",
      icon: "💬",
      lucide: MessageSquareQuote,
      color: "from-amber-500 to-orange-600",
      border: "border-amber-200 hover:border-amber-400",
      badge: "Stile Scratch / Code.org",
      badgeColor: "bg-amber-100 text-amber-800"
    },
    {
      id: 'detective' as ViewMode,
      title: "Detective dell'Etichetta",
      subtitle: "Indagine nutrizionale",
      description: "Esamina le vere tabelle nutrizionali e la lista ingredienti per scoprire zuccheri occulti e sodio nascosto.",
      icon: "🔍",
      lucide: Search,
      color: "from-slate-700 to-slate-900",
      border: "border-slate-300 hover:border-slate-500",
      badge: "4 Casi di Indagine",
      badgeColor: "bg-slate-100 text-slate-800"
    },
    {
      id: 'game' as ViewMode,
      title: "Missione Piatto Sano 2D",
      subtitle: "Azione & Raccolta Arcade",
      description: "Guida il personaggio nei 3 livelli di gioco 2D: raccogli gli ingredienti evitando le insidie senza muovere la pagina!",
      icon: "🏃♂️",
      lucide: Gamepad2,
      color: "from-emerald-600 to-teal-700",
      border: "border-emerald-200 hover:border-emerald-400",
      badge: "3 Livelli 2D",
      badgeColor: "bg-emerald-100 text-emerald-800"
    },
    {
      id: 'quiz' as ViewMode,
      title: "Quiz Alimentare Completo",
      subtitle: "20 domande originali",
      description: "Test approfondito su varietà, idratazione, conservazione, etichette e sicurezza con spiegazioni immediate.",
      icon: "🧠",
      lucide: Brain,
      color: "from-sky-600 to-blue-700",
      border: "border-sky-200 hover:border-sky-400",
      badge: "20 Quesiti & Feedback",
      badgeColor: "bg-sky-100 text-sky-800"
    },
    {
      id: 'minigames' as ViewMode,
      title: "Minigiochi Nutrizionali",
      subtitle: "Memory, V/F & Classificazione",
      description: "Memory a coppie, 15 affermazioni di Vero o Falso e ceste di classificazione degli alimenti accessibili via drag & click.",
      icon: "🎮",
      lucide: Dices,
      color: "from-violet-600 to-purple-700",
      border: "border-purple-200 hover:border-purple-400",
      badge: "3 Minigiochi",
      badgeColor: "bg-purple-100 text-purple-800"
    },
    {
      id: 'codeweek' as ViewMode,
      title: "Angolo Code Week",
      subtitle: "Pensiero computazionale",
      description: "Algoritmo ricetta da riordinare (senza numeri guida!), debugging della catena del freddo e blocchi logici IF/ELSE.",
      icon: "💻",
      lucide: Code2,
      color: "from-indigo-600 to-blue-800",
      border: "border-indigo-200 hover:border-indigo-400",
      badge: "Algoritmi & Debug",
      badgeColor: "bg-indigo-100 text-indigo-800"
    },
    {
      id: 'eco' as ViewMode,
      title: "Eco-Chef: Spreco Zero",
      subtitle: "Agenda 2030 & Stagionalità",
      description: "Cucina sostenibile: ricette creative per gli avanzi del pane e verdure, e calendario dei prodotti di stagione.",
      icon: "🌍",
      lucide: Leaf,
      color: "from-green-600 to-emerald-800",
      border: "border-green-200 hover:border-green-400",
      badge: "Sostenibilità & Goal 12",
      badgeColor: "bg-green-100 text-green-800"
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-950 text-white p-6 sm:p-10 shadow-xl border border-emerald-600/30">
        <div className="absolute -right-10 -bottom-10 opacity-15 pointer-events-none text-9xl">
          🥗
        </div>
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 text-xs font-semibold">
            <span>🌾 Giornata dell'Alimentazione Sana & Code Week</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            FOOD QUEST <span className="text-emerald-300">La missione del mangiar sano</span>
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Un'avventura didattica per gli studenti della scuola secondaria di primo grado: componi piatti equilibrati, 
            risolvi indagini sulle etichette, arbitra la Food Battle e allena il pensiero computazionale senza divieti né sensi di colpa!
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 text-emerald-100 text-xs font-medium backdrop-blur">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Senza cibi vietati
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 text-emerald-100 text-xs font-medium backdrop-blur">
              <Droplet className="w-3.5 h-3.5 text-cyan-300" /> Idratazione & Salute
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 text-emerald-100 text-xs font-medium backdrop-blur">
              <Wheat className="w-3.5 h-3.5 text-amber-300" /> Modello Harvard 1/2 + 1/4 + 1/4
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 text-emerald-100 text-xs font-medium backdrop-blur">
              <Code2 className="w-3.5 h-3.5 text-indigo-300" /> Pensiero Computazionale
            </span>
          </div>
        </div>
      </div>

      {/* Progress & Quick Stats Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-2xl">
            ⭐
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Punteggio di Sessione</div>
            <div className="text-xl sm:text-2xl font-black text-slate-800">{globalScore} Punti Conquistati</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('certificate')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-sm transition-transform active:scale-95"
          >
            <Award className="w-4 h-4" />
            <span>Guarda il tuo Attestato Ufficiale</span>
          </button>
        </div>
      </div>

      {/* Section Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Scegli la tua Missione
          </h2>
          <span className="text-xs text-slate-500 font-medium">8 moduli didattici interattivi</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c) => {
            const IconLucide = c.lucide;
            return (
              <div
                key={c.id}
                onClick={() => onNavigate(c.id)}
                className={`group bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl border ${c.border} transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col justify-between`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') onNavigate(c.id); }}
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl group-hover:scale-110 transition-transform">{c.icon}</span>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.badgeColor}`}>
                        {c.badge}
                      </span>
                      {(() => {
                        const score = c.id === 'minigames'
                          ? ((bestScores['memory'] || 0) + (bestScores['vf'] || 0) + (bestScores['classify'] || 0))
                          : (bestScores[c.id] || 0);
                        if (score > 0) {
                          return (
                            <span className="text-[10px] font-extrabold bg-amber-50 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded-md">
                              ⭐ Record: {score} pt
                            </span>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-800 group-hover:text-emerald-700 transition-colors leading-snug">
                    {c.title}
                  </h3>
                  <div className="text-xs font-semibold text-slate-400 mb-2">{c.subtitle}</div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {c.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                  <span className="flex items-center gap-1.5">
                    <IconLucide className="w-3.5 h-3.5" />
                    Entra nella sfida
                  </span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
