import { Ratelimit } from "@upstash/ratelimit";
import { redisClient } from "@/utils/redis";
import {
  MAX_DAILY_USES,
  GLOBAL_RATE_LIMIT_DURATION,
  GLOBAL_RATE_LIMIT_REQUESTS,
} from "@/lib/constants";

// --- Global IP-based Rate Limiter ---
export const globalRatelimit = new Ratelimit({
  redis: redisClient,
  limiter: Ratelimit.slidingWindow(GLOBAL_RATE_LIMIT_REQUESTS, GLOBAL_RATE_LIMIT_DURATION),
  analytics: true,
});

// --- Daily User Limit Check and Increment ---
export async function checkAndIncrementDailyUsage(
  userId: string,
): Promise<{ success: boolean; message?: string }> {
  const today = new Date().toISOString().slice(0, 10);
  const userDailyUseKey = `user:${userId}:daily_uses:${today}`;

  const currentDailyUsesStr = await redisClient.get<string>(userDailyUseKey);
  const currentDailyUses = currentDailyUsesStr ? parseInt(currentDailyUsesStr) : 0;

  if (currentDailyUses >= MAX_DAILY_USES) {
    return {
      success: false,
      message: `You have reached your daily limit of ${MAX_DAILY_USES} AI messages. Please try again tomorrow.`,
    };
  }

  // Increment daily usage count
  const newDailyUses = await redisClient.incr(userDailyUseKey);

  // Set expiry for just after midnight UTC if it's the first use today
  if (newDailyUses === 1) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Set to midnight (00:00:00) of the next day
    const secondsUntilTomorrow = Math.floor((tomorrow.getTime() - Date.now()) / 1000);
    await redisClient.expire(userDailyUseKey, secondsUntilTomorrow);
  }

  return { success: true };
}
