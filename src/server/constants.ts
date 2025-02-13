import { getPrivateEnvVariables } from '../utils/getPrivateEnvVariables.ts';
import { getPublicEnvVariables } from '../utils/getPublicEnvVariables.ts';
import { apiUrlFromPublishableKey } from '../deps.ts';

// Public env variables
export const API_VERSION = Deno.env.get('CLERK_API_VERSION') || 'v1';
export const PUBLISHABLE_KEY = getPublicEnvVariables().publishableKey!;
export const API_URL = Deno.env.get(
  'CLERK_API_URL',
) || apiUrlFromPublishableKey(PUBLISHABLE_KEY);
// Private env variables
export const SECRET_KEY = getPrivateEnvVariables().secretKey;
export const JWT_KEY = getPrivateEnvVariables().jwtKey;
