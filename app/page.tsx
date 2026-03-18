'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Shield, Zap, Users, Phone, Facebook, ExternalLink, HelpCircle, ChevronDown } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
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
             <Link
               href="/shop"
              className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/25 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center"
             >
               Browse Collection
               <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
             </Link>
             <a
               href="tel:+19205396222"
              className="group border-2 border-gray-700 hover:border-red-500/50 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-500/10 transition-all duration-300 flex items-center justify-center"
             >
               <Phone className="w-5 h-5 mr-2" />
               Call (920) 539-6222
             </a>
           </div>

           <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-gray-400 text-sm">
            <a
              href="https://www.facebook.com/p/VendiCards-61577324265476/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-red-400 transition-colors"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook: VendiCards</span>
            </a>
            <a
              href="https://www.instagram.com/vendicards/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-red-400 transition-colors"
            >
              <FaInstagram className="w-4 h-4" />
              <span>Instagram: @vendicards</span>
            </a>
            <a
              href="https://www.whatnot.com/user/vendicards"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-red-400 transition-colors"
            >
              <Star className="w-4 h-4" />
              <span>WhatNot: vendicards</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 bg-[#0e0f11] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl mb-6">
              <HelpCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Frequently Asked <span className="text-red-500">Questions</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Can't find what you're looking for?{' '}
              <Link href="/contact" className="text-red-400 hover:text-red-300 underline">
                Contact Us
              </Link>
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ Item 1: Store Hours */}
            <details className="group bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 text-white font-semibold hover:text-red-400 transition-colors">
                <span className="text-lg">What are your store hours?</span>
                <ChevronDown className="w-5 h-5 flex-shrink-0 transform group-open:rotate-180 transition-transform text-gray-400 group-hover:text-red-400" />
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                <p className="text-gray-300 leading-relaxed">
                  Our store is open Monday to Friday from 11am to 7pm and closed on the weekend. However, we are always monitoring the site, reach out whenever and we will get back to you ASAP!
                </p>
              </div>
            </details>

            {/* FAQ Item 2: Trades and Buying */}
            <details className="group bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 text-white font-semibold hover:text-red-400 transition-colors">
                <span className="text-lg">Does VendiCards take trades and buy cards / collections?</span>
                <ChevronDown className="w-5 h-5 flex-shrink-0 transform group-open:rotate-180 transition-transform text-gray-400 group-hover:text-red-400" />
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                <p className="text-gray-300 leading-relaxed mb-3">
                  Yes! Please just contact us with any proposals. We can take trades in at around 75-110% comps depending on the item. We would be a buyer at 70% on items $500 and lower, and 75-80% market price on anything over $500 per card.
                </p>
              </div>
            </details>

            {/* FAQ Item 3: Bulk Discounts */}
            <details className="group bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 text-white font-semibold hover:text-red-400 transition-colors">
                <span className="text-lg">Does VendiCards offer discounts for bulk deals?</span>
                <ChevronDown className="w-5 h-5 flex-shrink-0 transform group-open:rotate-180 transition-transform text-gray-400 group-hover:text-red-400" />
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                <p className="text-gray-300 leading-relaxed">
                  Absolutely, just contact us with any deal you have in mind!
                </p>
              </div>
            </details>

            {/* FAQ Item 4: Card Condition Evaluation */}
            <details className="group bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 text-white font-semibold hover:text-red-400 transition-colors">
                <span className="text-lg">How are raw card conditions evaluated?</span>
                <ChevronDown className="w-5 h-5 flex-shrink-0 transform group-open:rotate-180 transition-transform text-gray-400 group-hover:text-red-400" />
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                <p className="text-gray-300 leading-relaxed">
                  All raw cards are graded using <strong className="text-white">official TCGplayer condition guidelines</strong>. Condition is clearly stated on each listing. Questions? Just reach out — we're happy to help!
                </p>
              </div>
            </details>

            {/* FAQ Item 5: Shipping Process */}
            <details className="group bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 text-white font-semibold hover:text-red-400 transition-colors">
                <span className="text-lg">What is the shipping process like?</span>
                <ChevronDown className="w-5 h-5 flex-shrink-0 transform group-open:rotate-180 transition-transform text-gray-400 group-hover:text-red-400" />
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                <p className="text-gray-300 leading-relaxed">
                  We ship all orders securely in either a <strong className="text-white">bubble mailer</strong> or a <strong className="text-white">box</strong>, depending on product size. <strong className="text-white">Tracking is provided</strong> with every order. Most orders ship within <strong className="text-white">1–3 business days</strong>, with U.S. delivery typically in <strong className="text-white">3–7 business days</strong>. We offer <strong className="text-white">combined shipping</strong> when possible. At this time, we primarily ship within the U.S. — please contact us for international requests.
                </p>
              </div>
            </details>

            {/* FAQ Item 6: Refund & Exchange Policy */}
            <details className="group bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 text-white font-semibold hover:text-red-400 transition-colors">
                <span className="text-lg">Refund & Exchange Policy</span>
                <ChevronDown className="w-5 h-5 flex-shrink-0 transform group-open:rotate-180 transition-transform text-gray-400 group-hover:text-red-400" />
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">Refunds</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Refunds are available for <strong className="text-white">graded and raw cards</strong> if the item does not match the description provided at the time of sale. If you believe your card was misrepresented, please contact us promptly so we can address your concerns.
                  </p>
                  <p className="text-gray-300 leading-relaxed mt-2">
                    Please note that <strong className="text-white">sealed products are non-refundable</strong> if the seal is damaged in any sort of way.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Exchanges</h4>
                  <p className="text-gray-300 leading-relaxed">
                    We offer <strong className="text-white">exchanges on merchandise</strong> (e.g., clothing) if the size does not fit. Items must be returned in new, unworn condition within 14 days of delivery. Please contact us to begin the exchange process.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Card Repair Services</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Due to the personalized nature of our <strong className="text-white">card repair and restoration services</strong>, refunds are not available once work has been completed. This includes services such as crease reduction, scratch elimination, and pre-grading inspections. However, in certain cases, <strong className="text-white">store credit may be issued at our discretion</strong> if the outcome does not meet reasonable expectations. Please contact us to discuss any concerns related to your repair service.
                  </p>
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}