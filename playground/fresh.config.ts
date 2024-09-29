import { defineConfig } from '$fresh/server.ts';
import { clerkPlugin } from 'src/plugin.ts';

export default defineConfig({
  plugins: [clerkPlugin()],
});
