import { defineConfig } from "$fresh/server.ts";
import { clerkPlugin } from './mod.ts'

export default defineConfig({
  plugins: [clerkPlugin()],
});
