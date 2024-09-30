# fresh-clerk

Community package that integrates Clerk with Deno and
[Fresh](https://fresh.deno.dev/) 🍋

## Installation

Fresh Clerk is available on [JSR](https://jsr.io/@oak/oak). To use it, import
into a module:

```ts
import { clerkPlugin } from 'jsr:@wobsoriano/fresh-clerk';
```

## Set environment variables

```sh
CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxx
```

## Install plugin

Enable the plugin inside your `dev.ts` file:

```ts
import { Builder } from 'fresh/dev';
import { app } from './main.ts';
import { clerkPlugin } from 'jsr:@wobsoriano/fresh-clerk/plugin';

const builder = new Builder();

clerkPlugin(app);
```

The plugin will add a middleware built on top of Clerk backend SDK and process
and bundle the Clerk frontend islands.

## Add `<ClerkProvider>` to your App wrapper

All Clerk components, islands and hooks must be children of the
`<ClerkProvider>` component, which provides active session and user context.

```ts
// _app.tsx
import { ClerkProvider } from 'jsr:@wobsoriano/fresh-clerk/islands';

export default function App({ Component, state }) {
  return (
    {/* html */}
    {/* head */}
    <body>
      <ClerkProvider
        {/* Pass the state to enable SSR support */}
        {...state}
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
- `<SignInButton>` (island)
- `<SignUpButton>` (island)
- `<SignOutButton>` (island)
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
import { useClerkContext } from 'jsr:@wobsoriano/fresh-clerk/hooks';

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
import { SignedIn, SignedOut } from 'jsr:@wobsoriano/fresh-clerk/components';
import { SignOutButton, UserButton } from 'jsr:@wobsoriano/fresh-clerk/islands';

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
export default define.page(function Page(ctx) {
  if (!ctx.state.auth.userId) {
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
});
```

## License

MIT
