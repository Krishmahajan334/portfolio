"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailNode {
  id: number;
  x: number;
  y: number;
  size: number;
  alpha: number;
}

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: -100, y: -100 });
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);
  const [elementRadius, setElementRadius] = useState("9999px");
  const [trail, setTrail] = useState<TrailNode[]>([]);
  const trailIdRef = useRef(0);
  const lastEmitRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable custom cursor automatically on mobile/touch interfaces
    const isDesktop = window.matchMedia("(pointer: fine)").matches;
    if (!isDesktop) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      setCoords({ x, y });

      // Feed global CSS custom variables for general background torch effect
      document.documentElement.style.setProperty("--cursor-torch-x", `${x}px`);
      document.documentElement.style.setProperty("--cursor-torch-y", `${y}px`);

      // Emit a trailing energy particle node only if moved significantly (performance optimization)
      const dist = Math.hypot(x - lastEmitRef.current.x, y - lastEmitRef.current.y);
      if (dist > 12) {
        trailIdRef.current += 1;
        const newNode: TrailNode = {
          id: trailIdRef.current,
          x,
          y,
          size: Math.random() * 4 + 2,
          alpha: 0.6,
        };
        setTrail((prev) => [...prev.slice(-12), newNode]); // Cap max trails at 12 nodes for 60fps
        lastEmitRef.current = { x, y };
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], .clickable, select, input, textarea") as HTMLElement;
      
      if (interactive) {
        setActiveElement(interactive);
        setIsHovered(true);

        const style = window.getComputedStyle(interactive);
        setElementRadius(style.borderRadius && style.borderRadius !== "0px" ? style.borderRadius : "8px");
      } else {
        setActiveElement(null);
        setIsHovered(false);
        setElementRadius("9999px");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  // Frame tick to dissolve the energy trail array smoothly
  useEffect(() => {
    if (trail.length === 0) return;
    
    const interval = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((node) => ({ ...node, alpha: node.alpha - 0.08, size: Math.max(0, node.size - 0.2) }))
          .filter((node) => node.alpha > 0)
      );
    }, 45);

    return () => clearInterval(interval);
  }, [trail]);

  if (!isVisible) return null;

  let haloX = coords.x;
  let haloY = coords.y;
  let haloWidth = 32;
  let haloHeight = 32;
  let borderRadius = "9999px";
  let isMagnetized = false;

  if (activeElement) {
    const rect = activeElement.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      haloX = rect.left + rect.width / 2;
      haloY = rect.top + rect.height / 2;
      haloWidth = rect.width + 12;
      haloHeight = rect.height + 12;
      borderRadius = elementRadius;
      isMagnetized = true;
    }
  } else if (isHovered) {
    haloWidth = 44;
    haloHeight = 44;
  }

  return (
    <>
      {/* 1. Dissolving Glowing Energy Node Trail Wake */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden mix-blend-screen">
        <AnimatePresence>
          {trail.map((node) => (
            <motion.div
              key={node.id}
              initial={{ opacity: node.alpha, scale: 1 }}
              animate={{ opacity: node.alpha, scale: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute bg-brand-cyan rounded-full"
              style={{
                left: node.x - node.size / 2,
                top: node.y - node.size / 2,
                width: node.size,
                height: node.size,
                boxShadow: "0 0 10px #00F5FF, 0 0 20px rgba(0, 245, 255, 0.5)",
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* 2. Outer Snapping Magnetic Halo Ring (Elastic Spring Physics) */}
      <motion.div
        className="fixed top-0 left-0 border pointer-events-none z-50 mix-blend-screen -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: haloX,
          y: haloY,
          width: haloWidth,
          height: haloHeight,
          borderRadius: borderRadius,
          borderColor: isMagnetized ? "rgba(0, 245, 255, 0.85)" : "rgba(127, 90, 240, 0.45)",
          backgroundColor: isMagnetized ? "rgba(0, 245, 255, 0.05)" : isHovered ? "rgba(127, 90, 240, 0.12)" : "rgba(0, 0, 0, 0)",
          boxShadow: isMagnetized
            ? "0 0 30px rgba(0, 245, 255, 0.5), inset 0 0 15px rgba(0, 245, 255, 0.25)"
            : isHovered
            ? "0 0 20px rgba(127, 90, 240, 0.4)"
            : "0 0 10px rgba(127, 90, 240, 0.18)",
        }}
        transition={{
          type: "spring",
          stiffness: isMagnetized ? 250 : 180,
          damping: isMagnetized ? 20 : 22,
          mass: 0.4,
        }}
      />

      {/* 3. Inner Laser Core Focus point */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-cyan rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: coords.x,
          y: coords.y,
          scale: isHovered ? 1.4 : 1,
          boxShadow: isHovered
            ? "0 0 20px #00F5FF, 0 0 40px #00F5FF"
            : "0 0 10px #00F5FF, 0 0 20px #00F5FF",
        }}
        transition={{
          type: "spring",
          stiffness: 450,
          damping: 25,
        }}
      />
    </>
  );
};
