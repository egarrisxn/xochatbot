import { type ModelMessage } from "ai";
import { z } from "zod";

export const userMessageSchema = z.object({
  role: z.literal("user"),
  content: z.string().min(1, "Message content cannot be empty."),
  tool_calls: z.undefined().optional(),
  tool_results: z.undefined().optional(),
});

export const assistantMessageSchema = z.object({
  role: z.literal("assistant"),
  content: z.string().optional(),
  tool_calls: z
    .array(
      z.object({
        id: z.string(),
        type: z.literal("tool_call").optional(),
        tool_name: z.string(),
        args: z.record(z.string(), z.any()),
      })
    )
    .optional(),
  tool_results: z.undefined().optional(),
});

export const systemMessageSchema = z.object({
  role: z.literal("system"),
  content: z.string().min(1, "Message content cannot be empty."),
  tool_calls: z.undefined().optional(),
  tool_results: z.undefined().optional(),
});

export const toolMessageSchema = z.object({
  role: z.literal("tool"),
  tool_call_id: z.string().min(1, "Tool call ID cannot be empty."),
  content: z
    .array(
      z.union([
        z.object({
          type: z.literal("tool_result"),
          tool_call_id: z.string(),
          result: z.any(),
        }),
        z.object({
          type: z.literal("tool_call"),
          id: z.string(),
          tool_name: z.string(),
          args: z.record(z.string(), z.any()),
        }),
      ])
    )
    .optional(),
  result: z.undefined().optional(),
  tool_calls: z.undefined().optional(),
  tool_results: z.undefined().optional(),
});

export const aiSdkMessageSchema: z.ZodType<ModelMessage> = z.union([
  userMessageSchema,
  assistantMessageSchema,
  systemMessageSchema,
  toolMessageSchema,
]) as z.ZodType<ModelMessage>;

export const chatRequestSchema = z.object({
  messages: z
    .array(aiSdkMessageSchema)
    .min(1, "Messages array cannot be empty."),
});
