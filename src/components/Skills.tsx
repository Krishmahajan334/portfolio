"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Code2, Database, Wrench, Sparkles, Network } from "lucide-react";

interface SkillItem {
  name: string;
}

interface SkillCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  borderHoverColor: string;
  glowColor: string;
  accent: string;
  skills: SkillItem[];
}

export const Skills: React.FC = () => {
  const categories: SkillCategory[] = [
    {
      title: "Frontend Development",
      description: "Crafting beautiful interfaces & dynamic client-side structures.",
      icon: <Code2 className="w-6 h-6 text-brand-cyan" />,
      borderHoverColor: "group-hover:border-brand-cyan/30",
      glowColor: "rgba(0, 245, 255, 0.07)",
      accent: "bg-brand-cyan",
      skills: [
        { name: "JavaScript" },
        { name: "TypeScript" },
        { name: "React" },
        { name: "Next.js" },
        { name: "Tailwind CSS" },
        { name: "HTML5 / CSS3" },
        { name: "Framer Motion" },
        { name: "GSAP" },
        { name: "Bootstrap" },
      ],
    },
    {
      title: "Backend Development",
      description: "Architecting efficient APIs, server structures, and logic flow.",
      icon: <Cpu className="w-6 h-6 text-brand-purple" />,
      borderHoverColor: "group-hover:border-brand-purple/30",
      glowColor: "rgba(127, 90, 240, 0.07)",
      accent: "bg-brand-purple",
      skills: [
        { name: "Node.js" },
        { name: "Express.js" },
        { name: "REST APIs" },
        { name: "React Router" },
        { name: "C / C++" },
        { name: "Python" },
      ],
    },
    {
      title: "Database Architecture",
      description: "Structuring scalable, high-performance data repositories.",
      icon: <Database className="w-6 h-6 text-brand-green" />,
      borderHoverColor: "group-hover:border-brand-green/30",
      glowColor: "rgba(29, 205, 159, 0.07)",
      accent: "bg-brand-green",
      skills: [
        { name: "MongoDB" },
        { name: "Mongoose ODM" },
        { name: "Oracle SQL" },
        { name: "Data Processing" },
      ],
    },
    {
      title: "Intelligent & Embedded Systems",
      description: "Optimizing edge architectures, firmware engineering, real-time operating logic, and firmware.",
      icon: <Network className="w-6 h-6 text-brand-green" />,
      borderHoverColor: "group-hover:border-brand-green/30",
      glowColor: "rgba(29, 205, 159, 0.07)",
      accent: "bg-brand-green",
      skills: [
        { name: "ESP32 & ARM Core" },
        { name: "Embedded C/C++" },
        { name: "Firmware Development" },
        { name: "Edge AI Integration" },
        { name: "Real-Time OS (RTOS)" },
        { name: "Telemetry & Systems Logic" },
      ],
    },
    {
      title: "Tools & DevOps Platforms",
      description: "Managing deployments, version tracking, and virtual pipelines.",
      icon: <Wrench className="w-6 h-6 text-brand-cyan" />,
      borderHoverColor: "group-hover:border-brand-cyan/30",
      glowColor: "rgba(0, 245, 255, 0.07)",
      accent: "bg-brand-cyan",
      skills: [
        { name: "Git" },
        { name: "GitHub" },
        { name: "Docker" },
        { name: "AWS Cloud" },
        { name: "Google Cloud (GCP)" },
      ],
    },
  ];

  // High-performance pointer tracking relative to card bounding coordinates
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  // Blur-to-focus staggering animation curve
  const cardVariants = {
    hidden: { opacity: 0, y: 35, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
  };

  return (
    <section id="skills" className="relative w-full py-20 md:py-32 bg-[#050816] px-6 overflow-hidden">
      
      {/* Background visual spotlight detail */}
      <div className="absolute top-[30%] right-[-10%] w-[450px] h-[450px] bg-brand-cyan/5 blur-[160px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-brand-purple/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-3 text-xs font-semibold tracking-widest text-brand-cyan uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tech Arsenal</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-heading font-extrabold text-white mb-4 tracking-tight"
          >
            Technical <span className="shimmer-text-cyan font-extrabold">Capabilities</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto text-base font-light"
          >
            Specialized in building full-scale hardware integration maps, RESTful servers, and immersive responsive UI frontends.
          </motion.p>
        </div>

        {/* Skill Category Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              onMouseMove={handleMouseMove}
              className={`group relative rounded-2xl border border-white/5 bg-[#03050e]/40 backdrop-blur-md p-6 sm:p-8 transition-all duration-500 overflow-hidden flex flex-col justify-between h-full ${category.borderHoverColor}`}
            >
              {/* 1. Core Card Coordinate Spotlight Glare */}
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(350px circle at var(--x, 100px) var(--y, 100px), ${category.glowColor}, transparent)`,
                }}
              />

              {/* 2. Raycast-style Coordinate Glowing Border */}
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
                style={{
                  background: `radial-gradient(300px circle at var(--x, 100px) var(--y, 100px), rgba(255, 255, 255, 0.12), transparent)`,
                  maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                  WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  padding: "1px",
                }}
              />

              <div className="relative z-10">
                {/* Card Title & Icon */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/15 group-hover:bg-white/10 transition-all duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-heading font-extrabold text-white tracking-tight">
                    {category.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm font-sans font-light leading-relaxed mb-6">
                  {category.description}
                </p>

                {/* Skills tags grid */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-3 py-1.5 rounded-lg text-xs bg-[#050816]/90 border border-white/5 text-gray-300 transition-all duration-300 hover:border-white/20 hover:text-white"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
