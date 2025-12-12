'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { ShoppingCart, Phone, Menu, X, Search, Loader2 } from 'lucide-react';
import { useCart } from './CartContext';
import Image from 'next/image';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const pathname = usePathname();
  const { state: cartState } = useCart();
  
  const searchRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  interface SearchProduct {
    id: string;
    title: string;
    handle: string;
    description: string;
    image: {
      url: string;
      altText?: string;
    } | null;
    price: {
      amount: string;
      currencyCode: string;
    } | null;
    availableForSale: boolean;
    quantityAvailable: number | null;
    tags: string[];
    productType: string;
  }

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Repairs', href: '/repairs' },
    { name: 'Grading', href: '/grading' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Debounced search function
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=8`);
      const data = await response.json();
      
      if (data.success) {
        setSearchResults(data.products);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSelectedIndex(-1);
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Debounce search
    if (value.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        performSearch(value);
      }, 300);
    } else {
      setSearchResults([]);
    }
  };

  // Handle keyboard navigation
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (!searchResults.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          navigateToProduct(searchResults[selectedIndex]);
        } else if (searchQuery.trim()) {
          navigateToSearch();
        }
        break;
      case 'Escape':
        setIsSearchOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Navigate to specific product
  const navigateToProduct = (product: SearchProduct) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSelectedIndex(-1);
    setSearchResults([]);
    window.location.href = `/shop/${product.handle}`;
  };

  // Navigate to filtered shop page
  const navigateToSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearchOpen(false);
    setSelectedIndex(-1);
    setSearchResults([]);
    window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSelectedIndex(-1);
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(parseFloat(amount));
  };

  return (
    <header className="bg-[#0e0f11] shadow-sm border-b border-gray-800 sticky top-0 z-[60]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Mobile menu + Logo */}
          <div className="flex items-center space-x-3">
            {/* Mobile menu button - left side on mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <div className="w-10 h-10 rounded-md overflow-hidden flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors">
                  <Image
                    src="/images/vendicards_logo.png"
                    alt="VendiCards Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="ml-1 md:ml-3 flex flex-col">
                  <span className="text-xl font-bold text-gray-100 leading-none">
                    VendiCards
                  </span>
                  <span className="hidden md:block mt-1 text-xs text-gray-400 leading-none">
                    Premium Pokémon Cards
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  isActive(item.href)
                    ? 'text-primary-400 bg-primary-900/20 border border-primary-800'
                    : 'text-gray-300 hover:text-primary-400 hover:bg-gray-800'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-3">
             {/* Search Icon/Close Icon */}
             <button
               onClick={() => setIsSearchOpen(!isSearchOpen)}
               className="p-2 text-gray-400 cursor-pointer hover:text-gray-200 hover:bg-gray-800 rounded-lg transition-colors"
             >
               {isSearchOpen ? (
                 <X className="w-6 h-6" />
               ) : (
                 <Search className="w-6 h-6" />
               )}
             </button>

            {/* Cart Icon */}
            <Link
              href="/shop/cart"
              className="relative p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {/* Cart Badge - show when items > 0 */}
              {cartState.items.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-400 text-white text-xs rounded-full flex items-center justify-center font-bold px-1 border border-red-400">
                  {cartState.items.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>



             {/* Expandable Search Input */}
       {isSearchOpen && (
        <div ref={searchRef} className="bg-[#0e0f11] border-t border-gray-800 shadow-sm">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
             <div className="relative max-w-2xl mx-auto">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
               <input
                 type="text"
                 value={searchQuery}
                 onChange={handleSearchChange}
                 onKeyDown={handleSearchKeyDown}
                 placeholder="Search for Pokémon cards, sets, or rarities..."
                className="w-full pl-10 pr-4 py-3 border border-gray-700 bg-[#0e0f11] rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-gray-100 placeholder-gray-400"
                 autoComplete="off"
                 autoFocus
               />
               {searchQuery && (
                 <button
                   type="button"
                   onClick={() => {
                     setSearchQuery('');
                     setSearchResults([]);
                   }}
                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                 >
                   <X className="w-5 h-5" />
                 </button>
               )}

               {/* Search Results Dropdown */}
               {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#0e0f11] border border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                   <div className="py-2">
                     {searchResults.map((product, index) => (
                       <div
                         key={product.id}
                         onClick={() => navigateToProduct(product)}
                          className={`px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors ${
                           index === selectedIndex ? 'bg-primary-900/20' : ''
                         }`}
                       >
                         <div className="flex items-center gap-3">
                           {/* Product Image */}
                           <div className="flex-shrink-0">
                             {product.image ? (
                               <div className="relative w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                                 <Image
                                   src={product.image.url}
                                   alt={product.image.altText || product.title}
                                   fill
                                   className="object-cover"
                                   sizes="48px"
                                 />
                               </div>
                             ) : (
                               <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                                 <Search className="w-5 h-5 text-gray-400" />
                               </div>
                             )}
                           </div>

                           {/* Product Info */}
                           <div className="flex-1 min-w-0">
                             <h4 className="text-sm font-medium text-gray-100 truncate">
                               {product.title}
                             </h4>
                             {product.productType && (
                               <p className="text-xs text-gray-400 truncate">
                                 {product.productType}
                               </p>
                             )}
                             {product.price && (
                               <p className="text-sm font-semibold text-primary-400">
                                 {formatPrice(product.price.amount, product.price.currencyCode)}
                               </p>
                             )}
                           </div>

                           {/* Availability Indicator */}
                           <div className="flex-shrink-0">
                             {product.availableForSale ? (
                               <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                 In Stock
                               </span>
                             ) : (
                               <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                 Out of Stock
                               </span>
                             )}
                           </div>
                         </div>
                       </div>
                     ))}
                     
                     {/* View All Results */}
                     <div className="border-t border-gray-700">
                       <button
                         onClick={navigateToSearch}
                         className="w-full px-4 py-3 cursor-pointer text-left text-sm font-medium text-primary-400 hover:bg-gray-800 transition-colors"
                       >
                         View all results for "{searchQuery}"
                       </button>
                     </div>
                   </div>
                 </div>
               )}

               {/* Loading State */}
               {isSearching && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#0e0f11] border border-gray-700 rounded-lg shadow-lg z-50">
                   <div className="p-4 text-center text-gray-400">
                     <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                     Searching...
                   </div>
                 </div>
               )}
             </div>
           </div>
         </div>
       )}

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0e0f11] border-t border-gray-800 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors',
                  isActive(item.href)
                    ? 'text-primary-400 bg-primary-900/20 border border-primary-800'
                    : 'text-gray-300 hover:text-primary-400 hover:bg-gray-800'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile-only actions */}
            <div className="pt-4 mt-4 border-t border-gray-800">
              <p className="px-4 text-sm text-gray-400 mb-2">Need help? Call us:</p>
              <a
                href="tel:+19205396222"
                className="flex items-center w-full px-4 py-3 text-base font-medium text-primary-400 hover:text-primary-300 hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Phone className="w-5 h-5 mr-3" />
                (920) 539-6222
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;