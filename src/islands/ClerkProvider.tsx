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
  computed,
  type Signal,
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
  const initialState = props.__clerk_ssr_state;
  const auth = computed(() =>
    deriveState(loaded.value, resources.value, initialState)
  );
  const client = computed(() => resources.value.client);
  const session = computed(() => auth.value.session);
  const user = computed(() => auth.value.user);
  const organization = computed(() => auth.value.organization);

  useSignalEffect(() => {
    async function loadClerk() {
      await loadClerkJsScript(props);
      clerk.value = (globalThis as any).Clerk;
      await clerk.value!.load();
      loaded.value = true;
      clerk.value!.addListener((payload) => resources.value = payload);
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
