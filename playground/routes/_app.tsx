import { type PageProps } from 'fresh';
import { ClerkProvider } from 'fresh-clerk/islands';
import { State } from 'fresh-clerk/server';
import { buildClerkProps } from 'fresh-clerk/utils';

export default function App({ Component, state }: PageProps<State>) {
  return (
    <html>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>fresh-clerk-project</title>
        <link rel='stylesheet' href='/styles.css' />
      </head>
      <body>
        <ClerkProvider
          {...buildClerkProps(state)}
          publishableKey={Deno.env.get('CLERK_PUBLISHABLE_KEY')!}
        >
          <Component />
        </ClerkProvider>
      </body>
    </html>
  );
}
