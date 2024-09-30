import { useRef } from 'preact/hooks';
import type { JSX } from 'preact';
import { useSignalEffect } from '@preact/signals';
import { useClerkContext } from '../hooks/mod.ts';
import type {
  CreateOrganizationProps,
  OrganizationListProps,
  OrganizationProfileProps,
  OrganizationSwitcherProps,
  SignInProps,
  SignUpProps,
  UserButtonProps,
  UserProfileProps,
} from '../deps.ts';

const components = [
  'SignIn',
  'SignUp',
  'UserProfile',
  'UserButton',
  'CreateOrganization',
  'OrganizationProfile',
  'OrganizationSwitcher',
  'OrganizationList',
] as const;

interface PortalProps<T extends Record<string, any>> {
  component: typeof components[number];
  props?: T;
}

export const Portal = <T extends Record<string, any>>(
  props: PortalProps<T>,
): JSX.Element => {
  const { clerk, loaded } = useClerkContext();
  const el = useRef<HTMLDivElement>(null!);

  useSignalEffect(() => {
    if (clerk.value && loaded.value) {
      clerk.value[`mount${props.component}`](el.current, props.props);
    }

    return () => {
      if (clerk.value && loaded.value) {
        clerk.value[`unmount${props.component}`](el.current);
      }
    };
  });

  return <div ref={el} />;
};

/**
 * @see {@link https://clerk.com/docs/components/authentication/sign-in}
 */
export function SignIn(props: SignInProps): JSX.Element {
  return (
    <Portal
      component='SignIn'
      props={props}
    />
  );
}

/**
 * @see {@link https://clerk.com/docs/components/authentication/sign-up}
 */
export function SignUp(props: SignUpProps): JSX.Element {
  return (
    <Portal
      component='SignUp'
      props={props}
    />
  );
}

/**
 * @see {@link https://clerk.com/docs/components/user/user-button}
 */
export function UserButton(props: UserButtonProps): JSX.Element {
  return (
    <Portal
      component='UserButton'
      props={props}
    />
  );
}

/**
 * @see {@link https://clerk.com/docs/components/user/user-profile}
 */
export function UserProfile(props: UserProfileProps): JSX.Element {
  return (
    <Portal
      component='UserProfile'
      props={props}
    />
  );
}

/**
 * @see {@link https://clerk.com/docs/components/organization/create-organization}
 */
export function CreateOrganization(
  props: CreateOrganizationProps,
): JSX.Element {
  return (
    <Portal
      component='CreateOrganization'
      props={props}
    />
  );
}

/**
 * @see {@link https://clerk.com/docs/components/organization/organization-profile}
 */
export function OrganizationProfile(
  props: OrganizationProfileProps,
): JSX.Element {
  return (
    <Portal
      component='OrganizationProfile'
      props={props}
    />
  );
}

/**
 * @see {@link https://clerk.com/docs/components/organization/organization-switcher}
 */
export function OrganizationSwitcher(
  props: OrganizationSwitcherProps,
): JSX.Element {
  return (
    <Portal
      component='OrganizationSwitcher'
      props={props}
    />
  );
}

/**
 * @see {@link https://clerk.com/docs/components/organization/organization-list}
 */
export function OrganizationList(
  props: OrganizationListProps,
): JSX.Element {
  return (
    <Portal
      component='OrganizationList'
      props={props}
    />
  );
}
