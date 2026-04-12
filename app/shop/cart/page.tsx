'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/components/CartContext';
import { isShopifyEnabledClient } from '../../../lib/shopifyConfig';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const shopifyEnabled = isShopifyEnabledClient();
  const { state: cartState, updateQuantity, removeFromCart, clearCart, goToCheckout } = useCart();

  useEffect(() => {
    if (!shopifyEnabled) {
      router.replace('/shop');
    }
  }, [shopifyEnabled, router]);

  if (!shopifyEnabled) {
    return null;
  }

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      await removeFromCart(itemId);
    } else {
      await updateQuantity(itemId, newQuantity);
    }
  };

  const calculateSubtotal = () => {
    return cartState.items.reduce((total, item) => {
      return total + (parseFloat(item.price.amount) * item.quantity);
    }, 0);
  };

  const getTotalItemCount = () => {
    return cartState.items.reduce((total, item) => total + item.quantity, 0);
  };

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(parseFloat(amount));
  };

  const isMaxQuantityReached = (item: any) => {
    return item.quantityAvailable !== undefined && 
           item.quantityAvailable !== null && 
           item.quantity >= item.quantityAvailable;
  };

  // Show loading state first, before checking if cart is empty
  if (cartState.isLoading) {
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
            <div className="flex items-center space-x-2 text-sm text-gray-400 mb-3">
              <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-red-400 transition-colors">Shop</Link>
              <span>/</span>
              <span className="text-white">Cart</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Shopping Cart</h1>
          </div>
        </div>

        {/* Loading Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-8">
            {/* Cart Items Skeleton */}
            <div className="xl:col-span-2 space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-gray-900/50 backdrop-blur-sm rounded-lg shadow-sm border border-gray-800 p-4 sm:p-6">
                  <div className="flex gap-4">
                    {/* Image Skeleton */}
                    <div className="w-24 h-24 bg-gray-800 rounded-lg animate-pulse"></div>
                    {/* Content Skeleton */}
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4"></div>
                      <div className="h-6 bg-gray-800 rounded animate-pulse w-1/4"></div>
                      <div className="h-8 bg-gray-800 rounded animate-pulse w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Summary Skeleton */}
            <div className="xl:col-span-1">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg shadow-sm border border-gray-800 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-800 rounded animate-pulse w-20"></div>
                    <div className="h-4 bg-gray-800 rounded animate-pulse w-16"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-800 rounded animate-pulse w-24"></div>
                    <div className="h-4 bg-gray-800 rounded animate-pulse w-20"></div>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex justify-between">
                      <div className="h-5 bg-gray-800 rounded animate-pulse w-16"></div>
                      <div className="h-5 bg-gray-800 rounded animate-pulse w-24"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="w-full h-12 bg-gray-800 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartState.error) {
    return (
      <div className="min-h-screen bg-[#0e0f11] flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg shadow-sm border border-gray-800 p-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Error Loading Cart</h1>
            <p className="text-gray-400 mb-6">{cartState.error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Only show empty cart if we're not loading AND cart is actually empty
  if (!cartState.isLoading && (!cartState.items || cartState.items.length === 0)) {
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
            <div className="flex items-center space-x-2 text-sm text-gray-400 mb-3">
              <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-red-400 transition-colors">Shop</Link>
              <span>/</span>
              <span className="text-white">Cart</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Shopping Cart</h1>
          </div>
        </div>

        {/* Empty Cart */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg shadow-sm border border-gray-800 p-12 text-center">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-semibold text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">Looks like you haven't added any items to your cart yet. Start browsing our products!</p>
            
            <Link 
              href="/shop"
              className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Continue Shopping
            </Link>
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
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-3">
            <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-red-400 transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-white">Cart</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Shopping Cart</h1>
              <p className="text-gray-400 text-base md:text-lg mt-1">
                {getTotalItemCount()} item{getTotalItemCount() !== 1 ? 's' : ''} in your cart
              </p>
            </div>
            <button
              onClick={clearCart}
              disabled={cartState.isLoading}
              className="text-sm text-gray-400 border border-gray-400 rounded-md p-2 cursor-pointer hover:text-red-400 hover:border-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cartState.isLoading ? 'Clearing...' : 'Clear all'}
            </button>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-8">
          {/* Cart Items */}
          <div className="xl:col-span-2 space-y-4">
            {cartState.items.map((item) => (
              <div key={item.id} className="bg-gray-900/50 backdrop-blur-sm rounded-lg shadow-sm border border-gray-800 p-4 sm:p-6">
                {/* Mobile Layout */}
                <div className="sm:hidden">
                  <div className="flex gap-4 mb-4">
                    {/* Product Image - Mobile */}
                    <div className="flex-shrink-0">
                      {item.image ? (
                        <div className="relative w-24 h-24 bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src={item.image.url}
                            alt={item.image.altText || item.title}
                            fill
                            className="object-contain p-1"
                            sizes="96px"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Product Info & Remove Button - Mobile */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="text-base font-semibold text-white mb-1 leading-tight">
                            <Link href={`/shop/${item.handle}`} className="hover:text-red-400 transition-colors">
                              {item.title}
                            </Link>
                          </h3>
                          <p className="text-lg font-bold text-white">
                            {formatPrice(item.price.amount, item.price.currencyCode)}
                          </p>
                        </div>
                        
                        {/* Remove Button - Mobile */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          disabled={cartState.isLoading}
                          className="text-gray-400 hover:text-red-400 transition-colors p-1 -m-1 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Remove item"
                        >
                          {cartState.isLoading ? (
                            <div className="w-5 h-5 animate-spin rounded-full border-2 border-gray-600 border-t-red-400"></div>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Total Row - Mobile */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-300">Qty:</span>
                        <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || cartState.isLoading}
                            className="w-10 h-10 flex items-center justify-center text-gray-300 hover:bg-gray-700 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed disabled:hover:bg-gray-800 transition-colors border-r border-gray-700"
                          >
                            {cartState.isLoading ? (
                              <div className="w-4 h-4 animate-spin rounded-full border-2 border-gray-600 border-t-gray-300"></div>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            )}
                          </button>
                          <span className="w-12 h-10 flex items-center justify-center text-white font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={isMaxQuantityReached(item) || cartState.isLoading}
                            className="w-10 h-10 flex items-center justify-center text-gray-300 hover:bg-gray-700 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed disabled:hover:bg-gray-800 transition-colors border-l border-gray-700"
                          >
                            {cartState.isLoading ? (
                              <div className="w-4 h-4 animate-spin rounded-full border-2 border-gray-600 border-t-gray-300"></div>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                      
                      {/* Maximum quantity message - Mobile */}
                      {isMaxQuantityReached(item) && (
                        <div className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg px-2 py-1">
                          Maximum quantity ({item.quantityAvailable}) reached
                        </div>
                      )}
                    </div>
                    
                    {/* Item Total - Mobile */}
                    <div className="text-right">
                      <div className="text-lg font-semibold text-white">
                        {formatPrice((parseFloat(item.price.amount) * item.quantity).toString(), item.price.currencyCode)}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-sm text-gray-400">
                          {formatPrice(item.price.amount, item.price.currencyCode)} each
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex gap-6">
                  {/* Product Image - Desktop */}
                  <div className="flex-shrink-0">
                    {item.image ? (
                      <div className="relative w-24 h-24 bg-gray-800 rounded-lg overflow-hidden">
                        <Image
                          src={item.image.url}
                          alt={item.image.altText || item.title}
                          fill
                          className="object-contain p-1"
                          sizes="96px"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Product Info - Desktop */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 min-w-0 pr-2">
                        <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">
                          <Link href={`/shop/${item.handle}`} className="hover:text-red-400 transition-colors">
                            {item.title}
                          </Link>
                        </h3>
                        <p className="text-xl font-bold text-white">
                          {formatPrice(item.price.amount, item.price.currencyCode)}
                        </p>
                      </div>
                      
                      {/* Remove Button - Desktop */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        disabled={cartState.isLoading}
                        className="text-gray-400 hover:text-red-400 transition-colors p-2 -m-2 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Remove item"
                      >
                        {cartState.isLoading ? (
                          <div className="w-5 h-5 animate-spin rounded-full border-2 border-gray-600 border-t-red-400"></div>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Quantity Controls & Total - Desktop */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-300">Qty:</span>
                        <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || cartState.isLoading}
                            className="w-10 h-10 flex items-center justify-center text-gray-300 hover:bg-gray-700 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed disabled:hover:bg-gray-800 transition-colors border-r border-gray-700"
                          >
                            {cartState.isLoading ? (
                              <div className="w-4 h-4 animate-spin rounded-full border-2 border-gray-600 border-t-gray-300"></div>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            )}
                          </button>
                          <span className="w-12 h-10 flex items-center justify-center text-white font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={isMaxQuantityReached(item) || cartState.isLoading}
                            className="w-10 h-10 flex items-center justify-center text-gray-300 hover:bg-gray-700 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed disabled:hover:bg-gray-800 transition-colors border-l border-gray-700"
                          >
                            {cartState.isLoading ? (
                              <div className="w-4 h-4 animate-spin rounded-full border-2 border-gray-600 border-t-gray-300"></div>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                      
                      {/* Item Total - Desktop */}
                      <div className="text-right">
                        <div className="text-lg font-semibold text-white">
                          {formatPrice((parseFloat(item.price.amount) * item.quantity).toString(), item.price.currencyCode)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-sm text-gray-400">
                            {formatPrice(item.price.amount, item.price.currencyCode)} each
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Maximum quantity message - Desktop */}
                    {isMaxQuantityReached(item) && (
                      <div className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2">
                        Maximum quantity ({item.quantityAvailable}) reached
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg shadow-sm border border-gray-800 p-4 sm:p-6">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center sm:justify-start gap-2 text-red-400 hover:text-red-300 transition-colors font-medium w-full sm:w-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="xl:col-span-1">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg shadow-sm border border-gray-800 p-4 sm:p-6 xl:sticky xl:top-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                {/* Items List */}
                <div className="space-y-2 max-h-48 sm:max-h-none overflow-y-auto">
                  {cartState.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm gap-2">
                      <span className="text-gray-400 truncate flex-1">
                        {item.title} × {item.quantity}
                      </span>
                      <span className="text-white font-medium flex-shrink-0">
                        {formatPrice((parseFloat(item.price.amount) * item.quantity).toString(), item.price.currencyCode)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg font-semibold text-white">Total</span>
                    <span className="text-xl sm:text-2xl font-bold text-white">
                      {formatPrice(calculateSubtotal().toString(), cartState.items[0]?.price.currencyCode || 'USD')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={goToCheckout}
                disabled={!cartState.checkoutUrl || cartState.items.length === 0}
                className="w-full mt-6 cursor-pointer bg-red-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md text-base sm:text-base"
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-center">Secure checkout powered by Shopify</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}