import { deriveState, loadClerkJsScript } from '../deps.ts';
import type {
  ActiveSessionResource,
  ActJWTClaim,
  ClientResource,
  InitialState,
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
import { createContext } from 'preact';
import { BrowserClerk, HeadlessBrowserClerk } from '../types.ts';
import { ComponentChildren } from 'preact';
import { LoadClerkJsScriptOptions } from '../deps.ts';

type ClerkProviderProps = LoadClerkJsScriptOptions & {
  initialState?: InitialState;
  children?: ComponentChildren;
};

export const ClerkContext = createContext<
  {
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
  } | null
>(null);

export default function ClerkProvider(props: ClerkProviderProps) {
  const clerk = useSignal<HeadlessBrowserClerk | BrowserClerk | null>(null);
  const loaded = useSignal(false);
  const resources = useSignal<Resources>({
    client: {} as ClientResource,
    session: undefined,
    user: undefined,
    organization: undefined,
  });
  const auth = computed(() =>
    deriveState(loaded.value, resources.value, props.initialState)
  );
  const client = computed(() => resources.value.client);
  const session = computed(() => auth.value.session);
  const user = computed(() => auth.value.user);
  const organization = computed(() => auth.value.organization);

  useSignalEffect(() => {
    console.log('hello');
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
