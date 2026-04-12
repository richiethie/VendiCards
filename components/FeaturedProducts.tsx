'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';
import { ShopifyProduct } from '@/types/shopify';
import { useShopifyEnabled } from '@/components/SiteFlagsContext';

const FeaturedProducts: React.FC = () => {
  const shopifyEnabled = useShopifyEnabled();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shopifyEnabled) {
      setLoading(false);
      setProducts([]);
      return;
    }

    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('/api/featured?limit=4');
        const data = await response.json();
        
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [shopifyEnabled]);

  if (loading) {
    return (
      <section className="py-20 bg-[#0e0f11]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Featured Products
            </h2>
          </div>
          {/* Desktop Grid Skeleton */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white/5 border border-gray-800 rounded-xl p-4 animate-pulse"
              >
                <div className="aspect-square bg-gray-800 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-800 rounded mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-2/3"></div>
              </div>
            ))}
          </div>
          {/* Mobile Carousel Skeleton */}
          <div className="sm:hidden overflow-hidden px-1">
            <div className="w-[280px]">
              <div className="bg-white/5 border border-gray-800 rounded-xl p-4 animate-pulse">
                <div className="aspect-square bg-gray-800 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-800 rounded mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!products.length) {
    return null;
  }

  return (
    <section className="py-20 bg-[#0e0f11] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-red-500/30 mb-4">
            <Sparkles className="w-4 h-4 text-red-400" />
            <span className="text-sm font-semibold text-red-400 uppercase tracking-wide">
              Featured
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            New <span className="text-red-500">Arrivals</span>
          </h2>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Check out our latest additions to the collection
          </p>
        </div>

        {/* Product Grid - Desktop */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Product Carousel - Mobile */}
        <div className="sm:hidden relative mb-10 overflow-hidden">
          <div
            className="flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <div key={product.id} className="snap-start flex-shrink-0 w-[280px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-red-600/50 group"
          >
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

