import { useContext, useRef } from "preact/hooks";
import { useSignalEffect } from "@preact/signals";
import { ClerkContext } from "./ClerkProvider.tsx";

export default function UserButton() {
  const ctx = useContext(ClerkContext);
  const el = useRef<HTMLDivElement>(null!);

  if (!ctx) {
    throw new Error("UserButton must be used within a ClerkProvider");
  }

  useSignalEffect(() => {
    if (ctx.loaded.value) {
      ctx.clerk.value?.mountUserButton(el.current);
    }
  });

  return <div ref={el} />;
}
