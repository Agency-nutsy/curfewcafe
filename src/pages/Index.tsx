import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence, useMotionTemplate } from "framer-motion";
import { Phone, ChevronDown, Calendar, Armchair, Star, MapPin, Instagram, Utensils, Music } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import heroImg from "@/assets/curfew hero.webp"; 
import img2 from "@/assets/about curfew.png";
import img3 from "@/assets/dj curfew.webp";
import img4 from "@/assets/delights.jpg";

// ── VIGNETTE BURN HERO INTRO (AQUA NEON THEME) ────────────────
const HeroVignetteBurn = ({ onComplete }: { onComplete: () => void }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    const MAX_R = Math.sqrt(W * W + H * H) / 2 * 1.15;

    const BURN_DURATION = 1900;
    const FADE_START    = 1750;
    const TOTAL         = 2400;

    const start = performance.now();
    let rafId: number;

    const animate = (now: number) => {
      const elapsed = now - start;

      if (elapsed >= TOTAL) {
        el.style.opacity = "0";
        onComplete();
        return;
      }

      const burnP  = Math.min(1, elapsed / BURN_DURATION);
      const eased  = 1 - Math.pow(1 - burnP, 2.4);
      const r      = eased * MAX_R;

      const glowP  = burnP < 0.45 ? burnP / 0.45 : 1 - ((burnP - 0.45) / 0.55);
      const g      = Math.max(0, glowP);

      const r0 = Math.max(0, r - 55);
      const r1 = Math.max(0, r - 18);
      const r2 = r + 22;
      const r3 = r + 65;
      const r4 = r + 130;

      // Deep Ocean & Neon Cyan burn effect
      el.style.background = `radial-gradient(circle at 50% 50%,
        transparent ${r0}px,
        rgba(0,255,255,${0.95 * g})  ${r1}px,
        rgba(0,150,255,${0.80 * g})  ${r2}px,
        rgba(0,50,150,${0.55 * g})   ${r3}px,
        rgba(2,8,19,1)               ${r4}px
      )`;

      if (elapsed >= FADE_START) {
        const fp = (elapsed - FADE_START) / (TOTAL - FADE_START);
        el.style.opacity = String(Math.max(0, 1 - fp));
      }

      rafId = requestAnimationFrame(animate);
    };

    el.style.background = "rgb(2,8,19)";
    el.style.opacity    = "1";
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [onComplete]);

  return (
    <div
      ref={divRef}
      className="absolute inset-0 z-[50] pointer-events-none"
      style={{ background: "rgb(2,8,19)", opacity: 1 }}
    />
  );
};

// ── MAGNETIC BUTTON ────────────────
const MagneticButton = ({ children, to, href, className }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: any) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPos({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  const innerContent = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative overflow-hidden group ${className}`}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] skew-x-[30deg] transition-all duration-700 ease-in-out group-hover:translate-x-[150%] pointer-events-none z-0" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.div>
  );

  return to ? <Link to={to} className="inline-block">{innerContent}</Link> : <a href={href} className="inline-block">{innerContent}</a>;
};

// ── UPGRADED: EMBER SPOTLIGHT CARD WITH BUBBLE TILT ────────────────
const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Tilt physics
  const xPct = useMotionValue(0);
  const yPct = useMotionValue(0);
  const mouseXSpring = useSpring(xPct, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(yPct, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    // Spotlight position
    mouseX.set(clientX - rect.left);
    mouseY.set(clientY - rect.top);
    
    // Tilt angle
    xPct.set((clientX - rect.left) / rect.width - 0.5);
    yPct.set((clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    xPct.set(0);
    yPct.set(0);
  }

  return (
    <div style={{ perspective: 1000 }} className="h-full w-full">
      <motion.div
        className={`group relative overflow-hidden ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-500 group-hover:opacity-100 z-0"
          style={{
            background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(0, 240, 255, 0.15), transparent 80%)`,
          }}
        />
        <div className="relative z-10 h-full w-full" style={{ transform: "translateZ(20px)" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

// ── NEW: TILT WRAPPER FOR EMBEDDED MAP ────────────────
const MapTiltWrapper = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="w-full max-w-sm aspect-square relative">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full relative"
      >
        {/* Invisible layer over iframe so mouse events track perfectly for the tilt */}
        <div className="absolute inset-0 z-20" />
        <div className="w-full h-full rounded-xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-colors duration-500 shadow-[0_0_30px_rgba(0,0,0,0.6)] relative z-10" style={{ transform: "translateZ(20px)" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

// ── 3D PARALLAX GLASS TILT CARD COMPONENT ────────────────
const TiltCard = ({ exp }: { exp: any }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="relative h-80 md:h-96">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="absolute inset-0 group cursor-pointer overflow-visible rounded-xl shadow-2xl border border-primary/10 hover:border-primary/40 transition-colors duration-500"
      >
        <div className="absolute inset-0 rounded-xl bg-[#020813] overflow-hidden z-10">
          <img src={exp.img} alt={exp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020813] via-[#020813]/60 to-transparent opacity-90 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 mix-blend-overlay transition-colors duration-500" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 pointer-events-none" style={{ transform: "translateZ(60px)" }}>
          <h3 className="font-serif text-2xl text-primary mb-2 drop-shadow-lg">{exp.title}</h3>
          <p className="text-foreground/90 text-sm leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 drop-shadow-md">{exp.desc}</p>
        </div>
      </motion.div>
    </div>
  );
};

// ── GLOWING KINETIC MARQUEE ────────────────
const GlowingMarquee = () => {
  return (
    <div className="relative w-full overflow-hidden py-6 bg-[#020813]/80 border-y border-primary/20 flex group z-20 shadow-[0_0_30px_rgba(0,240,255,0.15)] backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-[#020813] via-transparent to-[#020813] z-10 pointer-events-none" />
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-3xl md:text-5xl font-serif text-transparent font-bold tracking-[0.15em] mx-6 transition-all duration-500 group-hover:text-primary cursor-default" style={{ WebkitTextStroke: "1px rgba(0,240,255,0.4)" }}>
            ✦ LIVE DJ & MUSIC ✦ WOODFIRED PIZZAS ✦ CONTINENTAL CUISINE ✦ CRAFT MOCKTAILS 
          </span>
        ))}
      </div>
      <style>{`.animate-marquee { animation: marquee 25s linear infinite; } .group:hover .animate-marquee { animation-play-state: paused; }`}</style>
    </div>
  );
};

const stats = [
  { icon: Calendar, label: "Est.", end: 2019, prefix: "", isYear: true },
  { icon: Armchair, label: "Capacity", end: 120, prefix: "", suffix: "+" },
  { icon: Star, label: "Rated", end: 4.4, prefix: "", suffix: "★", isDecimal: true },
  { icon: Music, label: "Live DJ", end: 0, prefix: "", isText: true },
];

const Counter = ({ end, isDecimal, isYear, isText, suffix }: any) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started || isText) return;
    const duration = 1500;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(current);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, end, isText]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  if (isText) return <span ref={ref} className="font-serif text-3xl md:text-4xl text-primary">✓</span>;
  return (
    <span ref={ref} className="font-serif text-3xl md:text-4xl text-primary">
      {isYear ? Math.floor(count) : isDecimal ? count.toFixed(1) : Math.floor(count)}
      {suffix || ""}
    </span>
  );
};

const TypewriterText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted]     = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, 60);
    return () => clearInterval(timer);
  }, [started, text]);

  return <span ref={ref} className="inline-block">{displayed}<span className="border-r-2 border-primary ml-1 animate-pulse" /></span>;
};

const PremiumHeading = ({ title }: { title: string }) => {
  const letters = Array.from(title);
  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.1 } } };
  const child = { hidden: { opacity: 0, y: 30, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } } };
  return (
    <div className="text-center mb-16">
      <motion.h2
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="font-serif text-3xl md:text-5xl tracking-wider flex justify-center flex-wrap relative"
      >
        {letters.map((letter, index) => (
          <motion.span key={index} variants={child} className={`${letter === " " ? "w-3" : ""} inline-block`}>
            <span
              className="bg-clip-text text-transparent drop-shadow-[0_2px_18px_rgba(0,240,255,0.30)]"
              style={{
                // Swapped to Cyan/Ocean Blue gradient flow
                backgroundImage: "linear-gradient(110deg, #0055ff 0%, #00f0ff 25%, #00ffa6 50%, #00f0ff 75%, #0055ff 100%)",
                backgroundSize: "200% auto",
                animation: "emberFlow 4s linear infinite",
              }}
            >
              {letter}
            </span>
          </motion.span>
        ))}
      </motion.h2>
      <style>{`@keyframes emberFlow { to { background-position: 200% center; } }`}</style>
    </div>
  );
};

const experiences = [
  { title: "Day to Night Vibe", desc: "A cozy cafe setting by day that transforms into an electrifying party lounge as the sun goes down.", img: img2 },
  { title: "Live Music & DJ", desc: "Feel the pulse of Roop Nagar with our resident DJ and live music sessions that keep the energy high all night.", img: img3 },
  { title: "Global Culinary Delights", desc: "Indulge in crowd favorites spanning North Indian, Chinese, and Continental cuisines, paired perfectly with our craft drinks.", img: img4 },
];

const reviews = [
  { author: "Rahul S.", text: "The transition from a chill afternoon spot to a high-energy party at night is seamless! Great DJ and the Chilli Fish is an absolute must-try.", rating: 5, date: "1 week ago" },
  { author: "Neha D.", text: "Perfect place for a weekend party in Kamla Nagar. The White Sauce Pasta and mocktails were fantastic. The vibe is unmatched!", rating: 5, date: "3 weeks ago" },
  { author: "Vikram K.", text: "Awesome atmosphere, great crowd, and the music is always on point. Booked a table for my birthday and the staff made it super special.", rating: 5, date: "1 month ago" },
];

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const [isIntroComplete, setIsIntroComplete] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const bgX   = useTransform(smoothX, [-0.5, 0.5], ["-2%", "2%"]);
  const bgY   = useTransform(smoothY, [-0.5, 0.5], ["-2%", "2%"]);
  const textX = useTransform(smoothX, [-0.5, 0.5], ["20px", "-20px"]);
  const textY = useTransform(smoothY, [-0.5, 0.5], ["20px", "-20px"]);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX / window.innerWidth - 0.5);
    mouseY.set(clientY / window.innerHeight - 0.5);
  };

  return (
    <main className="relative aqua-bg text-foreground overflow-hidden">
      
      <style>{`
        @keyframes magmaBreath {
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
          animation: magmaBreath 12s ease-in-out infinite alternate;
        }
      `}</style>

      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        className="relative h-screen overflow-hidden flex items-center justify-center perspective-1000"
      >
        <AnimatePresence>
          {!isIntroComplete && (
            <HeroVignetteBurn onComplete={() => setIsIntroComplete(true)} />
          )}
        </AnimatePresence>

        <motion.div className="absolute inset-[-5%] z-0" style={{ y: heroY, x: bgX }}>
          <img src={heroImg} alt="Curfew Cafe Interior Vibe" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#020813]/70" />
        </motion.div>

        <div className="text-center px-4 relative z-10 w-full h-full flex flex-col justify-center items-center pointer-events-auto">
          <motion.div style={{ x: textX, y: textY }}>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="font-serif text-6xl sm:text-7xl md:text-9xl font-bold text-shimmer tracking-wider"
            >
              CURFEW
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-4 text-foreground/80 text-lg md:text-xl tracking-[0.25em] uppercase font-light"
            >
              <TypewriterText text="Cozy Cafe by Day. Electrifying Party by Night." />
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <MagneticButton to="/menu" className="btn-gold px-8 py-3 rounded text-sm tracking-widest uppercase font-semibold">
                Explore Menu
              </MagneticButton>
              <MagneticButton href="tel:+919310522278" className="px-8 py-3 rounded border border-primary/40 text-primary text-sm tracking-widest uppercase font-semibold hover:bg-primary/10 transition-colors bg-[#020813]/40 backdrop-blur-sm">
                <Phone className="w-4 h-4" />Call to Reserve
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/60 z-20">
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* --- KINETIC MARQUEE INCORPORATED HERE --- */}
      <GlowingMarquee />

      {/* --- WHY CURFEW CAFE --- */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionReveal><PremiumHeading title="Why Curfew Cafe?" /></SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <SpotlightCard className="bg-[#020813]/60 backdrop-blur-md border border-primary/10 rounded-xl p-6 text-center h-full hover:border-primary/30 transition-colors duration-500 shadow-lg">
                  <div className="relative z-10 flex flex-col items-center">
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.6)] transition-all duration-500" />
                    <div className="group-hover:drop-shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all duration-500">
                      <Counter {...stat} />
                    </div>
                    <p className="text-muted-foreground text-xs tracking-widest uppercase mt-3 group-hover:text-primary/80 transition-colors duration-500">{stat.label}</p>
                  </div>
                </SpotlightCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- SIGNATURE EXPERIENCES --- */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionReveal><PremiumHeading title="Signature Experiences" /></SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experiences.map((exp, i) => (
              <SectionReveal key={i} delay={i * 0.15}>
                <TiltCard exp={exp} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- GUESTS SAY --- */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionReveal><PremiumHeading title="What Our Guests Say" /></SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <SectionReveal key={i} delay={i * 0.15}>
                <SpotlightCard className="bg-[#020813]/60 backdrop-blur-md border border-primary/10 rounded-xl p-8 relative transition-all duration-500 h-full flex flex-col hover:border-primary/40 shadow-lg hover:-translate-y-2">
                  <div className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-primary/15 via-primary/5 to-transparent transition-all duration-700 ease-out group-hover:h-2/3 pointer-events-none z-0" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex gap-1 mb-6">
                      {[...Array(review.rating)].map((_, idx) => (
                        <Star key={idx} className="w-5 h-5 text-primary fill-primary group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${idx * 50}ms` }} />
                      ))}
                    </div>
                    <p className="text-foreground/80 text-sm md:text-base leading-relaxed italic mb-8 flex-grow group-hover:text-foreground transition-colors duration-300">"{review.text}"</p>
                    <div className="flex items-center justify-between border-t border-primary/10 pt-6 mt-auto relative">
                      <div className="absolute top-[-1px] left-0 w-0 h-[1px] bg-primary transition-all duration-700 group-hover:w-full shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                      <span className="font-serif text-primary text-lg tracking-wide">{review.author}</span>
                      <span className="text-xs text-muted-foreground uppercase tracking-widest">{review.date}</span>
                    </div>
                  </div>
                </SpotlightCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- FIND US --- */}
      <section className="py-24 px-4 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionReveal><PremiumHeading title="Find Us" /></SectionReveal>
          <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
            <SectionReveal delay={0.1} className="w-full md:w-1/2 flex justify-center md:justify-end">
              
              {/* UPGRADED TILT WRAPPER FOR MAP */}
              <MapTiltWrapper>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.2487199673637!2d77.1990793!3d28.682205600000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfdcf48abc91b%3A0xd488d08133d3868b!2sCurfew%20Cafe!5e0!3m2!1sen!2sin!4v1774374805483!5m2!1sen!2sin"
                  className="w-full h-full"
                  style={{ border: 0, filter: "grayscale(1) contrast(1.2)" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Curfew Cafe Location"
                />
              </MapTiltWrapper>

            </SectionReveal>
            <SectionReveal delay={0.2} className="w-full md:w-1/2 flex flex-col gap-8 justify-center items-center md:items-start text-foreground/80">
              <a href="https://www.google.com/maps/place/curfew+cafe/data=!4m2!3m1!1s0x390cfdcf48abc91b:0xd488d08133d3868b?sa=X&ved=1t:242&ictx=111" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 hover:text-primary transition-colors duration-300 group text-left">
                <MapPin className="w-6 h-6 text-primary mt-1 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                <div>
                  <h3 className="font-serif text-xl text-primary mb-2">Location</h3>
                  <p className="max-w-xs leading-relaxed">
                    Curfew Cafe<br />
                    2/10, Block 2, Roop Nagar,<br />
                    Delhi – 110007
                  </p>
                </div>
              </a>
              <a href="tel:+919310522278" className="flex items-center gap-4 hover:text-primary transition-colors duration-300 group">
                <Phone className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                <div>
                  <h3 className="font-serif text-xl text-primary mb-1">Reservations</h3>
                  <p className="tracking-widest">+91 93105 22278</p>
                </div>
              </a>
              <a href="https://www.instagram.com/cafecurfew/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-primary transition-colors duration-300 group">
                <Instagram className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                <div>
                  <h3 className="font-serif text-xl text-primary mb-1">Follow Us</h3>
                  <p className="tracking-widest">@curfewcafe</p>
                </div>
              </a>
            </SectionReveal>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Index;