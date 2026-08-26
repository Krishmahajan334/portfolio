"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Image as ImageIcon, ChevronRight, ChevronLeft } from "lucide-react";
import { galleries } from "@/data/galleries";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";

const featuredImages = [
  {
    url: "/gallery/niti-aayog/pmKrish.jpg",
    caption: "Showcasing the Hand Gesture Vocalizer to the Hon'ble Prime Minister",
    galleryId: "niti-aayog",
    tag: "National Showcase"
  },
  {
    url: "/gallery/niti-aayog/G20%20Sherpa%20MR.%20Amitabh%20Kanth.jpg",
    caption: "Showcasing the project to G20 Sherpa Mr. Amitabh Kant",
    galleryId: "niti-aayog",
    tag: "G20 Interaction"
  },
  {
    url: "/gallery/niti-aayog/AIM%20DIRECTOR%20_DR%20CHINTAN%20VAISHNAV.jpg",
    caption: "Interacting with AIM Mission Director Dr. Chintan Vaishnav",
    galleryId: "niti-aayog",
    tag: "AIM Interaction"
  },
  {
    url: "/gallery/ncsc/1676466798010.jpeg",
    caption: "First Prize at National Children's Science Congress",
    galleryId: "ncsc",
    tag: "First Prize"
  }
];

export default function GalleryIndex() {
  const galleryList = Object.values(galleries);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % featuredImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? featuredImages.length - 1 : prev - 1));

  const currentFeature = featuredImages[currentSlide];

  return (
    <>
      <div className="cyber-grid-container">
        <div className="cyber-grid" />
        <div className="cyber-torch-leak" />
      </div>

      <CustomCursor />
      
      {/* Navbar */}
      <div className="absolute top-0 w-full z-40 p-6 flex justify-between items-center bg-gradient-to-b from-[#050816]/90 to-transparent pointer-events-none">
        <Link href="/" className="flex items-center gap-2 font-heading font-bold text-lg tracking-wider text-white group pointer-events-auto">
          <div className="p-1 rounded-lg bg-brand-cyan/5 border border-brand-cyan/15 group-hover:border-brand-cyan/60 transition-all">
            <Sparkles className="w-5 h-5 text-brand-cyan" />
          </div>
          <span>
            krishmahajan<span className="text-brand-cyan font-extrabold">.dev</span>
          </span>
        </Link>
        <Link href="/" className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider text-white border border-white/20 hover:bg-brand-cyan hover:border-brand-cyan hover:text-black transition-all pointer-events-auto">
          BACK TO HOME
        </Link>
      </div>

      <main className="min-h-screen bg-[#050816] flex flex-col relative z-10 pb-20">
        
        {/* HERO SLIDESHOW SECTION */}
        <section className="relative w-full h-[70vh] md:h-[80vh] bg-black border-b border-white/10 overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={currentFeature.url}
                alt={currentFeature.caption}
                fill
                className="object-cover md:object-contain bg-[#03050e]"
                priority
              />
              {/* Gradient Overlay for Text Visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Slider Content & Controls */}
          <div className="absolute inset-0 max-w-7xl mx-auto px-6 flex flex-col justify-end pb-16 md:pb-24 pointer-events-none">
            <div className="flex justify-between items-end w-full">
              
              <div className="max-w-2xl pointer-events-auto">
                <motion.div
                  key={`tag-${currentSlide}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/20 border border-brand-cyan/50 text-brand-cyan text-xs font-heading font-bold uppercase tracking-wider backdrop-blur-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {currentFeature.tag}
                </motion.div>

                <motion.h2
                  key={`caption-${currentSlide}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl md:text-4xl lg:text-5xl font-heading font-extrabold text-white mb-6 leading-tight drop-shadow-lg"
                >
                  {currentFeature.caption}
                </motion.h2>

                <motion.div
                  key={`btn-${currentSlide}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    href={`/gallery/${currentFeature.galleryId}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-cyan text-black font-heading font-bold tracking-wider hover:bg-brand-cyan/90 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all group/btn"
                  >
                    <ImageIcon className="w-5 h-5" />
                    Explore This Gallery
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>

              {/* Slider Controls */}
              <div className="hidden md:flex items-center gap-3 pointer-events-auto">
                <button onClick={prevSlide} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 hover:border-brand-cyan text-white transition-all backdrop-blur-sm">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={nextSlide} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 hover:border-brand-cyan text-white transition-all backdrop-blur-sm">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {featuredImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentSlide ? "w-8 bg-brand-cyan shadow-[0_0_8px_#00F5FF]" : "w-2 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* COLLECTIONS GRID */}
        <div className="max-w-7xl mx-auto px-6 w-full pt-20">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-2">
                Browse <span className="shimmer-text-cyan">Collections</span>
              </h2>
              <p className="text-gray-400 font-sans text-base">
                Explore the complete visual archives from all events.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryList.map((gallery, idx) => {
              const coverImage = gallery.images[0]?.url || "/assets/watermark_logo_light.png";
              return (
                <motion.div
                  key={gallery.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link
                    href={`/gallery/${gallery.id}`}
                    className="group block relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl hover:border-brand-cyan/50 transition-all duration-500"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src={coverImage}
                        alt={gallery.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-75 group-hover:brightness-50"
                      />
                    </div>
                    
                    {/* Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050816]/20 to-[#050816]/90 group-hover:to-[#050816] transition-all" />

                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-xs font-heading font-bold uppercase tracking-wider w-fit">
                        <ImageIcon className="w-3.5 h-3.5 text-brand-cyan" />
                        {gallery.images.length} Photos
                      </div>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">
                        {gallery.title}
                      </h3>
                      <p className="text-gray-300 font-sans text-sm md:text-base line-clamp-2 max-w-lg opacity-80 group-hover:opacity-100 transition-opacity">
                        {gallery.subtitle}
                      </p>
                    </div>

                    {/* Hover Arrow Icon */}
                    <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-brand-cyan/0 border border-transparent flex items-center justify-center text-brand-cyan opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-brand-cyan/20 group-hover:border-brand-cyan/50 transition-all duration-300 backdrop-blur-md">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
