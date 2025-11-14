import { NextRequest, NextResponse } from "next/server";
import { convertToModelMessages, stepCountIs, streamText, UIMessage } from "ai";
import { auth } from "@/auth";
import { model, type modelID } from "@/ai/providers";
import { weatherTool } from "@/ai/tools";
import { ratelimit } from "@/lib/rate-limiter";

export const maxDuration = 30;
export const runtime = "edge";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const identifier = session.user.id;

  // Check the rate limit
  const { success, limit, remaining, reset } =
    await ratelimit.limit(identifier);

  // Set response headers for client transparency (optional)
  const headers = {
    "X-RateLimit-Limit": limit.toString(),
    "X-RateLimit-Remaining": remaining.toString(),
    "X-RateLimit-Reset": reset.toString(),
  };

  if (!success) {
    const timeToWait = Math.ceil((reset - Date.now()) / 1000);
    // Rate limit exceeded: return 429 Too Many Requests
    return NextResponse.json(
      {
        error: `Rate limit exceeded. Try again in ${timeToWait} seconds.`,
      },
      { status: 429, headers }
    );
  }

  const {
    messages,
    selectedModel,
  }: { messages: UIMessage[]; selectedModel: modelID } = await req.json();

  const result = streamText({
    model: model.languageModel(selectedModel),
    system: "You are a helpful assistant.",
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5), // Enable multi-step agentic flow
    tools: {
      getWeather: weatherTool,
    },
    experimental_telemetry: {
      isEnabled: false,
    },
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message.includes("Rate limit")) {
          return "Rate limit exceeded. Please try again later.";
        }
      }
      console.error(error);
      return "An error occurred.";
    },
  });
}
