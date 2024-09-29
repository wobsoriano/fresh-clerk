import { Plugin } from '$fresh/server.ts';
import type { AuthenticateRequestOptions } from './server.ts';
import { clerkMiddleware } from './server.ts';

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
        './src/islands/ClerkProvider.tsx',
        './src/islands/SignIn.tsx',
        './src/islands/UserButton.tsx',
      ],
    },
  };
};
