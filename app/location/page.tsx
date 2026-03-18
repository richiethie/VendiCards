'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-[#0e0f11]">
      {/* Header with Image */}
      <div className="relative bg-[#0e0f11] shadow-sm border-b border-gray-800 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/background-1.png"
            alt="Location Background"
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
            <span className="text-gray-200">Location</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Visit Us</h1>
          <p className="text-base md:text-lg text-gray-400 mt-2">Find us at our Fond du Lac location</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Left Column - Address & Info */}
          <div className="space-y-6 sm:space-y-8">
            {/* Address Card */}
            <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-red-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Location</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-300 text-lg sm:text-xl leading-relaxed font-medium">
                    74 South Main Street, Suite 106
                  </p>
                  <p className="text-gray-300 text-lg sm:text-xl leading-relaxed font-medium">
                    Fond du Lac, WI 54935
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-800">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=74+South+Main+Street+Suite+106+Fond+du+Lac+WI+54935"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-medium transition-colors"
                  >
                    <Navigation className="w-5 h-5" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Phone</h4>
                    <a href="tel:+19205396222" className="text-red-400 hover:text-red-300 font-medium text-sm sm:text-base">
                      (920) 539-6222
                    </a>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">Call or text for fastest response</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Email</h4>
                    <a href="mailto:vendicards@gmail.com" className="text-red-400 hover:text-red-300 font-medium text-sm sm:text-base">
                      vendicards@gmail.com
                    </a>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">We typically respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Availability</h4>
                    <p className="text-gray-300 text-sm sm:text-base">Hours are M-F 11am-7pm or by appointment</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">Please call ahead to schedule an appointment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Visit Us</h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                We're located in the heart of Fond du Lac. Whether you're dropping off cards for repair, 
                picking up an order, or just want to see our collection in person, we'd love to see you!
              </p>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base mt-4">
                Please call ahead to schedule a visit or confirm we're available. We also offer nationwide 
                shipping for all our products and services.
              </p>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 overflow-hidden">
              <div className="aspect-square sm:aspect-video lg:aspect-square relative bg-gray-900">
                <iframe
                  src="https://www.google.com/maps?q=74+South+Main+Street+Suite+106+Fond+du+Lac+WI+54935&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
              <div className="p-4 sm:p-6 bg-gray-900/50 backdrop-blur-sm">
                <p className="text-gray-300 text-sm">
                  <strong className="text-white">74 South Main Street, Suite 106</strong><br />
                  Fond du Lac, WI 54935
                </p>
              </div>
            </div>

            {/* Parking & Accessibility */}
            <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Parking & Accessibility</h3>
              <div className="space-y-3 text-gray-300 text-sm sm:text-base">
                <p className="leading-relaxed">
                  Street parking is available along South Main Street. Please check posted parking regulations 
                  and time limits.
                </p>
                <p className="leading-relaxed">
                  Our location is accessible and we're happy to accommodate any special needs. 
                  Please let us know if you require any assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

