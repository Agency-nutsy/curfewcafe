import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingBubbles = () => {
  const [bubbles, setBubbles] = useState<any[]>([]);

  useEffect(() => {
    // Generate 40 tiny bubbles spread randomly across the screen
    const newBubbles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // Random horizontal position (vw)
      top: Math.random() * 100,  // Random vertical position (vh)
      size: Math.random() * 6 + 4, // Very small: between 4px and 10px
      delay: Math.random() * 3, // Stagger the pops
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full border border-[#00f0ff]/50 bg-[#00f0ff]/20"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}vw`,
            top: `${bubble.top}vh`,
            boxShadow: "0 0 5px rgba(0, 240, 255, 0.4)", // Ambient neon aqua glow
          }}
          animate={{
            y: [0, -40], // Float up a tiny bit
            scale: [0, 1, 1.2, 1.5], // Appear, hold, expand slightly, then POP!
            opacity: [0, 0.8, 0.8, 0], // Fade in, hold, vanish
          }}
          transition={{
            duration: 3, // Exactly 3 seconds before bursting
            repeat: Infinity,
            ease: "easeOut",
            delay: bubble.delay,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBubbles;