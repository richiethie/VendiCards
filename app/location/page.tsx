'use client';

import React from 'react';
import LocationPageView from '@/components/LocationPageView';

export default function LocationPage() {
  return (
    <LocationPageView
      breadcrumbLabel="Location"
      heading="Visit Us"
      subheading="Find us at our Fond du Lac location"
      addressLine1="74 South Main Street, Suite 106"
      addressLine2="Fond du Lac, WI 54935"
      mapsEmbedQuery="74 South Main Street Suite 106 Fond du Lac WI 54935"
      directionsDestination="74 South Main Street Suite 106 Fond du Lac WI 54935"
      mapCaptionLine1="74 South Main Street, Suite 106"
      mapCaptionLine2="Fond du Lac, WI 54935"
      visitParagraphs={[
        "We're located in the heart of Fond du Lac. Whether you're picking up an order or want to see our collection in person, we'd love to see you!",
        "Please call ahead to schedule a visit or confirm we're available. We also offer nationwide shipping for all our products.",
      ]}
      parkingParagraphs={[
        'Street parking is available along South Main Street. Please check posted parking regulations and time limits.',
        "Our location is accessible and we're happy to accommodate any special needs. Please let us know if you require any assistance.",
      ]}
    />
  );
}
