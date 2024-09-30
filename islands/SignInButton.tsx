import { cloneElement, type JSX, type VNode } from 'preact';
import { SignInProps } from '../deps.ts';
import { useClerkProvider } from '../hooks/mod.ts';

type ButtonProps = {
  mode?: 'redirect' | 'modal';
  children?: VNode;
};

export type SignInButtonProps =
  & ButtonProps
  & Pick<
    SignInProps,
    | 'fallbackRedirectUrl'
    | 'forceRedirectUrl'
    | 'signUpForceRedirectUrl'
    | 'signUpFallbackRedirectUrl'
  >;

export default function SignInButton(props: SignInButtonProps): JSX.Element {
  const { clerk } = useClerkProvider();
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
