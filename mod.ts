import { Plugin } from '$fresh/server.ts';
import type { AuthenticateRequestOptions } from './deps.ts';
import { clerkMiddleware } from './server/mod.ts';

export interface ClerkPluginOptions {
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
        './islands/ClerkProvider.tsx',
        './islands/UserButton.tsx',
        './islands/mod.ts'
      ],
    },
  };
};
