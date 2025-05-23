"use client";

import { forwardRef, useCallback, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useChat } from "@ai-sdk/react";
import { ArrowDown, ThumbsDown, ThumbsUp } from "lucide-react";
import { MAX_DAILY_USES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { Button } from "@/components/ui/button";
import { MessageInput } from "@/components/ui/message-input";
import { MessageList } from "@/components/ui/message-list";
import { PromptSuggestions } from "@/components/ui/prompt-suggestions";
import { CopyButton } from "@/components/copy-button";
import type {
  Message,
  ChatPropsWithSuggestions,
  AuthenticatedChatContentProps,
  ChatFormProps,
} from "@/types";

function AuthenticatedChatContent({
  className,
  onRateResponse,
  suggestions,
  session,
}: AuthenticatedChatContentProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, append, stop } =
    useChat({
      api: "/api/chat",
      onError: (err) => {
        console.error("Chat error:", err);
        if (err.message.includes("429")) {
          setStatusMessage("You've reached your daily message limit. Please try again tomorrow.");
        } else {
          setStatusMessage(`Error: ${err.message}`);
        }
      },
      onFinish: () => {
        fetchDailyUses();
      },
    });

  const [dailyUsesRemaining, setDailyUsesRemaining] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const fetchDailyUses = useCallback(async () => {
    if (session?.user?.email) {
      try {
        const res = await fetch("/api/usage");
        if (res.ok) {
          const data = await res.json();
          setDailyUsesRemaining(data.remainingUses);
        } else {
          console.error("Failed to fetch daily uses:", res.statusText);
          setStatusMessage("Failed to load daily usage data.");
        }
      } catch (err) {
        console.error("Error fetching daily uses:", err);
        setStatusMessage("Error connecting to usage service.");
      }
    }
  }, [session?.user?.email, setDailyUsesRemaining, setStatusMessage]);

  useEffect(() => {
    fetchDailyUses();
  }, [fetchDailyUses]);

  const isDailyLimitReached = dailyUsesRemaining !== null && dailyUsesRemaining <= 0;
  const isGenerating = isLoading;

  const lastMessage = messages.at(-1);
  const isEmpty = messages.length === 0;
  const isTyping = lastMessage?.role === "user";

  const messageOptions = useCallback(
    (message: Message) => ({
      actions: onRateResponse ? (
        <>
          <div className="border-r pr-1">
            <CopyButton content={message.content} copyMessage="Copied response to clipboard!" />
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="size-6"
            onClick={() => onRateResponse(message.id, "thumbs-up")}
          >
            <ThumbsUp className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="size-6"
            onClick={() => onRateResponse(message.id, "thumbs-down")}
          >
            <ThumbsDown className="size-4" />
          </Button>
        </>
      ) : (
        <CopyButton content={message.content} copyMessage="Copied response to clipboard!" />
      ),
    }),
    [onRateResponse],
  );

  return (
    <ChatContainer className={className}>
      {dailyUsesRemaining !== null && (
        <p className="mb-2 text-center text-sm text-gray-500">
          Daily messages remaining: {dailyUsesRemaining} / {MAX_DAILY_USES}
        </p>
      )}

      {statusMessage && (
        <p className={`mb-2 text-center text-sm ${error ? "text-red-500" : "text-blue-500"}`}>
          {statusMessage}
        </p>
      )}

      {isEmpty && suggestions && suggestions.length > 0 ? (
        <PromptSuggestions label="Sample Prompts ✨" append={append} suggestions={suggestions} />
      ) : null}

      {messages.length > 0 ? (
        <ChatMessages messages={messages}>
          <MessageList messages={messages} isTyping={isTyping} messageOptions={messageOptions} />
        </ChatMessages>
      ) : null}

      <ChatForm className="mt-auto" handleSubmit={handleSubmit}>
        {({ files, setFiles }) => (
          <MessageInput
            value={input}
            onChange={handleInputChange}
            allowAttachments
            files={files}
            setFiles={setFiles}
            stop={stop}
            isGenerating={isGenerating}
            placeholder={
              isDailyLimitReached ? "Daily limit reached. Try tomorrow!" : "Say something..."
            }
            disabled={isDailyLimitReached}
          />
        )}
      </ChatForm>

      {error && !statusMessage && (
        <p className="error mt-2 text-center text-sm text-red-500">{error.message}</p>
      )}
    </ChatContainer>
  );
}

export function Chat({ className, onRateResponse, suggestions }: ChatPropsWithSuggestions) {
  const { data: session, status: sessionStatus } = useSession();

  if (sessionStatus === "loading") {
    return <p className="mt-4 text-center text-lg">Loading chat session...</p>;
  }

  if (sessionStatus === "unauthenticated") {
    return <p className="mt-4 text-center text-lg">Please sign in to use the chat.</p>;
  }

  return (
    <AuthenticatedChatContent
      className={className}
      onRateResponse={onRateResponse}
      suggestions={suggestions}
      session={session}
    />
  );
}
Chat.displayName = "Chat";

export function ChatMessages({
  messages,
  children,
}: React.PropsWithChildren<{
  messages: Message[];
}>) {
  const { containerRef, scrollToBottom, handleScroll, shouldAutoScroll, handleTouchStart } =
    useAutoScroll([messages]);

  return (
    <div
      className="grid grid-cols-1 overflow-y-auto pb-4"
      ref={containerRef}
      onScroll={handleScroll}
      onTouchStart={handleTouchStart}
    >
      <div className="[grid-column:1/1] [grid-row:1/1] max-w-full">{children}</div>

      <div className="[grid-column:1/1] [grid-row:1/1] flex flex-1 items-end justify-end">
        {!shouldAutoScroll && (
          <div className="sticky bottom-0 left-0 flex w-full justify-end">
            <Button
              onClick={scrollToBottom}
              className="animate-in fade-in-0 slide-in-from-bottom-1 size-8 rounded-full ease-in-out"
              size="icon"
              variant="ghost"
            >
              <ArrowDown className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export const ChatContainer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("grid max-h-full w-full grid-rows-[1fr_auto]", className)}
        {...props}
      />
    );
  },
);
ChatContainer.displayName = "ChatContainer";

export const ChatForm = forwardRef<HTMLFormElement, ChatFormProps>(
  ({ children, handleSubmit, className }, ref) => {
    const [files, setFiles] = useState<File[] | null>(null);

    const onSubmit = (event: React.FormEvent) => {
      if (!files) {
        handleSubmit(event);
        return;
      }

      const fileList = createFileList(files);
      handleSubmit(event, { experimental_attachments: fileList });
      setFiles(null);
    };

    return (
      <form ref={ref} onSubmit={onSubmit} className={className}>
        {children({ files, setFiles })}
      </form>
    );
  },
);
ChatForm.displayName = "ChatForm";

function createFileList(files: File[] | FileList): FileList {
  const dataTransfer = new DataTransfer();
  for (const file of Array.from(files)) {
    dataTransfer.items.add(file);
  }
  return dataTransfer.files;
}
