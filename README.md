# fresh_clerk

## Installation

Fresh Clerk is available on [deno.land/x](https://deno.land/x/fresh_clerk/). To
use it, import into a module:

```ts
import { clerkPlugin } from 'https://deno.land/x/fresh_clerk/mod.ts';
```

or via import map inside `deno.json`:

```json
{
  "imports": {
    "$clerk/": "https://deno.land/x/fresh_clerk/"
  }
}
```

## Set environment variables

```sh
PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxx
```

## Install plugin

Inside your `fresh.config.ts` file, add the following:

```ts
import { clerkPlugin } from '$clerk/mod.ts';

export default defineConfig({
  plugins: [clerkPlugin()],
});
```

The plugin will add the Clerk backend SDK middleware and process and bundle the
Clerk frontend islands.

## Add `<ClerkProvider>` to your App wrapper

All Clerk components, islands and hooks must be children of the
`<ClerkProvider>` component, which provides active session and user context.

```ts
// _app.tsx
import { ClerkProvider } from '$clerk/islands/mod.ts';

export default function App({ Component, state }) {
  return (
    {/* html */}
    {/* head */}
    <body>
      <ClerkProvider
        {/* Pass the auth state to enable SSR support */}
        initialState={state.auth}
        publishableKey={Deno.env.get('CLERK_PUBLISHABLE_KEY')}
      >
        <Component />
      </ClerkProvider>
    </body>
    {/* /html */}
  );
}
```

## Components

- `<SignedIn>`
- `<SignedOut>`
- `<Protect>`
- `<SignIn>` (island)
- `<SignUp>` (island)
- `<UserButton>` (island)
- `<UserProfile>` (island)
- `<OrganizationProfile>` (island)
- `<OrganizationSwitcher>` (island)
- `<CreateOrganization>` (island)

## Signals

- `auth` - Auth state.
- `user` - Authenticated
  [user](https://clerk.com/docs/references/javascript/user/user).
- `organization` - Active
  [Organization](https://clerk.com/docs/references/javascript/organization/organization)
  of the authenticated user.
- `session` - [Session](https://clerk.com/docs/references/javascript/session) of
  the authenticated user.
- `clerk` - See
  [`Clerk`](https://clerk.com/docs/references/javascript/clerk/clerk).

Example:

The following example demonstrates how to use the `auth` signal to access the
current auth state, like whether the user is signed in or not. It also
demonstrates a basic example of how you could use the
[`getToken()`](https://clerk.com/docs/references/javascript/session#get-token)
method to retrieve a session token for fetching data from an external resource.

```tsx
import { useClerkContext } from '$clerk/hooks/mod.ts';

export default function SomeIsland() {
  const { auth, session } = useClerkContext();

  async function fetchDataFromExternalResource() {
    const token = await session.value.getToken();
    // Add logic to fetch your data
    return data;
  }

  if (auth.value === undefined) {
    return <div>Loading...</div>;
  }

  if (auth.value === null) {
    return <div>Sign in to view this page</div>;
  }

  return <div>...</div>;
}
```

## Protecting routes

### Client side

Clerk offers Control Components that allow you to protect your pages. These
components are used to control the visibility of your pages based on the user's
authentication state.

```tsx
import { SignedIn, SignedOut, SignOutButton } from '$clerk/components/mod.ts';
import { UserButton } from '$clerk/islands/mod.ts';

export default function Index() {
  return (
    <div>
      <h1>Index Route</h1>
      <SignedIn>
        <p>You are signed in!</p>
        <div>
          <p>View your profile here 👇</p>
          <UserButton />
        </div>
        <div>
          <SignOutButton />
        </div>
      </SignedIn>
      <SignedOut>
        <p>You are signed out</p>
        <div>
          <a href='/sign-in'>Go to Sign in</a>
        </div>
        <div>
          <a href='/sign-up'>Go to Sign up</a>
        </div>
      </SignedOut>
    </div>
  );
}
```

## Server side

To protect your routes, use the `auth` object in your route context's state.
This `auth` object contains a `userId` that you can use to determine if the user
is authenticated.

```tsx
export default function Index(ctx) {
  const { userId } = ctx.state.auth;

  if (!userId) {
    return new Response('', {
      status: 307,
      headers: { Location: '/sign-in' },
    });
  }

  return (
    <div>
      <h1>Index route</h1>
      <p>You are signed in!</p>
    </div>
  );
}
```

## License

MIT
