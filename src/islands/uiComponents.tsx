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

// deno-lint-ignore no-explicit-any
interface PortalProps<T extends Record<string, any>> {
  component: typeof components[number];
  props?: T;
}

// deno-lint-ignore no-explicit-any
const Portal = <T extends Record<string, any>>(
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
 * The `<SignIn />` component renders a UI for signing in users.
 *
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
 * The `<SignUp />` component renders a UI for signup up users.
 *
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
 * The `<UserButton />` component is used to render the familiar user button UI
 * popularized by Google.
 *
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
 * The `<UserProfile />` component is used to render a beautiful, full-featured
 * account management UI that allows users to manage their profile and security
 * settings.
 *
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
 * The `<CreateOrganization />` component is used to render an organization
 * creation UI that allows users to create brand new organizations within your
 * application.
 *
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
 * The `<OrganizationProfile />` component is used to render a beautiful,
 * full-featured organization management UI that allows users to manage their
 * organization profile and security settings.
 *
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
 * The `<OrganizationSwitcher />` component allows a user to switch between
 * their account types - their personal account and their joined organizations.
 *
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
 * The `<OrganizationList />` component is used to display organization related
 * memberships, invitations, and suggestions for the user.
 *
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
