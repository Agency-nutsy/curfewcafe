import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [exit, setExit] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const W = canvas.width;
    const H = canvas.height;

    const LETTERS = ["C", "U", "R", "F", "E", "W"];
    const LETTER_INTERVAL = 350;
    const INITIAL_DELAY = 400;
    const FONT_SIZE = Math.min(W * 0.12, 120);
    const CENTER_Y = H * 0.45;

    const AQUA_NEON = ["#00f0ff", "#00d4ff", "#00ffff", "#7df9ff", "#ffffff"];

    interface Bubble {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; wobble: number;
    }

    interface Ripple {
      x: number; y: number; r: number; opacity: number;
    }

    let bubbles: Bubble[] = [];
    let ripples: Ripple[] = [];
    let revealedLetters = 0;
    let fadeOutStart = -1;
    let startTime = -1;
    let animId: number;

    const letterPos: { x: number; cx: number; y: number; w: number }[] = [];

    const setupPositions = () => {
      ctx.font = `bold ${FONT_SIZE}px "Cormorant Garamond", serif`;
      ctx.textAlign = "left";
      const widths = LETTERS.map((l) => ctx.measureText(l).width);
      const gap = FONT_SIZE * 0.08;
      const totalW = widths.reduce((a, b) => a + b, 0) + gap * (LETTERS.length - 1);
      let curX = (W - totalW) / 2;
      LETTERS.forEach((_, i) => {
        letterPos.push({ x: curX, cx: curX + widths[i] / 2, y: CENTER_Y, w: widths[i] });
        curX += widths[i] + gap;
      });
    };

    const spawnRipple = (cx: number, cy: number) => {
      ripples.push({ x: cx, y: cy, r: 0, opacity: 0.6 });
    };

    const spawnBubbles = (cx: number, cy: number) => {
      for (let i = 0; i < 15; i++) {
        bubbles.push({
          x: cx + (Math.random() - 0.5) * 40,
          y: cy + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 2,
          vy: -(Math.random() * 3 + 1),
          size: Math.random() * 6 + 2,
          opacity: Math.random() * 0.5 + 0.5,
          wobble: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawLetter = (letter: string, pos: { x: number; cx: number; y: number }, elapsed: number, idx: number) => {
      const wave = Math.sin(elapsed * 0.003 + idx * 0.8) * 5;
      
      ctx.save();
      ctx.font = `bold ${FONT_SIZE}px "Cormorant Garamond", serif`;
      ctx.textBaseline = "middle";
      ctx.shadowBlur = 25;
      ctx.shadowColor = "rgba(0, 240, 255, 0.5)";

      const grad = ctx.createLinearGradient(pos.x, pos.y - 50, pos.x, pos.y + 50);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.5, "#00f0ff");
      grad.addColorStop(1, "#0055ff");

      ctx.fillStyle = grad;
      ctx.fillText(letter, pos.x, pos.y + wave);
      ctx.restore();
    };

    const animate = (now: number) => {
      if (startTime === -1) startTime = now;
      const elapsed = now - startTime;

      ctx.fillStyle = "#020813";
      ctx.fillRect(0, 0, W, H);

      // --- LOGIC: REVEAL ---
      const target = elapsed < INITIAL_DELAY ? 0 : Math.min(LETTERS.length, Math.floor((elapsed - INITIAL_DELAY) / LETTER_INTERVAL) + 1);

      if (target > revealedLetters) {
        for (let i = revealedLetters; i < target; i++) {
          if (letterPos[i]) {
            spawnRipple(letterPos[i].cx, letterPos[i].y);
            spawnBubbles(letterPos[i].cx, letterPos[i].y);
          }
        }
        revealedLetters = target;
      }

      // --- DRAW: RIPPLES ---
      ripples.forEach((r, i) => {
        r.r += 4;
        r.opacity -= 0.008;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${r.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
      ripples = ripples.filter(r => r.opacity > 0);

      // --- DRAW: LETTERS ---
      for (let i = 0; i < revealedLetters; i++) {
        drawLetter(LETTERS[i], letterPos[i], elapsed, i);
      }

      // --- DRAW: BUBBLES ---
      bubbles.forEach((b) => {
        b.y += b.vy;
        b.x += Math.sin(elapsed * 0.01 + b.wobble) * 0.5;
        b.opacity -= 0.005;
        
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(125, 249, 255, ${b.opacity})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(255, 255, 255, ${b.opacity * 0.5})`;
        ctx.stroke();
      });
      bubbles = bubbles.filter(b => b.opacity > 0);

      // --- SUBTEXTS ---
      const allDoneAt = INITIAL_DELAY + LETTERS.length * LETTER_INTERVAL + 200;
      if (elapsed > allDoneAt) {
        const p = Math.min(1, (elapsed - allDoneAt) / 800);
        ctx.globalAlpha = p;
        ctx.font = `300 ${Math.max(14, FONT_SIZE * 0.2)}px Montserrat, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#00f0ff";
        ctx.letterSpacing = "10px";
        ctx.fillText("C A F É", W / 2, CENTER_Y + FONT_SIZE * 0.7);
        
        ctx.font = `italic 10px Montserrat, sans-serif`;
        ctx.fillText("COZY CHILL · NEON NIGHTS", W / 2, CENTER_Y + FONT_SIZE * 1.1);
        ctx.globalAlpha = 1;
      }

      // --- EXIT ---
      if (elapsed > allDoneAt + 2500 && fadeOutStart === -1) fadeOutStart = elapsed;
      if (fadeOutStart !== -1) {
        const fp = Math.min(1, (elapsed - fadeOutStart) / 800);
        ctx.fillStyle = `rgba(2, 8, 19, ${fp})`;
        ctx.fillRect(0, 0, W, H);
        if (fp >= 1 && !doneRef.current) {
          doneRef.current = true;
          setExit(true);
          setTimeout(() => onComplete(), 500);
          return;
        }
      }

      animId = requestAnimationFrame(animate);
    };

    document.fonts.ready.then(() => {
      setupPositions();
      animId = requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="fixed inset-0 z-[9999] bg-[#020813] overflow-hidden"
        >
          <canvas ref={canvasRef} className="w-full h-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;