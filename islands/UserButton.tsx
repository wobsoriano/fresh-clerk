import type { UserButtonProps } from '../deps.ts';
import { Portal } from './uiComponents.tsx';

export default function UserButton(props: UserButtonProps) {
  return (
    <Portal
      component='UserButton'
      props={props}
    />
  );
}
