import type { PromptSuggestion } from "@/types";

export function PromptSuggestions({
  label,
  append,
  suggestions,
}: PromptSuggestion) {
  return (
    <div className='space-y-4 lg:space-y-6'>
      <h2 className='text-center text-xl font-bold lg:text-2xl'>{label}</h2>
      <div className='flex gap-2 text-xs lg:gap-6 lg:text-sm'>
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => append({ role: "user", content: suggestion })}
            className='h-max flex-1 rounded-xl border bg-background p-2 hover:bg-muted lg:p-4'
          >
            <p>{suggestion}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
