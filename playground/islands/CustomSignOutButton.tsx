import { SignOutButton } from 'fresh-clerk/islands';

export default function CustomSignOutButton() {
  return (
    <SignOutButton>
      <button>Sign out from Clerk</button>
    </SignOutButton>
  );
}
