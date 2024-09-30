import { cloneElement, type VNode } from 'preact';
import { SignOutOptions } from '../deps.ts';
import { useClerkProvider } from '../hooks/mod.ts';

type SignOutButtonProps = SignOutOptions & {
  children?: VNode;
};

export default function SignUpButton(props: SignOutButtonProps) {
  const { clerk } = useClerkProvider();

  const { redirectUrl = '/', sessionId, children, ...rest } = props;

  function clickHandler() {
    if (!clerk.value) {
      console.log('no clerk')
      return;
    }

    console.log('Signing out')
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
