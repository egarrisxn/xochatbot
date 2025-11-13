import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // Node.js logic goes here (e.g., logging, saving to DB)
  console.log("Received chat message on Node.js runtime:", body);

  // Send back a placeholder JSON response
  return NextResponse.json(
    {
      status: "success",
      message: "Message processed by Next.js Route Handler.",
    },
    { status: 200 }
  );
}

// import { xai } from "@ai-sdk/xai";
// import { streamText } from "ai";
// import { auth } from "@/auth";
// import { chatRequestSchema } from "@/lib/schemas";
// import { globalRatelimit, checkAndIncrementDailyUsage } from "@/utils/rate-limiters";

// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const session = await auth();
//   if (!session || !session.user || !session.user.id) {
//     return new Response("Unauthorized", { status: 401 });
//   }

//   const userId = session.user.id;

//   // --- Global IP-based Rate Limiting ---
//   const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
//   const { success: globalRateLimitSuccess } = await globalRatelimit.limit(
//     `global_chat_rate_limit_${ip}`,
//   );

//   if (!globalRateLimitSuccess) {
//     return new Response("Too many requests from this IP. Please try again later.", { status: 429 });
//   }

//   // --- Daily User Limit Check ---
//   const { success: dailyLimitSuccess, message: dailyLimitMessage } =
//     await checkAndIncrementDailyUsage(userId);
//   if (!dailyLimitSuccess) {
//     return new Response(dailyLimitMessage, { status: 429 });
//   }

//   // --- Input Validation ---
//   const body = await req.json();
//   const validationResult = chatRequestSchema.safeParse(body);
//   if (!validationResult.success) {
//     return new Response(
//       JSON.stringify({ error: "Invalid input", details: validationResult.error.issues }),
//       {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       },
//     );
//   }
//   const { messages } = validationResult.data;

//   // --- AI Model Configuration ---
//   const xaiApiKey = process.env.XAI_API_KEY;

//   if (!xaiApiKey) {
//     console.error("XAI_API_KEY environment variable is not configured.");
//     return new Response("Server configuration error: AI key missing.", { status: 500 });
//   }

//   // --- AI Stream Logic ---
//   try {
//     const result = streamText({
//       model: xai("grok-3-mini"),
//       messages,
//     });

//     return result.toDataStreamResponse();
//   } catch (error) {
//     console.error("Error streaming from xAI:", error);
//     return new Response("Error processing your request with the AI model.", { status: 500 });
//   }
// }
