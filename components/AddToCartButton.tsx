'use client';

import React, { useState } from 'react';
import { ProductVariant } from '@/types/shopify';
import Button from './ui/Button';
import { useCart } from './CartContext';

interface AddToCartButtonProps {
  variants: ProductVariant[];
  product: any;
  isLoading?: boolean;
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  variants,
  product,
  isLoading = false,
  className,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, state } = useCart();

  // Calculate real-time available inventory considering cart contents
  const getRealTimeAvailableInventory = (variant: ProductVariant) => {
    if (!variant.quantityAvailable) return 0;
    
    // Find how many of this variant are already in the cart
    const cartItem = state.items.find(item => item.variantId === variant.id);
    const alreadyInCart = cartItem ? cartItem.quantity : 0;
    
    // Available = total available - already in cart
    return Math.max(0, variant.quantityAvailable - alreadyInCart);
  };

  // Get real-time available inventory for selected variant
  const realTimeAvailable = selectedVariant ? getRealTimeAvailableInventory(selectedVariant) : 0;

  // Initialize with first available variant
  React.useEffect(() => {
    if (variants.length > 0) {
      setSelectedVariant(variants[0]);
    }
  }, [variants]);

  // Handle variant change
  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    // Reset quantity to 1 when changing variants
    setQuantity(1);
  };

  // Reset quantity when real-time available inventory changes
  React.useEffect(() => {
    if (realTimeAvailable > 0 && quantity > realTimeAvailable) {
      setQuantity(realTimeAvailable);
    }
  }, [realTimeAvailable, quantity]);

  // Update quantity when cart changes (e.g., items added/removed from other pages)
  React.useEffect(() => {
    if (realTimeAvailable > 0 && quantity > realTimeAvailable) {
      setQuantity(realTimeAvailable);
    }
  }, [state.items, realTimeAvailable, quantity]);

  const handleAddToCart = async () => {
    if (selectedVariant) {
      try {
        await addToCart(selectedVariant.id, quantity, product);
        console.log('Item added to cart successfully!');
        // Reset quantity to 1 after successful add
        setQuantity(1);
      } catch (error) {
        console.error('Failed to add item to cart:', error);
      }
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && realTimeAvailable > 0 && newQuantity <= realTimeAvailable) {
      setQuantity(newQuantity);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Disable arrow keys, but allow other keys like backspace, delete, tab, etc.
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
  };

  const isAvailable = selectedVariant?.availableForSale && realTimeAvailable > 0;
  const isOutOfStock = selectedVariant && (!selectedVariant.availableForSale || realTimeAvailable === 0);
  const maxQuantity = realTimeAvailable;
  const isQuantityValid = quantity >= 1 && quantity <= maxQuantity;

  return (
    <div className="space-y-4">
      {/* Stock Information */}
      {selectedVariant?.quantityAvailable !== undefined && (
        <div className="py-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">Stock Available:</span>
            <div className="text-right">
              <div className="text-lg font-semibold text-white">
                {realTimeAvailable}
              </div>
              {selectedVariant.quantityAvailable && realTimeAvailable < selectedVariant.quantityAvailable && (
                <div className="text-xs text-blue-600 font-medium">
                  {selectedVariant.quantityAvailable - realTimeAvailable} in cart
                </div>
              )}
              {realTimeAvailable <= 5 && realTimeAvailable > 0 && (
                <div className="text-xs text-amber-400 font-medium">
                  Low stock!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">Quantity:</label>
        <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden bg-gray-900/50">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="w-10 h-10 flex items-center justify-center text-gray-300 hover:bg-white/5 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors border-r border-gray-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <input
            type="number"
            min="1"
            max={maxQuantity}
            value={quantity}
            onChange={(e) => {
              const newQuantity = parseInt(e.target.value);
              if (!isNaN(newQuantity)) {
                handleQuantityChange(newQuantity);
              }
            }}
            onKeyDown={handleKeyDown}
            onBlur={(e) => {
              // Validate on blur and correct if needed
              const newQuantity = parseInt(e.target.value);
              if (isNaN(newQuantity) || newQuantity < 1) {
                setQuantity(1);
              } else if (maxQuantity > 0 && newQuantity > maxQuantity) {
                setQuantity(maxQuantity);
              }
            }}
            className="w-16 text-center py-2 text-white font-medium bg-transparent focus:outline-none focus:ring-0 border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= maxQuantity}
            className="w-10 h-10 flex items-center justify-center text-gray-300 hover:bg-white/5 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors border-l border-gray-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Max Quantity Warning */}
      {quantity === maxQuantity && maxQuantity > 0 && maxQuantity <= 10 && (
        <div className="text-sm text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2 flex items-center gap-2">
          <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Maximum quantity selected ({maxQuantity})
        </div>
      )}

      {/* Cart Inventory Warning */}
      {selectedVariant?.quantityAvailable && realTimeAvailable < selectedVariant.quantityAvailable && (
        <div className="text-sm text-blue-300 bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-2 flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          {selectedVariant.quantityAvailable - realTimeAvailable} already in your cart
        </div>
      )}

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        disabled={!isAvailable || !isQuantityValid || isLoading || realTimeAvailable === 0}
        isLoading={isLoading}
        className={`w-full bg-blue-600 cursor-pointer hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ${className || ''}`}
        size="lg"
      >
        {isOutOfStock ? 'Out of Stock' : realTimeAvailable === 0 ? 'All Available in Cart' : `Add ${quantity} to Cart`}
      </Button>
    </div>
  );
};

export default AddToCartButton;