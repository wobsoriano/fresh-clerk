import { useRef } from 'preact/hooks';
import type { JSX } from 'preact';
import { useSignalEffect } from '@preact/signals';
import { useClerkProvider } from '../hooks/mod.ts';
import type {
  CreateOrganizationProps,
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
] as const;

interface PortalProps<T extends Record<string, any>> {
  component: typeof components[number];
  props?: T;
}

export const Portal = <T extends Record<string, any>>(
  props: PortalProps<T>,
): JSX.Element => {
  const { clerk, loaded } = useClerkProvider();
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

export function SignIn(props: SignInProps): JSX.Element {
  return (
    <Portal
      component='SignIn'
      props={props}
    />
  );
}

export function SignUp(props: SignUpProps): JSX.Element {
  return (
    <Portal
      component='SignUp'
      props={props}
    />
  );
}

export function UserButton(props: UserButtonProps): JSX.Element {
  return (
    <Portal
      component='UserButton'
      props={props}
    />
  );
}

export function UserProfile(props: UserProfileProps): JSX.Element {
  return (
    <Portal
      component='UserProfile'
      props={props}
    />
  );
}

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
