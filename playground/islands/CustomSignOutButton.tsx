import { SignOutButton } from 'src/islands/mod.ts';

export default function CustomSignOutButton() {
  return (
    <SignOutButton>
      <button>Sign out from Clerk</button>
    </SignOutButton>
  );
}
