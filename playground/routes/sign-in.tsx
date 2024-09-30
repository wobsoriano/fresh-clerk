import { defineRoute } from '$fresh/server.ts';
import { SignIn } from '../../islands/mod.ts';

export default defineRoute((_req, ctx) => {
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
