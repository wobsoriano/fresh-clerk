import { ComponentChildren } from 'preact';
import {
  OrganizationCustomPermissionKey,
  OrganizationCustomRoleKey,
} from '../deps.ts';
import { useClerkProvider } from '../hooks/mod.ts';
import { computed } from '@preact/signals';

export function SignedIn(props: { children: ComponentChildren }) {
  const { auth } = useClerkProvider();

  return auth.value.userId ? props.children : null;
}

export function SignedOut(props: { children: ComponentChildren }) {
  const { auth } = useClerkProvider();

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
) {
  const { auth } = useClerkProvider();

  const isUnauthorized = computed(() => {
    return !auth.value.userId ||
      ((props.role || props.permission) && !auth.value.has(props));
  });

  return isUnauthorized.value ? props.fallback : props.children;
}
