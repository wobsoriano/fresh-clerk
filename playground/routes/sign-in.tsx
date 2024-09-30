import { FreshContext } from '$fresh/server.ts';
import { SignIn } from '../../islands/mod.ts';

export default async function Page(_req, ctx: FreshContext) {
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
}
