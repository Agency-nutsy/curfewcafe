import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import img1 from "@/assets/736 ad hero.png";
import img2 from "@/assets/litup cafe 2.png";
import img3 from "@/assets/litup cafe 3.png";
import img4 from "@/assets/litup cafe 4.png";
import img5 from "@/assets/litup cafe 5.png";
import img6 from "@/assets/restaurant-6.webp";
import img7 from "@/assets/restaurant-7.webp";
import img8 from "@/assets/restaurant-8.webp";
import img9 from "@/assets/restaurant-9.webp";
import img10 from "@/assets/restaurant-10.webp";

// Combined image array
const allImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

// --- THE AQUA BUBBLE REVEAL EFFECT ---
const AquaBubbleShatter = ({ isAnimating }: { isAnimating: boolean }) => {
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
              initial={{
                opacity: 0,
                scale: 0,
                x: 0,
                y: 0,
                filter: "blur(4px)"
              }}
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
              // Glowing Neon Cyan
              className="absolute rounded-full bg-primary"
              style={{
                width: p.size,
                height: p.size,
                boxShadow: "0 0 15px rgba(0,240,255,1)",
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

// --- IMMERSIVE AQUA REVEAL CAROUSEL ---
const AquaChronicleCarousel = () => {
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
    setTimeout(() => {
      setCurrentIndex(newIndex);
    }, 300);
    setTimeout(() => setIsAnimating(false), 1500);
  }, [isAnimating]);

  const navigate = (dir: number) => {
    const nextIndex = (currentIndex + dir + featuredImages.length) % featuredImages.length;
    changeImage(nextIndex);
  };

  useEffect(() => {
    if (!isInView || isAnimating) return;
    const interval = setInterval(() => {
      navigate(1);
    }, 7000); 
    return () => clearInterval(interval);
  }, [isInView, isAnimating, navigate]);

  return (
    <div ref={containerRef} className="relative w-full h-[80vh] overflow-hidden group">
      <AquaBubbleShatter isAnimating={isAnimating} />

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
            alt={`Featured Curfew Moment ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Deep Navy atmospheric overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020813] via-[#020813]/30 to-[#020813]" />
          <div className="absolute inset-0 bg-primary/5 mix-blend-color-dodge pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-30 flex items-center justify-center p-8 pointer-events-none">
        <div className="text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
                <div className="w-16 h-[1px] bg-primary mx-auto mb-10 shadow-[0_0_15px_rgba(0,240,255,1)]" />
                <blockquote className="font-serif text-3xl md:text-5xl lg:text-6xl text-white tracking-widest leading-relaxed drop-shadow-2xl max-w-5xl mx-auto select-none">
                    Chasing <span className="text-primary italic">Light.</span><br/>
                    Defying <span className="text-primary font-bold">Curfew.</span>
                </blockquote>
                <p className="text-muted-foreground text-[10px] md:text-xs tracking-[0.5em] uppercase mt-12">
                   The Curfew Chronicles
                </p>
            </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 z-50 flex items-center justify-between px-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <button
          onClick={(e) => { e.stopPropagation(); navigate(-1); }}
          className="pointer-events-auto p-4 rounded-full bg-[#020813]/40 text-primary border border-primary/20 backdrop-blur-sm hover:bg-primary hover:text-[#020813] hover:border-primary transition-all duration-300 transform -translate-x-4 group-hover:translate-x-0"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); navigate(1); }}
          className="pointer-events-auto p-4 rounded-full bg-[#020813]/40 text-primary border border-primary/20 backdrop-blur-sm hover:bg-primary hover:text-[#020813] hover:border-primary transition-all duration-300 transform translate-x-4 group-hover:translate-x-0"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex gap-4">
        {featuredImages.map((_, i) => (
          <button
            key={i}
            onClick={() => changeImage(i)}
            className="p-1 group"
          >
            <div className={`h-[1px] rounded-full transition-all duration-500 ${
              i === currentIndex
                ? "w-10 bg-primary shadow-[0_0_10px_rgba(0,240,255,1)]"
                : "w-4 bg-primary/30 group-hover:bg-primary/70"
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
};


const Gallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const navigateLightbox = useCallback(
    (dir: number) => {
      if (lightbox === null) return;
      setLightbox((prev) => {
        if (prev === null) return null;
        return (prev + dir + allImages.length) % allImages.length;
      });
    },
    [lightbox]
  );

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
    if (lightbox !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [lightbox]);

  return (
    <main className="pt-32 relative aqua-bg text-foreground min-h-screen overflow-hidden">
      
      <style>{`
        @keyframes aquaBreath {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 50% 100%; }
        }
        .aqua-bg {
          background-color: #020813;
          background-image: 
            radial-gradient(circle at 15% 50%, rgba(0, 240, 255, 0.12), transparent 50%),
            radial-gradient(circle at 85% 30%, rgba(0, 85, 255, 0.1), transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(0, 200, 200, 0.15), transparent 60%);
          background-attachment: fixed;
          background-size: 150% 150%;
          animation: aquaBreath 12s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <section className="px-4 text-center mb-16 relative z-10">
        <SectionReveal>
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary tracking-[0.15em] mb-4 drop-shadow-[0_0_10px_rgba(0,240,255,0.2)]">
              THE GALLERY
            </h1>
            <p className="text-muted-foreground text-xs md:text-sm tracking-[0.4em] uppercase">
              Moments Frozen in Cyan.
            </p>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8" />
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
                className="group relative overflow-hidden rounded-xl break-inside-avoid cursor-pointer bg-[#020813]/50 border border-white/5 shadow-lg"
                onClick={() => setLightbox(i)}
              >
                <img
                  src={src}
                  alt={`Curfew Cafe gallery ${i + 1}`}
                  className="w-full object-cover transition-all duration-700 ease-out grayscale-[0.6] brightness-[0.6] contrast-[1.2] group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-110"
                  loading="lazy"
                />
                
                {/* Interactive Cyan Border & Overlay */}
                <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-500 rounded-xl z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020813]/80 via-transparent to-transparent opacity-50 group-hover:opacity-0 transition-opacity duration-500" />
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* EPIC END-OF-PAGE FEATURE */}
      <section className="w-full mt-12 border-t border-primary/10">
          <AquaChronicleCarousel />
      </section>

      {/* PREMIUM LIGHTBOX */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#020813]/95 backdrop-blur-2xl flex flex-col items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            {/* Top Bar with Close Button */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
              <span className="font-serif text-primary tracking-[0.3em] text-xs uppercase opacity-70">
                Curfew Cafe Archives
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
                className="text-white/50 hover:text-primary transition-colors duration-300 p-2 hover:rotate-90 transform"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/30 hover:text-primary transition-colors duration-300 p-4 z-50 hover:-translate-x-2 transform"
            >
              <ChevronLeft className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/30 hover:text-primary transition-colors duration-300 p-4 z-50 hover:translate-x-2 transform"
            >
              <ChevronRight className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1} />
            </button>

            {/* The Image */}
            <div className="relative w-full max-w-6xl h-full flex items-center justify-center p-4 md:p-12">
              <motion.img
                key={lightbox}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                src={allImages[lightbox]}
                alt={`Curfew Cafe Gallery ${lightbox + 1}`}
                className="max-w-full max-h-full object-contain rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Bottom Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
              <span className="font-serif text-primary tracking-[0.4em] text-sm flex items-center gap-3">
                {String(lightbox + 1).padStart(2, '0')}
                <span className="w-8 h-[1px] bg-primary/40" />
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