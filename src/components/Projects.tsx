"use client";

import React from "react";
import { Sparkles, ShieldCheck, ArrowUpRight } from "lucide-react";
import { TiltCard } from "./TiltCard";

interface Project {
  title: string;
  category: "Software" | "Embedded" | "Intelligent Systems";
  problem: string;
  features: string[];
  tech: string[];
  achievement: string;
  impact: string;
  github: string;
  demo?: string;
  badge?: string;
  color: string;
  glowColor: string;
}

export const Projects: React.FC = () => {
  const projectsList: Project[] = [
    {
      title: "Tagtrix: Enterprise Security Hub",
      category: "Software",
      problem: "Legacy physical locks lack real-time digital authentication logging, database authorization rules, and centralized remote administrative control.",
      features: [
        "Built a real-time digital authorization node using secure WebSocket handshakes.",
        "Pushes transactional access logs directly to scalable remote MongoDB databases.",
        "Designed a modern client interface to manage credential rules and view logs."
      ],
      tech: ["React.js", "Express.js", "MongoDB", "WebSockets", "Edge Node"],
      achievement: "99.9% transaction integrity with instantaneous logging latency",
      impact: "Replaces manual physical key systems with real-time auditable access logs",
      github: "https://github.com/Krishmahajan334",
      badge: "Product Release",
      color: "hover:border-brand-cyan/30",
      glowColor: "rgba(0, 245, 255, 0.05)",
    },
    {
      title: "AquaSense: IoT Smart Water Diagnostics System",
      category: "Intelligent Systems",
      problem: "Water scarcity and inefficient usage in shared environments (hostels, apartments, institutions) lead to tank overflows, unexpected shortages, and excessive wastage due to a total lack of real-time monitoring and consumption awareness.",
      features: [
        "Deploys dedicated flow sensors to independently track and analyze real-time water consumption across multiple usage sections (kitchens, bathrooms, drinking points, utility lines).",
        "Tracks time-series storage tank levels and input supply availability, ensuring that resource usage remains dynamically aligned with available capacity.",
        "Employs an ESP32/ESP8266 microcontroller to collect, process, and stream multi-area water telemetry.",
        "Integrates a servo-controlled valve mechanism with manual regulation and dynamic Auto Mode flow adjustment to prevent overflows."
      ],
      tech: ["ESP32 / ESP8266", "Embedded C++", "Flow Telemetry", "Servo-Valves", "Real-time Dashboards"],
      achievement: "Provides real-time multi-area water intelligence and automated smart suggestions based on consumption pattern analysis",
      impact: "Transforms traditional resource management into a data-driven, highly optimized, and sustainable self-balancing water system",
      github: "https://github.com/Krishmahajan334/AquaSense-Smart-Water-Monitoring-System",
      badge: "System Release",
      color: "hover:border-brand-purple/30",
      glowColor: "rgba(127, 90, 240, 0.05)",
    },
    {
      title: "Hand Gesture Vocalizer (HGV)",
      category: "Intelligent Systems",
      problem: "Over 63 million individuals in India (including 5 million children) suffer from deafness and muteness. While sign language exists, it is not widely understood, making day-to-day communication with the general public incredibly difficult.",
      features: [
        "Reads gestural movements through flexible flex sensors and an MPU6050 gyroscope/accelerometer to recognize complex hand movements.",
        "Serves by an Arduino Uno R3 acting as the central processing brain to analyze sensor curves and fusion coordinates.",
        "Directly translates recognized physical gesture sequences into clear, synthetic TTS speech outputs that are understandable to everyone.",
        "Successfully designed and engineered across three progressive product life-cycle iterations (V1.0, V2.0, V3.0) for optimal accuracy."
      ],
      tech: ["Arduino Uno R3", "Flex Sensors", "MPU6050 IMU", "Signal Fusion", "TTS Synthesizers", "C++"],
      achievement: "Showcased at National Technology Week 2023 in Delhi, backed by Atal Innovation Mission, NITI Aayog",
      impact: "Empowers deaf and mute individuals to communicate naturally and fluidly with everyone, bridging the physical language gap",
      github: "https://github.com/Krishmahajan334/Hand-Gesture-Vocalizer",
      badge: "National Tech Week Selection",
      color: "hover:border-brand-cyan/30",
      glowColor: "rgba(0, 245, 255, 0.05)",
    },
    {
      title: "Life Protector on Roads",
      category: "Intelligent Systems",
      problem: "High-density transit networks suffer from fatal accidents, with 75% of casualties occurring due to improper or delayed emergency response services (police, rescue, hospitals) after severe vehicular collisions.",
      features: [
        "Integrates an Arduino Uno, GSM SIM800C, GPS 6MV2, MPU6050 gyroscope, and shock sensors to construct an edge telemetry warning array.",
        "Autonomous Collision Safeguard: features an interactive safe-verification system that prompts 'Are you safe?' upon detecting a high-G impact.",
        "Automated Alert Dispatch: if the driver responds 'No' or does not answer within a critical window, it automatically dispatches emergency messages with real-time GPS locations.",
        "Extensively tested by crashing scaled remote-control models in simulated roll-overs, front, side, and rear impacts at different speeds."
      ],
      tech: ["Arduino Uno", "GSM SIM800C", "GPS 6MV2", "MPU6050 IMU", "Shock Sensors", "C++ Firmware"],
      achievement: "Selected and backed with ₹1,00,000 national funding support under the INSPIRE MANAK innovation scheme",
      impact: "Saves lives by guaranteeing instantaneous, autonomous dispatch of GPS coordinates to medical teams and police, bypassing bystander delays",
      github: "https://github.com/Krishmahajan334/Life-Protector-on-Roads",
      badge: "INSPIRE MANAK Awarded",
      color: "hover:border-brand-green/30",
      glowColor: "rgba(29, 205, 159, 0.05)",
    }
  ];

  // High-performance pointer tracking relative to card bounding coordinates
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  };

  return (
    <section id="projects" className="relative w-full py-20 md:py-32 bg-[#050816] px-6 overflow-hidden">
      
      {/* Visual Ambient glow in background */}
      <div className="absolute top-[30%] left-[-10%] w-[450px] h-[450px] bg-brand-cyan/5 blur-[160px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[30%] right-[-10%] w-[450px] h-[450px] bg-brand-purple/5 blur-[160px] rounded-full pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Title Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="flex items-center justify-center gap-2 mb-3 text-xs font-semibold tracking-widest text-brand-green uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Applied Engineering Portfolio</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-white mb-4">
            Featured <span className="shimmer-text-cyan font-extrabold">Technology Products</span>
          </h2>
          
          <p className="text-gray-400 max-w-xl mx-auto text-base font-light">
            Sleek intelligent systems, responsive automation frameworks, and firmware architectures engineered from the ground up.
          </p>
        </div>

        {/* Project Cases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {projectsList.map((project) => (
            <TiltCard key={project.title} className="h-full">
              <div
                onMouseMove={handleMouseMove}
                className={`group relative rounded-2xl border border-white/5 bg-[#03050e]/40 backdrop-blur-md overflow-hidden transition-all duration-500 flex flex-col justify-between h-full ${project.color}`}
              >
                
                {/* 1. Core Card Coordinate Spotlight Glare */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                  style={{
                    background: `radial-gradient(350px circle at var(--x, 100px) var(--y, 100px), ${project.glowColor}, transparent)`,
                  }}
                />

                {/* 2. Raycast-style Coordinate Glowing Border */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none"
                  style={{
                    background: `radial-gradient(300px circle at var(--x, 100px) var(--y, 100px), rgba(255, 255, 255, 0.08), transparent)`,
                    maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                    WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    padding: "1px",
                  }}
                />
              
                {/* Image Placeholder Block (Left Blank for User Uploads) */}
                <div className="relative w-full h-40 bg-[#02040a] border-b border-white/5 flex items-center justify-center overflow-hidden z-10">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:16px_16px]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03050e] via-transparent to-transparent" />
                  
                  {/* Subtle placeholder tags */}
                  <span className="text-[10px] font-heading font-extrabold tracking-widest text-gray-600 uppercase transition-colors group-hover:text-brand-cyan/40">
                    [ CASE STUDY SPECIFICATION LAYER ]
                  </span>

                  {/* Absolute Badge elements */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-[9px] font-bold tracking-widest text-white uppercase font-heading">
                      {project.category}
                    </span>
                    {project.badge && (
                      <span className="px-2.5 py-1 rounded bg-brand-cyan/10 border border-brand-cyan/20 text-[9px] font-bold tracking-widest text-brand-cyan uppercase font-heading animate-pulse">
                        {project.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Specs Info details */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-1 text-left relative z-10">
                  
                  {/* Product Header */}
                  <div>
                    <h3 className="text-2xl font-heading font-extrabold text-white mb-4 tracking-tight group-hover:text-brand-cyan transition-colors">
                      {project.title}
                    </h3>

                    {/* Problem Statement Card */}
                    <div className="mb-6">
                      <p className="text-[9px] font-bold text-brand-cyan tracking-widest font-heading mb-1.5 uppercase flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" />
                        <span>PROBLEM METRIC</span>
                      </p>
                      <p className="text-gray-300 text-sm font-light leading-relaxed italic border-l border-brand-cyan/25 pl-3.5">
                        &ldquo;{project.problem}&rdquo;
                      </p>
                    </div>

                    {/* Architecture features lists */}
                    <div className="mb-6">
                      <p className="text-[9px] font-bold text-gray-500 tracking-widest font-heading mb-2.5 uppercase">
                        KEY PRODUCT ARCHITECTURE
                      </p>
                      <ul className="space-y-2">
                        {project.features.map((feat, fIdx) => (
                          <li key={fIdx} className="text-xs text-gray-400 flex items-start gap-2.5 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics Achievements Box */}
                    <div className="grid grid-cols-2 gap-4 py-4 my-6 border-y border-white/5">
                      <div>
                        <p className="text-[8px] font-heading font-bold text-gray-500 tracking-widest uppercase mb-1">ACHIEVEMENT</p>
                        <p className="text-white text-xs font-semibold leading-tight">{project.achievement}</p>
                      </div>
                      <div>
                        <p className="text-[8px] font-heading font-bold text-gray-500 tracking-widest uppercase mb-1">SYSTEM IMPACT</p>
                        <p className="text-brand-green text-xs font-semibold leading-tight">{project.impact}</p>
                      </div>
                    </div>
                  </div>

                  {/* Badges footer links */}
                  <div>
                    {/* Tech tag elements */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] text-gray-400 font-heading font-bold uppercase tracking-wider">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Links Source action */}
                    <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-wider font-heading group/link"
                      >
                        <svg className="w-4 h-4 group-hover/link:rotate-12 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                        <span>Source Code</span>
                      </a>
                      
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:text-white transition-colors uppercase tracking-wider font-heading ml-auto group/live"
                      >
                        <span>Case Study</span>
                        <ArrowUpRight className="w-4 h-4 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>

                </div>

              </div>
            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
};
