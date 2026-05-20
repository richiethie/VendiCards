'use client';

import React from 'react';
import LocationPageView from '@/components/LocationPageView';

export default function LocationPage() {
  return (
    <LocationPageView
      breadcrumbLabel="Location"
      heading="Visit Us"
      subheading="Find us at our Fond du Lac storefront"
      addressLine1="49 N Main St"
      addressLine2="Fond du Lac, WI 54935"
      mapsEmbedQuery="49 N Main Street Fond du Lac WI 54935"
      directionsDestination="49 N Main Street Fond du Lac WI 54935"
      mapCaptionLine1="49 N Main St"
      mapCaptionLine2="Fond du Lac, WI 54935"
      visitParagraphs={[
        "We're located in downtown Fond du Lac. Whether you're picking up an order or want to see our collection in person, we'd love to see you!",
        "Please call ahead to schedule a visit or confirm we're available. We also offer nationwide shipping for all our products.",
      ]}
      parkingParagraphs={[
        'Street parking is available along North Main Street and nearby blocks. Please check posted parking regulations and time limits.',
        "Our storefront is accessible, and we're happy to accommodate special needs — just let us know how we can help when you visit.",
      ]}
    />
  );
}
