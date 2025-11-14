/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { CHAT_LIMIT } from "@/lib/constants";
import { ratelimit } from "@/lib/rate-limiter";
import type { Ratelimit } from "@upstash/ratelimit";

export const runtime = "edge";

export async function GET(_req: NextRequest) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({
      limit: CHAT_LIMIT,
      remaining: CHAT_LIMIT,
      reset: Date.now() + 86400000, // Placeholder reset (e.g., 24 hours in ms)
    });
  }

  const identifier = session.user.id;

  // The 'limit' value is fixed at the Ratelimit instance creation.
  const { remaining, reset } = await (ratelimit as Ratelimit).getRemaining(
    identifier
  );

  // Use the imported CHAT_LIMIT constant for the `limit` value
  return NextResponse.json({
    limit: CHAT_LIMIT, // Use the constant as the total limit
    remaining,
    reset,
  });
}
