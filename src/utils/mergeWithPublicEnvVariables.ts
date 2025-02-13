import type { LoadClerkJsScriptOptions } from '../deps.ts';

export function mergeWithPublicEnvVariables(
  clerkInitOptions: Omit<LoadClerkJsScriptOptions, 'publishableKey'> & {
    publishableKey?: string;
  },
  publicEnvVars: Record<string, string>,
): Partial<LoadClerkJsScriptOptions> {
  const {
    publishableKey,
    signInUrl,
    signUpUrl,
    signInForceRedirectUrl,
    signUpForceRedirectUrl,
    signInFallbackRedirectUrl,
    signUpFallbackRedirectUrl,
    clerkJSUrl,
    clerkJSVersion,
    proxyUrl,
    domain,
  } = clerkInitOptions;

  return {
    publishableKey: publishableKey || publicEnvVars.publishableKey,
    signInUrl: signInUrl || publicEnvVars.signInUrl,
    signUpUrl: signUpUrl || publicEnvVars.signUpUrl,
    signInForceRedirectUrl: signInForceRedirectUrl ||
      publicEnvVars.signInForceRedirectUrl,
    signUpForceRedirectUrl: signUpForceRedirectUrl ||
      publicEnvVars.signUpForceRedirectUrl,
    signInFallbackRedirectUrl: signInFallbackRedirectUrl ||
      publicEnvVars.signInFallbackRedirectUrl,
    signUpFallbackRedirectUrl: signUpFallbackRedirectUrl ||
      publicEnvVars.signUpFallbackRedirectUrl,
    clerkJSUrl: clerkJSUrl || publicEnvVars.clerkJSUrl,
    clerkJSVersion: clerkJSVersion || publicEnvVars.clerkJSVersion,
    proxyUrl: proxyUrl || publicEnvVars.proxyUrl,
    domain: domain || publicEnvVars.domain,
  };
}
