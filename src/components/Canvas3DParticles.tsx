"use client";

import React, { useEffect, useRef } from "react";

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  alpha: number;
  color: string;
}

export const Canvas3DParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track pointers and hover state
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      isHoveredRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Device-smart adaptive particle throttling
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const count = isMobile ? 10 : 60; // Heavily throttled on mobile to save battery

    const particles: Particle3D[] = [];
    const fov = 350; // Perspective focal length

    // Initialize in 3D coordinate space around central origin
    for (let i = 0; i < count; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.2,
        y: (Math.random() - 0.5) * height * 1.2,
        z: Math.random() * 300 - 150,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.1, // Slow drift
        vz: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.4 + 0.2,
        color: Math.random() > 0.5 ? "0, 245, 255" : "127, 90, 240", // Cyan or Purple
      });
    }

    let rotX = 0;
    let rotY = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth camera interpolation based on cursor coordinates (cinematic inertia)
      const targetRotY = isHoveredRef.current ? (mouseRef.current.x - width / 2) * 0.0005 : 0;
      const targetRotX = isHoveredRef.current ? (mouseRef.current.y - height / 2) * 0.0005 : 0;

      rotY += (targetRotY - rotY) * 0.04;
      rotX += (targetRotX - rotX) * 0.04;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Projected coords cache array
      const projected: { x: number; y: number; zDepth: number; color: string; alpha: number; radius: number }[] = [];

      // Translate, rotate, and project 3D coordinates
      for (let i = 0; i < count; i++) {
        const p = particles[i];

        // Update velocities
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Space boundaries wrap
        if (p.x < -width) p.x = width;
        if (p.x > width) p.x = -width;
        if (p.y < -height) p.y = height;
        if (p.y > height) p.y = -height;
        if (p.z < -150) p.z = 150;
        if (p.z > 150) p.z = -150;

        // 3D coordinate rotation Y-axis (Yaw)
        const xRotY = p.x * cosY - p.z * sinY;
        const zRotY = p.x * sinY + p.z * cosY;

        // 3D coordinate rotation X-axis (Pitch)
        const yRotX = p.y * cosX - zRotY * sinX;
        const zFinal = p.y * sinX + zRotY * cosX;

        // Perspective Projection calculation
        const scale = fov / (fov + zFinal);
        const screenX = xRotY * scale + width / 2;
        const screenY = yRotX * scale + height / 2;

        // Push away from mouse in projected space if close
        if (isHoveredRef.current) {
          const dx = screenX - mouseRef.current.x;
          const dy = screenY - mouseRef.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            const force = (120 - dist) / 120 * 0.6;
            p.x += (dx / dist) * force * 5;
            p.y += (dy / dist) * force * 5;
          }
        }

        projected.push({
          x: screenX,
          y: screenY,
          zDepth: zFinal,
          color: p.color,
          alpha: p.alpha * scale,
          radius: p.radius * scale,
        });
      }

      // Draw connection lines inside 3D space
      for (let i = 0; i < count; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < count; j++) {
          const p2 = projected[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 90) {
            const depthDiff = Math.abs(p1.zDepth - p2.zDepth);
            if (depthDiff < 80) {
              const alpha = (1 - dist / 90) * 0.1 * p1.alpha;
              ctx.strokeStyle = `rgba(0, 245, 255, ${alpha})`;
              ctx.lineWidth = 0.5 * (fov / (fov + (p1.zDepth + p2.zDepth) / 2));
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw particles
      for (let i = 0; i < count; i++) {
        const p = projected[i];
        if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) continue;

        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.2, p.radius), 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-50" />;
};
