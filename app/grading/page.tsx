'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GradingForm, { GradingRequest } from '@/components/GradingForm';

export default function GradingPage() {
  const handleSubmit = async (data: GradingRequest) => {
    try {
      const response = await fetch('/api/grading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit grading request');
      }

      // Redirect to success page
      window.location.href = '/grading/success';
    } catch (error) {
      console.error('Error submitting grading request:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0f11]">
      {/* Header with Image */}
      <div className="relative bg-[#0e0f11] shadow-sm border-b border-gray-800 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/images/background-1.png"
            alt="Grading Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0f11] via-[#0e0f11]/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Grading</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Grading</h1>
          <p className="text-base md:text-lg text-gray-400 mt-2">Professional card grading services</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-6 sm:py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Services Overview */}
        <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl lg:text-3xl text-center font-bold text-white mb-8">Grading Service</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Pricing Information */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-xl border border-gray-700/50 p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gray-700/30 border border-gray-600/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Pricing</h3>
              </div>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base">
                <div className="bg-gray-800/40 border border-gray-700/50 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm mb-1">Flat Rate</p>
                      <p className="text-white font-bold text-lg sm:text-xl">$25 per card</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm mt-3 pt-3 border-t border-gray-700/50">
                    Includes shipping and handling
                  </p>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-4">
                  <p className="text-red-300 text-xs sm:text-sm leading-relaxed">
                    <strong className="text-red-200">Important:</strong> PSA may apply additional upcharges based on the card's market value. We'll notify you of any additional fees before processing.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Service Information */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gray-700/30 border border-gray-600/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">How It Works</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    Submit your grading request with card details and preferred tier level
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    We'll contact you to confirm details and arrange card drop-off or shipping
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    Cards are sent to PSA for professional grading
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    Once graded, cards are returned to you securely
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grading Request Form */}
        <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Request Grading Service</h2>
          <p className="text-gray-400 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
            Please provide detailed information about your card and select your preferred grading tier. 
            Include any notes about the card's condition (swirls, whitening, etc.) to help us provide the best service.
          </p>
          
          <GradingForm onSubmit={handleSubmit} />
        </div>

        {/* Contact Information */}
        <div className="text-center bg-[#0e0f11] border border-gray-800 rounded-xl p-4 sm:p-6 md:p-8">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Questions About Grading Services?
          </h3>
          <p className="text-base sm:text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto px-4">
            Our team is here to help! Contact us for more information about our grading services and pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
            <a
              href="tel:+19205396222"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call (920) 539-6222
            </a>
            <a
              href="mailto:vendicards@gmail.com"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-700 text-white rounded-lg hover:bg-white/10 transition-colors font-semibold text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

