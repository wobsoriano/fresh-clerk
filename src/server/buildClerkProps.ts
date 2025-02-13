import { FreshContext } from 'fresh';
import {
  type InitialState,
  makeAuthObjectSerializable,
  stripPrivateDataFromObject,
} from '../deps.ts';
import type { State } from './clerkMiddleware.ts';

/**
 * Builds the necessary props for Clerk SSR support in Fresh applications.
 * Include the result of this function in your ClerkProvider component to enable
 * auth state availability during SSR, hydration, and CSR.
 *
 * @param state - The state object from Fresh's PageProps
 *
 * @example
 * import { buildClerkProps } from 'fresh-clerk/server';
 *
 * export default function App({ Component, state }: PageProps<State>) {
 *   return (
 *     <html>
 *       <body>
 *         <ClerkProvider
 *           {...buildClerkProps(state)}
 *           publishableKey={Deno.env.get('CLERK_PUBLISHABLE_KEY')!}
 *         >
 *           <Component />
 *         </ClerkProvider>
 *       </body>
 *     </html>
 *   );
 * }
 */
export function buildClerkProps<T>(state: FreshContext<T>['state']): {
  __internal_clerk_initial_state: InitialState;
  __internal_clerk_public_env_vars: Record<string, string>;
} {
  const initialState = makeAuthObjectSerializable(
    stripPrivateDataFromObject((state as FreshContext<State>['state']).auth),
  );

  return {
    __internal_clerk_initial_state: JSON.parse(
      JSON.stringify(initialState),
    ) as InitialState,
    // @ts-expect-error hidden from the types as it's a private prop
    __internal_clerk_public_env_vars: state.__internal_clerk_public_env_vars,
  };
}
