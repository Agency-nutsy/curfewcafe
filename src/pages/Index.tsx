import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence, useMotionTemplate } from "framer-motion";
import { Phone, ChevronDown, Clock, Utensils, Star, MapPin, Instagram, ShoppingBag, Flame } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

// Updated Asset Paths (Update these with your actual Labib's images)
import heroImg from "@/assets/labib hero.webp"; 
import imgRolls from "@/assets/labib hero.webp";
import imgMomos from "@/assets/labib hero.webp";
import imgAmbience from "@/assets/labib hero.webp";

// ── MAGNETIC BUTTON ────────────────
const MagneticButton = ({ children, to, href, className }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: any) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    setPos({ x: (clientX - (left + width / 2)) * 0.3, y: (clientY - (top + height / 2)) * 0.3 });
  };

  const innerContent = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative overflow-hidden group ${className}`}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-[30deg] transition-all duration-700 ease-in-out group-hover:translate-x-[150%] pointer-events-none z-0" />
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.div>
  );

  return to ? <Link to={to} className="inline-block">{innerContent}</Link> : <a href={href} className="inline-block" target="_blank" rel="noopener noreferrer">{innerContent}</a>;
};

// ── UPGRADED: SPOTLIGHT CARD (AMBER GLOW) ────────────────
const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const xPct = useMotionValue(0);
  const yPct = useMotionValue(0);
  const mouseXSpring = useSpring(xPct, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(yPct, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    xPct.set((e.clientX - rect.left) / rect.width - 0.5);
    yPct.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <div style={{ perspective: 1000 }} className="h-full w-full">
      <motion.div
        className={`group relative overflow-hidden ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { xPct.set(0); yPct.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-500 group-hover:opacity-100 z-0"
          style={{
            background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(255, 180, 0, 0.15), transparent 80%)`,
          }}
        />
        <div className="relative z-10 h-full w-full" style={{ transform: "translateZ(20px)" }}>{children}</div>
      </motion.div>
    </div>
  );
};

// ── TILT WRAPPER FOR EMBEDDED MAP ────────────────
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

  return (
    <div style={{ perspective: 1000 }} className="w-full max-w-sm aspect-square relative">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        className="w-full h-full relative"
      >
        <div className="absolute inset-0 z-20" />
        <div className="w-full h-full rounded-xl overflow-hidden border border-[#ffb400]/20 hover:border-[#ffb400]/50 transition-colors duration-500 shadow-[0_0_30px_rgba(0,0,0,0.6)] relative z-10" style={{ transform: "translateZ(20px)" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

// ── 3D PARALLAX GLASS TILT CARD ────────────────
const TiltCard = ({ exp }: { exp: any }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div style={{ perspective: 1000 }} className="relative h-80 md:h-96">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        className="absolute inset-0 group cursor-pointer overflow-visible rounded-xl shadow-2xl border border-[#ffb400]/10 hover:border-[#ffb400]/40 transition-colors duration-500"
      >
        <div className="absolute inset-0 rounded-xl bg-[#0a0a0a] overflow-hidden z-10">
          <img src={exp.img} alt={exp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-90" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 pointer-events-none" style={{ transform: "translateZ(60px)" }}>
          <h3 className="font-serif text-2xl text-[#ffb400] mb-2 drop-shadow-lg">{exp.title}</h3>
          <p className="text-foreground/90 text-sm leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">{exp.desc}</p>
        </div>
      </motion.div>
    </div>
  );
};

// ── GLOWING KINETIC MARQUEE ────────────────
const GlowingMarquee = () => {
  return (
    <div className="relative w-full overflow-hidden py-6 bg-[#0a0a0a] border-y border-[#ffb400]/20 flex group z-20 shadow-[0_0_30px_rgba(255,180,0,0.1)] backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10 pointer-events-none" />
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-3xl md:text-5xl font-serif text-transparent font-bold tracking-[0.15em] mx-6 transition-all duration-500 group-hover:text-[#ffb400] cursor-default" style={{ WebkitTextStroke: "1px rgba(255,180,0,0.4)" }}>
            ✦ ICONIC ROLLS ✦ JUICY BURGERS ✦ TIKKA PLATTER ✦ SHAWARMA SPECIALS ✦ CHINESE WOK ✦ 
          </span>
        ))}
      </div>
      <style>{`.animate-marquee { animation: marquee 25s linear infinite; } .group:hover .animate-marquee { animation-play-state: paused; }`}</style>
    </div>
  );
};

const stats = [
  { icon: Clock, label: "Daily Hours", end: 10, prefix: "", suffix: "AM-10PM", isText: true },
  { icon: Utensils, label: "Menu Items", end: 60, prefix: "", suffix: "+" },
  { icon: Star, label: "Foodie Rating", end: 4.2, prefix: "", suffix: "★", isDecimal: true },
  { icon: Flame, label: "Est.", end: 2012, prefix: "", isYear: true },
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

  if (isText) return <span ref={ref} className="font-serif text-2xl md:text-3xl text-[#ffb400]">{suffix}</span>;
  return (
    <span ref={ref} className="font-serif text-3xl md:text-4xl text-[#ffb400]">
      {isYear ? Math.floor(count) : isDecimal ? count.toFixed(1) : Math.floor(count)}
      {suffix && !isText ? suffix : ""}
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

  return <span ref={ref} className="inline-block">{displayed}<span className="border-r-2 border-[#ffb400] ml-1 animate-pulse" /></span>;
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
              className="bg-clip-text text-transparent drop-shadow-[0_2px_18px_rgba(255,180,0,0.30)]"
              style={{
                backgroundImage: "linear-gradient(110deg, #ff8c00 0%, #ffb400 50%, #ffd700 100%)",
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
  { title: "The Shawarma King", desc: "Tender, marinated chicken grilled to perfection, wrapped in soft rumali bread.", img: imgRolls },
  { title: "Kurkure Crunch", desc: "Our signature Kurkure Momos and Rolls offer that perfect snap and explosion of spices.", img: imgMomos },
  { title: "Iconic Hangout", desc: "Budget-friendly, delicious meals served in the heart of Kamla Nagar.", img: imgAmbience },
];

const reviews = [
  { author: "Arjun M.", text: "Labib's is a classic! The Chicken Mughlai Roll is my go-to every time I'm in North Campus.", rating: 5, date: "2 days ago" },
  { author: "Sanya V.", text: "The variety of rolls here is insane. Tried the Paneer Cheesy Roll and it was so delicious!", rating: 4, date: "1 week ago" },
  { author: "Rohan P.", text: "Fast service even when it's crowded. Don't miss their Honey Chilly Potato—it's surprisingly good.", rating: 5, date: "2 weeks ago" },
];

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const [isIntroComplete, setIsIntroComplete] = useState(true); // Ensuring instant load without Vignette component

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const bgX   = useTransform(smoothX, [-0.5, 0.5], ["-2%", "2%"]);
  const bgY   = useTransform(smoothY, [-0.5, 0.5], ["-2%", "2%"]);
  const textX = useTransform(smoothX, [-0.5, 0.5], ["20px", "-20px"]);
  const textY = useTransform(smoothY, [-0.5, 0.5], ["20px", "-20px"]);

  return (
    <main className="relative labibs-main text-foreground overflow-hidden">
      
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
        .btn-labibs {
          background: linear-gradient(135deg, #ff8c00, #ffb400);
          color: white;
          border: none;
          box-shadow: 0 4px 15px rgba(255, 140, 0, 0.3);
        }
      `}</style>

      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        onMouseMove={(e) => {
          mouseX.set(e.clientX / window.innerWidth - 0.5);
          mouseY.set(e.clientY / window.innerHeight - 0.5);
        }}
        className="relative h-screen overflow-hidden flex items-center justify-center perspective-1000"
      >

        <motion.div className="absolute inset-[-5%] z-0" style={{ y: heroY, x: bgX }}>
          <img src={heroImg} alt="Labib's Background" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#050505]" />
        </motion.div>

        <div className="text-center px-4 relative z-10 w-full h-full flex flex-col justify-center items-center">
          <motion.div style={{ x: textX, y: textY }}>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="font-serif text-7xl sm:text-8xl md:text-[10rem] font-bold tracking-tighter"
              style={{ color: "#ffb400", textShadow: "0 0 30px rgba(255, 180, 0, 0.4)" }}
            >
              LABIB'S
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-4 text-white/70 text-lg md:text-xl tracking-[0.3em] uppercase font-light"
            >
              <TypewriterText text="Legendary Rolls. Iconic Taste. Kamla Nagar." />
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <MagneticButton to="/menu" className="btn-labibs px-10 py-4 rounded-full text-xs tracking-widest uppercase font-bold">
                View Full Menu
              </MagneticButton>
              <MagneticButton href="https://www.zomato.com/ncr/labibs-kamla-nagar-new-delhi" className="px-10 py-4 rounded-full border border-white/20 text-white text-xs tracking-widest uppercase font-semibold hover:bg-white/10 backdrop-blur-md">
                <ShoppingBag className="w-4 h-4" />Order Online
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#ffb400]/40">
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      <GlowingMarquee />

      {/* --- STATS --- */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionReveal><PremiumHeading title="The Labib's Edge" /></SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <SpotlightCard className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center h-full hover:border-[#ffb400]/30 transition-colors">
                  <div className="relative z-10 flex flex-col items-center">
                    <stat.icon className="w-8 h-8 text-[#ffb400] mx-auto mb-4 group-hover:scale-110 transition-all duration-500" />
                    <Counter {...stat} />
                    <p className="text-muted-foreground text-[10px] tracking-widest uppercase mt-3">{stat.label}</p>
                  </div>
                </SpotlightCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- SIGNATURE DELIGHTS --- */}
      <section className="py-24 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <SectionReveal><PremiumHeading title="Signature Delights" /></SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experiences.map((exp, i) => (
              <SectionReveal key={i} delay={i * 0.15}>
                <TiltCard exp={exp} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- REVIEWS --- */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionReveal><PremiumHeading title="What Our Foodies Say" /></SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <SectionReveal key={i} delay={i * 0.15}>
                <SpotlightCard className="bg-white/5 border border-white/10 rounded-xl p-8 h-full flex flex-col hover:border-[#ffb400]/40 shadow-lg">
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="w-5 h-5 text-[#ffb400] fill-[#ffb400]" />
                    ))}
                  </div>
                  <p className="text-foreground/80 text-sm md:text-base leading-relaxed italic mb-8 flex-grow">"{review.text}"</p>
                  <div className="flex items-center justify-between border-t border-white/10 pt-6">
                    <span className="font-serif text-[#ffb400] text-lg tracking-wide">{review.author}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{review.date}</span>
                  </div>
                </SpotlightCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- FIND US --- */}
      <section className="py-24 px-4 border-t border-transparent bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <SectionReveal><PremiumHeading title="Visit Us" /></SectionReveal>
          <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
            <SectionReveal delay={0.1} className="w-full md:w-1/2 flex justify-center md:justify-end">
              <MapTiltWrapper>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.292963385546!2d77.2049274117714!3d28.680881775536882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd9016721677%3A0x1c04ec2ccf795d5d!2sLABIB%E2%80%99s%20Kamla%20Nagar%20(best%20restaurant%20in%20north%20campus)!5e0!3m2!1sen!2sin!4v1774379666734!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  className="w-full h-full"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(1.1)" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </MapTiltWrapper>
            </SectionReveal>
            <SectionReveal delay={0.2} className="w-full md:w-1/2 flex flex-col gap-8 items-center md:items-start text-foreground/80">
              <a href="https://www.google.com/maps/place/LABIB%E2%80%99s+Kamla+Nagar+(best+restaurant+in+north+campus)/@28.6808818,77.2049274,17z/data=!3m1!4b1!4m6!3m5!1s0x390cfd9016721677:0x1c04ec2ccf795d5d!8m2!3d28.6808818!4d77.2075077!16s%2Fg%2F11c2kxdd05?entry=ttu&g_ep=EgoyMDI2MDMyMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group hover:text-[#ffb400] transition-colors">
                <MapPin className="w-6 h-6 text-[#ffb400] mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-serif text-xl text-[#ffb400] mb-2">Location</h3>
                  <p className="max-w-xs leading-relaxed text-sm">LABIB'S, 35, Block UB, Kamla Nagar, Delhi – 110007</p>
                </div>
              </a>
              <div className="flex items-center gap-4 group">
                <Clock className="w-6 h-6 text-[#ffb400] group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-serif text-xl text-[#ffb400] mb-1 text-sm">Open Daily</h3>
                  <p className="tracking-widest text-sm">10:30 AM – 10:30 PM</p>
                </div>
              </div>
              <a href="https://www.instagram.com/labibs_india/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group hover:text-[#ffb400] transition-colors">
                <Instagram className="w-6 h-6 text-[#ffb400] group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-serif text-xl text-[#ffb400] mb-1 text-sm">Instagram</h3>
                  <p className="tracking-widest text-sm">@labibs_india</p>
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