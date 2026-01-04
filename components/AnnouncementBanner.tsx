'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

const AnnouncementBanner: React.FC = () => {
  const bannerContent = (
    <>
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 flex-shrink-0" />
        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide">
          FONDY CARD SHOW - MARCH 15TH
        </span>
      </div>
      <Link 
        href="/fondy-card-show"
        className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wide underline hover:no-underline transition-all flex-shrink-0"
      >
        LEARN MORE
        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
      </Link>
    </>
  );

  return (
    <div className="bg-red-600 text-white overflow-hidden relative">
      <div className="flex animate-scroll-wrapper">
        <div className="flex animate-scroll">
          {/* Duplicate content exactly twice for seamless loop */}
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex flex-shrink-0">
              {[...Array(10)].map((_, i) => (
                <div key={`${setIndex}-${i}`} className="flex items-center gap-4 sm:gap-8 px-4 sm:px-8 py-2 whitespace-nowrap flex-shrink-0">
                  {bannerContent}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .animate-scroll-wrapper {
          display: flex;
          overflow: hidden;
          width: 100%;
        }
        
        .animate-scroll {
          display: flex;
          animation: scroll 90s linear infinite;
          will-change: transform;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @media (min-width: 640px) {
          .animate-scroll {
            animation: scroll 90s linear infinite;
          }
        }
        
        .animate-scroll-wrapper:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBanner;


