import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-[#0e0f11]">
      {/* Header with Image */}
      <div className="relative bg-[#0e0f11] shadow-sm border-b border-gray-800 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/background-1.png"
            alt="Returns & Refunds Background"
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
            <span className="text-gray-200">Returns & Refunds</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Returns & Refunds</h1>
          <p className="text-base md:text-lg text-gray-400 mt-2">Our return and refund policy</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 p-6 sm:p-8 md:p-10">
          <div className="space-y-8">
            <div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                At VendiCards, we want you to be completely satisfied with your purchase. Please review our returns and refunds policy below.
              </p>
            </div>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Return Policy</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong className="text-white">Graded and Raw Cards:</strong> Refunds are accepted for graded and raw cards if the item does not match the description. Please contact us within 7 days of receiving your order to initiate a return.
                </p>
                <p>
                  <strong className="text-white">Sealed Products:</strong> Sealed products are final sale and non-refundable.
                </p>
                <p>
                  <strong className="text-white">Card Repair Services:</strong> Card repair services are non-refundable. In some cases, store credit may be offered at our discretion.
                </p>
                <p>
                  <strong className="text-white">Merchandise (e.g. apparel):</strong> Merchandise can be exchanged if sizing does not fit; items must be returned in new, unworn condition.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Refund Process</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Refunds, when issued, will be made to the original payment method or as store credit, depending on circumstances.
                </p>
                <p>
                  Processing time for refunds typically takes 5-10 business days after we receive and inspect the returned item.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">How to Initiate a Return</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-400 text-sm font-bold">1</span>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    <strong className="text-white">Contact Us:</strong> Reach out to us within 7 days of receiving your order via email at <a href="mailto:vendicards@gmail.com" className="text-red-400 hover:text-red-300">vendicards@gmail.com</a> or call us at <a href="tel:+19205396222" className="text-red-400 hover:text-red-300">(920) 539-6222</a>.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-400 text-sm font-bold">2</span>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    <strong className="text-white">Provide Details:</strong> Include your order number, reason for return, and photos if applicable (especially for items that don't match description).
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-400 text-sm font-bold">3</span>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    <strong className="text-white">Return Instructions:</strong> We'll provide you with return shipping instructions and a return authorization number if approved.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-400 text-sm font-bold">4</span>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    <strong className="text-white">Ship Back:</strong> Package the item securely and ship it back using the provided instructions. We recommend using tracking and insurance for valuable items.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Return Conditions</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Items must be returned in their original condition, including all original packaging, accessories, and documentation (for graded cards, this includes the grading case and label).
                </p>
                <p>
                  Items that have been damaged, altered, or used may not be eligible for return or refund.
                </p>
                <p>
                  Return shipping costs are typically the responsibility of the customer unless the return is due to our error (wrong item, damaged item, etc.).
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Questions or Concerns?</h2>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 sm:p-6">
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                  If you have any questions about our returns and refunds policy, or need assistance with a return, please don't hesitate to contact us. We're here to help ensure you have a positive experience with VendiCards.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="mailto:vendicards@gmail.com"
                    className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Us
                  </a>
                  <a
                    href="tel:+19205396222"
                    className="inline-flex items-center justify-center px-4 py-2 border-2 border-gray-700 text-white rounded-lg hover:bg-white/10 transition-colors text-sm sm:text-base"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call (920) 539-6222
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

