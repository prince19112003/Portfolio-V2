import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import {
  Github, Linkedin, Mail, ExternalLink, Code2, Terminal, Cpu,
  Globe, Database, Menu, X, ChevronDown, Briefcase, GraduationCap,
  MessageSquare, Send, Sparkles
} from 'lucide-react';

/* ==========================================================================
   📊 DATA CONSTANTS
   ========================================================================== */

const NAVIGATION_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const SKILLS = [
  { name: "React / Next.js", level: 95, icon: <Code2 className="w-6 h-6" /> },
  { name: "Python / Flask", level: 85, icon: <Terminal className="w-6 h-6" /> },
  { name: "JavaScript (ES6+)", level: 90, icon: <Globe className="w-6 h-6" /> },
  { name: "Tailwind CSS", level: 95, icon: <Cpu className="w-6 h-6" /> },
  { name: "PostgreSQL", level: 80, icon: <Database className="w-6 h-6" /> },
];

const PROJECTS = [
  {
    title: "Neon AI Dashboard",
    description: "A real-time AI analytics dashboard featuring dark mode, glassmorphism UI, and data visualization using Recharts.",
    tags: ["React", "Tailwind", "Framer Motion"],
    github: "#",
    demo: "#",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
  },
  {
    title: "CryptoFin Exchange",
    description: "Decentralized exchange platform mockup with live coin tracking, wallet integration, and secure transaction flow.",
    tags: ["Web3", "Next.js", "Solidity"],
    github: "#",
    demo: "#",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2832&auto=format&fit=crop"
  },
  {
    title: "Cyberpunk Portfolio",
    description: "Experimental portfolio website focusing on WebGL interactions, 3D model rendering, and performance optimization.",
    tags: ["Three.js", "WebGL", "React"],
    github: "#",
    demo: "#",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2670&auto=format&fit=crop"
  }
];

const TIMELINE = [
  {
    year: "2024 - Present",
    title: "Frontend Engineer Intern",
    company: "TechNova Startups",
    desc: "Optimized React performance by 40% and implemented new design system components using Tailwind CSS and Framer Motion.",
    type: "work"
  },
  {
    year: "2021 - 2025",
    title: "B.Tech Computer Science",
    company: "University of Technology",
    desc: "Major in Artificial Intelligence. Lead Developer for University Coding Club. Ranked Top 1% in competitive programming.",
    type: "education"
  }
];

/* ==========================================================================
   ✨ INTERACTIVE COMPONENTS & UTILITIES
   ========================================================================== */

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] bg-purple-500/30 blur-xl hidden md:block"
    />
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 origin-left z-[60]"
      style={{ scaleX }}
    />
  );
};

const BackgroundEffects = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const background = useMotionTemplate`
    radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(120,119,198,0.12), transparent 80%)
  `;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#030014]">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      <motion.div className="absolute inset-0" style={{ background }} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
    </div>
  );
};

/* ==========================================================================
   🏗️ PAGE SECTIONS
   ========================================================================== */

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <div className={`transition-all duration-500 flex items-center justify-between px-6 md:px-10 h-16
        ${scrolled
          ? 'bg-[#030014]/70 backdrop-blur-xl border border-white/10 shadow-lg shadow-purple-900/20 w-full max-w-4xl rounded-full'
          : 'bg-transparent w-full max-w-7xl rounded-none border-transparent'}`}>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 cursor-pointer"
        >
          DEV<span className="text-white">.IO</span>
        </motion.div>

        <div className="hidden md:flex space-x-8 items-center">
          {NAVIGATION_LINKS.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all group-hover:w-full" />
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 text-xs font-bold text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/20"
          >
            Hire Me
          </motion.a>
        </div>

        <div className="md:hidden text-white cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-20 left-4 right-4 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 md:hidden shadow-2xl z-50"
          >
            <div className="flex flex-col space-y-4">
              {NAVIGATION_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-slate-300 hover:text-purple-400 py-3 text-lg border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Full Stack Developer";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-semibold tracking-wider text-purple-300 uppercase bg-purple-500/10 rounded-full border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Sparkles className="w-3 h-3" /> Available for Hire
          </div>

          <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tight leading-[1.1] drop-shadow-2xl">
            Crafting Digital <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400">
              Masterpieces
            </span>
          </h1>

          <div className="h-8 mb-12 text-xl md:text-3xl text-slate-400 font-mono font-light">
            {text}<span className="animate-pulse text-purple-400 font-bold">|</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 py-4 bg-white text-[#030014] font-bold rounded-full transition-all flex items-center justify-center gap-2"
            >
              Explore My Work <ChevronDown className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 py-4 bg-transparent border border-white/20 text-white font-medium rounded-full transition-colors backdrop-blur-sm"
            >
              Get in Touch
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-purple-400 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Skills = () => (
  <section id="skills" className="py-24 relative overflow-hidden">
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Technical Arsenal</h2>
          <p className="text-slate-400 max-w-xl text-lg leading-relaxed">
            I build scalable, high-performance web applications using the modern ecosystem, focusing on developer experience and end-user performance.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="hidden md:block text-8xl font-black text-white/5 select-none"
        >
          STACK
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SKILLS.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:bg-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400 group-hover:text-purple-300 transition-all group-hover:scale-110 duration-500 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                  {skill.icon}
                </div>
                <span className="text-2xl font-bold text-slate-100">{skill.name}</span>
              </div>
              <span className="text-purple-400 font-mono font-bold text-xl">{skill.level}%</span>
            </div>

            <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ProjectCard = ({ project, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      style={{ perspective: 1000, rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-[2.5rem] overflow-hidden bg-[#0a0a0a] border border-white/10 hover:border-purple-500/30 transition-colors duration-500"
    >
      <div className="relative h-72 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 opacity-60 group-hover:opacity-20 transition-opacity" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
        <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="p-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white">
            <ExternalLink className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="p-10 pt-6 relative z-20">
        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors leading-tight">
          {project.title}
        </h3>
        <p className="text-slate-400 text-base mb-8 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2.5 mb-10">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs font-bold px-4 py-1.5 bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20 uppercase tracking-widest">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-8 border-t border-white/5 pt-8">
          <a href={project.github} className="flex items-center gap-2.5 text-sm font-bold text-slate-400 hover:text-white transition-all hover:translate-x-1">
            <Github className="w-5 h-5" /> SOURCE CODE
          </a>
          <a href={project.demo} className="flex items-center gap-2.5 text-sm font-bold text-purple-400 hover:text-purple-300 transition-all hover:translate-x-1">
            <Globe className="w-5 h-5" /> LIVE PREVIEW
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => (
  <section id="experience" className="py-24 bg-[#030014]/50 relative">
    <div className="max-w-4xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl font-bold text-white mb-20 text-center"
      >
        My Journey
      </motion.h2>

      <div className="relative border-l-2 border-slate-800 ml-4 md:ml-12 space-y-20">
        {TIMELINE.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="relative pl-12 md:pl-20 group"
          >
            <div className={`absolute -left-[11px] top-2 w-5 h-5 rounded-full border-[5px] z-10 group-hover:scale-150 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)]
              ${item.type === 'work' ? 'border-purple-500 bg-[#030014]' : 'border-indigo-500 bg-[#030014]'}`} />

            <div className="mb-2 flex items-center gap-3">
              <span className="text-sm font-mono font-bold text-purple-400 bg-purple-500/5 px-3 py-1 rounded-full border border-purple-500/10">
                {item.year}
              </span>
              <div className={`h-[1px] w-12 bg-slate-800`} />
            </div>

            <h3 className="text-3xl font-black text-white flex items-center gap-4 mb-2">
              {item.title}
              {item.type === 'work' ? <Briefcase className="w-6 h-6 text-purple-500" /> : <GraduationCap className="w-6 h-6 text-indigo-500" />}
            </h3>
            <div className="text-xl text-slate-300 font-semibold mb-6 tracking-wide">{item.company}</div>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl bg-white/[0.02] p-6 rounded-2xl border border-white/5">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock simulation
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">Let's Create <br /><span className="text-purple-500">Something New.</span></h2>
            <p className="text-slate-400 text-xl mb-12 leading-relaxed">
              Whether you have a groundbreaking app idea, need a technical consultant, or just want to chat about the future of AI — my inbox is always open.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-mono text-purple-400 font-bold uppercase">Email Me</p>
                  <p className="text-xl text-white font-medium">hello@dev.io</p>
                </div>
              </div>

              <div className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-mono text-indigo-400 font-bold uppercase">Professional</p>
                  <p className="text-xl text-white font-medium">linkedin.com/in/dev</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 md:p-12 rounded-[3rem] shadow-2xl relative"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2 ml-1 uppercase tracking-widest">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-all focus:ring-4 focus:ring-purple-500/10"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2 ml-1 uppercase tracking-widest">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-all focus:ring-4 focus:ring-purple-500/10"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 ml-1 uppercase tracking-widest">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="5"
                  className="w-full bg-slate-900/50 border border-white/10 rounded-3xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-all focus:ring-4 focus:ring-purple-500/10 resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black rounded-3xl hover:shadow-[0_0_40px_rgba(147,51,234,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-70 group"
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-white/5 text-center bg-[#030014] relative z-10">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="text-xl font-bold text-white">
        DEV<span className="text-purple-500">.IO</span>
      </div>
      <p className="text-slate-500 text-sm font-medium">
        © {new Date().getFullYear()} DESIGNED & BUILT BY DEV PORTFOLIO.
      </p>
      <div className="flex gap-6">
        <Github className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
        <Linkedin className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
        <Mail className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
      </div>
    </div>
  </footer>
);

/* ==========================================================================
   🚀 MAIN APP COMPONENT
   ========================================================================== */

const App = () => {
  return (
    <div className="min-h-screen bg-[#030014] text-slate-200 selection:bg-purple-500/30 selection:text-white font-sans scroll-smooth">
      <BackgroundEffects />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        <Hero />

        <Skills />

        <section id="projects" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-6 mb-20">
              <h2 className="text-4xl md:text-7xl font-bold text-white whitespace-nowrap">Featured Works</h2>
              <div className="h-[1px] w-full bg-slate-800" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
              {PROJECTS.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <Experience />

        <Contact />
      </main>

      <Footer />

      {/* Tailwind Specific Global Styles */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
        }
        html {
          scrollbar-width: thin;
          scrollbar-color: rgba(168, 85, 247, 0.3) #030014;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #030014;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.3);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.5);
        }
      `}</style>
    </div>
  );
};

export default App;