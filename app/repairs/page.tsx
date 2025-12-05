import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Form from '@/components/Form';
import { RepairRequest } from '@/types/shopify';
import { FaInstagram } from 'react-icons/fa';

export default function RepairsPage() {
  const handleSubmit = async (data: RepairRequest) => {
    'use server';
    
    try {
      const response = await fetch('/api/repairs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit repair request');
      }

      // Redirect to success page
      window.location.href = '/repairs/success';
    } catch (error) {
      console.error('Error submitting repair request:', error);
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
            alt="Card Repair Background"
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
            <span className="text-white">Repairs</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Card Repair Services</h1>
          <p className="text-base md:text-lg text-gray-400 mt-2">Professional trading card restoration and repair services</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-6 sm:py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Services Overview */}
        <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl lg:text-3xl text-center font-bold text-white mb-8">Our Expert Services</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Card Evaluation Section */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-xl border border-gray-700/50 p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gray-700/30 border border-gray-600/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Card Evaluation</h3>
              </div>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="leading-relaxed">
                    All cards under evaluation are subjected to a minimum of <span className="font-semibold text-white">12x magnification</span> 
                    with up to <span className="font-semibold text-white">2000x magnification imaging</span> available after October 2025.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="leading-relaxed">
                    Centering and flaws will be documented and a full custom report will be 
                    available for $5 starting in 2026.
                  </p>
                </div>
                <div className="bg-gray-800/40 border border-gray-700/50 rounded-lg p-4 mt-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm mb-1">Current Rate</p>
                      <p className="text-white font-bold text-lg sm:text-xl">$1 per card</p>
                    </div>
                    <p className="text-gray-500 text-xs sm:text-sm font-medium">Through 2025</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card Repair Pricing Section */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gray-700/30 border border-gray-600/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Card Repair Pricing</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-4 sm:p-5 hover:border-gray-600/70 transition-all duration-300">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-white font-bold text-base sm:text-lg mb-1">In-House Services</p>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Simple card cleaning, grading prep, scratch reduction</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-700/50">
                    <p className="text-red-400 font-bold text-xl sm:text-2xl">$15 <span className="text-sm font-normal text-gray-300">per card</span></p>
                  </div>
                </div>
                
                <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-4 sm:p-5 hover:border-gray-600/70 transition-all duration-300">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-white font-bold text-base sm:text-lg mb-1">Severe Card Repair</p>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-2">Sent out for professional repair</p>
                      <p className="text-gray-500 text-xs italic">1-2 weeks turnaround (depending on severity and value)</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-700/50">
                    <p className="text-red-400 font-bold text-xl sm:text-2xl">$25 <span className="text-sm font-normal text-gray-300">per card</span></p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">+ Insured shipping (optional)</p>
                  </div>
                </div>
                
                <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-4 sm:p-5 hover:border-gray-600/70 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-white font-bold text-base sm:text-lg mb-3">Rush Services</p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-gray-700/50">
                          <p className="text-gray-400 text-sm font-medium">Faster</p>
                          <p className="text-red-400 font-bold text-lg">$85</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-400 text-sm font-medium">Fastest</p>
                          <p className="text-red-400 font-bold text-lg">$175</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-8 text-center">
            Our Repair Process
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-red-400 font-bold text-lg sm:text-xl">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Submit Request</h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base px-2">
                Fill out our repair request form with detailed photos and card information
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-red-400 font-bold text-lg sm:text-xl">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Professional Evaluation</h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base px-2">
                Our experts examine your card with high-magnification equipment and provide a detailed quote
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-red-400 font-bold text-lg sm:text-xl">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Expert Repair</h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base px-2">
                Skilled restoration work using proven techniques to improve card condition
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-red-400 font-bold text-lg sm:text-xl">4</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Quality Inspection</h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base px-2">
                Final inspection and documentation of the restoration work completed
              </p>
            </div>
          </div>
        </div>

        {/* Common Repairs Section */}
        <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 md:mb-8">Common Card Repairs</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="border border-gray-800 rounded-lg p-4">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Corner Damage</h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base px-2">Repair of bent, creased, or damaged corners</p>
            </div>
            <div className="border border-gray-800 rounded-lg p-4">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Edge Wear</h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base px-2">Restoration of worn or damaged card edges</p>
            </div>
            <div className="border border-gray-800 rounded-lg p-4">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Surface Scratches</h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base px-2">Removal of surface scratches and scuffs</p>
            </div>
            <div className="border border-gray-800 rounded-lg p-4">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Centering Issues</h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base px-2">Correction of off-center printing when possible</p>
            </div>
            <div className="border border-gray-800 rounded-lg p-4">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Stains & Marks</h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base px-2">Removal of stains, pen marks, and discoloration</p>
            </div>
            <div className="border border-gray-800 rounded-lg p-4 sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Creasing</h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base px-2">Repair of creases and fold lines</p>
            </div>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-red-500/30 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Important Information
          </h2>
          <div className="space-y-3 text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              Please note that <span className="font-semibold text-white">not all card repairs are fixable</span>. 
              Certain types of damage, such as whitening, cannot be repaired with our current methods.
            </p>
            <p>
              Our repair techniques have been extensively tested and have successfully passed authentication 
              by PSA and Beckett without being flagged as altered. However, <span className="font-semibold text-white">
              we cannot guarantee that these methods will continue to pass future authentication standards</span>, 
              as grading companies may update their detection methods over time.
            </p>
            <p className="text-red-300 italic">
              We recommend discussing your specific card and repair needs with our team to determine the 
              best course of action for your collectible.
            </p>
          </div>
        </div>

        {/* Repair Request Form */}
        <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Request a Repair Quote</h2>
          <p className="text-gray-400 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
            Please provide detailed information about your card and the damage that needs repair. 
            Include clear photos from multiple angles to help us provide the most accurate quote and timeline.
          </p>
          
          <Form onSubmit={handleSubmit} />
        </div>

        {/* Contact Information */}
        <div className="text-center bg-[#0e0f11] border border-gray-800 rounded-xl p-4 sm:p-6 md:p-8">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Questions About Card Repair Services?
          </h3>
          <p className="text-base sm:text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto px-4">
            Our team is here to help! Contact us for more information about our card repair and evaluation services.
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

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-blue-200 text-xs sm:text-sm px-4">
            <a
              href="https://www.facebook.com/p/VendiCards-61577324265476/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-red-400 transition-colors"
            >
              <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook: VendiCards</span>
            </a>
            <a
              href="https://www.instagram.com/vendicards/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-red-400 transition-colors"
            >
              <FaInstagram className="w-3 sm:w-4 h-3 sm:h-4" />
              <span>Instagram: @vendicards</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}