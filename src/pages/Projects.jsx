import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Terminal, Cpu, Database, ArrowUpRight } from 'lucide-react';

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    { 
      title: "ParkKing", 
      category: "AI Vision // MERN", 
      icon: <Database size={20} />,
      desc: "Architecting high-performance parking systems with real-time AI number plate recognition logic.",
      url: "https://parking-front-bh45.vercel.app/", 
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070" 
    },
    { 
      title: "EsthAI", 
      category: "Full Stack", 
      icon: <Terminal size={20} />,
      desc: "A AI based startup website that offers various AI tools and services to users.",
      url: "https://esth-ai.vercel.app/",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
    },
    { 
      title: "Vishal Tent House", 
      category: "Web Dev", 
      icon: <Cpu size={20} />,
      desc: "A responsive website for a tent rental service, showcasing offerings and enabling online bookings.",
      url: "https://vishal-tent-house.vercel.app/",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070"
    }
  ];

  return (
    <section className="bg-[#020202] py-40 px-6 md:px-20 relative overflow-hidden selection:bg-white selection:text-black">
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-zinc-800/20 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto mb-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.6em] block mb-6">
            / Intelligence_Showcase
          </span>
          <h2 className="text-7xl md:text-[12vw] font-black uppercase tracking-tighter leading-[0.8] mb-12">
            THE <br /> <span className="text-outline text-transparent italic transition-all duration-700">ARCHIVE.</span>
          </h2>
        </motion.div>
      </div>

      {/* INTERACTIVE LIST */}
      <div className="relative z-10 max-w-7xl mx-auto group/list">
        {projects.map((project, i) => (
          <motion.a
            href={project.url}
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative block py-16 border-b border-white/10 group overflow-hidden"
          >
            {/* CONTENT LAYER */}
            <div className="relative z-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mix-blend-difference">
              <div className="flex items-center gap-10">
                <span className="text-zinc-600 font-mono text-xl group-hover:text-white transition-colors duration-500">
                  {i + 1}.
                </span>
                <div>
                  <div className="flex items-center gap-3 text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-4">
                    {project.icon} {project.category}
                  </div>
                  <h3 className="text-6xl md:text-[8vw] font-black uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]">
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="max-w-xs opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                  {project.desc}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white">
                  INITIALIZE UPLINK <ArrowUpRight size={14} />
                </div>
              </div>
            </div>

            {/* THE "NEVER SEEN BEFORE" REVEAL: IMAGE OVERLAY */}
            <AnimatePresence>
              {hoveredIndex === i && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, x: -100 }}
                  animate={{ opacity: 0.4, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 1.1, x: 100 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-10 pointer-events-none"
                >
                  <img 
                    src={project.image} 
                    alt="" 
                    className="w-full h-full object-cover grayscale brightness-50 contrast-125 shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* MASKING BAR (Fills on hover) */}
            <motion.div 
              className="absolute bottom-0 left-0 h-1 bg-white z-30"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.a>
        ))}
      </div>

      {/* SYSTEM STATUS FOOTER */}
      <div className="mt-32 max-w-7xl mx-auto flex justify-between items-center text-[10px] font-mono text-zinc-700 uppercase tracking-widest border-t border-white/5 pt-10">
        <p>Total Assets: {projects.length}</p>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          System: Optimal
        </div>
      </div>
    </section>
  );
};

export default Projects;