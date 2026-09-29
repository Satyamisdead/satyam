"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Key, Lock, Eye, ArrowRight, Terminal, Cpu } from "lucide-react";

export default function Security() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  const shieldContainerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!shieldContainerRef.current) return;
    const rect = shieldContainerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = -((mouseY - height / 2) / height) * 22;
    const rY = ((mouseX - width / 2) / width) * 22;
    setRotate({ x: rX, y: rY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="security" className="relative bg-[#050505] py-24 md:py-32 overflow-hidden">
      
      {/* 3D Background elements */}
      <div className="absolute right-1/4 top-1/4 -z-10 h-96 w-96 rounded-full bg-[#00ff00]/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 top-0 bg-grid-pattern pointer-events-none opacity-25 w-full h-full" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive 3D Shield Illustration with Multi-layer Depth */}
          <div className="lg:col-span-5 flex justify-center order-last lg:order-first">
            <motion.div
              ref={shieldContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7 }}
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              }}
              className="relative w-[280px] h-[300px] sm:w-[380px] sm:h-[400px] flex items-center justify-center cursor-grab transition-transform duration-200"
            >
              {/* Spinning security radar grids */}
              <div className="absolute inset-0 rounded-full border border-accent/15 animate-spin-slow pointer-events-none" />
              <div className="absolute inset-8 rounded-full border border-dashed border-accent/10 animate-pulse pointer-events-none" />

              {/* Glowing background halo */}
              <div className="absolute inset-16 rounded-full bg-accent/10 blur-2xl animate-pulse pointer-events-none" />

              {/* Main SVG Shield Element with 3D Popout */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }}
                className="relative z-10 w-[190px] h-[230px] sm:w-[240px] sm:h-[290px] drop-shadow-[0_0_40px_rgba(0,214,0,0.3)] animate-shield-glow"
              >
                <svg
                  viewBox="0 0 100 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full text-accent"
                >
                  {/* Shield Outer Path */}
                  <path
                    d="M50 5 L90 20 V60 C90 90 50 115 50 115 C50 115 10 90 10 60 V20 L50 5 Z"
                    fill="url(#shieldGrad)"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Shield Inner Path */}
                  <path
                    d="M50 15 L80 26 V58 C80 81 50 102 50 102 C50 102 20 81 20 58 V26 L50 15 Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                    opacity="0.6"
                  />
                  {/* Glowing Core SVG definition */}
                  <defs>
                    <linearGradient id="shieldGrad" x1="50" y1="5" x2="50" y2="115" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="rgba(0, 214, 0, 0.18)" />
                      <stop offset="100%" stopColor="rgba(0, 214, 0, 0.03)" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Floating center padlock icon inside shield at high Z-depth */}
                <div
                  style={{ transform: "translateZ(65px)" }}
                  className="absolute inset-0 flex items-center justify-center text-accent"
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="flex h-14 w-14 sm:h-18 sm:w-18 items-center justify-center rounded-full bg-black/80 border border-accent/40 shadow-2xl shadow-black"
                  >
                    <Lock className="h-6 w-6 sm:h-8 sm:w-8 text-glow text-accent" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Extra cybersecurity 3D badges floating around at different depths */}
              <div
                style={{ transform: "translateZ(55px)" }}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 h-11 w-11 glass border-accent/30 rounded-xl flex items-center justify-center text-accent shadow-xl shadow-black/80"
              >
                <Key className="h-5 w-5" />
              </div>

              <div
                style={{ transform: "translateZ(50px)" }}
                className="absolute bottom-4 left-2 sm:bottom-6 sm:left-4 z-20 h-11 w-11 glass border-accent/30 rounded-xl flex items-center justify-center text-accent shadow-xl shadow-black/80"
              >
                <Eye className="h-5 w-5" />
              </div>

              <div
                style={{ transform: "translateZ(60px)" }}
                className="absolute -bottom-2 right-6 z-20 rounded-md border border-accent/30 bg-black/80 px-2.5 py-1 text-[10px] font-mono text-accent shadow-lg backdrop-blur-md flex items-center gap-1.5"
              >
                <Cpu className="h-3 w-3" />
                <span>ACTIVE_FIREWALL</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Title and Details */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              {/* Promo Badge */}
              <span className="inline-flex items-center space-x-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-semibold tracking-wider text-accent uppercase mb-4">
                <ShieldCheck className="h-3.5 w-3.5 animate-pulse" />
                <span>{siteConfig.securityBanner.offer}</span>
              </span>

              {/* Title */}
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl leading-tight">
                {siteConfig.securityBanner.title}
              </h2>
              
              {/* Description */}
              <p className="mt-4 text-base text-secondary-text sm:text-lg">
                {siteConfig.securityBanner.description}
              </p>

              {/* Feature Points */}
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-accent/10 text-accent">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white font-medium">Full Penetration Testing:</strong>
                    <span className="text-secondary-text text-sm ml-1">Simulating real-world cyberattacks to discover loopholes.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-accent/10 text-accent">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white font-medium">Vulnerability Assessment:</strong>
                    <span className="text-secondary-text text-sm ml-1">Continuous scans to check database safety and API vulnerabilities.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-accent/10 text-accent">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white font-medium">OWASP Top 10 Audits:</strong>
                    <span className="text-secondary-text text-sm ml-1">Hardening web app architectures against injection, XSS, and broken auth.</span>
                  </div>
                </li>
              </ul>

              {/* Buttons */}
              <div className="mt-10 flex flex-wrap gap-4 pt-4">
                <button
                  onClick={scrollToContact}
                  className="group relative inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3.5 text-sm font-semibold text-black shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,214,0,0.5)] active:scale-95 cursor-pointer"
                >
                  Get Website Security Audit
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center rounded-md border border-white/10 bg-[#101010] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-accent/40 hover:bg-accent/5 hover:text-accent cursor-pointer"
                >
                  Book Consultation
                </button>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
