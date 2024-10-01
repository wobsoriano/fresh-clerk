import { UserButton } from 'fresh-clerk/islands';
import CustomSignOutButton from '../islands/CustomSignOutButton.tsx';
import { FreshContext } from 'fresh';
import { State } from 'fresh-clerk/server';
import { define } from '../utils.ts';

export default define.page(function Page(ctx: FreshContext<State>) {
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
});
