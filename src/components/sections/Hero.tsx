"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { ArrowRight, Code, MessageSquare, Sparkles, Terminal, Globe2, ShieldCheck, Layers } from "lucide-react";
import CyberGlobe3D from "@/components/ui/CyberGlobe3D";

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [activeTab, setActiveTab] = useState<"ide" | "globe">("ide");

  // 3D Card Interactive Tilt Coordinates
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = -((mouseY - height / 2) / height) * 20;
    const rY = ((mouseX - width / 2) / width) * 20;
    setRotate({ x: rX, y: rY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const subheadings = siteConfig.hero.subheading;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullWord = subheadings[wordIndex];

    const tick = () => {
      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        if (currentText === fullWord) {
          timer = setTimeout(() => setIsDeleting(true), 2500); // Stay on full word
          return;
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % subheadings.length);
          setTypingSpeed(100);
          return;
        }
      }
      setTypingSpeed(isDeleting ? 40 : 100);
    };

    timer = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, typingSpeed, subheadings]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] pt-28 pb-20">
      
      {/* 3D Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-30" />

      {/* Futuristic Animated Blobs & Ambient 3D Glows */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-80 w-80 animate-blob rounded-full bg-accent/10 blur-[80px]" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-96 w-96 animate-blob rounded-full bg-[#005500]/15 blur-[100px]" style={{ animationDelay: "4s" }} />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Premium Top pill */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="inline-flex items-center space-x-2 rounded-full border border-accent/20 bg-accent/5 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-accent uppercase w-fit">
                  <Code className="h-3.5 w-3.5" />
                  <span>Available for Global Contracts &amp; SaaS MVP</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-secondary-text">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
                  Featured: Golewah (Cameroon)
                </span>
              </div>

              {/* Heading */}
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {siteConfig.hero.heading.split(" ").map((word, i) => (
                  <span key={i} className={word === "Reality." ? "text-accent text-glow" : ""}>
                    {word}{" "}
                  </span>
                ))}
              </h1>

              {/* Animated Subheading / Typing Effect */}
              <div className="mt-4 h-8 sm:h-10 text-xl sm:text-2xl md:text-3xl font-display font-medium text-secondary-text">
                I am a{" "}
                <span className="text-white border-r-2 border-accent pr-1 animate-pulse">
                  {currentText}
                </span>
              </div>

              {/* Description */}
              <p className="mt-6 max-w-xl text-base text-secondary-text sm:text-lg leading-relaxed">
                {siteConfig.hero.description}
              </p>

              {/* CTA Button Group */}
              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="group relative inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-black shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,214,0,0.5)] active:scale-95 cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  Explore Projects &amp; SaaS
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => scrollToSection("security")}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#101010] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-accent/40 hover:bg-accent/5 hover:text-accent cursor-pointer"
                >
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  Security Consulting
                </button>

                <button
                  onClick={() => scrollToSection("contact")}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#101010] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-accent/40 hover:bg-accent/5 hover:text-accent cursor-pointer"
                >
                  <MessageSquare className="h-4 w-4" />
                  Contact
                </button>
              </div>

              {/* Live Metric Badges */}
              <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/5 pt-6 text-xs text-secondary-text font-mono">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span>160+ Deployed Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span>35+ Global Clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span>Central Africa &bull; US &bull; India</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Interactive Console & 3D Cyber Globe */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            {/* 3D View Switcher Controls */}
            <div className="mb-4 flex items-center rounded-lg border border-white/10 bg-black/60 p-1 backdrop-blur-md">
              <button
                onClick={() => setActiveTab("ide")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono transition-all ${
                  activeTab === "ide"
                    ? "bg-accent/20 text-accent border border-accent/30 shadow-[0_0_10px_rgba(0,214,0,0.2)] font-semibold"
                    : "text-secondary-text hover:text-white"
                }`}
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>3D_CONSOLE</span>
              </button>
              <button
                onClick={() => setActiveTab("globe")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono transition-all ${
                  activeTab === "globe"
                    ? "bg-accent/20 text-accent border border-accent/30 shadow-[0_0_10px_rgba(0,214,0,0.2)] font-semibold"
                    : "text-secondary-text hover:text-white"
                }`}
              >
                <Globe2 className="h-3.5 w-3.5" />
                <span>3D_CYBER_GLOBE</span>
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-[310px] h-[350px] sm:w-[390px] sm:h-[400px] flex items-center justify-center"
            >
              {/* Outer ambient glow ring */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,214,0,0.12)_0%,transparent_70%)] animate-pulse-slow" />
              
              {/* Spinning futuristic dashed orbital ring */}
              <div className="absolute -inset-4 rounded-full border border-dashed border-accent/15 animate-spin-slow pointer-events-none" />

              {/* View 1: 3D Interactive IDE Window with True Multi-Layer Depth */}
              {activeTab === "ide" ? (
                <div
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                  }}
                  className="relative z-10 w-[290px] sm:w-[360px] rounded-2xl glass border-accent/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-6 text-left font-mono transition-transform duration-150 cursor-pointer"
                >
                  {/* Window Header */}
                  <div style={{ transform: "translateZ(20px)" }} className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                      <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                      <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                      <span className="text-[11px] text-secondary-text ml-2">satyam.config.ts</span>
                    </div>
                    <span className="text-[10px] text-accent/80 font-mono">v7.4 // LIVE</span>
                  </div>

                  {/* Code Editor Body */}
                  <div style={{ transform: "translateZ(30px)" }} className="mt-4 space-y-1.5 text-[11px] sm:text-[12.5px] text-white/90">
                    <p><span className="text-accent">const</span> architect = &#123;</p>
                    <p className="pl-4">name: <span className="text-accent">&apos;Satyam Tiwari&apos;</span>,</p>
                    <p className="pl-4">specialty: <span className="text-accent">&apos;SaaS &amp; DevSecOps&apos;</span>,</p>
                    <p className="pl-4">flagship: &#123;</p>
                    <p className="pl-8 text-accent">project: <span className="text-white">&apos;Golewah.com&apos;</span>,</p>
                    <p className="pl-8 text-accent">market: <span className="text-[#00D600]">&apos;Cameroon (Central Africa)&apos;</span>,</p>
                    <p className="pl-8 text-accent">type: <span className="text-white">&apos;School Management SaaS&apos;</span></p>
                    <p className="pl-4">&#125;,</p>
                    <p className="pl-4">securityLevel: <span className="text-[#00D600]">&apos;Military-Grade&apos;</span></p>
                    <p>&#125;;</p>
                  </div>

                  {/* Window Footer */}
                  <div style={{ transform: "translateZ(25px)" }} className="border-t border-white/10 pt-3 mt-4 flex items-center justify-between text-[10px] text-secondary-text">
                    <span className="flex items-center gap-1.5">
                      <Layers className="h-3 w-3 text-accent" />
                      Multi-Tenant Architecture
                    </span>
                    <span className="flex items-center gap-1.5 text-accent">
                      <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
                      DEPLOYED
                    </span>
                  </div>
                </div>
              ) : (
                /* View 2: Interactive 3D Cyber Particle Globe */
                <div className="relative z-10 w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] flex items-center justify-center">
                  <CyberGlobe3D className="w-full h-full" />
                </div>
              )}

              {/* Floating 3D Isometric Hologram Badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-3 -left-3 sm:-left-6 z-20 rounded-lg glass border-accent/30 px-3 py-1.5 text-[11px] font-semibold text-accent shadow-xl shadow-black/80 flex items-center gap-1.5"
              >
                <span>🇨🇲</span>
                <span>Golewah SaaS Live</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-3 -right-2 sm:-right-6 z-20 rounded-lg glass border-accent/30 px-3 py-1.5 text-[11px] font-semibold text-accent shadow-xl shadow-black/80 flex items-center gap-1.5"
              >
                <div className="h-2 w-2 rounded-full bg-accent animate-ping" />
                <span>DevSecOps Hardened</span>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
