import type {
  ReactElement,
  HTMLAttributes,
  Dispatch,
  TextareaHTMLAttributes,
  ReactNode,
  SetStateAction,
  RefObject,
  DependencyList,
} from "react";
import type { VariantProps } from "class-variance-authority";
import { chatBubbleVariants } from "@/lib/utils";

// chat.tsx
interface ChatPropsBase {
  className?: string;
  onRateResponse?: (
    messageId: string,
    rating: "thumbs-up" | "thumbs-down"
  ) => void;
}

export interface ChatPropsWithSuggestions extends ChatPropsBase {
  suggestions?: string[];
}

export interface AuthenticatedChatContentProps
  extends HTMLAttributes<HTMLFormElement> {
  className?: string;
  onRateResponse?: (
    messageId: string,
    rating: "thumbs-up" | "thumbs-down"
  ) => void;
  suggestions?: string[];
  session: any;
}

export interface ChatFormProps {
  className?: string;
  handleSubmit: (
    event?: { preventDefault?: () => void },
    options?: { experimental_attachments?: FileList }
  ) => void;
  children: (props: {
    files: File[] | null;
    setFiles: Dispatch<SetStateAction<File[] | null>>;
  }) => ReactElement;
}

// chat-message.tsx
interface Attachment {
  name?: string;
  contentType?: string;
  url: string;
}

interface PartialToolCall {
  state: "partial-call";
  toolName: string;
}

export interface ToolCall {
  state: "call";
  toolName: string;
}

interface ToolResult<T = unknown> {
  state: "result";
  toolName: string;
  result: T;
}

type ToolInvocation = PartialToolCall | ToolCall | ToolResult<unknown>;

export interface Message {
  id: string;
  role: "user" | "assistant" | (string & {});
  content: string;
  createdAt?: Date;
  experimental_attachments?: Attachment[];
  toolInvocations?: ToolInvocation[];
}

type Animation = VariantProps<typeof chatBubbleVariants>["animation"];

export interface ChatMessageProps extends Message {
  showTimeStamp?: boolean;
  animation?: Animation;
  actions?: ReactNode;
  className?: string;
}

// message-list.tsx
type AdditionalMessageOptions = Omit<ChatMessageProps, keyof Message>;

export interface MessageListProps {
  messages: Message[];
  showTimeStamps?: boolean;
  isTyping?: boolean;
  messageOptions?:
    | AdditionalMessageOptions
    | ((message: Message) => AdditionalMessageOptions);
}

// file-preview.tsx
export interface FilePreviewProps {
  file: File;
  onRemove?: () => void;
}

// message-input.tsx
interface MessageInputBaseProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  submitOnEnter?: boolean;
  stop?: () => void;
  isGenerating: boolean;
  enableInterrupt?: boolean;
}

interface MessageInputWithoutAttachmentProps extends MessageInputBaseProps {
  allowAttachments?: false;
}

interface MessageInputWithAttachmentsProps extends MessageInputBaseProps {
  allowAttachments: true;
  files: File[] | null;
  setFiles: Dispatch<SetStateAction<File[] | null>>;
}

export type MessageInputProps =
  | MessageInputWithoutAttachmentProps
  | MessageInputWithAttachmentsProps;

// prompt-suggestions.tsx
export interface PromptSuggestion {
  label: string;
  append: (message: { role: "user"; content: string }) => void;
  suggestions: string[];
}

// use-autosize-textarea.ts
export interface UseAutosizeTextAreaProps {
  ref: RefObject<HTMLTextAreaElement>;
  maxHeight?: number;
  borderWidth?: number;
  dependencies: DependencyList;
}

// use-copy-to-clipboard.ts
export interface UseCopyToClipboardProps {
  text: string;
  copyMessage?: string;
}

// navbar.tsx
export interface NavProps {
  hrefLink?: string;
  linkName?: string;
  showButton?: boolean;
  signOutButton?: boolean;
}
