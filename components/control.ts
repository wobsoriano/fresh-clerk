import type { ComponentChildren } from 'preact';
import {
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
  const { auth } = useClerkContext();

  const isUnauthorized = computed(() => {
    return !auth.value.userId ||
      ((props.role || props.permission) && !auth.value.has(props));
  });

  return isUnauthorized.value ? props.fallback : props.children;
}
