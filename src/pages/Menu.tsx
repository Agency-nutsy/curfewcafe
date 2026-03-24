import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Flame, Utensils, ShoppingBag, Coffee, Star } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

const menuData = [
  {
    tab: "Rolls",
    categories: [
      {
        name: "Signature Shawarma",
        items: [
          { name: "Chicken Shawarma Roll", price: "₹120" },
          { name: "Chicken Mughlai Roll", price: "₹160" },
          { name: "Double Egg Cheesy Roll", price: "₹90" },
          { name: "Labib's Special Grub Tower", price: "₹210" },
        ],
      },
      {
        name: "Veggie Rolls",
        items: [
          { name: "Paneer Tikka Roll", price: "₹140" },
          { name: "Kurkure Chaap Roll", price: "₹130" },
          { name: "Veg Seekh Kebab Roll", price: "₹110" },
          { name: "Soya Malai Chaap Roll", price: "₹130" },
        ],
      },
    ],
  },
  {
    tab: "Momos",
    categories: [
      {
        name: "The Momo Hub",
        items: [
          { name: "Chicken Kurkure Momos", price: "₹140" },
          { name: "Paneer Steam Momos", price: "₹100" },
          { name: "Chilly Garlic Momos", price: "₹120" },
          { name: "Tandoori Afgani Momos", price: "₹160" },
        ],
      },
      {
        name: "Crispy Bites",
        items: [
          { name: "Honey Chilly Potato", price: "₹130" },
          { name: "Veg Spring Rolls (2 Pcs)", price: "₹90" },
          { name: "French Fries Large", price: "₹100" },
        ],
      },
    ],
  },
  {
    tab: "Mains",
    categories: [
      {
        name: "Burgers & Pasta",
        items: [
          { name: "Aloo Spicy-o Burger", price: "₹60" },
          { name: "Chicken Cheesy Burger", price: "₹110" },
          { name: "White Sauce Alfredo Pasta", price: "₹160" },
          { name: "Red Sauce Arrabiata Pasta", price: "₹150" },
        ],
      },
      {
        name: "Chinese Wok",
        items: [
          { name: "Veg Hakka Noodles", price: "₹120" },
          { name: "Chicken Singapuri Chowmein", price: "₹160" },
          { name: "Veg Fried Rice", price: "₹120" },
          { name: "Chilly Chicken Dry", price: "₹180" },
        ],
      },
    ],
  },
  {
    tab: "Sips",
    categories: [
      {
        name: "Cool Shakes",
        items: [
          { name: "Oreo Cookie Shake", price: "₹110" },
          { name: "Kitkat Indulgence", price: "₹120" },
          { name: "Mocha Cookie Crumble", price: "₹130" },
          { name: "Classic Cold Coffee", price: "₹90" },
        ],
      },
      {
        name: "Hot & Sweet",
        items: [
          { name: "Hot Nutella Brownie", price: "₹110" },
          { name: "Hazelnut Hot Coffee", price: "₹70" },
          { name: "Gulab Jamun (2 Pcs)", price: "₹50" },
        ],
      },
    ],
  },
];

// ── EMBER SPARK TRANSITION PARTICLES ────────────────
const EmberParticles = () => {
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
          className="absolute rounded-full bg-[#ffb400] shadow-[0_0_8px_rgba(255,180,0,0.8)]"
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
    <main className="pt-32 pb-24 relative labibs-main text-white min-h-screen">
      
      {/* SYNCED LABIB'S BACKGROUND ANIMATION */}
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
      <section className="px-4 text-center mb-8 relative z-10">
        <SectionReveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-serif text-6xl md:text-8xl text-[#ffb400] tracking-tighter mb-4 drop-shadow-[0_0_20px_rgba(255,180,0,0.3)]">
              THE MENU
            </h1>
            <p className="text-white/50 text-xs md:text-sm tracking-[0.5em] uppercase">
              Legendary Rolls · Spicy Momos · Iconic Flavours
            </p>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#ffb400] to-transparent mx-auto mt-8" />
          </motion.div>
        </SectionReveal>
      </section>

      {/* STICKY AMBER TABS */}
      <section className="sticky top-24 z-[90] px-4 py-4 mb-12 pointer-events-none">
        <div className="max-w-4xl mx-auto flex justify-center pointer-events-auto">
          <div className="flex flex-wrap justify-center gap-2 p-2 bg-[#050505]/90 backdrop-blur-xl rounded-full border border-[#ffb400]/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
            {menuData.map((section) => {
              const isActive = activeTab === section.tab;
              return (
                <button
                  key={section.tab}
                  onClick={() => handleTabChange(section.tab)}
                  className={`relative px-6 py-3 rounded-full text-xs tracking-[0.2em] uppercase font-bold transition-all duration-500 ${
                    isActive ? "text-white" : "text-white/30 hover:text-[#ffb400]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-gradient-to-r from-[#ff4500] to-[#ffb400] rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {section.tab === "Rolls" && <Flame size={14} />}
                    {section.tab === "Momos" && <Star size={14} />}
                    {section.tab === "Mains" && <Utensils size={14} />}
                    {section.tab === "Sips" && <Coffee size={14} />}
                    {section.tab}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Menu Items Content */}
      <section className="px-4 relative z-10 min-h-[800px]">
        <div className="max-w-5xl mx-auto relative">

          {isTransitioning && <EmberParticles />}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              {activeSection?.categories.map((cat, ci) => (
                <div key={ci} className="mb-20">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-[#ffb400]/20" />
                    <h3 className="font-serif text-3xl md:text-4xl text-[#ffb400] tracking-widest text-center">
                      {cat.name}
                    </h3>
                    <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-[#ffb400]/20" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
                    {cat.items.map((item, ii) => (
                      <motion.div
                        key={ii}
                        className="group relative flex flex-col justify-between p-4 -mx-4 rounded-xl hover:bg-white/[0.02] transition-all duration-300"
                      >
                        <div className="absolute left-0 top-1/4 h-1/2 w-[2px] bg-[#ff4500] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center" />

                        <div className="flex items-baseline justify-between gap-4">
                          <h4 className="font-serif text-xl text-white group-hover:text-[#ffb400] transition-colors">
                            {item.name}
                          </h4>
                          <div className="flex-grow border-b border-dotted border-white/10 relative top-[-6px]">
                            <div className="absolute top-[1px] left-0 h-[1px] bg-[#ffb400] w-0 group-hover:w-full transition-all duration-700 ease-out" />
                          </div>
                          <span className="font-serif text-xl text-[#ffb400] tracking-wider">
                            {item.price}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* CTA Section */}
          <section className="text-center mt-24 pt-16 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-gradient-to-r from-transparent via-[#ffb400]/30 to-transparent" />
            <p className="text-white/40 text-[10px] uppercase tracking-[0.5em] mb-8">
              Available for delivery via Zomato or direct takeaway.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://www.zomato.com/ncr/labibs-kamla-nagar-new-delhi"
                target="_blank"
                className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#ff4500] to-[#ffb400] rounded-full text-white text-xs tracking-widest uppercase font-bold hover:shadow-[0_0_25px_rgba(255,69,0,0.4)] transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                Order on Zomato
              </a>
              <a
                href="tel:+919310522278"
                className="inline-flex items-center gap-3 px-10 py-4 border border-white/20 rounded-full text-white text-xs tracking-widest uppercase font-bold hover:bg-white/5 transition-all"
              >
                <Phone className="w-4 h-4" />
                Call for Bulk
              </a>
            </div>
          </section>

        </div>
      </section>
    </main>
  );
};

export default Menu;