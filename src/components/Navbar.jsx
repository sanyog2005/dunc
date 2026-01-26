import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Info, MessageSquare, X, Menu, Command } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    { name: 'Projects', path: '/projects', icon: <LayoutGrid size={18} /> },
    { name: 'Contact', path: '/contact', icon: <MessageSquare size={18} /> },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-[100] transition-all duration-500 px-4 md:px-12 py-4 ${
          isScrolled || isMenuOpen ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* --- MAGNETIC LOGO --- */}
          <Link to="/" className="z-[110]">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 md:gap-3 group"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-transparent flex items-center justify-center rounded-sm transition-transform group-hover:rotate-90">
                <img src={logo} alt="DUNC Logo" className="w-full h-full object-contain invert" />
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white">
                DUNC<span className="text-zinc-500">.</span>
              </span>
            </motion.div>
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.name} to={link.path}>
                  <motion.div
                    className={`relative px-6 py-2 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] transition-colors ${
                      isActive ? 'text-white' : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    <span className="opacity-50 group-hover:opacity-100">{link.icon}</span>
                    {link.name}
                    {isActive && (
                      <motion.div 
                        layoutId="nav-active"
                        className="absolute inset-0 bg-white/5 border border-white/10 -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* --- SYSTEM STATUS (Desktop Only) --- */}
          <div className="hidden lg:flex items-center gap-4 border-l border-white/10 pl-8 ml-4 font-mono text-[9px] text-zinc-600 uppercase tracking-widest">
            <div className="flex flex-col">
              <span>Core: Operational</span>
              <span className="text-white/40">Base: Delhi</span>
            </div>
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
          </div>

          {/* --- MOBILE TOGGLE --- */}
          <motion.button 
            whileTap={{ scale: 0.9 }} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden z-[110] text-white p-2"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[105] bg-black flex flex-col justify-center px-8 md:hidden"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            
            <div className="space-y-8 relative z-10">
              <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.5em] mb-12">/ System Navigation</p>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <Link 
                    to={link.path} 
                    className={`flex items-center gap-6 text-5xl font-black uppercase tracking-tighter ${
                      location.pathname === link.path ? 'text-white italic' : 'text-zinc-800 hover:text-white transition-colors'
                    }`}
                  >
                    <span className="text-sm font-mono text-zinc-700">0{i + 1}</span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Footer Stats */}
            <div className="absolute bottom-12 left-8 right-8 pt-8 border-t border-white/5 flex justify-between items-end">
              <div className="font-mono text-[9px] text-zinc-600 uppercase tracking-[0.2em] space-y-1">
                <p>Status: Operational</p>
                <p>Location: Delhi</p>
              </div>
              <div className="text-zinc-800 font-black text-2xl tracking-tighter">DUNC.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;