import { FreshContext } from '$fresh/server.ts';
import type { AuthenticateRequestOptions, AuthObject } from '../deps.ts';
import { clerkClient } from './clerkClient.ts';
import * as constants from './constants.ts';

interface State {
  auth: AuthObject | null;
}

export function clerkMiddleware(options: AuthenticateRequestOptions) {
  return async (req: Request, ctx: FreshContext<State>) => {
    const requestState = await clerkClient.authenticateRequest(req, {
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

    ctx.state.auth = requestState.toAuth();

    const resp = await ctx.next();

    requestState.headers.forEach((value, key) => {
      resp.headers.set(key, value);
    });

    return resp;
  };
}
