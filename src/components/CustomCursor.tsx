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
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-cyan rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
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
