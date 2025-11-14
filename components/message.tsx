"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { getToolName, type ReasoningUIPart, type UIMessage } from "ai";
import equal from "fast-deep-equal";
import { AnimatePresence, motion } from "motion/react";
import {
  CheckCircle,
  ChevronDownIcon,
  ChevronUpIcon,
  Loader2,
  PocketKnife,
  SparklesIcon,
  StopCircle,
} from "lucide-react";
import { SpinnerIcon } from "@/components/icons/spinner";
import { cn } from "@/lib/utils";
import { Markdown } from "@/components/markdown";

interface ReasoningMessagePartProps {
  part: ReasoningUIPart;
  isReasoning: boolean;
}

export function ReasoningMessagePart({
  part,
  isReasoning,
}: ReasoningMessagePartProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const variants = {
    collapsed: {
      height: 0,
      opacity: 0,
      marginTop: 0,
      marginBottom: 0,
    },
    expanded: {
      height: "auto",
      opacity: 1,
      marginTop: "1rem",
      marginBottom: 0,
    },
  };

  const memoizedSetIsExpanded = useCallback((value: boolean) => {
    setIsExpanded(value);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      memoizedSetIsExpanded(isReasoning);
    }, 0);
    return () => clearTimeout(id);
  }, [isReasoning, memoizedSetIsExpanded]);

  return (
    <div className='flex flex-col'>
      {isReasoning ? (
        <div className='flex flex-row items-center gap-2'>
          <div className='text-sm font-medium'>Reasoning</div>
          <div className='animate-spin'>
            <SpinnerIcon />
          </div>
        </div>
      ) : (
        <div className='flex flex-row items-center gap-2'>
          <div className='text-sm font-medium'>Reasoned for a few seconds</div>
          <button
            className={cn(
              "cursor-pointer rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800",
              {
                "bg-zinc-200 dark:bg-zinc-800": isExpanded,
              }
            )}
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <ChevronDownIcon className='size-4' />
            ) : (
              <ChevronUpIcon className='size-4' />
            )}
          </button>
        </div>
      )}

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key='reasoning'
            className='flex flex-col gap-4 border-l pl-3 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400'
            initial='collapsed'
            animate='expanded'
            exit='collapsed'
            variants={variants}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Markdown>{part.text}</Markdown>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const PurePreviewMessage = ({
  message,
  isLatestMessage,
  status,
}: {
  message: UIMessage;
  isLoading: boolean;
  status: "error" | "submitted" | "streaming" | "ready";
  isLatestMessage: boolean;
}) => {
  return (
    <AnimatePresence key={message.id}>
      <motion.div
        className='group/message mx-auto w-full px-4'
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        key={`message-${message.id}`}
        data-role={message.role}
      >
        <div
          className={cn(
            "flex w-full gap-4 group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl",
            "group-data-[role=user]/message:w-fit"
          )}
        >
          {message.role === "assistant" && (
            <div className='flex size-8 shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-border'>
              <div className=''>
                <SparklesIcon size={14} />
              </div>
            </div>
          )}

          <div className='flex w-full flex-col space-y-4'>
            {message.parts?.map((part, i) => {
              switch (part.type) {
                case "text":
                  return (
                    <motion.div
                      initial={{ y: 5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      key={`message-${message.id}-part-${i}`}
                      className='flex w-full flex-row items-start gap-2 pb-4'
                    >
                      <div
                        className={cn("flex flex-col gap-4", {
                          "rounded-tl-xl rounded-tr-xl rounded-bl-xl bg-secondary px-3 py-2 text-secondary-foreground":
                            message.role === "user",
                        })}
                      >
                        <Markdown>{part.text}</Markdown>
                      </div>
                    </motion.div>
                  );
                // TODO: add your other tools here
                case "tool-getWeather":
                  const { state } = part;

                  return (
                    <motion.div
                      initial={{ y: 5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      key={`message-${message.id}-part-${i}`}
                      className='mb-3 flex flex-col gap-2 rounded-md border border-zinc-200 bg-zinc-50 p-2 text-sm dark:border-zinc-800 dark:bg-zinc-900'
                    >
                      <div className='flex flex-1 items-center justify-center'>
                        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-800'>
                          <PocketKnife className='size-4' />
                        </div>
                        <div className='flex-1'>
                          <div className='flex items-baseline gap-2 font-medium'>
                            {state === "input-streaming" ? "Calling" : "Called"}{" "}
                            <span className='rounded-md bg-zinc-100 px-2 py-1 font-mono dark:bg-zinc-800'>
                              {getToolName(part)}
                            </span>
                          </div>
                        </div>
                        <div className='flex size-5 items-center justify-center'>
                          {state === "input-streaming" ? (
                            isLatestMessage && status !== "ready" ? (
                              <Loader2 className='size-4 animate-spin text-zinc-500' />
                            ) : (
                              <StopCircle className='size-4 text-red-500' />
                            )
                          ) : state === "output-available" ? (
                            <CheckCircle size={14} className='text-green-600' />
                          ) : null}
                        </div>
                      </div>
                    </motion.div>
                  );
                case "reasoning":
                  return (
                    <ReasoningMessagePart
                      key={`message-${message.id}-${i}`}
                      part={part}
                      isReasoning={
                        (message.parts &&
                          status === "streaming" &&
                          i === message.parts.length - 1) ??
                        false
                      }
                    />
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export const Message = memo(PurePreviewMessage, (prevProps, nextProps) => {
  if (prevProps.status !== nextProps.status) return false;
  if (!equal(prevProps.message.parts, nextProps.message.parts)) return false;

  return true;
});
