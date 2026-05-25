"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CommandResponse {
  input: string;
  output: string | React.ReactNode;
}

export const InteractiveTerminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTooSmall, setIsTooSmall] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [windowLayout, setWindowLayout] = useState<"center" | "left" | "right" | "fullscreen">("center");
  const [showGreenMenu, setShowGreenMenu] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandResponse[]>([
    {
      input: "system_boot",
      output: (
        <div className="space-y-1 text-gray-300">
          <p>Last login: {new Date().toDateString()} on ttys001</p>
          <p className="text-white font-bold text-xs sm:text-sm">Krish Mahajan MacBook Terminal (v1.2.0)</p>
          <p className="text-gray-400 text-[11px] sm:text-xs">Type <span className="text-white font-semibold">help</span> to view available interactive command lines.</p>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  let hoverTimer = useRef<NodeJS.Timeout | null>(null);

  // Resize listener to track small viewports
  useEffect(() => {
    const handleResize = () => {
      setIsTooSmall(window.innerWidth < 380);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle Listener (from Navbar & keyboard shortcuts)
  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prev) => !prev);
      setIsMinimized(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + ~ toggle
      if (e.ctrlKey && e.key === "`") {
        setIsOpen((prev) => !prev);
        setIsMinimized(false);
      }
    };

    window.addEventListener("toggle-terminal", handleToggle);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("toggle-terminal", handleToggle);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Auto-scroll on new output
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen, isMinimized]);

  const executeCommand = (cmdText: string) => {
    const cmd = cmdText.trim().toLowerCase();
    if (!cmd) return;

    let response: React.ReactNode = "";

    switch (cmd) {
      case "help":
        response = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300 pt-1 text-[11px] sm:text-xs">
            <div><span className="text-white font-semibold">whoami</span> - Author profile summary</div>
            <div><span className="text-white font-semibold">skills</span> - Complete engineering tech stack</div>
            <div><span className="text-white font-semibold">current_status</span> - Current college and research focus</div>
            <div><span className="text-white font-semibold">open projects</span> - Scroll down to the flagship projects showcase</div>
            <div><span className="text-white font-semibold">clear</span> - Wipe terminal history logs</div>
          </div>
        );
        break;
      case "whoami":
        response = (
          <div className="space-y-1 text-gray-300 text-[11px] sm:text-xs">
            <p className="text-white font-semibold text-xs sm:text-sm">Krish Mahajan</p>
            <p>• Computer Science Engineer & Research Enthusiast</p>
            <p>• Department of Science & Technology (DST) Junior Scientist (2023)</p>
            <p>• Specialized in Industrial IoT (IIoT), Embedded Architectures, and Full-Stack Engineering.</p>
          </div>
        );
        break;
      case "skills":
        response = (
          <div className="space-y-2 text-gray-300 text-[11px] sm:text-xs">
            <div>
              <span className="text-white font-semibold">Frontend & Backend:</span>
              <p className="pl-4">React.js, Next.js (App Router), Tailwind CSS, Node.js, Express.js, WebSockets, Python, Flask</p>
            </div>
            <div>
              <span className="text-white font-semibold">Hardware & IIoT:</span>
              <p className="pl-4">ESP32, ESP8266, Arduino, Raspberry Pi, Embedded C++, Sensor Flow Telemetry, Microcontrollers</p>
            </div>
            <div>
              <span className="text-white font-semibold">Databases & Protocols:</span>
              <p className="pl-4">MongoDB, PostgreSQL, InfluxDB, MQTT, HTTP/REST</p>
            </div>
          </div>
        );
        break;
      case "current_status":
        response = (
          <div className="space-y-1 text-gray-300 text-[11px] sm:text-xs">
            <p>🎓 Pursuing B.Tech in Computer Science Engineering</p>
            <p>🔬 Actively developing self-balancing resource optimization models (IoT Smart Water Diagnostics)</p>
            <p>🎯 GeeksforGeeks Campus Mantri</p>
          </div>
        );
        break;
      case "open projects":
        response = (
          <div className="text-emerald-400 font-semibold animate-pulse text-[11px] sm:text-xs">
            [EXECUTION] Scrolling down to Projects showcase section...
          </div>
        );
        setTimeout(() => {
          const el = document.getElementById("projects");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      default:
        response = (
          <span className="text-red-400 text-[11px] sm:text-xs">
            bash: command not found: {cmd}. Select a quick menu option or type <span className="underline font-semibold text-white">help</span>.
          </span>
        );
    }

    setHistory((prev) => [...prev, { input: cmdText, output: response }]);
    setInputVal("");
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  const handleGreenMouseEnter = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setShowGreenMenu(true);
    }, 450);
  };

  const handleGreenMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    // Keep it open briefly so users can transition hover onto the menu itself
    hoverTimer.current = setTimeout(() => {
      setShowGreenMenu(false);
    }, 300);
  };

  // Dynamic snap positioning styles
  const backdropClasses = `fixed inset-0 z-[9990] p-4 bg-[#050816]/75 backdrop-blur-sm flex transition-all duration-300 ${
    windowLayout === "left"
      ? "items-stretch justify-start"
      : windowLayout === "right"
      ? "items-stretch justify-end"
      : windowLayout === "fullscreen"
      ? "items-stretch justify-center p-2 sm:p-4"
      : "items-center justify-center"
  }`;

  const cardClasses = `bg-black border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden font-mono text-xs sm:text-sm relative transition-all duration-300 flex flex-col ${
    windowLayout === "left"
      ? "w-[48%] h-full rounded-xl"
      : windowLayout === "right"
      ? "w-[48%] h-full rounded-xl"
      : windowLayout === "fullscreen"
      ? "w-full h-full rounded-xl"
      : "w-full max-w-3xl rounded-xl"
  }`;

  return (
    <AnimatePresence>
      {isOpen && !isMinimized && (
        <div onClick={() => setIsOpen(false)} className={backdropClasses}>
          {isTooSmall ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[320px] rounded-xl border border-red-500/30 bg-black p-6 text-center font-mono text-xs text-gray-300 shadow-2xl relative self-center"
            >
              <div className="flex items-center gap-1.5 border-b border-white/10 pb-3 mb-4 justify-start">
                <button onClick={() => setIsOpen(false)} className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <button onClick={() => setIsMinimized(true)} className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-red-400 font-bold block mb-2">⚠️ VIEWPORT TOO SMALL</span>
              <p className="leading-relaxed text-gray-400">
                The MacBook CLI Console requires screen real estate greater than <span className="text-white font-semibold">380px</span> for clean rendering of command metrics.
              </p>
              <p className="mt-3 text-[10px] text-gray-500">
                Please rotate your device to landscape or expand your browser window size.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => {
                e.stopPropagation();
                if (inputRef.current) inputRef.current.focus();
              }}
              className={cardClasses}
            >
              {/* macOS MacBook Style Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#1c1c1e] border-b border-white/10 select-none shrink-0">
                {/* Left Window Control Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:bg-[#e04f47] flex items-center justify-center transition-colors cursor-pointer"
                    title="Close"
                  />
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] hover:bg-[#e0a325] flex items-center justify-center transition-colors cursor-pointer"
                    title="Minimize"
                  />
                  
                  {/* Snapping layout Green button */}
                  <div
                    className="relative"
                    onMouseEnter={handleGreenMouseEnter}
                    onMouseLeave={handleGreenMouseLeave}
                  >
                    <button
                      onClick={() => setWindowLayout(windowLayout === "fullscreen" ? "center" : "fullscreen")}
                      className="w-3.5 h-3.5 rounded-full bg-[#27c93f] hover:bg-[#1fa331] flex items-center justify-center transition-colors cursor-pointer"
                      title="Screen Snapping Options"
                    />

                    {/* Snap layout floating submenu */}
                    <AnimatePresence>
                      {showGreenMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute left-0 mt-2 w-48 rounded-lg border border-white/15 bg-[#1e1e20] p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-[9995] text-left select-none text-[10px]"
                          onMouseEnter={() => {
                            if (hoverTimer.current) clearTimeout(hoverTimer.current);
                            setShowGreenMenu(true);
                          }}
                          onMouseLeave={() => setShowGreenMenu(false)}
                        >
                          <span className="text-[9px] font-semibold text-gray-500 px-2 pb-1 block border-b border-white/5 mb-1 select-none">SNAP WINDOW TO</span>
                          <button
                            onClick={() => {
                              setWindowLayout("left");
                              setShowGreenMenu(false);
                            }}
                            className="w-full text-left px-2 py-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-white flex items-center gap-2 cursor-pointer font-sans"
                          >
                            <span className="w-3 h-2 rounded border border-white/30 bg-white/20 inline-block shrink-0" style={{ borderRightWidth: "6px" }} />
                            <span>Tile to Left of Screen</span>
                          </button>
                          <button
                            onClick={() => {
                              setWindowLayout("right");
                              setShowGreenMenu(false);
                            }}
                            className="w-full text-left px-2 py-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-white flex items-center gap-2 cursor-pointer font-sans"
                          >
                            <span className="w-3 h-2 rounded border border-white/30 bg-white/20 inline-block shrink-0" style={{ borderLeftWidth: "6px" }} />
                            <span>Tile to Right of Screen</span>
                          </button>
                          <button
                            onClick={() => {
                              setWindowLayout("fullscreen");
                              setShowGreenMenu(false);
                            }}
                            className="w-full text-left px-2 py-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-white flex items-center gap-2 cursor-pointer font-sans"
                          >
                            <span className="w-3 h-2 rounded border border-white/30 bg-white/40 inline-block shrink-0" />
                            <span>Move to Full Screen</span>
                          </button>
                          <button
                            onClick={() => {
                              setWindowLayout("center");
                              setShowGreenMenu(false);
                            }}
                            className="w-full text-left px-2 py-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-white flex items-center gap-2 cursor-pointer border-t border-white/5 mt-1 pt-1.5 font-sans"
                          >
                            <span className="w-3 h-2 rounded border border-white/30 bg-transparent inline-block shrink-0" />
                            <span>Restore Center Layout</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Centered Title */}
                <span className="text-xs font-semibold text-gray-400 select-none font-mono">
                  krishmahajan — bash — {windowLayout === "fullscreen" ? "Full Size" : "80×24"}
                </span>

                {/* Right Symmetrical Spacer */}
                <div className="w-16" />
              </div>

              {/* Terminal Body Window: Black Background & White Text */}
              <div
                className={`p-4 sm:p-6 overflow-y-auto bg-black text-white scrollbar-thin scrollbar-thumb-white/10 select-text space-y-4 flex-1 transition-all duration-300 ${
                  windowLayout !== "center" ? "h-full" : "h-[65vh] max-h-[460px]"
                }`}
              >
                {history.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    {item.input !== "system_boot" && (
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <span>krishmahajan-macbook:~ visitor$</span>
                        <span className="text-white font-bold">{item.input}</span>
                      </div>
                    )}
                    <div className="pl-2 border-l border-white/10 pb-1 break-words">
                      {item.output}
                    </div>
                  </div>
                ))}

                {/* MacBook Terminal Quick Action Command Navigation Dashboard */}
                <div className="flex flex-col gap-2 pt-2 border-t border-white/10 mt-4 select-none">
                  <span className="text-gray-500 text-[10px] sm:text-xs font-semibold">Quick Command Options:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: "whoami", cmd: "whoami" },
                      { label: "skills", cmd: "skills" },
                      { label: "current_status", cmd: "current_status" },
                      { label: "open projects", cmd: "open projects" },
                      { label: "clear", cmd: "clear" },
                    ].map((btn) => (
                      <button
                        key={btn.cmd}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          executeCommand(btn.cmd);
                        }}
                        className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border border-white/20 hover:border-brand-cyan hover:bg-white/10 text-white hover:text-brand-cyan transition-all text-[10px] sm:text-xs font-mono cursor-pointer"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Command Line */}
                <form onSubmit={handleCommandSubmit} className="flex items-center gap-1.5 pt-1">
                  <span className="text-gray-400 font-semibold shrink-0 text-xs sm:text-sm">krishmahajan-macbook:~ visitor$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono focus:ring-0 p-0 text-xs sm:text-sm"
                    autoFocus
                    placeholder="Type or click option..."
                  />
                </form>
                <div ref={terminalEndRef} />
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Minimized Dock Widget at Bottom Right */}
      {isOpen && isMinimized && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-6 right-6 z-[9980] flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/15 bg-[#1c1c1e]/90 backdrop-blur-md text-white font-mono text-xs shadow-2xl hover:scale-105 hover:border-brand-cyan/30 transition-all cursor-pointer select-none"
        >
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] hover:bg-[#e04f47]"
              title="Close"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(false);
              }}
              className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] hover:bg-[#e0a325]"
              title="Restore"
            />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-gray-600 font-light select-none">|</span>
          <span className="font-semibold text-gray-200 flex items-center gap-1">
            <span>krishmahajan — minimized</span>
            <span className="w-1.5 h-3 bg-brand-cyan inline-block animate-pulse shrink-0" />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
