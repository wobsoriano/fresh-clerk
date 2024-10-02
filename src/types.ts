import type { Clerk, ClerkOptions, ClientResource, Without } from './deps.ts';

export interface HeadlessBrowserClerk extends Clerk {
  load: (opts?: Without<ClerkOptions, 'isSatellite'>) => Promise<void>;
  updateClient: (client: ClientResource) => void;
}

export interface BrowserClerk extends HeadlessBrowserClerk {
  onComponentsReady: Promise<void>;
  components: unknown;
}

/**
 * Types that are not yet defined or need to be fixed.
 */
export type FixMe = any;
