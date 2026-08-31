"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Inline SVG components to replace missing lucide-react exports
const GlobeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
    <path strokeWidth="2" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const FileTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="14 2 14 8 20 8"></polyline>
    <line strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="16" y1="13" x2="8" y2="13"></line>
    <line strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="16" y1="17" x2="8" y2="17"></line>
    <polyline strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="10 9 9 9 8 9"></polyline>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const links = [
  {
    name: "Official Portfolio",
    url: "/",
    icon: <GlobeIcon className="w-5 h-5" />,
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Download Resume",
    url: "/resume",
    icon: <FileTextIcon className="w-5 h-5" />,
    color: "from-emerald-400 to-cyan-500",
  },
  {
    name: "LinkedIn",
    url: "/linkedin",
    icon: <LinkedinIcon className="w-5 h-5" />,
    color: "from-blue-600 to-blue-400",
  },
  {
    name: "GitHub",
    url: "/github",
    icon: <GithubIcon className="w-5 h-5" />,
    color: "from-gray-600 to-gray-400",
  },
  {
    name: "Instagram",
    url: "/instagram",
    icon: <InstagramIcon className="w-5 h-5" />,
    color: "from-pink-500 to-orange-400",
  },
  {
    name: "Contact Me",
    url: "mailto:contact@krishmahajan.dev",
    icon: <MailIcon className="w-5 h-5" />,
    color: "from-purple-500 to-pink-500",
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col items-center py-12 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#082f49_1px,transparent_1px),linear-gradient(to_bottom,#082f49_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-50" />
      
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-900/40 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-900/30 rounded-full blur-[120px] -z-10 animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-900/10 rounded-full blur-[150px] -z-10" />

      {/* Back Button */}
      <div className="w-full max-w-lg mb-6 relative z-10">
        <Link 
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-all duration-300 text-xs font-mono group"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          cd /home/portfolio
        </Link>
      </div>

      {/* Terminal Window Wrapper */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-[#0a0d1c]/80 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(8,145,178,0.2)] relative z-10"
      >
        {/* Terminal Header */}
        <div className="flex items-center px-4 py-3 border-b border-white/10 bg-white/5">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
          </div>
          <div className="mx-auto text-cyan-500/70 text-xs font-mono">
            krishmahajan@server: ~/links
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 sm:p-8">
          {/* Profile Header */}
          <div className="text-center mb-8 relative">
            {/* Glowing orb behind avatar */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 blur-2xl rounded-full" />
            
            <div className="relative w-28 h-28 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full animate-spin-slow opacity-50 blur-md" />
              <div className="relative w-full h-full bg-[#0a0d1c] rounded-full border-2 border-cyan-500/50 p-1 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                <img 
                  src="/IMG_7469.PNG" 
                  alt="Krish Mahajan"
                  className="w-full h-full rounded-full object-cover grayscale-0 hover:grayscale transition-all duration-500"
                />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold mb-4 tracking-wider text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
              Krish Mahajan
            </h1>
            
            {/* Linktree Bio */}
            <div className="text-sm mx-auto space-y-2 text-left font-mono bg-black/40 p-4 rounded-lg border border-cyan-500/20 text-gray-300">
              <p className="text-cyan-400 font-semibold border-b border-cyan-900/50 pb-2 mb-2">
                Junior Scientist | B.Tech CSE @ DKTE
              </p>
              <p className="flex items-center gap-2"><span>🏅</span> National Technology Week 2023 Honoree</p>
              <p className="flex items-center gap-2"><span>🎓</span> Campus Mantri @ GeeksforGeeks</p>
              <p className="flex items-center gap-2"><span>💻</span> ACSES President</p>
              <p className="flex items-center gap-2"><span>🤖</span> IoT & AI Enthusiast | ATL Alumni</p>
            </div>
          </div>

          {/* Link Tree */}
          <div className="w-full space-y-4">
            {links.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group relative flex items-center p-4 w-full bg-black/40 backdrop-blur-sm border border-white/5 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
              >
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r ${link.color} transition-opacity duration-300`} />
                
                {/* Glowing Edge on Hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 mr-4 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300">
                  {link.icon}
                </div>

                {/* Label */}
                <span className="font-mono text-sm tracking-wide text-gray-300 group-hover:text-white transition-colors duration-300">
                  {link.name}
                </span>

                {/* External Link Indicator */}
                {link.url.startsWith("http") && (
                  <svg className="w-4 h-4 ml-auto text-gray-600 group-hover:text-cyan-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-8 text-gray-600 text-xs font-mono"
      >
        © {new Date().getFullYear()} krishmahajan.dev
      </motion.div>
    </div>
  );
}
