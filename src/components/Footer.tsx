import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone, MapPin, Flame } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative w-full pt-20 pb-10 mt-0 overflow-hidden bg-[#050505] border-none">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Branding */}
        <div className="text-center mb-16">
          <Link to="/" className="inline-block group">
            <h3 className="font-serif text-5xl text-[#ffb400] font-bold tracking-[0.1em]">
              LABIB'S
            </h3>
          </Link>
          <div className="mt-4 flex items-center justify-center gap-4 opacity-70">
            <span className="w-12 h-[1px] bg-[#ffb400]/40" />
            <p className="text-[#ffb400] text-xs tracking-[0.4em] uppercase font-medium">Legendary Rolls • Iconic Taste</p>
            <span className="w-12 h-[1px] bg-[#ffb400]/40" />
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left bg-white/5 backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-2xl mb-12">
          <div>
            <h4 className="font-serif text-xl text-white mb-6 tracking-widest border-b border-[#ffb400]/20 pb-2">Explore</h4>
            <div className="flex flex-col gap-4">
              {["Home", "About", "Menu", "Gallery", "Contact"].map((name) => (
                <Link key={name} to={name === "Home" ? "/" : `/${name.toLowerCase()}`} className="text-white/60 text-sm uppercase tracking-[0.2em] hover:text-[#ffb400] transition-colors">
                  {name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-xl text-white mb-6 tracking-widest border-b border-[#ffb400]/20 pb-2">Find Us</h4>
            <div className="flex flex-col gap-5 text-sm text-white/60">
              <div className="flex items-start gap-3 justify-center md:justify-start">
                <MapPin className="w-5 h-5 text-[#ffb400] shrink-0" />
                <span className="leading-relaxed text-[10px] uppercase tracking-widest">
                  35, Block UB, Kamla Nagar, Delhi – 110007
                </span>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Phone className="w-4 h-4 text-[#ffb400] shrink-0" />
                <a href="tel:+919310522278" className="hover:text-[#ffb400] transition-colors tracking-widest">+91 93105 22278</a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-xl text-white mb-6 tracking-widest border-b border-[#ffb400]/20 pb-2">Connect</h4>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="https://www.instagram.com/labibskmlngr/" target="_blank" className="w-12 h-12 rounded-full border border-[#ffb400]/30 flex items-center justify-center text-[#ffb400] hover:bg-[#ffb400] hover:text-black transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-[#ffb400]/30 flex items-center justify-center text-[#ffb400] hover:bg-[#ffb400] hover:text-black transition-all">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center pt-6 border-t border-white/5">
          <p className="text-[9px] text-white/30 tracking-[0.4em] uppercase">
            © {new Date().getFullYear()} LABIB'S. Crafted with <Flame className="inline w-3 h-3 text-[#ff4500] mb-0.5" /> in North Campus.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;