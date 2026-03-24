import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role='button'], input, textarea, select, [data-clickable]")) {
        setHovering(true);
      }
    };
    const out = () => setHovering(false);
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    document.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Central Spark (Dot) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full z-[10000] pointer-events-none"
        style={{ backgroundColor: "#ffb400" }} // Hardcoded Labib Amber
        animate={{ 
          x: pos.x - 4, 
          y: pos.y - 4, 
          scale: hovering ? 1.5 : 1,
          boxShadow: hovering ? "0 0 15px #ffb400" : "0 0 0px transparent"
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      
      {/* Outer Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border z-[10000] pointer-events-none"
        animate={{
          x: pos.x - 16,
          y: pos.y - 16,
          scale: hovering ? 1.8 : 1,
          // Shifted HSL to Toasted Amber (approx 38-45 range)
          borderColor: hovering ? "hsla(38, 100%, 50%, 0.8)" : "hsla(38, 100%, 50%, 0.2)",
          backgroundColor: hovering ? "hsla(38, 100%, 50%, 0.05)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
    </>
  );
};

export default CustomCursor;