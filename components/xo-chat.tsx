"use client";

import { useChat, type UseChatOptions } from "@ai-sdk/react";
import { Chat } from "@/components/ui/chat";

type ChatBot = {
  initialMessages?: UseChatOptions["initialMessages"];
};

export function XOChat(props: ChatBot) {
  const { messages, input, handleInputChange, handleSubmit, append, stop, isLoading } =
    useChat(props);

  return (
    <div className="flex h-[500px] w-full">
      <Chat
        className="grow"
        messages={messages}
        handleSubmit={handleSubmit}
        input={input}
        handleInputChange={handleInputChange}
        isGenerating={isLoading}
        stop={stop}
        append={append}
        suggestions={[
          "Explain the concept of an API in a way that a 10-year-old would understand.",
          "Who is the singer of the song Party in the USA and what is their backstory?",
          "Write a short story about a dog who accidentally becomes the mayor of a small town.",
        ]}
      />
    </div>
  );
}
