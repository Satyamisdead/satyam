"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Code, Server, Shield, Sparkles } from "lucide-react";

function SkillCategoryCard({
  cat,
  catIndex,
}: {
  cat: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    skills: string[];
    description: string;
  };
  catIndex: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    setCoords({ x: mouseX, y: mouseY });

    const rX = -((mouseY - height / 2) / height) * 14;
    const rY = ((mouseX - width / 2) / width) * 14;
    setRotate({ x: rX, y: rY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const IconComponent = cat.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: catIndex * 0.1 }}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
      className="relative flex flex-col justify-between rounded-2xl border border-white/5 bg-[#101010] p-8 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_30px_rgba(0,214,0,0.05)] group overflow-hidden"
    >
      {/* 3D Specular Glare */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, rgba(0, 214, 0, 0.08), transparent 80%)`,
        }}
      />

      <div style={{ transform: "translateZ(20px)" }}>
        {/* Category Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div
            style={{ transform: "translateZ(30px)" }}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-black group-hover:shadow-[0_0_15px_rgba(0,214,0,0.3)]"
          >
            <IconComponent className="h-5 w-5" />
          </div>
          <h3
            style={{ transform: "translateZ(25px)" }}
            className="font-display text-lg font-bold text-white group-hover:text-accent transition-colors duration-300"
          >
            {cat.title}
          </h3>
        </div>

        <p
          style={{ transform: "translateZ(15px)" }}
          className="text-sm text-secondary-text leading-relaxed mb-8"
        >
          {cat.description}
        </p>
      </div>

      {/* 3D Skill Chips */}
      <div style={{ transform: "translateZ(30px)" }} className="flex flex-wrap gap-2.5">
        {cat.skills.map((skill) => (
          <motion.div
            key={skill}
            whileHover={{ scale: 1.08, z: 20 }}
            className="cursor-default rounded-lg bg-white/5 border border-white/10 hover:border-accent/40 hover:bg-accent/10 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white/90 transition-all duration-200 hover:text-accent hover:shadow-[0_0_15px_rgba(0,214,0,0.2)]"
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  const categories = [
    {
      title: "Frontend & Mobile",
      icon: Code,
      skills: siteConfig.skills.frontend,
      description: "Building responsive, modern, dynamic client interfaces and cross-platform mobile apps for iOS and Android."
    },
    {
      title: "Backend & Multi-Tenant SaaS",
      icon: Server,
      skills: siteConfig.skills.backend,
      description: "Developing scalable backend servers, PostgreSQL databases, Prisma ORM, APIs, and multi-tenant SaaS workflows."
    },
    {
      title: "Security, DevSecOps & Tools",
      icon: Shield,
      skills: siteConfig.skills.toolsAndSecurity,
      description: "Assessing enterprise system safety, penetration testing, Docker containers, CI/CD pipelines, and Android systems."
    }
  ];

  return (
    <section id="skills" className="relative bg-[#050505] py-24 md:py-32">
      {/* Background decoration elements */}
      <div className="absolute right-0 top-1/4 -z-10 h-72 w-72 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-1/3 bottom-0 -z-10 h-96 w-96 rounded-full bg-[#002200]/5 blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div ref={ref} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-accent mb-4"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Technologies &amp; Architecture</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Technical Stack &amp; Infrastructure
          </motion.h2>
          <p className="mt-4 text-base text-secondary-text max-w-2xl mx-auto sm:text-lg">
            A comprehensive toolbox of programming languages, SaaS frameworks, databases, and cybersecurity protocols I employ.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 h-1 w-20 bg-accent text-glow origin-center"
          />
        </div>

        {/* Categories 3D Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((cat, catIndex) => (
            <SkillCategoryCard
              key={cat.title}
              cat={cat}
              catIndex={catIndex}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
