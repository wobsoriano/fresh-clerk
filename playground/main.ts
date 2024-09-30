import { App, fsRoutes, staticFiles } from 'fresh';
import { type State } from 'src/server/mod.ts';
import { clerkPlugin } from 'src/mod.ts';

export const app = new App<State>();
app.use(staticFiles());
clerkPlugin(app);

await fsRoutes(app, {
  dir: './',
  loadIsland: (path) => import(`./islands/${path}`),
  loadRoute: (path) => import(`./routes/${path}`),
});

if (import.meta.main) {
  await app.listen();
}
