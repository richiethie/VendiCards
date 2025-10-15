'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, Zap, CheckCircle, Package } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      
      {/* Full Screen Video Background - Desktop */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover hidden md:block opacity-30"
      >
        <source src="/videos/pl-landscape.mp4" type="video/mp4" />
      </video>

      {/* Full Screen Video Background - Mobile */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover md:hidden opacity-30"
      >
        <source src="/videos/pl-vertical.mp4" type="video/mp4" />
      </video>

      {/* Radial spotlight effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Main Hero Content - Centered */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-16 py-12">
          <div className="max-w-6xl w-full">
            
            {/* Center Content Block */}
            <div className="text-center mb-16">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-red-500/10 backdrop-blur-sm px-5 py-2 rounded-full border border-red-500/30 mb-8">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-red-400">Now Open</span>
                <div className="w-px h-4 bg-red-500/30 mx-1"></div>
                <span className="text-sm text-gray-400">Professional Card Services</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.95] tracking-tighter">
                Build Your
                <br />
                <span className="text-red-500">Dream Collection</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                Premium Pokémon cards, expert restoration, and professional grading prep—all in one place
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Link
                  href="/shop"
                  className="group relative w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-10 py-5 rounded-full text-lg font-bold transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.3)] hover:shadow-[0_0_80px_rgba(239,68,68,0.5)]"
                >
                  <span className="relative z-10">Explore Collection</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
                
                <Link
                  href="/repairs"
                  className="group w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border-2 border-white/20 hover:border-white/40 px-10 py-5 rounded-full text-lg font-bold transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Repair Services
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
                <div className="flex items-center gap-2 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-medium">Authenticated Cards</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-medium">Secure Transactions</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Package className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-medium">Fast Shipping</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-red-500/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>
                <div className="relative">
                  <div className="text-5xl font-black text-white mb-2">1000<span className="text-red-500">+</span></div>
                  <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">Cards Sold</div>
                  <div className="mt-4 h-1 w-16 bg-gradient-to-r from-red-500 to-transparent rounded-full"></div>
                </div>
              </div>

              <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-red-500/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>
                <div className="relative">
                  <div className="text-5xl font-black text-white mb-2">500<span className="text-red-500">+</span></div>
                  <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">Repairs Done</div>
                  <div className="mt-4 h-1 w-16 bg-gradient-to-r from-red-500 to-transparent rounded-full"></div>
                </div>
              </div>

              <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-red-500/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>
                <div className="relative">
                  <div className="text-5xl font-black text-white mb-2">100<span className="text-red-500">%</span></div>
                  <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">Satisfied</div>
                  <div className="mt-4 h-1 w-16 bg-gradient-to-r from-red-500 to-transparent rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features Bar */}
        <div className="pb-32 px-4 sm:px-6 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-red-500/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/20 transition-colors">
                    <Shield className="w-7 h-7 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Authenticity Guaranteed</h3>
                    <p className="text-gray-400 text-sm">Every card inspected and verified by experts</p>
                  </div>
                </div>
              </div>

              <Link href="/repairs" className="group block">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-red-500/50 transition-all duration-300 h-full">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/20 transition-colors">
                      <Zap className="w-7 h-7 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
                        Grand Opening Special
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </h3>
                      <p className="text-gray-400 text-sm">Professional card restoration services now available</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;