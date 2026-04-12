import { isEnvExplicitlyDisabled } from './shopifyFlag';

/** Client fallback when `SiteFlagsProvider` is missing (e.g. tests). */
export function isShopifyEnabledClient(): boolean {
  const raw = process.env.NEXT_PUBLIC_SHOPIFY_ENABLED;
  if (raw === undefined || raw === '') return true;
  return !isEnvExplicitlyDisabled(raw);
}


