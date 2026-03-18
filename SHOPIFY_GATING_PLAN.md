# Shopify Gating Implementation Plan

## Overview
Gate all Shopify functionality behind a `SHOPIFY_ENABLED` environment variable. When disabled, the site will function without e-commerce features and display an inventory gallery instead of the shop.

## Environment Variable
- **Variable**: `SHOPIFY_ENABLED` (boolean, default: `true`)
- **Location**: `.env` file
- **Usage**: Controls whether Shopify features are available

## Implementation Strategy

### 1. Environment Configuration (`lib/env.ts`)
- Add `SHOPIFY_ENABLED` to the env schema (optional boolean, defaults to `true`)
- Create helper function: `isShopifyEnabled()` for easy access throughout the app

### 2. Utility Hook (`lib/hooks/useShopifyEnabled.ts` or `lib/shopify.ts`)
- Create a client-side hook/utility to check Shopify enabled status
- Can read from a public env var (`NEXT_PUBLIC_SHOPIFY_ENABLED`) for client-side checks

### 3. Header Component (`components/Header.tsx`)
**When Shopify is disabled:**
- Remove "Shop" from navigation array
- Hide search icon/functionality (lines 247-257, 278-397)
- Hide cart icon (lines 259-271)
- Keep all other navigation items

### 4. Shop Page (`app/shop/page.tsx`)
**When Shopify is enabled:** Current functionality
**When Shopify is disabled:** 
- Replace with inventory gallery page
- Display photos of in-store inventory
- Simple grid layout with images
- No product details, pricing, or add-to-cart functionality

### 5. Product Detail Page (`app/shop/[handle]/page.tsx`)
**When Shopify is disabled:**
- Redirect to `/shop` (inventory page) or show 404
- Or show a message that product pages are not available

### 6. Cart Page (`app/shop/cart/page.tsx`)
**When Shopify is disabled:**
- Redirect to home page or show message that cart is unavailable

### 7. API Routes
**When Shopify is disabled, return appropriate responses:**

- `/api/search` - Return empty results or 503 Service Unavailable
- `/api/products` - Return empty array
- `/api/cart` - Return error message
- `/api/collections` - Return empty array
- `/api/featured` - Return empty array

### 8. Cart Context (`components/CartContext.tsx`)
- Check Shopify enabled status before making API calls
- Return early/no-op functions when disabled
- Prevent cart initialization when disabled

### 9. Other Components to Update
- `components/FeaturedProducts.tsx` - Conditionally render based on Shopify status (line 121: "View All Products" link to `/shop`)
- `components/Hero.tsx` - Update "Shop Collection" button (line 61: link to `/shop`) - change to inventory or hide
- `components/ProductCard.tsx` - May need conditional rendering (check for add-to-cart functionality)
- `components/AddToCartButton.tsx` - Hide when disabled (entire component should not render)
- Any other components that reference `/shop` routes

### 10. Sitemap (`app/sitemap.ts`)
- Exclude `/shop` routes when Shopify is disabled
- Exclude product detail pages when disabled

### 11. Middleware (if needed)
- Consider adding middleware to redirect `/shop/*` routes when disabled
- Or handle at the page level

## Files to Modify

### Core Configuration
- `lib/env.ts` - Add SHOPIFY_ENABLED variable
- `lib/shopify/storefront.ts` - Add checks before API calls (optional, can fail gracefully)

### Components
- `components/Header.tsx` - Conditional rendering
- `components/CartContext.tsx` - Graceful handling when disabled
- `components/FeaturedProducts.tsx` - Conditional rendering
- `components/Hero.tsx` - Check for shop references
- `components/AddToCartButton.tsx` - Hide when disabled

### Pages
- `app/shop/page.tsx` - Replace with inventory gallery when disabled
- `app/shop/[handle]/page.tsx` - Redirect/404 when disabled
- `app/shop/cart/page.tsx` - Redirect when disabled
- `app/page.tsx` - Check for shop references
- `app/grand-opening/page.tsx` - Check for shop references
- `app/about/page.tsx` - Check for shop references

### API Routes
- `app/api/search/route.ts` - Return empty/error when disabled
- `app/api/products/route.ts` - Return empty when disabled
- `app/api/cart/route.ts` - Return error when disabled
- `app/api/collections/route.ts` - Return empty when disabled
- `app/api/featured/route.ts` - Return empty when disabled

### Other
- `app/sitemap.ts` - Conditional route inclusion

## Inventory Page Design (When Shopify Disabled)

The inventory page should:
- Display a grid of product photos
- Simple, clean layout
- No pricing, no add-to-cart
- Maybe categories/filters for browsing
- Contact information for inquiries
- "Visit us in store" messaging

## Testing Checklist

- [ ] Set `SHOPIFY_ENABLED=false` and verify:
  - Shop link removed from navigation
  - Search functionality hidden
  - Cart icon hidden
  - `/shop` shows inventory gallery
  - `/shop/[handle]` redirects or 404s
  - `/shop/cart` redirects
  - API routes return appropriate responses
  - No console errors
  - Other pages still work (repairs, grading, contact, etc.)

- [ ] Set `SHOPIFY_ENABLED=true` and verify:
  - Everything works as before
  - All Shopify features functional

## Migration Notes

- Default to `true` to maintain current behavior
- All changes should be backward compatible
- Consider adding a banner/message when Shopify is disabled explaining the change
