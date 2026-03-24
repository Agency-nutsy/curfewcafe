import { useRef, MouseEvent } from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react";
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
        // Updated to semi-transparent deep navy base
        className="relative h-full w-full bg-[#020813]/50 backdrop-blur-sm border border-primary/20 rounded-2xl overflow-hidden group perspective-1000 shadow-2xl"
      >
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            // Updated glow to Neon Cyan
            background: "radial-gradient(circle at center, rgba(0,240,255,0.15) 0%, transparent 100%)",
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

// --- STAGGERED LETTER ANIMATION FOR HERO ---
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
      className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary tracking-[0.2em] mb-4 flex justify-center flex-wrap"
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
  /* UPDATED TO AQUA BG */
  <main className="pt-32 pb-24 relative aqua-bg text-foreground min-h-screen overflow-hidden">
    
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
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120%] max-w-6xl h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

    {/* --- 1. HERO SECTION --- */}
    <section className="px-4 text-center mb-24 relative z-10">
      <StaggeredTitle text="GET IN TOUCH" />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-muted-foreground text-xs md:text-sm tracking-[0.5em] uppercase"
      >
        Break the Curfew
      </motion.p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 100 }}
        transition={{ delay: 1.5, duration: 1, ease: "easeInOut" }}
        // Shadow glow updated to Cyan
        className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8 shadow-[0_0_15px_rgba(0,240,255,0.8)]"
      />
    </section>

    {/* --- 2. THE TILES --- */}
    <section className="px-6 md:px-12 relative z-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* Left Tile: Contact Info */}
        <MagneticTile delay={0.1} className="lg:col-span-2 min-h-[500px]">
          <div className="p-8 md:p-12 flex flex-col h-full justify-between">
            <div>
              <h2 className="font-serif text-3xl text-white mb-10 tracking-widest border-b border-primary/20 pb-6">
                The Details
              </h2>

              <div className="space-y-8">

                {/* Location - Link updated */}
                <a
                  href="https://www.google.com/maps/place/Curfew+Cafe/@28.6822056,77.1990793,17z/data=!3m1!4b1!4m6!3m5!1s0x390cfdcf48abc91b:0xd488d08133d3868b!8m2!3d28.6822056!4d77.1990793!16s%2Fg%2F11jyghlvgd?entry=ttu&g_ep=EgoyMDI2MDMyMi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-5 group cursor-pointer"
                >
                  <div className="p-3 rounded-full bg-white/5 border border-primary/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500">
                    <MapPin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <p className="text-xs text-primary/60 tracking-[0.2em] uppercase mb-1">Location</p>
                    <p className="text-foreground/90 text-sm leading-relaxed tracking-wider group-hover:text-primary transition-colors duration-300">
                      2/10, Block 2, Roop Nagar,<br />
                      Delhi – 110007
                    </p>
                  </div>
                </a>

                {/* Hours */}
                <div className="flex items-start gap-5 group">
                  <div className="p-3 rounded-full bg-white/5 border border-primary/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary/60 tracking-[0.2em] uppercase mb-1">Hours</p>
                    <p className="text-foreground/90 text-sm tracking-wider">
                      Mon – Sun<br />12:00 PM – 01:00 AM
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5 group">
                  <div className="p-3 rounded-full bg-white/5 border border-primary/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary/60 tracking-[0.2em] uppercase mb-1">Reservations</p>
                    <div className="flex flex-col gap-1">
                      <a href="tel:+919310522278" className="text-foreground/90 text-sm tracking-widest hover:text-primary transition-colors">
                        +91 93105 22278
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Socials - Insta updated */}
            <div className="pt-8 mt-8 border-t border-primary/20 flex gap-4">
              <a
                href="https://www.instagram.com/cafecurfew/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 border border-primary/20 text-primary hover:bg-primary hover:text-black transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 border border-primary/20 text-primary hover:bg-primary hover:text-black transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </MagneticTile>

        {/* Right Tile: The Map - Link and Iframe updated */}
        <MagneticTile delay={0.3} className="lg:col-span-3 min-h-[500px]">
          <a
            href="https://www.google.com/maps/place/Curfew+Cafe/@28.6822056,77.1990793,17z/data=!3m1!4b1!4m6!3m5!1s0x390cfdcf48abc91b:0xd488d08133d3868b!8m2!3d28.6822056!4d77.1990793!16s%2Fg%2F11jyghlvgd?entry=ttu&g_ep=EgoyMDI2MDMyMi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full w-full relative group cursor-pointer"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.2487199673637!2d77.1990793!3d28.682205600000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfdcf48abc91b%3A0xd488d08133d3868b!2sCurfew%20Cafe!5e0!3m2!1sen!2sin!4v1774375331747!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "grayscale(1) invert(0.9) contrast(1.2) hue-rotate(180deg)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Curfew Cafe Location"
              className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            />

            {/* Cyan tint overlay */}
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none" />

            {/* Call Now button floating on map */}
            <div className="absolute bottom-8 right-8 z-20 pointer-events-auto">
              <a
                href="tel:+919310522278"
                onClick={(e) => e.stopPropagation()}
                className="relative inline-flex items-center gap-3 px-6 py-3 bg-[#020813]/80 backdrop-blur-md border border-primary/50 text-primary text-xs tracking-[0.2em] uppercase font-bold hover:bg-primary hover:text-[#020813] transition-all duration-500 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>

            {/* Hover hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#020813]/60 pointer-events-none">
              <span className="font-serif text-primary text-xl tracking-widest drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
                Open in Maps
              </span>
            </div>
          </a>
        </MagneticTile>

      </div>
    </section>

    {/* --- 3. FOOTER SIGNATURE --- */}
    <section className="mt-24 text-center px-4 relative z-10">
      <SectionReveal>
        <p className="font-serif text-2xl md:text-4xl text-white/50 tracking-wider italic">
          "Where the Day Ends and the Night Begins."
        </p>
      </SectionReveal>
    </section>

  </main>
);

export default Contact;