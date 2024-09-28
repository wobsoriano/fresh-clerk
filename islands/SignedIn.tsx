import { useContext } from "preact/hooks";
import { ClerkContext } from "./ClerkProvider.tsx";
import { ComponentChildren } from "preact";

interface SignedIn {
  children: ComponentChildren
}

export default function SignedIn(props: SignedIn) {
  const ctx = useContext(ClerkContext);

  if (!ctx) {
    throw new Error("<SignedIn> must be used within a <ClerkProvider>");
  }

  if (!ctx.auth.value.userId) {
    return null;
  }

  return (
    <>
      {props.children}
    </>
  );
}
