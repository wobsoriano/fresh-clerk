import { useContext } from 'preact/hooks';
import {
  ClerkContext,
  type ClerkContextType,
} from '../islands/ClerkProvider.tsx';

export function useClerkContext(): ClerkContextType {
  const ctx = useContext(ClerkContext);

  if (!ctx) {
    throw new Error('useClerkContext() must be used within a <ClerkProvider>');
  }

  return ctx;
}
