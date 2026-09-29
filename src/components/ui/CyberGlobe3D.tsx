"use client";
import React, { useEffect, useRef, useState } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  ox: number;
  oy: number;
  oz: number;
}

export default function CyberGlobe3D({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || 340);
    let height = (canvas.height = canvas.offsetHeight || 340);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 340;
      height = canvas.height = canvas.offsetHeight || 340;
    };
    window.addEventListener("resize", handleResize);

    // Generate 3D sphere points (Fibonacci sphere distribution)
    const points: Point3D[] = [];
    const numPoints = 140;
    const radius = Math.min(width, height) * 0.38;

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      points.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        ox: x * radius,
        oy: y * radius,
        oz: z * radius,
      });
    }

    // Add extra satellite rings for high-tech 3D look
    const ringPoints: Point3D[] = [];
    const numRingPoints = 36;
    const ringRadius = radius * 1.32;
    for (let i = 0; i < numRingPoints; i++) {
      const angle = (i / numRingPoints) * Math.PI * 2;
      const rx = Math.cos(angle) * ringRadius;
      const rz = Math.sin(angle) * ringRadius;
      ringPoints.push({
        x: rx,
        y: rx * 0.2, // Tilted ring
        z: rz,
        ox: rx,
        oy: rx * 0.2,
        oz: rz,
      });
    }

    let rotX = 0.3;
    let rotY = 0;
    let targetRotSpeedX = 0.002;
    let targetRotSpeedY = 0.005;
    let mouseX = 0;
    let mouseY = 0;
    let isMouseDown = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isMouseDown = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      lastMouseX = clientX;
      lastMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (isMouseDown) {
        const deltaX = clientX - lastMouseX;
        const deltaY = clientY - lastMouseY;
        rotY += deltaX * 0.008;
        rotX -= deltaY * 0.008;
        lastMouseX = clientX;
        lastMouseY = clientY;
      }

      const rect = canvas.getBoundingClientRect();
      mouseX = ((clientX - rect.left) / width - 0.5) * 2;
      mouseY = ((clientY - rect.top) / height - 0.5) * 2;
    };

    const onPointerUp = () => {
      isMouseDown = false;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousedown", onPointerDown);
      container.addEventListener("touchstart", onPointerDown, { passive: true });
      window.addEventListener("mousemove", onPointerMove);
      window.addEventListener("touchmove", onPointerMove, { passive: true });
      window.addEventListener("mouseup", onPointerUp);
      window.addEventListener("touchend", onPointerUp);
    }

    const fov = 420;

    const render = () => {
      if (!isMouseDown) {
        // Natural continuous 3D rotation
        rotY += targetRotSpeedY + mouseX * 0.003;
        rotX += targetRotSpeedX - mouseY * 0.002;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Rotate and project core sphere points
      const projected = points.map((p) => {
        // Y-axis rotation
        const x1 = p.ox * cosY - p.oz * sinY;
        const z1 = p.oz * cosY + p.ox * sinY;

        // X-axis rotation
        const y2 = p.oy * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.oy * sinX;

        const scale = fov / (fov + z2);
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;
        const alpha = Math.max(0.12, Math.min(1, (z2 + radius) / (2 * radius)));

        return { px, py, z: z2, scale, alpha };
      });

      // Sort points by Z (back to front) for accurate 3D rendering
      projected.sort((a, b) => a.z - b.z);

      // Draw connection lines between nearby vertices
      ctx.lineWidth = 0.75;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (p1.z < -radius * 0.3) continue; // Only draw visible front/mid lines

        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const distSq = dx * dx + dy * dy;

          if (distSq < 1300) {
            const lineAlpha = (1 - distSq / 1300) * 0.25 * p1.alpha;
            ctx.strokeStyle = `rgba(0, 214, 0, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw particle nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const dotSize = Math.max(1, p.scale * 2.2);

        // Core dot
        ctx.fillStyle = `rgba(0, 214, 0, ${p.alpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(p.px, p.py, dotSize, 0, Math.PI * 2);
        ctx.fill();

        // Glowing outer halo on foreground nodes
        if (p.z > 0) {
          ctx.fillStyle = `rgba(0, 214, 0, ${p.alpha * 0.25})`;
          ctx.beginPath();
          ctx.arc(p.px, p.py, dotSize * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Render outer tilted orbital ring
      const projectedRing = ringPoints.map((p) => {
        const x1 = p.ox * cosY - p.oz * sinY;
        const z1 = p.oz * cosY + p.ox * sinY;
        const y2 = p.oy * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.oy * sinX;
        const scale = fov / (fov + z2);
        return {
          px: cx + x1 * scale,
          py: cy + y2 * scale,
          z: z2,
          alpha: Math.max(0.08, Math.min(0.9, (z2 + ringRadius) / (2 * ringRadius))),
        };
      });

      // Draw ring line
      ctx.lineWidth = 1;
      for (let i = 0; i < projectedRing.length; i++) {
        const p1 = projectedRing[i];
        const p2 = projectedRing[(i + 1) % projectedRing.length];
        const avgZ = (p1.z + p2.z) / 2;
        const ringAlpha = (p1.alpha + p2.alpha) / 2;

        ctx.strokeStyle =
          avgZ > 0
            ? `rgba(0, 214, 0, ${ringAlpha * 0.5})`
            : `rgba(0, 214, 0, ${ringAlpha * 0.12})`;

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();

        // Pulsing orbital satellites
        if (i % 6 === 0) {
          ctx.fillStyle = `rgba(0, 214, 0, ${p1.alpha * 0.95})`;
          ctx.beginPath();
          ctx.arc(p1.px, p1.py, avgZ > 0 ? 3 : 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("mousedown", onPointerDown);
        container.removeEventListener("touchstart", onPointerDown);
      }
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative select-none cursor-grab active:cursor-grabbing ${className}`}
      title="Interactive 3D Cyber Globe — Drag to rotate"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block drop-shadow-[0_0_25px_rgba(0,214,0,0.25)]"
      />

      {/* Floating 3D HUD Coordinates Badge */}
      <div className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-accent/20 bg-black/70 px-3 py-1 text-[10px] font-mono text-accent backdrop-blur-md shadow-lg shadow-black/80">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
        <span>3D CYBER_GRID // ORBITAL MATRIX</span>
      </div>
    </div>
  );
}
