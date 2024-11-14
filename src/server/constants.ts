export const API_VERSION: string = Deno.env.get('CLERK_API_VERSION') || 'v1';
export const SECRET_KEY: string = Deno.env.get('CLERK_SECRET_KEY') || '';
export const PUBLISHABLE_KEY: string = Deno.env.get('CLERK_PUBLISHABLE_KEY') ||
  '';
export const API_URL: string = Deno.env.get('CLERK_API_URL') || 'https://api.clerk.com';
export const JWT_KEY: string = Deno.env.get('CLERK_JWT_KEY') || '';
