"use client";

import { ClerkProvider, RedirectToSignIn, useUser } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={() => {
        const { isSignedIn } = useUser();
        return { isSignedIn };
      }}>
        <UserWrapper>
          {children}
        </UserWrapper>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

const UserWrapper = ({ children }: { children: ReactNode }) => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return <div style={{ height: '100vh', width: '100vw' }}>{children}</div>;
};
