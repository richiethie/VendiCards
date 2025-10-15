'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShopifyProduct, ProductVariant } from '@/types/shopify';
import { formatMoney, formatPriceRange } from '@/lib/formatting';
import Button from './ui/Button';

interface ProductCardProps {
  product: ShopifyProduct;
  onAddToCart?: (variant: ProductVariant) => void;
  isLoading?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  isLoading = false,
}) => {
  const firstImage = product.images.edges[0]?.node;
  const firstVariant = product.variants.edges[0]?.node;
  const isAvailable = product.availableForSale && firstVariant?.availableForSale;

  const handleAddToCart = () => {
    if (onAddToCart && firstVariant && isAvailable) {
      onAddToCart(firstVariant);
    }
  };

  return (
    <div className="group bg-[#0e0f11]/80 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden hover:border-gray-700/50 hover:bg-gray-800/80 hover:-translate-y-1 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-900/20">
      {/* Product Image */}
      <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden relative">
        {firstImage ? (
          <Link href={`/shop/${product.handle}`}>
            <div className="w-full h-full p-4">
              <Image
                src={firstImage.url}
                alt={firstImage.altText || product.title}
                width={400}
                height={400}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Link>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        {/* Product Type & Vendor */}
        <div className="flex items-center justify-between text-xs">
          {product.productType && (
            <span className="text-gray-400 uppercase tracking-wider font-medium">
              {product.productType}
            </span>
          )}
          {product.vendor && (
            <span className="text-gray-500">
              by {product.vendor}
            </span>
          )}
        </div>

        {/* Product Title */}
        <Link href={`/shop/${product.handle}`}>
          <h3 className="text-lg font-semibold text-white hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
            {product.title}
          </h3>
        </Link>

        {/* Price & Availability */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-xl font-bold text-white">
            {product.priceRange.minVariantPrice.amount === product.priceRange.maxVariantPrice.amount ? (
              formatMoney(product.priceRange.minVariantPrice)
            ) : (
              formatPriceRange(
                product.priceRange.minVariantPrice,
                product.priceRange.maxVariantPrice
              )
            )}
          </div>
          
          {isAvailable ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              In Stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/30">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;