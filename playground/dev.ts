#!/usr/bin/env -S deno run -A --watch=playground/static/,playground/routes/

import { Builder } from 'fresh/dev';
import { app } from './main.ts';

const builder = new Builder();

if (Deno.args.includes('build')) {
  await builder.build(app);
} else {
  await builder.listen(app);
}
