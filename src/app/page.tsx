"use client";

import React, { useEffect } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Journey } from "@/components/Journey";
import { GithubStats } from "@/components/GithubStats";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  // Global mouse coordinates listener to feed CSS variables for Vercel Spotlight Grid
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* 1. Vercel-style interactive Spotlight Coordinate Grid */}
      <div className="cyber-grid-container">
        <div className="cyber-grid" />
        <div className="cyber-torch-leak" />
      </div>

      {/* 2. Custom Magnetic Lag-trail Laser Cursor (Active on Desktop fine pointers) */}
      <CustomCursor />

      {/* 3. Frosted Floating Responsive Header Navbar */}
      <Navbar />

      {/* 4. Main cinematic layout structure */}
      <main className="flex flex-col flex-grow w-full bg-[#050816] relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <GithubStats />
        <Contact />
      </main>

      {/* 5. Glowing Cyber Footer block */}
      <Footer />
    </>
  );
}
