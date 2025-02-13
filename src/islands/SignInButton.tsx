import { cloneElement, type JSX } from 'preact';
import { SignInButtonProps, SignInProps } from '../deps.ts';
import { useClerkContext } from '../hooks/mod.ts';
import type { PropsWithChildren } from '../types.ts';

/**
 * The `<SignInButton>` component is a button that links to the sign-in page or displays the sign-in modal.
 *
 * @see {@link https://clerk.com/docs/components/unstyled/sign-in-button}
 */
export default function SignInButton(
  props: PropsWithChildren<SignInButtonProps>,
): JSX.Element {
  const { clerk } = useClerkContext();
  const {
    signUpFallbackRedirectUrl,
    forceRedirectUrl,
    fallbackRedirectUrl,
    signUpForceRedirectUrl,
    mode,
    children,
    ...rest
  } = props;

  const opts: SignInProps = {
    forceRedirectUrl,
    fallbackRedirectUrl,
    signUpFallbackRedirectUrl,
    signUpForceRedirectUrl,
  };

  function clickHandler() {
    if (!clerk.value) {
      return;
    }

    if (mode === 'modal') {
      return clerk.value.openSignIn(opts);
    }
    return clerk.value.redirectToSignIn({
      ...opts,
      signInFallbackRedirectUrl: fallbackRedirectUrl,
      signInForceRedirectUrl: forceRedirectUrl,
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
      Sign in
    </button>
  );
}
