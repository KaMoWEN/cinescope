import { useEffect, useState } from "react";
import { getMovie } from "../api/tmdb";
import type { MovieDetails } from "../types/movie";

interface MovieState {
  status: "loading" | "error" | "success";
  movie: MovieDetails | null;
}

export function useMovie(id: string | undefined): MovieState {
  const [state, setState] = useState<MovieState>({
    status: "loading",
    movie: null,
  });

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    setState({ status: "loading", movie: null });

    getMovie(id, controller.signal)
      .then((movie) => setState({ status: "success", movie }))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setState({ status: "error", movie: null });
      });

    return () => controller.abort();
  }, [id]);

  return state;
}
