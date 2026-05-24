"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, FlaskConical, Layers, BookOpen, GraduationCap, ArrowRight, Download, Mail, Star, Heart } from "lucide-react";
import Image from "next/image";
import { TiltCard } from "./TiltCard";

interface TimelineEvent {
  year: string;
  location: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  color: string;
  accent: string;
}

export const About: React.FC = () => {
  const [downloading, setDownloading] = useState(false);

  const triggerDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = "/Krish_Mahajan_Resume.pdf";
      link.setAttribute("download", "Krish_Mahajan_Resume.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        setDownloading(false);
      }, 1500);
    }, 2000);
  };

  const timelineEvents: TimelineEvent[] = [
    {
      year: "2018",
      location: "Chenani, Jammu & Kashmir",
      title: "The Genesis of Curiosity",
      subtitle: "Kendriya Vidyalaya Chenani — Class 7",
      description: "Krish's journey of applied scientific exploration began in Jammu & Kashmir. Drawn by a deep curiosity to understand the inner workings of the physical world, he spent after-school hours dismantling toys, constructing basic circuitry, and establishing an experimental workshop in his room. In the same year, he competed in Vidyarthi Vigyan Manthan (VVM)—India's national science talent search examination—securing an exceptional regional selection at a very young age, which caught the eye of educators who nurtured his potential.",
      icon: <Sparkles className="w-5 h-5" />,
      badge: "VVM Talent Search Selection",
      color: "border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan shadow-[0_0_20px_rgba(0,245,255,0.05)]",
      accent: "bg-brand-cyan",
    },
    {
      year: "2019",
      location: "Jammu Region",
      title: "Scientific Foundations",
      subtitle: "NCSC Biology & Water Reclamation",
      description: "Under the mentorship of dedicated science teachers, Krish designed an environmental engineering project titled 'Using Algae Chlamydomonas to Retreat Water'. Utilizing microalgae to reclaim and clean wastewater, the research system achieved 2nd Prize in the National Children's Science Congress (NCSC). This regional breakthrough sparked a lifelong determination to design technologies that solve real-world community challenges on a national scale.",
      icon: <FlaskConical className="w-5 h-5" />,
      badge: "NCSC Regional 2nd Prize",
      color: "border-brand-green/20 bg-brand-green/5 text-brand-green shadow-[0_0_20px_rgba(29,205,159,0.05)]",
      accent: "bg-brand-green",
    },
    {
      year: "2020 - 2021",
      location: "Jammu & Kashmir",
      title: "The COVID Prototyping Surge",
      subtitle: "INSPIRE MANAK Award & Smart Firmware Prototyping",
      description: "When the pandemic locked down classrooms, Krish converted his bedroom into a full-time hardware-software prototyping lab. Building and testing firmware continuously, he designed 'Life Protector on Roads'—an intelligent traffic accident-prevention architecture—which won selection and ₹1,00,000 in INSPIRE MANAK funding support. Alongside it, he engineered the earliest conceptual software models and sensors interface for his assistive communication project, the 'Hand Gesture Vocalizer'.",
      icon: <Layers className="w-5 h-5" />,
      badge: "₹1,00,000 Funding Backing",
      color: "border-brand-purple/20 bg-brand-purple/5 text-brand-purple shadow-[0_0_20px_rgba(127,90,240,0.05)]",
      accent: "bg-brand-purple",
    },
    {
      year: "2022",
      location: "Bangalore & Ahmedabad",
      title: "Record-Breaking Open Nationals",
      subtitle: "30th National Children's Science Congress",
      description: "Entering the NCSC arena, Krish achieved First Prize and National selection at KV DRDO Bengaluru. He advanced to the highly competitive Open Nationals/International level at SAL Education Campus, Ahmedabad, organized by GUJCOST, DST, and NCSTC. Honored as an official 'Child Scientist', he etched his name in KVS history as the first student from the entire KVS Jammu Region to reach the Open Nationals in NCSC history.",
      icon: <BookOpen className="w-5 h-5" />,
      badge: "Open Nationals Child Scientist",
      color: "border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan shadow-[0_0_20px_rgba(0,245,255,0.05)]",
      accent: "bg-brand-cyan",
    },
    {
      year: "2023",
      location: "Pragati Maidan, New Delhi",
      title: "National Tech Showcases",
      subtitle: "AIM NITI Aayog Showcase & Youth Co:Lab by UNDP",
      description: "Following selections in the ATL Marathon and ranking in the Top 36 teams nationally in Youth Co:Lab by UNDP, Krish was invited by the Atal Innovation Mission, NITI Aayog, to showcase his 'Hand Gesture Vocalizer' (HGV) at National Technology Week 2023 in Delhi. Presenting among the country's elite selected innovators directly to national leaders and delegates, he was recognized as a Junior Scientist associated with the Ministry of Science & Technology.",
      icon: <GraduationCap className="w-5 h-5" />,
      badge: "NITI Aayog National Technology Week Showcase",
      color: "border-brand-green/20 bg-brand-green/5 text-brand-green shadow-[0_0_20px_rgba(29,205,159,0.05)]",
      accent: "bg-brand-green",
    },
    {
      year: "2024 - 2028",
      location: "DKTE Society's Institute, Maharashtra",
      title: "Modern CS Architect & Builder",
      subtitle: "B.Tech Computer Science & Engineering",
      description: "Now pursuing his B.Tech in CSE (maintaining an 8.6 CGPA), Krish is translating his robust physics prototyping roots and research mindset into next-generation intelligent systems, multithreaded automation pipelines, and full-stack software. His trajectory is that of a future tech founder and engineer: designing elegant, scalable, and human-centered digital experiences that solve real-world problems.",
      icon: <Star className="w-5 h-5" />,
      badge: "Research & Systems Architecture Focus",
      color: "border-brand-purple/20 bg-brand-purple/5 text-brand-purple shadow-[0_0_20px_rgba(127,90,240,0.05)]",
      accent: "bg-brand-purple",
    },
  ];

  return (
    <section id="about" className="relative w-full py-20 md:py-32 bg-[#050816] px-6 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-brand-cyan/5 blur-[160px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-purple/5 blur-[160px] rounded-full pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Top Header Block */}
        <div className="text-center md:text-left mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center md:justify-start gap-2 mb-3 text-xs font-semibold tracking-widest text-brand-green uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curiosity to Code</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white"
          >
            Decoding My <span className="shimmer-text-cyan font-extrabold">Story</span>
          </motion.h2>
        </div>

        {/* Intro Visionary Summary Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 md:mb-32">
          {/* 3D Passport Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 flex justify-center"
          >
            <TiltCard maxTilt={15}>
              <div className="relative group w-64 h-64 sm:w-72 sm:h-72 rounded-2xl p-1 bg-gradient-to-br from-brand-cyan/20 via-transparent to-brand-purple/20 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan via-brand-cyan/40 to-brand-purple opacity-20 group-hover:opacity-100 transition-opacity duration-700 blur" />
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#03050e] border border-white/10 flex justify-center items-center group-hover:border-brand-cyan/50 transition-all duration-500">
                  <Image
                    src="/krish PASSPORT200kb.png"
                    alt="Krish Mahajan Child Scientist & CS Engineer"
                    fill
                    className="object-cover scale-100 group-hover:scale-105 group-hover:brightness-110 filter grayscale group-hover:grayscale-0 transition-all duration-700"
                    sizes="(max-w-768px) 100vw, 280px"
                    priority
                  />
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Visionary Introduction Card */}
          <div className="lg:col-span-8 flex flex-col items-start gap-6 text-left">
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white leading-tight"
            >
              Driven by <span className="text-brand-cyan">Applied Science</span>, engineered for <span className="text-brand-green">impact</span>.
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-gray-300 font-sans font-light text-base sm:text-lg leading-relaxed"
            >
              My coding philosophy is rooted in a growth mindset, experimentation, and scientific curiosity. From assembling labs in my bedroom to presenting at NITI Aayog showcases and writing scalable multi-threaded scrapers, I design robust full-stack software and firmware systems with the ambitious perspective of a future technology leader and product architect.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 w-full border-t border-white/5 pt-6 mt-2"
            >
              <button
                onClick={triggerDownload}
                disabled={downloading}
                className="relative overflow-hidden flex items-center gap-3 px-6 py-3 rounded-full border border-brand-cyan bg-brand-cyan/5 text-brand-cyan font-semibold hover:bg-brand-cyan hover:text-black hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all duration-300 font-heading select-none cursor-pointer disabled:opacity-50"
              >
                {downloading && (
                  <motion.div
                    className="absolute top-0 left-0 w-full h-[2px] bg-brand-cyan shadow-[0_0_10px_#00F5FF]"
                    animate={{ y: [0, 48, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <Download className={`w-5 h-5 ${downloading ? "animate-bounce" : ""}`} />
                <span>
                  {downloading ? "CYBER-SCANNING RESUME..." : "DOWNLOAD RESUME"}
                </span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Cinematic Narrative Storyline Timeline */}
        <div className="relative max-w-4xl mx-auto pl-8 md:pl-16">
          
          {/* Main Glowing Connector Vertical Track */}
          <div className="absolute left-[15px] md:left-[31px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-brand-cyan/40 via-brand-purple/20 to-brand-green/40 pointer-events-none" />

          {/* Narrative Chapters Loop */}
          <div className="space-y-16 md:space-y-24">
            {timelineEvents.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                className="relative flex flex-col items-start gap-4 text-left"
              >
                
                {/* Glowing Node Connector Bullet */}
                <div className="absolute -left-[33px] md:-left-[49px] top-1.5 w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/10 bg-[#050816] flex justify-center items-center z-20 shadow-[0_0_15px_rgba(0,245,255,0.1)]">
                  <div className={`w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full ${event.accent} animate-pulse`} />
                </div>

                {/* Chapter Date & Location Row */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full text-xs font-heading font-extrabold bg-white/5 border border-white/10 text-white tracking-wider">
                    {event.year}
                  </span>
                  <span className="text-xs text-gray-500 font-heading tracking-widest uppercase">
                    {event.location}
                  </span>
                </div>

                {/* Chapter Content Card (Premium Glassmorphism Card) */}
                <div className={`w-full rounded-2xl border p-6 md:p-8 ${event.color} backdrop-blur-md transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04] group`}>
                  
                  {/* Badge & Icon header */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-white/5 text-white border border-white/10 group-hover:border-white/20 transition-colors">
                        {event.icon}
                      </div>
                      <div>
                        <h4 className="text-xl md:text-2xl font-heading font-extrabold text-white tracking-tight leading-tight">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-400 font-sans font-medium mt-0.5">
                          {event.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Narration Description */}
                  <p className="text-gray-300 font-sans font-light text-base md:text-lg leading-relaxed">
                    {event.description}
                  </p>

                  {/* Chapter Highlights Badge */}
                  {event.badge && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg text-[10px] sm:text-xs font-heading font-bold uppercase tracking-wider bg-white/5 border border-white/5 text-gray-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
                        {event.badge}
                      </span>
                    </div>
                  )}
                </div>

              </motion.div>
            ))}
          </div>

        </div>

        {/* Futuristic Future-Oriented Conclusion Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-24 md:mt-32 max-w-4xl mx-auto p-8 md:p-12 rounded-3xl border border-brand-green/20 bg-gradient-to-r from-brand-cyan/5 via-brand-purple/5 to-brand-green/5 backdrop-blur-md shadow-[0_0_50px_rgba(29,205,159,0.06)] relative overflow-hidden text-center flex flex-col items-center gap-6"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/10 rounded-full blur-2xl pointer-events-none" />
          
          <Heart className="w-8 h-8 text-brand-green animate-pulse" />

          <h4 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            The Vision Ahead
          </h4>

          <p className="text-gray-300 font-sans font-light text-base sm:text-lg leading-relaxed max-w-2xl">
            My final objective is not just to write code, but to synthesize intelligent software, emerging hardware paradigms, and human-centered design to solve critical issues. I am committed to continuous experimentation, collaborative research, and building tech-driven products that deliver a meaningful, high-performance impact on human lives.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
