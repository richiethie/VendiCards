'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode, useCallback, useRef } from 'react';
import { useShopifyEnabled } from './SiteFlagsContext';

// Cart item interface
interface CartItem {
  id: string;
  variantId: string;
  title: string;
  quantity: number;
  price: {
    amount: string;
    currencyCode: string;
  };
  image?: {
    url: string;
    altText?: string;
  };
  handle: string;
  quantityAvailable?: number;
}

// Cart state interface
interface CartState {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

// Cart action types
type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CART'; payload: { cartId: string; checkoutUrl: string; items: CartItem[] } }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_ITEMS'; payload: CartItem[] };

// Cart context interface
interface CartContextType {
  state: CartState;
  addToCart: (variantId: string, quantity: number, product: any) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCart: () => Promise<void>;
  goToCheckout: () => void;
}

// Initial cart state
const initialState: CartState = {
  items: [],
  cartId: null,
  checkoutUrl: null,
  isLoading: false,
  error: null,
};

// Cart reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_CART':
      return {
        ...state,
        cartId: action.payload.cartId,
        checkoutUrl: action.payload.checkoutUrl,
        items: action.payload.items,
        error: null,
      };
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        error: null,
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        error: null,
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        error: null,
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        cartId: null,
        checkoutUrl: null,
        error: null,
      };
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
        error: null,
      };
    default:
      return state;
  }
}

// Create cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const isRequesting = useRef(false);
  const shopifyEnabled = useShopifyEnabled();

  // Load cart from localStorage on mount
  useEffect(() => {
    if (!shopifyEnabled) {
      localStorage.removeItem('cart');
      dispatch({ type: 'CLEAR_CART' });
      dispatch({ type: 'SET_LOADING', payload: false });
      return;
    }

    // Set loading state while hydrating cart from localStorage
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Clear any old cart data from previous store (SidsCollectibles)
    // This ensures we start fresh with the new VendiCards store
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        
        // Check if cart is from old store by looking for old domain or store data
        // If cartId exists but seems invalid, clear it to start fresh
        if (parsedCart.cartId) {
          // Validate cart with current store by attempting to fetch it
          fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'get', cartId: parsedCart.cartId })
          })
          .then(response => response.json())
          .then(result => {
            if (result.success && result.cart) {
              // Cart is valid, load it
              const mappedItems = result.cart.lines.edges.map((edge: any) => ({
                id: edge.node.id,
                variantId: edge.node.merchandise.id,
                title: edge.node.merchandise.product.title,
                quantity: edge.node.quantity,
                price: edge.node.merchandise.price,
                image: edge.node.merchandise.product.images.edges[0]?.node,
                handle: edge.node.merchandise.product.handle,
                quantityAvailable: edge.node.merchandise.quantityAvailable,
              }));
              
              dispatch({
                type: 'SET_CART',
                payload: {
                  cartId: result.cartId,
                  checkoutUrl: result.checkoutUrl,
                  items: mappedItems,
                },
              });
            } else {
              // Cart is invalid (likely from old store), clear it
              console.log('Clearing invalid cart from previous store');
              localStorage.removeItem('cart');
              dispatch({ type: 'CLEAR_CART' });
            }
            dispatch({ type: 'SET_LOADING', payload: false });
          })
          .catch(() => {
            // Error fetching cart, clear it
            console.log('Clearing cart due to fetch error');
            localStorage.removeItem('cart');
            dispatch({ type: 'CLEAR_CART' });
            dispatch({ type: 'SET_LOADING', payload: false });
          });
        } else {
          // No cart ID, start fresh
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
        localStorage.removeItem('cart');
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      // No saved cart
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [shopifyEnabled]);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (state.cartId || state.items.length > 0) {
      localStorage.setItem('cart', JSON.stringify({
        cartId: state.cartId,
        checkoutUrl: state.checkoutUrl,
        items: state.items,
      }));
    } else {
      localStorage.removeItem('cart');
    }
  }, [state.cartId, state.checkoutUrl, state.items]);

  // Add item to cart
  const addToCart = useCallback(async (variantId: string, quantity: number, product: any) => {
    if (!shopifyEnabled) return;
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'add',
          items: [{ variantId, quantity }],
          cartId: state.cartId, // Pass existing cart ID if available
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to add item to cart');
      }

                   // Update cart state with the new cart data from Shopify
      const mappedItems = result.cart.lines.edges.map((edge: any) => {
        const item = {
          id: edge.node.id,
          variantId: edge.node.merchandise.id,
          title: edge.node.merchandise.product.title,
          quantity: edge.node.quantity,
          price: edge.node.merchandise.price,
          image: edge.node.merchandise.product.images.edges[0]?.node,
          handle: edge.node.merchandise.product.handle,
          quantityAvailable: edge.node.merchandise.quantityAvailable,
        };
        
        return item;
      });
      
      dispatch({
        type: 'SET_CART',
        payload: {
          cartId: result.cartId,
          checkoutUrl: result.checkoutUrl,
          items: mappedItems,
        },
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add item to cart';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [shopifyEnabled, state.cartId]);

  // Update item quantity
  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    if (!shopifyEnabled) return;
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      if (!state.cartId) {
        throw new Error('No cart found');
      }

      const item = state.items.find(item => item.id === itemId);
      if (!item) {
        throw new Error('Item not found in cart');
      }

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update',
          cartId: state.cartId,
          items: [{ variantId: item.id, quantity }], // Use cart line ID
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to update cart');
      }

             // Update cart state with fresh data from Shopify
      const mappedItems = result.cart.lines.edges.map((edge: any) => {
        const item = {
          id: edge.node.id,
          variantId: edge.node.merchandise.id,
          title: edge.node.merchandise.product.title,
          quantity: edge.node.quantity,
          price: edge.node.merchandise.price,
          image: edge.node.merchandise.product.images.edges[0]?.node,
          handle: edge.node.merchandise.product.handle,
          quantityAvailable: edge.node.merchandise.quantityAvailable,
        };
        
                 return item;
      });
      
      dispatch({
        type: 'SET_CART',
        payload: {
          cartId: result.cartId,
          checkoutUrl: result.checkoutUrl,
          items: mappedItems,
        },
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update quantity';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [shopifyEnabled, state.cartId]);

  // Remove item from cart
  const removeFromCart = useCallback(async (itemId: string) => {
    if (!shopifyEnabled) return;
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      if (!state.cartId) {
        throw new Error('No cart found');
      }

      const item = state.items.find(item => item.id === itemId);
      if (!item) {
        throw new Error('Item not found in cart');
      }

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update',
          cartId: state.cartId,
          items: [{ variantId: item.id, quantity: 0 }], // Use cart line ID and set quantity to 0 to remove
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to remove item');
      }

      // Update cart state with fresh data from Shopify
      const mappedItems = result.cart.lines.edges.map((edge: any) => {
        const item = {
          id: edge.node.id,
          variantId: edge.node.merchandise.id,
          title: edge.node.merchandise.product.title,
          quantity: edge.node.quantity,
          price: edge.node.merchandise.price,
          image: edge.node.merchandise.product.images.edges[0]?.node,
          handle: edge.node.merchandise.product.handle,
          quantityAvailable: edge.node.merchandise.quantityAvailable,
        };
        
                 return item;
      });
      
      dispatch({
        type: 'SET_CART',
        payload: {
          cartId: result.cartId,
          checkoutUrl: result.checkoutUrl,
          items: mappedItems,
        },
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove item';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [shopifyEnabled, state.cartId]);

  // Clear cart
  const clearCart = useCallback(async () => {
    if (!shopifyEnabled) {
      dispatch({ type: 'CLEAR_CART' });
      return;
    }
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      if (state.cartId) {
        // Clear cart in Shopify by setting all quantities to 0
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'update',
            cartId: state.cartId,
            items: state.items.map(item => ({ variantId: item.id, quantity: 0 })),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to clear cart in Shopify');
        }
      }

      // Clear local state
      dispatch({ type: 'CLEAR_CART' });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to clear cart';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [shopifyEnabled, state.cartId, state.items]);

  // Get cart from Shopify
  const getCart = useCallback(async () => {
    if (!shopifyEnabled) return;
    if (!state.cartId || isRequesting.current) {
      return;
    }

    try {
      isRequesting.current = true;
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const response = await fetch(`/api/cart?cartId=${state.cartId}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to get cart');
      }

             // Update cart state with fresh data
      const mappedItems = result.cart.lines.edges.map((edge: any) => {
        const item = {
          id: edge.node.id,
          variantId: edge.node.merchandise.id,
          title: edge.node.merchandise.product.title,
          quantity: edge.node.quantity,
          price: edge.node.merchandise.price,
          image: edge.node.merchandise.product.images.edges[0]?.node,
          handle: edge.node.merchandise.product.handle,
          quantityAvailable: edge.node.merchandise.quantityAvailable,
        };
        
                 return item;
      });
      
      dispatch({
        type: 'SET_CART',
        payload: {
          cartId: result.cartId,
          checkoutUrl: result.checkoutUrl,
          items: mappedItems,
        },
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get cart';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
      isRequesting.current = false;
    }
  }, [shopifyEnabled, state.cartId]);

  // Go to checkout
  const goToCheckout = useCallback(() => {
    if (!shopifyEnabled) return;
    if (state.checkoutUrl) {
      window.location.href = state.checkoutUrl;
    }
  }, [shopifyEnabled, state.checkoutUrl]);

  const value: CartContextType = {
    state,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCart,
    goToCheckout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
