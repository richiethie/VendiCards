'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Calendar, Clock, MapPin, Facebook, ShoppingBag, DollarSign, RefreshCw, Navigation, ExternalLink, Ticket, Car } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';

export default function FondyCardShowPage() {
  // Map links
  const locationAddress = 'Radisson Hotel Conference Center Fond du Lac WI';
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locationAddress)}`;
  const appleMapsUrl = `https://maps.apple.com/?daddr=${encodeURIComponent(locationAddress)}`;
  const googleMapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(locationAddress)}&output=embed`;
  const vendorInquiryUrl = 'https://app.joinshowup.io/apply/the-fondy-card-show-hosted-by-vendicards';

  // Structured Data for SEO (Event Schema)
  const eventStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Fondy Card Show',
    description: 'Trading card show with 60+ tables of Pokemon, sports cards, TCGs, and collectibles. Free admission and parking. Buy, sell, and trade cards.',
    startDate: '2026-03-15T09:00:00-06:00',
    endDate: '2026-03-15T16:00:00-06:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Radisson Hotel & Conference Center',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Fond du Lac',
        addressRegion: 'WI',
        addressCountry: 'US',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'VendiCards',
      url: 'https://vendicards.com',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://vendicards.com/fondy-card-show',
    },
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }}
      />
      <div className="min-h-screen bg-[#0e0f11]">
      {/* Header with Image */}
      <div className="relative bg-[#0e0f11] shadow-sm border-b border-gray-800 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/background-1.png"
            alt="Fondy Card Show Background"
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
            <span className="text-gray-200">Fondy Card Show</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-red-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-red-500/30 mb-4">
            <Sparkles className="w-4 h-4 text-red-400" />
            <span className="text-sm font-semibold text-red-400 uppercase tracking-wide">
              Card Show
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Fondy Card Show
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl">
            Hosted by VendiCards - Join us for an amazing day of trading cards and collectibles!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Top Section: Event Details & Poster */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12 items-stretch">
          {/* Left Column - Event Information (3 columns on large screens) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Date & Time */}
            <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-7 h-7 text-red-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Date & Time</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-lg font-semibold">Sunday, March 15th</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-lg font-semibold">9AM – 4PM</p>
                    <p className="text-gray-400 text-sm">Vendor Setup: 8AM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Free Admission & Parking & What to Expect */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Free Admission & Parking */}
              <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-xl shadow-lg border-2 border-red-500/30 p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Free Admission & Parking</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-500/20 border-2 border-red-500/40 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Ticket className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Free Admission</h3>
                      <p className="text-gray-300 text-sm">No entry fee required</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-500/20 border-2 border-red-500/40 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Car className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Free Parking</h3>
                      <p className="text-gray-300 text-sm">Complimentary parking available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">What to Expect</h2>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
                  <p className="text-white text-lg font-bold text-center">
                    60+ TABLES
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-300 mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {['POKEMON', 'SPORTS', 'TCGS', 'COLLECTIBLES'].map((item) => (
                      <span
                        key={item}
                        className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-gray-300 text-xs font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Poster Image (2 columns on large screens) */}
          <div className="lg:col-span-2 flex">
            <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 overflow-hidden w-full relative flex-1">
              <Image
                src="/images/fondy-card-show.png"
                alt="Fondy Card Show Event Poster - Sunday March 15th, 2026 at Radisson Hotel Fond du Lac - Trading Cards & Collectibles"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Vendor Inquiries - Full Width */}
        <div className="mb-12">
          <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 p-8 sm:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Vendor Inquiries</h2>
              <p className="text-gray-400 mb-6 text-lg">
                Interested in being a vendor at the Fondy Card Show? Apply through our application system.
              </p>
              <a
                href={vendorInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors text-center"
              >
                <ExternalLink className="w-5 h-5" />
                Apply to be a Vendor
              </a>
            </div>
          </div>
        </div>

        {/* Location, Follow Us & Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Follow Us & Location (stacked vertically) */}
          <div className="space-y-6">
            {/* Follow Us */}
            <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Follow Us</h2>
              <p className="text-gray-400 mb-4">Stay updated on Facebook & Instagram:</p>
              <div className="space-y-3">
                <a
                  href="https://www.facebook.com/p/VendiCards-61577324265476/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:border-blue-500/50 transition-colors group"
                >
                  <Facebook className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
                  <div>
                    <p className="font-semibold text-white">VENDICARDS</p>
                    <p className="text-sm text-gray-400">Facebook</p>
                  </div>
                </a>
                <a
                  href="https://www.instagram.com/vendicards/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:border-pink-500/50 transition-colors group"
                >
                  <FaInstagram className="w-6 h-6 text-pink-400 group-hover:text-pink-300" />
                  <div>
                    <p className="font-semibold text-white">VENDICARDS</p>
                    <p className="text-sm text-gray-400">Instagram</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-red-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Location</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-300 text-lg leading-relaxed font-medium">
                  Radisson Hotel & Conference Center – Fond du Lac
                </p>
                
                <div className="pt-4 border-t border-gray-800 space-y-3">
                  <p className="text-sm text-gray-400">Get directions:</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      <Navigation className="w-5 h-5" />
                      Google Maps
                    </a>
                    <a
                      href={appleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                    >
                      <Navigation className="w-5 h-5" />
                      Apple Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Embedded Map */}
          <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 overflow-hidden">
            <div className="aspect-square sm:aspect-video lg:aspect-square relative bg-gray-900">
              <iframe
                src={googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
            <div className="p-4 sm:p-6 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
              <p className="text-gray-300 text-sm">
                <strong className="text-white">Radisson Hotel & Conference Center</strong><br />
                Fond du Lac, WI
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
