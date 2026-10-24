import React, { useState } from 'react';
import { Award, Printer, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

interface CertificateViewProps {
  globalScore: number;
  bestScores?: Record<string, number>;
  onNavigateHome: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({ globalScore, onNavigateHome }) => {
  const [studentName, setStudentName] = useState('');
  const today = new Date().toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Controls Header (hidden during print) */}
      <div className="no-print bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Torna al Menu</span>
          </button>
          <div>
            <h2 className="text-xl font-extrabold text-slate-800">
              Attestato di Merito Ufficiale
            </h2>
            <p className="text-xs text-slate-500">
              Visualizzabile e stampabile per la classe o per il portfolio delle competenze
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow transition-transform active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Stampa Attestato</span>
          </button>
        </div>
      </div>

      {/* Name Input Bar (hidden during print) */}
      <div className="no-print bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-amber-900 font-semibold">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Personalizza l'attestato scrivendo il nome dell'alunno o della classe (opzionale):</span>
        </div>
        <input
          type="text"
          placeholder="Es. Mario Rossi oppure Classe 1^A"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-slate-800 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 max-w-xs w-full"
        />
      </div>

      {/* Official Certificate Wrapper */}
      <div id="printable-certificate" className="bg-white rounded-3xl p-8 sm:p-14 border-[12px] border-double border-emerald-800 shadow-2xl max-w-3xl mx-auto text-center space-y-6 relative overflow-hidden">
        {/* Corner Decorators */}
        <div className="absolute top-4 left-4 text-emerald-800/30 text-2xl font-serif">❦</div>
        <div className="absolute top-4 right-4 text-emerald-800/30 text-2xl font-serif">❦</div>
        <div className="absolute bottom-4 left-4 text-emerald-800/30 text-2xl font-serif">❦</div>
        <div className="absolute bottom-4 right-4 text-emerald-800/30 text-2xl font-serif">❦</div>

        {/* Seal Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-4xl shadow-md border-4 border-white text-white">
          🏅
        </div>

        {/* Headings */}
        <div className="space-y-1">
          <span className="text-xs font-black tracking-widest text-emerald-700 uppercase">
            Repubblica della Salute & Benessere Alimentare
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase font-serif">
            Certificato Ufficiale di Merito
          </h1>
          <div className="text-xs sm:text-sm text-slate-500 font-medium">
            Progetto Didattico «FOOD QUEST – La missione dell'alimentazione sana»
          </div>
        </div>

        {/* Recipient */}
        <div className="py-2">
          <p className="text-xs sm:text-sm text-slate-600 italic">Si attesta con lode che</p>
          <div className="my-2 py-1 px-8 inline-block border-b-2 border-dashed border-slate-400 text-xl sm:text-2xl font-black text-emerald-900 min-w-[280px]">
            {studentName.trim() || "Campione di Food Quest"}
          </div>
          <p className="text-xs text-slate-500">ha completato con successo le sfide didattiche ed educative</p>
        </div>

        {/* Motivation / Description */}
        <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
          Dimostrando eccellenti competenze nell'applicazione del modello del <strong>Piatto del Mangiar Sano</strong>, 
          nella comprensione dell'importanza dell'idratazione e delle fibre vegetali, nella decodifica delle 
          <strong> Etichette Nutrizionali</strong>, nella riduzione dello spreco alimentare e nell'utilizzo del 
          <strong> pensiero computazionale</strong> per la vita quotidiana.
        </p>

        {/* Score & Badges */}
        <div className="py-4 px-6 bg-slate-50 border border-slate-200 rounded-2xl max-w-lg mx-auto flex items-center justify-around">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Punteggio Sessione</span>
            <span className="text-xl sm:text-2xl font-black text-amber-600">{globalScore} Punti</span>
          </div>
          <div className="h-8 w-px bg-slate-300" />
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Grado Raggiunto</span>
            <span className="text-xs sm:text-sm font-bold text-emerald-800">Master Nutrizionale 🌟</span>
          </div>
        </div>

        {/* Signatures & Date */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 px-4">
          <div className="text-left">
            <span>Data di Conseguimento:</span>
            <div className="font-bold text-slate-800 mt-0.5">{today}</div>
          </div>

          <div className="text-right">
            <span>Il Comitato Scientifico & Didattico:</span>
            <div className="font-serif italic font-bold text-slate-800 mt-0.5 text-sm">Food Quest Educational</div>
          </div>
        </div>
      </div>
    </div>
  );
};
