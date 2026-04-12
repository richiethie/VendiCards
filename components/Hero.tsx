'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-black overflow-hidden pt-8 pb-24 md:py-32 lg:py-40">
      
      {/* Full Screen Video Background - Desktop */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover hidden md:block opacity-50"
      >
        <source src="/videos/Landscape-hero.mov" type="video/mp4" />
      </video>

      {/* Full Screen Video Background - Mobile */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover md:hidden opacity-50"
      >
        <source src="/videos/Vertical-hero2.mov" type="video/mp4" />
      </video>

      {/* Radial spotlight effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-500/10 backdrop-blur-sm px-5 py-2 rounded-full border border-red-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-red-400" />
            <span className="text-sm font-semibold text-red-400 uppercase tracking-wide">New Arrivals Weekly</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Premium Pokémon Cards
            <br />
            <span className="text-red-500">& Expert Services</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Browse our curated collection of graded slabs, sealed products, and rare singles. Professional restoration and grading prep available.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/shop"
              className="group relative w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-lg text-lg font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-red-600/50"
            >
              <span className="relative z-10">Shop Collection</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            {/* Repairs paused — re-enable with lib/siteFlags.ts
            <Link
              href="/repairs"
              className="group w-full sm:w-auto bg-transparent hover:bg-white/5 text-white border-2 border-gray-700 hover:border-red-500/50 px-10 py-4 rounded-lg text-lg font-bold transition-all duration-300 flex items-center justify-center gap-3"
            >
              Card Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;