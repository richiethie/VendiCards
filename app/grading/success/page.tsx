import React from 'react';
import Link from 'next/link';

export default function GradingSuccessPage() {
  return (
    <div className="min-h-screen bg-[#0e0f11] flex items-center justify-center py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-white mb-4">
          Grading Request Submitted!
        </h1>
        
        <p className="text-xl text-gray-400 mb-8">
          Thank you for submitting your grading request. We've received your submission and will review it shortly.
        </p>

        {/* What Happens Next */}
        <div className="bg-[#0e0f11] border border-gray-800 rounded-lg shadow-sm p-8 mb-8 text-left">
          <h2 className="text-xl font-semibold text-white mb-4">
            What Happens Next?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-red-400 text-sm font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Review & Confirmation</h3>
                <p className="text-gray-400 text-sm">
                  Our expert team will review your grading request and assess the card details you provided.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-6 h-6 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-red-400 text-sm font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Contact & Next Steps</h3>
                <p className="text-gray-400 text-sm">
                  You'll receive a call or email within 24-48 hours to confirm details and arrange card drop-off or shipping.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-6 h-6 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-red-400 text-sm font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Grading Process</h3>
                <p className="text-gray-400 text-sm">
                  Once we receive your card, we'll send it to PSA for professional grading based on your selected tier.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-6 h-6 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-red-400 text-sm font-bold">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Card Return</h3>
                <p className="text-gray-400 text-sm">
                  Once graded, your card will be securely returned to you with the PSA grade and certification.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/grading"
            className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Submit Another Request
          </Link>
          
          <a
            href="tel:+19205396222"
            className="inline-flex items-center justify-center px-4 py-2 border border-red-600 text-red-400 rounded-md hover:bg-white/5 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Us
          </a>
          
          <a
            href="mailto:vendicards@gmail.com"
            className="inline-flex items-center justify-center px-4 py-2 border border-red-600 text-red-400 rounded-md hover:bg-white/5 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Us
          </a>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Our team is here to help! Feel free to contact us with any questions about your grading request.
          </p>
        </div>
      </div>
    </div>
  );
}

