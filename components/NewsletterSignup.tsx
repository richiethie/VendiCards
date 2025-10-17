'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    // Simulate API call - replace with actual newsletter API
    setTimeout(() => {
      setStatus('success');
      setMessage('Thanks for subscribing!');
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }, 1000);
  };

  return (
    <section className="py-16 bg-[#0e0f11] border-t border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mb-6">
            <Mail className="w-8 h-8 text-red-400" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sign Up for Exclusive Deals
          </h2>
          
          <p className="text-lg text-gray-400 mb-8">
            Be the first to know about new arrivals, special offers, and more!
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 px-6 py-4 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            
            {/* Status Messages */}
            {status === 'success' && (
              <div className="mt-4 flex items-center justify-center gap-2 text-emerald-400">
                <CheckCircle className="w-5 h-5" />
                <p className="text-sm font-medium">{message}</p>
              </div>
            )}
            
            {status === 'error' && (
              <div className="mt-4 flex items-center justify-center gap-2 text-red-400">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm font-medium">{message}</p>
              </div>
            )}
          </form>

          <p className="mt-4 text-xs text-gray-500">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;

