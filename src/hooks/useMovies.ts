import { useEffect, useState } from "react";
import { getPopular, searchMovies } from "../api/tmdb";
import type { MovieListResponse } from "../types/movie";

interface MoviesState {
  status: "loading" | "error" | "success";
  data: MovieListResponse | null;
}

/**
 * Fetches popular movies, or search results when `query` is non-empty.
 * A new query or page aborts the in-flight request, so a slow old
 * response can never overwrite a newer one.
 */
export function useMovies(query: string, page: number): MoviesState {
  const [state, setState] = useState<MoviesState>({
    status: "loading",
    data: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    setState((s) => ({ ...s, status: "loading" }));

    const request = query.trim()
      ? searchMovies(query, page, controller.signal)
      : getPopular(page, controller.signal);

    request
      .then((data) => setState({ status: "success", data }))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setState({ status: "error", data: null });
      });

    return () => controller.abort();
  }, [query, page]);

  return state;
}
