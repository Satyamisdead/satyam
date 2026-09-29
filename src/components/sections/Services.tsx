"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/config/site";
import {
  Smartphone,
  Globe,
  LayoutDashboard,
  Cpu,
  ShieldAlert,
  Lock,
  Bug,
  Zap,
  Cloud,
  ChevronRight,
  Code
} from "lucide-react";

// Helper to map title strings to lucide icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Mobile App Development": Smartphone,
  "Android Development": Smartphone,
  "React Native Development": Smartphone,
  "Website Development": Globe,
  "Admin Panel Development": LayoutDashboard,
  "API Development": Cpu,
  "Cyber Security Assessment": ShieldAlert,
  "Website Security Audit": Lock,
  "Bug Hunting": Bug,
  "Performance Optimization": Zap,
  "Cloud Deployment": Cloud,
};

function ServiceCard({
  service,
  index,
}: {
  service: { title: string; desc: string };
  index: number;
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

  const IconComponent = iconMap[service.title] || Code;

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={scrollToContact}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
      className="group relative flex flex-col justify-between rounded-xl border border-white/5 bg-[#101010] p-6 transition-all duration-300 hover:border-accent/40 hover:bg-[#121212] hover:shadow-[0_0_25px_rgba(0,214,0,0.06)] cursor-pointer overflow-hidden"
    >
      {/* Dynamic 3D Cursor Spotlight Specular Reflection */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(0, 214, 0, 0.1), transparent 80%)`,
        }}
      />

      <div style={{ transform: "translateZ(20px)" }}>
        {/* Service Icon */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white transition-all duration-300 group-hover:bg-accent group-hover:border-accent group-hover:text-black group-hover:shadow-[0_0_20px_rgba(0,214,0,0.4)]"
        >
          <IconComponent className="h-6 w-6" />
        </div>

        {/* Service Title */}
        <h4
          style={{ transform: "translateZ(25px)" }}
          className="mt-5 font-display text-lg font-bold text-white group-hover:text-accent transition-colors duration-300"
        >
          {service.title}
        </h4>

        {/* Service Description */}
        <p
          style={{ transform: "translateZ(15px)" }}
          className="mt-2 text-sm text-secondary-text leading-relaxed"
        >
          {service.desc}
        </p>
      </div>

      {/* Interactive footer line */}
      <div
        style={{ transform: "translateZ(25px)" }}
        className="mt-6 flex items-center gap-1 text-xs font-semibold text-accent/50 group-hover:text-accent transition-all duration-300"
      >
        <span>Get consultation</span>
        <ChevronRight className="h-3 w-3 translate-x-[-4px] group-hover:translate-x-0 transition-transform duration-300" />
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  return (
    <section id="services" className="relative bg-[#050505] py-24 md:py-32">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-20" />
      <div className="absolute left-0 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div ref={ref} className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Engineering &amp; Security Services
          </motion.h2>
          <p className="mt-4 text-base text-secondary-text max-w-2xl mx-auto">
            From multi-tenant SaaS architecture and mobile applications to cybersecurity penetration testing and cloud scaling.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 h-1 w-20 bg-accent text-glow origin-center"
          />
        </div>

        {/* Categories Layout */}
        <div className="space-y-20">
          {siteConfig.services.map((categoryGroup) => {
            const isDev = categoryGroup.category === "Development";

            return (
              <div key={categoryGroup.category} className="space-y-8">
                {/* Category Header */}
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/15 border border-accent/30 text-accent">
                    {isDev ? <Code className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-wider text-white uppercase">
                    {isDev ? "Software Development & SaaS" : "Security & Optimizations"}
                  </h3>
                </div>

                {/* Services 3D Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryGroup.items.map((service, index) => (
                    <ServiceCard
                      key={service.title}
                      service={service}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
