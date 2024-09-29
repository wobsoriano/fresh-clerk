import { createClerkClient } from '../deps.ts';
import { API_URL, API_VERSION, JWT_KEY, SECRET_KEY } from './constants.ts';

export const clerkClient = createClerkClient({
  secretKey: SECRET_KEY,
  apiUrl: API_URL,
  apiVersion: API_VERSION,
  jwtKey: JWT_KEY,
});
