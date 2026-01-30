import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import Footer from './Footer';

const About = () => {
  const containerRef = useRef(null);
  
  // 1. Smooth Scroll Progress for the top bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 2. Parallax and Background Shifts
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textSkew = useTransform(scrollYProgress, [0, 0.5], [0, -5]);

  const containerVars = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const fadeUp = {
    initial: { opacity: 0, y: 100, rotateX: 45 },
    animate: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.main 
      ref={containerRef}
      variants={containerVars}
      initial="initial"
      animate="animate"
      className="relative bg-[#050505] text-white min-h-[200vh] overflow-hidden"
    >
      {/* --- ELITE UI: PROGRESS BAR --- */}
      <motion.div 
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-[100]"
      />

      {/* --- INTERACTIVE BACKGROUND MESH --- */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed inset-0 pointer-events-none"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-800/20 blur-[100px] rounded-full" />
      </motion.div>

      {/* --- SECTION 01: THE REVEAL --- */}
      <section className="h-screen flex flex-col justify-center px-6 md:px-20 relative z-10">
        <motion.div variants={fadeUp} className="overflow-hidden">
          <motion.h1 
            style={{ skewX: textSkew }}
            className="text-[14vw] font-black uppercase leading-[0.8] tracking-tighter"
          >
            BEYOND <br /> <span className="text-outline hover:text-white transition-all duration-700">LIMITS.</span>
          </motion.h1>
        </motion.div>

        <motion.div 
          variants={fadeUp}
          className="mt-12 flex flex-col md:flex-row justify-between items-end gap-8"
        >
          <p className="text-gray-500 font-mono text-sm max-w-sm">
            [ LOCATED IN NEW DELHI ] <br />
            [ ESTABLISHED 2026 ] <br />
            [ STATUS: OPERATIONAL ]
          </p>
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-xs tracking-[0.3em] uppercase opacity-40"
          >
            Keep Scrolling ↓
          </motion.div>
        </motion.div>
      </section>

      {/* --- SECTION 02: INTERACTIVE GRID --- */}
      <section className="py-40 px-6 md:px-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <h2 className="text-4xl font-bold uppercase border-l-4 border-white pl-6">The DUNC Engine</h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              We operate at the intersection of high-speed data and human-centric design. 
              Our software solutions are built to be resilient, modular, and undeniably fast.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {['Scalability', 'Precision', 'Agility', 'Elegance'].map((item) => (
                <motion.div 
                  key={item}
                  whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,1)" }}
                  className="border border-white/10 p-6 font-mono text-xs uppercase tracking-tighter"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            className="relative h-[500px] border border-white/5 bg-zinc-900/20 backdrop-blur-3xl group"
          >
            <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-9xl font-black opacity-5 group-hover:opacity-20 transition-opacity">DUNC</span>
            </div>
            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute top-10 left-10 p-4 border border-white/20 bg-black text-[10px] font-mono"
            >
              SYSTEM_INIT: OK
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* --- SECTION 03: THE MANTRA (SCROLL SCALE) --- */}
      <section className="h-screen flex items-center justify-center relative">
        <motion.div 
          style={{ scale: useTransform(scrollYProgress, [0.6, 0.9], [0.5, 1.5]) }}
          className="text-center"
        >
          <h2 className="text-7xl md:text-9xl font-black uppercase opacity-20">Innovate</h2>
          <h2 className="text-7xl md:text-9xl font-black uppercase">Dominate</h2>
          <h2 className="text-7xl md:text-9xl font-black uppercase opacity-20">Repeat</h2>
        </motion.div>
      </section>
      {/* --- ULTRA FOOTER --- */}
      <Footer />
    </motion.main>
    
  );
};

export default About;