import type { AuthObject, MiddlewareOptions } from '../deps.ts';
import { FreshContext, MiddlewareFn } from 'fresh';
import { clerkClient } from './clerkClient.ts';
import * as constants from './constants.ts';
import { getPublicEnvVariables } from '../utils/getPublicEnvVariables.ts';

export interface State {
  auth: AuthObject;
}

/**
 * The `clerkMiddleware()` helper integrates Clerk authentication into your Fresh application through Middleware.
 */
export function clerkMiddleware<T>(
  options: MiddlewareOptions,
): MiddlewareFn<T> {
  return async (ctx) => {
    const requestState = await clerkClient.authenticateRequest(ctx.req, {
      ...options,
      secretKey: options?.secretKey ?? constants.SECRET_KEY,
      publishableKey: options?.publishableKey ?? constants.PUBLISHABLE_KEY,
    });

    const locationHeader = requestState.headers.get('location');
    if (locationHeader) {
      return new Response(null, { status: 307, headers: requestState.headers });
    }

    if (requestState.status === 'handshake') {
      throw new Error('[fresh-clerk] Handshake status without redirect');
    }

    const auth = requestState.toAuth();

    const typedCtx = ctx as FreshContext<State>;

    typedCtx.state.auth = auth;
    // @ts-expect-error hidden from the types as it's a private prop
    typedCtx.state.__internal_clerk_public_env_vars = getPublicEnvVariables();

    const resp = await typedCtx.next();

    requestState.headers.forEach((value, key) => {
      resp.headers.set(key, value);
    });

    return resp;
  };
}
