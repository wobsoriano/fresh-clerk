import { App } from 'fresh';
import type { AuthenticateRequestOptions } from './deps.ts';
import { clerkMiddleware } from './server/mod.ts';
import * as clerkIslands from './islands/mod.ts';

/**
 * Plugin options for the Fresh Clerk Plugin
 */
export interface ClerkPluginOptions {
  /**
   * Clerk authenticate request options
   * @see {@link https://clerk.com/docs/references/backend/authenticate-request#authenticate-request-options authenticateRequest Docs}
   */
  middlewareOptions?: AuthenticateRequestOptions;
}

export function clerkPlugin<T>(
  app: App<T>,
  options: ClerkPluginOptions = {},
) {
  // Register middleware
  app.use(clerkMiddleware({}));

  // Register islands
  const islandsUrl = new URL('./islands/mod.ts', import.meta.url);
  for (const key of Object.keys(clerkIslands)) {
    app.island(islandsUrl, key, clerkIslands[key as keyof typeof clerkIslands]);
  }
}