import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { redisClient } from "@/utils/redis";
import { MAX_DAILY_USES } from "@/lib/constants";

export async function GET(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _req: Request,
) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = session.user.id;

  const today = new Date().toISOString().slice(0, 10);
  const userDailyUseKey = `user:${userId}:daily_uses:${today}`;

  const currentDailyUsesStr = await redisClient.get<string>(userDailyUseKey);
  const currentDailyUses = currentDailyUsesStr ? parseInt(currentDailyUsesStr) : 0;

  return NextResponse.json({
    remainingUses: Math.max(0, MAX_DAILY_USES - currentDailyUses),
    maxUses: MAX_DAILY_USES,
  });
}
