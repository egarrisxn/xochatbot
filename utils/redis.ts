import { Redis } from "@upstash/redis";

declare global {
  var redisClient: Redis | undefined;
}

let redisClient: Redis;

const UPSTASH_REST_URL = process.env.KV_REST_API_URL;
const UPSTASH_REST_TOKEN = process.env.KV_REST_API_TOKEN;

if (!UPSTASH_REST_URL || !UPSTASH_REST_TOKEN) {
  console.error(
    "Missing KV_REST_API_URL or KV_REST_API_TOKEN environment variables. Redis client will not connect."
  );
}

if (process.env.NODE_ENV === "production") {
  redisClient = new Redis({
    url: UPSTASH_REST_URL!,
    token: UPSTASH_REST_TOKEN!,
  });
} else {
  if (!global.redisClient) {
    global.redisClient = new Redis({
      url: UPSTASH_REST_URL!,
      token: UPSTASH_REST_TOKEN!,
    });
  }
  redisClient = global.redisClient;
}

export { redisClient };

// import { Redis } from "@upstash/redis";

// export const redisClient = new Redis({
//   url: process.env.KV_REST_API_URL!,
//   token: process.env.KV_REST_API_TOKEN!,
// });
