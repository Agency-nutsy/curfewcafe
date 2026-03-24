import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

// Keep your existing image imports
import img1 from "@/assets/labib hero.webp"; 
import img2 from "@/assets/labib hero.webp";
import img3 from "@/assets/labib hero.webp";
import img4 from "@/assets/labib hero.webp";
import img5 from "@/assets/labib hero.webp";
import img6 from "@/assets/labib hero.webp";
import img7 from "@/assets/labib hero.webp";
import img8 from "@/assets/labib hero.webp";
import img9 from "@/assets/labib hero.webp";
import img10 from "@/assets/labib hero.webp";

const allImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

// --- 1. THE AMBER EMBER SHATTER EFFECT ---
const AmberEmberShatter = ({ isAnimating }: { isAnimating: boolean }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 1200, 
      y: (Math.random() - 0.5) * 800,  
      size: Math.random() * 4 + 2,
      delay: Math.random() * 0.3,
      duration: 1 + Math.random() * 0.8,
    }));
  }, []);

  return (
    <AnimatePresence>
      {isAnimating && (
        <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0, filter: "blur(4px)" }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 2, 0.5],
                x: p.x,
                y: p.y,
                filter: ["blur(4px)", "blur(0px)", "blur(2px)"]
              }}
              transition={{
                duration: p.duration,
                ease: [0.16, 1, 0.3, 1], 
                delay: p.delay
              }}
              className="absolute rounded-full bg-[#ffb400]"
              style={{
                width: p.size,
                height: p.size,
                boxShadow: "0 0 15px rgba(255,180,0,1)",
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

// --- 2. LABIB'S CHRONICLE CAROUSEL ---
const LabibsChronicleCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const featuredImages = useMemo(() => {
    return [allImages[0], allImages[4], allImages[8], allImages[6], allImages[9]];
  }, []);

  const changeImage = useCallback((newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => setCurrentIndex(newIndex), 300);
    setTimeout(() => setIsAnimating(false), 1500);
  }, [isAnimating]);

  const navigate = (dir: number) => {
    const nextIndex = (currentIndex + dir + featuredImages.length) % featuredImages.length;
    changeImage(nextIndex);
  };

  useEffect(() => {
    if (!isInView || isAnimating) return;
    const interval = setInterval(() => navigate(1), 7000); 
    return () => clearInterval(interval);
  }, [isInView, isAnimating, navigate]);

  return (
    <div ref={containerRef} className="relative w-full h-[80vh] overflow-hidden group">
      <AmberEmberShatter isAnimating={isAnimating} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, filter: "blur(15px)", scale: 1.1 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(15px)", scale: 1.05 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} 
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={featuredImages[currentIndex]}
            alt={`Labib's Moment ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Synced Charcoal Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/40 to-[#050505]" />
          <div className="absolute inset-0 bg-[#ffb400]/5 mix-blend-color-dodge pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-30 flex items-center justify-center p-8 pointer-events-none">
        <div className="text-center">
          <SectionReveal>
            <div className="w-16 h-[1px] bg-[#ffb400] mx-auto mb-10 shadow-[0_0_15px_#ffb400]" />
            <blockquote className="font-serif text-3xl md:text-5xl lg:text-6xl text-white tracking-widest leading-relaxed drop-shadow-2xl max-w-5xl mx-auto select-none">
              The Art of the <span className="text-[#ffb400] italic">Grill.</span><br/>
              The Heart of <span className="text-[#ffb400] font-bold">Kamla Nagar.</span>
            </blockquote>
            <p className="text-white/40 text-[10px] md:text-xs tracking-[0.5em] uppercase mt-12">
               The Labib's Chronicles
            </p>
          </SectionReveal>
        </div>
      </div>

      {/* Nav Controls */}
      <div className="absolute inset-0 z-50 flex items-center justify-between px-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <button
          onClick={(e) => { e.stopPropagation(); navigate(-1); }}
          className="pointer-events-auto p-4 rounded-full bg-[#050505]/40 text-[#ffb400] border border-[#ffb400]/20 backdrop-blur-sm hover:bg-[#ffb400] hover:text-[#050505] transition-all"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); navigate(1); }}
          className="pointer-events-auto p-4 rounded-full bg-[#050505]/40 text-[#ffb400] border border-[#ffb400]/20 backdrop-blur-sm hover:bg-[#ffb400] hover:text-[#050505] transition-all"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex gap-4">
        {featuredImages.map((_, i) => (
          <button key={i} onClick={() => changeImage(i)} className="p-1 group">
            <div className={`h-[1px] rounded-full transition-all duration-500 ${
              i === currentIndex ? "w-10 bg-[#ffb400] shadow-[0_0_10px_#ffb400]" : "w-4 bg-[#ffb400]/30 group-hover:bg-[#ffb400]/70"
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
};


const Gallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const navigateLightbox = useCallback((dir: number) => {
    if (lightbox === null) return;
    setLightbox((prev) => (prev === null ? null : (prev + dir + allImages.length) % allImages.length));
  }, [lightbox]);

  // Keybindings for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") navigateLightbox(1);
      if (e.key === "ArrowLeft") navigateLightbox(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox, navigateLightbox]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "unset";
  }, [lightbox]);

  return (
    <main className="pt-32 relative labibs-main text-white min-h-screen overflow-hidden">
      
      {/* GLOBAL LABIB'S BACKGROUND ANIMATION */}
      <style>{`
        @keyframes sizzleGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 50% 100%; }
        }
        .labibs-main {
          background-color: #050505;
          background-image: 
            radial-gradient(circle at 15% 50%, rgba(255, 140, 0, 0.08), transparent 50%),
            radial-gradient(circle at 85% 30%, rgba(255, 215, 0, 0.05), transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(255, 180, 0, 0.06), transparent 60%);
          background-attachment: fixed;
          background-size: 150% 150%;
          animation: sizzleGlow 12s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Header */}
      <section className="px-4 text-center mb-16 relative z-10">
        <SectionReveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-[#ffb400] mb-4 drop-shadow-[0_0_20px_rgba(255,180,0,0.3)]">
              THE GALLERY
            </h1>
            <p className="text-white/50 text-xs md:text-sm tracking-[0.5em] uppercase">
              Flavors Captured in Amber Glow.
            </p>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#ffb400] to-transparent mx-auto mt-8" />
          </motion.div>
        </SectionReveal>
      </section>

      {/* Masonry Grid */}
      <section className="px-4 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {allImages.map((src, i) => (
            <SectionReveal key={i} delay={(i % 3) * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative overflow-hidden rounded-xl break-inside-avoid cursor-pointer bg-[#050505]/50 border border-white/5 shadow-lg"
                onClick={() => setLightbox(i)}
              >
                <img
                  src={src}
                  alt={`Labib's Food Moment ${i + 1}`}
                  className="w-full object-cover transition-all duration-700 ease-out grayscale-[0.5] brightness-[0.6] group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 border-2 border-[#ffb400]/0 group-hover:border-[#ffb400]/40 transition-colors duration-500 rounded-xl z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Carousel Section */}
      <section className="w-full mt-12 border-t border-white/5">
          <LabibsChronicleCarousel />
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-2xl flex flex-col items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
              <span className="font-serif text-[#ffb400] tracking-[0.3em] text-xs uppercase opacity-70">
                Labib's Heritage Archives
              </span>
              <button onClick={() => setLightbox(null)} className="text-white/50 hover:text-[#ffb400] transition-all p-2 hover:rotate-90">
                <X className="w-8 h-8" />
              </button>
            </div>

            <button onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }} className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/20 hover:text-[#ffb400] transition-all z-50">
              <ChevronLeft className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }} className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/20 hover:text-[#ffb400] transition-all z-50">
              <ChevronRight className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1} />
            </button>

            <div className="relative w-full max-w-5xl h-full flex items-center justify-center p-4 md:p-12">
              <motion.img
                key={lightbox}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={allImages[lightbox]}
                className="max-w-full max-h-[80vh] object-contain rounded-sm shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
              <span className="font-serif text-[#ffb400] tracking-[0.4em] text-sm flex items-center gap-3">
                {String(lightbox + 1).padStart(2, '0')}
                <span className="w-8 h-[1px] bg-[#ffb400]/30" />
                {String(allImages.length).padStart(2, '0')}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default Gallery;