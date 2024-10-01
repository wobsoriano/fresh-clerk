import { App, fsRoutes, staticFiles } from 'fresh';
import { type State } from './utils.ts';
import { clerkPlugin } from 'fresh-clerk/plugin';

export const app = new App<State>({ root: import.meta.url });
app.use(staticFiles());
clerkPlugin(app);

await fsRoutes(app, {
  loadIsland: (path) => import(`./islands/${path}`),
  loadRoute: (path) => import(`./routes/${path}`),
});

if (import.meta.main) {
  await app.listen();
}
