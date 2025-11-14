"use client";

import { useState, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { toast } from "sonner";
import { defaultModel, type modelID } from "@/ai/providers";
import { UserTextarea } from "@/components/user-textarea";
import { Messages } from "@/components/messages";

interface RateLimit {
  limit: number;
  remaining: number;
}

const initialRateLimit: RateLimit = {
  limit: 5,
  remaining: 5,
};

// Hook to fetch the rate limit status from the new API route
const useRateLimit = (shouldFetch: boolean) => {
  const [rateLimit, setRateLimit] = useState<RateLimit>(initialRateLimit);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!shouldFetch) return;

    const fetchRateLimit = async () => {
      setIsFetching(true);
      try {
        const response = await fetch("/api/usage");
        if (response.ok) {
          const data = await response.json();
          setRateLimit({
            limit: data.limit,
            remaining: data.remaining,
          });
        }
      } catch (error) {
        console.error("Failed to fetch rate limit:", error);
      }

      setIsFetching(false);
    };

    fetchRateLimit();
  }, [shouldFetch]);

  return { rateLimit, setRateLimit, isFetching };
};

// Safe JSON parser that never throws — returns `null` on parse failure
function safeJSON<T>(str: string): T | null {
  try {
    return JSON.parse(str) as T;
  } catch {
    return null;
  }
}

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState<modelID>(defaultModel);
  // State to control when to fetch the remaining count
  const [shouldFetchLimit, setShouldFetchLimit] = useState(true);

  // Use the custom hook
  const { rateLimit, setRateLimit, isFetching } =
    useRateLimit(shouldFetchLimit);

  const { sendMessage, messages, status, stop } = useChat({
    onFinish: () => {
      // After a successful message, fetch the new remaining count
      setShouldFetchLimit(true);
    },
    onError: (error) => {
      // The AI SDK wraps the error body in the message. Safely parse it
      // outside of a try/catch block so the React Compiler can optimize.
      const errorBody = safeJSON<{ error?: string }>(error.message);

      if (errorBody?.error?.includes("Rate limit exceeded")) {
        toast.error(errorBody.error, {
          position: "top-center",
          richColors: true,
          duration: 5000,
        });
        // Immediately update the display to 0 remaining
        setRateLimit({ ...rateLimit, remaining: 0 });
        setShouldFetchLimit(false); // Stop auto-fetching until next action
        return;
      }

      toast.error(
        error.message.length > 0
          ? error.message
          : "An error occurred, please try again later.",
        { position: "top-center", richColors: true }
      );
    },
  });

  const isLoading = status === "streaming" || status === "submitted";

  return (
    <>
      {messages.length === 0 ? (
        <div className='mx-auto w-full max-w-xl'>
          {/* Rate Limit Display */}
          <p className='pl-6 text-sm leading-5 tracking-tight text-gray-500 sm:pl-2 dark:text-gray-400'>
            Usage:{" "}
            {isFetching ? "..." : `${rateLimit.remaining}/${rateLimit.limit}`}{" "}
            remaining ({rateLimit.limit} per day).
          </p>
        </div>
      ) : (
        <Messages messages={messages} isLoading={isLoading} status={status} />
      )}
      <form
        className='mx-auto w-full max-w-xl px-4 pb-16 sm:px-0'
        onSubmit={(e) => {
          e.preventDefault();

          // Optimistically update the remaining count before the request is sent
          setRateLimit((prev) => ({
            ...prev,
            remaining: Math.max(0, prev.remaining - 1),
          }));
          setShouldFetchLimit(false); // Temporarily stop auto-fetching

          sendMessage({ text: input }, { body: { selectedModel } });
          setInput("");
        }}
      >
        {/* Rate Limit Display above the text area for the non-initial view */}
        {messages.length > 0 && (
          <div className='mb-2 flex justify-end'>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              Usage:{" "}
              {isFetching ? "..." : `${rateLimit.remaining}/${rateLimit.limit}`}{" "}
              remaining ({rateLimit.limit} per day).
            </p>
          </div>
        )}
        <UserTextarea
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          handleInputChange={(e) => setInput(e.currentTarget.value)}
          input={input}
          isLoading={isLoading}
          status={status}
          stop={stop}
        />
      </form>
    </>
  );
}

// "use client";

// import { useState } from "react";
// import { useChat } from "@ai-sdk/react";
// import { toast } from "sonner";
// import { defaultModel, type modelID } from "@/ai/providers";
// import { UserTextarea } from "@/components/user-textarea";
// import { Messages } from "@/components/messages";

// export default function ChatBot() {
//   const [input, setInput] = useState("");
//   const [selectedModel, setSelectedModel] = useState<modelID>(defaultModel);

//   const { sendMessage, messages, status, stop } = useChat({
//     onError: (error) => {
//       toast.error(
//         error.message.length > 0
//           ? error.message
//           : "An error occured, please try again later.",
//         { position: "top-center", richColors: true }
//       );
//     },
//   });

//   const isLoading = status === "streaming" || status === "submitted";

//   return (
//     <>
//       {messages.length === 0 ? (
//         <div className='mx-auto w-full max-w-xl'>
//           <p className='leading-5 tracking-tight'>
//             Check out more at{" "}
//             <a
//               target='_blank'
//               className='text-blue-500 transition-colors duration-75 hover:text-blue-600'
//               href='https://egxo.dev'
//             >
//               egxo.dev
//             </a>
//             .
//           </p>
//         </div>
//       ) : (
//         <Messages messages={messages} isLoading={isLoading} status={status} />
//       )}
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           sendMessage({ text: input }, { body: { selectedModel } });
//           setInput("");
//         }}
//         className='mx-auto w-full max-w-xl px-4 pb-16 sm:px-0'
//       >
//         <UserTextarea
//           selectedModel={selectedModel}
//           setSelectedModel={setSelectedModel}
//           handleInputChange={(e) => setInput(e.currentTarget.value)}
//           input={input}
//           isLoading={isLoading}
//           status={status}
//           stop={stop}
//         />
//       </form>
//     </>
//   );
// }
