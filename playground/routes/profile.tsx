import { UserButton } from 'fresh-clerk/islands';
import CustomSignOutButton from '../islands/CustomSignOutButton.tsx';
import { define } from '../utils.ts';

export const handler = define.handlers({
  GET(ctx) {
    if (!ctx.state.auth.userId) {
      return ctx.redirect('/sign-in');
    }

    return {
      data: {},
    };
  },
});

export default define.page<typeof handler>(function Page() {
  return (
    <div>
      <UserButton />
      <CustomSignOutButton />
    </div>
  );
});
