import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0e0f11]">
      {/* Header with Image */}
      <div className="relative bg-[#0e0f11] shadow-sm border-b border-gray-800 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/background-1.png"
            alt="Terms of Service Background"
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
            <span className="text-gray-200">Terms of Service</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Terms of Service</h1>
          <p className="text-base md:text-lg text-gray-400 mt-2">Terms and conditions for using our services</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 p-6 sm:p-8 md:p-10">
          <div className="space-y-8">
            <div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                By using our website and purchasing from us, you agree to the following Terms & Conditions. Please read them carefully to understand your rights and responsibilities when shopping with us.
              </p>
            </div>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Pricing & Market Fluctuations</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  The market for trading cards can change rapidly. While we do our best to keep prices up to date, as a small team it can be difficult to reflect every market shift in real time.
                </p>
                <p>
                  If you notice that a product's market price has changed, please contact us before purchasing. We will gladly review and honor any reasonable comps where possible.
                </p>
                <p>
                  There may be rare occasions when a card's market value has significantly increased after it was listed. In such cases, VendiCards reserves the right to contact the buyer and request an updated payment reflecting current fair market value before completing the order.
                </p>
                <p>
                  Our goal is always to offer fair pricing and a great experience for our customers — your understanding is appreciated!
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Sales & Use</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We ship domestically and internationally. If you are outside the U.S., please contact us to arrange shipping.
                </p>
                <p>
                  There are no age restrictions for purchasing from VendiCards.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Payments</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We accept PayPal, major credit cards, and (upon request) Venmo, CashApp, or local pickup in Fond du Lac, Wisconsin.
                </p>
                <p>
                  Applicable sales tax will be charged where required by law.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Shipping</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We ship securely in bubble mailers or boxes depending on the product.
                </p>
                <p>
                  Tracking is provided with every order.
                </p>
                <p>
                  We are not responsible for loss or damage that occurs during transit; please contact the carrier if a package is lost or arrives damaged.
                </p>
                <p>
                  Most orders are processed and shipped within 1–3 business days.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Returns & Refunds</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Refunds are accepted for graded and raw cards if the item does not match the description. Please contact us within 7 days of receiving your order to initiate a return.
                </p>
                <p>
                  Sealed products are final sale and non-refundable.
                </p>
                <p>
                  Card repair services are non-refundable. In some cases, store credit may be offered at our discretion.
                </p>
                <p>
                  Merchandise (e.g. apparel) can be exchanged if sizing does not fit; items must be returned in new, unworn condition.
                </p>
                <p>
                  Refunds, when issued, will be made to the original payment method or as store credit, depending on circumstances.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Intellectual Property</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  All content on this website — including logos, text, product images, and graphics — is the property of VendiCards and may not be used without prior written consent.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Liability</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We are not responsible for grading decisions made by third-party companies (such as PSA, BGS, CGC, etc.).
                </p>
                <p>
                  While our card repair products and services have been tested and used successfully through both PSA and BGS several times with no issues, we cannot guarantee future acceptance or results.
                </p>
                <p>
                  Card conditioning is inherently subjective. While we strive for accuracy and high standards, minor differences in opinion may exist regarding raw card condition. We are human; please contact us with any questions or concerns.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Miscellaneous</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We reserve the right to cancel orders at our discretion (for reasons such as suspected fraud, pricing errors, or stock issues).
                </p>
                <p>
                  We reserve the right to update these Terms & Conditions at any time. Updates will be posted on this page.
                </p>
                <p>
                  If you have any questions or concerns about these Terms & Conditions, or about any order, please don't hesitate to contact us — we're here to help and want you to have the best possible experience with VendiCards.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

