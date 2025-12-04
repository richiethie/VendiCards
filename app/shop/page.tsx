'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { Loader2, Search, X, Filter, Grid3X3, LayoutGrid, SortAsc, Package } from 'lucide-react';
import { ShopifyProduct } from '@/types/shopify';
import Link from 'next/link';

function ShopContent() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'large'>('grid');
  
  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams.get('search');

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'title-az', label: 'Name: A to Z' },
    { value: 'title-za', label: 'Name: Z to A' },
    { value: 'newest', label: 'Newest First' },
  ];

  // Load products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products');
        const data = await response.json();
        
        if (data.success) {
          setProducts(data.products);
          setFilteredProducts(data.products);
        } else {
          setError(data.message || 'Failed to load products');
        }
      } catch (err) {
        setError('Failed to load products');
        console.error('Failed to load products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Handle search query from URL or local state
  useEffect(() => {
    const query = urlSearchQuery || searchQuery;
    if (query) {
      filterProducts(query);
    } else {
      setFilteredProducts(products);
    }
  }, [urlSearchQuery, searchQuery, products]);

  // Sort products when sortBy changes
  useEffect(() => {
    const sortedProducts = [...filteredProducts];
    
    switch (sortBy) {
      case 'price-low':
        sortedProducts.sort((a, b) => {
          const priceA = a.priceRange?.minVariantPrice?.amount ? parseFloat(a.priceRange.minVariantPrice.amount) : 0;
          const priceB = b.priceRange?.minVariantPrice?.amount ? parseFloat(b.priceRange.minVariantPrice.amount) : 0;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => {
          const priceA = a.priceRange?.minVariantPrice?.amount ? parseFloat(a.priceRange.minVariantPrice.amount) : 0;
          const priceB = b.priceRange?.minVariantPrice?.amount ? parseFloat(b.priceRange.minVariantPrice.amount) : 0;
          return priceB - priceA;
        });
        break;
      case 'title-az':
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-za':
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'newest':
        sortedProducts.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime());
        break;
      default:
        // Keep original order for 'featured'
        break;
    }
    
    setFilteredProducts(sortedProducts);
  }, [sortBy]);

  const filterProducts = (query: string) => {
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = products.filter(product => 
      product.title.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      product.productType.toLowerCase().includes(lowerQuery)
    );
    
    setFilteredProducts(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterProducts(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredProducts(products);
    // Clear URL search param
    if (urlSearchQuery) {
      window.history.replaceState({}, '', '/shop');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#0e0f11] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center">
              <Package className="w-8 h-8 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Unable to Load Products</h1>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Sorry, we couldn't load the products right now. Please check your connection and try again.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-red-600/50 hover:-translate-y-0.5"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0f11]">
      {/* Header with Image */}
      <div className="relative bg-[#0e0f11] shadow-sm border-b border-gray-800 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/background-1.png"
            alt="Shop Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0f11] via-[#0e0f11]/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Shop</span>
          </div>

          {/* Title and Description */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Shop</h1>
              <p className="text-gray-400 text-base md:text-lg mt-1">
                Discover our collection of premium Pokémon cards and collectibles
              </p>
            </div>
            {!isLoading && (
              <div className="mt-4 sm:mt-0 text-sm text-gray-400">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Results Banner */}
      {(urlSearchQuery || searchQuery) && (
        <div className="bg-[#0e0f11] border-b border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Search className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Search results for</p>
                  <p className="font-semibold text-white">"{urlSearchQuery || searchQuery}"</p>
                </div>
                <div className="hidden sm:block w-px h-8 bg-gray-700"></div>
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-400">Found</p>
                  <p className="font-semibold text-white">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  </p>
                </div>
              </div>
              <button
                onClick={clearSearch}
                className="flex items-center gap-2 text-gray-400 hover:text-emerald-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-emerald-500/10 transition-colors"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Clear search</span>
              </button>
            </div>
            <div className="sm:hidden mt-3 pt-3 border-t border-gray-800">
              <p className="text-sm text-gray-400">
                Found {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filter Controls */}
      {!isLoading && products.length > 0 && (
        <div className="bg-[#0e0f11] border-b border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 sm:gap-3 flex-1">
                <label className="text-sm font-medium text-gray-300 sm:inline">Sort by:</label>
                <div className="relative flex-1 sm:flex-initial">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-[#0e0f11] border border-gray-700 rounded-lg px-3 sm:px-4 py-2 pr-8 text-sm font-medium text-gray-100 hover:border-gray-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors cursor-pointer w-full sm:w-auto"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-[#0e0f11] text-gray-100">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-sm font-medium text-gray-300 hidden sm:inline">View:</span>
                <div className="flex bg-[#0e0f11] rounded-lg p-1 border border-gray-700">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
                    }`}
                    title="Grid view"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('large')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'large'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
                    }`}
                    title="Large view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-[#0e0f11] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isLoading ? (
            <div className="text-center py-16">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-emerald-400" />
              <p className="text-gray-400">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-[#0e0f11]/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-12 text-center">
              <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {urlSearchQuery || searchQuery ? 'No products found' : 'No products available'}
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                {urlSearchQuery || searchQuery 
                  ? `We couldn't find any products matching "${urlSearchQuery || searchQuery}". Try adjusting your search terms.`
                  : 'Check back soon for new arrivals and exciting collectibles!'
                }
              </p>
              {(urlSearchQuery || searchQuery) && (
                <button
                  onClick={clearSearch}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5"
                >
                  View all products
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Products Grid */}
              <div className={`grid gap-3 sm:gap-6 ${
                viewMode === 'large' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}>
                {filteredProducts.map((product: ShopifyProduct) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {/* Results Info */}
              <div className="mt-12 text-center">
                <p className="text-gray-400">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0e0f11] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-emerald-400" />
          <p className="text-gray-400">Loading shop...</p>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}