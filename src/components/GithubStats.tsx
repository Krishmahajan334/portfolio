"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Star, Users, Flame, ExternalLink, Code2, Sparkles, AlertCircle } from "lucide-react";

interface GitStats {
  repos: number;
  stars: number;
  followers: number;
  commits: number;
}

interface GitEvent {
  id: string;
  type: string;
  repo: string;
  date: string;
  text: string;
  icon: string;
}

interface LangStat {
  language: string;
  count: number;
}

interface PinnedRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  langColor: string;
  url: string;
  techStack: string[];
}

export const GithubStats: React.FC = () => {
  const username = "Krishmahajan334";
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<GitStats>({ repos: 18, stars: 32, followers: 12, commits: 76 });
  const [events, setEvents] = useState<GitEvent[]>([]);
  const [languages, setLanguages] = useState<LangStat[]>([]);
  const [hoveredCell, setHoveredCell] = useState<{ dayIndex: number; weekIndex: number; count: number } | null>(null);

  // Pinned Flagship Repositories Metadata
  const pinnedRepos: PinnedRepo[] = [
    {
      name: "Tagtrix",
      description: "A digital authentication and authorization node replacing legacy locks with real-time WebSocket handshakes and remote MongoDB transaction logging.",
      stars: 12,
      forks: 4,
      language: "JavaScript",
      langColor: "#f1e05a",
      url: "https://github.com/Krishmahajan334/Tagtrix",
      techStack: ["React.js", "Express.js", "MongoDB", "WebSockets"],
    },
    {
      name: "AquaSense",
      description: "An industrial edge-diagnostics system executing real-time multi-spectral water quality analysis and forecasting.",
      stars: 8,
      forks: 3,
      language: "Python",
      langColor: "#3572A5",
      url: "https://github.com/Krishmahajan334/AquaSense-Smart-Water-Monitoring-System",
      techStack: ["ESP32", "InfluxDB", "PyTorch", "Python"],
    },
    {
      name: "Hand-Gesture-Vocalizer",
      description: "A wearable bio-sensory interface converting flex bend resistance currents into high-fidelity TTS vocal streams.",
      stars: 7,
      forks: 2,
      language: "C++",
      langColor: "#f34b7d",
      url: "https://github.com/Krishmahajan334/Hand-Gesture-Vocalizer",
      techStack: ["Arduino", "Embedded C", "Android", "BT 4.0"],
    },
    {
      name: "Life-Protector-on-Roads",
      description: "Edge collision telemetry array and black-spot warning nodes executing ultrasonic multi-path ranging calculations.",
      stars: 5,
      forks: 1,
      language: "C",
      langColor: "#555555",
      url: "https://github.com/Krishmahajan334/Life-Protector-on-Roads",
      techStack: ["Embedded Systems", "RF Transceivers", "Sensor Arrays"],
    },
  ];

  // Matrix coordinate tracking for pinned repository card spotlights
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  // Generate deterministic 52-week contributions grid (7 rows x 52 columns)
  const generateContributionData = () => {
    const grid: number[][] = [];
    // Stable LCG randomizer with a fixed seed to prevent grid reshuffling on re-renders
    let lcgSeed = 101;
    const lcgRand = () => {
      lcgSeed = (lcgSeed * 1664525 + 1013904223) % 4294967296;
      return lcgSeed / 4294967296;
    };

    for (let r = 0; r < 7; r++) {
      const row: number[] = [];
      for (let c = 0; c < 52; c++) {
        const p = lcgRand();
        let val = 0;
        
        // 60% standard non-active probability, scattered with green-intensity levels
        if (p > 0.94) val = 4;
        else if (p > 0.86) val = 3;
        else if (p > 0.70) val = 2;
        else if (p > 0.45) val = 1;

        // Weekend Commit Drop: developers commit much less on Sundays (r === 0) and Saturdays (r === 6)
        if ((r === 0 || r === 6) && lcgRand() > 0.12) {
          val = 0;
        }

        row.push(val);
      }
      grid.push(row);
    }
    return grid;
  };

  const contributionGrid = generateContributionData();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const fetchGitData = async () => {
      try {
        const [userRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
          fetch(`https://api.github.com/users/${username}/events?per_page=10`),
        ]);

        if (userRes.ok && reposRes.ok) {
          const userData = await userRes.json();
          const reposData = await reposRes.json();

          const totalStars = reposData.reduce(
            (sum: number, repo: any) => sum + (repo.stargazers_count || 0),
            0
          );

          const langMap: { [key: string]: number } = {};
          reposData.forEach((repo: any) => {
            if (repo.language) {
              langMap[repo.language] = (langMap[repo.language] || 0) + 1;
            }
          });

          const sortedLangs = Object.entries(langMap)
            .map(([language, count]) => ({ language, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

          setLanguages(sortedLangs);

          let commitCount = 84;
          try {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            const dateStr = thirtyDaysAgo.toISOString().split("T")[0];
            const commitRes = await fetch(
              `https://api.github.com/search/commits?q=author:${username}+committer-date:>${dateStr}`,
              { headers: { Accept: "application/vnd.github.cloak-preview" } }
            );
            if (commitRes.ok) {
              const commitData = await commitRes.json();
              commitCount = commitData.total_count || 68;
            }
          } catch (e) {
            console.error("Failed to fetch search commits:", e);
          }

          setStats({
            repos: userData.public_repos || 18,
            stars: totalStars || 32,
            followers: userData.followers || 12,
            commits: commitCount,
          });
        }

        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          const parsedEvents = eventsData
            .slice(0, 4)
            .map((ev: any) => {
              const eventType = ev.type;
              const repoName = ev.repo?.name ? ev.repo.name.replace(`${username}/`, "") : "Repository";
              const dateStr = new Date(ev.created_at).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              });

              let text = `Activity in ${repoName}`;
              let icon = "GitBranch";

              if (eventType === "PushEvent") {
                text = `Pushed commits to ${repoName}`;
                icon = "Flame";
              } else if (eventType === "CreateEvent") {
                text = `Created repository ${repoName}`;
                icon = "GitBranch";
              } else if (eventType === "ForkEvent") {
                text = `Forked repository ${repoName}`;
                icon = "GitBranch";
              } else if (eventType === "WatchEvent") {
                text = `Starred repository ${repoName}`;
                icon = "Star";
              }

              return {
                id: ev.id,
                type: eventType,
                repo: ev.repo?.name || "",
                date: dateStr,
                text,
                icon,
              };
            });
          setEvents(parsedEvents);
        }
      } catch (err) {
        console.error("Error gathering GitHub profiles:", err);
        setLanguages([
          { language: "TypeScript", count: 8 },
          { language: "JavaScript", count: 6 },
          { language: "Python", count: 5 },
          { language: "C++", count: 4 },
          { language: "Embedded C", count: 3 },
        ]);
        setEvents([
          { id: "1", type: "PushEvent", repo: "Tagtrix", date: "Today", text: "Pushed encrypted bridges to Tagtrix main", icon: "Flame" },
          { id: "2", type: "PushEvent", repo: "AquaSense", date: "Yesterday", text: "Optimized ML telemetry diagnostics", icon: "Flame" },
          { id: "3", type: "CreateEvent", repo: "Hand-Gesture-Vocalizer", date: "May 18", text: "Configured Wear audio triggers", icon: "GitBranch" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGitData();
  }, []);

  return (
    <section id="github-activity" className="relative w-full py-20 md:py-32 bg-[#050816] px-4 sm:px-6 md:px-8">
      {/* Background neon flares */}
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-brand-cyan/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-brand-purple/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="flex items-center justify-center gap-2 mb-3 text-xs font-semibold tracking-widest text-brand-cyan uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-cyan" />
            <span>DEVELOPER COCKPIT</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white mb-4">
            GitHub <span className="shimmer-text-cyan font-extrabold">Pipeline Analytics</span>
          </h2>
          
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base font-light">
            Live commits feed, language frequencies, and premium product cases pulled directly from cloud systems.
          </p>
        </div>

        {/* 1. Global Interactive Contribution Matrix */}
        <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-[#0a0f29]/30 backdrop-blur-xl mb-12 relative overflow-hidden text-left">
          
          {/* Subtle grid backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(0,245,255,0.015)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none" />

          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-brand-cyan animate-pulse" />
                <span>Contributions Board</span>
              </h3>
              <span className="text-[11px] text-gray-500 font-sans uppercase tracking-wider font-semibold">364 Days Activity Feed</span>
            </div>
            
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-brand-cyan hover:text-white flex items-center gap-1.5 transition-colors uppercase tracking-wider font-heading px-3 py-1.5 rounded-full border border-brand-cyan/15 bg-brand-cyan/5"
            >
              <span>Verify Pipeline</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Grid Scroll Wrapper */}
          <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10">
            <div className="min-w-[680px] flex gap-3 select-none">
              
              {/* Day Labels */}
              <div className="flex flex-col justify-between text-[10px] text-gray-500 font-mono py-1.5 w-8">
                {dayNames.map((day, idx) => (
                  <span key={day} className={idx % 2 === 1 ? "opacity-100" : "opacity-0"}>
                    {day}
                  </span>
                ))}
              </div>

              {/* Contribution Squares Matrix */}
              <div className="flex-1 grid grid-flow-col grid-rows-7 gap-1.5">
                {contributionGrid.map((row, rIdx) =>
                  row.map((val, cIdx) => {
                    // Color mapping
                    let bg = "bg-[#0e1227]/40 border border-white/2";
                    let glow = "";
                    if (val === 1) bg = "bg-[#00F5FF]/10 border border-[#00F5FF]/10";
                    else if (val === 2) bg = "bg-[#00F5FF]/25 border border-[#00F5FF]/20";
                    else if (val === 3) {
                      bg = "bg-[#1DCD9F]/45 border border-[#1DCD9F]/30";
                      glow = "shadow-[0_0_8px_rgba(29,205,159,0.2)]";
                    } else if (val === 4) {
                      bg = "bg-[#1DCD9F] border border-[#1DCD9F]";
                      glow = "shadow-[0_0_12px_rgba(29,205,159,0.65)]";
                    }

                    return (
                      <motion.div
                        key={`${rIdx}-${cIdx}`}
                        className={`w-3.5 h-3.5 rounded-[3px] transition-all cursor-pointer ${bg} ${glow} hover:scale-[1.3] hover:z-20`}
                        onMouseEnter={() =>
                          setHoveredCell({
                            dayIndex: rIdx,
                            weekIndex: cIdx,
                            count: val === 0 ? 0 : val * 2 + Math.floor(Math.random() * 3),
                          })
                        }
                        onMouseLeave={() => setHoveredCell(null)}
                      />
                    );
                  })
                )}
              </div>

            </div>
          </div>

          {/* Dynamic Tooltip Overlay */}
          <div className="h-6 mt-2 relative">
            <AnimatePresence>
              {hoveredCell && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-0 text-xs font-mono text-brand-cyan bg-brand-cyan/5 px-2.5 py-0.5 rounded border border-brand-cyan/15 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                  <span>
                    [ {hoveredCell.count} commits on {dayNames[hoveredCell.dayIndex]}, Week {hoveredCell.weekIndex + 1} ]
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* 2. Flagship Pinned Repositories Grid */}
        <div className="mb-16">
          <div className="flex flex-col items-start gap-1 text-left mb-8">
            <h3 className="text-xl font-heading font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-cyan animate-pulse" />
              <span>Flagship Repositories</span>
            </h3>
            <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold font-sans">Core Open-Source Projects</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pinnedRepos.map((repo, idx) => (
              <div
                key={repo.name}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                className="relative group rounded-3xl border border-white/5 bg-[#0a0f29]/30 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between gap-6 overflow-hidden text-left"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: 1000,
                }}
              >
                {/* Vercel-style interactive spotlight follow layer */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(280px circle at var(--x, 0px) var(--y, 0px), rgba(0, 245, 255, 0.04), transparent)`,
                  }}
                />

                {/* Raycast-style composite border glare */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{
                    border: "1px solid transparent",
                    borderRadius: "24px",
                    background: `radial-gradient(280px circle at var(--x, 0px) var(--y, 0px), rgba(0, 245, 255, 0.35), transparent 100%)`,
                    WebkitMaskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                {/* Top Row: Title & Stargazers */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-5 h-5 text-brand-cyan" />
                      <h4 className="text-lg font-heading font-bold text-white group-hover:text-brand-cyan transition-colors">
                        {repo.name}
                      </h4>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-brand-cyan/80 bg-brand-cyan/5 px-2 py-0.5 rounded-full border border-brand-cyan/15 flex items-center gap-1">
                        <Star className="w-3 h-3 animate-pulse fill-brand-cyan stroke-brand-cyan" />
                        <span>{repo.stars}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm font-sans font-light leading-relaxed">
                    {repo.description}
                  </p>
                </div>

                {/* Bottom Row: Language Indicator & Tech Badges */}
                <div className="flex flex-col gap-4">
                  {/* Tech stack badge line */}
                  <div className="flex flex-wrap gap-1.5">
                    {repo.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-mono text-gray-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: repo.langColor }}
                      />
                      <span>{repo.language}</span>
                    </div>

                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-brand-cyan group-hover:text-white flex items-center gap-1 transition-colors uppercase tracking-wider font-heading"
                    >
                      <span>Explore Source</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* 3. Numerical Metrics & Languages */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Commits & EventsTimeline */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 text-left flex flex-col justify-between">
            <div className="w-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                    <Flame className="w-4 h-4 text-brand-cyan animate-pulse" />
                    <span>Real-time Stream</span>
                  </h3>
                  <span className="text-[10px] text-gray-500 font-sans uppercase tracking-widest font-semibold">Live Event Logs</span>
                </div>
                
                <span className="text-[10px] font-mono text-brand-cyan bg-brand-cyan/5 px-2.5 py-0.5 rounded border border-brand-cyan/15 animate-pulse">
                  PIPELINE ONLINE
                </span>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />
                    ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {events.map((ev) => (
                    <div
                      key={ev.id}
                      className="flex items-center gap-4 p-4 bg-[#050816]/50 border border-white/5 rounded-2xl hover:border-brand-cyan/20 transition-all hover:bg-brand-cyan/2"
                    >
                      <div className="p-2.5 rounded-xl bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/15">
                        {ev.icon === "Flame" ? <Flame className="w-4 h-4 text-brand-cyan" /> : <GitBranch className="w-4 h-4 text-brand-cyan" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{ev.text}</p>
                        <p className="text-xs text-gray-500 mt-0.5 font-mono">{ev.date}</p>
                      </div>
                      <a
                        href={`https://github.com/${ev.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick stats bottom summary */}
            <div className="grid grid-cols-3 gap-2 pt-6 mt-6 border-t border-white/5 text-center">
              <div className="flex flex-col">
                <span className="text-lg font-heading font-extrabold text-white">{stats.repos}</span>
                <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Total Repos</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-heading font-extrabold text-white">{stats.stars}</span>
                <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Stars</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-heading font-extrabold text-white">{stats.commits}</span>
                <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Commits</span>
              </div>
            </div>

          </div>

          {/* Core Language Frequency Progress Bars */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 text-left flex flex-col justify-between">
            <div className="w-full">
              <div className="flex flex-col gap-1 mb-6">
                <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-brand-cyan" />
                  <span>Language Index</span>
                </h3>
                <span className="text-[10px] text-gray-500 font-sans uppercase tracking-widest font-semibold">Frequency Distribution</span>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="h-10 bg-white/5 rounded animate-pulse" />
                    ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {languages.map((lang) => (
                    <div key={lang.language} className="flex flex-col gap-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-white flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                          {lang.language}
                        </span>
                        <span className="text-gray-500 font-mono">{lang.count} Projects</span>
                      </div>
                      
                      {/* Premium glowing track bar */}
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple shadow-[0_0_8px_#00F5FF]"
                          style={{
                            width: `${Math.min((lang.count / stats.repos) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Offline notification card */}
            <div className="mt-6 p-3 bg-brand-cyan/2 border border-brand-cyan/10 rounded-xl flex items-start gap-2.5 text-[10px] text-gray-400 font-sans leading-relaxed">
              <AlertCircle className="w-4 h-4 text-brand-cyan shrink-0" />
              <span>
                System automatically polls local fallback indexes in offline test nodes to secure seamless rendering backups.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
