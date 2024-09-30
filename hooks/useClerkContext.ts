import { useContext } from 'preact/hooks';
import { ClerkContext } from '../islands/ClerkProvider.tsx';

export function useClerkContext() {
  const ctx = useContext(ClerkContext);

  if (!ctx) {
    throw new Error('useClerk must be used within a ClerkProvider');
  }

  return ctx;
}
