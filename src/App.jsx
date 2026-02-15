import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform, useVelocity, useMotionTemplate } from 'framer-motion';
import {
  Github, Linkedin, Mail, ExternalLink, Code2, Terminal as TerminalIcon, Cpu,
  Globe, Database, Menu, X, ChevronRight, Briefcase, GraduationCap,
  MessageSquare, Send, Sparkles, Zap, Command, Layers, Eye, MousePointer2
} from 'lucide-react';

/* ==========================================================================
   🖼️ ADVANCED ASSETS & CONSTANTS
   ========================================================================== */

const PROJECTS = [
  {
    id: "01",
    title: "NEURAL ENGINE",
    category: "AI INFRASTRUCTURE",
    year: "2026",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "CRYPTO VORTEX",
    category: "DECENTRALIZED FINANCE",
    year: "2025",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "SENSORY UI",
    category: "HAPTIC DESIGN SYSTEM",
    year: "2025",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop"
  }
];

/* ==========================================================================
   🕹️ ADVANCED INTERACTION COMPONENTS
   ========================================================================== */

const Preloader = ({ finishLoading }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(finishLoading, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[1000] bg-[#030303] flex flex-col items-center justify-center p-10"
    >
      <div className="w-full max-w-md">
        <div className="flex justify-between mb-4 font-mono text-xs tracking-widest opacity-50">
          <span>INITIALIZING_SYSTEM</span>
          <span>{percent}%</span>
        </div>
        <div className="h-[2px] w-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const MagneticWrapper = ({ children, strength = 0.3 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0); y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

const VelocityMarquee = ({ baseVelocity = 5, children }) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const x = useMotionValue(0);

  useEffect(() => {
    let lastTime = 0;
    const update = (time) => {
      const delta = time - lastTime;
      lastTime = time;
      let moveBy = baseVelocity * (delta / 1000);
      moveBy += moveBy * velocityFactor.get();
      x.set(x.get() - moveBy);
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, []);

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex whitespace-nowrap flex-nowrap gap-10 text-8xl md:text-[12rem] font-black uppercase tracking-tighter" style={{ x }}>
        {Array(4).fill(0).map((_, i) => (
          <span key={i} className="flex gap-10">
            {children}
            <span className="text-purple-600">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ==========================================================================
   🖼️ SECTIONS
   ========================================================================== */

const Hero = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={container} className="relative h-screen flex items-center justify-center overflow-hidden px-6">
      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
          >
            <Command className="w-6 h-6 animate-spin-slow" />
          </motion.div>

          <h1 className="text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-tight uppercase">
            <div className="overflow-hidden">
              <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="block">Elevating</motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="block text-purple-600 italic">Interactions</motion.span>
            </div>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex items-center gap-4 text-xs font-mono tracking-widest uppercase opacity-40"
          >
            <span>Based in India</span>
            <div className="w-10 h-[1px] bg-white/20" />
            <span>Full Stack Engineer</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating 3D-ish Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-24 border border-white/5 rounded-2xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              rotate: Math.random() * 360
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 90, 180]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </section>
  );
};

const ProjectSection = () => {
  return (
    <section id="work" className="py-40 bg-white text-black rounded-[4rem]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-32">
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">
            Selected <br /> <span className="text-slate-300">Artifacts</span>
          </h2>
          <div className="hidden md:block font-mono text-xs uppercase tracking-widest opacity-50 pb-4">
            [Scroll to explore]
          </div>
        </div>

        <div className="space-y-40">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 md:gap-20 items-center`}
            >
              <div className="flex-1 group relative overflow-hidden rounded-3xl bg-slate-100 aspect-video">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={project.image}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-mono text-[10px] font-bold">
                  PROJ_{project.id}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs font-mono font-bold bg-black text-white px-3 py-1 rounded-full">{project.year}</span>
                  <div className="h-[1px] w-12 bg-black/10" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{project.category}</span>
                </div>
                <h3 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">{project.title}</h3>
                <MagneticWrapper strength={0.2}>
                  <button className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest">Case Study</span>
                  </button>
                </MagneticWrapper>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CodeTerminal = () => {
  return (
    <section className="py-40 px-6">
      <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0d0d0d]">
        <div className="flex items-center gap-2 px-6 py-4 bg-white/5 border-b border-white/5">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          <span className="ml-4 font-mono text-[10px] opacity-40 uppercase tracking-widest">about_me.ts</span>
        </div>
        <div className="p-8 font-mono text-sm leading-relaxed overflow-x-auto">
          <div className="flex gap-4">
            <span className="opacity-20 select-none">1</span>
            <p><span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = &#123;</p>
          </div>
          <div className="flex gap-4">
            <span className="opacity-20 select-none">2</span>
            <p className="ml-4">name: <span className="text-green-400">'Prince'</span>,</p>
          </div>
          <div className="flex gap-4">
            <span className="opacity-20 select-none">3</span>
            <p className="ml-4">specialty: [<span className="text-green-400">'FullStack'</span>, <span className="text-green-400">'InteractiveUI'</span>],</p>
          </div>
          <div className="flex gap-4">
            <span className="opacity-20 select-none">4</span>
            <p className="ml-4">passion: <span className="text-green-400">'High-Performance Architecture'</span>,</p>
          </div>
          <div className="flex gap-4">
            <span className="opacity-20 select-none">5</span>
            <p className="ml-4">currentFocus: <span className="text-green-400">'Building Scalable Systems'</span></p>
          </div>
          <div className="flex gap-4">
            <span className="opacity-20 select-none">6</span>
            <p>&#125;;</p>
          </div>
          <div className="mt-4 flex gap-4">
            <span className="opacity-20 select-none">7</span>
            <p className="text-slate-500">// Ready to collaborate?</p>
          </div>
          <div className="flex gap-4">
            <span className="opacity-20 select-none">8</span>
            <p><span className="text-purple-400">export default</span> developer;</p>
          </div>
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-5 bg-purple-500 inline-block align-middle ml-4"
          />
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   🚀 MAIN APPLICATION
   ========================================================================== */

export default function App() {
  const [loading, setLoading] = useState(true);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="bg-[#030303] text-white selection:bg-purple-600 selection:text-white font-sans overflow-x-hidden">
      <AnimatePresence>
        {loading && <Preloader finishLoading={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Advanced Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 z-[999] pointer-events-none mix-blend-difference flex items-center justify-center"
        style={{
          x: useSpring(mouseX, { stiffness: 500, damping: 30 }),
          y: useSpring(mouseY, { stiffness: 500, damping: 30 }),
          translateX: "-50%", translateY: "-50%"
        }}
      >
        <div className="w-1 h-1 bg-white rounded-full" />
      </motion.div>

      <nav className="fixed top-0 left-0 right-0 z-50 p-8 flex justify-between items-center mix-blend-difference">
        <div className="text-sm font-black tracking-tighter uppercase">Prince / Studio</div>
        <div className="flex gap-12 text-[10px] font-bold uppercase tracking-widest hidden md:flex">
          <a href="#work" className="hover:opacity-50 transition-opacity">Projects</a>
          <a href="#" className="hover:opacity-50 transition-opacity">About</a>
          <a href="#" className="hover:opacity-50 transition-opacity">Contact</a>
        </div>
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
          <div className="w-1 h-1 bg-white rounded-full animate-ping" />
        </div>
      </nav>

      <main>
        <Hero />

        <VelocityMarquee baseVelocity={2}>
          Building The Future Of Digital Products
        </VelocityMarquee>

        <section className="py-40 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
            <div className="flex-1">
              <span className="text-xs font-mono opacity-40 uppercase tracking-[0.5em] mb-8 block">Overview_</span>
              <p className="text-3xl md:text-5xl font-medium leading-tight">
                I specialize in crafting <span className="text-purple-500">interactive experiences</span> that connect brands with people through modern technology and design.
              </p>
            </div>
            <div className="flex-1 flex flex-col justify-end">
              <p className="text-slate-400 text-lg max-w-sm mb-12">
                Every line of code is written with performance and scalability in mind, ensuring a seamless user journey across all platforms.
              </p>
              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-12">
                <div>
                  <h4 className="text-xs font-bold uppercase mb-4 opacity-40">Tech</h4>
                  <ul className="text-xs space-y-2 font-mono">
                    <li>React / Next.js</li>
                    <li>Node.js / Go</li>
                    <li>AWS / Docker</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase mb-4 opacity-40">Core</h4>
                  <ul className="text-xs space-y-2 font-mono">
                    <li>Systems Design</li>
                    <li>Microservices</li>
                    <li>Web Performance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProjectSection />

        <CodeTerminal />

        {/* Cinematic CTA */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6 bg-purple-600 rounded-[4rem] text-white">
          <motion.h2
            whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
            className="text-[15vw] font-black uppercase tracking-tighter leading-none"
          >
            Start <br /> Building
          </motion.h2>
          <p className="text-xl md:text-2xl mt-12 mb-20 max-w-md opacity-80 font-medium italic">
            Ready to transform your vision into a world-class digital product?
          </p>
          <MagneticWrapper strength={0.4}>
            <a href="mailto:hello@prince.dev" className="w-40 h-40 rounded-full bg-white text-black flex items-center justify-center font-black uppercase text-sm tracking-widest hover:scale-110 transition-transform">
              Contact
            </a>
          </MagneticWrapper>
        </section>
      </main>

      <footer className="py-20 px-8 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-[10px] font-mono opacity-30 uppercase tracking-[0.5em]">
          © 2026 Prince Studio — All Rights Reserved
        </div>
        <div className="flex gap-10">
          <Linkedin className="w-5 h-5 hover:text-purple-500 cursor-pointer" />
          <Github className="w-5 h-5 hover:text-purple-500 cursor-pointer" />
          <Mail className="w-5 h-5 hover:text-purple-500 cursor-pointer" />
        </div>
      </footer>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        html {
          scroll-behavior: initial;
          scrollbar-width: none;
        }
        ::-webkit-scrollbar {
          display: none;
        }
        body {
          overscroll-behavior-y: none;
        }
      `}</style>
    </div>
  );
}