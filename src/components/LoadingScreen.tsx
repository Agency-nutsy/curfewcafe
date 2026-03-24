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

    // The Labib's text sequence
    const LETTERS = ["L", "A", "B", "I", "B", "'", "S"];
    const LETTER_INTERVAL = 120; // Fast, snappy sequence
    const INITIAL_DELAY = 300;
    const FONT_SIZE = Math.min(W * 0.12, 140);
    const CENTER_Y = H * 0.45;

    let fadeOutStart = -1;
    let startTime = -1;
    let animId: number;

    const letterPos: { x: number; cx: number; y: number; w: number }[] = [];

    const setupPositions = () => {
      ctx.font = `bold ${FONT_SIZE}px "Cormorant Garamond", serif`;
      ctx.textAlign = "left";
      const widths = LETTERS.map((l) => ctx.measureText(l).width);
      const gap = FONT_SIZE * 0.05; // Tighter kerning for a premium look
      const totalW = widths.reduce((a, b) => a + b, 0) + gap * (LETTERS.length - 1);
      let curX = (W - totalW) / 2;
      
      LETTERS.forEach((_, i) => {
        letterPos.push({ x: curX, cx: curX + widths[i] / 2, y: CENTER_Y, w: widths[i] });
        curX += widths[i] + gap;
      });
    };

    const drawLetter = (letter: string, pos: { x: number; cx: number; y: number }, elapsed: number, idx: number) => {
      const letterStartTime = INITIAL_DELAY + idx * LETTER_INTERVAL;
      if (elapsed < letterStartTime) return;

      // Calculate animation progress (0 to 1) over 600ms
      const progress = Math.min(1, (elapsed - letterStartTime) / 600);
      
      // Smooth ease-out cubic curve
      const ease = 1 - Math.pow(1 - progress, 3);
      
      // Slide up from 20px below
      const yOffset = 20 * (1 - ease);

      ctx.save();
      ctx.globalAlpha = progress;
      ctx.font = `bold ${FONT_SIZE}px "Cormorant Garamond", serif`;
      ctx.textBaseline = "middle";
      
      // Subtle heat glow
      ctx.shadowBlur = 20 * ease;
      ctx.shadowColor = "rgba(255, 140, 0, 0.4)"; // Amber glow

      // Premium Fire Orange to Gold gradient
      const grad = ctx.createLinearGradient(pos.x, pos.y - FONT_SIZE/2, pos.x, pos.y + FONT_SIZE/2);
      grad.addColorStop(0, "#ffd700"); // Gold top
      grad.addColorStop(0.5, "#ffb400"); // Amber middle
      grad.addColorStop(1, "#ff4500"); // Fire orange bottom

      ctx.fillStyle = grad;
      ctx.fillText(letter, pos.x, pos.y + yOffset);
      ctx.restore();
    };

    const animate = (now: number) => {
      if (startTime === -1) startTime = now;
      const elapsed = now - startTime;

      // Solid Charcoal Background
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, W, H);

      // --- DRAW: LETTERS ---
      for (let i = 0; i < LETTERS.length; i++) {
        drawLetter(LETTERS[i], letterPos[i], elapsed, i);
      }

      // --- DRAW: EXPANDING LINE & SUBTEXTS ---
      const allDoneAt = INITIAL_DELAY + LETTERS.length * LETTER_INTERVAL + 400;
      if (elapsed > allDoneAt) {
        const p = Math.min(1, (elapsed - allDoneAt) / 800);
        const easeLine = 1 - Math.pow(1 - p, 4);

        // Draw expanding amber line
        const totalWidth = letterPos[letterPos.length - 1].cx - letterPos[0].cx + letterPos[letterPos.length - 1].w;
        const lineWidth = totalWidth * easeLine;
        const lineY = CENTER_Y + FONT_SIZE * 0.6;
        
        ctx.save();
        ctx.globalAlpha = easeLine;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ffb400";
        ctx.fillStyle = "rgba(255, 180, 0, 0.6)";
        ctx.fillRect((W - lineWidth) / 2, lineY, lineWidth, 2);
        ctx.restore();

        // Draw Subtext
        ctx.save();
        ctx.globalAlpha = p;
        ctx.font = `600 ${Math.max(12, FONT_SIZE * 0.12)}px Montserrat, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffb400"; // Amber text
        ctx.letterSpacing = "8px";
        ctx.fillText("EST. 2012", W / 2, lineY + FONT_SIZE * 0.3);
        
        ctx.globalAlpha = p * 0.6;
        ctx.font = `400 ${Math.max(10, FONT_SIZE * 0.08)}px Montserrat, sans-serif`;
        ctx.letterSpacing = "6px";
        ctx.fillText("THE HEART OF KAMLA NAGAR", W / 2, lineY + FONT_SIZE * 0.55);
        ctx.restore();
      }

      // --- EXIT ---
      // Hold the fully revealed screen for a bit, then fade out
      if (elapsed > allDoneAt + 1800 && fadeOutStart === -1) fadeOutStart = elapsed;
      if (fadeOutStart !== -1) {
        const fp = Math.min(1, (elapsed - fadeOutStart) / 600);
        // Paint a black overlay fading in to hide everything
        ctx.fillStyle = `rgba(5, 5, 5, ${fp})`;
        ctx.fillRect(0, 0, W, H);
        
        if (fp >= 1 && !doneRef.current) {
          doneRef.current = true;
          setExit(true);
          setTimeout(() => onComplete(), 300); // Shorter delay for a snappy transition
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
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="fixed inset-0 z-[9999] bg-[#050505] overflow-hidden flex items-center justify-center"
        >
          <canvas ref={canvasRef} className="w-full h-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;