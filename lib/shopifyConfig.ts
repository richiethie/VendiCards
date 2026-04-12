export function isShopifyEnabledClient(): boolean {
  // Default to enabled unless explicitly set to "false"
  return process.env.NEXT_PUBLIC_SHOPIFY_ENABLED !== 'false';
}

