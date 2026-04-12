'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { Loader2, Search, X, Filter, Grid3X3, LayoutGrid, SortAsc, Package, ChevronDown, ChevronUp } from 'lucide-react';
import { ShopifyProduct } from '@/types/shopify';
import Link from 'next/link';
import { isShopifyEnabledClient } from '@/lib/shopifyConfig';

interface InventoryImage {
  id: string;
  publicId: string;
  url: string;
  width: number;
  height: number;
  createdAt: string;
  format: string;
}

function ShopContent() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'large'>('grid');
  
  // Filter states - using arrays for multi-select
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Temporary filter states for the filter menu (before Apply is clicked)
  const [tempSelectedCollections, setTempSelectedCollections] = useState<string[]>([]);
  const [tempSelectedTags, setTempSelectedTags] = useState<string[]>([]);
  
  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams.get('search');
  const urlCollection = searchParams.get('collection');
  const urlTag = searchParams.get('tag');

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'title-az', label: 'Name: A to Z' },
    { value: 'title-za', label: 'Name: Z to A' },
    { value: 'newest', label: 'Newest First' },
  ];

  // Initialize filters from URL params
  useEffect(() => {
    if (urlCollection) {
      const collections = urlCollection.split(',').filter(Boolean);
      setSelectedCollections(collections);
      setTempSelectedCollections(collections);
    }
    if (urlTag) {
      const tags = urlTag.split(',').filter(Boolean);
      setSelectedTags(tags);
      setTempSelectedTags(tags);
    }
  }, [urlCollection, urlTag]);
  
  // Sync temp filters when filter menu opens
  useEffect(() => {
    if (isFilterOpen) {
      setTempSelectedCollections([...selectedCollections]);
      setTempSelectedTags([...selectedTags]);
    }
  }, [isFilterOpen]);

  // Load products when collections change
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        
        let allProducts: ShopifyProduct[] = [];
        
        // If collections are selected, fetch products for each collection
        if (selectedCollections.length > 0) {
          const collectionHandleMap: Record<string, string> = {
            'pokemon': 'pokemon',
            'one-piece': 'one-piece',
            'accessories': 'accessories',
          };
          
          // Fetch products for each selected collection
          const fetchPromises = selectedCollections.map(async (collection) => {
            const handle = collectionHandleMap[collection] || collection;
            const response = await fetch(`/api/products?limit=100&collection=${encodeURIComponent(handle)}`);
            const data = await response.json();
            return data.success ? data.products : [];
          });
          
          const productArrays = await Promise.all(fetchPromises);
          
          // Combine products and remove duplicates by ID
          const productMap = new Map<string, ShopifyProduct>();
          productArrays.flat().forEach((product: ShopifyProduct) => {
            if (!productMap.has(product.id)) {
              productMap.set(product.id, product);
            }
          });
          
          allProducts = Array.from(productMap.values());
        } else {
          // No collections selected, fetch all products
          const response = await fetch('/api/products?limit=100');
          const data = await response.json();
          
          if (data.success) {
            allProducts = data.products;
          } else {
            throw new Error(data.message || 'Failed to load products');
          }
        }
        
        setProducts(allProducts);
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to load products';
        setError(errorMessage);
        console.error('Failed to load products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [selectedCollections]);

  // Apply filters (tags + search) when they change
  // Note: Collection filtering is done server-side when loading products
  useEffect(() => {
    let filtered = products;
    
    // Apply tag filter if any selected
    if (selectedTags.length > 0) {
      filtered = filtered.filter((product: ShopifyProduct) =>
        product.tags.some(tag => 
          selectedTags.some(selectedTag => 
            tag.toLowerCase() === selectedTag.toLowerCase()
          )
        )
      );
    }
    
    // Apply search filter if query exists
    const query = urlSearchQuery || searchQuery;
    if (query) {
      filtered = filterProductsByQuery(filtered, query);
    }
    
    setFilteredProducts(filtered);
  }, [selectedTags, products, urlSearchQuery, searchQuery]);

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

  const filterProductsByQuery = (productList: ShopifyProduct[], query: string): ShopifyProduct[] => {
    if (!query.trim()) {
      return productList;
    }

    const lowerQuery = query.toLowerCase();
    return productList.filter(product => 
      product.title.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      product.productType.toLowerCase().includes(lowerQuery)
    );
  };

  const filterProducts = (query: string) => {
    const filtered = filterProductsByQuery(filteredProducts, query);
    setFilteredProducts(filtered);
  };

  // Toggle collection in temp filters (for filter menu)
  const toggleTempCollection = (collection: string) => {
    setTempSelectedCollections(prev => {
      if (prev.includes(collection)) {
        const newSelections = prev.filter(c => c !== collection);
        return newSelections.length === 0 ? [] : newSelections;
      } else {
        return [...prev, collection];
      }
    });
  };

  // Toggle tag in temp filters (for filter menu)
  const toggleTempTag = (tag: string) => {
    setTempSelectedTags(prev => {
      if (prev.includes(tag)) {
        const newSelections = prev.filter(t => t !== tag);
        return newSelections.length === 0 ? [] : newSelections;
      } else {
        return [...prev, tag];
      }
    });
  };

  // Apply filters (called when Apply button is clicked)
  const applyFilters = () => {
    setSelectedCollections([...tempSelectedCollections]);
    setSelectedTags([...tempSelectedTags]);
    updateURLParams(tempSelectedCollections, tempSelectedTags);
    setIsFilterOpen(false);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setTempSelectedCollections([]);
    setTempSelectedTags([]);
    setSelectedCollections([]);
    setSelectedTags([]);
    updateURLParams([], []);
  };

  // Update URL params
  const updateURLParams = (collections: string[], tags: string[]) => {
    const params = new URLSearchParams();
    if (collections.length > 0) params.set('collection', collections.join(','));
    if (tags.length > 0) params.set('tag', tags.join(','));
    if (urlSearchQuery || searchQuery) params.set('search', urlSearchQuery || searchQuery || '');
    
    const newUrl = params.toString() ? `/shop?${params.toString()}` : '/shop';
    window.history.pushState({}, '', newUrl);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterProducts(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    // Reapply filters without search
    let filtered = products;
    
    // Apply tag filters
    if (selectedTags.length > 0) {
      filtered = filtered.filter((product: ShopifyProduct) =>
        product.tags.some(tag => 
          selectedTags.some(selectedTag => 
            tag.toLowerCase() === selectedTag.toLowerCase()
          )
        )
      );
    }
    
    setFilteredProducts(filtered);
    // Update URL params
    updateURLParams(selectedCollections, selectedTags);
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
                <div className="w-8 h-8 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-center">
                  <Search className="w-4 h-4 text-red-400" />
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
                className="flex items-center gap-2 text-gray-400 hover:text-red-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-red-500/10 transition-colors"
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

      {/* Sort, Filter, and View Controls */}
      {!isLoading && products.length > 0 && (
        <div className="bg-[#0e0f11] border-b border-gray-800 sticky top-16 z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Left side: Filter and Sort */}
              <div className="flex items-center gap-3 flex-1">
                {/* Filter Button */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                    selectedCollections.length > 0 || selectedTags.length > 0
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-[#0e0f11] border-gray-700 text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filters</span>
                  {(selectedCollections.length > 0 || selectedTags.length > 0) && (
                    <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs font-bold">
                      {selectedCollections.length + selectedTags.length}
                    </span>
                  )}
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-300 hidden sm:inline">Sort:</label>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-[#0e0f11] border border-gray-700 rounded-lg px-3 sm:px-4 py-2 pr-8 text-sm font-medium text-gray-100 hover:border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors cursor-pointer"
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

                {/* Active Filters Display */}
                {(selectedCollections.length > 0 || selectedTags.length > 0) && (
                  <div className="hidden sm:flex items-center gap-2 flex-wrap">
                    {selectedCollections.map(collection => (
                      <span key={collection} className="inline-flex items-center gap-1 px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-medium border border-red-500/30">
                        {collection === 'pokemon' ? 'Pokemon' : collection === 'one-piece' ? 'One Piece' : 'Accessories'}
                        <button
                          onClick={() => {
                            const newCollections = selectedCollections.filter(c => c !== collection);
                            setSelectedCollections(newCollections);
                            updateURLParams(newCollections, selectedTags);
                          }}
                          className="hover:text-red-300"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {selectedTags.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-medium border border-red-500/30">
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                        <button
                          onClick={() => {
                            const newTags = selectedTags.filter(t => t !== tag);
                            setSelectedTags(newTags);
                            updateURLParams(selectedCollections, newTags);
                          }}
                          className="hover:text-red-300"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right side: View Mode Toggle */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-sm font-medium text-gray-300 hidden sm:inline">View:</span>
                <div className="flex bg-[#0e0f11] rounded-lg p-1 border border-gray-700">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-red-600 text-white shadow-sm'
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
                        ? 'bg-red-600 text-white shadow-sm'
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

      {/* Filter Drawer/Modal */}
      {isFilterOpen && !isLoading && products.length > 0 && (
        <>
          {/* Mobile: Full Screen Modal */}
          <div className="lg:hidden fixed inset-0 z-[60] bg-[#0e0f11]">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h2 className="text-lg font-bold text-white">Filters</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {/* Collection Filters */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-white mb-3">Collection</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => toggleTempCollection('pokemon')}
                      className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        tempSelectedCollections.includes('pokemon')
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                      }`}
                    >
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                        tempSelectedCollections.includes('pokemon')
                          ? 'border-red-400 bg-red-400'
                          : 'border-gray-500'
                      }`}>
                        {tempSelectedCollections.includes('pokemon') && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span>Pokemon</span>
                    </button>
                    <button
                      onClick={() => toggleTempCollection('one-piece')}
                      className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        tempSelectedCollections.includes('one-piece')
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                      }`}
                    >
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                        tempSelectedCollections.includes('one-piece')
                          ? 'border-red-400 bg-red-400'
                          : 'border-gray-500'
                      }`}>
                        {tempSelectedCollections.includes('one-piece') && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span>One Piece</span>
                    </button>
                    <button
                      onClick={() => toggleTempCollection('accessories')}
                      className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        tempSelectedCollections.includes('accessories')
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                      }`}
                    >
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                        tempSelectedCollections.includes('accessories')
                          ? 'border-red-400 bg-red-400'
                          : 'border-gray-500'
                      }`}>
                        {tempSelectedCollections.includes('accessories') && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span>Accessories</span>
                    </button>
                  </div>
                </div>

                {/* Tag Filters - Show if Pokemon or One Piece is selected */}
                {(tempSelectedCollections.includes('pokemon') || tempSelectedCollections.includes('one-piece')) && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-white mb-3">Type</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => toggleTempTag('raw')}
                        className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          tempSelectedTags.includes('raw')
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                        }`}
                      >
                        <div className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                          tempSelectedTags.includes('raw')
                            ? 'border-red-400 bg-red-400'
                            : 'border-gray-500'
                        }`}>
                          {tempSelectedTags.includes('raw') && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span>Raw</span>
                      </button>
                      <button
                        onClick={() => toggleTempTag('sealed')}
                        className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          tempSelectedTags.includes('sealed')
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                        }`}
                      >
                        <div className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                          tempSelectedTags.includes('sealed')
                            ? 'border-red-400 bg-red-400'
                            : 'border-gray-500'
                        }`}>
                          {tempSelectedTags.includes('sealed') && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span>Sealed</span>
                      </button>
                      <button
                        onClick={() => toggleTempTag('graded')}
                        className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          tempSelectedTags.includes('graded')
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                        }`}
                      >
                        <div className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                          tempSelectedTags.includes('graded')
                            ? 'border-red-400 bg-red-400'
                            : 'border-gray-500'
                        }`}>
                          {tempSelectedTags.includes('graded') && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span>Graded</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Clear All Button */}
                {(tempSelectedCollections.length > 0 || tempSelectedTags.length > 0) && (
                  <button
                    onClick={() => {
                      setTempSelectedCollections([]);
                      setTempSelectedTags([]);
                    }}
                    className="w-full px-4 py-3 bg-gray-800 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer mb-4"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-800">
                <button
                  onClick={applyFilters}
                  className="w-full px-4 py-3 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Desktop: Sidebar */}
          <div className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-[#0e0f11] border-r border-gray-800 z-[50] overflow-y-auto">
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">Filters</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-1 text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Collection Filters */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white mb-3">Collection</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => toggleTempCollection('pokemon')}
                    className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      tempSelectedCollections.includes('pokemon')
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                      tempSelectedCollections.includes('pokemon')
                        ? 'border-red-400 bg-red-400'
                        : 'border-gray-500'
                    }`}>
                      {tempSelectedCollections.includes('pokemon') && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span>Pokemon</span>
                  </button>
                  <button
                    onClick={() => toggleTempCollection('one-piece')}
                    className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      tempSelectedCollections.includes('one-piece')
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                      tempSelectedCollections.includes('one-piece')
                        ? 'border-red-400 bg-red-400'
                        : 'border-gray-500'
                    }`}>
                      {tempSelectedCollections.includes('one-piece') && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span>One Piece</span>
                  </button>
                  <button
                    onClick={() => toggleTempCollection('accessories')}
                    className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      tempSelectedCollections.includes('accessories')
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                      tempSelectedCollections.includes('accessories')
                        ? 'border-red-400 bg-red-400'
                        : 'border-gray-500'
                    }`}>
                      {tempSelectedCollections.includes('accessories') && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span>Accessories</span>
                  </button>
                </div>
              </div>

              {/* Tag Filters - Show if Pokemon or One Piece is selected */}
              {(tempSelectedCollections.includes('pokemon') || tempSelectedCollections.includes('one-piece')) && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-white mb-3">Type</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => toggleTempTag('raw')}
                      className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        tempSelectedTags.includes('raw')
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                      }`}
                    >
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                        tempSelectedTags.includes('raw')
                          ? 'border-red-400 bg-red-400'
                          : 'border-gray-500'
                      }`}>
                        {tempSelectedTags.includes('raw') && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span>Raw</span>
                    </button>
                    <button
                      onClick={() => toggleTempTag('sealed')}
                      className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        tempSelectedTags.includes('sealed')
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                      }`}
                    >
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                        tempSelectedTags.includes('sealed')
                          ? 'border-red-400 bg-red-400'
                          : 'border-gray-500'
                      }`}>
                        {tempSelectedTags.includes('sealed') && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span>Sealed</span>
                    </button>
                    <button
                      onClick={() => toggleTempTag('graded')}
                      className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        tempSelectedTags.includes('graded')
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                      }`}
                    >
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                        tempSelectedTags.includes('graded')
                          ? 'border-red-400 bg-red-400'
                          : 'border-gray-500'
                      }`}>
                        {tempSelectedTags.includes('graded') && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span>Graded</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Clear All Button */}
              {(tempSelectedCollections.length > 0 || tempSelectedTags.length > 0) && (
                <button
                  onClick={() => {
                    setTempSelectedCollections([]);
                    setTempSelectedTags([]);
                  }}
                  className="w-full px-4 py-3 bg-gray-800 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer mb-4"
                >
                  Clear All Filters
                </button>
              )}

              {/* Footer */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <button
                  onClick={applyFilters}
                  className="w-full px-4 py-3 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Overlay for mobile */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-[55]"
            onClick={() => setIsFilterOpen(false)}
          />
        </>
      )}

      {/* Main Content */}
      <div className="bg-[#0e0f11] min-h-screen">
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300 ${
          isFilterOpen ? 'lg:ml-64 lg:max-w-[calc(100%-16rem)]' : ''
        }`}>
          {isLoading ? (
            <div className="text-center py-16">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-red-400" />
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
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-red-500/25 hover:-translate-y-0.5"
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
  const shopifyEnabled = isShopifyEnabledClient();
  const [inventoryImages, setInventoryImages] = useState<InventoryImage[]>([]);
  const [inventoryLoading, setInventoryLoading] = useState(false);
  const [inventoryError, setInventoryError] = useState<string | null>(null);
  const [selectedInventoryImage, setSelectedInventoryImage] = useState<InventoryImage | null>(null);

  useEffect(() => {
    if (shopifyEnabled) return;

    const loadInventoryImages = async () => {
      setInventoryLoading(true);
      setInventoryError(null);
      try {
        const response = await fetch('/api/inventory-images', { cache: 'no-store' });
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to load inventory images');
        }

        setInventoryImages(data.images || []);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load inventory images';
        setInventoryError(message);
      } finally {
        setInventoryLoading(false);
      }
    };

    loadInventoryImages();
  }, [shopifyEnabled]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedInventoryImage(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const formatInventoryUpdatedAt = (createdAt: string) => {
    const d = new Date(createdAt);
    if (Number.isNaN(d.getTime())) return createdAt;
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(d);
  };

  const newestInventoryImage =
    inventoryImages.length > 0
      ? inventoryImages.reduce((newest, current) => {
          const newestTime = new Date(newest.createdAt).getTime();
          const currentTime = new Date(current.createdAt).getTime();
          return currentTime > newestTime ? current : newest;
        }, inventoryImages[0])
      : null;

  if (!shopifyEnabled) {
    return (
      <div className="min-h-screen bg-[#0e0f11]">
        <div className="relative bg-[#0e0f11] shadow-sm border-b border-gray-800 overflow-hidden">
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
            <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
              <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Shop</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Shop</h1>
              <p className="text-gray-400 text-base md:text-lg mt-1">
                Discover our collection of premium Pokémon cards and collectibles
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {!inventoryLoading && !inventoryError && newestInventoryImage && (
            <p className="text-gray-400 text-sm mb-6">
              Last inventory update:{" "}
              <span className="text-white font-semibold">
                {formatInventoryUpdatedAt(newestInventoryImage.createdAt)}
              </span>
            </p>
          )}

          {inventoryLoading && (
            <div className="py-16 flex items-center justify-center text-gray-300 text-lg">
              Loading inventory photos...
            </div>
          )}

          {inventoryError && !inventoryLoading && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-red-300">
              {inventoryError}
            </div>
          )}

          {!inventoryLoading && !inventoryError && inventoryImages.length === 0 && (
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center">
              <p className="text-white text-lg font-semibold mb-2">No inventory photos uploaded yet</p>
            </div>
          )}

          {!inventoryLoading && !inventoryError && inventoryImages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {inventoryImages.map((image) => (
                <div key={image.id} className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setSelectedInventoryImage(image)}
                    className="w-full h-80 sm:h-96 bg-black/30 p-3 flex items-center justify-center cursor-zoom-in"
                    aria-label="View image fullscreen"
                  >
                    <Image
                      src={image.url}
                      alt={image.publicId}
                      width={image.width || 1200}
                      height={image.height || 900}
                      className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedInventoryImage && (
          <div
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedInventoryImage(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={() => setSelectedInventoryImage(null)}
              className="absolute z-[110] top-4 right-4 sm:top-6 sm:right-6 text-white bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center text-xl"
              aria-label="Close fullscreen image"
            >
              ×
            </button>

            <div
              className="relative w-full max-w-7xl max-h-[90vh] h-auto flex items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={selectedInventoryImage.url}
                alt={selectedInventoryImage.publicId}
                width={selectedInventoryImage.width || 1600}
                height={selectedInventoryImage.height || 1200}
                className="max-w-full max-h-full w-auto h-auto object-contain scale-105"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0e0f11] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-red-400" />
          <p className="text-gray-400">Loading shop...</p>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}