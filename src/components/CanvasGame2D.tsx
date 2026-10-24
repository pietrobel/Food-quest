import React, { useEffect, useRef, useState } from 'react';
import { Gamepad2, Heart, RotateCcw, Award, Sparkles, ArrowRight, ShieldAlert, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UpdateScoreFn } from '../types';

interface CanvasGame2DProps {
  onUpdateScore: UpdateScoreFn;
  bestScores: Record<string, number>;
}

interface Item {
  x: number;
  y: number;
  icon: string;
  name: string;
  collected: boolean;
}

interface Hazard {
  x: number;
  y: number;
  icon: string;
  name: string;
  vx: number;
  vy: number;
  min: number;
  max: number;
}

export const CanvasGame2D: React.FC<CanvasGame2DProps> = ({ onUpdateScore, bestScores }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [level, setLevel] = useState<number>(1);
  const [lives, setLives] = useState<number>(3);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [collectedCount, setCollectedCount] = useState<number>(0);

  const bestGameScore = bestScores['game'] || 0;

  const [levelDialog, setLevelDialog] = useState<{
    show: boolean;
    title: string;
    message: string;
    isWin?: boolean;
    isGameOver?: boolean;
  }>({ show: false, title: '', message: '' });

  // Game state stored in refs for smooth animation frame updates
  const stateRef = useRef({
    player: { x: 50, y: 190, speed: 4.2 },
    keys: {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      KeyW: false,
      KeyS: false,
      KeyA: false,
      KeyD: false
    },
    items: [] as Item[],
    hazards: [] as Hazard[],
    targetCount: 3,
    level: 1,
    lives: 3,
    score: 0,
    collectedCount: 0,
    isPlaying: true
  });

  const levelConfigs = {
    1: {
      targetCount: 3,
      name: "Livello 1: La Colazione Equilibrata",
      mission: "Raccogli Avena 🥣, Banana 🍌 e Latte 🥛 evitando i dolci fritti 🍩!",
      items: [
        { x: 180, y: 90, icon: '🥣', name: 'Avena Integrale', collected: false },
        { x: 350, y: 280, icon: '🍌', name: 'Banana Fresca', collected: false },
        { x: 510, y: 120, icon: '🥛', name: 'Latte / Yogurt', collected: false }
      ],
      hazards: [
        { x: 270, y: 190, icon: '🍩', name: 'Dolce Fritto', vx: 0, vy: 2.2, min: 60, max: 320 }
      ]
    },
    2: {
      targetCount: 4,
      name: "Livello 2: Il Pranzo del Piatto Sano",
      mission: "Raccogli Broccolo 🥦, Carota 🥕, Riso 🌾 e Pesce 🐟 evitando le bibite gassate 🥤!",
      items: [
        { x: 160, y: 80, icon: '🥦', name: 'Broccolo', collected: false },
        { x: 290, y: 300, icon: '🥕', name: 'Carota', collected: false },
        { x: 420, y: 90, icon: '🌾', name: 'Riso Integrale', collected: false },
        { x: 540, y: 250, icon: '🐟', name: 'Pesce Azzurro', collected: false }
      ],
      hazards: [
        { x: 220, y: 190, icon: '🥤', name: 'Bibita Gassata', vx: 0, vy: 2.5, min: 60, max: 320 },
        { x: 380, y: 110, icon: '🥤', name: 'Bibita Gassata', vx: 0, vy: -2.3, min: 60, max: 320 }
      ]
    },
    3: {
      targetCount: 5,
      name: "Livello 3: Spesa Consapevole di Stagione",
      mission: "Raccogli 5 cibi stagionali (🍎🥬🥔🫒🌰) evitando caramelle 🍬 e patatine fritte 🍟!",
      items: [
        { x: 140, y: 70, icon: '🍎', name: 'Mela', collected: false },
        { x: 240, y: 310, icon: '🥬', name: 'Ortaggio a foglia', collected: false },
        { x: 340, y: 100, icon: '🥔', name: 'Patata al cartoccio', collected: false },
        { x: 450, y: 290, icon: '🫒', name: 'Olio EVO', collected: false },
        { x: 550, y: 130, icon: '🌰', name: 'Noci', collected: false }
      ],
      hazards: [
        { x: 190, y: 160, icon: '🍬', name: 'Caramelle', vx: 1.8, vy: 0, min: 110, max: 530 },
        { x: 400, y: 200, icon: '🍟', name: 'Patatine Fritte', vx: 0, vy: 2.8, min: 60, max: 320 }
      ]
    }
  };

  const initLevel = (lvlNum: number) => {
    const cfg = levelConfigs[lvlNum as 1 | 2 | 3];
    setLevel(lvlNum);
    setTimeLeft(lvlNum === 3 ? 50 : 60);
    setCollectedCount(0);

    stateRef.current.level = lvlNum;
    stateRef.current.player = { x: 50, y: 190, speed: 4.2 };
    stateRef.current.targetCount = cfg.targetCount;
    stateRef.current.collectedCount = 0;
    stateRef.current.items = cfg.items.map(i => ({ ...i }));
    stateRef.current.hazards = cfg.hazards.map(h => ({ ...h }));
    stateRef.current.isPlaying = true;
    setIsPlaying(true);
  };

  // Keyboard Event Listener with e.preventDefault() on arrow keys and space!
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // PREVENT WINDOW SCROLLING COMPLETELY ON ARROWS AND SPACE!
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'ArrowUp' || e.code === 'KeyW') stateRef.current.keys.ArrowUp = true;
      if (e.key === 'ArrowDown' || e.code === 'KeyS') stateRef.current.keys.ArrowDown = true;
      if (e.key === 'ArrowLeft' || e.code === 'KeyA') stateRef.current.keys.ArrowLeft = true;
      if (e.key === 'ArrowRight' || e.code === 'KeyD') stateRef.current.keys.ArrowRight = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.code === 'KeyW') stateRef.current.keys.ArrowUp = false;
      if (e.key === 'ArrowDown' || e.code === 'KeyS') stateRef.current.keys.ArrowDown = false;
      if (e.key === 'ArrowLeft' || e.code === 'KeyA') stateRef.current.keys.ArrowLeft = false;
      if (e.key === 'ArrowRight' || e.code === 'KeyD') stateRef.current.keys.ArrowRight = false;
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);

    initLevel(1);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Timer interval
  useEffect(() => {
    if (!isPlaying || levelDialog.show) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleGameOver("Tempo scaduto! Ricorda che pianificare i pasti con calma è la strategia vincente.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, levelDialog.show]);

  // Main Canvas Render & Physics Loop
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameLoop = () => {
      const state = stateRef.current;

      if (state.isPlaying && !levelDialog.show) {
        // Player Movement
        if (state.keys.ArrowUp) state.player.y -= state.player.speed;
        if (state.keys.ArrowDown) state.player.y += state.player.speed;
        if (state.keys.ArrowLeft) state.player.x -= state.player.speed;
        if (state.keys.ArrowRight) state.player.x += state.player.speed;

        // Clamping to canvas boundaries
        state.player.x = Math.max(18, Math.min(canvas.width - 18, state.player.x));
        state.player.y = Math.max(18, Math.min(canvas.height - 18, state.player.y));

        // Hazards movement & collision
        for (const h of state.hazards) {
          if (h.vy !== 0) {
            h.y += h.vy;
            if (h.y < h.min || h.y > h.max) h.vy *= -1;
          }
          if (h.vx !== 0) {
            h.x += h.vx;
            if (h.x < h.min || h.x > h.max) h.vx *= -1;
          }

          // Distance check
          const dist = Math.hypot(state.player.x - h.x, state.player.y - h.y);
          if (dist < 26) {
            state.lives -= 1;
            setLives(state.lives);
            state.player.x = 50;
            state.player.y = 190;

            if (state.lives <= 0) {
              handleGameOver("Hai esaurito le vite disponibili! Riprova con più attenzione.");
              return;
            }
          }
        }

        // Food Collection check
        for (const it of state.items) {
          if (!it.collected) {
            const dist = Math.hypot(state.player.x - it.x, state.player.y - it.y);
            if (dist < 28) {
              it.collected = true;
              state.collectedCount += 1;
              state.score += 20;
              setCollectedCount(state.collectedCount);
              setScore(state.score);

              if (state.collectedCount >= state.targetCount) {
                handleLevelComplete(state.level);
                return;
              }
            }
          }
        }
      }

      // Drawing routine
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Floor grid styling
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 35) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 35) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Draw Items to collect
      ctx.font = '26px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const it of state.items) {
        if (!it.collected) {
          // Glowing circle under item
          ctx.beginPath();
          ctx.arc(it.x, it.y, 18, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(52, 211, 153, 0.25)';
          ctx.fill();

          ctx.fillText(it.icon, it.x, it.y);
        }
      }

      // Draw Hazards
      for (const h of state.hazards) {
        ctx.beginPath();
        ctx.arc(h.x, h.y, 18, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
        ctx.fill();

        ctx.fillText(h.icon, h.x, h.y);
      }

      // Draw Player
      ctx.beginPath();
      ctx.arc(state.player.x, state.player.y, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#047857';
      ctx.stroke();

      ctx.font = '18px sans-serif';
      ctx.fillText('🏃', state.player.x, state.player.y);

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [levelDialog.show]);

  const handleLevelComplete = (completedLevel: number) => {
    stateRef.current.isPlaying = false;
    setIsPlaying(false);

    if (completedLevel < 3) {
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
      } catch (e) {}

      setLevelDialog({
        show: true,
        title: `🌟 Livello ${completedLevel} Completato!`,
        message: `Hai raccolto tutti gli ingredienti sani previsti! Messaggio nutrizionale: "La combinazione di carboidrati complessi, vitamine e proteine dona vitalità senza appesantire."`,
        isWin: false
      });
    } else {
      const finalScore = stateRef.current.score + 50;
      stateRef.current.score = finalScore;
      setScore(finalScore);
      // Assign score ONLY ONCE upon completing the game, updating only if higher than previous record
      onUpdateScore('game', finalScore);
      try {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      } catch (e) {}

      setLevelDialog({
        show: true,
        title: '🏆 Vittoria! Hai completato la Missione 2D!',
        message: `Straordinario! Hai guidato il personaggio attraverso la colazione, il pranzo e la spesa consapevole di stagione! Bonus vittoria finale: +50 punti! Punteggio finale sessione: ${finalScore} pt.`,
        isWin: true
      });
    }
  };

  const handleGameOver = (reason: string) => {
    stateRef.current.isPlaying = false;
    setIsPlaying(false);
    // Assign score achieved so far, updating only if higher than previous best
    onUpdateScore('game', stateRef.current.score);

    setLevelDialog({
      show: true,
      title: '⚠️ Missione da Riprovare',
      message: `${reason} Punteggio ottenuto in questa sessione: ${stateRef.current.score} pt. Nell'educazione alimentare, come nei videogiochi, ogni tentativo ti rende più abile e consapevole!`,
      isGameOver: true
    });
  };

  const handleDialogContinue = () => {
    if (levelDialog.isGameOver) {
      stateRef.current.lives = 3;
      setLives(3);
      initLevel(1);
    } else if (levelDialog.isWin) {
      stateRef.current.lives = 3;
      setLives(3);
      initLevel(1);
    } else {
      initLevel(level + 1);
    }
    setLevelDialog({ show: false, title: '', message: '' });
  };

  // On-screen D-Pad handlers
  const handleDpadPress = (key: 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight') => {
    stateRef.current.keys[key] = true;
  };
  const handleDpadRelease = (key: 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight') => {
    stateRef.current.keys[key] = false;
  };

  const currentCfg = levelConfigs[level as 1 | 2 | 3];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏃♂️</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
              Missione Piatto Sano 2D
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Videogioco d'azione educativa dall'alto: raccogli gli ingredienti evitando le distrazioni alimentari
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
            Livello {level} di 3
          </span>
          <button
            onClick={() => {
              stateRef.current.lives = 3;
              setLives(3);
              initLevel(level);
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Riavvia Livello</span>
          </button>
        </div>
      </div>

      {/* Main Game Screen Canvas & HUD */}
      <div className="bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-700 flex flex-col items-center">
        {/* HUD Top Bar */}
        <div className="w-full max-w-[620px] flex items-center justify-between text-white text-xs sm:text-sm font-bold mb-3 px-2">
          <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
            <span>Vite:</span>
            <div className="flex gap-0.5">
              {[...Array(3)].map((_, i) => (
                <span key={i} className={`text-base ${i < lives ? 'opacity-100' : 'opacity-25'}`}>
                  ❤️
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/15 text-amber-300">
            ⭐ {score} pt gioco
          </div>

          <div className={`px-3 py-1.5 rounded-xl border font-mono ${
            timeLeft <= 10 
              ? 'bg-rose-950/80 text-rose-300 border-rose-500 animate-pulse' 
              : 'bg-white/10 text-cyan-200 border-white/15'
          }`}>
            ⏱️ {timeLeft}s
          </div>
        </div>

        {/* Canvas */}
        <div className="relative border-4 border-slate-700 rounded-2xl overflow-hidden shadow-2xl bg-slate-50">
          <canvas
            ref={canvasRef}
            width={620}
            height={380}
            className="block max-w-full touch-none"
          />

          {/* Dialog Modal Overlay inside Canvas */}
          {levelDialog.show && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-6 text-center z-20">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-fadeIn border border-slate-200">
                <div className="text-5xl">
                  {levelDialog.isWin ? '🏅' : levelDialog.isGameOver ? '⚠️' : '🌟'}
                </div>
                <h3 className="text-xl font-extrabold text-slate-800">
                  {levelDialog.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {levelDialog.message}
                </p>
                <button
                  onClick={handleDialogContinue}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow transition"
                >
                  {levelDialog.isWin ? 'Rigioca la Missione 2D' : levelDialog.isGameOver ? 'Riprova Livello' : 'Passa al Prossimo Livello ➔'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mission Objective Bar */}
        <div className="w-full max-w-[620px] mt-3 bg-slate-800 border border-slate-700 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">🎯 Obiettivo:</span>
            <span>{currentCfg.mission}</span>
          </div>
          <div className="font-bold text-amber-300 bg-black/30 px-2.5 py-1 rounded-lg">
            Raccolti: {collectedCount} / {currentCfg.targetCount}
          </div>
        </div>

        {/* On-screen D-Pad for accessibility on touch & mouse */}
        <div className="mt-4 flex flex-col items-center gap-1.5 select-none">
          <button
            onMouseDown={() => handleDpadPress('ArrowUp')}
            onMouseUp={() => handleDpadRelease('ArrowUp')}
            onTouchStart={() => handleDpadPress('ArrowUp')}
            onTouchEnd={() => handleDpadRelease('ArrowUp')}
            className="w-14 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xl border border-slate-600 active:bg-slate-600 flex items-center justify-center shadow"
          >
            ⬆️
          </button>
          <div className="flex gap-2">
            <button
              onMouseDown={() => handleDpadPress('ArrowLeft')}
              onMouseUp={() => handleDpadRelease('ArrowLeft')}
              onTouchStart={() => handleDpadPress('ArrowLeft')}
              onTouchEnd={() => handleDpadRelease('ArrowLeft')}
              className="w-14 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xl border border-slate-600 active:bg-slate-600 flex items-center justify-center shadow"
            >
              ⬅️
            </button>
            <button
              onMouseDown={() => handleDpadPress('ArrowDown')}
              onMouseUp={() => handleDpadRelease('ArrowDown')}
              onTouchStart={() => handleDpadPress('ArrowDown')}
              onTouchEnd={() => handleDpadRelease('ArrowDown')}
              className="w-14 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xl border border-slate-600 active:bg-slate-600 flex items-center justify-center shadow"
            >
              ⬇️
            </button>
            <button
              onMouseDown={() => handleDpadPress('ArrowRight')}
              onMouseUp={() => handleDpadRelease('ArrowRight')}
              onTouchStart={() => handleDpadPress('ArrowRight')}
              onTouchEnd={() => handleDpadRelease('ArrowRight')}
              className="w-14 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xl border border-slate-600 active:bg-slate-600 flex items-center justify-center shadow"
            >
              ➡️
            </button>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 mt-2">
          🎮 Usa i <strong>Tasti Freccia</strong> o <strong>W-A-S-D</strong> sulla tastiera del PC. Lo scorrimento della finestra del browser è disattivato per garantire un controllo fluido.
        </p>
      </div>
    </div>
  );
};
