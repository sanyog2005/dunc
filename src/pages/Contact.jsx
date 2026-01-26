import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone, Globe, ShieldCheck, Activity, Zap } from 'lucide-react';

const Contact = () => {
  const [status, setStatus] = useState("SYSTEM_IDLE");
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Live clock for that "Command Center" feel
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const containerVars = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  const fadeReveal = {
    initial: { opacity: 0, filter: "blur(10px)", y: 20 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.main 
      variants={containerVars}
      initial="initial"
      animate="animate"
      className="relative pt-32 pb-10 px-6 md:px-20 min-h-screen bg-[#020202] text-white overflow-hidden selection:bg-white selection:text-black"
    >
      {/* --- BACKGROUND DATA STREAM --- */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white via-transparent to-white" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-white via-transparent to-white" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* --- LEFT SIDE: THE GLOBAL UPLINK --- */}
        <div className="lg:col-span-5 space-y-12">
          <motion.div variants={fadeReveal}>
            <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] mb-4">
              <Activity size={12} className="text-green-500" /> Uplink established // {time}
            </div>
            <h1 className="text-7xl md:text-[9vw] font-black uppercase leading-[0.85] tracking-tighter">
              GET IN <br /> <span className="text-outline text-transparent italic">ORBIT.</span>
            </h1>
          </motion.div>

          {/* SENSORY DATA CARDS */}
          <motion.div variants={fadeReveal} className="grid grid-cols-1 gap-4">
            {[
              { label: "Voice Frequency", val: "+91 8750625105", icon: <Phone size={18}/>, desc: "Direct Secure Line" },
              { label: "Secure Mail", val: "duncxtech@gmail.com", icon: <Mail size={18}/>, desc: "256-bit Encrypted" },
              { label: "Geo-Location", val: "Delhi, India", icon: <MapPin size={18}/>, desc: "Technical Campus Base" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.03)" }}
                className="p-6 border border-white/5 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="text-zinc-500 group-hover:text-white transition-colors">{item.icon}</div>
                  <div>
                    <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{item.label}</p>
                    <p className="text-lg font-bold uppercase tracking-tight">{item.val}</p>
                  </div>
                </div>
                <div className="hidden md:block text-[9px] font-mono text-zinc-800 uppercase tracking-tighter group-hover:text-zinc-500 transition-colors">
                  {item.desc}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* DYNAMIC SYSTEM LOG */}
          <motion.div 
            variants={fadeReveal} 
            className="p-8 bg-zinc-950 border-l-2 border-white/20 font-mono text-[10px] uppercase space-y-3 shadow-2xl"
          >
            <div className="flex justify-between text-zinc-600">
              <span>// SECURITY_PROTOCOL_V4</span>
              <span>EST: 2026</span>
            </div>
            <div className="space-y-1">
              <p className="text-white flex items-center gap-2">
                <ShieldCheck size={12} className="text-green-500" /> Firewall: Active
              </p>
              <p className="text-zinc-400">Current Action: <span className="text-white">{status}</span></p>
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT SIDE: MISSION CONTROL FORM --- */}
        <motion.div variants={fadeReveal} className="lg:col-span-7 bg-white/[0.01] border border-white/5 p-8 md:p-12 rounded-2xl backdrop-blur-sm">
          <form 
            className="space-y-10"
            onFocus={() => setStatus("CAPTURING_INPUT")}
            onBlur={() => setStatus("SYSTEM_IDLE")}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest">Operator Identity</label>
                <input type="text" placeholder="ENTER NAME" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white transition-all font-black uppercase text-2xl placeholder:text-zinc-900" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest">Return Frequency</label>
                <input type="email" placeholder="ENTER EMAIL" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white transition-all font-black uppercase text-2xl placeholder:text-zinc-900" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest">Mission Briefing</label>
              <textarea rows="5" placeholder="DESCRIBE YOUR VISION" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white transition-all resize-none font-black uppercase text-2xl placeholder:text-zinc-900" />
            </div>

            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: "#fff", color: "#000" }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-4 border border-white/20 py-8 uppercase font-black text-xs tracking-[0.5em] transition-all group"
            >
              <Zap size={16} className="group-hover:fill-current" /> Initialize Transmission <Send size={16} />
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* --- FOOTER: DATA SUMMARY --- */}
      <footer className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-mono uppercase tracking-[0.4em] text-zinc-600">
        <div className="flex gap-10">
          <p>© 2026 DUNC_SOLUTIONS // ALL_RIGHTS_RESERVED</p>
          <p className="hidden md:block text-zinc-800">Designed for Intelligence</p>
        </div>
        <div className="flex gap-8">
          {['LinkedIn', 'Twitter', 'Github'].map(link => (
            <a key={link} href="#" className="hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">{link}</a>
          ))}
        </div>
      </footer>
    </motion.main>
  );
};

export default Contact;