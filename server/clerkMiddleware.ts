import { FreshContext } from '$fresh/server.ts';
import {
  type AuthenticateRequestOptions,
  type AuthObject,
  makeAuthObjectSerializable,
  stripPrivateDataFromObject,
} from '../deps.ts';
import { clerkClient } from './clerkClient.ts';
import * as constants from './constants.ts';

export interface State {
  auth: AuthObject;
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

    const auth = requestState.toAuth();
    ctx.state.auth = auth;
    // @ts-expect-error initialState is hidden from the types as it's a private prop
    ctx.state.__clerk_ssr_state = makeAuthObjectSerializable(
      stripPrivateDataFromObject(auth),
    );

    const resp = await ctx.next();

    requestState.headers.forEach((value, key) => {
      resp.headers.set(key, value);
    });

    return resp;
  };
}
