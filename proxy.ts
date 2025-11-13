import type { NextRequest } from "next/server";
import { auth } from "@/auth";

export default function proxy(request: NextRequest) {
  return (auth as any)(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
