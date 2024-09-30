import { UserButton } from '../../islands/mod.ts';
import CustomSignOutButton from '../islands/CustomSignOutButton.tsx';

export default function Page() {
  return (
    <div>
      <UserButton />
      <CustomSignOutButton />
    </div>
  );
}
