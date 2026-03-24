import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Our Story", path: "/about" },
  { name: "Moments", path: "/gallery" },
  { name: "Find Us", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Kept the timer slightly shorter for a fast-food feel
    const timer = setTimeout(() => setIsVisible(true), 1500); 
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <>
      {/* Top glowing edge - Changed to LABIB'S Amber */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.4 : 0 }}
        transition={{ duration: 1.5 }}
        className="fixed top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ffb400] to-transparent z-[110]"
      />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          scrolled
            // Darker charcoal background with amber border
            ? "h-20 bg-[#0a0402]/95 backdrop-blur-2xl border-b border-[#ffb400]/20 shadow-[0_10px_40px_rgba(0,0,0,0.9)]"
            : "h-28 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between">

          {/* LABIB'S Logo */}
          <Link to="/" className="group relative flex flex-col">
            <span className="font-serif text-2xl md:text-3xl font-bold text-[#ffb400] tracking-[0.1em] transition-colors group-hover:text-white">
              LABIB'S
            </span>
            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-[#ffb400]/50 -mt-1 group-hover:text-[#ffb400] transition-colors">
              Legendary Shawarma & Rolls
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path} className="relative px-6 py-2 overflow-hidden group">
                  <motion.span className="absolute bottom-0 left-0 w-full h-0 bg-[#ffb400]/10 group-hover:h-full transition-all duration-300 ease-out z-0" />
                  <span className={`relative z-10 text-[11px] uppercase tracking-[0.3em] transition-colors duration-300 ${
                    isActive ? "text-[#ffb400] font-bold" : "text-foreground/70 group-hover:text-[#ffb400]"
                  }`}>
                    {link.name}
                  </span>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        // Neon Amber active line
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ffb400] shadow-[0_0_12px_rgba(255,180,0,0.8)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </div>

          {/* Order Button & Mobile Toggle */}
          <div className="flex items-center gap-6">
            <motion.a
              href="https://www.zomato.com/ncr/labibs-kamla-nagar-new-delhi"
              target="_blank"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden lg:flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-[#ff4500] to-[#ffb400] rounded-sm text-[10px] uppercase tracking-[0.2em] font-bold text-white hover:shadow-[0_0_25px_rgba(255,69,0,0.5)] transition-all duration-500"
            >
              <ShoppingBag size={14} />
              Order Online
            </motion.a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-[#ffb400] p-2 transition-transform hover:scale-110"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar - Changed to Amber */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent overflow-hidden">
          <motion.div
            className="h-full bg-[#ffb400] relative"
            style={{ width: `${scrollProgress}%`, boxShadow: "0 0 10px rgba(255,180,0,1)", transition: "width 0.1s ease-out" }}
          >
            <div className="absolute right-0 top-0 h-full w-4 bg-white/40 blur-[2px]" />
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[120] bg-[#0a0402]/98 backdrop-blur-xl flex flex-col p-12"
          >
            <div className="flex justify-end">
              <button onClick={() => setMobileOpen(false)} className="text-[#ffb400] hover:scale-110 transition-transform">
                <X size={36} />
              </button>
            </div>
            <nav className="flex flex-col gap-10 mt-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-5xl tracking-tighter text-foreground/40 hover:text-[#ffb400] transition-all duration-500 hover:tracking-widest"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto border-t border-[#ffb400]/10 pt-8">
              <p className="text-[#ffb400]/40 text-[10px] uppercase tracking-[0.5em] mb-2">Kamla Nagar Delivery</p>
              <a href="tel:+91XXXXXXXXXX" className="font-serif text-3xl text-[#ffb400] hover:text-white transition-colors">
                Order Direct
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;