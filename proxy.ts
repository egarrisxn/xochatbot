import type { NextRequest } from "next/server";
import { auth } from "@/auth";

// Default export forwards the incoming request to your existing `auth` handler.
// This mirrors the previous `export { auth as middleware }` approach but uses
// an explicit default function named `proxy` which some Next versions expect.
export default function proxy(request: NextRequest) {
  // auth has multiple overloads; cast to any so we can forward the NextRequest
  return (auth as any)(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
