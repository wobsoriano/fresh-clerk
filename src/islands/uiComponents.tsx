import { Component, ComponentType, createRef, JSX } from 'preact';
import { useClerkContext } from '../hooks/mod.ts';
import type {
  CreateOrganizationProps,
  GoogleOneTapProps,
  LoadedClerk,
  OrganizationListProps,
  OrganizationProfileProps,
  OrganizationSwitcherProps,
  SignInProps,
  SignUpProps,
  UserButtonProps,
  UserProfileProps,
  WaitlistProps,
  Without,
} from '../deps.ts';
import { WithClerkProp } from '../types.ts';

// deno-lint-ignore no-explicit-any
type AnyObject = any;

interface MountProps {
  mount: ((node: HTMLDivElement, props: AnyObject) => void) | undefined;
  unmount: ((node: HTMLDivElement) => void) | undefined;
  updateProps?: (props: AnyObject) => void;
  props?: AnyObject;
}

interface OpenProps {
  open: ((props: AnyObject) => void) | undefined;
  close: (() => void) | undefined;
  props?: AnyObject;
}

export const withClerk = <P extends { clerk: LoadedClerk }>(
  Component: ComponentType<P>,
) => {
  const HOC = (props: Without<P, 'clerk'>): JSX.Element | null => {
    const { clerk, loaded } = useClerkContext();

    if (!loaded.value) {
      return null;
    }

    return (
      <Component
        {...(props as P)}
        clerk={clerk.value}
      />
    );
  };

  return HOC;
};

// deno-lint-ignore no-explicit-any
const isMountProps = (props: any): props is MountProps => {
  return 'mount' in props;
};

// deno-lint-ignore no-explicit-any
const isOpenProps = (props: any): props is OpenProps => {
  return 'open' in props;
};

class Portal extends Component<MountProps | OpenProps> {
  private portalRef = createRef<HTMLDivElement>();

  override componentDidUpdate(prevProps: Readonly<MountProps>) {
    if (!isMountProps(prevProps) || !isMountProps(this.props)) {
      return;
    }
    if (
      prevProps.props.appearance !== this.props.props.appearance ||
      prevProps.props?.customPages?.length !==
        this.props.props?.customPages?.length
    ) {
      this.props.updateProps?.({
        node: this.portalRef.current,
        props: this.props.props,
      });
    }
  }

  override componentDidMount() {
    if (this.portalRef.current) {
      if (isMountProps(this.props)) {
        this.props.mount?.(this.portalRef.current, this.props.props);
      }

      if (isOpenProps(this.props)) {
        this.props.open?.(this.props.props);
      }
    }
  }

  override componentWillUnmount() {
    if (this.portalRef.current) {
      if (isMountProps(this.props)) {
        this.props.unmount?.(this.portalRef.current);
      }
      if (isOpenProps(this.props)) {
        this.props.close?.();
      }
    }
  }

  render() {
    return (
      <>
        <div ref={this.portalRef} />
      </>
    );
  }
}

/**
 * The `<SignIn />` component renders a UI for signing in users.
 *
 * @see {@link https://clerk.com/docs/components/authentication/sign-in}
 */
export const SignIn = withClerk(
  ({ clerk, ...props }: WithClerkProp<SignInProps>): JSX.Element => {
    return (
      <Portal
        mount={clerk.mountSignIn}
        unmount={clerk.unmountSignIn}
        updateProps={(clerk as AnyObject).__unstable__updateProps}
        props={props}
      />
    );
  },
);

/**
 * The `<SignUp />` component renders a UI for signup up users.
 *
 * @see {@link https://clerk.com/docs/components/authentication/sign-up}
 */
export const SignUp = withClerk(
  ({ clerk, ...props }: WithClerkProp<SignUpProps>): JSX.Element => {
    return (
      <Portal
        mount={clerk.mountSignUp}
        unmount={clerk.unmountSignUp}
        updateProps={(clerk as AnyObject).__unstable__updateProps}
        props={props}
      />
    );
  },
);

/**
 * The `<UserButton />` component is used to render the familiar user button UI
 * popularized by Google.
 *
 * @see {@link https://clerk.com/docs/components/user/user-button}
 */
export const UserButton = withClerk(
  ({ clerk, ...props }: WithClerkProp<UserButtonProps>): JSX.Element => {
    return (
      <Portal
        mount={clerk.mountUserButton}
        unmount={clerk.unmountUserButton}
        updateProps={(clerk as AnyObject).__unstable__updateProps}
        props={props}
      />
    );
  },
);

/**
 * The `<UserProfile />` component is used to render a beautiful, full-featured
 * account management UI that allows users to manage their profile and security
 * settings.
 *
 * @see {@link https://clerk.com/docs/components/user/user-profile}
 */
export const UserProfile = withClerk(
  ({ clerk, ...props }: WithClerkProp<UserProfileProps>): JSX.Element => {
    return (
      <Portal
        mount={clerk.mountUserProfile}
        unmount={clerk.unmountUserProfile}
        updateProps={(clerk as AnyObject).__unstable__updateProps}
        props={props}
      />
    );
  },
);

/**
 * The `<CreateOrganization />` component is used to render an organization
 * creation UI that allows users to create brand new organizations within your
 * application.
 *
 * @see {@link https://clerk.com/docs/components/organization/create-organization}
 */
export const CreateOrganization = withClerk(
  (
    { clerk, ...props }: WithClerkProp<CreateOrganizationProps>,
  ): JSX.Element => {
    return (
      <Portal
        mount={clerk.mountCreateOrganization}
        unmount={clerk.unmountCreateOrganization}
        updateProps={(clerk as AnyObject).__unstable__updateProps}
        props={props}
      />
    );
  },
);

/**
 * The `<OrganizationProfile />` component is used to render a beautiful,
 * full-featured organization management UI that allows users to manage their
 * organization profile and security settings.
 *
 * @see {@link https://clerk.com/docs/components/organization/organization-profile}
 */
export const OrganizationProfile = withClerk(
  (
    { clerk, ...props }: WithClerkProp<OrganizationProfileProps>,
  ): JSX.Element => {
    return (
      <Portal
        mount={clerk.mountOrganizationProfile}
        unmount={clerk.unmountOrganizationProfile}
        updateProps={(clerk as AnyObject).__unstable__updateProps}
        props={props}
      />
    );
  },
);

/**
 * The `<OrganizationSwitcher />` component allows a user to switch between
 * their account types - their personal account and their joined organizations.
 *
 * @see {@link https://clerk.com/docs/components/organization/organization-switcher}
 */
export const OrganizationSwitcher = withClerk(
  (
    { clerk, ...props }: WithClerkProp<OrganizationSwitcherProps>,
  ): JSX.Element => {
    return (
      <Portal
        mount={clerk.mountOrganizationSwitcher}
        unmount={clerk.unmountOrganizationSwitcher}
        updateProps={(clerk as AnyObject).__unstable__updateProps}
        props={props}
      />
    );
  },
);

/**
 * The `<OrganizationList />` component is used to display organization related
 * memberships, invitations, and suggestions for the user.
 *
 * @see {@link https://clerk.com/docs/components/organization/organization-list}
 */
export const OrganizationList = withClerk(
  ({ clerk, ...props }: WithClerkProp<OrganizationListProps>) => {
    return (
      <Portal
        mount={clerk.mountOrganizationList}
        unmount={clerk.unmountOrganizationList}
        updateProps={(clerk as AnyObject).__unstable__updateProps}
        props={props}
      />
    );
  },
);

export const Waitlist = withClerk(
  ({ clerk, ...props }: WithClerkProp<WaitlistProps>) => {
    return (
      <Portal
        mount={clerk.mountWaitlist}
        unmount={clerk.unmountWaitlist}
        updateProps={(clerk as AnyObject).__unstable__updateProps}
        props={props}
      />
    );
  },
);

/**
 * The <GoogleOneTap /> component renders the Google One Tap UI so that users can use
 * a single button to sign-up or sign-in to your Clerk application with their Google accounts.
 *
 * @see {@link https://clerk.com/docs/components/authentication/google-one-tap}
 */
export const GoogleOneTap = withClerk(
  ({ clerk, ...props }: WithClerkProp<GoogleOneTapProps>): JSX.Element => {
    return (
      <Portal
        open={clerk.openGoogleOneTap}
        close={clerk.closeGoogleOneTap}
        props={props}
      />
    );
  },
);
