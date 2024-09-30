import type { ComponentChildren } from 'preact';
import {
  CheckAuthorization,
  OrganizationCustomPermissionKey,
  OrganizationCustomRoleKey,
} from '../deps.ts';
import { useClerkContext } from '../hooks/mod.ts';
import { computed } from '@preact/signals';

export function SignedIn(
  props: { children: ComponentChildren },
): ComponentChildren {
  const { auth } = useClerkContext();

  return auth.value.userId ? props.children : null;
}

export function SignedOut(
  props: { children: ComponentChildren },
): ComponentChildren {
  const { auth } = useClerkContext();

  return auth.value.userId ? null : props.children;
}

type ProtectProps =
  | {
    role: OrganizationCustomRoleKey;
    permission?: never;
  }
  | {
    role?: never;
    permission: OrganizationCustomPermissionKey;
  };

export function Protect(
  props: ProtectProps & {
    fallback?: ComponentChildren;
    children: ComponentChildren;
  },
): ComponentChildren {
  const { auth, session } = useClerkContext();

  const isUnauthorized = computed(() => {
    return !auth.value.userId ||
      ((props.role || props.permission) &&
        !session.value!.checkAuthorization(
          { role: props.role, permission: props.permission } as Parameters<
            CheckAuthorization
          >[0],
        ));
  });

  return isUnauthorized.value ? props.fallback : props.children;
}
