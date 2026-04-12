'use client';

import React from 'react';
import LocationPageView from '@/components/LocationPageView';

export default function NewLocationPage() {
  return (
    <LocationPageView
      breadcrumbLabel="New location"
      heading="Our new home"
      subheading="49 North Main Street, Fond du Lac — same great team, new storefront"
      prominentSlot={
        <div className="mb-6 rounded-xl border-2 border-amber-400/55 bg-gradient-to-br from-amber-950/90 via-[#1a1008] to-red-950/40 px-4 sm:px-6 py-5 sm:py-6 shadow-lg shadow-amber-900/25">
          <p className="text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-widest mb-2 text-center sm:text-left">
            We&apos;re moving
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white text-center sm:text-left leading-tight">
            Grand reopening{' '}
            <span className="text-amber-200">Monday, May 4, 2026</span>
          </p>
          <p className="text-amber-100/95 text-sm sm:text-base mt-3 font-medium text-center sm:text-left">
            Star Wars Day — May the 4th be with you! Mark your calendar; we&apos;ll see you at the new address below.
          </p>
        </div>
      }
      addressLine1="49 North Main Street"
      addressLine2="Fond du Lac, WI 54935"
      mapsEmbedQuery="49 North Main Street Fond du Lac WI 54935"
      directionsDestination="49 North Main Street Fond du Lac WI 54935"
      mapCaptionLine1="49 North Main Street"
      mapCaptionLine2="Fond du Lac, WI 54935"
      visitParagraphs={[
        "We're excited to welcome you to our new space in downtown Fond du Lac. Until we open on May 4th, our current shop at 74 South Main Street remains open — call ahead for hours and appointments.",
        'Nationwide shipping and all the ways you already reach us stay the same. Questions about the move? Email or call anytime.',
      ]}
      parkingParagraphs={[
        'Street parking is typically available along North Main Street and nearby blocks. Please check posted signs for time limits and restrictions.',
        "Our new storefront will be accessible, and we're happy to accommodate special needs — just let us know how we can help when you visit.",
      ]}
    />
  );
}
