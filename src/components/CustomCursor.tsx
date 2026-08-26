"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: -100, y: -100 });
  const [elementRadius, setElementRadius] = useState("9999px");

  useEffect(() => {
    // Disable custom cursor automatically on mobile/touch interfaces
    const isDesktop = window.matchMedia("(pointer: fine)").matches;
    if (!isDesktop) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      
      // RequestAnimationFrame for better performance than raw React state
      requestAnimationFrame(() => {
        setCoords({ x, y });
        document.documentElement.style.setProperty("--cursor-torch-x", `${x}px`);
        document.documentElement.style.setProperty("--cursor-torch-y", `${y}px`);
      });
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], .clickable, select, input, textarea") as HTMLElement;
      
      if (interactive) {
        setIsHovered(true);
        const style = window.getComputedStyle(interactive);
        setElementRadius(style.borderRadius && style.borderRadius !== "0px" ? style.borderRadius : "8px");
      } else {
        setIsHovered(false);
        setElementRadius("9999px");
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.body.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden mix-blend-difference">
      {/* Primary Dot */}
      <motion.div
        className="absolute top-0 left-0 bg-white"
        animate={{
          x: coords.x - 4,
          y: coords.y - 4,
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 40, mass: 0.1 }}
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
        }}
      />

      {/* Outer Ring / Bounding Box */}
      <motion.div
        className="absolute top-0 left-0 border border-white/50"
        animate={{
          x: coords.x - (isHovered ? 24 : 16),
          y: coords.y - (isHovered ? 24 : 16),
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          borderRadius: isHovered ? elementRadius : "50%",
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.1)" : "transparent",
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.5,
        }}
      />
    </div>
  );
};
