import { FreshContext } from 'fresh';
import {
  type InitialState,
  makeAuthObjectSerializable,
  stripPrivateDataFromObject,
} from './deps.ts';
import type { State } from './server/mod.ts';

/**
 * Builds the necessary props for Clerk SSR support in Fresh applications.
 * Include the result of this function in your ClerkProvider component to enable
 * auth state availability during SSR, hydration, and CSR.
 *
 * @param state - The state object from Fresh's PageProps
 *
 * @example
 * import { buildClerkProps } from 'fresh-clerk/utils';
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
  initialState: InitialState;
} {
  const initialState = makeAuthObjectSerializable(
    stripPrivateDataFromObject((state as FreshContext<State>['state']).auth),
  );

  return {
    initialState: JSON.parse(JSON.stringify(initialState)) as InitialState,
  };
}
