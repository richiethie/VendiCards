'use client';

import React, { createContext, useContext, type ReactNode } from 'react';
import { isShopifyEnabledClient } from '@/lib/shopifyConfig';

type SiteFlags = {
  shopifyEnabled: boolean;
};

const SiteFlagsContext = createContext<SiteFlags | null>(null);

/**
 * Wrap the app (from the root layout) with the server-resolved Shopify flag so
 * client components do not rely only on `NEXT_PUBLIC_*` values inlined at build time.
 */
export function SiteFlagsProvider({
  shopifyEnabled,
  children,
}: {
  shopifyEnabled: boolean;
  children: ReactNode;
}) {
  return (
    <SiteFlagsContext.Provider value={{ shopifyEnabled }}>{children}</SiteFlagsContext.Provider>
  );
}

export function useShopifyEnabled(): boolean {
  const ctx = useContext(SiteFlagsContext);
  if (ctx) return ctx.shopifyEnabled;
  return isShopifyEnabledClient();
}
