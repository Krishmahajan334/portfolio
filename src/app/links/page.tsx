"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, FileText, Mail, Globe, ArrowLeft } from "lucide-react";
import Link from "next/link";

const links = [
  {
    name: "Official Portfolio",
    url: "/",
    icon: <Globe className="w-5 h-5" />,
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Download Resume",
    url: "/resume",
    icon: <FileText className="w-5 h-5" />,
    color: "from-emerald-400 to-cyan-500",
  },
  {
    name: "LinkedIn",
    url: "/linkedin",
    icon: <Linkedin className="w-5 h-5" />,
    color: "from-blue-600 to-blue-400",
  },
  {
    name: "GitHub",
    url: "/github",
    icon: <Github className="w-5 h-5" />,
    color: "from-gray-600 to-gray-400",
  },
  {
    name: "Instagram",
    url: "/instagram",
    icon: <Instagram className="w-5 h-5" />,
    color: "from-pink-500 to-orange-400",
  },
  {
    name: "Contact Me",
    url: "mailto:contact@krishmahajan.dev",
    icon: <Mail className="w-5 h-5" />,
    color: "from-purple-500 to-pink-500",
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col items-center py-16 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -z-10" />

      {/* Back Button */}
      <div className="w-full max-w-md mb-8">
        <Link 
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm font-mono"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          BACK_TO_MAIN
        </Link>
      </div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="relative w-28 h-28 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full animate-spin-slow opacity-50 blur-md" />
          <div className="relative w-full h-full bg-[#0a0d1c] rounded-full border border-cyan-500/30 p-1 flex items-center justify-center overflow-hidden">
            {/* Fallback avatar if image fails to load, or use actual image */}
            <img 
              src="/gallery/ncsc/IMG-20230214-WA0000.jpg" 
              alt="Krish Mahajan"
              className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2 tracking-wider">KRISH MAHAJAN</h1>
        <p className="text-cyan-400 font-mono text-sm mb-4 tracking-widest">FULL STACK DEVELOPER</p>
        <p className="text-gray-400 text-sm max-w-sm mx-auto">
          Crafting high-performance software, intelligent systems, and scalable tech solutions.
        </p>
      </motion.div>

      {/* Link Tree */}
      <div className="w-full max-w-md space-y-4">
        {links.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.url}
            target={link.url.startsWith("http") ? "_blank" : undefined}
            rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="group relative flex items-center p-4 w-full bg-[#0a0d1c]/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300"
          >
            {/* Hover Gradient Background */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r ${link.color} transition-opacity duration-300`} />
            
            {/* Glowing Edge on Hover */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Icon */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-white/5 mr-4 text-gray-300 group-hover:text-white transition-colors duration-300`}>
              {link.icon}
            </div>

            {/* Label */}
            <span className="font-semibold tracking-wide text-gray-200 group-hover:text-white transition-colors duration-300">
              {link.name}
            </span>

            {/* External Link Indicator */}
            {link.url.startsWith("http") && (
              <svg className="w-4 h-4 ml-auto text-gray-500 group-hover:text-cyan-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            )}
          </motion.a>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-12 text-gray-500 text-xs font-mono"
      >
        © {new Date().getFullYear()} krishmahajan.dev
      </motion.div>
    </div>
  );
}
