import { useContext, useRef } from 'preact/hooks';
import { useSignalEffect } from '@preact/signals';
import { ClerkContext } from 'src/islands/ClerkProvider.tsx';

interface SignInProps {
}

export default function SignIn(props: SignInProps) {
  const ctx = useContext(ClerkContext);
  const el = useRef<HTMLDivElement>(null!);

  useSignalEffect(() => {
    if (ctx?.loaded.value) {
      ctx.clerk.value?.mountSignIn(el.current);
    }
  });

  return <div ref={el} />;
}
