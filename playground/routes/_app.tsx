import { ClerkProvider } from 'fresh-clerk/islands';
import { buildClerkProps } from 'fresh-clerk/server';
import { define } from '../utils.ts';

export default define.page(function App({ Component, state }) {
  return (
    <html>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>fresh-clerk-project</title>
        <link rel='stylesheet' href='/styles.css' />
      </head>
      <body>
        <ClerkProvider {...buildClerkProps(state)}>
          <Component />
        </ClerkProvider>
      </body>
    </html>
  );
});
