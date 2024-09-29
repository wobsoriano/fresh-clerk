import { Plugin } from "$fresh/server.ts";
import { AuthenticateRequestOptions } from "@clerk/backend/internal";
import { clerkMiddleware } from "src/server/index.ts";

export interface ClerkPluginOptions {
  middlewareOptions?: AuthenticateRequestOptions;
}

export const clerkPlugin = (options: ClerkPluginOptions = {}): Plugin => {
  return {
    name: "clerk",
    middlewares: [
      {
        middleware: {
          // @ts-ignore: Types incompatible for some reason
          handler: clerkMiddleware(options.middlewareOptions || {}),
        },
        path: "/",
      },
    ],
    islands: {
      baseLocation: import.meta.url,
      paths: [
        "./islands/ClerkProvider.tsx",
        "./islands/SignIn.tsx",
        "./islands/UserButton.tsx",
      ],
    },
  };
};
