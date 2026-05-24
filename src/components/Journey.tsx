"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Award, Building, BookOpen } from "lucide-react";

interface JourneyItem {
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  icon: React.ReactNode;
  align: "left" | "right";
}

export const Journey: React.FC = () => {
  const journeyItems: JourneyItem[] = [
    {
      title: "Campus Mantri @ GeeksforGeeks",
      subtitle: "Technical Outreach Leader",
      duration: "Jan 2026 – Present",
      description: "Leading CS technical outreach initiatives to accelerate student engagement with algorithms and problem-solving platforms. Organizing workshops and structuring presentations on data structures.",
      icon: <Award className="w-5 h-5" />,
      align: "right",
    },
    {
      title: "Campus Ambassador @ Kreo",
      subtitle: "User Engagement Specialist",
      duration: "Jan 2025 – Sep 2025",
      description: "Conducted brand outreach and user engagement drives among student cohorts. Collected structured surveys and analyzed feedback pipelines to support core product improvement insights.",
      icon: <Building className="w-5 h-5" />,
      align: "left",
    },
    {
      title: "B.Tech — Computer Science & Engineering",
      subtitle: "D.K.T.E. Society's Textile and Engineering Institute",
      duration: "2024 – 2028",
      description: "Maintained an outstanding 8.6 CGPA. Specialized in advanced software systems, edge computing, distributed network architectures, and robust full-stack web architectures.",
      icon: <BookOpen className="w-5 h-5" />,
      align: "right",
    },
    {
      title: "High School (PCM — Physics, Chemistry, Math)",
      subtitle: "Batote, Jammu & Kashmir",
      duration: "Completed 2020",
      description: "Fostered a deep native passion for logic, math, and software engineering. Developed early interest in building command-line games and static websites.",
      icon: <Calendar className="w-5 h-5" />,
      align: "left",
    },
  ];

  return (
    <section id="journey" className="relative w-full py-20 md:py-32 bg-[#050816] px-6">
      
      {/* Background visual detail */}
      <div className="absolute top-[20%] left-[5%] w-[350px] h-[350px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-3 text-xs font-semibold tracking-widest text-brand-cyan uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Milestones & Nodes</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4"
          >
            My <span className="shimmer-text-cyan font-bold">Journey Timeline</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base font-light"
          >
            Tracing my professional evolution, academic background, and community leadership landmarks.
          </motion.p>
        </div>

        {/* Timeline block */}
        <div className="relative">
          {/* Vertical Center Connector Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-white/5" />

          <div className="space-y-12 md:space-y-20">
            {journeyItems.map((item, index) => {
              const isLeft = item.align === "left";
              
              return (
                <div key={item.title} className="relative md:flex justify-between items-start">
                  
                  {/* Timeline node dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-6 w-4 h-4 rounded-full border-2 border-brand-cyan bg-[#050816] z-10 shadow-[0_0_10px_#00F5FF]" />

                  {/* Left Side spacer/card */}
                  <div className={`md:w-[45%] ${isLeft ? "text-left" : "hidden md:block md:invisible"}`}>
                    {isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: -35, rotateY: -12, transformPerspective: 1000 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7, type: "spring", stiffness: 70, damping: 15 }}
                        className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-brand-cyan/20 transition-all duration-350 hover:shadow-[0_0_20px_rgba(0,245,255,0.05)]"
                      >
                        <div className="flex items-center gap-3 mb-3 text-brand-cyan">
                          {item.icon}
                          <span className="text-xs font-semibold uppercase tracking-wider">{item.duration}</span>
                        </div>
                        <h3 className="text-xl font-heading font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-xs font-semibold text-gray-500 mb-4">{item.subtitle}</p>
                        <p className="text-gray-400 text-sm font-light leading-relaxed">{item.description}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Spacer for vertical align */}
                  <div className="hidden md:block md:w-[5%]" />

                  {/* Right Side spacer/card */}
                  <div className={`md:w-[45%] ${!isLeft ? "text-left" : "hidden md:block md:invisible"}`}>
                    {!isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: 35, rotateY: 12, transformPerspective: 1000 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7, type: "spring", stiffness: 70, damping: 15 }}
                        className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-brand-cyan/20 transition-all duration-350 hover:shadow-[0_0_20px_rgba(0,245,255,0.05)]"
                      >
                        <div className="flex items-center gap-3 mb-3 text-brand-cyan">
                          {item.icon}
                          <span className="text-xs font-semibold uppercase tracking-wider">{item.duration}</span>
                        </div>
                        <h3 className="text-xl font-heading font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-xs font-semibold text-gray-500 mb-4">{item.subtitle}</p>
                        <p className="text-gray-400 text-sm font-light leading-relaxed">{item.description}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Fallback Mobile layout (only visible on small screens) */}
                  <div className="block md:hidden text-left">
                      <motion.div
                        initial={{ opacity: 0, y: 30, rotateX: 12, transformPerspective: 1000 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-panel p-6 rounded-2xl border border-white/5"
                      >
                      <div className="flex items-center gap-2 mb-2 text-brand-cyan text-xs font-semibold uppercase">
                        {item.icon}
                        <span>{item.duration}</span>
                      </div>
                      <h3 className="text-lg font-heading font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-xs font-semibold text-gray-500 mb-3">{item.subtitle}</p>
                      <p className="text-gray-400 text-sm font-light leading-relaxed">{item.description}</p>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
