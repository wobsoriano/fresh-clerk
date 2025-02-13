export function getPublicEnvVariables() {
  return {
    publishableKey: Deno.env.get('CLERK_PUBLISHABLE_KEY'),
    domain: Deno.env.get('CLERK_DOMAIN'),
    isSatellite: Deno.env.get('CLERK_IS_SATELLITE'),
    proxyUrl: Deno.env.get('CLERK_PROXY_URL'),
    signInUrl: Deno.env.get('CLERK_SIGN_IN_URL'),
    signUpUrl: Deno.env.get('CLERK_SIGN_UP_URL'),
    clerkJSUrl: Deno.env.get('CLERK_JS_URL'),
    clerkJSVersion: Deno.env.get('CLERK_JS_VERSION'),
    signInForceRedirectUrl: Deno.env.get('CLERK_SIGN_IN_FORCE_REDIRECT_URL'),
    signUpForceRedirectUrl: Deno.env.get('CLERK_SIGN_UP_FORCE_REDIRECT_URL'),
    signInFallbackRedirectUrl: Deno.env.get(
      'CLERK_SIGN_IN_FALLBACK_REDIRECT_URL',
    ),
    signUpFallbackRedirectUrl: Deno.env.get(
      'CLERK_SIGN_UP_FALLBACK_REDIRECT_URL',
    ),
  };
}
