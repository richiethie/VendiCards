'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Shield, Zap, Users, Phone, Facebook, ExternalLink } from 'lucide-react';
import { FaEtsy } from 'react-icons/fa';
import Hero from '@/components/Hero';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import TrustBadges from '@/components/TrustBadges';
import FeaturedProducts from '@/components/FeaturedProducts';
import NewsletterSignup from '@/components/NewsletterSignup';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0e0f11]">
      
      {/* Announcement Banner */}
      <AnnouncementBanner />
      
      {/* Hero Section */}
      <Hero />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Categories/Services Section */}
      <section id="services" className="py-20 bg-[#0e0f11] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
        {/* Decorative Background Images */}
        {/* <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
          <Image
            src="/images/background-1.png"
            alt=""
            fill
            className="object-cover"
          />
        </div> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Shop by <span className="text-red-500">Category</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Browse our collection or get professional card services
            </p>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Shop Collection */}
            <Link href="/shop" className="group bg-gradient-to-br from-red-500/10 to-transparent backdrop-blur-sm rounded-2xl border border-red-500/30 p-8 text-center hover:border-red-500/50 hover:bg-red-500/20 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-1">
              <div className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-red-500/30 transition-all duration-300">
                <Star className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Shop Collection</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Browse our curated selection of graded slabs, sealed products, and rare Pokémon cards from various sets.
              </p>
              <span className="text-red-400 hover:text-red-300 font-medium group-hover:underline">
                Browse Now →
              </span>
            </Link>

             {/* Card Services */}
            <Link href="/repairs" className="group bg-[#0e0f11]/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 text-center hover:border-red-500/30 hover:bg-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/5 hover:-translate-y-1">
              <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-red-500/20 transition-all duration-300">
                <Shield className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Card Services</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Professional restoration, grading prep, and appraisal services to maximize the value of your collection.
              </p>
              <span className="text-red-400 hover:text-red-300 font-medium group-hover:underline">
                Learn More →
              </span>
            </Link>

             {/* Sell Collection */}
            <Link href="/contact" className="group bg-[#0e0f11]/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 text-center hover:border-red-500/30 hover:bg-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/5 hover:-translate-y-1">
               <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-red-500/15 transition-all duration-500">
                <Zap className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Sell Your Collection</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Looking to sell your cards? We're always interested in purchasing quality Pokémon cards and collections.
              </p>
              <span className="text-red-400 hover:text-red-300 font-medium group-hover:underline">
                Contact Us →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Contact CTA */}
      <section className="relative py-20 bg-[#0e0f11] overflow-hidden">
        {/* Elegant background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-red-400/5 rounded-full blur-2xl"></div>
          {/* Shop Image Overlay */}
          {/* <div className="absolute bottom-0 left-0 w-1/4 h-2/3 opacity-5 pointer-events-none">
            <Image
              src="/images/shop.png"
              alt=""
              fill
              className="object-cover object-top"
            />
          </div> */}
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Building Your Collection?
          </h2>
           <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
             Whether you're looking to buy, sell, or need professional card services, we're here to help you every step of the way.
           </p>
          
           <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
             <a
               href="https://www.facebook.com/VendiCardsShop"
               target="_blank"
               rel="noopener noreferrer"
              className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/25 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center"
             >
               Browse Collection
               <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
             </a>
             <a
               href="tel:+12242564715"
              className="group border-2 border-gray-700 hover:border-red-500/50 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-500/10 transition-all duration-300 flex items-center justify-center"
             >
               <Phone className="w-5 h-5 mr-2" />
               Call (224) 256-4715
             </a>
           </div>

           <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <Facebook className="w-4 h-4" />
              <span>Facebook: VendiCardsShop</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEtsy className="w-4 h-4" />
              <span>Etsy: VendiCardsShop</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>WhatNot: vendicards</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}