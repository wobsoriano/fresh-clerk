import type { VNode } from 'preact';
import type {
  Clerk,
  ClerkOptions,
  ClientResource,
  LoadedClerk,
  Without,
} from './deps.ts';

export interface HeadlessBrowserClerk extends Clerk {
  load: (opts?: Without<ClerkOptions, 'isSatellite'>) => Promise<void>;
  updateClient: (client: ClientResource) => void;
}

export interface BrowserClerk extends HeadlessBrowserClerk {
  onComponentsReady: Promise<void>;
  components: unknown;
}

export type PropsWithChildren<P> = P & { children?: VNode };

export type WithClerkProp<T = unknown> = T & { clerk: LoadedClerk };
