"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Cpu } from "lucide-react";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Journey", href: "#journey" },
    { name: "GitHub", href: "#github-activity" },
    { name: "Contact", href: "#contact-form" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section tracking for active highlights
      const sections = navLinks.map(link => link.href.substring(1));
      let currentSection = "home";

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#050816]/75 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group font-heading font-bold text-lg tracking-wider text-white"
          >
            <div className="p-1 rounded-lg bg-brand-cyan/5 border border-brand-cyan/15 group-hover:border-brand-cyan/60 group-hover:shadow-[0_0_12px_rgba(0,245,255,0.35)] transition-all">
              <svg className="w-5 h-5" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" stroke="url(#nav-logo-grad)" strokeWidth="3.5" fill="rgba(0, 245, 255, 0.05)" />
                <path d="M32 30V70M32 50L48 30M32 50L48 70M52 70V30L68 52L84 30V70" stroke="url(#nav-logo-grad)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="nav-logo-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#00F5FF" />
                    <stop offset="100%" stopColor="#7F5AF0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span>
              krishmahajan<span className="text-brand-cyan font-extrabold">.dev</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const linkId = link.href.substring(1);
              const isActive = activeSection === linkId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                    isActive ? "text-brand-cyan" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-cyan shadow-[0_0_8px_#00F5FF]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
            
            {/* Terminal Option */}
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("toggle-terminal"));
              }}
              className="px-4 py-2 text-sm font-medium tracking-wide text-gray-400 hover:text-brand-cyan transition-colors duration-300 flex items-center gap-1 cursor-pointer font-mono"
            >
              <span className="text-brand-cyan font-bold">&gt;_</span>
              <span>Terminal</span>
            </button>
          </div>

          {/* CTAs / Social Shortcut */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact-form"
              className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider text-brand-cyan border border-brand-cyan/20 hover:border-brand-cyan hover:bg-brand-cyan/10 hover:shadow-[0_0_15px_rgba(0,245,255,0.2)] transition-all duration-300"
            >
              HIRE ME
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[73px] left-0 w-full z-30 bg-[#050816]/95 backdrop-blur-lg border-b border-white/5 md:hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-4">
              {navLinks.map((link) => {
                const linkId = link.href.substring(1);
                const isActive = activeSection === linkId;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 text-base font-medium tracking-wide border-l-2 pl-4 transition-all ${
                      isActive
                        ? "text-brand-cyan border-brand-cyan bg-brand-cyan/5"
                        : "text-gray-400 border-transparent hover:text-white hover:border-white/20"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              
              {/* Mobile Terminal Option */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent("toggle-terminal"));
                }}
                className="py-2 text-base font-mono font-medium tracking-wide border-l-2 pl-4 text-gray-400 border-transparent hover:text-brand-cyan hover:border-brand-cyan/20 flex items-center gap-1 cursor-pointer"
              >
                <span className="text-brand-cyan font-bold">&gt;_</span>
                <span>Terminal</span>
              </button>
              <a
                href="#contact-form"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 w-full py-3 rounded-xl text-center text-sm font-semibold tracking-wider bg-brand-cyan text-black hover:bg-brand-cyan/90 transition-all font-heading"
              >
                HIRE ME
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
