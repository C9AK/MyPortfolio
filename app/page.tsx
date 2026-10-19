"use client";
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useMotionValue, useTransform, Variants, AnimatePresence } from 'framer-motion';

// --- SYSTEM BOOT PRELOADER (FIXED) ---
const fullText = "> INITIALIZING AHMAD_OS...\n> LOADING CORE_COMPETENCIES: [SDLC, AGILE, AWS]...\n> ESTABLISHING SECURE CONNECTION...\n> ACCESS GRANTED.";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setTimeout(onComplete, 600);
      }
    }, 25);
    
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] bg-neutral-950 flex flex-col items-center justify-center text-emerald-400 font-mono text-sm md:text-base px-8"
    >
      <div className="w-full max-w-2xl text-left whitespace-pre-line leading-loose">
        {text}
        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>_</motion.span>
      </div>
    </motion.div>
  );
};

// --- MAGNETIC BUTTON PHYSICS COMPONENT ---
function MagneticWrapper({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 }); 
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

// --- NEW HERO 3D VISUALIZER COMPONENT ---
const Hero3DVisualizer = () => {
  return (
    <div className="w-full h-48 md:h-56 lg:col-span-2 flex items-center justify-center pointer-events-none mb-8 mt-12 md:mt-0 z-20" style={{ perspective: "1200px" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }} 
        className="relative w-full max-w-5xl flex items-center justify-center scale-110 md:scale-125"
        style={{ transformStyle: "preserve-3d", transform: "rotateX(65deg) rotateZ(-15deg)" }}
      >
        <div className="absolute w-full h-[2px] bg-neutral-800/80 rounded-full" />
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_blue]"
        />

        <div className="absolute left-[5%] md:left-[10%] w-24 h-24 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          <motion.div animate={{ z: [0, 15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }} className="absolute inset-0 border border-blue-500/40 bg-blue-900/20 shadow-[0_0_30px_rgba(59,130,246,0.15)] rounded-2xl" />
          <motion.div animate={{ z: [15, 30, 15] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }} className="absolute w-12 h-12 border border-blue-400/50 bg-blue-500/10 rounded-xl" />
          <motion.div animate={{ z: [30, 45, 30] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }} className="absolute w-4 h-4 bg-blue-400 rounded-sm shadow-[0_0_15px_rgba(96,165,250,0.8)]" />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 w-32 h-32 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          <motion.div animate={{ z: [0, 20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute inset-0 border border-emerald-500/40 bg-emerald-900/20 shadow-[0_0_40px_rgba(16,185,129,0.15)] rounded-2xl" />
          <motion.div animate={{ z: [20, 40, 20] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute w-20 h-20 border border-emerald-400/50 bg-emerald-500/10 rounded-xl" />
          <motion.div animate={{ z: [40, 60, 40] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute w-8 h-8 bg-emerald-400 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.8)]" />
          <motion.div animate={{ rotateZ: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-[-20px] border border-dashed border-emerald-500/40 rounded-full" />
          <motion.div animate={{ rotateZ: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-[-40px] border border-emerald-500/10 rounded-full" />
        </div>

        <div className="absolute right-[5%] md:right-[10%] w-24 h-24 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          <motion.div animate={{ z: [0, 15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute inset-0 border border-purple-500/40 bg-purple-900/20 shadow-[0_0_30px_rgba(168,85,247,0.15)] rounded-2xl" />
          <motion.div animate={{ z: [15, 30, 15] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute w-12 h-12 border border-purple-400/50 bg-purple-500/10 rounded-xl" />
          <motion.div animate={{ z: [30, 45, 30] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute w-4 h-4 bg-purple-400 rounded-sm shadow-[0_0_15px_rgba(192,132,252,0.8)]" />
        </div>
      </motion.div>
    </div>
  );
};

// --- 3D TILT SHELL COMPONENT ---
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  glareColor?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function TiltCard({ children, className = "", tiltAmount = 15, glareColor = "rgba(255,255,255,0.08)", onMouseEnter, onMouseLeave }: TiltCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${tiltAmount}deg`, `-${tiltAmount}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${tiltAmount}deg`, `${tiltAmount}deg`]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    if (onMouseLeave) onMouseLeave();
  };

  return (
    <div style={{ perspective: "1000px" }} className="w-full h-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={onMouseEnter}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative transition-all duration-200 ease-out ${className}`}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
          style={{ background: `radial-gradient(circle at ${glareX} ${glareY}, ${glareColor}, transparent 70%)` }}
        />
        {children}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [booting, setBooting] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const scrollReveal: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  const terminalContainer: Variants = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0.8, delayChildren: 1.0 } }
  };
  const terminalLine: Variants = {
    hidden: { opacity: 0, display: "none" },
    show: { opacity: 1, display: "block" }
  };

 const credentials = [
    { title: "Google AI Professional", issuer: "Google", id: "I9AQ0P3GCGFE", category: "AI & ML" },
    { title: "IBM Generative AI Engineering", issuer: "IBM", category: "AI & ML" },
    { title: "AWS Cloud Essentials", issuer: "AWS", category: "Cloud & DevOps" },
    { title: "AWS Cloud Foundations", issuer: "AWS", category: "Cloud & DevOps" },
    { title: "Generative AI Applications with RAG and LangChain", issuer: "IBM", category: "AI & ML" },
    { title: "Generative AI Advanced Fine-Tuning for LLMs", issuer: "IBM", category: "AI & ML" },
    { title: "Generative AI and LLMs: Architecture and Data Preparation", issuer: "IBM", category: "AI & ML" },
    { title: "AI for App Deployment", issuer: "IBM", category: "Cloud & DevOps" },
    { title: "AI for App Building", issuer: "IBM", category: "AI & ML" },
    { title: "Generative AI: Prompt Engineering Basics", issuer: "IBM", category: "AI & ML" },
    { title: "Building Generative AI-Powered Applications with Python", issuer: "IBM", category: "AI & ML" },
    { title: "Data Analysis with Python", issuer: "IBM", category: "Data & Systems" },
    { title: "Machine Learning with Python", issuer: "IBM", category: "AI & ML" },
    { title: "AI for App Deployment", issuer: "Google", category: "Cloud & DevOps" },
    { title: "AI for App Building", issuer: "Google", category: "AI & ML" },
    { title: "AI for Data Analysis", issuer: "Google", category: "Data & Systems" },
    { title: "AI for Content Creation", issuer: "Google", category: "AI & ML" },
    { title: "AI for Writing and Communicating", issuer: "Google", category: "AI & ML" },
    { title: "AI for Research and Insights", issuer: "Google", category: "AI & ML" },
    { title: "AI for Brainstorming and Planning", issuer: "Google", category: "Project Management" },
    { title: "GitHub Essentials", issuer: "GitHub", category: "Cloud & DevOps" },
    { title: "Google Project Management Professional", issuer: "Google", id: "QBUG8PKAG1QA", category: "Project Management" },
    { title: "Capstone: Applying Project Management in the Real World", issuer: "Google", id: "42T6WRJKB26T", category: "Project Management" },
    { title: "Agile Project Management", issuer: "Google", id: "FF1KVFSV6BPC", category: "Project Management" },
    { title: "Project Execution: Running the Project", issuer: "Google", id: "0WO46CQR6NDY", category: "Project Management" },
    { title: "Project Planning: Putting It All Together", issuer: "Google", id: "KW7Q7G9MDJIT", category: "Project Management" },
    { title: "Project Initiation: Starting a Successful Project", issuer: "Google", id: "CWXL7EZASZ90", category: "Project Management" },
    { title: "Foundations of Project Management", issuer: "Google", id: "YXTMCYDDCKX1", category: "Project Management" },
    { title: "Python for Data Science and AI", issuer: "IBM", category: "Data & Systems" },
    { title: "Application Development using Microservices and Serverless", issuer: "IBM", category: "Cloud & DevOps" },
    { title: "Introduction to Test and Behavior Driven Development", issuer: "IBM", category: "Cloud & DevOps" },
    { title: "Continuous Integration and Continuous Delivery (CI/CD)", issuer: "IBM", category: "Cloud & DevOps" },
    { title: "Application Security for Developers and DevOps Professionals", issuer: "IBM", category: "Cloud & DevOps" },
    { title: "Monitoring and Observability for Development and DevOps", issuer: "IBM", category: "Cloud & DevOps" },
    { title: "IBM DevOps and Software Engineering", issuer: "IBM", category: "Cloud & DevOps" },
    { title: "DevOps Capstone Project", issuer: "IBM", category: "Cloud & DevOps" },
    { title: "Containers with Docker, Kubernetes & OpenShift", issuer: "IBM", id: "WRONIQQ16D2P", category: "Cloud & DevOps" },
    { title: "Developing AI Applications with Python and Flask", issuer: "IBM", id: "EDUKLTM3XBGC", category: "AI & ML" },
    { title: "Cloud Essentials", issuer: "IBM", category: "Cloud & DevOps" }
  ];

  const [activeCertCategory, setActiveCertCategory] = useState("ALL");
  const certCategories = ["ALL", "AI & ML", "Cloud & DevOps", "Project Management", "Data & Systems"];
  const filteredCredentials = activeCertCategory === "ALL" 
    ? credentials 
    : credentials.filter(c => c.category === activeCertCategory);

  return (
    <>
      <AnimatePresence>
        {booting && <Preloader onComplete={() => setBooting(false)} />}
      </AnimatePresence>

      {!booting && (
        <main className="relative font-sans antialiased bg-neutral-950 overflow-hidden text-white selection:bg-white selection:text-black cursor-none pb-24">
          
          {/* CUSTOM CURSOR & PROGRESS BAR */}
          <motion.div 
            className="hidden md:flex fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white pointer-events-none z-[110] mix-blend-difference items-center justify-center"
            animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16, scale: isHovering ? 2 : 1 }}
            transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
          >
            <div className={`w-1 h-1 bg-white rounded-full transition-opacity ${isHovering ? 'opacity-0' : 'opacity-100'}`} />
          </motion.div>
          <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-[60] shadow-[0_0_20px_rgba(59,130,246,0.8)]" style={{ scaleX }} />

          {/* GLOBAL INTERACTIVE SPOTLIGHT */}
          <div className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 mix-blend-screen" style={{ background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.03), transparent 40%)` }} />
          
          {/* GLOBAL BACKGROUND GRID */}
          <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>

          {/* NAVIGATION */}
          <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="fixed top-0 w-full z-50 bg-neutral-950/70 backdrop-blur-lg border-b border-neutral-800">
            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
              <div className="font-bold text-xl tracking-tighter">AK.</div>
              <div className="hidden md:flex gap-8 text-sm font-semibold tracking-widest text-neutral-400 uppercase">
                <a href="#capabilities" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="hover:text-white transition-colors">Capabilities</a>
                <a href="#methodology" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="hover:text-white transition-colors">Process</a>
                <a href="#projects" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="hover:text-white transition-colors">Projects</a>
                <a href="#experience" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="hover:text-white transition-colors">Experience</a>
              </div>
              <a href="https://www.instagram.com/YOURMAINMANC9" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="px-5 py-2 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-neutral-300 transition-colors">Contact</a>
            </div>
          </motion.nav>

          {/* HERO SECTION WITH 3D VISUALIZER & MAGNETIC BUTTONS */}
          <section className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-24 pt-32 pb-20">
            <div className="max-w-6xl grid lg:grid-cols-2 gap-12 items-center mx-auto w-full relative">
              
              {/* THE 3D VISUALIZER NOW SPAWNS INSTANTLY */}
              <Hero3DVisualizer />

              <motion.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } }} className="space-y-6 z-30 relative">
                <motion.div variants={scrollReveal}><h1 className="text-6xl md:text-8xl lg:text-[100px] font-extrabold tracking-tighter text-white leading-none">Ahmad <br/> Alkhouja.</h1></motion.div>
                <motion.div variants={scrollReveal} className="flex gap-4 items-center"><div className="h-[1px] w-12 bg-neutral-500"></div><h2 className="text-xl md:text-2xl font-medium text-blue-400 tracking-widest uppercase">AI Automation Lead & Technical Project Manager</h2></motion.div>
                <motion.div variants={scrollReveal} className="pt-8 flex gap-4">
                  <MagneticWrapper>
                    <a href="#projects" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-colors duration-200 bg-neutral-900 border border-neutral-700 hover:bg-white hover:text-black hover:border-white">
                      EXPLORE PORTFOLIO <svg className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                  </MagneticWrapper>
                </motion.div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }} className="rounded-xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-md shadow-2xl overflow-hidden z-30 relative">
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
              <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.8 }} variants={scrollReveal}><h4 className="text-4xl md:text-5xl font-black text-white">40+</h4><p className="text-xs text-neutral-500 font-bold tracking-widest uppercase mt-2">Certifications</p></motion.div>
              <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.8 }} variants={scrollReveal}><h4 className="text-4xl md:text-5xl font-black text-white">100%</h4><p className="text-xs text-neutral-500 font-bold tracking-widest uppercase mt-2">Delivery Rate</p></motion.div>
              <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.8 }} variants={scrollReveal}><h4 className="text-4xl md:text-5xl font-black text-white">Agile</h4><p className="text-xs text-neutral-500 font-bold tracking-widest uppercase mt-2">Methodology</p></motion.div>
              <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.8 }} variants={scrollReveal}><h4 className="text-4xl md:text-5xl font-black text-white">Full</h4><p className="text-xs text-neutral-500 font-bold tracking-widest uppercase mt-2">Stack Engineering</p></motion.div>
            </div>
          </section>

          {/* THE DELIVERY LIFECYCLE */}
          <section id="methodology" className="relative z-10 px-8 md:px-24 py-32 bg-black border-b border-neutral-800">
            <div className="max-w-6xl mx-auto">
              <motion.h3 initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.8 }} variants={scrollReveal} className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4 text-center">
                Execution Framework
              </motion.h3>
              <motion.h2 initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.8 }} variants={scrollReveal} className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-20 text-center">
                The Delivery Pipeline.
              </motion.h2>

              <div className="relative">
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-neutral-800 -translate-y-1/2 z-0"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                  <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} variants={scrollReveal} className="bg-neutral-950 border border-neutral-800 p-8 rounded-xl hover:border-blue-500 transition-colors group">
                    <div className="w-12 h-12 bg-neutral-900 border border-neutral-700 text-blue-400 rounded-full flex items-center justify-center font-bold font-mono mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(59,130,246,0)] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] mx-auto md:mx-0">01</div>
                    <h4 className="text-xl font-bold text-white mb-3 text-center md:text-left">Scope & Strategy</h4>
                    <p className="text-neutral-500 text-sm leading-relaxed text-center md:text-left">Translating stakeholder requirements into actionable technical blueprints and setting rigorous project milestones.</p>
                  </motion.div>
                  <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} variants={scrollReveal} className="bg-neutral-950 border border-neutral-800 p-8 rounded-xl hover:border-emerald-500 transition-colors group">
                    <div className="w-12 h-12 bg-neutral-900 border border-neutral-700 text-emerald-400 rounded-full flex items-center justify-center font-bold font-mono mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0)] group-hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] mx-auto md:mx-0">02</div>
                    <h4 className="text-xl font-bold text-white mb-3 text-center md:text-left">System Architecture</h4>
                    <p className="text-neutral-500 text-sm leading-relaxed text-center md:text-left">Designing the stack infrastructure (APIs, Cloud, DBs) ensuring scalability and eliminating technical debt early.</p>
                  </motion.div>
                  <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} variants={scrollReveal} className="bg-neutral-950 border border-neutral-800 p-8 rounded-xl hover:border-purple-500 transition-colors group">
                    <div className="w-12 h-12 bg-neutral-900 border border-neutral-700 text-purple-400 rounded-full flex items-center justify-center font-bold font-mono mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,85,247,0)] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] mx-auto md:mx-0">03</div>
                    <h4 className="text-xl font-bold text-white mb-3 text-center md:text-left">Agile Execution</h4>
                    <p className="text-neutral-500 text-sm leading-relaxed text-center md:text-left">Driving sprints, managing resource allocation, and maintaining velocity across cross-functional engineering teams.</p>
                  </motion.div>
                  <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} variants={scrollReveal} className="bg-neutral-950 border border-neutral-800 p-8 rounded-xl hover:border-white transition-colors group">
                    <div className="w-12 h-12 bg-neutral-900 border border-neutral-700 text-white rounded-full flex items-center justify-center font-bold font-mono mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,255,255,0)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] mx-auto md:mx-0">04</div>
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

      {/* ENTER PROJECT VAULT REDIRECT */}
      <section id="projects" className="relative z-10 px-8 md:px-24 py-40 bg-neutral-950 border-y border-neutral-800 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle at center, rgba(59,130,246,0.5), transparent 50%)' }}></div>
        
        <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.8 }} variants={scrollReveal} className="relative z-10 max-w-3xl mx-auto space-y-8">
          <div className="flex justify-center items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <p className="text-xs font-mono text-blue-400 uppercase tracking-widest">Interactive 3D Environment</p>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            EXPLORE THE <br/>PROJECT VAULT.
          </h2>
          
          <p className="text-neutral-400 text-lg leading-relaxed max-w-xl mx-auto">
            Step into a dedicated, scroll-rendered 3D space to explore my software architecture, ML implementations, and full-stack solutions.
          </p>

          <div className="pt-8 flex justify-center">
            <MagneticWrapper>
              <Link href="/projects" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-black transition-all duration-300 bg-white hover:bg-blue-500 hover:text-white shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]">
                ENTER ENVIRONMENT 
                <svg className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
            </MagneticWrapper>
          </div>
        </motion.div>
      </section>

      {/* CREDENTIALS & CERTIFICATIONS */}
          <section className="relative z-10 px-8 md:px-24 py-32 bg-neutral-900 border-y border-neutral-800">
            <motion.div 
              className="max-w-7xl mx-auto" 
              initial="hidden" 
              whileInView="show" 
              viewport={{ once: false, amount: 0.1 }} 
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                    <motion.h3 variants={scrollReveal} className="text-xs font-mono text-neutral-400 uppercase tracking-[0.3em]">
                      Verified Credentials Registry
                    </motion.h3>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                    Technical Accreditations.
                  </h2>
                </div>

                {/* CATEGORY SELECTOR & COUNTER */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full lg:w-auto">
                  <div className="flex flex-wrap gap-2">
                    {certCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCertCategory(cat)}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className={`text-xs font-mono px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
                          activeCertCategory === cat
                            ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                            : 'bg-neutral-950/80 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs font-mono text-neutral-400 bg-neutral-950 px-4 py-2 rounded-full border border-neutral-800 flex items-center justify-between sm:justify-start gap-2 whitespace-nowrap">
                    <span className="text-neutral-500 uppercase">Showing</span>
                    <span className="text-white font-bold">{filteredCredentials.length}</span>
                    <span className="text-neutral-500">of</span>
                    <span className="text-white font-bold">{credentials.length}</span>
                    <span className="text-emerald-400 uppercase tracking-widest text-[10px]">Verified</span>
                  </div>
                </div>
              </div>

       {/* ACCREDITATIONS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCredentials.map((cert, index) => {
                  const isGoogle = cert.issuer === "Google";
                  const isIBM = cert.issuer === "IBM";
                  const isGithub = cert.issuer === "GitHub";
                  const isAWS = cert.issuer === "AWS";

                  const badgeBorder = isGoogle 
                    ? "border-blue-500/30 text-blue-400 bg-blue-500/10" 
                    : isIBM 
                    ? "border-indigo-500/30 text-indigo-400 bg-indigo-500/10" 
                    : isAWS
                    ? "border-orange-500/30 text-orange-400 bg-orange-500/10"
                    : "border-purple-500/30 text-purple-400 bg-purple-500/10";

                  const glareColor = isGoogle 
                    ? "rgba(59,130,246,0.18)" 
                    : isIBM 
                    ? "rgba(99,102,241,0.18)" 
                    : isAWS
                    ? "rgba(249,115,22,0.18)"
                    : "rgba(168,85,247,0.18)";

                  return (
                    <TiltCard 
                      key={`${cert.title}-${index}`} 
                      tiltAmount={10} 
                      glareColor={glareColor}
                      onMouseEnter={() => setIsHovering(true)} 
                      onMouseLeave={() => setIsHovering(false)}
                      className="p-6 bg-neutral-950/90 border border-neutral-800/90 hover:border-neutral-500 hover:bg-neutral-900/95 transition-all duration-300 flex flex-col justify-between group rounded-2xl shadow-xl h-full min-h-[200px] relative overflow-hidden"
                    >
                      {/* === GLASSMORPHISM CORNER BADGE === */}
                      <div className="absolute top-0 right-0 z-0" style={{ transform: "translateZ(10px)" }}>
                        {/* Ambient Glow Behind Badge */}
                        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 ${
                          isGoogle ? 'bg-blue-500' : 
                          isIBM ? 'bg-indigo-500' : 
                          isAWS ? 'bg-orange-500' : 
                          'bg-purple-500'
                        }`} />
                        
                        {/* Physical Curved Badge */}
                        <div className={`relative flex items-center justify-center w-16 h-16 rounded-bl-[2rem] border-b border-l backdrop-blur-md transition-all duration-500 ${
                          isGoogle ? 'bg-blue-500/10 border-blue-500/20 group-hover:bg-blue-500/20 group-hover:border-blue-500/40' : 
                          isIBM ? 'bg-indigo-500/10 border-indigo-500/20 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40' : 
                          isAWS ? 'bg-orange-500/10 border-orange-500/20 group-hover:bg-orange-500/20 group-hover:border-orange-500/40' :
                          'bg-purple-500/10 border-purple-500/20 group-hover:bg-purple-500/20 group-hover:border-purple-500/40'
                        }`}>
                          {/* Official Logos */}
                          {isGoogle && (
                            <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" fill="currentColor">
                              <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.988 15.139 2 12.545 2 7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.428-.013z"/>
                            </svg>
                          )}
                          {isIBM && (
                            <svg viewBox="0 0 24 24" className="w-8 h-8 text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.8)]" fill="currentColor">
                              <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontFamily="sans-serif" fontSize="12" fontWeight="bold" letterSpacing="-0.5">IBM</text>
                            </svg>
                          )}
                         {isAWS && (
                            <svg viewBox="0 0 24 24" className="w-8 h-8 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]" fill="currentColor">
                              <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fontWeight="900" letterSpacing="-0.5">AWS</text>
                            </svg>
                          )}
                          {isGithub && (
                             <svg viewBox="0 0 24 24" className="w-6 h-6 text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" fill="currentColor">
                               <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
                             </svg>
                          )}
                        </div>
                      </div>

                      <div className="relative z-10 flex flex-col h-full">
                        {/* TAG */}
                        <div className="flex items-start mb-5" style={{ transform: "translateZ(25px)" }}>
                          <span className={`text-[9px] font-mono tracking-[0.2em] uppercase px-2.5 py-1 rounded-md border ${badgeBorder}`}>
                            {cert.category}
                          </span>
                        </div>

                        {/* TITLE */}
                        <div 
                          style={{ transform: "translateZ(35px)" }} 
                          className="font-bold text-lg md:text-xl text-neutral-200 group-hover:text-white transition-colors duration-200 leading-tight pr-8 flex-1"
                        >
                          {cert.title}
                        </div>

                        {/* FOOTER: CREDENTIAL ID / STATUS */}
                        <div 
                          style={{ transform: "translateZ(20px)" }} 
                          className="mt-6 pt-4 border-t border-neutral-900/50 flex items-center justify-between text-[11px] font-mono"
                        >
                          {cert.id ? (
                            <div className="flex items-center gap-2">
                              <span className="text-neutral-500 text-[10px] uppercase tracking-widest">ID:</span>
                              <span className="text-neutral-300 tracking-wider bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
                                {cert.id}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-neutral-500">
                              <span className="w-1 h-1 rounded-full bg-neutral-600" />
                              <span className="text-[10px] tracking-widest uppercase">Verified Completion</span>
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-neutral-500 tracking-widest uppercase group-hover:text-neutral-400">
                              Active
                            </span>
                            <div className={`h-2 w-2 rounded-full ${
                              isGoogle ? 'bg-blue-400 group-hover:shadow-[0_0_10px_rgba(96,165,250,0.9)]' : 
                              isIBM ? 'bg-indigo-400 group-hover:shadow-[0_0_10px_rgba(129,140,248,0.9)]' : 
                              isAWS ? 'bg-orange-400 group-hover:shadow-[0_0_10px_rgba(251,146,60,0.9)]' :
                              'bg-purple-400 group-hover:shadow-[0_0_10px_rgba(192,132,252,0.9)]'
                            } transition-all`} />
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  );
                })}
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
                    <div className="md:col-span-3 md:text-right pt-1"><span className="text-sm font-bold text-neutral-500 uppercase tracking-wider group-hover:text-blue-400 transition-colors">8-Month Project</span></div>
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
                      <h4 className="text-2xl font-bold text-white mb-1">Technical Project Manager & Automation Lead Developer</h4>
                      <h5 className="text-lg font-medium text-blue-400 mb-4">UGL Dispatch</h5>
                      <p className="text-neutral-400 leading-relaxed">Spearheaded cross-functional teams to align software development lifecycles with strategic operational goals, ensuring highly efficient project delivery across logistics platforms.</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} variants={scrollReveal} className="relative pl-8 md:pl-0">
                  <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-neutral-800"></div>
                  <div className="md:grid md:grid-cols-12 gap-8 items-start group">
                    <div className="md:col-span-3 md:text-right pt-1"><span className="text-sm font-bold text-neutral-500 uppercase tracking-wider group-hover:text-blue-400 transition-colors">JAN '24 — Aug '25</span></div>
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
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Accepting New Engagements</p>
              </div>

              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter">LET'S BUILD <br/><span className="text-neutral-400">TOGETHER.</span></h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-medium">Currently open for strategic project management and full-stack engineering roles globally.</p>
              
              <div className="pt-8 pb-12">
                <MagneticWrapper>
                  <a href="https://www.instagram.com/YOURMAINMANC9" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-white transition-colors duration-200 bg-black hover:bg-neutral-800 hover:scale-105 shadow-2xl">
                    START A CONVERSATION
                    <svg className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </a>
                </MagneticWrapper>
              </div>

              <div className="border-t border-neutral-200 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Khobar , KSA</div>
                <div className="flex gap-8 text-sm font-bold tracking-widest text-neutral-900 uppercase">
                  <a href="https://jo.linkedin.com/in/ahmad-alkhouja-224488315" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>LinkedIn</a>
                  <a href="https://github.com/C9AK" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>GitHub</a>
                  <a href="https://www.instagram.com/YOURMAINMANC9" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Instagram</a>
                </div>
              </div>
            </motion.div>
          </section>

        </main>
      )}
    </>
  );
}