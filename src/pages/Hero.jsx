import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Github, Twitter, Linkedin, Cpu, Shield, Zap, X, ExternalLink, Terminal, Command, Radio } from 'lucide-react';
import Lenis from '@studio-freight/lenis';
import logo from '../assets/U.png';

// --- ENGINE: SMOOTH SCROLL & PHYSICS ---
const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), orientation: 'vertical', gestureOrientation: 'vertical', smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
};

const HeroImage = () => {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const smoothRotate = useSpring(rotate, { stiffness: 50, damping: 20 });
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <motion.div 
      style={{ rotate: smoothRotate, scale, opacity }}
      className="relative w-[75vw] h-[75vw] md:w-[35vw] md:h-[35vw] flex items-center justify-center pointer-events-none mb-8 md:mb-12"
    >
      <motion.img 
        src={logo} 
        alt="DUNC Logo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.3)] z-10 rounded-full"
      />
      <div className="absolute inset-[-10%] border-[1px] border-white/10 rounded-full animate-[spin_15s_linear_infinite]" />
      <div className="absolute inset-[-5%] border-[1px] border-dashed border-white/20 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-white/5 rounded-full blur-3xl"
      />
    </motion.div>
  );
};

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
    <motion.button ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ x: springX, y: springY }} className={className}>
      {children}
    </motion.button>
  );
};

const MatrixBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const chars = '01ABCDEFHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%';
    const fontSize = 16;
    const drops = new Array(Math.floor(width / fontSize)).fill(1);
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#ffffff';
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none" />;
};

const Home = () => {
  useSmoothScroll();
  const [selectedProject, setSelectedProject] = useState(null);
  const { scrollYProgress } = useScroll();
  const heroTextY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const projects = useMemo(() => [
    { id: "01", title: "PARK-KING", tag: "AI VISION", desc: "A MERN stack solution for renting private parking spaces with AI-powered number plate recognition.", tech: ["React", "Node.js", "OpenCV", "Python"], metrics: "99.9% Detection Accuracy" },
    { id: "02", title: "WORKBOUNTY", tag: "MARKETPLACE", desc: "A digital problem-solving marketplace facilitating squad-based collaboration and asset trading.", tech: ["MERN Stack", "Framer Motion", "Tailwind"], metrics: "Elastic Talent Pool" },
    { id: "03", title: "HIRELENS", tag: "AI COACHING", desc: "AI-powered behavioral interview coach analyzing emotional states from video for data-driven hiring.", tech: ["Python", "Flask", "DeepFace", "ML"], metrics: "Emotional Intelligence API" }
  ], []);

  return (
    <div className="bg-[#020202] text-white selection:bg-white selection:text-black font-sans overflow-x-hidden">
      <MatrixBackground />
      <motion.div style={{ scaleX: useSpring(scrollYProgress, { stiffness: 100, damping: 30 }) }} className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-[100]" />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-6 overflow-hidden py-20">
        <motion.div style={{ y: heroTextY }} className="z-10 flex flex-col items-center w-full">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-8 md:mb-12 text-zinc-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-center">
            <Radio size={12} className="text-white animate-pulse" /> 
            Neural Connection: Established // {new Date().getFullYear()}
          </motion.div>
          <HeroImage />
          <div className="text-center mt-4 md:mt-8 space-y-4 px-4 w-full">
            <motion.h1 initial={{ opacity: 0, letterSpacing: "0.5em" }} animate={{ opacity: 1, letterSpacing: "0.2em" }} className="text-3xl sm:text-4xl md:text-6xl font-black uppercase text-white tracking-[0.2em] md:tracking-[0.4em] leading-tight">
              DUNC X <span className="text-outline text-transparent italic">TECH</span>
            </motion.h1>
            <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} className="h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent mx-auto max-w-xs md:max-w-none" />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-zinc-500 font-mono uppercase text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.8em]">
              Software Solutions & Data Architecture
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* --- VISION MARQUEE --- */}
      <div className="py-12 md:py-20 border-y border-white/5 bg-zinc-950 overflow-hidden whitespace-nowrap">
        <motion.h2 style={{ x: marqueeX }} className="text-[15vw] md:text-[10vw] font-black uppercase text-outline opacity-10 leading-none">
          SCALABILITY · PRECISION · AUTONOMY · ENCRYPTION · VELOCITY ·
        </motion.h2>
      </div>

      {/* --- BENTO GRID --- */}
      <section className="relative z-10 py-20 md:py-40 px-4 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} viewport={{ once: true }} className="md:col-span-8 p-8 md:p-16 bg-zinc-950 border border-white/5 relative group overflow-hidden">
            <h2 className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-10 md:mb-16">/ 01 Core Mission</h2>
            <p className="text-3xl sm:text-4xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-8 md:mb-12">
              We architect <br /> digital <span className="text-outline text-transparent italic">supremacy.</span>
            </p>
            <p className="text-base md:text-xl text-zinc-500 font-light max-w-xl">
              From Delhi to global markets, DUNC specializes in building resilient digital assets through AI and optimized MERN code.
            </p>
            <Terminal size={300} className="absolute -right-20 -bottom-20 opacity-[0.02] hidden md:block" />
          </motion.div>
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-6">
            {[{icon: <Shield />, label: 'Security'}, {icon: <Cpu />, label: 'Logic'}].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="p-8 md:p-12 border border-white/5 bg-zinc-950 flex flex-col justify-between aspect-square group">
                <div className="text-white scale-75 md:scale-100">{item.icon}</div>
                <span className="font-mono text-[9px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.4em] text-zinc-500">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECTS --- */}
      <section className="py-20 md:py-40 px-4 md:px-20 bg-white text-black rounded-t-[40px] md:rounded-t-[120px] relative z-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] md:tracking-[0.8em] mb-20 md:mb-40 text-zinc-400 px-2">Selected Works_</h2>
          <div className="space-y-0 w-full">
            {projects.map((proj) => (
              <motion.div key={proj.id} onClick={() => setSelectedProject(proj)} whileHover={{ x: 10 }} className="border-b border-black/10 py-12 md:py-24 flex justify-between items-center cursor-pointer group transition-all px-2">
                <div className="flex items-center gap-6 md:gap-24">
                  <span className="text-zinc-300 font-mono text-xs md:text-sm">{proj.id}</span>
                  <h3 className="text-3xl sm:text-5xl md:text-[11vw] font-black uppercase tracking-tighter group-hover:italic transition-all leading-[0.8] truncate max-w-[60vw] md:max-w-none">
                    {proj.title}
                  </h3>
                </div>
                <div className="flex flex-col items-end gap-2 md:gap-6 opacity-40 md:opacity-0 md:group-hover:opacity-100 transition-all">
                  <span className="text-[8px] md:text-[10px] font-mono uppercase tracking-widest hidden sm:block">{proj.tag}</span>
                  <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                    <ArrowRight size={20} className="md:w-8 md:h-8" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECT MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-black/98 backdrop-blur-3xl" />
            <motion.div initial={{ scale: 0.95, y: 50, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 50, opacity: 0 }} className="relative bg-zinc-950 border border-white/10 p-6 md:p-24 max-w-7xl w-full max-h-[90vh] overflow-y-auto rounded-2xl md:rounded-3xl">
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 md:top-10 md:right-10 text-zinc-500 hover:text-white transition-all"><X size={24} className="md:w-10 md:h-10" /></button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 items-center">
                <div className="space-y-6 md:space-y-12">
                  <div className="flex items-center gap-4 text-zinc-500 font-mono text-[9px] md:text-[10px] uppercase tracking-widest">
                    <Zap size={14} className="text-white" /> Intelligence // {selectedProject.tag}
                  </div>
                  <h2 className="text-4xl sm:text-5xl md:text-[9vw] font-black uppercase leading-[0.8] tracking-tighter">{selectedProject.title}</h2>
                  <p className="text-base md:text-xl text-zinc-400 font-light leading-relaxed">{selectedProject.description}</p>
                  <div className="flex flex-wrap gap-2 md:gap-4">
                    {selectedProject.tech.map(t => <span key={t} className="px-3 md:px-6 py-1 md:py-2 border border-white/10 text-[8px] md:text-[10px] uppercase font-mono bg-white/5">{t}</span>)}
                  </div>
                </div>
                <div className="flex flex-col justify-end gap-8 md:gap-16">
                  <div className="p-8 md:p-16 border border-white/5 bg-white/[0.02]">
                    <span className="text-[9px] md:text-[10px] font-mono text-zinc-600 block mb-4 uppercase tracking-[0.2em] md:tracking-[0.4em]">Core KPI Outcome</span>
                    <div className="text-2xl md:text-5xl font-black uppercase tracking-tighter">{selectedProject.metrics}</div>
                  </div>
                  <MagneticButton className="bg-white text-black py-5 md:py-8 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] flex items-center justify-center gap-4">
                    Deploy Solution <ExternalLink size={16} />
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CONTACT --- */}
      <section className="py-40 px-4 md:px-20 text-center relative overflow-hidden bg-[#020202]">
        <motion.div whileInView={{ opacity: [0, 1], y: [40, 0] }} viewport={{ margin: "-100px" }} className="relative z-10">
          <h2 className="text-5xl sm:text-6xl md:text-[16vw] font-black uppercase leading-[0.8] md:leading-[0.7] tracking-tighter mb-16 text-white">READY TO <br /> <span className="text-outline text-transparent italic">EVOLVE?</span></h2>
          <a href="mailto:hello@dunc.tech" className="text-lg md:text-5xl font-mono underline underline-offset-[8px] md:underline-offset-[16px] text-white hover:text-zinc-400 transition-all uppercase tracking-tighter break-all">hello@dunc.tech</a>
        </motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-white opacity-[0.02] blur-[100px] md:blur-[180px] rounded-full pointer-events-none" />
      </section>

      {/* --- FOOTER --- */}
      <footer className="p-8 md:p-16 border-t border-white/5 bg-black relative z-10 text-[8px] md:text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em] md:tracking-[0.3em]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          <div className="flex justify-center md:justify-start gap-8 md:gap-12">
            <Github size={18} className="hover:text-white transition-colors cursor-pointer" />
            <Twitter size={18} className="hover:text-white transition-colors cursor-pointer" />
            <Linkedin size={18} className="hover:text-white transition-colors cursor-pointer" />
          </div>
          <div className="text-center px-4">© {new Date().getFullYear()} DUNC STUDIO // DELHI technical campus</div>
          <div className="flex justify-center md:justify-end items-center gap-3">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Core Status: Online // 200 OK
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;