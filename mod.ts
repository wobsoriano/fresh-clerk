import { Plugin } from '$fresh/server.ts';
import type { AuthenticateRequestOptions } from './deps.ts';
import { clerkMiddleware } from './server/mod.ts';

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

export const clerkPlugin = (options: ClerkPluginOptions = {}): Plugin => {
  return {
    name: 'clerk',
    middlewares: [
      {
        middleware: {
          // @ts-ignore: Types incompatible for some reason
          handler: clerkMiddleware(options.middlewareOptions || {}),
        },
        path: '/',
      },
    ],
    islands: {
      baseLocation: import.meta.url,
      paths: [
        './islands/mod.ts',
      ],
    },
  };
};
