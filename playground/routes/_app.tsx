import { type PageProps } from '$fresh/server.ts';
import ClerkProvider from '../../islands/ClerkProvider.tsx';

export default function App({ Component, state }: PageProps) {
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
          initialState={state.auth}
          publishableKey={Deno.env.get('CLERK_PUBLISHABLE_KEY')}
        >
          <Component />
        </ClerkProvider>
      </body>
    </html>
  );
}
