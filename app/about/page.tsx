'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0e0f11]">
      {/* Header with Image */}
      <div className="relative bg-[#0e0f11] shadow-sm border-b border-gray-800 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/background-1.png"
            alt="About Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0f11] via-[#0e0f11]/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
            <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-100">About</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-100">About VendiCards</h1>
          <p className="text-base md:text-lg text-gray-400 mt-2">Learn more about our story and mission</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 p-4 sm:p-6 md:p-8">
          {/* Tagline */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-primary-900/20 text-primary-400 text-xs sm:text-sm md:text-base font-medium rounded-full mb-4 sm:mb-6 border border-primary-800 max-w-full">
              <div className="w-2 h-2 bg-primary-500 rounded-full mr-2 flex-shrink-0"></div>
              <span className="text-center leading-tight">
                From sealed product and raw cards to graded gems — Catch 'em All!
              </span>
            </div>
          </div>

          {/* Our Story */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-100 mb-4 sm:mb-6 text-left">Our Story</h2>
            <div className="space-y-4 sm:space-y-6 text-gray-400">
              <p className="leading-relaxed text-sm sm:text-base text-left">
                VendiCards was founded with a passion for the Pokémon Trading Card Game and a commitment to 
                serving the collector community. What started as a love for the hobby has grown into a 
                comprehensive destination for collectors, offering everything from sealed products and raw cards 
                to graded gems, custom merchandise, and professional card services.
              </p>

              <p className="leading-relaxed text-sm sm:text-base text-left">
                Our mission is simple: to provide collectors with high-quality products, expert services, and 
                exceptional customer experiences. We understand the thrill of opening a pack, the joy of finding 
                that perfect card for your collection, and the importance of preserving these treasures for years to come.
              </p>

              <p className="leading-relaxed text-sm sm:text-base text-left">
                At VendiCards, we specialize in card repair and restoration services, including crease reduction, 
                scratch elimination, and pre-grading inspections to ensure your cards look as good as possible. 
                Our expert team has years of experience working with Pokémon cards and understands the nuances 
                of proper restoration techniques that preserve both value and authenticity.
              </p>

              <p className="leading-relaxed text-sm sm:text-base font-semibold text-gray-300 text-left">
                Whether you're looking to buy, sell, or restore your cards, VendiCards has everything you need 
                to build and maintain your collection. We're here to help you catch 'em all!
              </p>
            </div>
          </section>

          {/* Mission & Values */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-100 mb-4 sm:mb-6 text-left">Our Mission & Values</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-primary-900/20 border border-primary-800 rounded-xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-primary-300 mb-3 sm:mb-4 text-left">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base text-left">
                  To serve the collecting community with integrity, authenticity, and excellence while 
                  providing the highest quality products and professional card services to help collectors 
                  build and preserve their treasured collections.
                </p>
              </div>
              <div className="bg-green-900/20 border border-green-800 rounded-xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-green-300 mb-3 sm:mb-4 text-left">Our Vision</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base text-left">
                  To be a trusted leader in the Pokémon card community, known for professional restoration 
                  services, authentic products, and exceptional customer service that exceeds expectations.
                </p>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-100 mb-4 sm:mb-6 text-left">Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-left sm:text-center">
                <div className="flex items-start space-x-3 sm:flex-col sm:space-x-0 sm:space-y-3 sm:items-center">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-primary-900/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 sm:text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-2 text-left sm:text-center">Authenticity</h3>
                    <p className="text-gray-400 leading-relaxed text-sm md:px-2 text-left sm:text-center">
                      Every card is carefully verified and guaranteed authentic. We stand behind our products completely.
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-left sm:text-center">
                <div className="flex items-start space-x-3 sm:flex-col sm:space-x-0 sm:space-y-3 sm:items-center">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-green-900/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 sm:text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-2 text-left sm:text-center">Quality</h3>
                    <p className="text-gray-400 leading-relaxed text-sm md:px-2 text-left sm:text-center">
                      We maintain the highest standards in our products and services, ensuring customer satisfaction.
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-left sm:text-center">
                <div className="flex items-start space-x-3 sm:flex-col sm:space-x-0 sm:space-y-3 sm:items-center">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-yellow-900/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="flex-1 sm:text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-2 text-left sm:text-center">Trust</h3>
                    <p className="text-gray-400 leading-relaxed text-sm md:px-2 text-left sm:text-center">
                      Built on transparency and honest business practices that have earned the trust of collectors nationwide.
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-left sm:text-center">
                <div className="flex items-start space-x-3 sm:flex-col sm:space-x-0 sm:space-y-3 sm:items-center">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-purple-900/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 sm:text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-2 text-left sm:text-center">Community</h3>
                    <p className="text-gray-400 leading-relaxed text-sm md:px-2 text-left sm:text-center">
                      Supporting and building relationships within the Pokémon collecting community worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Overview */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-100 mb-4 sm:mb-6 text-left">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 sm:p-6">
                <div className="w-12 h-12 bg-primary-900/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-100 mb-3">Premium Products</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Sealed products, raw cards, graded gems, custom merchandise, and accessories for all your collecting needs.
                </p>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 sm:p-6">
                <div className="w-12 h-12 bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-100 mb-3">Card Repair & Restoration</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Expert restoration services including crease reduction, scratch elimination, and pre-grading preparation.
                </p>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 sm:p-6 md:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-100 mb-3">Expert Support</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Personalized guidance from experienced collectors to help you make informed decisions about your collection.
                </p>
              </div>
            </div>
          </section>

          {/* Closing Statement */}
          <section className="text-center">
            <div className="bg-primary-900/10 border border-primary-800 rounded-xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4">Ready to Start Your Journey?</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Thank you for choosing VendiCards as your trusted partner in collecting. We're excited to help you 
                build the collection of your dreams and preserve your most treasured cards for years to come.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/shop"
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Browse Products
                </Link>
                <Link
                  href="/repairs"
                  className="border border-primary-600 text-primary-400 px-6 py-3 rounded-lg font-semibold hover:bg-primary-900/20 transition-colors"
                >
                  Card Repair Services
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}