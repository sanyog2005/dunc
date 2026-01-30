import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowRight, Github, Twitter, Linkedin, Cpu, Shield, Zap, X, ExternalLink, Terminal, Command, Radio, Globe, Smartphone, Layers, Database } from 'lucide-react';
import logo from '../assets/logo.svg';
import Footer from './Footer';

// --- ENGINE: SMOOTH SCROLL & PHYSICS ---

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
        transition={{ duration: 1 }}
        className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.3)] z-10 rounded-full"
      />
      <div className="absolute inset-[-10%] border-[1px] border-white/10 rounded-full animate-[spin_15s_linear_infinite]" />
      <div className="absolute inset-[-5%] border-[1px] border-dashed border-white/20 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
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

// --- HELPER: SPOTLIGHT CARD (Moved Outside) ---
const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(255, 255, 255, 0.15)" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative border border-white/10 bg-zinc-900/50 overflow-hidden ${className}`}
    >
      {/* Spotlight Effect Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />
      {/* Inner Content */}
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// --- SCROLL MORPH SVG ---
const ScrollMorph = () => {
  const { scrollYProgress } = useScroll();
  
  // Define 4 states of an 8-point polygon (0-100 coordinate space)
  const shape1 = "M30 0 L70 0 L100 30 L100 70 L70 100 L30 100 L0 70 L0 30 Z"; // Octagon
  const shape2 = "M10 10 L90 10 L90 90 L50 90 L10 90 L10 50 L10 10 L50 10 Z"; // Square-ish (mapped points)
  const shape3 = "M50 0 L100 50 L50 100 L0 50 L50 0 L100 50 L50 100 L0 50 Z"; // Diamond (doubled points to match 8)
  
  // Using simple interpolation
  const path = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [shape1, shape3, shape1, shape3]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.1, 0.15, 0.15, 0]);
  const color = useTransform(scrollYProgress, [0, 0.5, 1], ["#ffffff", "#555555", "#ffffff"]);

  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <motion.svg
        viewBox="0 0 100 100"
        style={{ rotate, scale, opacity }}
        className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] opacity-10"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          strokeDasharray="2 2"
          filter="url(#glow)"
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
        
        <motion.circle cx="50" cy="50" r="30" stroke="white" strokeWidth="0.1" strokeOpacity="0.2" strokeDasharray="4 4" 
           animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </motion.svg>
    </div>
  );
};

const Home = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { scrollYProgress } = useScroll();
  const heroTextY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const projects = useMemo(() => [
    { id: "01", title: "PARK-KING", tag: "AI VISION", desc: "A MERN stack solution for renting private parking spaces with AI-powered number plate recognition.", tech: ["React", "Node.js", "OpenCV", "Python"], metrics: "99.9% Detection Accuracy" },
    { id: "02", title: "WORKBOUNTY", tag: "MARKETPLACE", desc: "A digital problem-solving marketplace facilitating squad-based collaboration and asset trading.", tech: ["MERN Stack", "Framer Motion", "Tailwind"], metrics: "Elastic Talent Pool" },
  ], []);

  const services = [
    {
      id: "01",
      title: "Web Architecture",
      desc: "Scalable React & Next.js ecosystems designed for high-velocity rendering.",
      icon: <Globe size={24} />,
      tags: ["React", "Next.js", "Three.js"]
    },
    {
      id: "02",
      title: "App Ecosystems",
      desc: "Native-feel mobile solutions bridging Android and iOS via React Native.",
      icon: <Smartphone size={24} />,
      tags: ["React Native", "Expo", "Swift"]
    },
    {
      id: "03",
      title: "Backend Forge",
      desc: "Robust API layers and database architecture ensuring 99.9% uptime.",
      icon: <Database size={24} />,
      tags: ["Node.js", "PostgreSQL", "Redis"]
    },
    {
      id: "04",
      title: "UI/UX Systems",
      desc: "Human-machine interfaces focused on brutalist aesthetics and usability.",
      icon: <Layers size={24} />,
      tags: ["Figma", "Framer", "Motion"]
    }
  ];

  return (
    <div className="bg-[#020202] text-white selection:bg-white selection:text-black font-sans overflow-x-hidden relative">
      <MatrixBackground />
      <ScrollMorph /> 
      
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
              DUNC | <span className="text-outline text-transparent italic">TECH</span>
            </motion.h1>
            <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} className="h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent mx-auto max-w-xs md:max-w-none" />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-zinc-500 font-mono uppercase text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.8em]">
              Software Solutions & Data Architecture
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* --- VISION MARQUEE --- */}
      <div className="py-12 md:py-20 border-y border-white/5 bg-zinc-950 overflow-hidden whitespace-nowrap z-10 relative">
        <motion.h2 style={{ x: marqueeX }} className="text-[15vw] md:text-[10vw] font-black uppercase text-outline opacity-10 leading-none">
          SCALABILITY · PRECISION · AUTONOMY · ENCRYPTION · VELOCITY ·
        </motion.h2>
      </div>

      {/* --- BENTO GRID (Mission) --- */}
      <section className="relative z-10 py-20 md:py-40 px-4 md:px-20 border-b border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* --- 1. CORE MISSION (Big Card) --- */}
          <div className="md:col-span-8 h-full">
            <SpotlightCard className="h-full p-8 md:p-16">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)] opacity-50 group-hover:scale-150 transition-transform duration-[2000ms]" />
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start mb-12">
                  <h2 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full bg-white/5">
                    / 01 Core Mission
                  </h2>
                  <Terminal size={20} className="text-zinc-700 group-hover:text-white transition-colors" />
                </div>

                <div className="mb-8">
                  <h3 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter text-white">
                    We Architect <br />
                    <span className="block mt-2">
                      Digital 
                      <span className="relative ml-2 inline-block text-transparent stroke-text group-hover:text-white transition-colors duration-500 italic">
                        <span className="absolute inset-0 text-outline text-white/30" aria-hidden="true">Supremacy.</span>
                        Supremacy.
                      </span>
                    </span>
                  </h3>
                </div>

                <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between">
                  <p className="text-sm md:text-lg text-zinc-400 font-light max-w-md leading-relaxed">
                    From <span className="text-white font-mono">DELHI_HQ</span> to global markets, DUNC specializes in resilient digital assets via AI & optimized MERN architecture.
                  </p>
                  
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 cursor-pointer">
                     <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* --- 2. SIDE STATS (Small Cards) --- */}
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4 h-full">
            
            {/* Security Card */}
            <SpotlightCard className="p-8 flex flex-col justify-between min-h-[240px]">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/5 rounded-lg text-zinc-400 group-hover:text-white group-hover:bg-white/10 transition-all">
                  <Shield size={24} />
                </div>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div>
                <h4 className="text-3xl font-black text-white mb-2">100%</h4>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  Security Protocols
                </p>
              </div>
            </SpotlightCard>

            {/* Logic Card */}
            <SpotlightCard className="p-8 flex flex-col justify-between min-h-[240px]">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/5 rounded-lg text-zinc-400 group-hover:text-white group-hover:bg-white/10 transition-all">
                  <Cpu size={24} />
                </div>
                <div className="flex gap-1">
                  <span className="w-0.5 h-3 bg-zinc-700 group-hover:bg-white transition-colors delay-75" />
                  <span className="w-0.5 h-3 bg-zinc-700 group-hover:bg-white transition-colors delay-100" />
                  <span className="w-0.5 h-3 bg-zinc-700 group-hover:bg-white transition-colors delay-150" />
                </div>
              </div>
              <div>
                <h4 className="text-3xl font-black text-white mb-2">0.0ms</h4>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  Logic Latency
                </p>
              </div>
            </SpotlightCard>

          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="py-20 md:py-40 px-4 md:px-20 relative z-10 bg-[#020202]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <h2 className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-6">/ 02 Capabilities</h2>
              <h3 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter leading-[0.9]">
                System <span className="text-zinc-700">Modules</span>
              </h3>
            </div>
            <p className="text-zinc-500 text-xs md:text-sm font-mono max-w-xs uppercase tracking-widest text-right">
              Deploying high-performance<br/>frameworks for the modern web.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-950 p-8 md:p-12 h-full hover:bg-zinc-900 transition-colors group relative"
              >
                <div className="flex justify-between items-start mb-8 md:mb-12">
                  <div className="p-3 bg-white/5 rounded-none text-white group-hover:scale-110 transition-transform duration-500">
                    {service.icon}
                  </div>
                  <span className="font-mono text-[9px] text-zinc-600">0{index + 1}</span>
                </div>
                
                <h4 className="text-xl md:text-2xl font-bold uppercase mb-4 tracking-tight group-hover:text-white transition-colors">
                  {service.title}
                </h4>
                
                <p className="text-zinc-500 text-xs md:text-sm leading-relaxed mb-8 font-mono">
                  {service.desc}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {service.tags.map((tag) => (
                    <span key={tag} className="text-[8px] uppercase tracking-wider text-zinc-600 border border-white/5 px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
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
      <section className="py-40 px-4 md:px-20 text-center relative overflow-hidden bg-[#020202] border-t border-white/5">
        <motion.div whileInView={{ opacity: [0, 1], y: [40, 0] }} viewport={{ margin: "-100px" }} className="relative z-10">
          <h2 className="text-5xl sm:text-6xl md:text-[16vw] font-black uppercase leading-[0.8] md:leading-[0.7] tracking-tighter mb-16 text-white">READY TO <br /> <span className="text-outline text-transparent italic">EVOLVE?</span></h2>
          <a href="mailto:duncxtech@gmail.com" className="text-lg md:text-5xl font-mono underline underline-offset-[8px] md:underline-offset-[16px] text-white hover:text-zinc-400 transition-all uppercase tracking-tighter break-all">duncxtech@gmail.com</a>
        </motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-white opacity-[0.02] blur-[100px] md:blur-[180px] rounded-full pointer-events-none" />
      </section>

      <Footer/>
    </div>
  );
};

export default Home;