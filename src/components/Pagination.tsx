import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// TMDB never serves past page 500.
const MAX_PAGES = 500;

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const last = Math.min(totalPages, MAX_PAGES);
  if (last <= 1) return null;

  const btn =
    "inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-40";

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex items-center justify-center gap-4"
    >
      <button
        className={btn}
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        <CaretLeftIcon size={14} /> Prev
      </button>
      <span className="text-sm text-zinc-400 tabular-nums">
        Page {page} of {last}
      </span>
      <button
        className={btn}
        onClick={() => onPageChange(page + 1)}
        disabled={page >= last}
      >
        Next <CaretRightIcon size={14} />
      </button>
    </nav>
  );
}
