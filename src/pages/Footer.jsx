import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
// removed MagneticButton from here
import { ArrowUp, Send, MapPin, Clock, Github, Twitter, Linkedin } from 'lucide-react'; 

// --- 1. Add this Helper Component ---
const MagneticButton = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.4);
    y.set((clientY - (top + height / 2)) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0); y.set(0);
  };

  return (
    <motion.button 
      ref={ref} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave} 
      style={{ x: springX, y: springY }} 
      className={className}
    >
      {children}
    </motion.button>
  );
};

// --- 2. The Footer Component ---
const Footer = () => {
  return (
    <footer className="relative bg-[#050505] pt-20 pb-10 px-4 md:px-20 border-t border-white/10 overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
        
        {/* Brand Section */}
        <div className="md:col-span-5 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-[4rem] md:text-[6rem] leading-[0.8] font-black tracking-tighter mb-8 text-white select-none">
              DUNC<span className="text-outline text-transparent">TECH</span>
            </h2>
            <p className="text-zinc-500 font-mono text-xs md:text-sm uppercase tracking-widest max-w-sm">
              Forging digital reality through code, design, and raw data architecture.
            </p>
          </div>
          
          {/* Location / Time Data */}
          <div className="mt-12 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-zinc-400 font-mono text-xs uppercase tracking-wider">
              <MapPin size={14} className="text-white" /> Delhi, India (HQ)
            </div>
            <div className="flex items-center gap-3 text-zinc-400 font-mono text-xs uppercase tracking-wider">
              <Clock size={14} className="text-white" /> Local Time: {new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false})}
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="md:col-span-3">
          <h3 className="text-white font-mono text-xs uppercase tracking-[0.2em] mb-8 opacity-50">/ Coordinates</h3>
          <ul className="space-y-4">
            {['Home', 'Services', 'Projects', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 bg-zinc-700 group-hover:bg-white transition-colors rotate-45" />
                  <span className="text-sm md:text-base font-bold uppercase tracking-widest relative overflow-hidden">
                    <span className="block group-hover:-translate-y-full transition-transform duration-300">{item}</span>
                    <span className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-white">{item}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter & Socials */}
        <div className="md:col-span-4 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-mono text-xs uppercase tracking-[0.2em] mb-8 opacity-50">/ Transmission</h3>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="ENTER_EMAIL_ADDRESS" 
                className="w-full bg-transparent border-b border-white/20 py-4 text-white font-mono text-xs focus:outline-none focus:border-white transition-colors uppercase tracking-wider placeholder:text-zinc-700"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-white transition-colors">
                <Send size={16} />
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-12">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <MagneticButton key={i} className="p-4 border border-white/10 bg-zinc-900 hover:bg-white hover:text-black transition-all rounded-full group">
                <Icon size={18} />
              </MagneticButton>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
        <div className="flex gap-8 mb-4 md:mb-0">
          <a href="#" className="text-[10px] text-zinc-600 hover:text-white font-mono uppercase tracking-widest transition-colors">Privacy Protocol</a>
          <a href="#" className="text-[10px] text-zinc-600 hover:text-white font-mono uppercase tracking-widest transition-colors">Terminals</a>
        </div>
        
        <div className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest text-center md:text-right">
          © {new Date().getFullYear()} DUNC SYSTEMS. All Rights Reserved.
        </div>

        {/* Scroll Top Button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="hidden md:flex absolute bottom-10 right-20 w-12 h-12 border border-white/20 items-center justify-center hover:bg-white hover:text-black transition-all rounded-full group"
        >
          <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;