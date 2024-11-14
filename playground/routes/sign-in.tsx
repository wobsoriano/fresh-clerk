import { SignIn } from 'fresh-clerk/islands';
import { define } from '../utils.ts';

export const handler = define.handlers({
  GET(ctx) {
    if (ctx.state.auth.userId) {
      return ctx.redirect('/profile');
    }

    return {
      data: {},
    };
  },
});

export default define.page(function Page() {
  return (
    <div>
      <SignIn />
    </div>
  );
});
