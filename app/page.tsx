"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, Variants } from 'framer-motion';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setMounted(true);
    
    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    // Live Clock synced to Jordan time
    const timer = setInterval(() => {
      const timeString = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Amman',
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(timeString);
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(timer);
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // FIXED: Added the :Variants type to these objects for strict TypeScript compliance
  const scrollReveal: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const terminalContainer: Variants = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0.8, delayChildren: 1.2 } }
  };
  
  const terminalLine: Variants = {
    hidden: { opacity: 0, display: "none" },
    show: { opacity: 1, display: "block" }
  };

  const credentials = [
    "Google Project Management Professional",
    "AWS Cloud Foundations",
    "IBM Cloud Essentials",
    "IBM AI App Development (Python/Flask)",
    "IBM DevOps Practices",
    "Hazmat Awareness & Load Refusal",
    "Entry-Level Driver Safety (ELDT)"
  ];

  return (
    <main className="relative font-sans antialiased bg-neutral-950 overflow-hidden text-white selection:bg-white selection:text-black cursor-none pb-24">
      
      {/* 1. ADVANCED: FLOATING EXECUTIVE DOCK */}
      <motion.div 
        initial={{ y: 100, opacity: 0, x: "-50%" }} 
        animate={{ y: 0, opacity: 1, x: "-50%" }} 
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
        className="fixed bottom-6 left-1/2 z-[100] bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-full px-6 py-3 flex items-center gap-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center gap-2 hidden md:flex">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-neutral-400">SYS: ONLINE</span>
        </div>
        
        <div className="w-px h-4 bg-neutral-800 hidden md:block"></div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest">📍 Amman, JO || Khobar, KSA</span>
          {mounted && <span className="text-xs font-mono text-blue-400 tracking-wider bg-blue-900/20 px-2 py-1 rounded">{currentTime}</span>}
        </div>

        <div className="w-px h-4 bg-neutral-800"></div>

        <a 
          href="/Ahmad_Alkhouja_CV.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
          className="text-xs font-bold text-white uppercase tracking-widest hover:text-blue-400 transition-colors flex items-center gap-2 group"
        >
          Download CV 
          <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
        </a>
      </motion.div>

      {/* CUSTOM CURSOR & PROGRESS BAR */}
      <motion.div 
        className="hidden md:flex fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white pointer-events-none z-[110] mix-blend-difference items-center justify-center"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16, scale: isHovering ? 2 : 1 }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      >
        <div className={`w-1 h-1 bg-white rounded-full transition-opacity ${isHovering ? 'opacity-0' : 'opacity-100'}`} />
      </motion.div>

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-[60] shadow-[0_0_20px_rgba(59,130,246,0.8)]" style={{ scaleX }} />

      <div className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 mix-blend-screen" style={{ background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.03), transparent 40%)` }} />
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>

      {/* NAVIGATION */}
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="fixed top-0 w-full z-50 bg-neutral-950/70 backdrop-blur-lg border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="font-bold text-xl tracking-tighter">AA.</div>
          <div className="hidden md:flex gap-8 text-sm font-semibold tracking-widest text-neutral-400 uppercase">
            <a href="#capabilities" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="hover:text-white transition-colors">Capabilities</a>
            <a href="#methodology" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="hover:text-white transition-colors">Process</a>
            <a href="#projects" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="hover:text-white transition-colors">Initiatives</a>
            <a href="#experience" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="hover:text-white transition-colors">Experience</a>
          </div>
          <a href="https://www.instagram.com/YOURMAINMANC9" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="px-5 py-2 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-neutral-300 transition-colors">Contact</a>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-24 pt-20">
        <div className="max-w-6xl grid lg:grid-cols-2 gap-12 items-center mx-auto w-full">
          <motion.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } }} className="space-y-6">
            <motion.div variants={scrollReveal}><h1 className="text-6xl md:text-8xl lg:text-[100px] font-extrabold tracking-tighter text-white leading-none">Ahmad <br/> Alkhouja.</h1></motion.div>
            <motion.div variants={scrollReveal} className="flex gap-4 items-center"><div className="h-[1px] w-12 bg-neutral-500"></div><h2 className="text-xl md:text-2xl font-medium text-blue-400 tracking-widest uppercase">Technical Project Manager</h2></motion.div>
            <motion.div variants={scrollReveal} className="pt-8 flex gap-4">
              <a href="#projects" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-neutral-900 border border-neutral-700 hover:bg-white hover:text-black hover:border-white">
                EXPLORE PORTFOLIO <svg className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }} className="rounded-xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-md shadow-2xl overflow-hidden">
            <div className="flex items-center px-4 py-3 bg-neutral-900 border-b border-neutral-800">
              <div className="flex space-x-2"><div className="w-3 h-3 rounded-full bg-red-500/80"></div><div className="w-3 h-3 rounded-full bg-yellow-500/80"></div><div className="w-3 h-3 rounded-full bg-green-500/80"></div></div>
              <div className="ml-4 text-xs font-mono text-neutral-500">bash — system_init.sh</div>
            </div>
            <motion.div variants={terminalContainer} initial="hidden" animate="show" className="p-6 font-mono text-sm leading-relaxed text-neutral-300 h-[280px]">
              <motion.div variants={terminalLine}><p><span className="text-emerald-400">~</span>$ whoami</p><p className="text-white mb-4">{'>'} Ahmad_Alkhouja</p></motion.div>
              <motion.div variants={terminalLine}><p><span className="text-emerald-400">~</span>$ cat core_competencies.txt</p><p className="text-neutral-400 mb-4">{'>'} SDLC Management, Agile Transformation, Cross-Functional Leadership, Cloud Infrastructure Delivery, API Integration.</p></motion.div>
              <motion.div variants={terminalLine}><p><span className="text-emerald-400">~</span>$ ls current_stack/</p><p className="text-blue-400 mb-4">react.ts  python.py  java.class  cpp.obj  aws_cloud  samsara_api</p></motion.div>
              <motion.p variants={terminalLine} className="animate-pulse text-emerald-400">_</motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* METRICS BAR */}
      <section className="relative z-10 border-y border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-neutral-800 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.8 }} variants={scrollReveal}><h4 className="text-4xl md:text-5xl font-black text-white">20+</h4><p className="text-xs text-neutral-500 font-bold tracking-widest uppercase mt-2">Certifications</p></motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.8 }} variants={scrollReveal}><h4 className="text-4xl md:text-5xl font-black text-white">100%</h4><p className="text-xs text-neutral-500 font-bold tracking-widest uppercase mt-2">Delivery Rate</p></motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.8 }} variants={scrollReveal}><h4 className="text-4xl md:text-5xl font-black text-white">Agile</h4><p className="text-xs text-neutral-500 font-bold tracking-widest uppercase mt-2">Methodology</p></motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.8 }} variants={scrollReveal}><h4 className="text-4xl md:text-5xl font-black text-white">Full</h4><p className="text-xs text-neutral-500 font-bold tracking-widest uppercase mt-2">Stack Engineering</p></motion.div>
        </div>
      </section>

      {/* THE DELIVERY LIFECYCLE (Methodology Pipeline) */}
      <section id="methodology" className="relative z-10 px-8 md:px-24 py-32 bg-black border-b border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <motion.h3 initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.8 }} variants={scrollReveal} className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4 text-center">
            Execution Framework
          </motion.h3>
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.8 }} variants={scrollReveal} className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-20 text-center">
            The Delivery Pipeline.
          </motion.h2>

          <div className="relative">
            {/* Horizontal Line connecting nodes */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-neutral-800 -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {/* Step 1 */}
              <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} variants={scrollReveal} className="bg-neutral-950 border border-neutral-800 p-8 rounded-xl hover:border-blue-500 transition-colors group">
                <div className="w-12 h-12 bg-neutral-900 border border-neutral-700 text-blue-400 rounded-full flex items-center justify-center font-bold font-mono mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(59,130,246,0)] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] mx-auto md:mx-0">
                  01
                </div>
                <h4 className="text-xl font-bold text-white mb-3 text-center md:text-left">Scope & Strategy</h4>
                <p className="text-neutral-500 text-sm leading-relaxed text-center md:text-left">Translating stakeholder requirements into actionable technical blueprints and setting rigorous project milestones.</p>
              </motion.div>

              {/* Step 2 */}
              <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} variants={scrollReveal} className="bg-neutral-950 border border-neutral-800 p-8 rounded-xl hover:border-emerald-500 transition-colors group">
                <div className="w-12 h-12 bg-neutral-900 border border-neutral-700 text-emerald-400 rounded-full flex items-center justify-center font-bold font-mono mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0)] group-hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] mx-auto md:mx-0">
                  02
                </div>
                <h4 className="text-xl font-bold text-white mb-3 text-center md:text-left">System Architecture</h4>
                <p className="text-neutral-500 text-sm leading-relaxed text-center md:text-left">Designing the stack infrastructure (APIs, Cloud, DBs) ensuring scalability and eliminating technical debt early.</p>
              </motion.div>

              {/* Step 3 */}
              <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} variants={scrollReveal} className="bg-neutral-950 border border-neutral-800 p-8 rounded-xl hover:border-purple-500 transition-colors group">
                <div className="w-12 h-12 bg-neutral-900 border border-neutral-700 text-purple-400 rounded-full flex items-center justify-center font-bold font-mono mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,85,247,0)] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] mx-auto md:mx-0">
                  03
                </div>
                <h4 className="text-xl font-bold text-white mb-3 text-center md:text-left">Agile Execution</h4>
                <p className="text-neutral-500 text-sm leading-relaxed text-center md:text-left">Driving sprints, managing resource allocation, and maintaining velocity across cross-functional engineering teams.</p>
              </motion.div>

              {/* Step 4 */}
              <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} variants={scrollReveal} className="bg-neutral-950 border border-neutral-800 p-8 rounded-xl hover:border-white transition-colors group">
                <div className="w-12 h-12 bg-neutral-900 border border-neutral-700 text-white rounded-full flex items-center justify-center font-bold font-mono mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,255,255,0)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] mx-auto md:mx-0">
                  04
                </div>
                <h4 className="text-xl font-bold text-white mb-3 text-center md:text-left">QA & Deployment</h4>
                <p className="text-neutral-500 text-sm leading-relaxed text-center md:text-left">Enforcing rigorous compliance protocols, performing technical audits, and overseeing seamless cloud deployment.</p>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* STRATEGIC CAPABILITIES */}
      <section id="capabilities" className="relative z-10 px-8 md:px-24 py-32 bg-white text-black selection:bg-black selection:text-white">
        <motion.div className="max-w-6xl mx-auto" initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} variants={scrollReveal}>
          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-5">
              <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Strategic Value</h3>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">Bridging Execution and Architecture.</h2>
              <p className="mt-6 text-lg text-neutral-600 leading-relaxed font-medium">
                I operate at the intersection of technical architecture and business strategy. My foundation in full-stack development allows me to translate complex technical constraints into actionable business roadmaps, eliminating silos and mitigating risk across the software development lifecycle.
              </p>
            </div>
            
            <div className="md:col-span-7 grid sm:grid-cols-2 gap-8">
              <div className="p-8 bg-neutral-50 border border-neutral-200 hover:border-black transition-colors duration-300">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold mb-6">01</div>
                <h4 className="font-bold text-xl mb-3">SDLC Management & Agile</h4>
                <p className="text-neutral-600 text-sm leading-relaxed">Directing end-to-end software development lifecycles utilizing Agile methodologies. Expertise in translating stakeholder requirements into actionable engineering sprints.</p>
              </div>
              <div className="p-8 bg-neutral-50 border border-neutral-200 hover:border-black transition-colors duration-300">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold mb-6">02</div>
                <h4 className="font-bold text-xl mb-3">Cloud & System Integration</h4>
                <p className="text-neutral-600 text-sm leading-relaxed">Overseeing the architecture of scalable telemetry tracking pipelines and enterprise web environments, ensuring seamless API integrations.</p>
              </div>
              <div className="p-8 bg-neutral-50 border border-neutral-200 sm:col-span-2 hover:border-black transition-colors duration-300">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold mb-6">03</div>
                <h4 className="font-bold text-xl mb-3">Risk Mitigation & QA Compliance</h4>
                <p className="text-neutral-600 text-sm leading-relaxed">Enforcing strict quality control frameworks, technical audits, and continuous improvement protocols. Certified by Google, I prioritize resolving technical debt and maintaining regulatory logistics compliance.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* INFINITE MARQUEE */}
      <section className="relative z-10 py-12 bg-black border-y border-neutral-800 overflow-hidden flex items-center">
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 25 }} className="flex whitespace-nowrap">
          <h2 className="text-5xl md:text-7xl font-black uppercase text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] mx-4">
            TECHNICAL PROJECT MANAGER • SOFTWARE LIFECYCLE • AGILE DELIVERY • FULL STACK ARCHITECTURE • QUALITY ASSURANCE • 
          </h2>
          <h2 className="text-5xl md:text-7xl font-black uppercase text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] mx-4">
            TECHNICAL PROJECT MANAGER • SOFTWARE LIFECYCLE • AGILE DELIVERY • FULL STACK ARCHITECTURE • QUALITY ASSURANCE • 
          </h2>
        </motion.div>
      </section>

      {/* PROJECT SPOTLIGHT */}
      <section id="projects" className="relative z-10 px-8 md:px-24 py-32">
        <div className="max-w-6xl mx-auto">
          <motion.h3 initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.8 }} variants={scrollReveal} className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-16 text-center">
            Featured Architecture
          </motion.h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="group relative p-10 border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-500 overflow-hidden rounded-2xl cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 space-y-4">
                <div className="text-blue-400 font-mono text-sm">01 // AUTOMATION</div>
                <h4 className="text-3xl font-bold text-white">Fleet Tracking Telemetry</h4>
                <p className="text-neutral-400 leading-relaxed pt-2">Architected custom tracking automation by integrating the Samsara API with Telegram bots, streamlining logistics visibility and operational response times.</p>
              </div>
            </motion.div>

            <motion.div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="group relative p-10 border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-500 overflow-hidden rounded-2xl cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 space-y-4">
                <div className="text-emerald-400 font-mono text-sm">02 // INFRASTRUCTURE</div>
                <h4 className="text-3xl font-bold text-white">Corporate Web Systems</h4>
                <p className="text-neutral-400 leading-relaxed pt-2">Managed and optimized corporate web presence utilizing WordPress and custom CSS, aligning front-end deployment with strategic marketing metrics.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EXPANDED CERTIFICATIONS GRID */}
      <section className="relative z-10 px-8 md:px-24 py-32 bg-neutral-900 border-y border-neutral-800">
        <motion.div className="max-w-6xl mx-auto" initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}>
          <div className="flex justify-between items-end mb-12">
            <motion.h3 variants={scrollReveal} className="text-sm font-bold text-neutral-500 uppercase tracking-widest">
              Credentials & Certifications
            </motion.h3>
            <motion.div variants={scrollReveal} className="hidden md:block text-xs font-mono text-neutral-500">
              Showing 7 of 20 verified credentials
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {credentials.map((cert, index) => (
              <motion.div 
                key={index} variants={scrollReveal} 
                onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                className="p-6 bg-neutral-950 border border-neutral-800 hover:border-neutral-500 hover:bg-neutral-900 transition-all duration-300 flex flex-col justify-between group rounded-xl"
              >
                <span className="font-bold text-neutral-300 group-hover:text-white transition-colors">{cert}</span>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase group-hover:text-neutral-400">Verified Badge</span>
                  <div className="h-2 w-2 rounded-full bg-blue-500 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* EXPERIENCE TIMELINE */}
      <section id="experience" className="relative z-10 px-8 md:px-24 py-32 bg-neutral-950 border-t border-neutral-800">
        <div className="max-w-5xl mx-auto">
          <motion.h3 initial="hidden" whileInView="show" viewport={{ once: false, amount: 1 }} variants={scrollReveal} className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-16 text-center">
            Career Trajectory
          </motion.h3>
          <div className="space-y-16">
            
            <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} variants={scrollReveal} className="relative pl-8 md:pl-0">
              <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-neutral-800"></div>
              <div className="md:grid md:grid-cols-12 gap-8 items-start group">
                <div className="md:col-span-3 md:text-right pt-1"><span className="text-sm font-bold text-neutral-500 uppercase tracking-wider group-hover:text-blue-400 transition-colors">6-Month Project</span></div>
                <div className="md:col-span-1 hidden md:flex justify-center relative">
                  <div className="absolute top-0 bottom-[-4rem] w-px bg-neutral-800 group-hover:bg-neutral-600 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-neutral-700 border-2 border-neutral-950 relative z-10 mt-1.5 group-hover:bg-blue-400 group-hover:scale-150 transition-all duration-300"></div>
                </div>
                <div className="md:col-span-8 pb-8">
                  <h4 className="text-2xl font-bold text-white mb-1">Technical Project Manager <span className="text-neutral-500 font-normal text-lg">| Part-Time</span></h4>
                  <h5 className="text-lg font-medium text-blue-400 mb-4">Microsoft</h5>
                  <p className="text-neutral-400 leading-relaxed">Directed a targeted regional initiative, overseeing the execution and alignment of high-level technical projects. Managed stakeholder communications, resource allocation, and risk mitigation.</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} variants={scrollReveal} className="relative pl-8 md:pl-0">
              <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-neutral-800"></div>
              <div className="md:grid md:grid-cols-12 gap-8 items-start group">
                <div className="md:col-span-3 md:text-right pt-1"><span className="text-sm font-bold text-neutral-500 uppercase tracking-wider group-hover:text-blue-400 transition-colors">Present</span></div>
                <div className="md:col-span-1 hidden md:flex justify-center relative">
                  <div className="absolute top-0 bottom-[-4rem] w-px bg-neutral-800 group-hover:bg-neutral-600 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-neutral-700 border-2 border-neutral-950 relative z-10 mt-1.5 group-hover:bg-blue-400 group-hover:scale-150 transition-all duration-300"></div>
                </div>
                <div className="md:col-span-8 pb-8">
                  <h4 className="text-2xl font-bold text-white mb-1">Technical Project Manager</h4>
                  <h5 className="text-lg font-medium text-blue-400 mb-4">UGL Dispatch</h5>
                  <p className="text-neutral-400 leading-relaxed">Spearheaded cross-functional teams to align software development lifecycles with strategic operational goals, ensuring highly efficient project delivery across logistics platforms.</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} variants={scrollReveal} className="relative pl-8 md:pl-0">
              <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-neutral-800"></div>
              <div className="md:grid md:grid-cols-12 gap-8 items-start group">
                <div className="md:col-span-3 md:text-right pt-1"><span className="text-sm font-bold text-neutral-500 uppercase tracking-wider group-hover:text-blue-400 transition-colors">Aug '24 — Aug '25</span></div>
                <div className="md:col-span-1 hidden md:flex justify-center relative">
                  <div className="absolute top-0 bottom-[-4rem] w-px bg-neutral-800 group-hover:bg-neutral-600 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-neutral-700 border-2 border-neutral-950 relative z-10 mt-1.5 group-hover:bg-blue-400 group-hover:scale-150 transition-all duration-300"></div>
                </div>
                <div className="md:col-span-8 pb-8">
                  <h4 className="text-2xl font-bold text-white mb-1">Technical Quality Control Manager</h4>
                  <h5 className="text-lg font-medium text-blue-400 mb-4">Black Oasis</h5>
                  <p className="text-neutral-400 leading-relaxed">Led technical quality assurance protocols and compliance initiatives to maintain rigorous software performance standards. Streamlined technical workflows across development cycles.</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} variants={scrollReveal} className="relative pl-8 md:pl-0">
              <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-neutral-800"></div>
              <div className="md:grid md:grid-cols-12 gap-8 items-start group">
                <div className="md:col-span-3 md:text-right pt-1"><span className="text-sm font-bold text-neutral-500 uppercase tracking-wider group-hover:text-emerald-400 transition-colors">2022 — 2026</span></div>
                <div className="md:col-span-1 hidden md:flex justify-center relative">
                  <div className="absolute top-0 bottom-0 w-px bg-neutral-800 group-hover:bg-neutral-600 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-neutral-800 border-2 border-neutral-950 relative z-10 mt-1.5 group-hover:bg-emerald-400 transition-all duration-300"></div>
                </div>
                <div className="md:col-span-8">
                  <h4 className="text-2xl font-bold text-white mb-1">B.Sc. Software Engineering</h4>
                  <h5 className="text-lg font-medium text-emerald-400 mb-4">Applied Science University</h5>
                  <p className="text-neutral-400 leading-relaxed">Completed formal academic studies in Software Engineering, providing a strong theoretical and practical baseline for complex full-stack architecture and technical project management.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* EXECUTIVE CONTACT FOOTER */}
      <section id="contact" className="relative z-10 px-8 md:px-24 py-32 bg-white text-black border-t border-neutral-200 cursor-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} variants={scrollReveal} className="max-w-4xl mx-auto text-center space-y-12">
          
          <div className="flex justify-center items-center gap-3 mb-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
              Accepting New Engagements
            </p>
          </div>

          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter">
            LET'S BUILD <br/><span className="text-neutral-400">TOGETHER.</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-medium">
            Currently open for strategic project management and full-stack engineering roles globally.
          </p>
          
          <div className="pt-8 pb-12">
            <a 
              href="https://www.instagram.com/YOURMAINMANC9" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
              className="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-white transition-all duration-200 bg-black hover:bg-neutral-800 hover:scale-105 shadow-2xl"
            >
              START A CONVERSATION
              <svg className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </a>
          </div>

          <div className="border-t border-neutral-200 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest">
              Amman, Jordan • GMT+3
            </div>
            <div className="flex gap-8 text-sm font-bold tracking-widest text-neutral-900 uppercase">
              <a href="https://jo.linkedin.com/in/ahmad-alkhouja-224488315" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>LinkedIn</a>
              <a href="https://github.com/C9AK" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>GitHub</a>
              <a href="https://www.instagram.com/YOURMAINMANC9" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Instagram</a>
            </div>
          </div>
          
        </motion.div>
      </section>

    </main>
  );
}