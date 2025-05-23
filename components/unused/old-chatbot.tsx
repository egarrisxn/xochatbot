// "use client";

// import { type UseChatOptions, useChat } from "@ai-sdk/react";
// import { Chat } from "@/components/ui/chat";

// export function Chatbot(props: { initialMessages?: UseChatOptions["initialMessages"] }) {
//   const { messages, input, handleInputChange, handleSubmit, append, stop, isLoading } =
//     useChat(props);

//   return (
//     <div className="bg-background text-foreground flex h-[500px] w-full p-2 lg:rounded-lg lg:border-2 lg:p-5 lg:shadow-lg">
//       <Chat
//         className="grow"
//         messages={messages}
//         handleSubmit={handleSubmit}
//         input={input}
//         handleInputChange={handleInputChange}
//         isGenerating={isLoading}
//         stop={stop}
//         append={append}
//         suggestions={[
//           "Explain the concept of an API in a way that a 10-year-old would understand.",
//           "Who is the singer of the song Party in the USA and what is their backstory?",
//           "Write a short story about a dog who accidentally becomes the mayor of a small town.",
//         ]}
//       />
//     </div>
//   );
// }
