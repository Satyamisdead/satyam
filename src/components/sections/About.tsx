"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/config/site";
import { CheckCircle2, Award, Zap, Shield, Globe, Layers } from "lucide-react";

// Count-up counter component triggered on scroll
function Counter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));
    
    // Adjust step sizes for larger counts to avoid frame lag
    const increment = Math.max(1, Math.ceil(end / 100));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, Math.min(stepTime, 30));

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-4 sm:p-6 glass rounded-xl border border-white/5 box-glow-hover transition-all duration-300">
      <span className="font-display text-3xl sm:text-5xl font-extrabold text-accent text-glow">
        {count}
        {suffix}
      </span>
      <span className="mt-2 text-xs sm:text-sm font-medium text-secondary-text uppercase tracking-wider text-center">
        {label}
      </span>
    </div>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const isContainerInView = useInView(containerRef, { once: true, margin: "-150px" });

  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = -((mouseY - height / 2) / height) * 14;
    const rY = ((mouseX - width / 2) / width) * 14;
    setRotate({ x: rX, y: rY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section id="about" className="relative bg-[#050505] py-24 md:py-32">
      
      {/* Background decoration grid */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-20" />
      <div className="absolute right-0 top-1/3 -z-10 h-72 w-72 rounded-full bg-accent/5 blur-[100px]" />

      <div ref={containerRef} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            About Satyam Tiwari
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isContainerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 h-1 w-20 bg-accent text-glow origin-center"
          />
        </div>

        {/* Section Content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          
          {/* Left Column: Intro text */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isContainerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-mono text-accent uppercase mb-3">
                <Globe className="h-3.5 w-3.5" />
                <span>Global Engineering &bull; Central Africa, US &amp; India</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                {siteConfig.about.role}
              </h3>
              <p className="mt-4 text-base text-secondary-text sm:text-lg leading-relaxed">
                {siteConfig.about.description}
              </p>
            </motion.div>

            {/* Specialties Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="pt-6"
            >
              <h4 className="font-display text-sm font-bold tracking-wider text-white uppercase mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent" />
                Core Technical Specializations
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {siteConfig.about.skillsList.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center space-x-2 text-secondary-text"
                  >
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                    <span className="text-sm font-medium text-white/90">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Experience Cards & Counters */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, x: 30 }}
              animate={isContainerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              }}
              className="glass p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#101010] to-[#0a0a0a] shadow-2xl transition-transform duration-200 cursor-pointer"
            >
              <div style={{ transform: "translateZ(25px)" }} className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/15 border border-accent/30 text-accent shadow-[0_0_15px_rgba(0,214,0,0.2)]">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-white">7+ Years of Industry Mastery</h4>
                  <p className="mt-2 text-sm text-secondary-text leading-relaxed">
                    Proven track record engineering multi-tenant SaaS platforms (like Golewah in Cameroon), FinTech market analytics, and scalable enterprise applications.
                  </p>
                </div>
              </div>

              <div style={{ transform: "translateZ(25px)" }} className="mt-6 flex items-start gap-4 border-t border-white/5 pt-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/15 border border-accent/30 text-accent shadow-[0_0_15px_rgba(0,214,0,0.2)]">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-white">Full-Stack DevSecOps Integration</h4>
                  <p className="mt-2 text-sm text-secondary-text leading-relaxed">
                    By combining deep cybersecurity penetration testing with cloud architectures, every product is hardened, compliant, and lightning fast.
                  </p>
                </div>
              </div>

              <div style={{ transform: "translateZ(30px)" }} className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-[11px] font-mono text-accent">
                <span className="flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" />
                  SaaS Multi-Tenant Architecture
                </span>
                <span>GLOBAL_DEPLOY</span>
              </div>
            </motion.div>

            {/* Counters Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-3 sm:gap-4"
            >
              {siteConfig.about.counters.map((c) => (
                <Counter
                  key={c.label}
                  value={c.value}
                  suffix={c.suffix}
                  label={c.label}
                />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
