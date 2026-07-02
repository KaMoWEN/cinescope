import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { hasApiKey } from "../api/tmdb";
import { useDebounce } from "../hooks/useDebounce";
import { useMovies } from "../hooks/useMovies";
import { SearchBar } from "../components/SearchBar";
import { MovieGrid, SkeletonGrid } from "../components/MovieGrid";
import { Pagination } from "../components/Pagination";
import {
  EmptyState,
  ErrorState,
  NoKeyState,
} from "../components/StateViews";

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const [input, setInput] = useState(query);
  const debounced = useDebounce(input, 400);

  // Push the debounced input into the URL so searches are shareable
  // and the back button works. Reset to page 1 on a new query.
  useEffect(() => {
    if (debounced === query) return;
    setSearchParams(debounced.trim() ? { q: debounced } : {}, {
      replace: true,
    });
  }, [debounced, query, setSearchParams]);

  const { status, data } = useMovies(query, page);

  if (!hasApiKey) return <NoKeyState />;

  const heading = query ? `Results for “${query}”` : "Popular this week";

  return (
    <>
      <div className="flex flex-col gap-6 pb-8 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
          {heading}
        </h1>
        <SearchBar value={input} onChange={setInput} />
      </div>

      {status === "loading" && <SkeletonGrid />}
      {status === "error" && (
        <ErrorState onRetry={() => window.location.reload()} />
      )}
      {status === "success" && data && data.results.length === 0 && (
        <EmptyState query={query} />
      )}
      {status === "success" && data && data.results.length > 0 && (
        <>
          <MovieGrid movies={data.results} />
          <Pagination
            page={page}
            totalPages={data.total_pages}
            onPageChange={(next) => {
              setSearchParams(
                query ? { q: query, page: String(next) } : { page: String(next) },
              );
              window.scrollTo({ top: 0 });
            }}
          />
        </>
      )}
    </>
  );
}
