import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Wine, UtensilsCrossed } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

const menuData = [
  {
    tab: "Drinks",
    categories: [
      {
        name: "Hot Drinks",
        items: [
          { name: "Tea", price: "₹20" },
          { name: "Lemon Tea", price: "₹35" },
          { name: "Coffee", price: "₹40" },
        ],
      },
      {
        name: "Cold Drinks",
        items: [
          { name: "Fresh Lime Soda", price: "₹35" },
          { name: "Ice Tea", price: "₹35" },
          { name: "Krusher", price: "₹50" },
          { name: "Banana Shake", price: "₹60" },
          { name: "Cold Coffee", price: "₹70" },
          { name: "Oreo Shake", price: "₹80" },
          { name: "Kitkat Shake", price: "₹80" },
        ],
      },
    ],
  },
  {
    tab: "Pizza",
    categories: [
      {
        name: "Pizza",
        items: [
          { name: "Margarita Pizza", price: "₹110" },
          { name: "Simply Veg Pizza", price: "₹110" },
          { name: "Veggie Delight", price: "₹120" },
          { name: "Mushroom & Corn", price: "₹140" },
          { name: "Farmfresh Pizza", price: "₹140" },
        ],
      },
      {
        name: "Add-ons",
        items: [
          { name: "Extra Cheese", price: "₹45" },
          { name: "Cheese Burst", price: "₹85" },
        ],
      },
    ],
  },
  {
    tab: "Mains",
    categories: [
      {
        name: "Mini Meals",
        items: [
          { name: "Veg Momos", price: "₹60" },
          { name: "Veg Spring Roll", price: "₹70" },
          { name: "Veg Manchurian", price: "₹80" },
          { name: "Veg Noodle", price: "₹80" },
          { name: "Garlic Noodle", price: "₹90" },
          { name: "Singapore Noodle", price: "₹110" },
          { name: "Hakka Noodle", price: "₹120" },
          { name: "Honey Chilli", price: "₹120" },
          { name: "Cauliflower", price: "₹120" },
          { name: "Cheese Chilly", price: "₹140" },
        ],
      },
      {
        name: "Combos",
        items: [
          { name: "Rajma Rice", price: "₹70" },
          { name: "Kadhi Rice", price: "₹70" },
          { name: "Fried Rice & Manchurian", price: "₹100" },
          { name: "Noodle & Manchurian", price: "₹100" },
          { name: "Noodle & Cheese Chilly", price: "₹130" },
          { name: "Fried Rice & Cheese Chilly", price: "₹130" },
        ],
      },
      {
        name: "Pasta",
        items: [
          { name: "White Sauce Pasta", price: "₹100" },
          { name: "Red Sauce Pasta", price: "₹100" },
          { name: "Mix Sauce Pasta", price: "₹110" },
        ],
      },
    ],
  },
  {
    tab: "Bites",
    categories: [
      {
        name: "Sides",
        items: [
          { name: "Cheese Garlic Bread", price: "₹35" },
          { name: "Stuffed Garlic Bread", price: "₹80" },
          { name: "Nachos", price: "₹100" },
          { name: "Veg Calzone Pocket", price: "₹100" },
          { name: "Samosa Paneer Parcel", price: "Mkt. Price" },
        ],
      },
      {
        name: "Fries",
        items: [
          { name: "Masala Fries", price: "₹60" },
          { name: "Pizza Fries", price: "₹80" },
          { name: "Cheese Fries", price: "₹90" },
        ],
      },
      {
        name: "Grilled Sandwiches",
        items: [
          { name: "Veg Grilled", price: "₹100" },
          { name: "Cheese Grilled", price: "₹110" },
          { name: "Chocolatey Nutella", price: "₹110" },
        ],
      },
      {
        name: "Burgers",
        items: [
          { name: "Aloo Tikki Burger", price: "₹35" },
          { name: "Veg Tandoori Burger", price: "₹50" },
          { name: "Veg Cheese Burger", price: "₹70" },
        ],
      },
    ],
  },
];

// --- UPDATED: THE AQUA SPLASH TRANSITION PARTICLES ---
const AquaSplashParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      size: Math.random() * 3 + 1,
      duration: 0.4 + Math.random() * 0.4,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{ opacity: 0, scale: 0, x: p.x, y: p.y }}
          transition={{ duration: p.duration, ease: "easeOut" }}
          // Changed to glowing neon aqua
          className="absolute rounded-full bg-primary shadow-[0_0_8px_rgba(0,240,255,0.8)]"
          style={{ width: p.size, height: p.size }}
        />
      ))}
    </div>
  );
};

const Menu = () => {
  const [activeTab, setActiveTab] = useState(menuData[0].tab);
  const activeSection = menuData.find((s) => s.tab === activeTab);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTabChange = (newTab: string) => {
    if (newTab === activeTab || isTransitioning) return;
    setIsTransitioning(true);
    setActiveTab(newTab);
    window.scrollTo({ top: 300, behavior: "smooth" });
    setTimeout(() => setIsTransitioning(false), 600);
  };

  return (
    /* INJECTED AQUA BG DIRECTLY INTO MAIN WRAPPER */
    <main className="pt-32 pb-24 relative aqua-bg text-foreground min-h-screen">
      
      {/* AQUA ANIMATION CSS */}
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

      {/* Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <section className="px-4 text-center mb-8 relative z-10">
        <SectionReveal>
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-serif text-6xl md:text-8xl text-primary tracking-[0.15em] mb-4 drop-shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              THE MENU
            </h1>
            <p className="text-muted-foreground text-xs md:text-sm tracking-[0.4em] uppercase">
              Global Flavours · Fresh Vibes · Break the Curfew
            </p>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8" />
          </motion.div>
        </SectionReveal>
      </section>

      {/* --- STICKY CRYSTAL CAPSULE TABS --- */}
      <section className="sticky top-24 z-[90] px-4 py-4 mb-12 pointer-events-none">
        <div className="max-w-4xl mx-auto flex justify-center pointer-events-auto">
          {/* Background set to deep navy base */}
          <div className="flex flex-wrap justify-center gap-2 p-2 bg-[#020813]/80 backdrop-blur-xl rounded-full border border-primary/20 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
            {menuData.map((section) => {
              const isActive = activeTab === section.tab;
              return (
                <button
                  key={section.tab}
                  onClick={() => handleTabChange(section.tab)}
                  className={`relative px-6 py-3 rounded-full text-xs tracking-[0.2em] uppercase font-bold transition-all duration-500 overflow-hidden ${
                    isActive ? "text-[#020813]" : "text-foreground/60 hover:text-primary"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-primary shadow-[0_0_15px_rgba(0,240,255,0.6)]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {section.tab === "Drinks" ? (
                      <Wine size={14} className={isActive ? "text-[#020813]" : "text-primary"} />
                    ) : (
                      <UtensilsCrossed size={14} className={isActive ? "text-[#020813]" : "text-primary"} />
                    )}
                    {section.tab}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="px-4 relative z-10 min-h-[800px]">
        <div className="max-w-5xl mx-auto relative">

          {isTransitioning && <AquaSplashParticles />}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {activeSection?.categories.map((cat, ci) => (
                <div key={ci} className="mb-20">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-primary/30" />
                    <h3 className="font-serif text-3xl md:text-4xl text-primary tracking-widest text-center drop-shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                      {cat.name}
                    </h3>
                    <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-primary/30" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
                    {cat.items.map((item, ii) => (
                      <motion.div
                        key={ii}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: ii * 0.05, duration: 0.5 }}
                        className="group relative flex flex-col justify-between p-4 -mx-4 rounded-xl hover:bg-white/[0.02] transition-colors duration-500 cursor-default"
                      >
                        <div className="absolute left-0 top-1/4 h-1/2 w-[2px] bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center shadow-[0_0_8px_rgba(0,240,255,0.8)]" />

                        <div className="flex items-baseline justify-between gap-4 mb-2 transform transition-all duration-500 group-hover:translate-x-3">
                          <h4 className="font-serif text-xl text-white group-hover:text-primary transition-colors duration-300">
                            {item.name}
                          </h4>
                          <div className="flex-grow border-b border-dotted border-white/20 relative top-[-6px]">
                            <div className="absolute top-[1px] left-0 h-[1px] bg-primary w-0 group-hover:w-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                          </div>
                          {item.price && (
                            <span className="font-serif text-xl text-primary tracking-wider whitespace-nowrap transform transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(0,240,255,0.6)]">
                              {item.price}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Call to Action Footer */}
          <section className="text-center mt-24 pt-16 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <p className="text-muted-foreground text-xs uppercase tracking-[0.3em] mb-8">
              Craving something else? Ask our team for specials.
            </p>
            <a
              href="tel:+919310522278"
              className="relative inline-flex items-center gap-3 px-10 py-4 overflow-hidden group border border-primary/30 rounded-sm"
            >
              <span className="absolute inset-0 bg-primary/10 group-hover:bg-primary transition-colors duration-500" />
              <Phone className="w-4 h-4 text-primary group-hover:text-[#020813] relative z-10 transition-colors duration-500" />
              <span className="text-xs tracking-[0.2em] uppercase font-bold text-primary group-hover:text-[#020813] relative z-10 transition-colors duration-500">
                Call for Group Orders
              </span>
            </a>
          </section>

        </div>
      </section>
    </main>
  );
};

export default Menu;