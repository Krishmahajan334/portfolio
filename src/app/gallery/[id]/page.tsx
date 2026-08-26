"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Image as ImageIcon } from "lucide-react";
import { galleries, GalleryData } from "@/data/galleries";

export default function GalleryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [gallery, setGallery] = useState<GalleryData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (id && typeof id === "string" && galleries[id]) {
      setGallery(galleries[id]);
    } else {
      setGallery(null);
    }
  }, [id]);

  const handleNext = () => {
    if (gallery) {
      setCurrentIndex((prev) => (prev + 1) % gallery.images.length);
    }
  };

  const handlePrev = () => {
    if (gallery) {
      setCurrentIndex((prev) => (prev === 0 ? gallery.images.length - 1 : prev - 1));
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gallery, router]);

  if (!gallery) {
    return (
      <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center text-white p-6">
        <ImageIcon className="w-16 h-16 text-brand-cyan/50 mb-6" />
        <h1 className="text-3xl font-heading font-bold mb-4">Gallery Not Found</h1>
        <p className="text-gray-400 mb-8 text-center max-w-md">
          The gallery you are looking for does not exist or the ID is incorrect.
        </p>
        <Link href="/" className="px-6 py-3 bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 rounded-full font-heading font-semibold hover:bg-brand-cyan hover:text-black transition-all">
          Return to Portfolio
        </Link>
      </div>
    );
  }

  const currentImage = gallery.images[currentIndex];

  return (
    <div className="min-h-screen bg-[#050816] flex flex-col relative overflow-hidden">
      {/* Background glow */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/5 blur-[160px] rounded-full pointer-events-none z-0" />
      
      {/* Header */}
      <header className="relative z-20 flex items-center justify-between p-6 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div>
          <h1 className="text-xl md:text-2xl font-heading font-extrabold text-white">
            {gallery.title}
          </h1>
          <p className="text-sm text-gray-400 font-sans mt-1">
            {gallery.subtitle}
          </p>
        </div>
        <button
          onClick={() => router.push("/#about")}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
          aria-label="Close Gallery"
        >
          <X className="w-6 h-6" />
        </button>
      </header>

      {/* Main Slideshow Area */}
      <main className="flex-grow flex items-center justify-center relative z-10 p-4 md:p-8">
        
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 rounded-full bg-black/50 border border-white/10 text-white backdrop-blur-md hover:bg-brand-cyan hover:text-black hover:border-brand-cyan transition-all"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Image Container */}
        <div className="relative w-full max-w-5xl aspect-square sm:aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl bg-[#0a0f29] border border-white/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={currentImage.url}
                alt={currentImage.caption || gallery.title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Caption Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white font-sans text-lg md:text-xl text-center">
              {currentImage.caption}
            </p>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 rounded-full bg-black/50 border border-white/10 text-white backdrop-blur-md hover:bg-brand-cyan hover:text-black hover:border-brand-cyan transition-all"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>

      </main>

      {/* Footer / Image Counter */}
      <footer className="relative z-20 p-6 flex justify-center items-center">
        <div className="flex gap-2">
          {gallery.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                currentIndex === idx
                  ? "bg-brand-cyan scale-125 shadow-[0_0_10px_#00F5FF]"
                  : "bg-white/20 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </footer>
    </div>
  );
}
