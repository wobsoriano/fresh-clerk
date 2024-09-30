import {
  type AuthenticateRequestOptions,
  type AuthObject,
  makeAuthObjectSerializable,
  stripPrivateDataFromObject,
} from '../deps.ts';
import { createDefine } from 'fresh';
import { clerkClient } from './clerkClient.ts';
import * as constants from './constants.ts';

export interface State {
  auth: AuthObject;
}

const define = createDefine<State>();

export function clerkMiddleware(options: AuthenticateRequestOptions): Promise<Response> {
  const middleware = define.middleware(async (ctx) => {
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
  });

  return middleware;
}
