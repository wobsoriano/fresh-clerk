import { ClerkClient, createClerkClient } from '../deps.ts';
import { API_URL, API_VERSION, JWT_KEY, SECRET_KEY } from './constants.ts';

/**
 * Clerk JavaScript Backend SDK client instance
 * @see {@link https://clerk.com/docs/references/backend/overview JavaScript Backend SDK}
 */
export const clerkClient: ClerkClient = createClerkClient({
  secretKey: SECRET_KEY,
  apiUrl: API_URL,
  apiVersion: API_VERSION,
  jwtKey: JWT_KEY,
});
