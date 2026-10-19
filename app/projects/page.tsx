"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import Link from 'next/link';

// --- INTERACTIVE IMAGE CAROUSEL COMPONENT ---
const ImageCarousel = ({ images, title }: { images: string[], title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full group overflow-hidden rounded-2xl bg-[#020202]">
      <div 
        className="w-full h-full flex transition-transform duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((imgSrc, idx) => (
          <div key={idx} className="w-full h-full flex-shrink-0 relative flex items-center justify-center bg-[#050505] border border-neutral-900 rounded-2xl overflow-hidden shadow-inner">
            {/* LIVE IMAGE RENDERER ACTIVATED */}
            <img 
              src={imgSrc} 
              alt={`${title} Interface ${idx + 1}`} 
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
              onError={(e) => {
                // Fallback if image isn't found in public folder yet
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.classList.add('fallback-svg-active');
              }}
            />
            {/* Fallback SVG logic handled via CSS if image fails */}
            <svg className="w-12 h-12 text-neutral-800 absolute fallback-svg hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span className="absolute mt-24 text-neutral-700 font-mono text-xs tracking-widest uppercase fallback-text hidden">
              Awaiting Render File
            </span>
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/90 backdrop-blur-xl border border-white/10 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-20 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/90 backdrop-blur-xl border border-white/10 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-20 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            <svg className="w-6 h-6 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {images.map((_, idx) => (
              <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-white scale-150 shadow-[0_0_10px_white]' : 'bg-white/30'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// --- INDIVIDUAL PROJECT NODE ---
const ProjectNode = ({ proj, index, cameraZ }: { proj: any, index: number, cameraZ: MotionValue<number> }) => {
  const depth = (index * -3000) - 2500; 
  const isLeft = proj.side === "left";

  const relativeZ = useTransform(cameraZ, (z) => z + depth);
  const passFade = useTransform(relativeZ, [0, 1000], [1, 0]);

  return (
    <motion.div 
      className="absolute top-1/2 left-1/2 w-full max-w-[900px]"
      style={{ 
        transform: `translate(-50%, -50%) translateZ(${depth}px) translateX(${isLeft ? '-35vw' : '35vw'}) rotateY(${isLeft ? '35deg' : '-35deg'})`,
        transformStyle: "preserve-3d",
        opacity: passFade
      }}
    >
      <div 
        className="absolute top-[-700px] left-1/2 -translate-x-1/2 w-[600px] h-[1000px] pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse at top, rgba(255,255,255,0.15) 0%, transparent 70%)`,
          transform: `rotateZ(${isLeft ? '15deg' : '-15deg'})`,
          transformOrigin: "top center",
          mixBlendMode: "screen",
          filter: "blur(40px)"
        }}
      />

      <div 
        className="w-full flex flex-col bg-[#050505]/60 backdrop-blur-3xl border border-neutral-800 rounded-3xl pointer-events-auto transition-all duration-700 hover:bg-[#0a0a0a]/80 hover:border-neutral-500 relative z-10"
        style={{ 
          boxShadow: `0 30px 100px rgba(0,0,0,1), 0 0 60px rgba(255,255,255,0.1), inset 0 0 20px rgba(255,255,255,0.05)`,
          transformStyle: "preserve-3d" 
        }}
      >
        <div className="w-[90%] mx-auto mt-8 h-[350px] md:h-[450px] relative shadow-2xl" style={{ transform: "translateZ(40px)" }}>
          <ImageCarousel images={proj.images} title={proj.title} />
        </div>

        <div className="p-10 md:p-14 flex flex-col" style={{ transform: "translateZ(80px)" }}>
          <div className="font-mono text-sm tracking-widest mb-4 font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            {proj.category}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
            {proj.title}
          </h2>
          {/* whitespace-pre-line allows us to use \n to format the text beautifully */}
          <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-10 max-w-2xl bg-black/60 p-6 rounded-xl border border-white/10 backdrop-blur-md whitespace-pre-line">
            {proj.desc}
          </p>
          <div className="flex flex-wrap gap-3 mt-auto">
            {proj.stack.map((tech: string) => (
              <span key={tech} className="px-5 py-2.5 bg-[#080808] border border-neutral-800 text-neutral-300 text-xs font-mono tracking-widest rounded-md uppercase shadow-inner hover:bg-white hover:text-black transition-colors duration-300 cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- DATA PAYLOAD ---
const projects = [
  {
    title: "Telemetry Dispatch AI Fleet Command",
    category: "01 // AI & TELEMETRY AUTOMATION",
    stack: [
      "React.TS", 
      "Python", 
      "FastAPI",
      "PyTorch", 
      "TensorRT",
      "CUDA",
      "Apache Kafka", 
      "WebRTC", 
      "gRPC", 
      "PostGIS", 
      "Prisma ORM", 
      "pgvector", 
      "vLLM", 
      "TimescaleDB", 
      "Redis",
      "Prometheus",
      "Grafana",
      "Docker",
      "Mapbox GL"
    ],
    desc: "Engineered a proprietary, end-to-end AI Fleet Command center built entirely from scratch to orchestrate mass logistics operations. At its core, a dynamic tactical map tracks thousands of active and stationary assets globally, utilizing real-time geospatial processing to calculate live gas and capital burn rates instantly.\n\nThe system replaces off-the-shelf tracking with a bespoke neural network architecture. By ingesting low-latency WebRTC dashcam feeds, custom computer vision models continuously scan for critical safety events—such as rolling stops and driver inattention. Furthermore, the AI pipeline introduces automated hazmat anomaly detection, instantly identifying hazardous material discrepancies within loads and triggering immediate risk mitigation alerts.\n\nThe entire infrastructure is underpinned by high-throughput event streaming and distributed databases, ensuring zero-latency communication between the fleet edge and the central command matrix.",
    side: "left",
    images: [
      "/Screenshot 2026-10-17 223722.png", // Main Dashboard
      "/TACTICALMAP.png", // Tactical Map
      "/Screenshot 2026-10-17 224252.png", // AI Event Alerts / Dashcam
      "/Screenshot 2026-10-17 223856.png", // AI BOL/Scale Extraction
      "/Screenshot 2026-10-17 224442.png", // Shift Aggregate Map
    ] 
  },
  {
    title: "USCAN Enterprise Onboarding",
    category: "02 // HR & COMPLIANCE PLATFORM",
    stack: [
      "React.TS", 
      "Next.js", 
      "Firebase Auth", 
      "Firestore DB", 
      "Tailwind CSS", 
      "Framer Motion", 
      "Zustand State", 
      "Zod Validation", 
      "JWT Security"
    ],
    desc: "Architected a secure, enterprise-grade onboarding portal designed to eliminate friction in driver and operational deployments. Engineered a rigorous Role-Based Access Control (RBAC) matrix from the ground up, enforcing precise data compartmentalization and secure routing across administrative, dispatch, and driver tiers.\n\nBeyond the complex backend orchestration—which features real-time state synchronization, secure credential vaulting, and automated compliance tracking—the platform was built with a relentless focus on front-end aesthetics. It delivers a premium, high-fidelity UI/UX that transforms dense corporate workflows into a seamless, consumer-grade digital experience.",
    side: "right",
   images: [
      "/ONBOARDING1.png", // Clinical Chat & Offline Search
      "/ONBOARDING2.png", 
      "/onboarding3.png" // Medication Interaction Profile Dashboard
    ]
  }
  ,
{
    title: "Al Tibbi Clinical AI Matrix",
    category: "03 // MACHINE LEARNING & OFFLINE RAG",
  stack: [
      "Llama 3.1",
      "vLLM Engine",
      "LangChain",
      "FAISS (Vector Store)",
      "PostgreSQL (pgvector)",
      "FastAPI (Asynchronous)",
      "ONNX Runtime",
      "Hugging Face Embeddings",
      "Redis (In-Memory Cache)",
      "Docker Containerization",
      "PyTorch Core"
    ],
    desc: "Architected Al Tibbi, an offline-first clinical AI assistant designed to empower pharmacists with secure, instant access to medical intelligence entirely without internet connectivity. Grounded by a localized Retrieval-Augmented Generation (RAG) pipeline, the system eliminates LLM hallucinations by restricting clinical search to a secure local pgvector database of medical literature, FDA drug labeling, and complex pharmacological interactions.\n\nBy leveraging Llama 3.1 running locally on edge-hardware via Ollama and FAISS for zero-latency vector search, the platform preserves absolute patient and data privacy (satisfying strict healthcare compliance). The multi-agent architecture includes localized drug-interaction cross-checking, contraindication hazard alerts, and clinical reference tracking, accessed via a highly responsive React dashboard designed for seamless offline-first execution.",
    side: "left",
    images: [
      "/altibbi1.png", // Clinical Chat & Offline Search
      "/altibbi2.png"  // Medication Interaction Profile Dashboard
    ]
  },
{
    title: "Brand Tech website [COMING SOON]",
    category: "04 // IMMERSIVE 3D WEB ARCHITECTURE",
   stack: [
      "Next.js", 
      "React Three Fiber", 
      "WebGL", 
      "GLSL Shaders",
      "GSAP", 
      "Framer Motion", 
      "Lenis Scroll", 
      "TypeScript", 
      "Enterprise CMS",
      "Cloudflare Edge",
      "CI/CD"
    ],
    desc: "Architected a state-of-the-art, WebGL-powered digital presence for Brand Tech, a premier heavy infrastructure and contracting firm. Currently in pre-launch, this platform represents the pinnacle of modern web rendering, utilizing real-time 3D background environments and advanced glassmorphism UI to reflect the firm's uncompromising engineering precision.\n\nThe architecture seamlessly blends high-performance kinematics with a robust content matrix to showcase enterprise-level capabilities and tier-one client portfolios—including critical structural deployments for Saudi Aramco, STC, and King Fahad Hospital. Designed to be a masterclass in immersive corporate storytelling, the site translates raw industrial scale into an elite, consumer-grade digital experience.",
    side: "right",
    images: [
      "/BT1.png", // Hero Section
      "/BT2.png", // Capabilities Matrix
      "/BT3.png", // Elite Client Roster
      "/BT4.png"  // Conversion CTA
    ]
  },
];

export default function ProjectsVault() {
  const containerRef = useRef(null);
  
  // Audio Controller State
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsAudioPlaying(true);
      } catch (err) {
        console.warn("Audio playback failed. Ensure the audio source is valid and reachable.", err);
        setIsAudioPlaying(false);
      }
    }
  };

  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });
  
  const cameraZ = useTransform(smoothScroll, [0, 1], [0, 14000]);
  const floorY = useTransform(smoothScroll, [0, 1], ["0px", "14000px"]);

  return (
    <main ref={containerRef} className="relative bg-black text-white h-[1200vh] overflow-hidden vault-cursor">
      
      {/* BACKGROUND JAZZ SAXOPHONE TRACK */}
      <audio ref={audioRef} src="/jazz.mp3" loop />

      {/* FIXED UI OVERLAYS */}
      <div className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference pointer-events-none">
        <Link href="/" className="font-bold text-2xl tracking-tighter hover:text-neutral-400 transition-colors pointer-events-auto">
          AK.
        </Link>
        <div className="flex items-center gap-8 pointer-events-auto">
          
          {/* AUDIO CONTROLLER BUTTON */}
          <button 
            onClick={toggleAudio}
            className={`text-xs font-mono transition-all duration-300 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border ${
              isAudioPlaying 
                ? 'border-white text-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                : 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-500 bg-black/40'
            }`}
          >
            {isAudioPlaying ? (
              <>
                <span className="flex items-end gap-[2px] h-3">
                  <span className="w-[2px] h-full bg-white animate-pulse" />
                  <span className="w-[2px] h-2 bg-white animate-pulse delay-75" />
                  <span className="w-[2px] h-3 bg-white animate-pulse delay-150" />
                </span>
                <span>PAUSE MUSIC</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>PLAY MUSIC</span>
              </>
            )}
          </button>

          <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-4 hidden md:flex">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            SECURE VAULT ACTIVE
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 text-neutral-400 text-xs font-mono tracking-widest animate-bounce px-6 py-3 bg-[#050505]/80 backdrop-blur-md rounded-full border border-neutral-800 shadow-2xl pointer-events-none">
        ↓ INITIATE SCROLL ↓
      </div>

      {/* INFINITE BLACK & WHITE SQUARED FLOOR */}
      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center items-end" style={{ perspective: "1000px" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/80 to-black z-10" />
        <motion.div 
          className="w-[300vw] h-[150vh] absolute bottom-[-30vh]"
          style={{ 
            transformOrigin: "bottom",
            transform: "rotateX(80deg)",
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.15) 2px, transparent 2px), linear-gradient(to bottom, rgba(255,255,255,0.15) 2px, transparent 2px)",
            backgroundSize: "200px 200px",
            backgroundPositionY: floorY
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000_70%)]" />
        </motion.div>
      </div>

      {/* 3D SCROLLING CAMERA */}
      <div className="fixed inset-0 pointer-events-none z-10" style={{ perspective: "1500px" }}>
        <motion.div 
          className="w-full h-full absolute inset-0 flex items-center justify-center transform-gpu"
          style={{ transformStyle: "preserve-3d", z: cameraZ }}
        >
          {projects.map((proj, index) => (
            <ProjectNode 
              key={index} 
              proj={proj} 
              index={index} 
              cameraZ={cameraZ} 
            />
          ))}

          {/* END OF TUNNEL VAULT EXIT */}
          <div 
            className="absolute top-1/2 left-1/2 w-full max-w-3xl text-center flex flex-col items-center justify-center px-8"
            style={{ transform: `translate(-50%, -50%) translateZ(-14500px)` }}
          >
            <div className="w-40 h-[1px] bg-neutral-700 mb-12 shadow-[0_0_20px_rgba(255,255,255,0.1)] mx-auto" />
            <h2 className="text-7xl md:text-9xl font-black text-white mb-16 tracking-tighter drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              VAULT <br/>CLEARED.
            </h2>
            <Link 
              href="/" 
              className="px-16 py-6 bg-white text-black font-black text-xl uppercase tracking-widest hover:bg-neutral-300 hover:text-black transition-all duration-300 pointer-events-auto shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:shadow-[0_0_100px_rgba(255,255,255,0.5)] hover:scale-110 inline-block mx-auto"
            >
              Return to Core Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* CSS for hiding scrollbars, handling fallback SVG display, and Custom Cursor */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .fallback-svg-active .fallback-svg { display: block !important; }
        .fallback-svg-active .fallback-text { display: block !important; }

        /* SLEEK CUSTOM SHARP ARROW CURSOR */
        .vault-cursor {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="1.5"><path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 01.35-.15h6.42c.45 0 .67-.54.35-.85L5.5 3.21z"/></svg>'), auto;
        }
        .vault-cursor a, .vault-cursor button {
          cursor: crosshair !important;
        }
      `}} />
    </main>
  );
}