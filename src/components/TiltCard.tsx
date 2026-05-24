"use client";

import React, { useState, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  maxTilt = 10,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tilt angles
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth out coordinate tracking using springs
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Transform coordinates into degrees of rotation
  // rotateX is driven by Y coordinate (tilts up/down)
  // rotateY is driven by X coordinate (tilts left/right)
  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt]);

  // Shiny light reflection spotlight overlays
  const shimmerX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const shimmerY = useTransform(springY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate absolute mouse coordinates relative to card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize coordinates between 0 and 1
    const normalizedX = mouseX / width;
    const normalizedY = mouseY / height;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
      }}
    >
      {/* 1. Main child contents */}
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>

      {/* 2. Glass light shimmer reflection overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.25 : 0,
          background: `radial-gradient(circle 200px at ${shimmerX.get()} ${shimmerY.get()}, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 80%)`,
          mixBlendMode: "overlay",
        }}
      />
    </motion.div>
  );
};
