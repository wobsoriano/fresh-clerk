import { UserButton } from 'src/islands/mod.ts';
import CustomSignOutButton from '../islands/CustomSignOutButton.tsx';
import { FreshContext } from 'fresh';
import { State } from 'src/server/mod.ts';

export default function Page(ctx: FreshContext<State>) {
  if (!ctx.state.auth.userId) {
    return new Response('', {
      status: 307,
      headers: { Location: '/sign-in' },
    });
  }

  return (
    <div>
      <UserButton />
      <CustomSignOutButton />
    </div>
  );
}
