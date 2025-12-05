'use client';

import React from 'react';
import { Truck, Shield, Headphones } from 'lucide-react';

const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $100',
    },
    {
      icon: Headphones,
      title: 'Customer Service',
      description: 'Available Monday to Friday to answer your questions',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Your payment information is encrypted and securely processed',
    },
  ];

  return (
    <section className="py-16 bg-black border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-all duration-300">
                  <Icon className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {badge.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;

