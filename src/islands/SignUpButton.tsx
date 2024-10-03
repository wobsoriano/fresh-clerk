import { cloneElement, type JSX } from 'preact';
import { SignUpProps } from '../deps.ts';
import { useClerkContext } from '../hooks/mod.ts';
import type { ButtonProps } from '../types.ts';

export type SignUpButtonProps =
  & {
    unsafeMetadata?: SignUpUnsafeMetadata;
  }
  & ButtonProps
  & Pick<
    SignUpProps,
    | 'fallbackRedirectUrl'
    | 'forceRedirectUrl'
    | 'signInForceRedirectUrl'
    | 'signInFallbackRedirectUrl'
  >;

/**
 * The `<SignOutButton>` component is a button that signs a user out.
 *
 * @see {@link https://clerk.com/docs/components/unstyled/sign-out-button}
 */
export default function SignUpButton(props: SignUpButtonProps): JSX.Element {
  const { clerk } = useClerkContext();
  const {
    fallbackRedirectUrl,
    forceRedirectUrl,
    signInFallbackRedirectUrl,
    signInForceRedirectUrl,
    mode,
    unsafeMetadata,
    children,
    ...rest
  } = props;

  const opts: SignUpProps = {
    fallbackRedirectUrl,
    forceRedirectUrl,
    signInFallbackRedirectUrl,
    signInForceRedirectUrl,
    unsafeMetadata,
  };

  function clickHandler() {
    if (!clerk.value) {
      return;
    }

    if (mode === 'modal') {
      return clerk.value.openSignUp(opts);
    }

    return clerk.value.redirectToSignUp({
      ...opts,
      signUpFallbackRedirectUrl: fallbackRedirectUrl,
      signUpForceRedirectUrl: forceRedirectUrl,
    });
  }

  if (children) {
    return cloneElement(children, {
      ...rest,
      onClick: clickHandler,
    });
  }

  return (
    <button {...rest} onClick={clickHandler}>
      Sign up
    </button>
  );
}
