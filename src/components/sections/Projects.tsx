"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/config/site";
import { ExternalLink, FolderGit2, ArrowRight, Sparkles, Globe2, ShieldCheck } from "lucide-react";

interface Project {
  title: string;
  tagline?: string;
  url: string;
  description: string;
  tech: string[];
  status: string;
  featured?: boolean;
  badge?: string;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    setCoords({ x: mouseX, y: mouseY });

    // Smooth 3D tilt calculation with max degrees limit
    const rX = -((mouseY - height / 2) / height) * 16;
    const rY = ((mouseX - width / 2) / width) * 16;
    setRotate({ x: rX, y: rY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const isLive = project.status === "live";
  const isFeatured = project.featured;

  // Extract clean domain for browser mockup
  const domain = project.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40, rotateX: 10, rotateY: -6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 90, damping: 18, delay: index * 0.08 }}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
      className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300 group ${
        isFeatured
          ? "border-accent/40 bg-gradient-to-b from-[#111911] via-[#101010] to-[#0a0a0a] shadow-[0_0_35px_rgba(0,214,0,0.08)] md:col-span-2"
          : "border-white/5 bg-[#101010] hover:border-accent/30 hover:shadow-[0_0_30px_rgba(0,214,0,0.05)]"
      } p-6 sm:p-8`}
    >
      {/* Dynamic 3D Cursor Spotlight Specular Reflection */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: isFeatured
            ? `radial-gradient(500px circle at ${coords.x}px ${coords.y}px, rgba(0, 214, 0, 0.15), transparent 75%)`
            : `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(0, 214, 0, 0.08), transparent 80%)`,
        }}
      />

      {/* Featured Flagship Ambient Glow Accent */}
      {isFeatured && (
        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/15 blur-[80px]" />
      )}

      {/* Top 3D Layer: Badges & Window Mockup */}
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
        
        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              style={{ transform: "translateZ(25px)" }}
              className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 ${
                isFeatured
                  ? "bg-accent/15 border-accent/40 text-accent shadow-[0_0_15px_rgba(0,214,0,0.3)]"
                  : "bg-white/5 border-white/10 text-accent group-hover:bg-accent/10 group-hover:border-accent/20"
              }`}
            >
              {isFeatured ? <Sparkles className="h-5 w-5 animate-pulse" /> : <FolderGit2 className="h-5 w-5" />}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono tracking-wider text-secondary-text">
                  PROJECT_0{index + 1}
                </span>
                {project.badge && (
                  <span
                    style={{ transform: "translateZ(20px)" }}
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      isFeatured
                        ? "bg-accent/20 text-accent border border-accent/40 font-mono shadow-[0_0_10px_rgba(0,214,0,0.2)]"
                        : "bg-white/5 text-white/80 border border-white/10"
                    }`}
                  >
                    {isFeatured && <span className="mr-1">🇨🇲</span>}
                    {project.badge}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Status Live Tag */}
          <div style={{ transform: "translateZ(40px)" }}>
            {isLive ? (
              <span className="inline-flex items-center rounded-full bg-accent/10 border border-accent/30 px-3 py-1 text-xs font-semibold text-accent shadow-[0_0_12px_rgba(0,214,0,0.15)]">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-accent animate-ping" />
                Live Demo
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-[#1b1b1b] border border-white/10 px-3 py-1 text-xs font-semibold text-secondary-text">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-secondary-text" />
                In Development
              </span>
            )}
          </div>
        </div>

        {/* 3D Browser Mockup Bar */}
        {isLive && (
          <div
            style={{ transform: "translateZ(35px)" }}
            className="mt-6 flex items-center justify-between rounded-lg border border-white/5 bg-black/40 px-3 py-1.5 font-mono text-[11px] text-secondary-text backdrop-blur-sm"
          >
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500/70" />
              <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
              <span className="h-2 w-2 rounded-full bg-green-500/70" />
              <span className="ml-2 flex items-center gap-1 text-white/60">
                <Globe2 className="h-3 w-3 text-accent" />
                https://{domain}
              </span>
            </div>
            <span className="text-[10px] text-accent/80 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> SSL_SECURE
            </span>
          </div>
        )}

        {/* Project Title */}
        <h3
          style={{ transform: "translateZ(30px)" }}
          className={`font-display font-bold text-white transition-colors duration-300 group-hover:text-accent ${
            isFeatured ? "mt-5 text-2xl sm:text-3xl lg:text-4xl" : "mt-5 text-xl sm:text-2xl"
          }`}
        >
          {project.title}
        </h3>

        {/* Tagline if available */}
        {project.tagline && (
          <p
            style={{ transform: "translateZ(25px)" }}
            className="mt-1 text-xs sm:text-sm font-medium text-accent/90 font-mono"
          >
            {project.tagline}
          </p>
        )}

        {/* Project Description */}
        <p
          style={{ transform: "translateZ(20px)" }}
          className={`mt-3 text-secondary-text leading-relaxed ${
            isFeatured ? "text-base sm:text-lg max-w-4xl" : "text-sm"
          }`}
        >
          {project.description}
        </p>
      </div>

      {/* Bottom 3D Layer: Tech Stack & CTA */}
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 mt-8">
        
        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              style={{ transform: "translateZ(20px)" }}
              className="rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-xs font-semibold text-white/80 transition-all duration-200 group-hover:border-accent/30 group-hover:text-white"
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ transform: "translateZ(40px)" }} className="pt-2">
          {isLive ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-lg font-semibold transition-all duration-300 ${
                isFeatured
                  ? "bg-accent px-5 py-2.5 text-sm text-black shadow-lg shadow-accent/20 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,214,0,0.4)]"
                  : "text-sm text-white group-hover:text-accent"
              }`}
            >
              <span>Visit Website ({domain})</span>
              <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#666666] cursor-not-allowed font-mono">
              Coming Soon
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </div>

      </div>

      {/* Decorative Border Glow */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none card-border-glow" />
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative bg-[#050505] py-24 md:py-32 overflow-hidden">
      {/* Background 3D Radial Overlays */}
      <div className="absolute left-1/2 top-1/3 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[140px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 -z-10 h-96 w-96 rounded-full bg-[#00ff00]/5 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div ref={ref} className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-accent mb-4"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Production Systems &amp; SaaS Platforms</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Featured Projects &amp; SaaS
          </motion.h2>

          <p className="mt-4 text-base text-secondary-text max-w-2xl mx-auto sm:text-lg">
            High-performance applications built from ground zero — from African multi-tenant SaaS to US real-time FinTech and security systems.
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 h-1 w-20 bg-accent text-glow origin-center"
          />
        </div>

        {/* 3D Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {siteConfig.projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
