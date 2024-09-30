import { type PageProps } from 'fresh';
import { ClerkProvider } from 'src/islands/mod.ts';
import { State } from 'src/server/mod.ts';

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
          publishableKey={Deno.env.get('CLERK_PUBLISHABLE_KEY')!}
        >
          <Component />
        </ClerkProvider>
      </body>
    </html>
  );
}
