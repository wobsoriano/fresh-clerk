import { defineConfig } from '$fresh/server.ts';
import { clerkPlugin } from '../plugin.ts';

export default defineConfig({
  plugins: [clerkPlugin()],
});
