import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from "framer-motion";
import { Utensils, Sparkles, Users, MapPin, Clock, Flame, Award, Heart } from "lucide-react";
import { MouseEvent } from "react";
import SectionReveal from "@/components/SectionReveal";

// Assets - Update these to your actual Labib's photos
import imgHero from "@/assets/labib hero.webp"; 
import imgLegacy from "@/assets/labib hero.webp";

const pillars = [
  { icon: Flame, title: "The Sizzle", desc: "Our legendary grills are fueled by a passion for perfection, creating the smoky, charred flavor that defines every Labib's roll." },
  { icon: Award, title: "The Secret", desc: "It's in the sauce. A proprietary blend of spices and our signature creamy garlic dip that hasn't changed since day one." },
  { icon: Users, title: "The Legend", desc: "More than a food joint, we are a North Campus rite of passage. For over a decade, we've been the fuel for Delhi University's brightest." },
];

// --- 1. THE AMBER GLOW SCROLL TEXT ---
const AmberGlowText = ({ children }: { children: string }) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 85%", "end 60%"]
  });

  const words = children.split(" ");
  
  return (
    <p ref={textRef} className="text-xl md:text-2xl font-light leading-relaxed mb-10 flex flex-wrap gap-x-[0.3em]">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]); 
        const color = useTransform(scrollYProgress, [start, end], ["#2a1a00", "#ffb400"]); // Toasted Brown to Bright Amber
        
        return (
          <motion.span key={i} style={{ opacity, color }} className="transition-colors duration-300">
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};

// --- 2. LIQUID AMBER TRACING CARDS ---
const NeonCard = ({ pillar, delay }: { pillar: any; delay: number }) => {
  return (
    <SectionReveal delay={delay}>
      <div className="group relative p-10 bg-[#050505]/60 backdrop-blur-md hover:bg-[#050505]/90 transition-all duration-700 rounded-xl overflow-hidden h-full flex flex-col items-center text-center shadow-lg hover:-translate-y-2 cursor-pointer border border-white/5">
        
        {/* The Liquid Amber SVG Border */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-xl" xmlns="http://www.w3.org/2000/svg">
          <rect 
            x="0" y="0" width="100%" height="100%" rx="12" ry="12" 
            fill="none" stroke="rgba(255, 180, 0, 0.8)" strokeWidth="3"
            strokeDasharray="0 2000" 
            strokeDashoffset="0"
            className="transition-all duration-700 ease-in-out group-hover:stroke-dasharray-[2000_0] shadow-[0_0_15px_rgba(255,180,0,1)]"
          />
        </svg>

        <div className="absolute inset-0 bg-gradient-to-b from-[#ffb400]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative z-10 flex flex-col items-center">
          <pillar.icon className="w-10 h-10 text-[#ffb400] mb-6 group-hover:scale-125 transition-transform duration-500 drop-shadow-[0_0_8px_rgba(255,180,0,0.4)]" />
          <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-[#ffb400] transition-colors duration-300 tracking-wide">{pillar.title}</h3>
          <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
            {pillar.desc}
          </p>
        </div>
      </div>
    </SectionReveal>
  );
};

// --- THE SCROLL-LINKED HOURGLASS (AMBER THEME) ---
const ScrollHourglass = ({ progress }: { progress: any }) => {
  const topSandHeight = useTransform(progress, [0, 1], ["100%", "0%"]);
  const bottomSandHeight = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative w-12 h-20 flex flex-col items-center justify-between opacity-80 mt-2">
      <svg viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="1" className="absolute inset-0 w-full h-full text-[#ffb400]/30 z-20">
        <path d="M2 2 H22 M2 38 H22 M4 2 L12 18 L20 2 M4 38 L12 22 L20 38" />
      </svg>
      <div className="relative w-[16px] h-[16px] mt-[2px] overflow-hidden rounded-t-[2px]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}>
        <motion.div
          className="absolute bottom-0 w-full bg-[#ffb400] shadow-[0_0_10px_rgba(255,180,0,1)]"
          style={{ height: topSandHeight }}
        />
      </div>
      <motion.div
        className="w-[1px] h-full bg-[#ffb400]/60 absolute top-1/2 -translate-y-1/2 z-10"
        style={{ opacity: useTransform(progress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]) }}
      />
      <div className="relative w-[16px] h-[16px] mb-[2px] overflow-hidden rounded-b-[2px]" style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }}>
        <motion.div
          className="absolute bottom-0 w-full bg-[#ffb400] shadow-[0_0_10px_rgba(255,180,0,1)]"
          style={{ height: bottomSandHeight }}
        />
      </div>
    </div>
  );
};

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 200]);

  const breakRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: breakScroll } = useScroll({ target: breakRef, offset: ["start end", "end start"] });
  const breakY = useTransform(breakScroll, [0, 1], ["-20%", "20%"]);

  const storyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: storyScroll } = useScroll({
    target: storyRef,
    offset: ["start center", "end center"]
  });

  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });
  
  const handleImageMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  const amberMask = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, transparent 10%, black 80%)`;

  return (
    <main className="relative labibs-main text-white min-h-screen overflow-hidden">
      
      {/* SYNCED BACKGROUND ANIMATION */}
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

      {/* --- 1. HERO TITLE --- */}
      <section ref={heroRef} className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 -z-10" style={{ y: heroY }}>
          <img src={imgHero} alt="Labib's Kamla Nagar" className="w-full h-full object-cover opacity-40 grayscale-[0.5]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/60 to-[#050505]" />
        </motion.div>

        <div className="text-center z-10 px-4 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-[#ffb400] mb-4 drop-shadow-[0_0_15px_rgba(255,180,0,0.5)]">
              OUR LEGACY
            </h1>
            <p className="text-white/40 text-xs md:text-sm tracking-[0.6em] uppercase">
              Est. 2012 · The Taste of Kamla Nagar
            </p>
          </motion.div>

          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 100 }}
            className="w-[1px] bg-gradient-to-b from-[#ffb400] to-transparent mx-auto mt-12"
          />
        </div>
      </section>

      {/* --- 2. THE STORY SCROLL --- */}
      <section ref={storyRef} className="max-w-7xl mx-auto px-6 md:px-12 py-32 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

          {/* Left Column */}
          <div className="md:col-span-5 relative">
            <div className="sticky top-40 flex items-start gap-6">
              <div className="hidden md:block">
                <ScrollHourglass progress={storyScroll} />
              </div>
              <SectionReveal>
                <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tight mb-6 leading-tight">
                  A Recipe for<br />
                  <span className="text-[#ffb400] italic">The Ages</span>
                </h2>
                <div className="w-16 h-[2px] bg-[#ffb400] mb-6 shadow-[0_0_10px_#ffb400]" />
              </SectionReveal>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-7 md:pl-12 border-l border-white/5 pt-12 md:pt-0">
            <AmberGlowText>
              Labib's didn't start in a boardroom; it started over a sizzling grill in the buzzing lanes of Kamla Nagar. We knew that North Campus needed more than just fast food—it needed a flavor that felt like home.
            </AmberGlowText>
            <AmberGlowText>
              Over the last decade, we have mastered the art of the Shawarma. From our signature Chicken Mughlai Rolls to the crispy perfection of our Kurkure Momos, every item on our menu is a testament to the spice-rich heritage of Old Delhi, reimagined for the modern youth.
            </AmberGlowText>
            <AmberGlowText>
              Today, Labib's stands as a landmark for students, locals, and foodies from across the city. We aren't just serving rolls; we are serving memories, one spicy bite at a time.
            </AmberGlowText>

            <motion.div className="pt-8 border-t border-white/10 mt-16 space-y-6">
              <div className="flex items-start gap-3 text-[#ffb400]">
                <MapPin className="w-5 h-5 mt-1" />
                <p className="text-white/70 text-sm tracking-wide">35, Block UB, Kamla Nagar, Delhi – 110007</p>
              </div>
              <div className="flex items-center gap-3 text-[#ffb400]">
                <Clock className="w-5 h-5" />
                <p className="text-white/70 text-sm tracking-widest uppercase">Open Daily · 10:30 AM – 10:30 PM</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 3. THE REVEAL BREAK --- */}
      <section 
        ref={breakRef} 
        onMouseMove={handleImageMouseMove}
        className="relative h-[60vh] w-full overflow-hidden my-12 cursor-none group"
      >
        <motion.div className="absolute inset-[-10%] w-[120%] h-[120%]" style={{ y: breakY }}>
          <img src={imgLegacy} alt="The Grill" className="w-full h-full object-cover grayscale brightness-[0.2]" />
          <motion.img 
            src={imgLegacy} alt="Labib's Focus" 
            className="absolute inset-0 w-full h-full object-cover saturate-[1.5]" 
            style={{ WebkitMaskImage: amberMask, maskImage: amberMask }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <SectionReveal>
            <div className="text-center">
              <blockquote className="font-serif text-3xl md:text-5xl lg:text-6xl text-white italic leading-relaxed max-w-4xl mx-auto px-4">
                "Where every bite tells a{" "}
                <span className="text-[#ffb400] font-bold">legendary story.</span>"
              </blockquote>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* --- 4. THE PILLARS --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="text-center mb-20">
          <SectionReveal>
            <h2 className="font-serif text-4xl md:text-5xl text-[#ffb400] tracking-tighter mb-4">THE LABIB'S WAY</h2>
            <p className="text-white/40 text-xs tracking-widest uppercase font-bold">The heartbeat of Kamla Nagar</p>
          </SectionReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <NeonCard key={i} pillar={p} delay={i * 0.15} />
          ))}
        </div>
      </section>

    </main>
  );
};

export default About;