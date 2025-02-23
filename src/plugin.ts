import { App } from 'fresh';
import type { MiddlewareOptions } from './deps.ts';
import { clerkMiddleware, State } from './server/mod.ts';
import * as clerkIslands from './islands/mod.ts';

/**
 * Plugin options for the Fresh Clerk Plugin
 */
export interface ClerkPluginOptions {
  /**
   * Clerk authenticate request options
   * @see {@link https://clerk.com/docs/references/backend/authenticate-request#authenticate-request-options authenticateRequest Docs}
   */
  middlewareOptions?: MiddlewareOptions;
}

/**
 * The plugin that will add a middleware built on top of Clerk backend SDK
 * and bundle the Clerk frontend islands.
 */
export function clerkPlugin<T = State>(
  app: App<T>,
  options: ClerkPluginOptions = {},
) {
  // Register middleware
  app.use(clerkMiddleware(options.middlewareOptions ?? {}));

  // Register islands
  let url: string | URL = new URL('./islands/mod.ts', import.meta.url);

  // Temp hack to make it work in dev mode
  if (Deno.args.includes('tmp:fix')) {
    url = url.pathname;
  }

  for (const key of Object.keys(clerkIslands)) {
    app.island(url, key, clerkIslands[key as keyof typeof clerkIslands]);
  }
}
