import { cloneElement, type VNode } from 'preact';
import { SignUpProps } from '../deps.ts';
import { useClerkProvider } from '../hooks/mod.ts';

type ButtonProps = {
  mode?: 'redirect' | 'modal';
  children?: VNode;
};

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

export default function SignUpButton(props: SignUpButtonProps) {
  const { clerk } = useClerkProvider();
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
