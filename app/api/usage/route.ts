import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { redisClient } from "@/utils/redis";
import { MAX_DAILY_USES } from "@/lib/constants";

export const revalidate = 0;

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const today = new Date().toISOString().slice(0, 10);
    const userDailyUseKey = `user:${userId}:daily_uses:${today}`;

    // --- Get the current usage count ---
    const currentDailyUsesStr = await redisClient.get<string>(userDailyUseKey);
    const currentDailyUses = currentDailyUsesStr
      ? parseInt(currentDailyUsesStr)
      : 0;

    // --- Calculate remaining uses ---
    const remainingUses = MAX_DAILY_USES - currentDailyUses;

    // Return the data in the format your client expects
    return NextResponse.json({
      remainingUses: Math.max(0, remainingUses), // Ensure it doesn't go below 0
      maxUses: MAX_DAILY_USES,
    });
  } catch (error) {
    console.error("Error fetching usage:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//! -------------------------------------------------------

// import { NextResponse } from "next/server";
// import { auth } from "@/auth";
// import { redisClient } from "@/utils/redis";
// import { MAX_DAILY_USES } from "@/lib/constants";

// export async function GET() {
//   const session = await auth();

//   if (!session || !session.user || !session.user.id) {
//     return new Response("Unauthorized", { status: 401 });
//   }

//   const userId = session.user.id;

//   const today = new Date().toISOString().slice(0, 10);
//   const userDailyUseKey = `user:${userId}:daily_uses:${today}`;

//   const currentDailyUsesStr = await redisClient.get<string>(userDailyUseKey);
//   const currentDailyUses = currentDailyUsesStr
//     ? parseInt(currentDailyUsesStr)
//     : 0;

//   return NextResponse.json({
//     remainingUses: Math.max(0, MAX_DAILY_USES - currentDailyUses),
//     maxUses: MAX_DAILY_USES,
//   });
// }

//! -------------------------------------------------------

// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const body = await request.json();

//   console.log("Received usage message on Node.js runtime:", body);

//   return NextResponse.json(
//     {
//       status: "success",
//       message: "Message processed by Next.js Route Handler.",
//     },
//     { status: 200 }
//   );
// }
