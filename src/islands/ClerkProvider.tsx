import { deriveState, loadClerkJsScript } from '../deps.ts';
import type {
  ActiveSessionResource,
  ActJWTClaim,
  ClientResource,
  OrganizationCustomPermissionKey,
  OrganizationCustomRoleKey,
  OrganizationResource,
  Resources,
  UserResource,
} from '../deps.ts';
import {
  type Signal,
  useComputed,
  useSignal,
  useSignalEffect,
} from '@preact/signals';
import { createContext, type JSX } from 'preact';
import { BrowserClerk, HeadlessBrowserClerk } from '../types.ts';
import { ComponentChildren } from 'preact';
import { LoadClerkJsScriptOptions } from '../deps.ts';

type ClerkProviderProps = LoadClerkJsScriptOptions & {
  children?: ComponentChildren;
};

export type ClerkContextType = {
  clerk: Signal<HeadlessBrowserClerk | BrowserClerk | null>;
  loaded: Signal<boolean>;
  auth: Signal<{
    userId: string | null | undefined;
    sessionId: string | null | undefined;
    actor: ActJWTClaim | null | undefined;
    orgId: string | null | undefined;
    orgRole: OrganizationCustomRoleKey | null | undefined;
    orgSlug: string | null | undefined;
    orgPermissions: OrganizationCustomPermissionKey[] | null | undefined;
  }>;
  client: Signal<ClientResource | null | undefined>;
  session: Signal<ActiveSessionResource | null | undefined>;
  user: Signal<UserResource | null | undefined>;
  organization: Signal<OrganizationResource | null | undefined>;
};

export const ClerkContext = createContext<ClerkContextType | null>(null);

/**
 * The `<ClerkProvider>` component wraps your Fresh application to provide
 * active session and user context to Clerk's hooks and other components.
 *
 * @see {@link https://clerk.com/docs/components/clerk-provider}
 */
export default function ClerkProvider(props: ClerkProviderProps): JSX.Element {
  const clerk = useSignal<HeadlessBrowserClerk | BrowserClerk | null>(null);
  const loaded = useSignal(false);
  const resources = useSignal<Resources>({
    client: {} as ClientResource,
    session: undefined,
    user: undefined,
    organization: undefined,
  });
  // @ts-expect-error initialState is hidden from the types as it's a private prop
  const initialState = props.initialState;
  const auth = useComputed(() =>
    deriveState(loaded.value, resources.value, initialState)
  );
  const client = useComputed(() => resources.value.client);
  const session = useComputed(() => auth.value.session);
  const user = useComputed(() => auth.value.user);
  const organization = useComputed(() => auth.value.organization);

  useSignalEffect(() => {
    async function loadClerk() {
      await loadClerkJsScript(props);
      clerk.value = (globalThis as unknown as {
        Clerk: HeadlessBrowserClerk | BrowserClerk;
      }).Clerk;
      await clerk.value.load();
      loaded.value = true;
      clerk.value.addListener((payload) => resources.value = payload);
    }

    loadClerk();
  });

  return (
    <ClerkContext.Provider
      value={{
        clerk,
        loaded,
        auth,
        client,
        session,
        user,
        organization,
      }}
    >
      {props.children}
    </ClerkContext.Provider>
  );
}
