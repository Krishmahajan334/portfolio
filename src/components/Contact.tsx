"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send, Sparkles, AlertTriangle, CheckCircle } from "lucide-react";

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error" | null; text: string }>({
    type: null,
    text: "",
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Robust Spam/Gibberish Message Verification Engine
  const detectGibberish = (text: string): ValidationResult => {
    const errors: string[] = [];
    const cleanText = text.trim().replace(/\s+/g, " ");

    if (cleanText.length < 10) {
      errors.push("Message must be at least 10 characters long");
    }

    const words = cleanText.split(" ").filter((w) => w.length > 0);
    if (words.length < 3) {
      errors.push("Message must contain at least 3 words");
    }

    const charRepetition = /(.)\1{4,}/g;
    if (charRepetition.test(cleanText)) {
      errors.push("Message contains too many repeating characters");
    }

    const wordCounts: { [key: string]: number } = {};
    words.forEach((word) => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, "");
      if (cleanWord.length > 2) {
        wordCounts[cleanWord] = (wordCounts[cleanWord] || 0) + 1;
      }
    });

    const repeatedWords = Object.entries(wordCounts).filter(([, count]) => count > 3);
    if (repeatedWords.length > 0) {
      errors.push("Message contains excessive repeating words");
    }

    const randomPatterns = [
      /asdfgh/i,
      /qwerty/i,
      /zxcvbn/i,
      /123456/i,
      /abcdef/i,
      /[!@#$%^&*]{3,}/,
    ];

    for (const pattern of randomPatterns) {
      if (pattern.test(cleanText)) {
        errors.push("Message contains random spam keyboard runs");
        break;
      }
    }

    const consecutiveNumbers = /[0-9]{4,}/;
    if (consecutiveNumbers.test(cleanText)) {
      errors.push("Message contains random number sequences");
    }

    const meaningfulWords = words.filter((word) => word.length >= 3);
    if (meaningfulWords.length < 2) {
      errors.push("Message must contain meaningful words (3+ characters)");
    }

    const punctuationCount = (cleanText.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length;
    if (punctuationCount > cleanText.length * 0.3) {
      errors.push("Message contains too much punctuation");
    }

    const upperCaseWords = words.filter((word) => word === word.toUpperCase() && word.length > 2);
    if (upperCaseWords.length > words.length * 0.5) {
      errors.push("Please avoid typing your entire message in shouting ALL-CAPS");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (name === "message" && validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback({ type: null, text: "" });
    setValidationErrors([]);

    const validation = detectGibberish(formData.message);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      setFeedback({
        type: "error",
        text: "Please correct the message validations below before submitting.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/mjkrlgar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: "New portfolio message from Krish Mahajan Portfolio!",
        }),
      });

      if (response.ok) {
        setFeedback({
          type: "success",
          text: "Excellent! Your message was transmitted successfully. I will get back to you soon!",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error("Formspree rejected package.");
      }
    } catch (err) {
      console.error("Transmission error:", err);
      setFeedback({
        type: "error",
        text: `Form submission rate-limited. Click below to submit via mail client directly:`,
      });
    } finally {
      setLoading(false);
    }
  };

  // High-performance pointer tracking relative to card bounding coordinates
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  };

  return (
    <section id="contact-form" className="relative w-full py-20 md:py-32 bg-[#050816] px-6 overflow-hidden">
      
      {/* Background spotlights */}
      <div className="absolute top-[20%] left-[5%] w-[350px] h-[350px] bg-brand-cyan/5 blur-[125px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-2 mb-3 text-xs font-semibold tracking-widest text-brand-purple uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comm Channels</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-white mb-4 tracking-tight">
            Initialize <span className="shimmer-text-cyan font-extrabold">Connection</span>
          </h2>
          
          <p className="text-gray-400 max-w-xl mx-auto text-base font-light">
            Have a project idea, hackathon invitation, or collaboration proposal? Shoot me a message!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Grid Column: Details & Networks */}
          <div className="md:col-span-5 flex flex-col justify-between gap-8 text-left">
            <div className="space-y-6">
              <h3 className="text-3xl font-heading font-extrabold text-white tracking-tight leading-tight">
                Let&apos;s Build the Future
              </h3>
              
              <p className="text-gray-300 font-sans font-light text-base leading-relaxed">
                I am highly open to consulting, core software collaborations, automation systems, and advanced technology innovations.
              </p>
            </div>

            {/* Info details list */}
            <div className="space-y-6">
              
              {/* Mail card */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-brand-purple/10 border border-brand-purple/20 text-brand-purple">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-widest font-heading font-bold">EMAIL NODE</span>
                  <a href="mailto:krishmahajan334@gmail.com" className="text-sm font-semibold text-white hover:text-brand-purple transition-colors">
                    krishmahajan334@gmail.com
                  </a>
                </div>
              </div>

              {/* Location card */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-brand-purple/10 border border-brand-purple/20 text-brand-purple">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-widest font-heading font-bold">LOCATION COORDS</span>
                  <span className="text-sm font-semibold text-white">
                    Batote, Jammu & Kashmir, India
                  </span>
                </div>
              </div>

              {/* Response node card */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-brand-purple/10 border border-brand-purple/20 text-brand-purple">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-widest font-heading font-bold">LATENCY</span>
                  <span className="text-sm font-semibold text-white">
                    Response within 24 hours
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Grid Column: Space-age Form Bezel with Coordinate Spotlight */}
          <div className="md:col-span-7">
            <div
              onMouseMove={handleMouseMove}
              className="group relative rounded-2xl border border-white/5 bg-[#03050e]/40 backdrop-blur-md p-6 sm:p-8 shadow-2xl overflow-hidden text-left"
            >
              {/* 1. Core Card Coordinate Spotlight Glare */}
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                style={{
                  background: `radial-gradient(350px circle at var(--x, 100px) var(--y, 100px), rgba(127, 90, 240, 0.04), transparent)`,
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
              
              <form onSubmit={handleFormSubmit} className="space-y-5 relative z-10">
                
                {/* Names row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="firstName" className="text-xs font-semibold text-gray-400 uppercase tracking-widest font-heading">
                      First Name <span className="text-brand-purple">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Krish"
                      className="px-4 py-3 rounded-xl bg-[#050816]/70 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-brand-purple/80 focus:shadow-[0_0_12px_rgba(127,90,240,0.2)] transition-all text-sm font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="lastName" className="text-xs font-semibold text-gray-400 uppercase tracking-widest font-heading">
                      Last Name <span className="text-brand-purple">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Mahajan"
                      className="px-4 py-3 rounded-xl bg-[#050816]/70 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-brand-purple/80 focus:shadow-[0_0_12px_rgba(127,90,240,0.2)] transition-all text-sm font-sans"
                    />
                  </div>
                </div>

                {/* Email address */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-widest font-heading">
                    Email Address <span className="text-brand-purple">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="krishmahajan334@gmail.com"
                    className="px-4 py-3 rounded-xl bg-[#050816]/70 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-brand-purple/80 focus:shadow-[0_0_12px_rgba(127,90,240,0.2)] transition-all text-sm w-full font-sans"
                  />
                </div>

                {/* Subject Selector */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-semibold text-gray-400 uppercase tracking-widest font-heading">
                    Subject Node <span className="text-brand-purple">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="px-4 py-3 rounded-xl bg-[#050816]/90 border border-white/10 text-white focus:outline-none focus:border-brand-purple/80 focus:shadow-[0_0_12px_rgba(127,90,240,0.2)] transition-all text-sm w-full appearance-none font-sans"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%237F5AF0' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1.25rem",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <option value="" disabled className="bg-[#050816]">Select subject metric</option>
                    <option value="project-inquiry" className="bg-[#050816]">Project Inquiry</option>
                    <option value="job-opportunity" className="bg-[#050816]">Job Opportunity</option>
                    <option value="collaboration" className="bg-[#050816]">Collaboration</option>
                    <option value="general" className="bg-[#050816]">General message</option>
                  </select>
                </div>

                {/* Message Box */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-gray-400 uppercase tracking-widest font-heading">
                    Message <span className="text-brand-purple">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me details about your project or how we can collaborate..."
                    className="px-4 py-3 rounded-xl bg-[#050816]/70 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-brand-purple/80 focus:shadow-[0_0_12px_rgba(127,90,240,0.2)] transition-all text-sm w-full resize-none font-sans"
                  />
                  <span className="text-[10px] text-gray-500 leading-normal font-sans">
                    💡 Tip: Standard validation rules apply. Avoid shouting (ALL CAPS), punctuation spamming, or gibberish words.
                  </span>
                </div>

                {/* Validation warnings feed */}
                {validationErrors.length > 0 && (
                  <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs space-y-1.5">
                    <p className="font-heading font-semibold flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      <span>SPAM PROTOCOL WARNINGS:</span>
                    </p>
                    <ul className="list-disc pl-4 space-y-1 font-light">
                      {validationErrors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Transmission Feedback */}
                {feedback.type && (
                  <div
                    className={`p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
                      feedback.type === "success"
                        ? "border-green-500/20 bg-green-500/5 text-green-400"
                        : "border-red-500/20 bg-red-500/5 text-red-400"
                    }`}
                  >
                    {feedback.type === "success" ? (
                      <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    )}
                    <div className="flex flex-col gap-1.5 w-full">
                      <span>{feedback.text}</span>
                      
                      {feedback.type === "error" && (
                        <a
                          href={`mailto:krishmahajan334@gmail.com?subject=Portfolio%20Contact&body=${encodeURIComponent(
                            formData.message
                          )}`}
                          className="px-4 py-2 rounded bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-center font-bold font-heading uppercase text-[10px] tracking-widest text-red-400 mt-1 transition-all"
                        >
                          Send Direct Email
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 px-6 py-3 rounded-xl border border-brand-purple bg-brand-purple/5 text-brand-purple font-semibold hover:bg-brand-purple hover:text-white hover:shadow-[0_0_20px_rgba(127,90,240,0.4)] transition-all duration-300 font-heading select-none cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "TRANSMITTING DATA PACKETS..." : "SEND MESSAGE"}</span>
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
