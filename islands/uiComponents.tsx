import { useRef } from 'preact/hooks';
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

interface PortalProps<T extends Record<string, any>> {
  mount?: (el: HTMLDivElement, props?: T) => void;
  unmount?: (el: HTMLDivElement) => void;
  props?: T;
}

export const Portal = <T extends Record<string, any>>(
  props: PortalProps<T>,
) => {
  const { loaded } = useClerkProvider();
  const el = useRef<HTMLDivElement>(null!);

  useSignalEffect(() => {
    if (loaded.value) {
      props.mount?.(el.current, props.props);
    }

    return () => {
      props.unmount?.(el.current);
    };
  });

  return <div ref={el} />;
};

export function SignIn(props: SignInProps) {
  const { clerk } = useClerkProvider();

  return (
    <Portal
      mount={clerk.value?.mountSignIn}
      unmount={clerk.value?.unmountSignIn}
      props={props}
    />
  );
}

export function SignUp(props: SignUpProps) {
  const { clerk } = useClerkProvider();

  return (
    <Portal
      mount={clerk.value?.mountSignUp}
      unmount={clerk.value?.unmountSignUp}
      props={props}
    />
  );
}

export function UserButton(props: UserButtonProps) {
  const { clerk } = useClerkProvider();

  return (
    <Portal
      mount={clerk.value?.mountUserButton}
      unmount={clerk.value?.unmountUserButton}
      props={props}
    />
  );
}

export function UserProfile(props: UserProfileProps) {
  const { clerk } = useClerkProvider();

  return (
    <Portal
      mount={clerk.value?.mountUserProfile}
      unmount={clerk.value?.unmountUserProfile}
      props={props}
    />
  );
}

export function CreateOrganization(props: CreateOrganizationProps) {
  const { clerk } = useClerkProvider();

  return (
    <Portal
      mount={clerk.value?.mountCreateOrganization}
      unmount={clerk.value?.unmountCreateOrganization}
      props={props}
    />
  );
}

export function OrganizationProfile(props: OrganizationProfileProps) {
  const { clerk } = useClerkProvider();

  return (
    <Portal
      mount={clerk.value?.mountOrganizationProfile}
      unmount={clerk.value?.unmountOrganizationProfile}
      props={props}
    />
  );
}

export function OrganizationSwitcher(props: OrganizationSwitcherProps) {
  const { clerk } = useClerkProvider();

  return (
    <Portal
      mount={clerk.value?.mountOrganizationSwitcher}
      unmount={clerk.value?.unmountOrganizationSwitcher}
      props={props}
    />
  );
}
