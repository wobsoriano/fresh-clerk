import { FreshContext } from 'fresh';
import { SignIn } from 'src/islands/mod.ts';
import { State } from 'src/server/mod.ts';
import { define } from '../utils.ts';

export default define.page(function Page(ctx: FreshContext<State>) {
  if (ctx.state.auth.userId) {
    return new Response('', {
      status: 307,
      headers: { Location: '/profile' },
    });
  }

  return (
    <div style={{ display: 'flex' }}>
      <SignIn />
    </div>
  );
});
