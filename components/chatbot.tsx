"use client";

import { Chat } from "@/components/ui/chat";

export function Chatbot() {
  return (
    <div className='flex h-[500px] w-full bg-background p-2 text-foreground lg:rounded-lg lg:border-2 lg:p-5 lg:shadow-lg'>
      <Chat
        className='grow'
        suggestions={[
          "Explain the concept of an API in a way that a 10-year-old would understand.",
          "Who is the singer of the song Party in the USA and what is their backstory?",
          "Write a short story about a dog who accidentally becomes the mayor of a small town.",
        ]}
      />
    </div>
  );
}
