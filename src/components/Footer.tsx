"use client";

import React, { useEffect, useState } from "react";
import { Mail, ArrowUp, Cpu } from "lucide-react";

export const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
      color: "hover:text-brand-cyan hover:border-brand-cyan hover:shadow-[0_0_10px_#00F5FF]",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/Krishmahajan334",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      color: "hover:text-brand-cyan hover:border-brand-cyan hover:shadow-[0_0_10px_#00F5FF]",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/mahajanclicks.io",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      color: "hover:text-brand-green hover:border-brand-green hover:shadow-[0_0_10px_#1DCD9F]",
    },
    {
      name: "Email",
      href: "mailto:krishmahajan334@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      color: "hover:text-brand-purple hover:border-brand-purple hover:shadow-[0_0_10px_#7F5AF0]",
    },
  ];

  return (
    <footer className="relative w-full bg-[#03050e] border-t border-white/5 py-12 md:py-16 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center gap-8">
        {/* Brand / Logo */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2 font-heading font-bold text-xl tracking-wider text-white">
            <div className="p-1 rounded-lg bg-brand-cyan/5 border border-brand-cyan/15">
              <svg className="w-5 h-5" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" stroke="url(#foot-logo-grad)" strokeWidth="3.5" fill="rgba(0, 245, 255, 0.05)" />
                <path d="M32 30V70M32 50L48 30M32 50L48 70M52 70V30L68 52L84 30V70" stroke="url(#foot-logo-grad)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="foot-logo-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#00F5FF" />
                    <stop offset="100%" stopColor="#7F5AF0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span>
              krishmahajan<span className="text-brand-cyan font-extrabold">.dev</span>
            </span>
          </div>
          <p className="text-gray-400 max-w-sm text-sm">
            Building intelligent software, high-performance edge systems, and cinematic web architectures.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full border border-white/10 bg-[#050816]/80 text-gray-400 transition-all duration-300 ${social.color}`}
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Horizontal Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent my-2" />

        {/* Footer Meta info */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 text-center md:text-left">
          <p>© {new Date().getFullYear()} Krish Mahajan. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-brand-cyan transition-colors">About</a>
            <a href="#projects" className="hover:text-brand-cyan transition-colors">Projects</a>
            <a href="#journey" className="hover:text-brand-cyan transition-colors">Journey</a>
            <a href="#contact-form" className="hover:text-brand-cyan transition-colors">Contact</a>
          </div>
          <p className="flex items-center gap-1.5 justify-center">
            <span>Designed for the Future</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping" />
          </p>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-30 p-3 rounded-xl border border-brand-cyan bg-[#050816]/90 text-brand-cyan shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:shadow-[0_0_25px_rgba(0,245,255,0.6)] hover:bg-brand-cyan hover:text-black transition-all duration-300 animate-bounce"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
};
