import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0e0f11]">
      {/* Header with Image */}
      <div className="relative bg-[#0e0f11] shadow-sm border-b border-gray-800 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/background-1.png"
            alt="Privacy Policy Background"
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
            <span className="text-gray-200">Privacy Policy</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Privacy Policy</h1>
          <p className="text-base md:text-lg text-gray-400 mt-2">How we collect, use, and protect your information</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="bg-[#0e0f11] rounded-xl shadow-lg border border-gray-800 p-6 sm:p-8 md:p-10">
          <div className="space-y-8">
            <div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                At VendiCards, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, make a purchase, or use our services.
              </p>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                <strong className="text-white">Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong className="text-white">Personal Information:</strong> When you make a purchase, request a service, or contact us, we may collect:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name and contact information (email address, phone number, mailing address)</li>
                  <li>Payment information (processed securely through third-party payment processors)</li>
                  <li>Order history and transaction details</li>
                  <li>Card descriptions and condition notes (for evaluations and grading prep)</li>
                  <li>Communication preferences</li>
                </ul>
                <p className="mt-4">
                  <strong className="text-white">Automatically Collected Information:</strong> When you visit our website, we may automatically collect certain information about your device, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>IP address and browser type</li>
                  <li>Pages you visit and time spent on pages</li>
                  <li>Referring website addresses</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Process and fulfill your orders and service requests</li>
                  <li>Communicate with you about your orders, services, and inquiries</li>
                  <li>Send you updates about your evaluation or grading requests</li>
                  <li>Respond to your questions and provide customer support</li>
                  <li>Improve our website, products, and services</li>
                  <li>Send you marketing communications (only if you have opted in)</li>
                  <li>Comply with legal obligations and prevent fraud</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Information Sharing and Disclosure</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We do not sell, rent, or trade your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Service Providers:</strong> We may share information with trusted service providers who assist us in operating our website, processing payments, shipping orders, or providing customer service (e.g., payment processors, shipping carriers, email service providers)</li>
                  <li><strong className="text-white">Legal Requirements:</strong> We may disclose information if required by law or in response to valid requests by public authorities</li>
                  <li><strong className="text-white">Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction</li>
                  <li><strong className="text-white">With Your Consent:</strong> We may share your information with your explicit consent</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Data Security</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
                <p>
                  Payment information is processed securely through third-party payment processors (PayPal, credit card processors) and is not stored on our servers.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Your Rights and Choices</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Access:</strong> Request access to the personal information we hold about you</li>
                  <li><strong className="text-white">Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong className="text-white">Deletion:</strong> Request deletion of your personal information (subject to legal and business requirements)</li>
                  <li><strong className="text-white">Opt-Out:</strong> Unsubscribe from marketing communications at any time by clicking the unsubscribe link in our emails or contacting us directly</li>
                  <li><strong className="text-white">Data Portability:</strong> Request a copy of your data in a structured, machine-readable format</li>
                </ul>
                <p className="mt-4">
                  To exercise any of these rights, please contact us at <a href="mailto:vendicards@gmail.com" className="text-red-400 hover:text-red-300">vendicards@gmail.com</a> or call us at <a href="tel:+19205396222" className="text-red-400 hover:text-red-300">(920) 539-6222</a>.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Cookies and Tracking Technologies</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device that help us:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Improve website functionality and performance</li>
                </ul>
                <p className="mt-4">
                  You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our website.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Children's Privacy</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately so we can delete that information.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Data Retention</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Third-Party Links</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Our website may contain links to third-party websites (such as Facebook, Instagram, WhatNot, etc.). We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Changes to This Privacy Policy</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
                <p>
                  Your continued use of our website and services after any changes indicates your acceptance of the updated Privacy Policy.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Contact Us</h2>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 sm:p-6">
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-3 text-gray-300 text-sm sm:text-base">
                  <p>
                    <strong className="text-white">Email:</strong> <a href="mailto:vendicards@gmail.com" className="text-red-400 hover:text-red-300">vendicards@gmail.com</a>
                  </p>
                  <p>
                    <strong className="text-white">Phone:</strong> <a href="tel:+19205396222" className="text-red-400 hover:text-red-300">(920) 539-6222</a>
                  </p>
                  <p>
                    <strong className="text-white">Address:</strong> 74 South Main Street, Suite 106, Fond du Lac, WI 54935
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

