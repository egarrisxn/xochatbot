export function PromptSuggestions({
  label,
  append,
  suggestions,
}: {
  label: string;
  append: (message: { role: "user"; content: string }) => void;
  suggestions: string[];
}) {
  return (
    <div className="space-y-4 lg:space-y-6">
      <h2 className="text-center text-xl font-bold lg:text-2xl">{label}</h2>
      <div className="flex gap-2 text-xs lg:gap-6 lg:text-sm">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => append({ role: "user", content: suggestion })}
            className="bg-background hover:bg-muted h-max flex-1 rounded-xl border p-2 lg:p-4"
          >
            <p>{suggestion}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
