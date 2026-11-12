import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SPRIG_SPRITES, SPRIG_PALETTE } from './sprig/bitmaps';

// 5 Original Levels (Each with exactly ONE player 'p')
const LEVELS = [
  [
    "wwwwwwwwwwwwwwwww",
    "wp....c........hw",
    "w...wwwwwww...www",
    "w...w.....c.....w",
    "w...w.w.w.www...w",
    "wc....w.h...c...w",
    "w...www.w.www...w",
    "w...c...c.......w",
    "wwwwwwwwwwwwwwwww"
  ],
  [
    "wwwwwwwwwwwwwwwww",
    "wpc...h...c....hw",
    "w.wwwww.wwwww.www",
    "w.w.....c.....w.w",
    "w.w.w.wwwww.w.w.w",
    "w.c.w...h...w.c.w",
    "w.w.w.wwwww.w.w.w",
    "w...c..........cw",
    "wwwwwwwwwwwwwwwww"
  ],
  [
    "wwwwwwwwwwwwwwwww",
    "wp.c.h.c.h.c.c.hw",
    "w.www.w.w.w.ww.hw",
    "w.c...w...w....cw",
    "w.www.w.w.w.ww.ww",
    "w.c...h...h....cw",
    "w.wwwwwwwwwwwww.w",
    "w.c...........c.w",
    "wwwwwwwwwwwwwwwww"
  ],
  [
    "wwwwwwwwwwwwwwwww",
    "wph...c...c...h.w",
    "w.w.wwwww.wwwww.w",
    "w.c.w...c...c.w.w",
    "w.w.w.w.w.w.w.w.w",
    "w.c.w.c.h.c.w.c.w",
    "w.w.w.w.w.w.w.w.w",
    "w.c...c...c...c.w",
    "wwwwwwwwwwwwwwwww"
  ],
  [
    "wwwwwwwwwwwwwwwww",
    "wp.h.c.h.c.h.c.hw",
    "w.w.w.w.w.w.w.w.w",
    "wc.h.c.h.c.h.c.cw",
    "w.w.w.w.w.w.w.w.w",
    "wc.h.c.h.c.h.c.cw",
    "w.w.w.w.w.w.w.w.w",
    "w.c...c...c...c.w",
    "wwwwwwwwwwwwwwwww"
  ]
];

// Lightweight Retro Beeper
class Beeper {
  ctx: AudioContext | null = null;
  init() {
    if (!this.ctx) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (Ctx) this.ctx = new Ctx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }
  beep(freq: number, type: OscillatorType, dur: number, vol = 0.1) {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + dur);
    } catch {}
  }
}
const sfx = new Beeper();

export default function App() {
  const [levelIdx, setLevelIdx] = useState(0);
  const [grid, setGrid] = useState<string[][]>([]);
  const [player, setPlayer] = useState({ x: 1, y: 1 });
  const [facing, setFacing] = useState<'l' | 'r'>('r');
  const [coinsLeft, setCoinsLeft] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [moves, setMoves] = useState(0);
  const [energy, setEnergy] = useState(0); // Creative Idea: Energy to Dash over hazards!
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [pulseWave, setPulseWave] = useState<{ x: number; y: number; r: number } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isLockedRef = useRef(false);

  // Load level into grid
  const loadLevel = useCallback((idx: number) => {
    const raw = LEVELS[idx];
    const newGrid: string[][] = [];
    let px = 1;
    let py = 1;
    let coins = 0;

    for (let y = 0; y < raw.length; y++) {
      const row: string[] = [];
      for (let x = 0; x < raw[y].length; x++) {
        const ch = raw[y][x];
        if (ch === 'p') {
          px = x;
          py = y;
          row.push('p');
        } else if (ch === 'c') {
          coins++;
          row.push('c');
        } else {
          row.push(ch);
        }
      }
      newGrid.push(row);
    }

    setGrid(newGrid);
    setPlayer({ x: px, y: py });
    setCoinsLeft(coins);
    setTotalCoins(coins);
    setMoves(0);
    setEnergy(0);
    setStatusMsg(null);
    setPulseWave(null);
    isLockedRef.current = false;
  }, []);

  useEffect(() => {
    loadLevel(levelIdx);
  }, [levelIdx, loadLevel]);

  // Movement & Creative "Boom" Mechanics:
  // 1. Every crystal collected gives 1 "NEON ENERGY"
  // 2. Spacebar triggers a "NEON PHASE DASH": jumps 2 tiles in facing direction (skips hazards/gaps!)
  // 3. Echolocation pulse ripples across the screen
  const step = useCallback((dx: number, dy: number, isDash = false) => {
    if (isLockedRef.current) return;

    if (dx < 0) setFacing('l');
    if (dx > 0) setFacing('r');

    const mult = isDash ? 2 : 1;
    const nx = player.x + dx * mult;
    const ny = player.y + dy * mult;

    // Check bounds
    if (ny < 0 || ny >= grid.length || nx < 0 || nx >= grid[0].length) return;

    // Wall collision
    if (grid[ny][nx] === 'w') {
      sfx.beep(120, 'square', 0.05, 0.05);
      return;
    }

    // Trigger visual pulse wave (Idée boom: visual echo ripple)
    setPulseWave({ x: nx, y: ny, r: 0 });

    const newGrid = grid.map(r => [...r]);
    newGrid[player.y][player.x] = '.';

    const target = newGrid[ny][nx];

    // Hazard collision
    if (target === 'h') {
      newGrid[ny][nx] = 'p';
      setGrid(newGrid);
      setPlayer({ x: nx, y: ny });
      isLockedRef.current = true;
      sfx.beep(90, 'sawtooth', 0.3, 0.2);
      setStatusMsg("OUCH! RESETTING...");

      setTimeout(() => {
        loadLevel(levelIdx);
      }, 500);
      return;
    }

    // Crystal collection
    let cLeft = coinsLeft;
    let nEnergy = energy;
    if (target === 'c') {
      cLeft--;
      nEnergy = Math.min(3, nEnergy + 1); // Gain dash charge!
      setCoinsLeft(cLeft);
      setEnergy(nEnergy);
      sfx.beep(880 + (totalCoins - cLeft) * 120, 'square', 0.15, 0.15);
    } else {
      sfx.beep(200, 'triangle', 0.04, 0.05);
    }

    newGrid[ny][nx] = 'p';
    setGrid(newGrid);
    setPlayer({ x: nx, y: ny });
    setMoves(m => m + 1);

    // Victory Check
    if (cLeft === 0) {
      isLockedRef.current = true;
      sfx.beep(523, 'square', 0.1, 0.2);
      setTimeout(() => sfx.beep(659, 'square', 0.1, 0.2), 100);
      setTimeout(() => sfx.beep(784, 'square', 0.2, 0.2), 200);

      if (levelIdx < LEVELS.length - 1) {
        setStatusMsg(`LEVEL ${levelIdx + 2}!`);
        setTimeout(() => {
          setLevelIdx(l => l + 1);
        }, 800);
      } else {
        setStatusMsg("★ YOU ESCAPED! YOU WIN! ★");
      }
    }
  }, [player, grid, coinsLeft, energy, totalCoins, levelIdx, loadLevel]);

  // Dash trigger (Spacebar)
  const triggerDash = useCallback(() => {
    if (energy <= 0 || isLockedRef.current) return;
    setEnergy(e => e - 1);
    sfx.beep(1200, 'sine', 0.2, 0.2);
    const dx = facing === 'r' ? 1 : -1;
    step(dx, 0, true);
  }, [energy, facing, step]);

  // Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === 'w' || e.key === 'ArrowUp') step(0, -1);
      if (e.key === 's' || e.key === 'ArrowDown') step(0, 1);
      if (e.key === 'a' || e.key === 'ArrowLeft') step(-1, 0);
      if (e.key === 'd' || e.key === 'ArrowRight') step(1, 0);
      if (e.key === ' ') triggerDash();
      if (e.key === 'r' || e.key === 'R') loadLevel(levelIdx);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step, triggerDash, levelIdx, loadLevel]);

  // Pulse Wave animation
  useEffect(() => {
    if (!pulseWave) return;
    const interval = setInterval(() => {
      setPulseWave(p => {
        if (!p || p.r > 6) return null;
        return { ...p, r: p.r + 0.6 };
      });
    }, 30);
    return () => clearInterval(interval);
  }, [pulseWave]);

  // Canvas 16-bit Pixel Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || grid.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    const rows = grid.length; // 9
    const cols = grid[0].length; // 17
    const scale = 2; // 16x16 sprite * 2 = 32px
    const tileSize = 16 * scale;

    canvas.width = cols * tileSize; // 544px
    canvas.height = rows * tileSize; // 288px

    // Retro Screen CRT backdrop
    ctx.fillStyle = '#060a12';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Sprig 16x16 bitmap sprites
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const ch = grid[y][x];
        const sx = x * tileSize;
        const sy = y * tileSize;

        // Subtle dark grid box
        ctx.fillStyle = '#0a101d';
        ctx.fillRect(sx + 1, sy + 1, tileSize - 2, tileSize - 2);

        let spriteKey: keyof typeof SPRIG_SPRITES | null = null;
        if (ch === 'p') spriteKey = 'player';
        else if (ch === 'w') spriteKey = 'wall';
        else if (ch === 'c') spriteKey = 'coin';
        else if (ch === 'h') spriteKey = 'hazard';

        if (spriteKey) {
          const lines = SPRIG_SPRITES[spriteKey];
          for (let py = 0; py < 16; py++) {
            const line = lines[py];
            for (let px = 0; px < 16; px++) {
              const code = line[px];
              if (code && code !== '.') {
                ctx.fillStyle = SPRIG_PALETTE[code] || '#fff';
                // Flip player sprite horizontally if facing left
                const drawPx = spriteKey === 'player' && facing === 'l' ? 15 - px : px;
                ctx.fillRect(sx + drawPx * scale, sy + py * scale, scale, scale);
              }
            }
          }
        }
      }
    }

    // Creative Idea: Draw Sonar Echolocation Wave Ripple
    if (pulseWave) {
      const cx = (pulseWave.x + 0.5) * tileSize;
      const cy = (pulseWave.y + 0.5) * tileSize;
      const radius = pulseWave.r * tileSize * 0.7;
      ctx.strokeStyle = `rgba(6, 182, 212, ${Math.max(0, 0.7 - pulseWave.r * 0.12)})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Scanlines
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    for (let y = 0; y < canvas.height; y += 4) {
      ctx.fillRect(0, y, canvas.width, 2);
    }
  }, [grid, facing, pulseWave]);

  // Touch / Click screen to move
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) / rect.width;
    const clickY = (e.clientY - rect.top) / rect.height;

    const normPlayerX = player.x / 17;
    const normPlayerY = player.y / 9;

    const dx = clickX - normPlayerX;
    const dy = clickY - normPlayerY;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) step(1, 0);
      else step(-1, 0);
    } else {
      if (dy > 0) step(0, 1);
      else step(0, -1);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070d] text-slate-300 flex flex-col items-center justify-center p-3 select-none font-mono">
      {/* SIMPLE RETRO SCREEN FRAME */}
      <div className="bg-[#0e1420] border-2 border-[#1f293d] rounded-lg p-2.5 shadow-[0_0_40px_rgba(0,0,0,0.8)] max-w-full">
        
        {/* Minimalist Top LCD Info Bar */}
        <div className="flex items-center justify-between text-[11px] pb-1.5 px-1 border-b border-cyan-950 text-cyan-400 font-bold">
          <div className="flex items-center gap-3">
            <span>LVL {levelIdx + 1}/5</span>
            <span>CRYSTALS: {totalCoins - coinsLeft}/{totalCoins}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Energy Dash Charges (Idée boom) */}
            <span className={energy > 0 ? 'text-amber-300 animate-pulse' : 'text-slate-600'}>
              DASH: {'⚡'.repeat(energy) || 'EMPTY'}
            </span>
            <span className="text-slate-400">MOVES: {moves}</span>
          </div>
        </div>

        {/* Pixel Canvas Screen */}
        <div className="relative mt-2 rounded overflow-hidden border border-cyan-900/50 cursor-pointer">
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="block max-w-full h-auto mx-auto"
            style={{ imageRendering: 'pixelated' }}
          />

          {/* Retro In-Game Status Overlay */}
          {statusMsg && (
            <div className="absolute inset-0 bg-black/75 flex items-center justify-center p-4">
              <div className="bg-[#0b1320] border border-amber-400/80 px-4 py-2 text-amber-300 text-xs font-bold tracking-wider rounded shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                {statusMsg}
              </div>
            </div>
          )}
        </div>

        {/* Minimalist Bottom Control Hints */}
        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 px-1">
          <div className="flex items-center gap-2">
            <span>[WASD / ARROWS] Move</span>
            <span>·</span>
            <span>[SPACE] Neon Dash</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => loadLevel(levelIdx)} 
              className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
            >
              [R] Reset
            </button>
            <span>·</span>
            <button 
              onClick={() => setLevelIdx(l => (l + 1) % LEVELS.length)} 
              className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
