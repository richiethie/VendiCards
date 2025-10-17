'use client';

import React from 'react';
import { Package, Truck } from 'lucide-react';

const AnnouncementBanner: React.FC = () => {
  return (
    <div className="bg-red-600 text-white overflow-hidden relative">
      <div className="flex animate-scroll">
        {/* Repeat the message multiple times for seamless scrolling */}
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 px-8 py-2 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                FREE SHIPPING ON ORDERS OVER $250
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                SHIPPED SAME DAY BEFORE 10AM EST
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
          display: flex;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBanner;

