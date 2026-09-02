"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

// SessionProvider usa Context/hooks do React, então precisa ser um client
// component. O layout raiz (app/layout.tsx) é um server component, então
// esse arquivo existe só pra fazer essa "ponte".
export default function SessionProviderWrapper({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
