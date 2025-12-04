'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Navigation, HelpCircle, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { ShopifyProduct } from '@/types/shopify';

export default function GrandOpeningPage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('/api/featured?limit=4');
        const data = await response.json();
        
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0f11]">
      {/* Header with Image */}
      <div className="relative bg-[#0e0f11] shadow-sm border-b border-gray-800 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/background-1.png"
            alt="Grand Opening Background"
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
            <span className="text-gray-200">Grand Opening</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-red-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-red-500/30 mb-4">
            <Sparkles className="w-4 h-4 text-red-400" />
            <span className="text-sm font-semibold text-red-400 uppercase tracking-wide">
              Grand Opening
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Welcome to <span className="text-red-500">VendiCards</span>
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl">
            We're excited to announce our grand opening! Visit us at our new location in Fond du Lac, Wisconsin.
          </p>
        </div>
      </div>

      {/* Location Details Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
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
                    <p className="text-gray-300 text-sm sm:text-base font-medium">Hours are M-F 3-8pm or by appointment</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">Please call ahead to schedule an appointment</p>
                  </div>
                </div>
              </div>
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
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-[#0e0f11] relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-red-500/30 mb-4">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span className="text-sm font-semibold text-red-400 uppercase tracking-wide">
                Featured
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Featured <span className="text-red-500">Products</span>
            </h2>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Check out some of our featured items
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-gray-800 rounded-xl p-4 animate-pulse"
                >
                  <div className="aspect-square bg-gray-800 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-800 rounded mb-2"></div>
                  <div className="h-4 bg-gray-800 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              {/* Product Grid - Desktop */}
              <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Product Carousel - Mobile */}
              <div className="sm:hidden relative mb-10 overflow-hidden">
                <div
                  className="flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide px-1"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {products.map((product) => (
                    <div key={product.id} className="snap-start flex-shrink-0 w-[280px]">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}

          {/* Shop All Button */}
          <div className="text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-red-600/50 group"
            >
              Shop All Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
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
                  Our store is open Monday to Friday from 9am to 5pm and closed on the weekend. However, we are always monitoring the site, reach out whenever and we will get back to you ASAP!
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

