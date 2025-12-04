'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Image as ShopifyImage } from '@/types/shopify';

interface ProductGalleryProps {
  images: ShopifyImage[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-800 overflow-hidden">
        <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <svg className="w-24 h-24 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
    );
  }

  const selectedImage = images[selectedImageIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-800 overflow-hidden">
        <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 p-8">
          <Image
            src={selectedImage.url}
            alt={selectedImage.altText || 'Product image'}
            width={600}
            height={600}
            className="w-full h-full object-contain"
            priority={selectedImageIndex === 0}
          />
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImageIndex(index)}
              className={`aspect-square bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden border-2 transition-all ${
                index === selectedImageIndex
                  ? 'border-red-500 shadow-lg shadow-red-500/20'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="w-full h-full p-2 bg-gradient-to-br from-gray-800 to-gray-900">
                <Image
                  src={image.url}
                  alt={image.altText || `Product image ${index + 1}`}
                  width={150}
                  height={150}
                  className="w-full h-full object-contain"
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="text-center text-sm text-gray-400">
          Image {selectedImageIndex + 1} of {images.length}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
