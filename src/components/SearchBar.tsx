import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <MagnifyingGlassIcon
        size={16}
        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-zinc-500"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search movies"
        aria-label="Search movies"
        className="w-full rounded-full border border-line bg-night-raise py-2.5 pr-10 pl-10 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-accent focus:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-zinc-500 transition-colors hover:text-zinc-200"
        >
          <XIcon size={14} />
        </button>
      )}
    </div>
  );
}
