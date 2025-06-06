// "use client";

// import { type ReactElement, forwardRef, useCallback, useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useChat } from "@ai-sdk/react";
// import { ArrowDown, ThumbsDown, ThumbsUp } from "lucide-react";
// import { MAX_DAILY_USES } from "@/lib/constants";
// import { cn } from "@/lib/utils";
// import { useAutoScroll } from "@/hooks/use-auto-scroll";
// import { Button } from "@/components/ui/button";
// import { MessageInput } from "@/components/ui/message-input";
// import { MessageList } from "@/components/ui/message-list";
// import { PromptSuggestions } from "@/components/ui/prompt-suggestions";
// import { CopyButton } from "@/components/copy-button";
// import type { Message } from "@/components/ui/chat-message";

// interface ChatPropsBase {
//   handleSubmit: (
//     event?: { preventDefault?: () => void },
//     options?: { experimental_attachments?: FileList },
//   ) => void;
//   messages: Array<Message>;
//   input: string;
//   className?: string;
//   handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement>;
//   isGenerating: boolean;
//   stop?: () => void;
//   onRateResponse?: (messageId: string, rating: "thumbs-up" | "thumbs-down") => void;
// }

// interface ChatPropsWithoutSuggestions extends ChatPropsBase {
//   append?: never;
//   suggestions?: never;
// }

// interface ChatPropsWithSuggestions extends ChatPropsBase {
//   append: (message: { role: "user"; content: string }) => void;
//   suggestions: string[];
// }

// export function Chat({
//   className,
//   onRateResponse,
// }: ChatPropsWithoutSuggestions | ChatPropsWithSuggestions) {
//   const { data: session } = useSession();
//   const [dailyUsesRemaining, setDailyUsesRemaining] = useState<number | null>(null);
//   const [statusMessage, setStatusMessage] = useState("");

//   const { messages, input, handleInputChange, handleSubmit, isLoading, error, append, stop } =
//     useChat({
//       api: "/api/chat",
//       onError: (err) => {
//         console.error("Chat error:", err);
//         // Check for 429 status code for rate limiting
//         if (err.message.includes("429")) {
//           setStatusMessage("You've reached your daily message limit. Please try again tomorrow.");
//         } else {
//           setStatusMessage(`Error: ${err.message}`);
//         }
//       },
//       onFinish: () => {
//         // Fetch updated daily uses after each chat interaction
//         fetchDailyUses();
//       },
//     });

//   const fetchDailyUses = async () => {
//     if (session) {
//       try {
//         const res = await fetch("/api/usage");
//         if (res.ok) {
//           const data = await res.json();
//           // Update state with remainingUses from the backend
//           setDailyUsesRemaining(data.remainingUses);
//         } else {
//           console.error("Failed to fetch daily uses:", res.statusText);
//           setStatusMessage("Failed to load daily usage data.");
//         }
//       } catch (err) {
//         console.error("Error fetching daily uses:", err);
//         setStatusMessage("Error connecting to usage service.");
//       }
//     }
//   };

//   // Fetch daily uses when the session changes or component mounts
//   useEffect(() => {
//     fetchDailyUses();
//   }, [session]);

//   // If not signed in, display a message
//   if (!session) {
//     return <p>Please sign in to use the chat.</p>;
//   }

//   // Determine if the user has exhausted their daily limit
//   const isDailyLimitReached = dailyUsesRemaining !== null && dailyUsesRemaining <= 0;
//   const isGenerating = isLoading; // Alias for clarity with existing Chat component props

//   const lastMessage = messages.at(-1);
//   const isEmpty = messages.length === 0;
//   const isTyping = lastMessage?.role === "user";

//   const messageOptions = useCallback(
//     (message: Message) => ({
//       actions: onRateResponse ? (
//         <>
//           <div className="border-r pr-1">
//             <CopyButton content={message.content} copyMessage="Copied response to clipboard!" />
//           </div>
//           <Button
//             size="icon"
//             variant="ghost"
//             className="size-6"
//             onClick={() => onRateResponse(message.id, "thumbs-up")}
//           >
//             <ThumbsUp className="size-4" />
//           </Button>
//           <Button
//             size="icon"
//             variant="ghost"
//             className="size-6"
//             onClick={() => onRateResponse(message.id, "thumbs-down")}
//           >
//             <ThumbsDown className="size-4" />
//           </Button>
//         </>
//       ) : (
//         <CopyButton content={message.content} copyMessage="Copied response to clipboard!" />
//       ),
//     }),
//     [onRateResponse],
//   );

//   return (
//     <ChatContainer className={className}>
//       {/* Display daily uses remaining */}
//       {dailyUsesRemaining !== null && (
//         <p className="mb-2 text-center text-sm text-gray-500">
//           Daily messages remaining: {dailyUsesRemaining} / {MAX_DAILY_USES}
//         </p>
//       )}

//       {/* Display status messages */}
//       {statusMessage && (
//         <p className={`text-center text-sm ${error ? "text-red-500" : "text-blue-500"} mb-2`}>
//           {statusMessage}
//         </p>
//       )}

//       {isEmpty && append && (
//         // The original Chat component expects 'suggestions' to be passed as a prop for PromptSuggestions.
//         // We'll need to either define suggestions here or pass them in from a higher component.
//         // For now, let's assume we can provide some dummy suggestions or remove this section if not applicable.
//         // If you intend to use prompt suggestions, you'll need to manage them.
//         // For demonstration, I'm providing a placeholder.
//         <PromptSuggestions
//           label="Sample Prompts ✨"
//           append={append}
//           suggestions={["Tell me about AI.", "What's the weather like?", "Suggest a good book."]}
//         />
//       )}

//       {messages.length > 0 ? (
//         <ChatMessages messages={messages}>
//           <MessageList messages={messages} isTyping={isTyping} messageOptions={messageOptions} />
//         </ChatMessages>
//       ) : null}

//       <ChatForm className="mt-auto" handleSubmit={handleSubmit}>
//         {({ files, setFiles }) => (
//           <MessageInput
//             value={input}
//             onChange={handleInputChange}
//             allowAttachments
//             files={files}
//             setFiles={setFiles}
//             stop={stop}
//             isGenerating={isGenerating}
//             placeholder={
//               isDailyLimitReached ? "Daily limit reached. Try tomorrow!" : "Say something..."
//             }
//             disabled={isDailyLimitReached} // Disable input if limit reached
//           />
//         )}
//       </ChatForm>

//       {/* Display generic error from useChat if not handled by custom onError */}
//       {error && !statusMessage && (
//         <p className="error mt-2 text-center text-sm text-red-500">{error.message}</p>
//       )}
//     </ChatContainer>
//   );
// }
// Chat.displayName = "Chat";

// export function ChatMessages({
//   messages,
//   children,
// }: React.PropsWithChildren<{
//   messages: Message[];
// }>) {
//   const { containerRef, scrollToBottom, handleScroll, shouldAutoScroll, handleTouchStart } =
//     useAutoScroll([messages]);

//   return (
//     <div
//       className="grid grid-cols-1 overflow-y-auto pb-4"
//       ref={containerRef}
//       onScroll={handleScroll}
//       onTouchStart={handleTouchStart}
//     >
//       <div className="[grid-column:1/1] [grid-row:1/1] max-w-full">{children}</div>

//       <div className="[grid-column:1/1] [grid-row:1/1] flex flex-1 items-end justify-end">
//         {!shouldAutoScroll && (
//           <div className="sticky bottom-0 left-0 flex w-full justify-end">
//             <Button
//               onClick={scrollToBottom}
//               className="animate-in fade-in-0 slide-in-from-bottom-1 size-8 rounded-full ease-in-out"
//               size="icon"
//               variant="ghost"
//             >
//               <ArrowDown className="size-4" />
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export const ChatContainer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
//   ({ className, ...props }, ref) => {
//     return (
//       <div
//         ref={ref}
//         className={cn("grid max-h-full w-full grid-rows-[1fr_auto]", className)}
//         {...props}
//       />
//     );
//   },
// );
// ChatContainer.displayName = "ChatContainer";

// interface ChatFormProps {
//   className?: string;
//   handleSubmit: (
//     event?: { preventDefault?: () => void },
//     options?: { experimental_attachments?: FileList },
//   ) => void;
//   children: (props: {
//     files: File[] | null;
//     setFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
//   }) => ReactElement;
// }

// export const ChatForm = forwardRef<HTMLFormElement, ChatFormProps>(
//   ({ children, handleSubmit, className }, ref) => {
//     const [files, setFiles] = useState<File[] | null>(null);

//     const onSubmit = (event: React.FormEvent) => {
//       if (!files) {
//         handleSubmit(event);
//         return;
//       }

//       const fileList = createFileList(files);
//       handleSubmit(event, { experimental_attachments: fileList });
//       setFiles(null);
//     };

//     return (
//       <form ref={ref} onSubmit={onSubmit} className={className}>
//         {children({ files, setFiles })}
//       </form>
//     );
//   },
// );
// ChatForm.displayName = "ChatForm";

// function createFileList(files: File[] | FileList): FileList {
//   const dataTransfer = new DataTransfer();
//   for (const file of Array.from(files)) {
//     dataTransfer.items.add(file);
//   }
//   return dataTransfer.files;
// }
