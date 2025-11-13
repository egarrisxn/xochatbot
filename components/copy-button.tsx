"use client";

import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Button } from "@/components/ui/button";

export default function CopyButton({
  content,
  copyMessage,
}: {
  content: string;
  copyMessage?: string;
}) {
  const { isCopied, handleCopy } = useCopyToClipboard({
    text: content,
    copyMessage,
  });

  return (
    <Button
      variant='ghost'
      size='icon'
      className='relative size-6'
      aria-label='Copy to clipboard'
      onClick={handleCopy}
    >
      <div className='absolute inset-0 flex items-center justify-center'>
        <Check
          className={cn(
            "size-4 transition-transform ease-in-out",
            isCopied ? "scale-100" : "scale-0"
          )}
        />
      </div>
      <Copy
        className={cn(
          "size-4 transition-transform ease-in-out",
          isCopied ? "scale-0" : "scale-100"
        )}
      />
    </Button>
  );
}
