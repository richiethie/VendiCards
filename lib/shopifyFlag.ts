/** Values that mean “Shopify off” in env strings (trimmed, case-insensitive). */
const DISABLED = new Set(['false', '0', 'no', 'off', 'disabled']);

export function isEnvExplicitlyDisabled(value: string | undefined): boolean {
  if (value === undefined || value === '') return false;
  return DISABLED.has(value.trim().toLowerCase());
}

/**
 * Read Shopify on/off from the live process environment.
 * Prefer `SHOPIFY_ENABLED=false` in production: it is not inlined at build time
 * (unlike `NEXT_PUBLIC_*`), so Vercel/runtime changes apply after redeploy without
 * relying on the client bundle. If unset, falls back to `NEXT_PUBLIC_SHOPIFY_ENABLED`.
 */
export function resolveShopifyEnabledFromProcessEnv(): boolean {
  const s = process.env.SHOPIFY_ENABLED;
  if (s !== undefined && s !== '') return !isEnvExplicitlyDisabled(s);
  const p = process.env.NEXT_PUBLIC_SHOPIFY_ENABLED;
  if (p !== undefined && p !== '') return !isEnvExplicitlyDisabled(p);
  return true;
}
