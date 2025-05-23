// "use client";

// import { useState, useEffect } from "react";
// import { useChat } from "@ai-sdk/react";
// import { useSession } from "next-auth/react";
// import { MAX_DAILY_USES } from "@/lib/constants";

// export default function ChatInterface() {
//   const { data: session } = useSession();
//   const [dailyUsesRemaining, setDailyUsesRemaining] = useState<number | null>(null);
//   const [statusMessage, setStatusMessage] = useState("");

//   const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
//     api: "/api/chat",
//     onError: (err) => {
//       console.error("Chat error:", err);
//       // Check for 429 status code for rate limiting
//       if (err.message.includes("429")) {
//         setStatusMessage("You've reached your daily message limit. Please try again tomorrow.");
//       } else {
//         setStatusMessage(`Error: ${err.message}`);
//       }
//     },
//     onFinish: () => {
//       // Fetch updated daily uses after each chat interaction
//       fetchDailyUses();
//     },
//   });

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

//   return (
//     <div className="z-10 mx-auto flex w-full justify-center p-2 sm:container sm:p-4">
//       {/* Display daily uses remaining */}
//       {dailyUsesRemaining !== null && (
//         <p>
//           Daily messages remaining: {dailyUsesRemaining} / {MAX_DAILY_USES}
//         </p>
//       )}

//       {/* Display status messages */}
//       {statusMessage && <p style={{ color: error ? "red" : "blue" }}>{statusMessage}</p>}

//       {/* Main chat form - disabled if limit reached or loading */}
//       <form onSubmit={handleSubmit}>
//         {/* Messages display */}
//         <div>
//           {messages.map((m) => (
//             <div key={m.id}>
//               <strong>{m.role === "user" ? "You: " : "AI: "}</strong>
//               {m.content}
//             </div>
//           ))}
//         </div>

//         {/* Input field */}
//         <input
//           value={input}
//           placeholder={
//             isDailyLimitReached ? "Daily limit reached. Try tomorrow!" : "Say something..."
//           }
//           onChange={handleInputChange}
//           disabled={isLoading || isDailyLimitReached} // Disable if loading or limit reached
//         />
//         <button type="submit" disabled={isLoading || isDailyLimitReached}>
//           {isLoading ? "Sending..." : "Send"}
//         </button>
//       </form>

//       {/* Display generic error from useChat if not handled by custom onError */}
//       {error && !statusMessage && <p className="error">{error.message}</p>}
//     </div>
//   );
// }
