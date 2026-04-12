import { z } from 'zod';
import { resolveShopifyEnabledFromProcessEnv } from './shopifyFlag';

const envSchema = z.object({
  // Shopify Storefront API
  SHOPIFY_STOREFRONT_API_ACCESS_TOKEN: z.string().min(1),
  SHOPIFY_STORE_DOMAIN: z.string().min(1),
  
  // Shopify Admin API
  SHOPIFY_ADMIN_API_ACCESS_TOKEN: z.string().min(1),
  SHOPIFY_API_VERSION: z.string().min(1),
  
  // Email Configuration - Optional for development
  SMTP_HOST: z.string().min(1).optional(),
  SMTP_PORT: z.string().transform(Number).optional(),
  SMTP_USER: z.string().min(1).optional(),
  SMTP_PASS: z.string().min(1).optional(),
  
  // App Configuration
  NEXT_PUBLIC_SITE_URL: z.string().url().optional().default('http://localhost:3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Shopify feature flags (no defaults — unset means “on”; see isShopifyEnabled)
  SHOPIFY_ENABLED: z.string().optional(),
  NEXT_PUBLIC_SHOPIFY_ENABLED: z.string().optional(),

  // Cloudinary (inventory gallery)
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  CLOUDINARY_INVENTORY_FOLDER: z.string().optional().default('inventory'),
});

export const env = envSchema.parse(process.env);

// Helper function to check if we're in development
export const isDevelopment = env.NODE_ENV === 'development';

// Helper function to check if we're in production
export const isProduction = env.NODE_ENV === 'production';

/**
 * Server-side Shopify gate — reads live `process.env` each call (see `lib/shopifyFlag.ts`).
 */
export function isShopifyEnabled(): boolean {
  return resolveShopifyEnabledFromProcessEnv();
}
