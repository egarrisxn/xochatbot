"use client";

import React, { useMemo } from "react";
import { Code2, Loader2, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilePreview } from "@/components/ui/file-preview";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { chatBubbleVariants } from "@/lib/utils";
import type { ToolCall, ChatMessageProps } from "@/types";

export const ChatMessage = ({
  role,
  content,
  createdAt,
  showTimeStamp = false,
  animation = "scale",
  actions,
  className,
  experimental_attachments,
  toolInvocations,
}: ChatMessageProps) => {
  const files = useMemo(() => {
    return experimental_attachments?.map((attachment) => {
      const dataArray = dataUrlToUint8Array(attachment.url);
      const file = new File([dataArray], attachment.name ?? "Unknown");
      return file;
    });
  }, [experimental_attachments]);

  if (toolInvocations && toolInvocations.length > 0) {
    return <ToolCall toolInvocations={toolInvocations} />;
  }

  const isUser = role === "user";

  const formattedTime = createdAt?.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
      {files ? (
        <div className="mb-1 flex flex-wrap gap-2">
          {files.map((file, index) => {
            return <FilePreview file={file} key={index} />;
          })}
        </div>
      ) : null}

      <div className={cn(chatBubbleVariants({ isUser, animation }), className)}>
        <div>
          <MarkdownRenderer>{content}</MarkdownRenderer>
        </div>

        {role === "assistant" && actions ? (
          <div className="bg-background text-foreground absolute right-2 -bottom-4 flex space-x-1 rounded-lg border p-1 opacity-0 transition-opacity group-hover/message:opacity-100">
            {actions}
          </div>
        ) : null}
      </div>

      {showTimeStamp && createdAt ? (
        <time
          dateTime={createdAt.toISOString()}
          className={cn(
            "mt-1 block px-1 text-xs opacity-50",
            animation !== "none" && "animate-in fade-in-0 duration-500",
          )}
        >
          {formattedTime}
        </time>
      ) : null}
    </div>
  );
};

function dataUrlToUint8Array(data: string) {
  const base64 = data.split(",")[1];
  const buf = Buffer.from(base64, "base64");
  return new Uint8Array(buf);
}

function ToolCall({ toolInvocations }: Pick<ChatMessageProps, "toolInvocations">) {
  if (!toolInvocations?.length) return null;

  return (
    <div className="flex flex-col items-start gap-2">
      {toolInvocations.map((invocation, index) => {
        switch (invocation.state) {
          case "partial-call":
          case "call":
            return (
              <div
                key={index}
                className="bg-muted text-muted-foreground flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
              >
                <Terminal className="size-4" />
                <span>Calling {invocation.toolName}...</span>
                <Loader2 className="size-3 animate-spin" />
              </div>
            );
          case "result":
            return (
              <div
                key={index}
                className="bg-muted flex flex-col gap-1.5 rounded-lg border px-3 py-2 text-sm"
              >
                <div className="text-muted-foreground flex items-center gap-2">
                  <Code2 className="size-4" />
                  <span>Result from {invocation.toolName}</span>
                </div>
                <pre className="text-foreground overflow-x-auto whitespace-pre-wrap">
                  {JSON.stringify(invocation.result, null, 2)}
                </pre>
              </div>
            );
        }
      })}
    </div>
  );
}
