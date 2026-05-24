"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Mail, Sparkles } from "lucide-react";
import { LineWaves } from "./LineWaves";

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

// 3D Constellation Perspective Projection Canvas
const Canvas3DParticles: React.FC = () => {
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
    const count = isMobile ? 18 : 60; // Throttled count for high performance on tablets/phones

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

export const Hero: React.FC = () => {
  const subtitles = [
    "Computer Science Student",
    "Innovator & Product Builder",
    "Future-Focused Developer",
    "Research & Technology Enthusiast",
  ];

  const [subIndex, setSubIndex] = useState(0);
  const [downloadState, setDownloadState] = useState<"idle" | "scanning" | "decrypted">("idle");
  const [scanMessage, setScanMessage] = useState("Scan Initiated");
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setSubIndex((prev) => (prev + 1) % subtitles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleTilt = (e: React.MouseEvent) => {
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;
    if (isMobile || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -y / 35,
      y: x / 35,
    });
  };

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleDownload = () => {
    if (downloadState !== "idle") return;

    setDownloadState("scanning");
    setScanMessage("INITIALIZING HANDSHAKE...");

    setTimeout(() => {
      setScanMessage("RETRIEVING ENCRYPTED PDF...");
    }, 850);

    setTimeout(() => {
      setScanMessage("DECRYPTING PAYLOAD...");
    }, 1700);

    setTimeout(() => {
      setDownloadState("decrypted");
      setScanMessage("DECRYPTION SUCCESSFUL!");
      
      const link = document.createElement("a");
      link.href = "/Krish_Mahajan_Resume.pdf";
      link.setAttribute("download", "Krish_Mahajan_Resume.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        setDownloadState("idle");
      }, 1500);
    }, 2500);
  };

  const socials = [
    {
      name: "GitHub",
      href: "https://github.com/Krishmahajan334",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
      color: "hover:text-brand-cyan hover:border-brand-cyan/40 hover:shadow-[0_0_15px_rgba(0,245,255,0.25)]",
    },
    {
      name: "LinkedIn",
      href: "https://in.linkedin.com/in/krish-mahajan-617b50206",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      color: "hover:text-brand-purple hover:border-brand-purple/40 hover:shadow-[0_0_15px_rgba(127,90,240,0.25)]",
    },
    {
      name: "Email",
      href: "mailto:krishmahajan334@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      color: "hover:text-brand-green hover:border-brand-green/40 hover:shadow-[0_0_15px_rgba(29,205,159,0.25)]",
    },
  ];

  return (
    <section
      id="home"
      className="relative w-full flex flex-col justify-center items-center overflow-hidden bg-[#050816] pt-24 px-4 sm:px-6 md:px-8 select-none"
      style={{ minHeight: "100vh" }}
    >
      {/* Dynamic line wave shader */}
      <LineWaves />

      {/* HTML5 3D Perspective Projection Constellation Canvas */}
      <Canvas3DParticles />

      {/* Cinematic Ambient mesh spotlights with drift animations */}
      <div className="absolute top-[15%] left-[5%] w-[45vw] h-[45vw] bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none z-0 animate-spotlight-drift" />
      <div className="absolute bottom-[15%] right-[5%] w-[45vw] h-[45vw] bg-brand-purple/5 rounded-full blur-[140px] pointer-events-none z-0 animate-spotlight-drift [animation-delay:4s]" />

      <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 md:py-24">
        
        {/* Left Side: 3D Mouse Reactive Content Card */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
          style={{
            transformStyle: "preserve-3d",
            perspective: 1000,
          }}
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="lg:col-span-8 flex flex-col items-start gap-6 text-left"
        >
          {/* Banner Tag */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 text-[9px] sm:text-xs font-semibold tracking-widest text-brand-cyan uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-cyan" />
            <span>DST ASSOCIATED JUNIOR SCIENTIST</span>
          </motion.div>

          {/* Premium Beveled Title with Responsive Typography */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-none tracking-tight"
            >
              Krish Mahajan
            </motion.h1>

            {/* Subtitle Vertical Ticker */}
            <div className="h-[44px] flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={subtitles[subIndex]}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="shimmer-text-cyan text-base sm:text-lg md:text-xl lg:text-2xl font-heading font-bold tracking-wide"
                >
                  {subtitles[subIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Main Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl font-sans font-light leading-relaxed max-w-xl"
          >
            Building intelligent systems, impactful products, and futuristic digital experiences.
          </motion.p>

          {/* Glassmorphism CTA Button Group with Touch Tap Scaling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 mt-4 w-full"
          >
            {/* View Projects */}
            <motion.a
              href="#projects"
              whileTap={{ scale: 0.96 }}
              className="relative group overflow-hidden px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-brand-cyan/90 to-brand-cyan text-black hover:shadow-[0_0_25px_rgba(0,245,255,0.45)] transition-all duration-300 font-heading flex items-center gap-2"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            {/* Download Resume Simulator */}
            <motion.button
              onClick={handleDownload}
              disabled={downloadState !== "idle"}
              whileTap={{ scale: 0.96 }}
              className="relative px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold border border-white/10 hover:border-brand-cyan/35 bg-white/5 hover:bg-brand-cyan/5 text-white transition-all duration-300 font-heading flex items-center gap-2 group overflow-hidden"
            >
              {downloadState === "idle" && (
                <>
                  <Download className="w-4 h-4 group-hover:animate-bounce" />
                  <span>Download Resume</span>
                  <span className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent group-hover:animate-shine" style={{ animation: "shine 3s ease-in-out infinite" }} />
                </>
              )}

              {downloadState === "scanning" && (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-brand-cyan border-t-transparent animate-spin" />
                  <span className="text-brand-cyan text-[10px] sm:text-xs font-bold tracking-widest">{scanMessage}</span>
                  <span className="absolute left-0 w-full h-[2px] bg-brand-cyan/60 animate-bounce" style={{ top: "40%" }} />
                </>
              )}

              {downloadState === "decrypted" && (
                <>
                  <Sparkles className="w-4 h-4 text-brand-green animate-pulse" />
                  <span className="text-brand-green font-bold text-[10px] sm:text-xs tracking-wider">{scanMessage}</span>
                </>
              )}
            </motion.button>

            {/* Contact Me */}
            <a
              href="#contact-form"
              className="px-5 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
            >
              <span>Contact Me</span>
              <Mail className="w-4 h-4 group-hover:-translate-y-[2px] transition-transform" />
            </a>
          </motion.div>

          {/* Custom Floating Social connect hubs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex items-center gap-3 mt-6 text-gray-400 z-10"
          >
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className={`p-2.5 rounded-xl border border-white/5 bg-white/5 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 ${social.color}`}
              >
                {social.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side: Interactive Concentric Glow Rings (Responsive hides or sizes) */}
        <div className="lg:col-span-4 relative flex justify-center items-center h-[260px] lg:h-[400px] pointer-events-none select-none">
          {/* Spinning orbits */}
          <div className="absolute w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] rounded-full border border-white/5 animate-spin [animation-duration:50s]" />
          <div className="absolute w-[150px] h-[150px] sm:w-[220px] sm:h-[220px] rounded-full border border-dashed border-white/10 animate-spin [animation-duration:25s] [animation-direction:reverse]" />

          {/* Central Core indicator */}
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[90px] h-[90px] sm:w-[130px] sm:h-[130px] rounded-full border border-brand-cyan/20 bg-brand-cyan/5 backdrop-blur-md flex flex-col justify-center items-center shadow-[0_0_40px_rgba(0,245,255,0.08)]"
          >
            <Sparkles className="w-6 h-6 text-brand-cyan mb-1 animate-pulse" />
            <span className="text-[8px] font-heading font-extrabold text-brand-cyan tracking-widest uppercase">CORE COMPILER</span>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
