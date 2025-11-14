import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { CHAT_LIMIT, CHAT_WINDOW } from "@/lib/constants";

/**
 * Initialize the Rate Limiter using Vercel KV (Upstash Redis).
 * It uses the Sliding Window algorithm for smooth rate limiting.
 * The identifier (key) will be the unique user ID from next-auth.
 */
export const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(CHAT_LIMIT, CHAT_WINDOW),
  // Helpful to distinguish these keys in your Redis instance
  prefix: "ratelimit:chat",
});
