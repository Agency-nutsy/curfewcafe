import { useRef, MouseEvent } from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { Phone, MapPin, Clock, Instagram, Facebook, Flame } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

// --- 3D INTERACTIVE TILE COMPONENT ---
const MagneticTile = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });

  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) / 25);
    y.set((clientY - centerY) / 25);
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const maskImage = useMotionTemplate`radial-gradient(400px at ${mouseX}px ${mouseY}px, white, transparent)`;

  return (
    <SectionReveal delay={delay} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX: y, rotateY: x }}
        // Updated to Charcoal base with Amber border
        className="relative h-full w-full bg-[#0a0402]/60 backdrop-blur-sm border border-[#ffb400]/20 rounded-2xl overflow-hidden group perspective-1000 shadow-2xl"
      >
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            // Updated glow to Toasted Amber
            background: "radial-gradient(circle at center, rgba(255,180,0,0.1) 0%, transparent 100%)",
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
          }}
        />
        <div className="relative z-10 h-full w-full">
          {children}
        </div>
      </motion.div>
    </SectionReveal>
  );
};

// --- STAGGERED LETTER ANIMATION ---
const StaggeredTitle = ({ text }: { text: string }) => {
  const letters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
  };
  const child = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#ffb400] tracking-tighter mb-4 flex justify-center flex-wrap"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child} className={letter === " " ? "w-4 md:w-8" : ""}>
          {letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

const Contact = () => (
  <main className="pt-32 pb-24 relative labibs-main text-white min-h-screen overflow-hidden">
    
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

    {/* Ambient Background Glow */}
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120%] max-w-6xl h-[600px] bg-[#ffb400]/5 blur-[150px] rounded-full pointer-events-none" />

    {/* --- 1. HERO SECTION --- */}
    <section className="px-4 text-center mb-24 relative z-10">
      <StaggeredTitle text="FIND THE LEGEND" />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-white/40 text-xs md:text-sm tracking-[0.5em] uppercase"
      >
        Iconic Taste · Kamla Nagar
      </motion.p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 100 }}
        transition={{ delay: 1.5, duration: 1, ease: "easeInOut" }}
        className="h-[1px] bg-gradient-to-r from-transparent via-[#ffb400] to-transparent mx-auto mt-8 shadow-[0_0_15px_rgba(255,180,0,0.4)]"
      />
    </section>

    {/* --- 2. THE TILES --- */}
    <section className="px-6 md:px-12 relative z-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* Left Tile: Contact Info */}
        <MagneticTile delay={0.1} className="lg:col-span-2 min-h-[500px]">
          <div className="p-8 md:p-12 flex flex-col h-full justify-between">
            <div>
              <h2 className="font-serif text-3xl text-white mb-10 tracking-widest border-b border-white/5 pb-6">
                The HQ
              </h2>

              <div className="space-y-8">

                {/* Location */}
                <a
                  href="https://www.google.com/maps/place/LABIB%E2%80%99s+Kamla+Nagar+(best+restaurant+in+north+campus)/@28.6808818,77.2049274,17z/data=!3m1!4b1!4m6!3m5!1s0x390cfd9016721677:0x1c04ec2ccf795d5d!8m2!3d28.6808818!4d77.2075077!16s%2Fg%2F11c2kxdd05?entry=ttu&g_ep=EgoyMDI2MDMyMi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-5 group cursor-pointer"
                >
                  <div className="p-3 rounded-full bg-white/5 border border-[#ffb400]/10 group-hover:border-[#ffb400]/50 group-hover:bg-[#ffb400]/10 transition-all duration-500">
                    <MapPin className="w-5 h-5 text-[#ffb400]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#ffb400]/60 tracking-[0.2em] uppercase mb-1">Outlet</p>
                    <p className="text-white/80 text-sm leading-relaxed tracking-wider group-hover:text-[#ffb400] transition-colors duration-300">
                      35, Block UB, Jawahar Nagar,<br />
                      Kamla Nagar, Delhi – 110007
                    </p>
                  </div>
                </a>

                {/* Hours */}
                <div className="flex items-start gap-5 group">
                  <div className="p-3 rounded-full bg-white/5 border border-[#ffb400]/10 group-hover:border-[#ffb400]/50 group-hover:bg-[#ffb400]/10 transition-all duration-500">
                    <Clock className="w-5 h-5 text-[#ffb400]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#ffb400]/60 tracking-[0.2em] uppercase mb-1">Service Hours</p>
                    <p className="text-white/80 text-sm tracking-wider">
                      Mon – Sun<br />10:30 AM – 10:30 PM
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5 group">
                  <div className="p-3 rounded-full bg-white/5 border border-[#ffb400]/10 group-hover:border-[#ffb400]/50 group-hover:bg-[#ffb400]/10 transition-all duration-500">
                    <Phone className="w-5 h-5 text-[#ffb400]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#ffb400]/60 tracking-[0.2em] uppercase mb-1">Orders & Bulks</p>
                    <a href="tel:+919310522278" className="text-white hover:text-[#ffb400] text-sm tracking-widest transition-colors font-mono">
                      +91 93105 22278
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Socials */}
            <div className="pt-8 mt-8 border-t border-white/5 flex gap-4">
              <a
                href="https://www.instagram.com/labibskmlngr/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 border border-white/10 text-[#ffb400] hover:bg-[#ffb400] hover:text-black transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 border border-white/10 text-[#ffb400] hover:bg-[#ffb400] hover:text-black transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </MagneticTile>

        {/* Right Tile: The Map */}
        <MagneticTile delay={0.3} className="lg:col-span-3 min-h-[500px]">
          <a
            href="https://www.google.com/maps/place/LABIB%E2%80%99s+Kamla+Nagar+(best+restaurant+in+north+campus)/@28.6808818,77.2049274,17z/data=!3m1!4b1!4m6!3m5!1s0x390cfd9016721677:0x1c04ec2ccf795d5d!8m2!3d28.6808818!4d77.2075077!16s%2Fg%2F11c2kxdd05?entry=ttu&g_ep=EgoyMDI2MDMyMi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full w-full relative group cursor-pointer"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.292963385546!2d77.2049274117714!3d28.680881775536882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd9016721677%3A0x1c04ec2ccf795d5d!2sLABIB%E2%80%99s%20Kamla%20Nagar%20(best%20restaurant%20in%20north%20campus)!5e0!3m2!1sen!2sin!4v1774379666734!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{
                border: 0,
                // Refined dark mode filter to sync with charcoal/amber
                filter: "grayscale(1) invert(0.9) contrast(1.1) brightness(0.8) hue-rotate(20deg)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Labib's Kamla Nagar Location"
              className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            />

            {/* Amber tint overlay */}
            <div className="absolute inset-0 bg-[#ffb400]/5 mix-blend-overlay pointer-events-none" />

            {/* Float Button */}
            <div className="absolute bottom-8 right-8 z-20 pointer-events-auto">
              <div className="relative inline-flex items-center gap-3 px-6 py-3 bg-[#0a0402]/90 backdrop-blur-md border border-[#ffb400]/30 text-[#ffb400] text-xs tracking-[0.2em] uppercase font-bold rounded-full">
                <MapPin className="w-3 h-3" />
                Get Directions
              </div>
            </div>

            {/* Hover hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#050505]/60 pointer-events-none">
              <span className="font-serif text-[#ffb400] text-xl tracking-widest">
                Explore Kamla Nagar
              </span>
            </div>
          </a>
        </MagneticTile>

      </div>
    </section>

    {/* --- 3. FOOTER SIGNATURE --- */}
    <section className="mt-24 text-center px-4 relative z-10">
      <SectionReveal>
        <p className="font-serif text-2xl md:text-4xl text-white/30 tracking-tight italic">
          "Where the spices meet the <span className="text-[#ffb400]">soul.</span>"
        </p>
      </SectionReveal>
    </section>

  </main>
);

export default Contact;