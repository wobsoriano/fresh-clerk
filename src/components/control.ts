import type { ComponentChildren } from 'preact';
import {
  CheckAuthorization,
  OrganizationCustomPermissionKey,
  OrganizationCustomRoleKey,
} from '../deps.ts';
import { useClerkContext } from '../hooks/mod.ts';
import { computed } from '@preact/signals';

/**
 * The `<SignedIn>` component offers authentication checks as a cross-cutting concern. Any children
 * components wrapped by a `<SignedIn>` component will be rendered only if there's a User with an
 * active Session signed in your application.
 *
 * @see {@link https://clerk.com/docs/components/control/signed-in}
 */
export function SignedIn(
  props: { children: ComponentChildren },
): ComponentChildren {
  const { auth } = useClerkContext();

  return auth.value.userId ? props.children : null;
}

/**
 * The `<SignedOut>` component offers authentication checks as a cross-cutting concern. Any child
 * nodes wrapped by a `<SignedOut>` component will be rendered only if there's no User signed in to
 * your application.
 *
 * @see {@link https://clerk.com/docs/components/control/signed-out}
 */
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

/**
 * The `<Protect>` component is used for authorization. It only renders its children when the current
 * user has the specified permission or role in the organization.
 *
 * @see {@link https://clerk.com/docs/components/protect}
 */
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
