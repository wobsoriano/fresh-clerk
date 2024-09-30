import { cloneElement, type JSX, type VNode } from 'preact';
import { SignOutOptions } from '../deps.ts';
import { useClerkContext } from '../hooks/mod.ts';

type SignOutButtonProps = SignOutOptions & {
  children?: VNode;
};

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
