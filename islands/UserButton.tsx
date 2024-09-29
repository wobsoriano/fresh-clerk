import type { UserButtonProps } from '../deps.ts';
import { Portal } from './uiComponents.tsx';
import { useClerkProvider } from '../hooks/mod.ts';

export default function UserButton(props: UserButtonProps) {
  const { clerk } = useClerkProvider();

  return (
    <Portal
      mount={clerk.value?.mountUserButton}
      unmount={clerk.value?.unmountUserButton}
      props={props}
    />
  );
}
