"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert } from "lucide-react";

export const AntiScrapeShield: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [isAutomationAgent, setIsAutomationAgent] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Crawler/Scraper Agent Fingerprint Identification
    const checkAutomation = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isHeadless =
        navigator.webdriver ||
        userAgent.includes("headlesschrome") ||
        userAgent.includes("puppeteer") ||
        userAgent.includes("playwright") ||
        userAgent.includes("selenium") ||
        userAgent.includes("phantomjs") ||
        userAgent.includes("crawl") ||
        userAgent.includes("spider") ||
        userAgent.includes("bot");

      if (isHeadless) {
        setIsAutomationAgent(true);
      }
    };

    checkAutomation();

    // 2. Right-Click Context Menu Interception
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerWarningToast();
    };

    // 3. DevTools Keyboard Shortcut Interception
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      
      const isInspectTrigger =
        e.key === "F12" ||
        // Cmd + Option + I (Mac) or Ctrl + Shift + I (Windows)
        ((isMac ? e.metaKey && e.altKey : e.ctrlKey && e.shiftKey) && e.key.toLowerCase() === "i") ||
        // Cmd + Option + J (Mac) or Ctrl + Shift + J (Windows)
        ((isMac ? e.metaKey && e.altKey : e.ctrlKey && e.shiftKey) && e.key.toLowerCase() === "j") ||
        // Cmd + Option + C (Mac) or Ctrl + Shift + C (Windows)
        ((isMac ? e.metaKey && e.altKey : e.ctrlKey && e.shiftKey) && e.key.toLowerCase() === "c") ||
        // Cmd + Option + U (Mac) or Ctrl + U (Windows) - View Page Source
        ((isMac ? e.metaKey && e.altKey : e.ctrlKey) && e.key.toLowerCase() === "u") ||
        // Cmd + S (Mac) or Ctrl + S (Windows) - Save Webpage
        ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "s");

      if (isInspectTrigger) {
        e.preventDefault();
        triggerWarningToast();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const triggerWarningToast = () => {
    setShowToast(true);
    const audioCtx = typeof window !== "undefined" && (window.AudioContext || (window as any).webkitAudioContext);
    if (audioCtx) {
      try {
        const ctx = new audioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } catch (err) {}
    }
  };

  useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(false), 2400);
    return () => clearTimeout(t);
  }, [showToast]);

  // If automation crawler is caught, serve decoy plain text to protect source DOM
  if (isAutomationAgent) {
    return (
      <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center p-6 bg-[#050816] text-gray-400 font-mono text-center select-none">
        <div className="max-w-md p-8 border border-red-500/20 bg-black/40 rounded-2xl shadow-2xl space-y-4">
          <ShieldAlert className="w-12 h-12 text-red-500 mx-auto animate-bounce" />
          <h1 className="text-red-400 font-extrabold tracking-widest text-sm uppercase">SECURITY VERIFICATION BLOCKED</h1>
          <p className="text-xs leading-relaxed text-gray-500">
            Headless browser agent, automated crawler, or webdriver fingerprint has been caught by the Anti-Scrape Shield.
          </p>
          <p className="text-[10px] text-gray-600">
            Please deactivate automated scripts or headless viewports to inspect Krish Mahajan's portfolio showcase.
          </p>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10000] flex items-center gap-3 px-5 py-3 rounded-xl border border-red-500/30 bg-black/90 backdrop-blur-md text-white font-mono text-xs shadow-[0_15px_40px_rgba(239,68,68,0.25)] select-none pointer-events-none"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <span className="font-semibold tracking-wide text-red-400 uppercase">🛡️ SECURITY ACTIVATED:</span>
          <span className="text-gray-300">DOM Inspector & Code Sniffing Blocked.</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
