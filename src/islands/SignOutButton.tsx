import { cloneElement, type JSX } from 'preact';
import { SignOutOptions } from '../deps.ts';
import { useClerkContext } from '../hooks/mod.ts';
import type { ButtonProps } from '../types.ts';

type SignOutButtonProps = SignOutOptions & Omit<ButtonProps, 'mode'>;

/**
 * The `<SignUpButton>` component is a button that links to the sign-up page or displays the sign-up modal.
 *
 * @see {@link https://clerk.com/docs/components/unstyled/sign-up-button}
 */
export default function SignOutButton(props: SignOutButtonProps): JSX.Element {
  const { clerk } = useClerkContext();

  const { redirectUrl = '/', sessionId, children, ...rest } = props;

  function clickHandler() {
    if (!clerk.value) {
      return;
    }

    return clerk.value.signOut({ redirectUrl, sessionId });
  }

  if (children) {
    return cloneElement(children, {
      ...rest,
      onClick: clickHandler,
    });
  }

  return (
    <button {...rest} onClick={clickHandler}>
      Sign out
    </button>
  );
}
